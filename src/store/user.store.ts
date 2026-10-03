import { create } from "zustand";
import { type UserDetailProfile, userService } from "../services/user.service";

interface UserState {
    user: UserDetailProfile | null;
    isLoading: boolean;
    error: string | null;

    setUser: (user: UserDetailProfile | null) => void;
    clearError: () => void;
    profileDetail: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
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
    }
}));