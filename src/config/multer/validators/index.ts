import { MulterFileValidator } from "./MulterFileValidator"

const songAllowedExtension = ['.mp3']
const songAllowedMimeType = ['audio/mpeg']

const subtitleAllowedExtension = ['.txt']
const subtitleAllowedMimeType = ['text/plain']

const thumbnailAllowedExtension = ['.jpg', '.jpeg', '.png']
const thumbnailAllowedMimeType = ['image/jpeg', 'image/png']

const animationAllowedExtension = ['']
const animationAllowedMimeType = ['application/octet-stream']

const SONG = 'song';
const SUBTITLE = 'subtitle';
const THUMBNAIL = 'thumbnail';
const ANIMATION = 'animation';

export interface MulterValidationError {
  fieldName: string;
  errors: string[];
}

export const MulterFileValidatorFactory = (field: string): MulterFileValidator => {
  switch (field) {
    case SONG:
      return new MulterFileValidator(songAllowedExtension, songAllowedMimeType);
    case SUBTITLE:
      return new MulterFileValidator(subtitleAllowedExtension, subtitleAllowedMimeType);
    case THUMBNAIL:
      return new MulterFileValidator(thumbnailAllowedExtension, thumbnailAllowedMimeType);
    case ANIMATION:
      return new MulterFileValidator(animationAllowedExtension, animationAllowedMimeType);
    default:
      return new MulterFileValidator([], []);
  }
}