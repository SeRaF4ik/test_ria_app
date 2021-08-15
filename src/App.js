import { useState, useEffect } from "react";

import Filter from "./components/filter/filter.component";
import AdFeed from "./components/ad-feed/ad-feed.component";

import {
  Container,
  Grid,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@material-ui/core";

import "./App.css";

function App() {
  const [filterInfo, setFilterInfo] = useState({
    price_from: 0,
    price_to: 0,
    states: [],
    cars: [],
  });
  const [dialogData, setDialogData] = useState({
    open: false,
    title: null,
    text: null,
  });

  const handleFilterCar = (carObject) => {
    const checkFilterCars = filterInfo.cars.filter(
      (car) => car.modelID === carObject.modelID
    );
    if (checkFilterCars.length) {
      setDialogData({
        open: true,
        title: "Ошибка",
        text: "Данная модель авто уже добавлена в фильтр!",
      });
      return false;
    }
    saveFilterInfo({
      ...filterInfo,
      cars: [...filterInfo.cars, carObject],
    });
  };

  const deleteFilterCar = (modelID) => {
    const newFilterCars = filterInfo.cars.filter(
      (car) => car.modelID !== modelID
    );
    saveFilterInfo({ ...filterInfo, cars: newFilterCars });
  };

  const saveFilterInfo = (info) => {
    setFilterInfo(info);
    localStorage.setItem("filter_info", JSON.stringify(info));
  };

  useEffect(() => {
    const localFilterInfo = JSON.parse(localStorage.getItem("filter_info"));
    if (localFilterInfo) setFilterInfo(localFilterInfo);
  }, []);

  console.log("render app", filterInfo);

  return (
    <Container className="App">
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <AdFeed filterInfo={filterInfo} />
        </Grid>
        <Grid item xs={true}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={5}>
          <Filter
            filterInfo={filterInfo}
            deleteFilterCar={deleteFilterCar}
            handleFilterCar={handleFilterCar}
            saveFilterInfo={saveFilterInfo}
          />
        </Grid>
      </Grid>
      <Dialog
        open={dialogData.open}
        onClose={() => setDialogData({ open: false, title: null, text: null })}
      >
        <DialogTitle>{dialogData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogData.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setDialogData({ open: false, title: null, text: null })
            }
            color="primary"
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
