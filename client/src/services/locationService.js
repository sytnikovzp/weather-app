import axios from 'axios';

const getLocationByIP = async () => {
  try {
    const { data } = await axios.get('https://ipwho.is');

    const formattedData = {
      city: data.city,
      countryCode: data.country_code,
      latitude: data.latitude.toFixed(8),
      longitude: data.longitude.toFixed(8),
    };

    return formattedData;
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
