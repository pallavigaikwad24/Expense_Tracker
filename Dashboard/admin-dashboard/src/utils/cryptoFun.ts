import crypto from "crypto-js";

const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;

// Encryption function
export const encryptionCrypto = (text: string): string => {
  return crypto.AES.encrypt(text, secretKey as string).toString();
};

// Decryption function
export const decryptionCrypto = (cipherText: string): string => {
  const bytes = crypto.AES.decrypt(cipherText, secretKey as string);
  return bytes.toString(crypto.enc.Utf8);
};
