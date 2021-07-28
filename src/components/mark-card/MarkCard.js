import React, { useState, useEffect } from "react";

import "./mark-card.style.scss";

const MarkCard = ({ markArray, handleFavorite }) => {
  const [models, setModels] = useState([]);
  const [states, setStates] = useState([]);
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

  const fetchStates = () => {
    fetch("https://seraf4ik.com.ua/ria/send_req.php?link=/states&type=filter")
      .then((response) => response.json())
      .then((json) => setStates(json));
  };

  const pickedModel = (event) => {
    const select = event.target;

    setCarInfo({
      ...carInfo,
      modelName: select.options[select.selectedIndex].text,
      modelID: select.value,
    });

    fetchStates();
  };

  const pickedStates = (event) => {
    const select = event.target;

    const selectedStatesText = Array.from(select.options)
      .filter((option) => option.selected)
      .map((option) => [option.text, option.value]);

    setCarInfo({
      ...carInfo,
      states: selectedStatesText,
    });
  };

  const handlePrice = (event) => {
    const { name, value } = event.target;
    setCarInfo({
      ...carInfo,
      [name]: value,
    });
  };

  const addToFavorite = () => {
    console.log("favorite data: ", carInfo);
    handleFavorite(carInfo);
  };

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
      {states.length ? (
        <select multiple id="states" onChange={pickedStates}>
          {states.map((state) => (
            <option key={state.value} value={state.value}>
              {state.name}
            </option>
          ))}
        </select>
      ) : null}
      <input
        type="number"
        name="price_from"
        placeholder="Price from"
        onChange={handlePrice}
      />
      <input
        type="number"
        name="price_to"
        placeholder="Price to"
        onChange={handlePrice}
      />
      {carInfo.states ? (
        carInfo.states.length ? (
          <button className="add_favorite" onClick={addToFavorite}>
            Add to favorite
          </button>
        ) : null
      ) : null}
    </div>
  );
};

export default MarkCard;
