'use client'

import { useEffect, useState } from "react";
import { AllCoffees } from "@/utils/AllCoffee";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CoffeeCard from "@/components/CoffeCard";
import { CartProvider } from "@/context/CartContext";

export interface Coffee {
  id: number;
  name: string;
  packSize: string;
  minQuantity: number;
  price: number;
}

export interface Props {
  coffee: Coffee;
}

export default function Home() {
  const { data, status } = useSession();
  const router = useRouter();

  const [allCoffees, setAllCoffees] = useState<Coffee[]>([]);  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
    setAllCoffees(AllCoffees);
  }, []);


  return (
      <div className="">
        {allCoffees && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 m-1">
            {allCoffees.map((coffee, index) => (
              <CoffeeCard key={index} coffee={coffee} />
            ))}
          </div>
        )}
      </div>
  );
}



