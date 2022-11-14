import create from "zustand";

const useStore = create((set) => ({
  search: [],
  setSearch: (state) => set({ search: state }),
  searchEnabled: false,
  setSearchEnabled: (state) => set({ searchEnabled: state }),
}));

export default useStore;
