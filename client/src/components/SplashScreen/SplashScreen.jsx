import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import weatherLogo from '../../assets/openweather.svg';
import './SplashScreen.css';

function SplashScreen() {
  const [showText, setShowText] = useState(false);
  const [showPoweredBy, setShowPoweredBy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 1000);
    const timer2 = setTimeout(() => setShowPoweredBy(true), 1500);
    const timer3 = setTimeout(() => setDone(true), 3500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      animate={{ opacity: done ? 0 : 1 }}
      className='splash-screen'
      initial={{ opacity: 1 }}
      style={{
        pointerEvents: done ? 'none' : 'auto',
        zIndex: done ? -1 : 9999,
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className='splash-content'>
        <motion.div
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.1, 1],
          }}
          className='logo-container'
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
          }}
        >
          <img alt='Logo' className='splash-logo' src={weatherLogo} />
        </motion.div>

        <motion.div
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
          className='splash-text'
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            delay: 0.3,
          }}
        >
          Weather App
        </motion.div>

        <motion.div
          animate={{
            opacity: showPoweredBy ? 1 : 0,
            y: showPoweredBy ? 0 : 20,
          }}
          className='powered-by'
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            delay: 0.8,
          }}
        >
          powered by OpenWeather
        </motion.div>
      </div>

      <div className='progress-bar-container'>
        <div className='progress-bar' style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  );
}

export default SplashScreen;
