import { useState, useEffect } from "react";

import Filter from "./components/filter/filter.component";
import AdFeed from "./components/ad-feed/ad-feed.component";
import Header from "./components/header/header.component";

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
  Hidden,
  Box,
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

  const getHelpInfo = () => {
    setDialogData({
      open: true,
      title: "Информация о приложении",
      text: "Тестовое приложение, работающее на AUTO.RIA API. Поиск объявлений происходит исключительно среди легковых авто, с типом кузова хэтчбэк/универсал.",
    });
  };

  useEffect(() => {
    const localFilterInfo = JSON.parse(localStorage.getItem("filter_info"));
    if (localFilterInfo) setFilterInfo(localFilterInfo);
  }, []);

  return (
    <Container maxWidth="xl" className="App">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Header getHelpInfo={getHelpInfo} />
        </Grid>
        <Hidden smUp>
          <Grid item xs={12}>
            <Box className="mobile_filter" boxShadow={10}>
              <Filter
                filterInfo={filterInfo}
                deleteFilterCar={deleteFilterCar}
                handleFilterCar={handleFilterCar}
                saveFilterInfo={saveFilterInfo}
              />
            </Box>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={6}>
          <AdFeed filterInfo={filterInfo} />
        </Grid>
        <Hidden only="xs">
          <Grid item sm={true}>
            <Divider orientation="vertical" />
          </Grid>
        </Hidden>
        <Hidden only="xs">
          <Grid item sm={5}>
            <Filter
              filterInfo={filterInfo}
              deleteFilterCar={deleteFilterCar}
              handleFilterCar={handleFilterCar}
              saveFilterInfo={saveFilterInfo}
            />
          </Grid>
        </Hidden>
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
