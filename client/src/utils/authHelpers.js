const getAccessToken = () => {
  const token = localStorage.getItem('weatherAppToken');
  if (token === 'undefined') {
    localStorage.removeItem('weatherAppToken');
    return null;
  }
  return token;
};

const saveAccessToken = (token) =>
  localStorage.setItem('weatherAppToken', token);

const removeAccessToken = () => localStorage.removeItem('weatherAppToken');

export { getAccessToken, removeAccessToken, saveAccessToken };
