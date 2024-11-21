import axios from 'axios';

export const getLocationByIP = async () => {
  try {
    let response = await axios.get('https://ipapi.co/json');
    const { latitude, longitude } = response.data;
    return { latitude, longitude };
  } catch (error) {
    console.log(error.message, ': Error with ipapi.co, try ipwho.is...');
    try {
      let response = await axios.get('http://ipwho.is');
      const { latitude, longitude } = response.data;
      return { latitude, longitude };
    } catch (error) {
      console.error(
        'Обидва API не змогли надати дійсні дані про місцезнаходження:',
        error.message
      );
      throw new Error(
        'Обидва API не змогли надати дійсні дані про місцезнаходження'
      );
    }
  }
};

export default { getLocationByIP };
