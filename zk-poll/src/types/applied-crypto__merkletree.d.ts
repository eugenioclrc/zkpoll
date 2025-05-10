declare module '@applied-crypto/merkletree' {
  export class MerkleTree {
    constructor(leaves: string[], hashFn: any, options?: { hashLeaves?: boolean });
    getRoot(): { toString(): string };
  }
}

declare module '@applied-crypto/merkletree/hashers' {
  export const poseidon: any;
} 