import React, { useEffect, useState } from "react";
import RiaApi from "../../utils/riaApi";

import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Skeleton, Alert } from "@material-ui/lab";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationCityIcon from "@material-ui/icons/LocationCity";

import "./ad-element.style.scss";

const AdElement = ({ adID }) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [adInfo, setAdInfo] = useState({
    isLoading: true,
    data: null,
    error: null,
  });
  const addDate = adInfo.data
    ? new Date(adInfo.data.addDate).toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    : null;

  useEffect(() => {
    const api = new RiaApi();
    api.fetchDetailInfo(adID).then((json) => {
      if (json.error) {
        setAdInfo({
          isLoading: false,
          data: null,
          error: json.error.message,
        });
      } else {
        setAdInfo({
          isLoading: false,
          data: json,
          error: null,
        });
      }
    });
  }, [adID]);

  return (
    <Grid container>
      {adInfo.error ? (
        <Alert variant="filled" className="ad_error" severity="error">
          {adInfo.error}
        </Alert>
      ) : (
        <Box className="ad_element" textAlign="center" xs={12} boxShadow={10}>
          <Card className="content">
            {adInfo.isLoading ? (
              <Skeleton variant="rect" animation="wave" height={150} />
            ) : (
              <CardMedia
                component="img"
                alt={adInfo.data.title}
                image={adInfo.data.photoData.seoLinkF}
                title={adInfo.data.title}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {adInfo.isLoading ? <Skeleton /> : adInfo.data.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {adInfo.isLoading ? (
                  <Skeleton />
                ) : (
                  adInfo.data.autoData.description
                )}
              </Typography>
              {adInfo.isLoading ? (
                <Skeleton />
              ) : (
                <List component="nav">
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary={adInfo.data.USD} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText primary={adInfo.data.autoData.year} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText primary={adInfo.data.locationCityName} />
                  </ListItem>
                </List>
              )}
            </CardContent>
            <Divider />
            <CardActions>
              {!showAdditionalInfo ? (
                adInfo.isLoading ? (
                  <Skeleton width="100%" />
                ) : (
                  <Button
                    onClick={() => setShowAdditionalInfo(true)}
                    size="small"
                    color="primary"
                  >
                    Доп. информация
                  </Button>
                )
              ) : (
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Дата объявления
                        </TableCell>
                        <TableCell align="right">{addDate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Пробег
                        </TableCell>
                        <TableCell align="right">
                          {adInfo.data.autoData.race}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Двигатель
                        </TableCell>
                        <TableCell align="right">
                          {adInfo.data.autoData.fuelName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Привод
                        </TableCell>
                        <TableCell align="right">
                          {adInfo.data.autoData.driveName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          КПП
                        </TableCell>
                        <TableCell align="right">
                          {adInfo.data.autoData.gearboxName}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardActions>
          </Card>
        </Box>
      )}
    </Grid>
  );
};

export default AdElement;
