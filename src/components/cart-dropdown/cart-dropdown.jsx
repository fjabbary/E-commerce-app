import Button from "../button/button";
import "./cart-dropdown.scss";
import CartItem from "../cart-item/cart-item";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
