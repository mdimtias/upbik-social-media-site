import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="text-center text-white bg-[#0a4275]">
  <div className="container p-6 mx-auto">
    <div className="">
      <p className="flex justify-center items-center">
        <span className="mr-4">Register for free</span>
        <Link to="/registration">
        <button type="button" className="inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          Sign up!
        </button>
        </Link>
      </p>
    </div>
  </div>

  <div className="text-center p-4 bg-[rgba(0, 0, 0, 0.2)]">
    © 2023 Copyright
    <Link to="/" className="text-white" href="https://tailwind-elements.com/">Social Media </Link>
  </div>
</footer>
    );
};

export default Footer;