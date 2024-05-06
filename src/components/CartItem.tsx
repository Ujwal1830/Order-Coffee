'use client'

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface Props {
  coffee: {
    id: number;
    name: string;
    packSize: string;
    minQuantity: number;
    price: number;
  };
  coffeequantity: number;
}

const CartItem: React.FC<Props> = ({ coffee, coffeequantity}) => {
  const { removeFromCart, updateCartItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(coffeequantity);

  console.log(coffee, coffeequantity);
  
  const handleIncrement = () => {
    setQuantity(quantity + 1);
    updateCartItemQuantity(coffee.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > coffee.minQuantity) {
      setQuantity(quantity - 1);
      updateCartItemQuantity(coffee.id, quantity - 1);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(coffee.id);
  };

  return (
    <div className="md:w-64 p-1 mx-10">
      <div className="w-full mx-auto p-2 bg-white shadow-md rounded-md flex">
        <div className="w-full flex flex-col justify-around">
          <h2 className="mx-3 text-2xl text-gray-700 font-semibold mb-2">
            {coffee.name}
          </h2>
          <div className="my-3 mx-5 flex flex-col text-base md:text-lg text-gray-700 gap-2">
            <div className="flex justify-between">
              <span>Pack Size: </span>
              <span>{coffee.packSize}</span>
            </div>
            <div className="flex flex-row gap-2 justify-between">
              <span>Quantity: </span>
              <div className="flex flex-row gap-2">
                <button
                  onClick={handleDecrement}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Price: </span>
              <span>₹{ parseInt(coffee.packSize.split(' ')[0]) * quantity * 2 }</span>
            </div>
          </div>
          <div className="mt-2 mx-3">
            <button
              onClick={handleRemoveFromCart}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
