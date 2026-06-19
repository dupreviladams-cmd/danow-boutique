import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { Product, CartItem } from '../types';
interface CartState {
  items: CartItem[];
  total: number;
}
type CartAction =
{
  type: 'ADD_ITEM';
  payload: Product;
} |
{
  type: 'REMOVE_ITEM';
  payload: string;
} |
{
  type: 'UPDATE_QUANTITY';
  payload: {
    id: string;
    quantity: number;
  };
} |
{
  type: 'CLEAR_CART';
} |
{
  type: 'LOAD_CART';
  payload: CartItem[];
};
const CartContext = createContext<
  {
    state: CartState;
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
  } |
  undefined>(
  undefined);
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':{
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        let newItems;
        if (existingItem) {
          newItems = state.items.map((item) =>
          item.id === action.payload.id ?
          {
            ...item,
            quantity: item.quantity + 1
          } :
          item
          );
        } else {
          newItems = [
          ...state.items,
          {
            ...action.payload,
            quantity: 1
          }];

        }
        return {
          items: newItems,
          total: newItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )
        };
      }
    case 'REMOVE_ITEM':{
        const newItems = state.items.filter((item) => item.id !== action.payload);
        return {
          items: newItems,
          total: newItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )
        };
      }
    case 'UPDATE_QUANTITY':{
        const newItems = state.items.map((item) =>
        item.id === action.payload.id ?
        {
          ...item,
          quantity: Math.max(1, action.payload.quantity)
        } :
        item
        );
        return {
          items: newItems,
          total: newItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )
        };
      }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    case 'LOAD_CART':
      return {
        items: action.payload,
        total: action.payload.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      };
    default:
      return state;
  }
};
export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });
  useEffect(() => {
    const savedCart = localStorage.getItem('danow-shop-cart');
    if (savedCart) {
      try {
        dispatch({
          type: 'LOAD_CART',
          payload: JSON.parse(savedCart)
        });
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('danow-shop-cart', JSON.stringify(state.items));
  }, [state.items]);
  const addItem = (product: Product) =>
  dispatch({
    type: 'ADD_ITEM',
    payload: product
  });
  const removeItem = (id: string) =>
  dispatch({
    type: 'REMOVE_ITEM',
    payload: id
  });
  const updateQuantity = (id: string, quantity: number) =>
  dispatch({
    type: 'UPDATE_QUANTITY',
    payload: {
      id,
      quantity
    }
  });
  const clearCart = () =>
  dispatch({
    type: 'CLEAR_CART'
  });
  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
      }}>
      
      {children}
    </CartContext.Provider>);

}
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};