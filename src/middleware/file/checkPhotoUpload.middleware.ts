import {NextFunction, Response} from 'express';
import {UploadedFile} from 'express-fileupload';

import {IRequest} from '../../interface';
import {CodesEnum, FilesTypeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../error';

export const checkPhotoUpload = (req: IRequest, res: Response, next: NextFunction): void | NextFunction => {
  try {
    const files = req.files?.photos as UploadedFile;

    if (!files) {
      return next();
    }

    const photos = [];

    if (Array.isArray(files)) {
      const file = Object.values(files);

      for (const photo of file) {
        const {size, mimetype} = photo;

        if (FilesTypeEnum.PHOTOS_MIMETYPES.includes(mimetype)) {
          if (FilesTypeEnum.PHOTO_MAX_SIZE < size) {
            throw new ErrorHandler(
              CodesEnum.BAD_REQUEST,
              customErrors.BAD_REQUEST_FILE_MAX_SIZE.message,
              customErrors.BAD_REQUEST_FILE_MAX_SIZE.code);
          }

          photos.push(photo);
        }
      }
    } else {

      const {size, mimetype} = files;

      if (FilesTypeEnum.PHOTOS_MIMETYPES.includes(mimetype)) {
        if (FilesTypeEnum.PHOTO_MAX_SIZE < size) {
          throw new ErrorHandler(
            CodesEnum.BAD_REQUEST,
            customErrors.BAD_REQUEST_FILE_MAX_SIZE.message,
            customErrors.BAD_REQUEST_FILE_MAX_SIZE.code);
        }
        photos.push(files);
      }
    }

    req.photos = photos;

    next();

  } catch (e) {
    next(e);
  }

};

