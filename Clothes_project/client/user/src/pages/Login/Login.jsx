import { useGlobal } from "./../../hooks/useGlobal";
import InputsCommon from "./InputsCommon";
import SwitcherForm from "./SwitcherForm";
const Login = () => {
  const {
    currStateForm,
    setCurrStateForm,
    registerVals,
    loginVals,
    handleChangeForm,
    registerHandler,
    registerLoading,
    loginLoading,
    loginHandler,
  } = useGlobal();

  let buttonText;

  if (currStateForm === "Sign Up") {
    buttonText = registerLoading ? "Registering..." : "Register";
  } else if (currStateForm === "Login") {
    buttonText = loginLoading ? "Logging in..." : "Login";
  } else {
    buttonText = "";
  }

  const funcToRunOnSubmit =
    currStateForm === "Sign Up" ? registerHandler : loginHandler;

  return (
    <form
      onSubmit={funcToRunOnSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currStateForm}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currStateForm === "Sign Up" && (
        <input
          type="text"
          name="firstName"
          onChange={handleChangeForm}
          value={registerVals.firstName}
          className="w-full  px-5 py-3 border border-gray-800 rounded-3xl outline-none"
          placeholder="First Name..."
          required
        />
      )}

      {currStateForm === "Sign Up" ? (
        <InputsCommon
          {...{
            handleChangeForm,
            valEmail: registerVals.email,
            valPassword: registerVals.password,
          }}
        />
      ) : (
        <InputsCommon
          {...{
            handleChangeForm,
            valEmail: loginVals.email,
            valPassword: loginVals.password,
          }}
        />
      )}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password ?</p>

        {currStateForm === "Sign Up" ? (
          <SwitcherForm
            {...{
              setCurrStateForm: () => setCurrStateForm("Login"),
              loading: registerLoading,
              txt: "Login here",
            }}
          />
        ) : (
          <SwitcherForm
            {...{
              setCurrStateForm: () => setCurrStateForm("Sign Up"),
              loading: loginLoading,
              txt: "Create Account",
            }}
          />
        )}
      </div>

      <button
        className={`bg-black text-white font-light px-8 py-2 mt-4 rounded-3xl ${
          (currStateForm === "Sign Up" && registerLoading) ||
          (currStateForm === "Login" && loginLoading)
            ? "pointer-events-none opacity-50"
            : ""
        }`}
      >
        {buttonText}
      </button>
    </form>
  );
};
export default Login;
