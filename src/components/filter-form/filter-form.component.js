import React, { useEffect, useState } from "react";

import "./filter-form.style.scss";

const FilterForm = ({ filterInfo, saveFilterInfo, states }) => {
  const [formParams, setFormParams] = useState({});

  const handlePrice = (event) => {
    const { name, value } = event.target;
    setFormParams({ ...formParams, [name]: parseInt(value, 10) });
  };

  const pickedStates = (event) => {
    const select = event.target;

    const selectedStatesText = Array.from(select.options)
      .filter((option) => option.selected)
      .map((option) => [option.text, option.value]);

    setFormParams({ ...formParams, states: selectedStatesText });
  };

  const saveForm = (event) => {
    event.preventDefault();

    saveFilterInfo({
      ...filterInfo,
      ...formParams,
    });
  };

  useEffect(() => {
    setFormParams({
      states: filterInfo.states,
      price_from: filterInfo.price_from,
      price_to: filterInfo.price_to,
    });
  }, [filterInfo.states, filterInfo.price_from, filterInfo.price_to]);

  return (
    <div className="other_params">
      <form onSubmit={saveForm}>
        {states.length ? (
          <div className="states">
            <label htmlFor="states">Pick a state</label>
            <select
              multiple
              id="states"
              name="states"
              defaultValue={formParams.states.map((state) => state[1])}
              onChange={pickedStates}
            >
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="price">
          <label htmlFor="price_from">Price from $</label>
          <input
            type="number"
            id="price_from"
            name="price_from"
            placeholder="Price from"
            value={formParams.price_from ? formParams.price_from : 0}
            onChange={handlePrice}
          />
        </div>
        <div className="price">
          <label htmlFor="price_to">Price to $</label>
          <input
            type="number"
            id="price_to"
            name="price_to"
            placeholder="Price to"
            value={formParams.price_to ? formParams.price_to : 0}
            onChange={handlePrice}
          />
        </div>
        <button className="save_params" type="submit">
          Save params
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
