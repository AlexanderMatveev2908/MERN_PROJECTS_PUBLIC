import { useState } from "react";
import ExploreMenu from "../../comp/ExploreMenu/ExploreMenu";
import Header from "../../comp/Header/Header";
import "./Home.css";
import FoodDisplay from "../../comp/FoodDisplay/FoodDisplay";
import AppDownload from "../../comp/AppDownload/AppDownload";
const Home = () => {
  const [cat, setCat] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu {...{ cat, setCat }} />
      <FoodDisplay {...{ cat }} />
      <AppDownload />
    </div>
  );
};
export default Home;
