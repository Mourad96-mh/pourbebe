import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(filePath, folder = 'pourbebe') {
  const result = await cloudinary.uploader.upload(filePath, { folder })
  return result.secure_url
}

export async function deleteImage(publicId) {
  await cloudinary.uploader.destroy(publicId)
}

export default cloudinary
