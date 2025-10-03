import { UserInterface } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosClient } from '@/lib';
import { toast } from 'react-toastify';

interface UserData {
    username: string;
    password: string;
}

interface AuthStore {
    user: UserInterface | null;
    isLoading: boolean;

    signUp: (data: UserData) => Promise<void>;
    signIn: (data: UserData) => Promise<void>;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,

            async signUp(data: UserData): Promise<void> {
                set({ isLoading: true });

                try {
                    const res = await axiosClient.post<UserInterface>(
                        '/auth/sign-up',
                        data
                    );

                    set({ user: res.data });
                    toast.success('Вы успешно зарегистрированы');
                } catch (error) {
                    console.error('Ошибка при регистрации:', error);
                    toast.error('Ошибка при регистрации');
                } finally {
                    set({ isLoading: false });
                }
            },

            async signIn(data: UserData): Promise<void> {
                set({ isLoading: true });

                try {
                    const res = await axiosClient.post<UserInterface>(
                        '/auth/sign-in',
                        data
                    );

                    set({ user: res.data });
                    toast.success('Вы успешно вошли');
                } catch (error) {
                    console.error('Ошибка при входе:', error);
                    toast.error('Ошибка при авторизации');
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
                    console.error('Ошибка при выходе:', error);
                    toast.error('Ошибка при выходе');
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
