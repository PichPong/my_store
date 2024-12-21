import React, {createContext, useState, useEffect} from 'react'
export const CartContexts = createContext();
export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, id) => {
    
    setCart((prevCart) => {
      
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, quantity = 1) => {
    if (quantity < 1) {
      setCart(() => []); // Clear the entire cart
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
            item.id === id
      ? {
          ...item,
          quantity: item.quantity - quantity,
          price: (item.unitPrice || item.price / item.quantity) * (item.quantity - quantity), // Ensure price is calculated correctly
        }
      : item
        ).filter((item) => item.quantity > 0) // Remove items with zero or negative quantity
      );
    }
  };

const updateCartQuantity = (id, quantity = 1) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              price: (item.unitPrice || item.price / item.quantity) * (item.quantity + quantity), // Ensure price is calculated correctly
            }
          : item
      )
    );
};
  
  
  

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContexts.Provider value={{cart, addToCart, removeFromCart, updateCartQuantity, clearCart}}> 
        {children}
    </CartContexts.Provider>
  )
}
