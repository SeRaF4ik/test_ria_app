import React, { useState, useEffect } from "react";
import RiaApi from "../../utils/riaApi";

import { Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { marksArray } from "./marks";

import "./select-car.style.scss";

const SelectCar = ({ handleFilterCar }) => {
  const [models, setModels] = useState([]);
  const [carInfo, setCarInfo] = useState({});

  const marks = marksArray;

  const chooseMark = (choosenMark) => {
    if (choosenMark !== null) {
      const pickedMark = marks.filter((mark) => mark.name === choosenMark);
      const { name, value } = pickedMark[0];
      setCarInfo({ markID: value, markName: name });
      setModels([]);
    } else {
      setModels([]);
    }
  };

  const chooseModel = (choosenModel) => {
    if (choosenModel !== null) {
      const pickedModel = models.filter((model) => model.name === choosenModel);
      const { name, value } = pickedModel[0];
      handleFilterCar({
        ...carInfo,
        modelID: value,
        modelName: name,
      });
    }
  };

  useEffect(() => {
    const api = new RiaApi();

    if (carInfo.markID) {
      api.fetchModel(carInfo.markID).then((json) => {
        if (json.error) {
          console.error(json.error);
        } else {
          setModels(json);
        }
      });
    }
  }, [carInfo.markID]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="select_car"
    >
      <Grid className="search_mark" item xs={10}>
        <Autocomplete
          id="search_mark"
          options={marks.map((mark) => mark.name)}
          onChange={(event, markName) => chooseMark(markName)}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выберите марку авто"
              variant="outlined"
            />
          )}
        />
      </Grid>
      {models.length ? (
        <Grid className="search_model" item xs={10}>
          <Autocomplete
            id="search_model"
            options={models.map((model) => model.name)}
            onChange={(event, modelName) => chooseModel(modelName)}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Выберите модель авто"
                variant="outlined"
              />
            )}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default SelectCar;
