import clsx from 'clsx';
import styles from './Container.module.sass';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	className?: string;
};

const Container = ({ children, className }: Props) => {
	return <div className={clsx(styles.container, className)}>{children}</div>;
};

export default Container;
