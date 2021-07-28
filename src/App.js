import { useState, useEffect } from "react";

import Filter from "./components/filter/Filter";
import FavoriteList from "./components/favorite-list/FavoriteList";
import AdFeed from "./components/ad-feed/AdFeed";

import "./App.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  // const fetchRia = () => {
  //   fetch(
  //     "https://developers.ria.com/auto/categories/1/marks?api_key=CSZCqn3KA6mjPoYwZtA3AgQBaDa3PJ7ga9fjODMH"
  //   )
  //     .then((response) => response.json())
  //     .then((json) => console.log(json[106]));
  // };

  //category_id=1

  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      const localFavorites = JSON.parse(localStorage.getItem("favorites"));
      if (localFavorites.length) {
        setFavorites(localFavorites);
      }
    }
  }, [favorites]);

  const handleFavorite = (carObject) => {
    const checkFavorites = favorites.filter(
      (favorite) => favorite.modelID === carObject.modelID
    );
    if (checkFavorites.length) {
      alert("it's already in the favorite list!");
      return false;
    }
    setFavorites([...favorites, carObject]);
  };

  const handleDeleteFavorite = (modelID) => {
    const newFavorites = favorites.filter(
      (favorite) => favorite.modelID !== modelID
    );
    setFavorites(newFavorites);
    if (!newFavorites.length) {
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  console.log("favorites: ", favorites);

  return (
    <div className="App">
      <div className="header">
        {favorites ? (
          <FavoriteList
            favorites={favorites}
            deleteFavorite={handleDeleteFavorite}
          />
        ) : null}
      </div>
      <AdFeed favorites={favorites} />
      <Filter handleFavorite={handleFavorite} />
    </div>
  );
}

export default App;
