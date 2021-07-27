import { useEffect } from "react";

import Filter from "./components/filter/Filter";

import "./App.css";

function App() {
  const fetchRia = () => {
    fetch(
      "https://developers.ria.com/auto/categories/1/marks?api_key=CSZCqn3KA6mjPoYwZtA3AgQBaDa3PJ7ga9fjODMH"
    )
      .then((response) => response.json())
      .then((json) => console.log(json[106]));
  };

  //category_id=1

  useEffect(() => {
    //fetchRia();
  }, []);

  return (
    <div className="App">
      <Filter />
    </div>
  );
}

export default App;
