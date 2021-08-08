import { useState, useEffect } from "react";

import Filter from "./components/filter/filter.component";
import AdFeed from "./components/ad-feed/ad-feed.component";

import "./App.css";

function App() {
  // const [filterInfo, setFilterInfo] = useState({
  //   price_from: 0,
  //   price_to: 0,
  //   states: [],
  //   cars: [],
  // });
  const [filterInfo, setFilterInfo] = useState(null);

  const handleFilterCar = (carObject) => {
    const checkFilterCars = filterInfo.cars.filter(
      (car) => car.modelID === carObject.modelID
    );
    if (checkFilterCars.length) {
      alert("it's already in the car list!");
      return false;
    }
    setFilterInfo({
      ...filterInfo,
      cars: [...filterInfo.cars, carObject],
    });
  };

  const deleteFilterCar = (modelID) => {
    const newFilterCars = filterInfo.cars.filter(
      (car) => car.modelID !== modelID
    );
    setFilterInfo({ ...filterInfo, cars: newFilterCars });
    localStorage.setItem("filter_info", JSON.stringify(filterInfo));
    if (!newFilterCars.length) {
      let localFilterInfo = JSON.parse(localStorage.getItem("filter_info"));
      localFilterInfo.cars = newFilterCars;
      localStorage.setItem("filter_info", JSON.stringify(localFilterInfo));
    }
  };

  useEffect(() => {
    if (filterInfo && filterInfo.cars.length) {
      localStorage.setItem("filter_info", JSON.stringify(filterInfo));
    } else {
      const localFilterInfo = JSON.parse(localStorage.getItem("filter_info"));
      if (localFilterInfo && !filterInfo) {
        setFilterInfo(localFilterInfo);
      }
    }
  }, [filterInfo]);

  return (
    <div className="App">
      {filterInfo ? <AdFeed filterInfo={filterInfo} /> : null}
      <Filter
        filterInfo={filterInfo}
        deleteFilterCar={deleteFilterCar}
        handleFilterCar={handleFilterCar}
        setFilterInfo={setFilterInfo}
      />
    </div>
  );
}

export default App;
