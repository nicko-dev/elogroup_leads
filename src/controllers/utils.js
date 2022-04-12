import { EncryptStorage } from 'encrypt-storage';

const secret = 'Iniciar minha carreira de dev na ELOGROUP seria um sonho realizado';

export const encryptLocal = new EncryptStorage(secret);
export const encryptSession = new EncryptStorage(secret, { storageType: 'sessionStorage' });
