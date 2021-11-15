import React, { useEffect, useState } from "react";
import RiaApi from "../../utils/riaApi";

import { Grid, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import AdElement from "../ad-element/ad-element.component";

import "./ad-feed.style.scss";

const AdFeed = ({ filterInfo }) => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const api = new RiaApi();

    if (filterInfo.cars.length) {
      setIsLoading(true);
      api.fetchAds(filterInfo).then((json) => {
        if (json.error) {
          setIsLoading(false);
          console.error(json.error);
        } else {
          if (json.result.search_result.count > 0) {
            setAds(json.result.search_result.ids);
            setIsLoading(false);
          } else {
            setAds([]);
            setIsLoading(false);
          }
        }
      });
    } else {
      setAds([]);
    }
  }, [filterInfo]);

  return (
    <Grid container justifyContent="center" className="ad_feed">
      <h4>Лента объявлений</h4>
      <Grid item xs={12} sm={10}>
        {isLoading ? (
          <Grid className="loading">
            <CircularProgress size={60} />
          </Grid>
        ) : ads.length && filterInfo.cars.length ? (
          ads.map((adID, key) => <AdElement key={key} adID={adID} />)
        ) : !ads.length && filterInfo.cars.length ? (
          <Alert variant="filled" className="ads_error" severity="error">
            Нет объявлений под этот фильтр!
          </Alert>
        ) : (
          <Alert variant="filled" className="ads_error" severity="error">
            Список авто пуст!
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default AdFeed;
