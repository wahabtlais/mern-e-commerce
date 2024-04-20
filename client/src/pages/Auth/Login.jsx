import { Link, useNavigate } from "react-router-dom";
import loginBackground from "../../assets";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock, AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
// import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
// import { setCredentials } from "../../redux/features/auth/authSlice";
import {
	loginStart,
	loginSuccess,
	loginFailure,
} from "../../redux/user/userSlice";

const Login = () => {
	const [formData, setFormData] = useState({});
	const [isVisiblePass, setIsVisiblePass] = useState(false);
	const { loading, error } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(loginStart());
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(loginFailure(data));
				return;
			}
			dispatch(loginSuccess(data));
			navigate("/");
		} catch (error) {
			dispatch(loginFailure(error));
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
						Login
					</h1>
					<form onSubmit={handleSubmit}>
						<div className="relative my-4">
							<input
								type="email"
								className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:text-white focus:border-gray-300 peer fill-none"
								placeholder=""
								id="email"
								onChange={handleChange}
							/>
							<label
								htmlFor=""
								className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Enter your email
							</label>
							<BiUser className="absolute top-4 right-4 cursor-pointer" />
						</div>
						<div className="relative my-4">
							<input
								type={isVisiblePass ? "text" : "password"}
								placeholder=""
								id="password"
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
						<button
							disabled={loading}
							type="submit"
							className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-custom-green hover:bg-custom-green hover:text-white font-bold py-2 transition-colors duration-300"
						>
							{loading ? "Loading..." : "Login"}
						</button>
						<div>
							<span className="m-4 text-sm font-semibold">
								New Here?{" "}
								<Link to="/register" className="text-teal-600">
									Register Now!
								</Link>
							</span>
						</div>
						<p className="text-red-600 text-center py-2 font-semibold">
							{error ? "Something went wrong!" : ""}
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
