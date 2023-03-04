import { FC } from 'react';
import styles from './modal-overlay.module.css';

type TProps = {
    onClose: () => void;
}

const ModalOverlay: FC<TProps> = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    );
}

export default ModalOverlay;