import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PainScanner from '../components/PainScanner';
import Programs from '../components/Programs';
import PostureAnalyzer from '../components/PostureAnalyzer';
import ExerciseLibrary from '../components/ExerciseLibrary';
import RecoveryTracker from '../components/RecoveryTracker';
import SuccessStories from '../components/SuccessStories';
import Booking from '../components/Booking';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import FloatingButtons from '../components/FloatingButtons';
import ChatAssistant from '../components/ChatAssistant';
import TreatmentSection from '../components/TreatmentSection';

const Home = () => {
  return (
    <div className="font-poppins">
      <ScrollProgress />
      <Navbar />
      <Hero />
      {/* Temporarily disabled heavy 3D/Camera components to isolate blank screen cause */}
      <PainScanner />
      <Programs />
      {/* <PostureAnalyzer /> */}
      <ExerciseLibrary />
      <RecoveryTracker />
      <SuccessStories />
      <TreatmentSection />
      <Booking />
      <Contact />
      <Footer />
      <FloatingButtons />
      <ChatAssistant />
    </div>
  );
};

export default Home;
