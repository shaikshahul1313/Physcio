import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';

const BODY_PARTS = [
  {
    name: 'Head',
    position: [0, 1.5, 0],
    geometry: 'sphere',
    size: 0.3,
    labelOffset: [0.4, 0.1, 0],
    causes: ['Headaches', 'Neck tension', 'Stress'],
    therapy: 'Relaxation techniques and neck stretches',
  },
  {
    name: 'Neck',
    position: [0, 1.05, 0],
    geometry: 'cylinder',
    size: [0.12, 0.12, 0.3, 24],
    labelOffset: [0.3, 0, 0.1],
    causes: ['Poor posture', 'Stress', 'Injury'],
    therapy: 'Neck stretches and posture correction',
  },
  {
    name: 'Shoulders',
    position: [0, 0.75, 0],
    geometry: 'cylinder',
    size: [0.12, 0.12, 0.9, 24],
    labelOffset: [-0.3, 0.2, 0],
    causes: ['Overuse', 'Frozen shoulder', 'Tendonitis'],
    therapy: 'Shoulder mobility exercises and load management',
  },
  {
    name: 'Back',
    position: [0, 0.15, 0],
    geometry: 'cylinder',
    size: [0.22, 0.22, 1.1, 24],
    labelOffset: [0.4, 0, 0],
    causes: ['Sedentary lifestyle', 'Herniated disc', 'Muscle strain'],
    therapy: 'Core strengthening and flexibility training',
  },
  {
    name: 'Knee',
    position: [0, -0.85, 0],
    geometry: 'sphere',
    size: 0.16,
    labelOffset: [0.3, 0.1, 0],
    causes: ['Arthritis', 'Ligament injury', 'Overuse'],
    therapy: 'Knee strengthening and balance exercises',
  },
  {
    name: 'Ankle',
    position: [0, -1.35, 0],
    geometry: 'sphere',
    size: 0.12,
    labelOffset: [-0.3, 0.1, 0],
    causes: ['Sprain', 'Fracture', 'Instability'],
    therapy: 'Ankle stability and proprioception training',
  },
];

function BodyPart({ part, onSelect, selected, hovered, showLabels, onHoverEnter, onHoverLeave }) {
  const labelOffset = part.labelOffset || [0, 0.35, 0];

  return (
    <mesh 
      position={part.position} 
      onClick={(e) => onSelect(part)}
      onPointerEnter={(e) => onHoverEnter(part)}
      onPointerLeave={onHoverLeave}
    >
      {part.geometry === 'sphere' ? (
        <sphereGeometry args={[part.size, 24, 24]} />
      ) : (
        <cylinderGeometry args={part.size} />
      )}
      <meshStandardMaterial 
        color={selected || hovered ? '#ef4444' : '#7dd3fc'} 
        emissive={hovered ? '#ff000020' : '#000000'}
      />
      {showLabels && hovered && (
        <Html 
          transform 
          occlude 
          distanceFactor={8} 
          position={labelOffset}
        >
          <motion.div 
            className="text-[11px] px-1.5 py-1 bg-black/95 backdrop-blur-md text-white rounded-lg shadow-2xl pointer-events-none select-none sm:text-[9px] sm:px-1 sm:py-0.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            {part.name}
          </motion.div>
        </Html>
      )}
      {showLabels && (
        <Html transform distanceFactor={12} position={[0, 0, 0.1]}>
          <div 
            className="w-2.5 h-2.5 bg-blue-400 rounded-full ring-2 ring-blue-500/50 shadow-md sm:w-2 sm:h-2 sm:ring-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
        </Html>
      )}
    </mesh>
  );
}

function HumanBody({ onPartSelect, selectedPart, hoveredPart, showLabels, onHoverEnter, onHoverLeave }) {
  return (
    <group>
      <mesh position={[0, 0.15, -0.15]}>
        <capsuleGeometry args={[0.22, 1.8, 8, 16]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.25} />
      </mesh>
      {BODY_PARTS.map((part) => (
        <BodyPart
          key={part.name}
          part={part}
          onSelect={onPartSelect}
          selected={selectedPart?.name === part.name}
          hovered={hoveredPart?.name === part.name}
          showLabels={showLabels}
          onHoverEnter={onHoverEnter}
          onHoverLeave={onHoverLeave}
        />
      ))}
    </group>
  );
}

const PainScanner = () => {
  const [showLabels, setShowLabels] = useState(true);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [openInfoPanel, setOpenInfoPanel] = useState(false);

  const onPartSelect = (part) => {
    setSelectedPart(part);
    setOpenInfoPanel(true);
  };

  const closeInfoPanel = () => {
    setOpenInfoPanel(false);
  };

  return (
    <>
      <section id="scanner" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">AI Pain Scanner</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hover over dots and click body parts for interactive analysis.
            </p>
          </motion.div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-96 w-full max-w-md overflow-hidden rounded-3xl bg-slate-950 shadow-2xl"
            >
              <motion.button
                className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-gray-900 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 sm:px-2 sm:text-xs"
                onClick={() => setShowLabels(!showLabels)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{showLabels ? 'Hide' : 'Show'}</span>
                <div className="w-4 h-4 bg-current rounded-sm" />
              </motion.button>
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[3, 5, 4]} intensity={1.1} />
                <Suspense fallback={<Html center><div className="text-sm text-white">Loading body model...</div></Html>}>
                  <HumanBody 
                    onPartSelect={onPartSelect} 
                    selectedPart={selectedPart}
                    hoveredPart={hoveredPart}
                    showLabels={showLabels}
                    onHoverEnter={setHoveredPart}
                    onHoverLeave={() => setHoveredPart(null)}
                  />
                </Suspense>
                <OrbitControls enablePan={false} minDistance={2.5} maxDistance={5} />
              </Canvas>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              {selectedPart ? (
                <div>
                  <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">{selectedPart.name} pain</h3>
                  <h4 className="text-lg font-semibold mb-2">Possible causes</h4>
                  <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                    {selectedPart.causes.map((cause) => (
                      <li key={cause}>{cause}</li>
                    ))}
                  </ul>
                  <h4 className="text-lg font-semibold mb-2">Recommended therapy</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedPart.therapy}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
                  >
                    Book a recovery plan
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl text-gray-400 mb-4">👆</div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Click on a body part to scan</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Interactive 3D model</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      {openInfoPanel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeInfoPanel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-lg max-h-[80vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-2xl dark:bg-gray-800 sm:max-w-md sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-black text-teal-600 dark:text-teal-400">{selectedPart?.name} Analysis</h3>
              <motion.button
                onClick={closeInfoPanel}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 text-2xl"
              >
                ×
              </motion.button>
            </div>
            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Possible Causes</h4>
            <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300 space-y-1">
              {selectedPart?.causes.map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>
            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Recommended Therapy</h4>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 whitespace-pre-line">{selectedPart?.therapy}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4 font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Book Session Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeInfoPanel}
                className="flex-1 rounded-xl bg-gray-200 dark:bg-gray-700 px-6 py-4 font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PainScanner;
