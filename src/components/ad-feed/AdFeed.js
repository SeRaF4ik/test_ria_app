import React from "react";

import "./ad-feed.style.scss";

const AdFeed = ({ favorites }) => {
  console.log("feed: ", favorites);
  return (
    <div className="ad_feed">
      <h4>AD FEED</h4>
      <p className="empty">EMPTY ADS IN THE FEED</p>
    </div>
  );
};

export default AdFeed;
