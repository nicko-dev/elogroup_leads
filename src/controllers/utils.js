import { EncryptStorage } from 'encrypt-storage';

const secret = 'Hasta la Victoria Siempre!';

export const encryptLocal = new EncryptStorage(secret);
export const encryptSession = new EncryptStorage(secret, { storageType: 'sessionStorage' });
