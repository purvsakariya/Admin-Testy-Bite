import { createContext, useState } from "react";

export const UserContext = createContext({
    progress:"",
    showCart:() => {},
    hideModel:()=>{},
    showCheckout:()=>{},
    showPlacedOrder:()=>{}
})

export function UserContextProvider({children}){

    const [progress, setProgress] = useState("");

    function showCart(){
        setProgress("cart");
    }
    function hideModel(){
        setProgress("");
    }
    function showCheckout(){
        setProgress("checkout");
    }
    function showPlacedOrder(){
        setProgress("orderPlaced");
    }

    const UserCtxValue= {
        progress:progress,
        showCart,
        hideModel,
        showCheckout,
        showPlacedOrder,
    }

    return <UserContext.Provider value={UserCtxValue}>{children}</UserContext.Provider>
}