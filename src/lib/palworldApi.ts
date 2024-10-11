import axios from 'axios';

export default axios.create({
  maxBodyLength: Infinity,
  baseURL: `${process.env.PALWORLD_API_URL}/v1/api`,
  headers: {
    Accept: 'application/json',
    Authorization: `Basic admin:${process.env.ADMINPW}`,
  },
});
