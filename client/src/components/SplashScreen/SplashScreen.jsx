import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import weatherLogo from '../../assets/openweather.svg';
import {
  logoContainerAnimate,
  logoContainerInitial,
  logoContainerTransition,
  poweredByInitial,
  poweredByTransition,
  splashScreenInitial,
  splashScreenTransition,
  textInitial,
  textTransition,
} from '../../styles';
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
      setProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 30);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(progressInterval);
    };
  }, []);

  const splashScreenStyle = useMemo(
    () => ({
      pointerEvents: done ? 'none' : 'auto',
      zIndex: done ? -1 : 9999,
    }),
    [done]
  );

  const splashScreenAnimate = useMemo(
    () => ({ opacity: done ? 0 : 1 }),
    [done]
  );

  const textAnimate = useMemo(
    () => ({
      opacity: showText ? 1 : 0,
      y: showText ? 0 : 20,
    }),
    [showText]
  );

  const poweredByAnimate = useMemo(
    () => ({
      opacity: showPoweredBy ? 1 : 0,
      y: showPoweredBy ? 0 : 20,
    }),
    [showPoweredBy]
  );

  const progressBarStyle = useMemo(
    () => ({ width: `${progress}%` }),
    [progress]
  );

  return (
    <motion.div
      animate={splashScreenAnimate}
      className='splash-screen'
      initial={splashScreenInitial}
      style={splashScreenStyle}
      transition={splashScreenTransition}
    >
      <div className='splash-content'>
        <motion.div
          animate={logoContainerAnimate}
          className='logo-container'
          initial={logoContainerInitial}
          transition={logoContainerTransition}
        >
          <img alt='Logo' className='splash-logo' src={weatherLogo} />
        </motion.div>

        <motion.div
          animate={textAnimate}
          className='splash-text'
          initial={textInitial}
          transition={textTransition}
        >
          Weather App
        </motion.div>

        <motion.div
          animate={poweredByAnimate}
          className='powered-by'
          initial={poweredByInitial}
          transition={poweredByTransition}
        >
          powered by OpenWeather
        </motion.div>
      </div>

      <div className='progress-bar-container'>
        <div className='progress-bar' style={progressBarStyle} />
      </div>
    </motion.div>
  );
}

export default SplashScreen;
