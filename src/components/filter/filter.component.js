import React, { useState, useEffect } from "react";

import SelectedCarList from "../selected-car-list/selected-car-list.component";
import SelectCar from "../select-car/select-car.component";
import FilterForm from "../filter-form/filter-form.component";

import "./filter.style.scss";

const Filter = ({
  handleFilterCar,
  filterInfo,
  deleteFilterCar,
  saveFilterInfo,
}) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = () => {
      fetch("https://seraf4ik.com.ua/ria/send_req.php?link=/states&type=filter")
        .then((response) => response.json())
        .then((json) => setStates(json));
    };

    fetchStates();
  }, []);

  return (
    <div className="filter">
      <h4>FILTER</h4>
      <SelectedCarList
        filterInfo={filterInfo}
        deleteFilterCar={deleteFilterCar}
      />
      <SelectCar handleFilterCar={handleFilterCar} />
      <FilterForm
        filterInfo={filterInfo}
        saveFilterInfo={saveFilterInfo}
        states={states}
      />
    </div>
  );
};

export default Filter;
