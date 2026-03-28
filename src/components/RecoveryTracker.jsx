import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaFire, FaStar, FaTrophy } from 'react-icons/fa';

const RecoveryTracker = () => {
  const [days, setDays] = useState([
    { day: 1, activity: 'Stretching', completed: true },
    { day: 2, activity: 'Mobility', completed: true },
    { day: 3, activity: 'Strength', completed: true },
    { day: 4, activity: 'Balance', completed: false },
    { day: 5, activity: 'Recovery', completed: false },
    { day: 6, activity: 'Flexibility', completed: false },
    { day: 7, activity: 'Rest', completed: false },
  ]);

  const completedDays = days.filter((day) => day.completed).length;
  const progress = (completedDays / days.length) * 100;
  const points = completedDays * 10;
  const level = Math.floor(points / 50) + 1;
  const streak = completedDays;

  const toggleDay = (index) => {
    setDays((currentDays) =>
      currentDays.map((day, currentIndex) =>
        currentIndex === index ? { ...day, completed: !day.completed } : day,
      ),
    );
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Recovery Tracker</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Track your progress and stay motivated on your recovery journey.
          </p>
        </motion.div>
        <div className="rounded-lg bg-gradient-to-r from-teal-50 to-blue-50 p-8 shadow-lg dark:from-gray-700 dark:to-gray-600">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="text-center">
              <FaStar className="mx-auto mb-2 text-yellow-500" size={24} />
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{points}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Points</p>
            </div>
            <div className="text-center">
              <FaTrophy className="mx-auto mb-2 text-orange-500" size={24} />
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">Level {level}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Current level</p>
            </div>
            <div className="text-center">
              <FaFire className="mx-auto mb-2 text-red-500" size={24} />
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{streak}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Day streak</p>
            </div>
            <div className="text-center">
              <FaCheck className="mx-auto mb-2 text-green-500" size={24} />
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{completedDays}/{days.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">Week 1 progress</span>
              <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">{completedDays}/{days.length} days</span>
            </div>
            <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            {days.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => toggleDay(index)}
                className={`cursor-pointer rounded-lg p-4 text-center transition-all ${
                  day.completed
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                <div className="mb-2 text-2xl font-bold">Day {day.day}</div>
                <div className="text-sm">{day.activity}</div>
                {day.completed && <div className="mt-1 text-xs">Done +10 pts</div>}
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">Keep up the great work. You are building healthy habits.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecoveryTracker;
