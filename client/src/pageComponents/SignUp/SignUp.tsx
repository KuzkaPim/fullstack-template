import AuthForm from '@/components/UI/AuthForm/AuthForm';
import styles from './SignUp.module.sass';

const SignUp = () => {
    return (
        <section className={styles.signUp}>
            <AuthForm
                type='sign-up'
                title='Регистрация'
                btnLabel='Зарегистрироваться'
            />
        </section>
    );
};

export default SignUp;
