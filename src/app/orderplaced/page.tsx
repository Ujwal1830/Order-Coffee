'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';

const OrderPlacedPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Clear the loading timer on component unmount
        return () => clearTimeout(loadingTimer);
    }, []);

    useEffect(() => {
        if (!loading) {
            // Wait for 3 seconds after loading is done
            const orderPlacedTimer = setTimeout(() => {
                // Redirect to the home page
                router.replace('/');
            }, 3000);

            // Clear the order placed timer on component unmount
            return () => clearTimeout(orderPlacedTimer);
        }
    }, [loading, router]);


    return (
        <div className="flex flex-col items-center justify-center h-screen -mt-24">
            {loading ? (
                <div className="text-center">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className="text-center text-6xl text-green-600 font-extrabold animate-bounce">
                    <h1>Order Placed ✅</h1>
                </div>
            )}
        </div>
    );
};

export default OrderPlacedPage;
