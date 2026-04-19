import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name:     { type: String, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['CUSTOMER', 'ADMIN'], default: 'CUSTOMER' },
}, { timestamps: true })

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password)
}

userSchema.methods.toSafeObject = function () {
  const { password, ...obj } = this.toObject()
  return obj
}

export default mongoose.model('User', userSchema)
