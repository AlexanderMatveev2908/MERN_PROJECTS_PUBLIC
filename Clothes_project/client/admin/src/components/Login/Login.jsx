import { fieldsArr } from "./fieldsArr";
import { useGlobal } from "./../../hooks/useGlobal";

const Login = () => {
  const { handleChangeLoginForm, loginVals, handleSubmit } = useGlobal();

  const fields = fieldsArr.map((field) => (
    <div key={field.id} className="mb-3 min-w-72">
      <p>Email Address</p>
      <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        value={loginVals[field.name]}
        onChange={handleChangeLoginForm}
        required
        autoComplete="false"
        className="border border-gray-300 rounded-4xl w-full px-3 py-2 pl-4 outline-none"
      />
    </div>
  ));

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        <form onSubmit={handleSubmit}>
          {fields}

          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 rounded-4xl text-white bg-black cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
