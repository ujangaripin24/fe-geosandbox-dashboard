import { create } from "zustand";
import {
  type AddAddressUserPayload,
  type GetHistoryLoginUserPayload,
  type GetHistoryLoginUserResponse,
  type LoginHistoryPagination,
  type ParamsHistoryLoginUser,
  type UpdateUserPayload,
  type UserDetailProfile,
  userService
} from "../services/user.service";

interface UserState {
  user: UserDetailProfile | null;
  updateUser: UpdateUserPayload | null;
  addAddressUser: AddAddressUserPayload | null;
  getHistoryLogin: GetHistoryLoginUserPayload[];
  paginationLoginHistory: LoginHistoryPagination;
  paramsLoginHistory: ParamsHistoryLoginUser;
  isLoading: boolean;
  isLoadingLoginHistory: boolean;
  error: string | null;
  errorLoginHistory: string | null;

  setUser: (user: UserDetailProfile | null) => void;
  setHistoryLogin: (history: GetHistoryLoginUserPayload[]) => void;
  clearError: () => void;
  setParamsLoginHistory: (params: Partial<ParamsHistoryLoginUser>) => void;

  profileDetail: () => Promise<void>;
  updateDetail: (payload: UpdateUserPayload) => Promise<string>;
  addUserAddress: (payload: AddAddressUserPayload) => Promise<string>;

  getLoginHistory: (customParams?: ParamsHistoryLoginUser) => Promise<GetHistoryLoginUserResponse>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  updateUser: null,
  addAddressUser: null,
  paramsLoginHistory: { search: "", size: 10, page: 1, sort: "terbaru" },
  paginationLoginHistory: { page: 1, size: 10, totalPages: 1, totalData: 0 },
  getHistoryLogin: [],
  isLoading: false,
  isLoadingLoginHistory: false,
  error: null,
  errorLoginHistory: null,

  setUser: (user: UserDetailProfile | null) => set({ user }),
  setHistoryLogin: (history: GetHistoryLoginUserPayload[]) => set({ getHistoryLogin: history }),
  clearError: () => set({ error: null, errorLoginHistory: null }),

  setParamsLoginHistory: (params: Partial<ParamsHistoryLoginUser>) =>
    set((state) => ({ paramsLoginHistory: { ...state.paramsLoginHistory, ...params } })),

  profileDetail: async () => {
    set({ isLoading: true, error: null });
    try {
      const profile = await userService.profileDetail();
      set({ user: profile, isLoading: false, error: null });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil data profil", isLoading: false, user: null });
      throw error;
    }
  },

  updateDetail: async (payload: UpdateUserPayload) => {
    set({ isLoading: true, error: null });
    try {
      const message = await userService.updateDetail(payload);
      set((state) => ({
        user: state.user ? { ...state.user, ...payload } : null,
        updateUser: payload,
        isLoading: false,
        error: null
      }));
      return message;
    } catch (error: any) {
      set({ error: error.message || "Gagal update detail", isLoading: false });
      throw error;
    }
  },

  addUserAddress: async (payload: AddAddressUserPayload) => {
    set({ isLoading: true, error: null });
    try {
      const message = await userService.addAddressUser(payload);
      set((state) => ({
        user: state.user ? { ...state.user, ...payload } : null,
        addAddressUser: payload,
        isLoading: false,
        error: null
      }));
      return message;
    } catch (error: any) {
      set({ error: error.message || "Gagal update detail", isLoading: false });
      throw error;
    }
  },

  getLoginHistory: async (customParams) => {
    set({ isLoadingLoginHistory: true, errorLoginHistory: null });
    try {
      const activeParams = customParams
        ? { ...get().paramsLoginHistory, ...customParams }
        : get().paramsLoginHistory;

      const response = await userService.getHistoryLoginUser(activeParams);
      console.log("[user.store.ts] data: ", response);

      const resData = response.data;
      const historyList = Array.isArray(resData?.data) ? resData.data : [];

      set({
        getHistoryLogin: historyList,
        paginationLoginHistory: {
          page: Number(resData?.page) || 1,
          size: Number(resData?.size) || 10,
          totalPages: Number(resData?.totalPages) || 1,
          totalData: Number(resData?.totalData) || 0,
        },
        paramsLoginHistory: activeParams,
        isLoadingLoginHistory: false,
        errorLoginHistory: null
      });

      return response;
    } catch (error: any) {
      set({
        errorLoginHistory: error.message || "Gagal mengambil data login",
        isLoadingLoginHistory: false,
        getHistoryLogin: []
      });
      throw error;
    }
  }
}));
