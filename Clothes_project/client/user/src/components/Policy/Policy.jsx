import { policiesArr } from "./policies";

const Policy = () => {
  const policies = policiesArr.map((policy) => (
    <div key={policy.title}>
      <img src={policy.image} alt="policy.image" className="w-12 m-auto mb-5" />

      <p className="font-semibold">{policy.title}</p>

      <p className="text-gray-400">{policy.description}</p>
    </div>
  ));

  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs  sm:text-sm md:text-base text-gray-700">
      {policies}
    </div>
  );
};
export default Policy;
