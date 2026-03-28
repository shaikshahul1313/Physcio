import React from 'react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
Physio Pulse
            <p className="text-gray-400">Modern physiotherapy for the digital generation.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#programs" className="hover:text-teal-400 transition-colors">Programs</a></li>
              <li><a href="#exercises" className="hover:text-teal-400 transition-colors">Exercises</a></li>
              <li><a href="#success" className="hover:text-teal-400 transition-colors">Success Stories</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Desk Worker Recovery</li>
              <li>Sports Injury Rehab</li>
              <li>Posture Correction</li>
              <li>Senior Mobility</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center">
              <FaInstagram className="mr-2" />
              @recoverylab
            </a>
            <a 
              href="https://youtube.com/@physioonreels?si=S2lBoYVgr6a5Ng2R" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-400 ml-4 flex items-center group transition-all duration-300"
              title="Subscribe on YouTube"
            >
              <FaYoutube className="mr-2 text-xl group-hover:scale-110 group-hover:text-red-500 transition-all duration-300" />
              @physioonreels
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
<p>&copy; 2026 Physio Pulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;