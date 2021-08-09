import React from "react";

import { Grid, Chip, Box, Divider } from "@material-ui/core";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import Alert from "@material-ui/lab/Alert";

import "./selected-car-list.style.scss";

const SelectedCarList = ({ filterInfo, deleteFilterCar }) => {
  return (
    <Box className="selected_cars">
      <h4>Выбранные авто</h4>
      {filterInfo.cars.length ? (
        <Grid container justifyContent="center" className="car_list">
          {filterInfo.cars.map((auto) => (
            <Grid key={auto.modelID} item xs={4} className="car">
              <Chip
                color="primary"
                onDelete={() => deleteFilterCar(auto.modelID)}
                label={auto.markName + " " + auto.modelName}
                icon={<DirectionsCarIcon />}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert variant="filled" className="empty_cars" severity="error">
          Список авто пуст!
        </Alert>
      )}
      <Divider />
    </Box>
  );
};

export default SelectedCarList;
