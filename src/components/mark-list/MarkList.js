import React from "react";

import "./mark-list.style.scss";

const MarkList = ({ marks, pickMark }) => (
  <ul className="filter_marks">
    {marks.map((mark) => (
      <li key={mark.value} onClick={() => pickMark(mark.value, mark.name)}>
        {mark.name}
      </li>
    ))}
  </ul>
);

export default MarkList;
