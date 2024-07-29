import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-8 shadow-inner dark:shadow-lg">
      <div className="container mx-auto text-center px-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
        <nav className="mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
