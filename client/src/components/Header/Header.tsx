'use client';

import Link from 'next/link';
import { Container } from '@/components';
import { useAuthStore } from '@/stores';
import styles from './Header.module.sass';

const Header = () => {
    const { user, signOut } = useAuthStore();

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <Link href='/' className={styles.logo}>
                    <h1 className={styles.title}>Чатик</h1>
                </Link>
                {user ? (
                    <div className={styles.userInfo}>
                        <span className={styles.username}>{user.username}</span>
                        <button onClick={signOut} className={styles.logout}>
                            Выйти
                        </button>
                    </div>
                ) : (
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}>
                                <Link
                                    href='/auth/sign-in'
                                    className={styles.link}
                                >
                                    Войти
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link
                                    href='/auth/sign-up'
                                    className={styles.link}
                                >
                                    Регистрация
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </Container>
        </header>
    );
};

export default Header;
