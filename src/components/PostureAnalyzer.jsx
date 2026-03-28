import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { motion } from 'framer-motion';
import { FaCamera, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PostureAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [postureScore, setPostureScore] = useState(0);
  const [feedback, setFeedback] = useState('Start analysis to see your posture score');
  const [issues, setIssues] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);

  const onResults = useCallback((results) => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, Pose.POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 4});
      drawLandmarks(canvasCtx, results.poseLandmarks, {color: '#FF0000', lineWidth: 2});
      
      // Posture analysis
      if (results.poseLandmarks.length > 0) {
        const landmarks = results.poseLandmarks;
        
        // Key points
        const nose = landmarks[0];
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftEar = landmarks[7];
        const rightEar = landmarks[8];
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];

        let score = 100;
        const currentIssues = [];
        const currentRecs = [];

        // Neck tilt detection
        const shoulderCenterX = (leftShoulder.x + rightShoulder.x) / 2;
        const headTilt = Math.abs(nose.x - shoulderCenterX) * 100;
        if (headTilt > 5) {
          score -= 20;
          currentIssues.push('Head tilt detected');
          currentRecs.push('Chin tucks');
        }

        // Shoulder asymmetry
        const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y) * 100;
        if (shoulderDiff > 3) {
          score -= 15;
          currentIssues.push('Shoulder imbalance');
          currentRecs.push('Shoulder blade squeezes');
        }

        // Spine alignment (hips to shoulders)
        const hipCenterY = (leftHip.y + rightHip.y) / 2;
        const shoulderCenterY = (leftShoulder.y + rightShoulder.y) / 2;
        const spineAngle = Math.abs(shoulderCenterY - hipCenterY - 0.3) * 100;
        if (spineAngle > 5) {
          score -= 25;
          currentIssues.push('Spine curvature detected');
          currentRecs.push('Wall angels');
        }

        // Forward head posture
        const neckLength = Math.abs(leftEar.y - leftShoulder.y);
        const expectedNeck = 0.12; // normalized
        const forwardHead = Math.abs(neckLength - expectedNeck) * 100;
        if (forwardHead > 2) {
          score -= 20;
          currentIssues.push('Forward head posture');
          currentRecs.push('Neck stretches');
        }

        score = Math.max(0, score);

        setPostureScore(Math.round(score));
        setFeedback(score > 80 ? 'Good Posture' : score > 60 ? 'Fair Posture' : 'Poor Posture - Adjust now!');
        setIssues(currentIssues);
        setRecommendations(currentRecs);
      }
    }
    canvasCtx.restore();
  }, []);

  const startAnalysis = async () => {
    try {
      toast('Starting camera... Allow access for posture analysis');
      setIsAnalyzing(true);
      setPostureScore(0);
      setFeedback('Initializing AI model...');
      setIssues([]);
      setRecommendations([]);

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480 
        } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
      });
      
      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      pose.onResults(onResults);

      if (canvasRef.current && videoRef.current) {
        const canvasElement = canvasRef.current;
        canvasElement.width = 640;
        canvasElement.height = 480;
        
        cameraRef.current = new Camera(videoRef.current, {
          onFrame: async () => {
            await pose.send({image: videoRef.current});
          },
          width: 640,
          height: 480
        });
        cameraRef.current.start();
      }
    } catch (error) {
      toast.error('Camera access denied or error occurred');
      setIsAnalyzing(false);
    }
  };

  const stopAnalysis = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
    }
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsAnalyzing(false);
  };

  return (
    <section id="posture" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">AI Posture Analyzer</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Real-time analysis with MediaPipe Pose detection</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 shadow-lg">
              <video
                ref={videoRef}
                className="w-full max-h-80 bg-black rounded-xl object-cover hidden"
                playsInline
              />
              <canvas
                ref={canvasRef}
                className="w-full max-h-80 bg-gray-200 dark:bg-gray-600 rounded-xl block"
              />
              {!isAnalyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-black/50 rounded-2xl">
                  <FaCamera className="text-6xl text-white/80 mb-6 animate-pulse" />
                  <p className="text-white/90 text-lg font-medium">Live AI Posture Analysis</p>
                  <p className="text-white/70 text-sm mt-2">Full body front view, good lighting</p>
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 px-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'Analyzing Live...' : 'Start Live Analysis'}
              </motion.button>
              {isAnalyzing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopAnalysis}
                  className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
                >
                  Stop
                </motion.button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur-lg rounded-2xl p-8 border border-teal-200/50">
              <div className="text-center mb-8">
                <div className="text-5xl font-black text-teal-600 dark:text-teal-400 mb-2 inline-block">
                  {postureScore}
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">/ 100</div>
                <div className={`text-xl font-semibold px-6 py-2 rounded-full ${
                  postureScore > 80 ? 'bg-green-100 text-green-800' : 
                  postureScore > 60 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {feedback}
                </div>
              </div>
            </div>

            {issues.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center text-yellow-900 dark:text-yellow-300">
                  <FaExclamationTriangle className="mr-2" />
                  Detected Issues ({issues.length})
                </h3>
                <ul className="space-y-2">
                  {issues.map((issue, index) => (
                    <li key={index} className="flex items-start text-yellow-900 dark:text-yellow-200">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {recommendations.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center text-green-900 dark:text-green-300">
                  <FaCheck className="mr-2" />
                  Recommended Fixes
                </h3>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-green-900 dark:text-green-200">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PostureAnalyzer;
