import { assets } from "../../assets/assets";
import "./AppDownload.css";

const AppDownload = () => {
  return (
    <div id="app-download" className="app-download">
      <p>For Better Experience Download </p>
      Tomato App
      <br />
      <div className="app-download-platforms">
        <img src={assets.play_store} alt={assets.play_store} />
        <img src={assets.app_store} alt={assets.app_store} />
      </div>
    </div>
  );
};
export default AppDownload;
