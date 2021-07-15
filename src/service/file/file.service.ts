import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';
import { UploadedFile } from 'express-fileupload';

import {filePathBuilder} from '../../helper';

const fsMkdir = promisify(fs.mkdir);
const fsReadDir = promisify(fs.readdir);
const fsUnlink = promisify(fs.unlink);

class FileService {
  async filesUpload(ownerId: string, fileType: string, file: UploadedFile, dirName: string, service: any): Promise<void> {
    const {pathWithStatic, fullPath, uploadPath} = filePathBuilder( dirName, ownerId, fileType, file);

    await fsMkdir(pathWithStatic, {recursive: true});

    await file.mv(fullPath);

    await service.updateByParams(ownerId, { $push: {[fileType]: uploadPath }} as any );
  }

  async updateFiles(ownerId: string, fileType: string, file: UploadedFile, dirName: string, service: any): Promise<void> {
    const {pathWithStatic, uploadPath, fullPath} = filePathBuilder(dirName, ownerId, fileType, file);

    const files = await fsReadDir(pathWithStatic);

    files.forEach((oneFile) => fsUnlink(path.join(pathWithStatic, `${oneFile}`)) );

    await file.mv(fullPath);

    await service.updateByParams(ownerId, { $push: {[fileType]: uploadPath }} as any );

  }

}

export const fileService = new FileService();
