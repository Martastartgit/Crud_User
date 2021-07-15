import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';

export const filePathBuilder = (dirName: string, ownerId: string, fileType: string, files: UploadedFile):
    {pathWithStatic: string, fullPath: string, uploadPath: string} => {
  const pathWithoutStatic = path.join(`${dirName}`, `${ownerId}`, `${fileType}`);

  const pathWithStatic = path.resolve(__dirname, '../../', 'dist', 'public', pathWithoutStatic);

  const fileExtension = files.name.split('.').pop();

  const fileName =`${uuidv4()}.${fileExtension}`;

  const fullPath = path.join(pathWithStatic, fileName);

  const uploadPath = path.join(pathWithoutStatic, fileName);

  return {
    pathWithStatic,
    fullPath,
    uploadPath
  };

};
