import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.scss";

const CheckoutItem = ({ cartItem }) => {
  const { changeCartQty, deleteCartItem } = useContext(CartContext);
  const { name, quantity, price, imageUrl } = cartItem;

  const incCartQtyHnadler = () => changeCartQty(cartItem.id, "inc");
  const decCartQtyHnadler = () => changeCartQty(cartItem.id, "dec");
  const deleteCartItemHandler = () => deleteCartItem(cartItem.id);

  return (
    <div className="checkout-item">
      <div className="checkout-item-image">
        <img src={imageUrl} alt={name} />
      </div>
      <div>{name}</div>
      <div>
        <i
          className="fa-solid fa-less-than"
          title="Decrease"
          onClick={decCartQtyHnadler}
        ></i>
        <span className="quantity">{quantity}</span>
        <i
          className="fa-solid fa-greater-than"
          title="Increase"
          onClick={incCartQtyHnadler}
        ></i>
      </div>
      <div>{price}</div>
      <div className="checkout-remove">
        <span onClick={deleteCartItemHandler}>&times;</span>
      </div>
    </div>
  );
};

export default CheckoutItem;
