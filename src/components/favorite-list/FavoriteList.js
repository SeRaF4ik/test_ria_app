import React from "react";

import "./favorite-list.style.scss";

const FavoriteList = ({ favorites, deleteFavorite }) => (
  <div className="favorites">
    <h4>FAVORITE LIST</h4>
    <div className="favorite_list">
      {favorites.map((auto) => (
        <div key={auto.modelID} className="favorite_item">
          <h4>{auto.markName}</h4>
          <p>{auto.modelName}</p>
          <button onClick={() => deleteFavorite(auto.modelID)}>delete</button>
        </div>
      ))}
    </div>
  </div>
);

export default FavoriteList;
