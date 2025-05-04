const autocompleteInputStyle = {
  margin: 0,
  paddingLeft: '35px',
  paddingRight: '30px',
};

const splashScreenInitial = { opacity: 1 };
const splashScreenTransition = { duration: 0.4, ease: 'easeInOut' };

const logoContainerInitial = { opacity: 0, y: 30, scale: 0.8 };
const logoContainerAnimate = { opacity: 1, y: 0, scale: [1, 1.1, 1] };
const logoContainerTransition = { duration: 2, ease: 'easeInOut' };

const textInitial = { opacity: 0, y: 20 };
const textTransition = { duration: 0.8, ease: 'easeOut', delay: 0.3 };

const poweredByInitial = { opacity: 0, y: 20 };
const poweredByTransition = { duration: 0.8, ease: 'easeOut', delay: 0.8 };

export {
  autocompleteInputStyle,
  logoContainerAnimate,
  logoContainerInitial,
  logoContainerTransition,
  poweredByInitial,
  poweredByTransition,
  splashScreenInitial,
  splashScreenTransition,
  textInitial,
  textTransition,
};
