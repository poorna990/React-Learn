import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
export default function Modal({ children, open, className ='',onClose  }) {

    //use open through useEffect programmatically, not inbuilt open prop

    const dialog = useRef();
    useEffect(() => {
        const dialogValue = dialog.current;
        if (open) {
            dialogValue.showModal();
        } 

        return () => dialogValue.close();
    }, [open])
    return createPortal(
        <dialog className={`modal ${className}`}
            ref={dialog}
            onClose={onClose}
        >
            {children}
        </dialog>,
        document.getElementById('modal'));
}