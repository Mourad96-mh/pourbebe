import jwt from 'jsonwebtoken'
import { z } from 'zod'
import User from '../models/User.js'

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
