import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    try {
      const savedFavourites =
        localStorage.getItem("soundx-favourites");

      return savedFavourites
        ? JSON.parse(savedFavourites)
        : [];
    } catch (error) {
      console.error(
        "Error loading favourites:",
        error
      );

      return [];
    }
  });


  // =====================================================
  // SAVE FAVOURITES
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "soundx-favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);


  // =====================================================
  // ADD / REMOVE FAVOURITE
  // =====================================================

  const toggleFavourite = (product) => {
    setFavourites((currentFavourites) => {
      const alreadyFavourite = currentFavourites.some(
        (item) => item.id === product.id
      );

      if (alreadyFavourite) {
        return currentFavourites.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentFavourites, product];
    });
  };


  // =====================================================
  // CHECK FAVOURITE
  // =====================================================

  const isFavourite = (productId) => {
    return favourites.some(
      (item) => item.id === productId
    );
  };


  // =====================================================
  // CLEAR
  // =====================================================

  const clearFavourites = () => {
    setFavourites([]);
  };


  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        clearFavourites,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};


export const useFavourite = () => {
  const context = useContext(FavouriteContext);

  if (!context) {
    throw new Error(
      "useFavourite must be used inside FavouriteProvider"
    );
  }

  return context;
};


export default FavouriteContext;