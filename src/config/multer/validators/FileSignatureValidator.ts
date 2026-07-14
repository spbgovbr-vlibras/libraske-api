import fs from 'fs';

const IMAGE_SIGNATURES_BY_MIME_TYPE: Record<string, Buffer[]> = {
  'image/png': [Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])],
  'image/jpeg': [
    Buffer.from([0xff, 0xd8, 0xff, 0xdb]),
    Buffer.from([0xff, 0xd8, 0xff, 0xe0]),
    Buffer.from([0xff, 0xd8, 0xff, 0xe1]),
    Buffer.from([0xff, 0xd8, 0xff, 0xee]),
  ],
};

export function matchesImageSignature(filePath: string, mimeType: string): boolean {
  const signatures = IMAGE_SIGNATURES_BY_MIME_TYPE[mimeType];

  if (!signatures) {
    return false;
  }

  const maxLength = Math.max(...signatures.map(signature => signature.length));
  const fileBuffer = Buffer.alloc(maxLength);
  const fileDescriptor = fs.openSync(filePath, 'r');

  try {
    fs.readSync(fileDescriptor, fileBuffer, 0, maxLength, 0);
  } finally {
    fs.closeSync(fileDescriptor);
  }

  return signatures.some(signature => fileBuffer.subarray(0, signature.length).equals(signature));
}
