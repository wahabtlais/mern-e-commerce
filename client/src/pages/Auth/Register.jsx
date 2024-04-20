import { Link, useNavigate } from "react-router-dom";
import loginBackground from "../../assets";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div
      className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div>
        <div className="bg-slate-800 border-slate-400 rounded-md p-8 shadow-lg background-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="text-4xl text-white font-bold text-center mb-6">
            Register
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="relative my-4">
              <input
                type="text"
                id="username"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-gray-300 peer"
                placeholder=""
                onChange={handleChange}
              />
              <label
                htmlFor=""
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your username
              </label>
              <BiUser className="absolute top-4 right-4 cursor-pointer" />
            </div>
            <div className="relative my-4">
              <input
                type="email"
                id="email"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-gray-300 peer"
                placeholder=""
                onChange={handleChange}
              />
              <label
                htmlFor=""
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your email
              </label>
              <AiOutlineMail className="absolute top-4 right-4 cursor-pointer" />
            </div>
            <div className="relative my-4">
              <input
                type={isVisiblePass ? "text" : "password"}
                id="password"
                placeholder=""
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-gray-300 peer"
                onChange={handleChange}
              />
              <label
                htmlFor=""
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your password
              </label>
              <span onClick={() => setIsVisiblePass(!isVisiblePass)}>
                {isVisiblePass ? (
                  <AiOutlineUnlock className="absolute top-4 right-4 cursor-pointer" />
                ) : (
                  <AiOutlineLock className="absolute top-4 right-4 cursor-pointer" />
                )}
              </span>
            </div>

            <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-custom-green hover:bg-custom-green hover:text-white font-bold py-2 transition-colors duration-300">
              {loading ? "Loading..." : "Register"}
            </button>
            <div>
              <span className="m-4 text-sm font-semibold">
                Already have an account?{" "}
                <Link to="/login" className="text-teal-600">
                  Login!
                </Link>
              </span>
            </div>
            <p className="text-red-600 text-center py-2 font-semibold">
              {error && "Failed to register."}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
