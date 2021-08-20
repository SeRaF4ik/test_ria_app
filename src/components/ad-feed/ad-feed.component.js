import React, { useEffect, useState } from "react";

import { Grid, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import AdElement from "../ad-element/ad-element.component";

import "./ad-feed.style.scss";

const AdFeed = ({ filterInfo }) => {
  const [ads, setAds] = useState([]);
  const [adsFullInfo, setAdsFullInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAds = (filterInfo) => {
      setIsLoading(true);
      let params =
        "&category_id=1&bodystyle[0]=2&bodystyle[1]=4&currency=1&countpage=10";
      params += filterInfo.price_from
        ? `&price_ot=${filterInfo.price_from}`
        : `&price_ot=0`;
      params += filterInfo.price_to ? `&price_do=${filterInfo.price_to}` : "";
      filterInfo.cars.map((auto, key) => {
        params += `&marka_id[${key}]=${auto.markID}`;
        params += `&model_id[${key}]=${auto.modelID}`;

        return params;
      });

      if (filterInfo.states.length) {
        filterInfo.states.map(
          (state, keyState) =>
            (params += `&state[${keyState}]=${state[1]}&city[${keyState}]=0`)
        );
      }

      fetch(
        `https://seraf4ik.com.ua/ria/send_req.php?link=/search${params}&type=search`
      )
        .then((response) => response.json())
        .then(
          (json) => {
            setAds(json.result.search_result.ids);
          },
          (error) => {
            setIsLoading(false);
            console.error("error ads: ", error);
          }
        );
    };

    if (filterInfo.cars.length) {
      checkAds(filterInfo);
    } else {
      setAds([]);
    }
  }, [filterInfo]);

  useEffect(() => {
    const fetchAdInfo = () => {
      fetch(
        "https://seraf4ik.com.ua/ria/send_req.php?get_full_info=" + ads.join()
      )
        .then((resp) => resp.json())
        .then(
          (json) => json.map((adInfo) => JSON.parse(adInfo)),
          (error) => {
            setIsLoading(false);
            console.error("error ads full info: ", error);
          }
        )
        .then((adsInfo) => {
          setAdsFullInfo(adsInfo);
          setIsLoading(false);
        });
    };

    if (ads.length) {
      fetchAdInfo();
    } else {
      setAdsFullInfo([]);
      setIsLoading(false);
    }
  }, [ads]);

  return (
    <Grid container justifyContent="center" className="ad_feed">
      <h4>Лента объявлений</h4>
      <Grid item xs={12} sm={10}>
        {isLoading ? (
          <Grid className="loading">
            <CircularProgress size={60} />
          </Grid>
        ) : adsFullInfo.length ? (
          adsFullInfo.map((adInfo, key) => (
            <AdElement key={key} adInfo={adInfo} />
          ))
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
