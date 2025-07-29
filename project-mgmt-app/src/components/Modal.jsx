import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.jsx';
const Modal = forwardRef(function Modal({ children, buttonCaption }, ref ) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            //open is a method provided/exposed by our component to other components.
            open() {
                dialog.current.showModal();
            }
        };
    });

    //forwardRef needed only if using react version 18 or older, if 19 no need. Accept refs as regular props in our custom component
    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right"> 
              
                <Button name= {buttonCaption}> </Button>
            </form>
        </dialog>, document.getElementById('modal-root')
    );
});

export default Modal;