import styles from './Button.module.scss';
import classNames from 'classnames';

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    tabIndex?: number;
};

const Button = ({ children, onClick, disabled, className, tabIndex }: Props) => {
    return (
        <button
            tabIndex={tabIndex}
            className={classNames(styles.button, className, { [styles.disabled]: disabled })}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
