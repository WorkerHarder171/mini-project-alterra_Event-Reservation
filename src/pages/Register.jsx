import { auth } from "../config/Firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const createAccount = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
      console.log("test");
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto h-screen">
      <div className="container">
        <form
          className="p-10 w-4/12  mx-auto rounded-md"
          onSubmit={createAccount}
        >
          <h1 className="text-3xl font-bold text-center tracking-widest mb-6">
            Register Account
          </h1>
          <div className="flex flex-col">
            <input
              type="email"
              className="p-3 m-2 border-b-2 border-black"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="p-3 m-2 border-b-2 border-black mb-6"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white w-full tracking-widest  uppercase  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
