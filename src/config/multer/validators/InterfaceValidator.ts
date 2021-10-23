export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
}

export default interface InterfaceValidator {
  validate(file: MulterFile): string[];
}