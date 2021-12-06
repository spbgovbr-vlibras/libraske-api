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
const TRAINING_ANIMATION1 = 'trainingAnimation1';
const TRAINING_ANIMATION2 = 'trainingAnimation2';
const TRAINING_ANIMATION3 = 'trainingAnimation3';
const TRAINING_ANIMATION4 = 'trainingAnimation4';
const TRAINING_ANIMATION5 = 'trainingAnimation5';

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
    case TRAINING_ANIMATION1:
    case TRAINING_ANIMATION2:
    case TRAINING_ANIMATION3:
    case TRAINING_ANIMATION4:
    case TRAINING_ANIMATION5:
      return new MulterFileValidator(animationAllowedExtension, animationAllowedMimeType);
    default:
      return new MulterFileValidator([], []);
  }
}