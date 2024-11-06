import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.warn("Please enter both email and password");
      return;
    }
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data === "not found" || data === "pass Not Ok") {
        toast.error("Invalid Email or Password");
      } else {
        setUser(data);
        toast.success("Login Success");
        if (data.username === "admin") {
          setIsAdmin(true);
          setRedirect(true); // Redirect to admin page
        } else {
          setRedirect(true); // Redirect to normal user page
        }
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  }

  if (redirect && isAdmin) {
    return <Navigate to="/admin" />;
  } else if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="mt-4 grow flex flex-col items-center justify-center p-24">
      <div className="mb-40 w-full max-w-md">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-m font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-m font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className=" block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 flex justify-center border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
          <div className="text-center text-gray-500">
            Don't have an account Yet?{" "}
            <Link
              className="underline text-primary hover:text-blue-300"
              to="/register"
            >
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
