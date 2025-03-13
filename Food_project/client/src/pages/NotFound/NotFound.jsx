import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <div>
        <h3>
          <Link to="/">go back home</Link>
        </h3>
      </div>
    </div>
  );
};
export default NotFound;
