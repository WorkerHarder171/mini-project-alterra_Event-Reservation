import { auth, provider } from "../config/Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../config/Auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      const { oauthAccessToken, refreshToken } = res._tokenResponse;
      authService.storeCredentialsToCookie({ oauthAccessToken, refreshToken });
      console.log("login success")
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const { oauthAccessToken, refreshToken } = res._tokenResponse;
      authService.storeCredentialsToCookie({ oauthAccessToken, refreshToken });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mx-auto h-screen">
        <div className="container">
          <form className="p-5 w-3/12  mx-auto">
            <h1 className="text-3xl font-bold text-center tracking-widest">
              WELCOME
            </h1>
            <p className="text-zinc-900 text-center">
              Please Login with Your Account
            </p>
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                value={email}
                className="p-3 m-2 border-b-2 border-black"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                className="p-3 m-2 border-b-2 border-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="" className="text-end text-stone-900 my-5">
                forgot password?
              </a>
            </div>

            <div className="button-group">
              <button
              type="button"
                onClick={signIn}
                className="text-white w-full tracking-widest  uppercase  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Login
              </button>

              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign in with Google
              </button>
              <p className="text-center mt-6">
                Dont have account? <Link to={"/sign-up"}>Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
