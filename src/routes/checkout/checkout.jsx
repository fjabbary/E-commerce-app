import "./checkout.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item";

const Checkout = () => {
  const { cartItems, cartTotalPrice } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div>Product</div>
        <div>Description</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Remove</div>
      </div>

      {cartItems.map((cartItem) => (
        <CheckoutItem cartItem={cartItem} key={cartItem.id} />
      ))}

      <div className="total-price">
        <h2>Total Price: ${cartTotalPrice()}</h2>
      </div>
    </div>
  );
};

export default Checkout;
