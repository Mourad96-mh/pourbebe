import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import User from '../models/User.js'
import { sendPasswordReset } from '../lib/email.js'

const registerSchema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  password: z.string().min(8),
})

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
})

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

export async function register(req, res) {
  const data = registerSchema.parse(req.body)

  const exists = await User.findOne({ email: data.email })
  if (exists) return res.status(409).json({ success: false, error: 'Email déjà utilisé.' })

  const user  = await User.create(data)
  const token = signToken(user._id)

  res.status(201).json({ success: true, data: { token, user: user.toSafeObject() } })
}

export async function login(req, res) {
  const data = loginSchema.parse(req.body)

  const user = await User.findOne({ email: data.email })
  if (!user || !(await user.comparePassword(data.password))) {
    return res.status(401).json({ success: false, error: 'Email ou mot de passe incorrect.' })
  }

  const token = signToken(user._id)
  res.json({ success: true, data: { token, user: user.toSafeObject() } })
}

export async function getMe(req, res) {
  res.json({ success: true, data: req.user })
}

export async function forgotPassword(req, res) {
  const { email } = req.body
  const user = await User.findOne({ email: String(email ?? '').toLowerCase().trim() })
  if (!user) return res.json({ success: true }) // don't reveal whether email exists

  const rawToken = crypto.randomBytes(32).toString('hex')
  const hashed   = crypto.createHash('sha256').update(rawToken).digest('hex')

  user.resetToken       = hashed
  user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000)
  await user.save()

  await sendPasswordReset(user.email, rawToken)
  res.json({ success: true })
}

export async function resetPassword(req, res) {
  const { token, newPassword } = req.body
  if (!token || !newPassword || String(newPassword).length < 8) {
    return res.status(400).json({ success: false, error: 'Données invalides.' })
  }

  const hashed = crypto.createHash('sha256').update(String(token)).digest('hex')
  const user   = await User.findOne({ resetToken: hashed, resetTokenExpiry: { $gt: new Date() } })
  if (!user) return res.status(400).json({ success: false, error: 'Lien invalide ou expiré.' })

  user.password         = newPassword
  user.resetToken       = null
  user.resetTokenExpiry = null
  await user.save()

  res.json({ success: true })
}
