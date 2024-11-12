import { NextFunction, Request, Response } from "express"
import multer from "multer"
import { uploadImage, uploadSong } from "~/utils/upload"

export function middlewareUploadSong(req: Request, res: Response, next: NextFunction) {
  uploadSong(req, res, function (err) {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.')
    }
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send('File quá lớn! Giới hạn là 50MB.')
      }
      return res.status(500).send('Lỗi upload file.')
    } else if (err) {
      console.log(err)
      return res.status(500).send('Có lỗi xảy ra khi upload file.')
    }
    const files = (req as any).files
    if (!files.songUrl) {
      return res.status(400).send('Song not uploaded yet.')
    }
    if (!files.imageUrl) {
      return res.status(400).send('Imange not uploaded yet.')
    }
    req.body.songUrl = files.songUrl[0].path
    req.body.imageUrl = files.imageUrl[0].path
    req.body.imageUrlId = files.imageUrl[0].filename
    req.body.songIdFile = files.songUrl[0].filename
    next()
  })
}
export function middlewareUploadImage(req: Request, res: Response, next: NextFunction) {
  uploadImage(req, res, function (err) {
    if (!req.file) {
      return next()
    }
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send('File quá lớn! Giới hạn là 50MB.')
      }
      return res.status(500).send('Lỗi upload file.')
    } else if (err) {
      return res.status(500).send('Có lỗi xảy ra khi upload file.')
    }
    req.body.image = req.file?.path
    req.body.imageId = req.file?.filename
    next()
  })
}