import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import AdElement from "../ad-element/ad-element.component";

import "./ad-feed.style.scss";

const AdFeed = ({ filterInfo }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const checkAds = (filterInfo) => {
      let params =
        "&category_id=1&bodystyle[0]=2&bodystyle[1]=4&currency=1&countpage=2";
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
        .then((json) => setAds(json.result.search_result.ids));
    };

    if (filterInfo.cars.length) {
      checkAds(filterInfo);
    }
  }, [filterInfo]);

  return (
    <Grid container justifyContent="center" className="ad_feed">
      <h4>Лента объявлений</h4>
      <Grid item xs={10}>
        {ads.length && filterInfo.cars.length ? (
          ads.map((ad) => <AdElement key={ad} adID={ad} />)
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
