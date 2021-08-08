import React, { useState, useEffect } from "react";

import "./mark-card.style.scss";

const MarkCard = ({ markArray, handleFilterCar }) => {
  const [models, setModels] = useState([]);
  const [markID, markName] = markArray;

  const [carInfo, setCarInfo] = useState({
    markName: markName,
    markID: markID,
  });

  const fetchModel = (markID) => {
    fetch(
      `https://seraf4ik.com.ua/ria/send_req.php?link=/categories/1/marks/${markID}/models&type=filter`
    )
      .then((response) => response.json())
      .then((models) => setModels(models));
  };

  const pickedModel = (event) => {
    const select = event.target;

    setCarInfo({
      ...carInfo,
      modelName: select.options[select.selectedIndex].text,
      modelID: select.value,
    });
  };

  // const addToFavorite = () => {
  //   console.log("favorite data: ", carInfo);
  //   handleFilterCar(carInfo);
  // };

  useEffect(() => {
    fetchModel(markID);
  }, [markID]);

  return (
    <div className="mark_card">
      <h2>{markName}</h2>
      {models.length ? (
        <select id="model" defaultValue="#" onChange={pickedModel}>
          <option value="#">Pick a model</option>
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.name}
            </option>
          ))}
        </select>
      ) : null}
      {carInfo.modelID ? (
        <button
          className="add_to_filter"
          onClick={() => handleFilterCar(carInfo)}
        >
          Add car to filter
        </button>
      ) : null}
    </div>
  );
};

export default MarkCard;
