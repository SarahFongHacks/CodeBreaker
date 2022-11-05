import create from "zustand";

const useStore = create((set) => ({
  search: {},
  setSearch: () => set((state) => ({ search: state.search })),
}));

export default useStore;
