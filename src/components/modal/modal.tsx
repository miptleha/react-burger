import { useCallback, useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TProps = {
    caption?: string;
    children: React.ReactNode;
    onClose: (e?: Event) => void;
};

const Modal: FC<TProps> = ({ caption, children, onClose }) => {
    const checkEsc = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose(e);
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", checkEsc, false);

        return () => {
            document.removeEventListener("keydown", checkEsc, false);
        };
    }, [checkEsc]);

    return ReactDOM.createPortal((
        <div className={styles.container}>
            <div className={styles.dialog}>
                <div className={`${styles.header} ml-10 mt-10 mr-10`}>
                    <div className={`${styles.caption} text text_type_main-large`}>{caption}</div>
                    <div className={styles['close-btn']}><CloseIcon type="primary" onClick={onClose} /></div>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose} />
        </div>
    ), document.getElementById('modal') as Element);
}

export default Modal;