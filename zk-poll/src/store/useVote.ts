import { create } from "zustand";

interface VoteState {
  nullifier: string | null;
  votedFor: string | null;
  setVote: (n: string, c: string) => void;
}

export const useVote = create<VoteState>((set) => ({
  nullifier: null,
  votedFor: null,
  setVote: (n, c) => set({ nullifier: n, votedFor: c }),
}));
