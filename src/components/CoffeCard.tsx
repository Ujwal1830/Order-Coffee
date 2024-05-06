'use client'

// CoffeeCard.tsx

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Props {
  coffee: {
    id: number;
    name: string;
    packSize: string;
    minQuantity: number;
    price: number;
  };
}

const CoffeeCard: React.FC<Props> = ({ coffee }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(coffee.minQuantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > coffee.minQuantity) {
      setQuantity(quantity - 1);
    }
  };
  const handledAddToCart = (coffee:any, quantity: any) => {

    addToCart(coffee, quantity);
  };

  return (
    <div className="flex items-center justify-center p-5">
      <div className="w-full md:max-w-xl mx-auto p-4 bg-white shadow-md rounded-md flex">
        <div className="border-2 rounded-lg min-w-44 max-w-52 min-h-44 max-h-52">
          <Image
            className="object-cover w-full"
            width={250}
            height={250}
            src={"/coffee.png"}
            alt="coffee image"
          />
        </div>
        <div className="w-full flex flex-col justify-around">
          <h2 className="mx-3 text-2xl text-gray-700 font-semibold mb-2">
            {coffee.name}
          </h2>
          <div className="my-3 mx-5 flex flex-col text-base md:text-base text-gray-700">
            <div>
              <span>Pack Size: </span>
              <span>{coffee.packSize}</span>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
              <span>No. of Packs: </span>
              <div className="flex flex-row gap-1 sm:gap-4">
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
            <div>
              <span>Price: </span>
              <span>₹{coffee.price}</span>
            </div>
          </div>
          <div className="mt-2 mx-3">
            <button
              onClick={()=>handledAddToCart(coffee, quantity)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;

