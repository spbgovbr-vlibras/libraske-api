import InterfaceValidator, { MulterFile } from "./InterfaceValidator";
import path from 'path';

class MulterFileValidator implements InterfaceValidator {

  private allowedExtension: string[];
  private allowedMimeType: string[];
  private errors: string[];


  constructor(allowedExtensions: string[], allowedMimeType: string[]) {
    this.allowedExtension = allowedExtensions;
    this.allowedMimeType = allowedMimeType;
    this.errors = []
  }

  validate({ originalname, mimetype }: MulterFile): string[] {
    const fileExtension = path.extname(originalname);

    this.validateExtension(fileExtension)
    this.validateMimeType(mimetype)

    return this.errors;
  }

  protected validateExtension(fileExtension: string) {
    if (!this.allowedExtension.includes(fileExtension)) {
      this.errors.push(`File extension (${fileExtension}) not present in: ${this.allowedExtension}`)
    }
  }

  protected validateMimeType(mimeType: string) {
    if (!this.allowedMimeType.includes(mimeType)) {
      this.errors.push(`File mime type (${mimeType}) not present in: ${this.allowedMimeType}`)
    }
  }

}

export { MulterFileValidator }