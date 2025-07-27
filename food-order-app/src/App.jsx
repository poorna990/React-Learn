import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import { CartContextProvider } from "./components/StoreContext/CartContext.jsx";
import { UserProgressContextProvider } from "./components/StoreContext/UserProgressContext.jsx";
import Checkout from "./components/Checkout.jsx";
function App() {
  return (
      <CartContextProvider>
      <UserProgressContextProvider>
          <Header />
              <Meals />
              <Cart />
              <Checkout />
       </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
