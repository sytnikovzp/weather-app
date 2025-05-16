const getWindDirection = (deg) => {
  if ((deg >= 0 && deg <= 22.5) || (deg > 337.5 && deg <= 360)) {
    return ' Півн.';
  }
  if (deg > 22.5 && deg <= 67.5) {
    return ' Пн-Сх';
  }
  if (deg > 67.5 && deg <= 112.5) {
    return ' Схід.';
  }
  if (deg > 112.5 && deg <= 157.5) {
    return ' Пд-Сх';
  }
  if (deg > 157.5 && deg <= 202.5) {
    return ' Півд.';
  }
  if (deg > 202.5 && deg <= 247.5) {
    return ' Пд-Зх';
  }
  if (deg > 247.5 && deg <= 292.5) {
    return ' Захід.';
  }
  if (deg > 292.5 && deg <= 337.5) {
    return ' Пн-Зх';
  }
  return 'Invalid degree';
};

export { getWindDirection };
