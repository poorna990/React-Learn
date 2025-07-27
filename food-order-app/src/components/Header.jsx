import foodlogo from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import { useContext } from 'react';
import CartContext from './StoreContext/CartContext.jsx';
import UserProgressContext from "./StoreContext/UserProgressContext.jsx";

export default function Header() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    function showCart() {
        userProgressContext.showCart();
    }

    const totalCartItems = cartContext.items.reduce((totalNumberOfItems, item) => { return totalNumberOfItems + item.quantity; }, 0);
    return ( <header id="main-header">
        <div id="title">
            <img src={foodlogo} alt="Restaurant!" />
            <h1>React Food</h1>
        </div>
        <nav>
            <Button textOnly onClick={showCart }>Cart ({totalCartItems})
            </Button>
        </nav>
    </header>
    );
}