'use client';

import { FormEvent, useState } from 'react';
import styles from './AuthForm.module.sass';
import { useAuthStore } from '@/stores';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
    type: 'sign-in' | 'sign-up';
    title: string;
    btnLabel: string;
}

const AuthForm = ({ type, btnLabel, title }: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { user, signUp, signIn, isLoading } = useAuthStore();
    const router = useRouter();

    const isUsernameValid = username.trim().length >= 2;
    const isPasswordValid = password.trim().length >= 8;
    const isValid = isUsernameValid && isPasswordValid;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (type === 'sign-in') {
            const success = await signIn({ username, password });
            if (success) router.push('/');
        } else {
            const success = await signUp({ username, password });
            if (success) router.push('/');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.inputs}>
                <label className={styles.label}>
                    <span className={styles.titleLabel}>Имя пользователя</span>
                    <input
                        className={styles.input}
                        type='text'
                        placeholder='Имя пользователя...'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    <span className={styles.titleLabel}>Пароль</span>
                    <input
                        className={styles.input}
                        type='password'
                        placeholder='Пароль...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <button disabled={!isValid || isLoading} className={styles.btn}>
                {btnLabel}
            </button>
            <div className={styles.help}>
                {type === 'sign-in' ? (
                    <>
                        <span className={styles.helpTitle}>
                            У вас нет аккаунта?
                        </span>
                        <Link href='/auth/sign-up' className={styles.helpLink}>
                            Зарагистрироваться
                        </Link>
                    </>
                ) : (
                    <>
                        <span className={styles.helpTitle}>
                            У вас есть аккаунт?
                        </span>
                        <Link href='/auth/sign-in' className={styles.helpLink}>
                            Войти
                        </Link>
                    </>
                )}
            </div>
        </form>
    );
};

export default AuthForm;
