import { createContext, useContext, useState } from "react";
const MyItem = createContext()

import { useEffect } from 'react';



export const MyCarProvider = ({children})=>{
    const[visibleCount , setVisibleCount] = useState(24);
    const [dataJson , setDataJson]=useState([]);
    const [itemsCart, setItemsCart] = useState(() => {
        const savedCart = localStorage.getItem("itemsCart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    useEffect(() => {
        localStorage.setItem("itemsCart", JSON.stringify(itemsCart));
    }, [itemsCart]);
    useEffect(() =>{
    async function getData() {
        try{
        const Data= await fetch("/product.json")
        const data = await Data.json()
        setDataJson(data)
        }catch(error){
        console.log(error)
        }
    }
    getData();
    },[])
    const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);
    const toggleFavorite = (product) => {
        setWishlist((prev) => {
            const isExist = prev.find(item => item.id === product.id);
            if (isExist) {
                return prev.filter(item => item.id !== product.id);
            } else {
                return [...prev, product];
            }
        });
    };
    return(
        <MyItem.Provider value={{wishlist,toggleFavorite,itemsCart ,setItemsCart ,dataJson,setDataJson ,visibleCount,setVisibleCount}}>
            {children}
        </MyItem.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDataCart = () =>{
    return(
        useContext(MyItem)
    )
}