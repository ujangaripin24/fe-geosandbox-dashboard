import { create } from "zustand";
import { type AddAddressUserPayload, type UpdateUserPayload, type UserDetailProfile, userService } from "../services/user.service";

interface UserState {
    user: UserDetailProfile | null;
    updateUser: UpdateUserPayload | null,
    addAddressUser: AddAddressUserPayload | null,
    isLoading: boolean;
    error: string | null;

    setUser: (user: UserDetailProfile | null) => void;
    clearError: () => void;
    profileDetail: () => Promise<void>;
    updateDetail: (payload: UpdateUserPayload) => Promise<string>;
    addUserAddress: (payload: AddAddressUserPayload) => Promise<string>;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    updateUser: null,
    addAddressUser: null,
    isLoading: false,
    error: null,

    setUser: (user: UserDetailProfile | null) => set({ user }),
    clearError: () => set({ error: null }),
    profileDetail: async () => {
        set({ isLoading: true, error: null });
        try {
            const profile = await userService.profileDetail();
            console.log("profile: ", profile)
            set({ user: profile, isLoading: false, error: null });
        } catch (error: any) {
            set({
                error: error.message || 'Gagal mengambil data profil',
                isLoading: false,
                user: null
            });
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
            set({
                error: error.message || 'Gagal update detail',
                isLoading: false,
            });
            throw error;
        }
    },
    addUserAddress: async (payload: AddAddressUserPayload) => {
        set({ isLoading: true, error: null })
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
            set({
                error: error.message || 'Gagal update detail',
                isLoading: false,
            });
            throw error;
        }
    }
}));