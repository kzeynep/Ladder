import create from 'zustand';

const useStore = create(set => ({
  user: null,
  markets: [],
  products: [],
  setUser: (user) => set({ user }),
  setMarkets: (markets) => set({ markets }),
  setProducts: (products) => set({ products })
}));

export default useStore;
