import axios from 'axios';

const getLocationByIP = async () => {
  try {
    const response = await axios.get('http://ipwho.is');
    const { latitude, longitude } = response.data;
    return { latitude, longitude };
  } catch (error) {
    console.error(
      'API ipwho.is не зміг надати дійсні дані про місцезнаходження: ',
      error.message
    );
    throw new Error(
      'API ipwho.is не зміг надати дійсні дані про місцезнаходження'
    );
  }
};

export { getLocationByIP };
