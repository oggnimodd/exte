import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  count: number;
};

type Actions = {
  increment: () => void;
  decrement: () => void;
};

const useCountStore = create<State & Actions>()(
  immer((set) => ({
    count: 0,
    increment: () =>
      set((state) => {
        state.count += 1;
      }),
    decrement: () =>
      set((state) => {
        state.count -= 1;
      }),
  })),
);

export default useCountStore;
