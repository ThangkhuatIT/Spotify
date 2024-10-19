const cloudinary = require('cloudinary').v2
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer, { Options } from 'multer'
import Config from '~/config'
import { NextFunction } from 'express-serve-static-core'
import { Request, Response } from 'express'
import ApiError from './ApiError'
cloudinary.config({
  cloud_name: 'ddbiksyk2',
  api_key: '757256832782843',
  api_secret: 'N31TA2zpwAbrXGRaLu1WfNYNLEc'
})
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thangdeptrai'
  } as Options
})
 const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Giới hạn kích thước file là 50MB
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'audio/mpeg' ||
      file.mimetype === 'audio/wav'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})
export const uploadSong = upload.fields([
  { name: 'imageUrl', maxCount: 1 },
  { name: 'songUrl', maxCount: 1 }
])
export const uploadImage = upload.single('imageUrl')

export const deleteFile = (...files: string[]) => {
  files.forEach((file) => {
    cloudinary.uploader.destroy(file, (error: any, result: any) => {
      if (error) {
        throw new ApiError(400, 'Can not delete files')
      } else {
        console.log('File deleted successfully:', result)
      }
    })
  })
}

