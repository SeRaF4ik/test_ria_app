import React, { useEffect, useState } from "react";

import {
  Grid,
  Select,
  Input,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import "./filter-form.style.scss";

const FilterForm = ({ filterInfo, saveFilterInfo, states }) => {
  const [formParams, setFormParams] = useState({
    states: [],
    price_from: 0,
    price_to: 0,
  });
  const [disabledButton, setDisabledButton] = useState(true);

  const handlePrice = (event) => {
    const { name, value } = event.target;
    setFormParams({ ...formParams, [name]: value ? parseInt(value, 10) : 0 });
    setDisabledButton(false);
  };

  const pickedStates = (event) => {
    const values = event.target.value;

    const selectedStates = states
      .filter((state) => values.includes(state.value))
      .map((state) => [state.name, state.value]);

    setFormParams({ ...formParams, states: selectedStates });
    setDisabledButton(false);
  };

  const saveForm = (event) => {
    event.preventDefault();

    saveFilterInfo({
      ...filterInfo,
      ...formParams,
    });
    setDisabledButton(true);
  };

  useEffect(() => {
    setFormParams({
      states: filterInfo.states,
      price_from: filterInfo.price_from,
      price_to: filterInfo.price_to,
    });
  }, [filterInfo.states, filterInfo.price_from, filterInfo.price_to]);

  return (
    <Grid container justifyContent="center" className="other_params">
      <Grid item xs={10}>
        <form onSubmit={saveForm}>
          <FormControl fullWidth>
            <InputLabel id="states_label">Выберите области поиска</InputLabel>
            <Select
              labelId="states_label"
              id="choose_states"
              multiple
              fullWidth
              value={
                formParams.states.length
                  ? formParams.states.map((state) => state[1])
                  : formParams.states
              }
              onChange={pickedStates}
              input={<Input />}
            >
              {states.map((state) => (
                <MenuItem key={state.value} value={state.value}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" className="price">
            <InputLabel htmlFor="price_from">Цена от</InputLabel>
            <OutlinedInput
              id="price_from"
              name="price_from"
              value={formParams.price_from}
              onChange={handlePrice}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined" className="price">
            <InputLabel htmlFor="price_to">Цена до</InputLabel>
            <OutlinedInput
              id="price_to"
              name="price_to"
              value={formParams.price_to}
              onChange={handlePrice}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className="save_params"
            endIcon={<SaveIcon />}
            fullWidth
            type="submit"
            disabled={disabledButton}
          >
            Сохранить
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default FilterForm;
