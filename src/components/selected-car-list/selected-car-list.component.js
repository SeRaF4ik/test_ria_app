import React from "react";

import "./selected-car-list.style.scss";

const SelectedCarList = ({ filterInfo, deleteFilterCar }) => {
  return (
    <div className="selected_cars">
      <h4>SELECTED CARS</h4>
      {filterInfo && filterInfo.cars.length ? (
        <div className="car_list">
          {filterInfo.cars.map((auto) => (
            <div key={auto.modelID} className="car">
              <h5>{auto.markName}</h5>
              <p>{auto.modelName}</p>
              <button onClick={() => deleteFilterCar(auto.modelID)}>
                delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty_cars">Empty selected cars!</p>
      )}
    </div>
  );
};

export default SelectedCarList;
