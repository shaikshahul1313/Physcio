import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Specializations from '../components/Specializations';
import Programs from '../components/Programs';
import ExerciseLibrary from '../components/ExerciseLibrary';
import SuccessStories from '../components/SuccessStories';
import TreatmentSection from '../components/TreatmentSection';
import Booking from '../components/Booking';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import ChatAssistant from '../components/ChatAssistant';

const Home = () => {
  return (
    <div className="font-poppins">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Specializations />
      <TreatmentSection />
      <Booking />
      <Programs />
      <ExerciseLibrary />
      <SuccessStories />
      <Contact />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Home;