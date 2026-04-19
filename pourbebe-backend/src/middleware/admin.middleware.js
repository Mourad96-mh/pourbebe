export function adminOnly(req, res, next) {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ success: false, error: 'Accès réservé aux administrateurs.' })
  }
  next()
}
