import { loremFormatter } from "./../../utils/txtPlaceholderMaker";
const NewsletterBox = () => {
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>

      <p className="text-gray-400 mt-3">{loremFormatter(80)}</p>

      <form className="my-6 w-full sm:w-1/2 flex items-center justify-center gap-3 mx-auto border pl-3 rounded-s-2xl">
        <input
          type="email"
          placeholder="john.doe@example.com"
          className="w-full px-2 sm:flex-1 outline-none"
          required
        />

        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 rounded-e-2xl"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};
export default NewsletterBox;
