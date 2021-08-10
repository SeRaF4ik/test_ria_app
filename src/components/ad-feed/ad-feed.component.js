import React, { useEffect, useState } from "react";

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
    <div className="ad_feed">
      <h4>AD FEED</h4>
      {ads.length && filterInfo.cars.length ? (
        ads.map((ad) => <AdElement key={ad} adID={ad} />)
      ) : !ads.length && filterInfo.cars.length ? (
        <p className="empty_cars">No ads for this filter!</p>
      ) : (
        <p className="empty_cars">No cars selected for filter!</p>
      )}
    </div>
  );
};

export default AdFeed;
