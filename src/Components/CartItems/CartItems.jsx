import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { formatImageUrl } from '../../utils/imageHelpers';

const CartItems = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartItemQuantity,
    getTotalCartAmount,
  } = useContext(ShopContext);

  // Function to increase item quantity
  const increaseItemQuantity = async (item) => {
    await updateCartItemQuantity(item._id, item.quantity + 1);
  };

  // Function to decrease item quantity or remove from cart if quantity is 1
  const decreaseItemQuantity = async (item) => {
    if (item.quantity > 1) {
      await updateCartItemQuantity(item._id, item.quantity - 1);
    } else {
      await removeFromCart(item._id);
    }
  };

  return (
    <div className="cart-items">
      <div className="cart-items-header cart-items-grid">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map((item) => (
        <div key={item._id}>
          <div className="cart-items-row cart-items-grid">
            <img
              src={formatImageUrl(item.product.image)}
              alt={item.product.name}
              className="cart-product-image"
            />
            <p>{item.product.name}</p>
            <p>${item.product.new_price}</p>
            <div className="cart-quantity-controls">
              <button onClick={() => decreaseItemQuantity(item)}> - </button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseItemQuantity(item)}> + </button>
            </div>
            <p>${(item.product.new_price * item.quantity).toFixed(2)}</p>
            <img
              className="cart-remove-icon"
              src={remove_icon}
              onClick={() => {
                removeFromCart(item._id);
              }}
              alt="Remove"
            />
          </div>
          <hr />
        </div>
      ))}
      <div className="cart-summary">
        <div className="cart-totals">
          <h1>Cart Totals</h1>
          <div>
            <div className="cart-totals-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-totals-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-totals-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button className="cart-checkout-button">PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promo-box">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
