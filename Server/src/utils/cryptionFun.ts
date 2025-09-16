import bcrypt from "bcrypt";
import crypto from "crypto-js";

// Encryption function
export const encryptionFun = (data: string): string => {
  return bcrypt.hashSync(data, 10);
};

// Decryption function
export const decryptionFun = (
  cipherText: string,
  plainText: string
): boolean => {
  return bcrypt.compareSync(plainText, cipherText);
};

export const cryptoDecryptionFun = (text: string): string => {
  return crypto.AES.decrypt(
    text,
    process.env.CRYPTO_SECRET_KEY as string
  ).toString(crypto.enc.Utf8);
};
