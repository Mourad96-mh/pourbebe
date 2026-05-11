import 'dotenv/config'
import mongoose from 'mongoose'
import User from './models/User.js'

const EMAIL    = 'admin@pourbebes.ma'
const PASSWORD = 'Admin@PourBebe2025!'
const NAME     = 'Admin'

async function createAdmin() {
  await mongoose.connect(process.env.DATABASE_URL)
  console.log('Connected to DB')

  const existing = await User.findOne({ email: EMAIL })
  if (existing) {
    if (existing.role !== 'ADMIN') {
      existing.role = 'ADMIN'
      await existing.save()
      console.log(`User already exists — role updated to ADMIN.`)
    } else {
      console.log(`Admin already exists with email: ${EMAIL}`)
    }
    await mongoose.disconnect()
    return
  }

  await User.create({ name: NAME, email: EMAIL, password: PASSWORD, role: 'ADMIN' })
  console.log(`Admin created successfully.`)
  console.log(`  Email   : ${EMAIL}`)
  console.log(`  Password: ${PASSWORD}`)
  console.log(`Change the password after first login!`)

  await mongoose.disconnect()
}

createAdmin().catch((err) => { console.error(err); process.exit(1) })
