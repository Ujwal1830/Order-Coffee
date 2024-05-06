'use client'

import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const CartPage: React.FC = () => {
    const router = useRouter();
  const { cart } = useCart();
  const [totalSum, setTotalSum] = useState(0);

  const calculateTotalSum = () => {
    let sum = 0;
    cart.forEach((item) => {
      sum += parseInt(item.coffee.packSize.split(" ")[0]) * item.quantity * 2;
    });
    return sum;
  };

  useEffect(() => {
    setTotalSum(calculateTotalSum());
  }, [cart]);


  return (
    <div>
        <div className="grid md:grid-cols-2">
            <div className=" ">
                <h1 className="text-center text-3xl font-bold text-gray-400">Your Cart</h1>
                {cart.length === 0 ? (
                    <div className="mt-20 text-center text-yellow-600 text-3xl">
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                    {cart.map((item) => {
                        return (
                            <CartItem key={item.coffee.id} coffee={item.coffee} coffeequantity={item.quantity} />
                        ) 
                        })}
                    </div>
                )}
                
            </div>
            {cart.length !== 0 && (
                <div className="min-w-60 w-[70%] h-72 mt-10 mx-auto md:p-7 p-2 bg-white shadow-md rounded-md flex flex-col justify-between">
                    <div className="">
                        <div className="my-5 flex flex-row justify-between">
                            <span className="text-lg text-slate-600">Product Cost: </span>
                            <span className="text-xl text-green-600 font-bold">₹{totalSum}</span>
                        </div>
                        <div className="text-base my-5 flex flex-row justify-between">
                            <span className="text-slate-600">Dilevery Charge: </span>
                            {( totalSum >= 50 && totalSum <= 100 ) &&<span className="text-green-600 font-bold">₹100 </span>}
                            {( totalSum > 100 && totalSum <= 200 ) &&<span className="text-green-600 font-bold">₹80 </span>}
                            {( totalSum > 200 ) && (
                                    <div className="flex flex-col">
                                        <span className="text-black line-through text-end">₹80</span>
                                        <span className="text-black underline">Free Delivery</span>
                                    </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className=" flex flex-row gap-4 items-center justify-between border-t-2 pt-1">
                            <h2 className="text-xl text-slate-600 font-bold">Grand Totol :</h2>
                            <span className="text-green-600 text-3xl font-extrabold">₹
                            {( totalSum >= 50 && totalSum <= 100 ) 
                                ? totalSum+100
                                : ( totalSum > 100 && totalSum <= 200 ) 
                                    ? totalSum+80
                                    : totalSum
                            }
                            </span>
                        </div>
                        <div className="m-2">
                            <button onClick={()=>router.replace('/orderplaced')} className="w-full bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    </div>
  );
};

export default CartPage;

