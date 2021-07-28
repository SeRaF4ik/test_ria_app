import React, { useState, useEffect } from "react";

import MarkList from "../mark-list/MarkList";
import MarkCard from "../mark-card/MarkCard";

import "./filter.style.scss";

const Filter = ({ handleFavorite }) => {
  const [marks, setMarks] = useState([]);
  const [inputMarks, setInputMarks] = useState([]);
  const [pickedMark, setPickedMark] = useState([]);

  const fetchMarks = () => {
    fetch(
      "https://seraf4ik.com.ua/ria/send_req.php?link=/categories/1/marks&type=filter"
    )
      .then((response) => response.json())
      .then((json) => setMarks(json));
  };

  const searchMark = (event) => {
    const { value } = event.target;
    setInputMarks(
      marks.filter((mark) =>
        mark.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    setPickedMark([]);
  };

  const pickMark = (markID, markName) => {
    setPickedMark([markID, markName]);
    setInputMarks([]);
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  return (
    <div className="filter">
      <h4>Filter Auto</h4>
      <input type="string" onInput={searchMark} placeholder="Type the mark" />
      {inputMarks.length ? (
        <MarkList marks={inputMarks} pickMark={pickMark} />
      ) : null}
      {pickedMark.length ? (
        <MarkCard markArray={pickedMark} handleFavorite={handleFavorite} />
      ) : null}
    </div>
  );
};

export default Filter;
