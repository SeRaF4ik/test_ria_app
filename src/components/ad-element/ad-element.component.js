import React, { useEffect, useState } from "react";

import "./ad-element.style.scss";

import loadingImg from "../../assets/loading.gif";

const AdElement = ({ adID }) => {
  const [adInfo, setAdInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdInfo = (adID) => {
      fetch(
        `https://seraf4ik.com.ua/ria/send_req.php?link=/info?auto_id=${adID}&type=info`
      )
        .then((response) => response.json())
        .then((json) => {
          setAdInfo(json);
          setIsLoading(false);
        });
    };

    fetchAdInfo(adID);
  }, [adID]);

  return (
    <div className="ad_element">
      {isLoading ? (
        <div className="loading">
          <img src={loadingImg} alt="loading" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="head">
            <p className="date">
              {new Date(adInfo.addDate).toLocaleString("ru", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </p>
            <p className="price">{adInfo.USD}$</p>
            <p className="year">{adInfo.autoData.year} год</p>
          </div>
          <div className="main">
            <img src={adInfo.photoData.seoLinkF} alt={adInfo.title} />
            <div className="info">
              <h5>{adInfo.title}</h5>
              <p className="race">Пробег: {adInfo.autoData.race}</p>
              <p className="fuel">Двигатель: {adInfo.autoData.fuelName}</p>
              <p className="drive">Привод: {adInfo.autoData.driveName}</p>
              <p className="gearbox">КПП: {adInfo.autoData.gearboxName}</p>
              <p className="city">Город: {adInfo.locationCityName}</p>
            </div>
          </div>
          <div className="foot">
            <h5>Описание</h5>
            <p className="descr">{adInfo.autoData.description}</p>
          </div>
        </>
      )}
    </div>
  );

  // if (adInfo) {
  //   return (
  //     <div className="ad_element">
  //       <div className="head">
  //         <p className="date">
  //           {new Date(adInfo.addDate).toLocaleString("ru", {
  //             year: "numeric",
  //             month: "numeric",
  //             day: "numeric",
  //           })}
  //         </p>
  //         <p className="price">{adInfo.USD}$</p>
  //         <p className="year">{adInfo.autoData.year} год</p>
  //       </div>
  //       <div className="main">
  //         <img src={adInfo.photoData.seoLinkF} alt={adInfo.title} />
  //         <div className="info">
  //           <h5>{adInfo.title}</h5>
  //           <p className="race">Пробег: {adInfo.autoData.race}</p>
  //           <p className="fuel">Двигатель: {adInfo.autoData.fuelName}</p>
  //           <p className="drive">Привод: {adInfo.autoData.driveName}</p>
  //           <p className="gearbox">КПП: {adInfo.autoData.gearboxName}</p>
  //           <p className="city">Город: {adInfo.locationCityName}</p>
  //         </div>
  //       </div>
  //       <div className="foot">
  //         <h5>Описание</h5>
  //         <p className="descr">{adInfo.autoData.description}</p>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return null;
  // }
};

export default AdElement;
