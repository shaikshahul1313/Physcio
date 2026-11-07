import React from 'react';
import { FaInstagram, FaYoutube, FaFacebook, FaHeartbeat, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaLock } from 'react-icons/fa';
import { usePractice } from '../context/PracticeContext';

const Footer = () => {
  const { settings } = usePractice();

  const getInstagramLink = () => {
    if (settings?.instagramUrl) return settings.instagramUrl;
    if (settings?.instagram) {
      return settings.instagram.startsWith('http')
        ? settings.instagram
        : `https://instagram.com/${settings.instagram.replace('@', '')}`;
    }
    return 'https://instagram.com';
  };

  const getFacebookLink = () => {
    if (settings?.facebookUrl) return settings.facebookUrl;
    if (settings?.facebook && settings.facebook.startsWith('http')) return settings.facebook;
    return 'https://facebook.com';
  };

  const getYoutubeLink = () => {
    if (settings?.youtubeUrl) return settings.youtubeUrl;
    if (settings?.youtube) {
      return settings.youtube.startsWith('http')
        ? settings.youtube
        : `https://youtube.com/@${settings.youtube.replace('@', '')}`;
    }
    return 'https://youtube.com/@physioonreels';
  };

  const instagramHandle = settings?.instagram
    ? (settings.instagram.startsWith('@') ? settings.instagram : `@${settings.instagram}`)
    : '@physioonreels';

  const facebookHandle = settings?.facebook || 'Physio Pulse';

  const youtubeHandle = settings?.youtube
    ? (settings.youtube.startsWith('@') ? settings.youtube : `@${settings.youtube}`)
    : '@physioonreels';

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FaHeartbeat className="text-teal-400 text-xl" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Physio Pulse
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Modern clinical physiotherapy, dry needling, and doorstep rehabilitation for active and pain-free living.
            </p>
            <div className="space-y-1.5 text-xs text-gray-400">
              <p className="flex items-center space-x-2">
                <FaPhone className="text-teal-400" />
                <span>+91 {settings?.phone || '9392473392'}</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaEnvelope className="text-teal-400" />
                <span>{settings?.email || 'shaheedshaik236@gmail.com'}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-3 text-gray-200">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#home" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="/#programs" className="hover:text-teal-400 transition-colors">Programs</a></li>
              <li><a href="/#exercises" className="hover:text-teal-400 transition-colors">Exercises</a></li>
              <li><a href="/#success" className="hover:text-teal-400 transition-colors">Success Stories</a></li>
              <li><a href="/#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Rehab Programs */}
          <div>
            <h4 className="text-base font-bold mb-3 text-gray-200">Rehab Programs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Desk Worker Recovery</li>
              <li>Sports Injury Rehab</li>
              <li>Posture Correction</li>
              <li>Senior Mobility & Balance</li>
            </ul>
          </div>

          {/* Dynamic Social Links (Editable by Admin) */}
          <div>
            <h4 className="text-base font-bold mb-3 text-gray-200">Connect & Follow</h4>
            <div className="space-y-2.5">
              {/* Instagram */}
              <a 
                href={getInstagramLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-400 flex items-center space-x-2.5 text-sm group transition-all"
                title="Follow on Instagram"
              >
                <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition">
                  <FaInstagram size={16} />
                </div>
                <span className="truncate">{instagramHandle}</span>
              </a>

              {/* Facebook */}
              <a 
                href={getFacebookLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 flex items-center space-x-2.5 text-sm group transition-all"
                title="Connect on Facebook"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                  <FaFacebook size={16} />
                </div>
                <span className="truncate">{facebookHandle}</span>
              </a>

              {/* YouTube */}
              <a 
                href={getYoutubeLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-400 flex items-center space-x-2.5 text-sm group transition-all"
                title="Subscribe on YouTube"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition">
                  <FaYoutube size={16} />
                </div>
                <span className="truncate">{youtubeHandle}</span>
              </a>

              {/* WhatsApp Direct */}
              <a 
                href={`https://wa.me/91${(settings?.whatsapp || settings?.phone || '9392473392').replace(/[^0-9]/g, '')}?text=Hello%20Dr.%20Shaik,%20I%20would%20like%20to%20consult%20regarding%20physiotherapy.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-400 flex items-center space-x-2.5 text-sm group transition-all"
                title="Chat on WhatsApp"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition">
                  <FaWhatsapp size={16} />
                </div>
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex items-center justify-center text-xs text-gray-500 gap-2 text-center">
          <span>&copy; {new Date().getFullYear()} Physio Pulse Clinic. All rights reserved.</span>
          <a
            href="/admin"
            className="text-gray-600 hover:text-teal-400 transition-colors p-1 rounded inline-flex items-center opacity-60 hover:opacity-100"
            title="Admin Console"
            aria-label="Admin Console"
          >
            <FaLock size={11} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;