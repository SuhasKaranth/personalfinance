import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-8 rounded-t-lg">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} FinTrack India. All rights reserved.</p>
        <p className="mt-1">Designed for Indian users with financial independence in mind.</p>
      </div>
    </footer>
  );
};

export default Footer;