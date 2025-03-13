import NewsletterBox from "../../components/NewsletterBox/NewsletterBox";
import Title from "../../components/Title/Title";
import { assets } from "../../frontend_assets/assets";
import { loremFormatter } from "../../utils/txtPlaceholderMaker";
import { paragraphArr } from "./paragraphArr";

const About = () => {
  const infoList = paragraphArr.map((par) => (
    <div
      key={par.id}
      className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"
    >
      <b>{par.title}</b>

      <p className="text-gray-600">{par.txt}</p>
    </div>
  ));

  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title {...{ txt1: "ABOUT", txt2: "US" }} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt={assets.about_img}
          className="w-full md:max-w-[450px]"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-400">
          <p>{loremFormatter(340, true)}</p>

          <p>{loremFormatter(280, true)}</p>

          <b className="text-gray-700">Our Mission</b>

          <p>{loremFormatter(300)}</p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title {...{ txt1: "WHY", txt2: "CHOOSE US" }} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">{infoList}</div>

      <NewsletterBox />
    </div>
  );
};
export default About;
