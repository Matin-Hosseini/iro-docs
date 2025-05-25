import { create } from "zustand";

const useUserStore = create((set) => ({
  userInfo: {},
}));

export default useUserStore;
