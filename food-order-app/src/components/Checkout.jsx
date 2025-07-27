import Modal from './UI/Modal.jsx';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import { useContext } from "react";
import CartContext from './StoreContext/CartContext.jsx';
import UserProgressContext from "./StoreContext/UserProgressContext.jsx";
import { currencyFormatter } from '../util/formatting.js';
import useHttp from "../hooks/useHttp.jsx";

const checkoutConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
export default function Checkout() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);
    const cartTotal = cartContext.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders',checkoutConfig);

    function handleDialogClose() {
        userProgressContext.hideCheckout();
    }

    function handleFinish() {
        userProgressContext.hideCheckout();
        cartContext.clearCart();
        clearData();
    }

    function handleCheckoutSubmit(event) {
        event.preventDefault();//dont go to same frontend server 
        const formData = new FormData(event.target);
        const checkoutData = Object.fromEntries(formData.entries());//key value pairs of all input "name"

        sendRequest(JSON.stringify({
            order: {
                items: cartContext.items,
                customer: checkoutData
            }
        }));
    }
    let actions = (<> <Button type="button" textOnly onClick={handleDialogClose}>Close</Button>
                <Button>Submit Order</Button> 
    </>);

    if (isSending) {
        actions = <span>Sending order data...</span>
    }
    if (data && !error) {
        return (
            <Modal open={userProgressContext.progress === 'checkout'} onClose={handleFinish} >
                <h2>Success!</h2>
                <p>Your order was submitted successfully!</p>
                <p>We will get back to you with more details via email within the next few minutes. </p>
                <p className="modal-actions">
                    <Button onClick={handleFinish }> Okay</Button>
                </p>
            </Modal>
        );
    }

    return <Modal open={userProgressContext.progress === 'checkout'} onClose={handleDialogClose} >
        <form onSubmit={handleCheckoutSubmit }>
            <h2>Checkout</h2>
            <p>TotalAmount:{currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="name" />
            <Input label="E-mail Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>
            {error && <Error title={'Failed to submit order' } message={error} /> }
            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}