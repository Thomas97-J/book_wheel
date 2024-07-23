import { create } from "zustand";

interface ScrollState {
  scrollTarget: string | null;
  setScrollTarget: (target: string) => void;
  clearScrollTarget: () => void;
}

const useScrollStore = create<ScrollState>((set) => ({
  scrollTarget: null,
  setScrollTarget: (target: string) => set({ scrollTarget: target }),
  clearScrollTarget: () => set({ scrollTarget: null }),
}));

export default useScrollStore;
