import { useState } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  const [cartState, setCartState] = useState(defaultCartState);

  const addItemToCartHandler = (item) => {
    setCartState((prevState) => {
      const existingCartItemIndex = prevState.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      const existingCartItem = prevState.items[existingCartItemIndex];
      const updatedTotalAmount =
        prevState.totalAmount + item.price * item.amount;

      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + item.amount,
        };
        updatedItems = [...prevState.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = prevState.items.concat(item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    });
  };

  const removeItemFromCartHandler = (id) => {
    setCartState((prevState) => {
      const existingCartItemIndex = prevState.items.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingItem = prevState.items[existingCartItemIndex];
      const updatedTotalAmount = prevState.totalAmount - existingItem.price;

      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = prevState.items.filter((item) => item.id !== id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...prevState.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
