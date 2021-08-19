import React, { useState } from "react";

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

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationCityIcon from "@material-ui/icons/LocationCity";

import "./ad-element.style.scss";

const AdElement = ({ adInfo }) => {
  const [additionalInfo, setAdditionalInfo] = useState(false);
  const addDate = adInfo
    ? new Date(adInfo.addDate).toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    : null;

  return (
    <Grid container>
      <Box className="ad_element" textAlign="center" xs={12} boxShadow={10}>
        <Card className="content">
          <CardMedia
            component="img"
            alt={adInfo.title}
            image={adInfo.photoData.seoLinkF}
            title={adInfo.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {adInfo.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {adInfo.autoData.description}
            </Typography>
            <List component="nav">
              <ListItem>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={adInfo.USD} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary={adInfo.autoData.year} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText primary={adInfo.locationCityName} />
              </ListItem>
            </List>
          </CardContent>
          <Divider />
          <CardActions>
            {!additionalInfo ? (
              <Button
                onClick={() => setAdditionalInfo(true)}
                size="small"
                color="primary"
              >
                Доп. информация
              </Button>
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
                        {adInfo.autoData.race}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Двигатель
                      </TableCell>
                      <TableCell align="right">
                        {adInfo.autoData.fuelName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Привод
                      </TableCell>
                      <TableCell align="right">
                        {adInfo.autoData.driveName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        КПП
                      </TableCell>
                      <TableCell align="right">
                        {adInfo.autoData.gearboxName}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default AdElement;
