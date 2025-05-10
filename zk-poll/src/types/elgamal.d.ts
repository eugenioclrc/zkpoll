declare module 'elgamal' {
  export default class ElGamal {
    constructor(p: string | number, g: string | number, y: string | number, x: string | number);
    static generateAsync(bits?: number): Promise<ElGamal>;
    encryptAsync(message: number, k?: string | number): Promise<string>;
    decryptAsync(encrypted: string): Promise<number>;
    y: string; // public key
  }
} 