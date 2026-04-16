// src/utils/fileUtils.js

/**
 * Convert a File object to a base64 data URL string.
 * Returns a Promise<string>.
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // reader.result is the data URL string
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};