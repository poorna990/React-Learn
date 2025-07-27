import  Modal  from './UI/Modal.jsx';
import { useContext } from "react";
import Button from './UI/Button.jsx';
import CartContext from './StoreContext/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import UserProgressContext from "./StoreContext/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const cartTotal = cartContext.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);
    function handleCloseCart() {
        userProgressContext.hideCart();
    }
    function goToCheckout() {
        userProgressContext.showCheckout();
    }
    return <Modal className="cart" open={userProgressContext.progress === 'cart'}
        onClose={ userProgressContext.progress === 'cart' ? handleCloseCart : null}>
        <h2> Your Cart</h2>

        <ul>
            {cartContext.items.map((item) => {
                return (<CartItem key={item.id}
                    item={item} 
                    onIncrease={() => cartContext.addItem(item)}
                    onDecrease={() => cartContext.removeItem(item.id)} />
            ); })}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartContext.items.length > 0 && (< Button onClick={goToCheckout}>Go To Checkout</Button>) }
        </p>
    </Modal>
}