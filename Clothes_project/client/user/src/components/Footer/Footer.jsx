import { Link } from "react-router-dom";
import { assets } from "../../frontend_assets/assets";
import { loremFormatter } from "./../../utils/txtPlaceholderMaker";
import { footerLinksArr } from "./footerLinksArr";

const Footer = () => {
  const footerLinks = footerLinksArr.map((opt) => (
    <Link to={opt.path} key={opt.id}>
      {opt.name}
    </Link>
  ));

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />

          <p className="w-full md:w-2/3 text-gray-600">{loremFormatter(180)}</p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col gap-1 text-gray-600">{footerLinks}</ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-234-456-7890</li>
            <li>info@example.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />

        <p className="p-5 text-sm text-center">
          Copyright &copy; {new Date().getFullYear()} Example Inc. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};
export default Footer;
