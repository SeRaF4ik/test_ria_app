import React, { useState, useEffect } from "react";

import SelectedCarList from "../selected-car-list/selected-car-list.component";
import SelectCar from "../select-car/select-car.component";
import FilterForm from "../filter-form/filter-form.component";

import { Grid } from "@material-ui/core";

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
    <Grid container spacing={0} className="filter">
      <Grid item xs={12}>
        <h4>Фильтр</h4>
      </Grid>
      <Grid item xs={12}>
        <SelectedCarList
          filterInfo={filterInfo}
          deleteFilterCar={deleteFilterCar}
        />
      </Grid>
      <Grid item xs={6}>
        <SelectCar handleFilterCar={handleFilterCar} />
      </Grid>
      <Grid item xs={6}>
        <FilterForm
          filterInfo={filterInfo}
          saveFilterInfo={saveFilterInfo}
          states={states}
        />
      </Grid>
    </Grid>
  );
};

export default Filter;
