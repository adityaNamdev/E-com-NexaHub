import { useState,useEffect , useContext, createContext } from "react";

const WishContext = createContext();
const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([]);
 
  useEffect(() => {
    let existingWishItem = localStorage.getItem("wish");
    if (existingWishItem) setWish(JSON.parse(existingWishItem));
  }, []);

  return (
    <WishContext.Provider value={[wish, setWish]}>
      {children}
    </WishContext.Provider>
  );
};

const useWish = () => useContext(WishContext);

export {useWish, WishProvider };
