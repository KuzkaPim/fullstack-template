import { UserInterface } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosClient, handleError } from '@/lib';
import { toast } from 'react-toastify';

interface UserData {
    username: string;
    password: string;
}

interface AuthStore {
    user: UserInterface | null;
    isLoading: boolean;

    signUp: (data: UserData) => Promise<boolean>;
    signIn: (data: UserData) => Promise<boolean>;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,

            async signUp(data: UserData): Promise<boolean> {
                set({ isLoading: true });

                try {
                    const res = await axiosClient.post<UserInterface>(
                        '/auth/sign-up',
                        data
                    );

                    set({ user: res.data });
                    toast.success('Вы успешно зарегистрированы');
                    return true;
                } catch (error) {
                    handleError(error, 'Ошибка при регистрации');
                    return false;
                } finally {
                    set({ isLoading: false });
                }
            },

            async signIn(data: UserData): Promise<boolean> {
                set({ isLoading: true });

                try {
                    const res = await axiosClient.post<UserInterface>(
                        '/auth/sign-in',
                        data
                    );

                    set({ user: res.data });
                    toast.success('Вы успешно вошли');
                    return true;
                } catch (error) {
                    handleError(error, 'Ошибка при авторизации');
                    return false;
                } finally {
                    set({ isLoading: false });
                }
            },

            async signOut(): Promise<void> {
                set({ isLoading: true });

                try {
                    await axiosClient.get('/auth/sign-out');

                    set({ user: null });
                    toast.success('Вы успешно вышли');
                } catch (error) {
                    handleError(error, 'Ошибка при выходе');
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({ user: state.user }),
        }
    )
);
