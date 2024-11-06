import React, { useContext } from "react";
import { UserContext } from "./UserContext";

const Footer = () => {
  const { user } = useContext(UserContext);

  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; 2024 RideKap</p>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/about" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-300">
                Services
              </a>
            </li>
            <li>
              <a href="/contactus" className="hover:text-gray-300">
                Contact
              </a>
            </li>
            
            <li>
              <a
                href={user ? "/logout" : "/login"}
                className="hover:text-gray-300"
              >
                {user ? "" : "Sign in"}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
