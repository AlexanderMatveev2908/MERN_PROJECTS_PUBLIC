import NewsletterBox from "../../components/NewsletterBox/NewsletterBox";
import Title from "../../components/Title/Title";
import { assets } from "../../frontend_assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title {...{ txt1: "CONTACT", txt2: "US" }} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt={assets.contact_img}
          className="w-full max-w-[480px]"
        />

        <div className="flex flex-col justify-center items-start gap-5">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>

          <p className="text-gray-500">
            12345 Main Street <br /> Suite 123, New York, USA
          </p>

          <p className="text-gray-500">
            Tel: (+315) 635-1832
            <br />
            Email: info@example.com
          </p>

          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>

          <p className="text-gray-500">
            Learn more about our teams and job opening
          </p>

          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-3xl">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};
export default Contact;
