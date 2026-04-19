import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function protect(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ success: false, error: 'Non autorisé.' })

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ success: false, error: 'Token invalide ou expiré.' })
  }

  req.user = await User.findById(decoded.id).select('-password')
  if (!req.user) return res.status(401).json({ success: false, error: 'Utilisateur introuvable.' })

  next()
}
