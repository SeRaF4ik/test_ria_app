import React, { useState, useEffect } from "react";

// import MarkList from "../mark-list/MarkList";
// import MarkCard from "../mark-card/mark-card.component";

import { Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import "./select-car.style.scss";

const SelectCar = ({ handleFilterCar }) => {
  const [marks, setMarks] = useState([]);
  const [models, setModels] = useState([]);
  const [carInfo, setCarInfo] = useState({});

  const chooseMark = (choosenMark) => {
    if (choosenMark !== null) {
      const pickedMark = marks.filter((mark) => mark.name === choosenMark);
      const { name, value } = pickedMark[0];
      setCarInfo({ markID: value, markName: name });
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
    const fetchMarks = () => {
      fetch(
        "https://seraf4ik.com.ua/ria/send_req.php?link=/categories/1/marks&type=filter"
      )
        .then((response) => response.json())
        .then((json) => setMarks(json));
    };

    fetchMarks();
  }, []);

  useEffect(() => {
    const fetchModel = () => {
      fetch(
        `https://seraf4ik.com.ua/ria/send_req.php?link=/categories/1/marks/${carInfo.markID}/models&type=filter`
      )
        .then((response) => response.json())
        .then((models) => setModels(models));
    };

    if (carInfo.markID) {
      fetchModel();
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
