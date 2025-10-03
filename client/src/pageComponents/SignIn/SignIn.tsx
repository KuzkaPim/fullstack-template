import AuthForm from '@/components/UI/AuthForm/AuthForm';
import styles from './SignIn.module.sass';

const SignIn = () => {
    return (
        <section className={styles.signIn}>
            <AuthForm type='sign-in' title='Авторизация' btnLabel='Войти' />
        </section>
    );
};

export default SignIn;
