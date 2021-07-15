import {Constants} from '../constants';
import {fileService} from '../service/file';

export const fileUpload = async (action: Constants, id: string, photos: any, service: any )=> {
  const promises: any[] = [];

  switch (action) {
    case Constants.UPDATE:
      photos.forEach((photo: any) => {
        promises.push(fileService.updateFiles(id, Constants.PHOTO, photo, Constants.User, service));
      });

      break;
    case Constants.CREATE:
      photos.forEach((photo: any) => {
        promises.push(fileService.filesUpload(id, Constants.PHOTO, photo, Constants.User, service));
      });
  }

  await Promise.all(promises);
};
