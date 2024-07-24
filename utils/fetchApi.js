import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
		'x-rapidapi-key': 'b6cebe859emshcdccefeaaceba53p191f89jsnaf0b9463ee1b',
		'x-rapidapi-host': 'bayut.p.rapidapi.com'
    },
  });
    
  return data;
}