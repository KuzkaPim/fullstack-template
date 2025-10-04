'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components';
import { useAuthStore } from '@/stores';
import styles from './Header.module.sass';
import clsx from 'clsx';

const Header = () => {
    const { user, signOut } = useAuthStore();
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <Link href='/' className={styles.logo}>
                    <h1 className={styles.title}>Чатик</h1>
                </Link>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link
                                href='/'
                                className={clsx(
                                    styles.link,
                                    pathname === '/' && styles.active
                                )}
                            >
                                Главная
                            </Link>
                        </li>
                        {user ? (
                            <li className={styles.userInfo}>
                                <span className={styles.username}>
                                    {user.username}
                                </span>
                                <button
                                    onClick={signOut}
                                    className={styles.logout}
                                >
                                    Выйти
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className={styles.navItem}>
                                    <Link
                                        href='/auth/sign-in'
                                        className={clsx(
                                            styles.link,
                                            pathname === '/auth/sign-in' &&
                                                styles.active
                                        )}
                                    >
                                        Войти
                                    </Link>
                                </li>
                                <li className={styles.navItem}>
                                    <Link
                                        href='/auth/sign-up'
                                        className={clsx(
                                            styles.link,
                                            pathname === '/auth/sign-up' &&
                                                styles.active
                                        )}
                                    >
                                        Регистрация
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
