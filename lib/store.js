import create from "zustand";

const useStore = create((set) => ({
  search: [],
  setSearch: (state) => set({ search: state }),
}));

export default useStore;
