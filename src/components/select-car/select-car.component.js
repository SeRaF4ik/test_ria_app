import React, { useState, useEffect } from "react";

import MarkList from "../mark-list/MarkList";
import MarkCard from "../mark-card/mark-card.component";

import "./select-car.style.scss";

const SelectCar = ({ handleFilterCar }) => {
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
    <div className="select_car">
      <input type="string" onInput={searchMark} placeholder="Type the mark" />
      {inputMarks.length ? (
        <MarkList marks={inputMarks} pickMark={pickMark} />
      ) : null}
      {pickedMark.length ? (
        <MarkCard markArray={pickedMark} handleFilterCar={handleFilterCar} />
      ) : null}
    </div>
  );
};

export default SelectCar;
