import axios from 'axios';
//import {interceptorHandler} from '../interceptors';
import {createEndpoint} from './create_endpoints';

export const initApiRamClient = async () => {
  // Log app env
  const getApiClient = async () => {
    const axiosConfig = {
      baseURL: `https://rickandmortyapi.com/api`,
      responseType: 'json',
      validateStatus: () => true,
    };
    console.log('Pointed API: ', axiosConfig);
    return axios.create(axiosConfig);
  };

  const ramInstance = await getApiClient();

  //interceptorHandler(fiboInstance);
  const routes = {
    character: {
      get: '/character',
      details: 'https://rickandmortyapi.com/api/character/',
    },
  };
  const ramEndpoints = {
    character: createEndpoint(routes.character.get, ramInstance),
    details: createEndpoint(routes.character.details, ramInstance),
  };
  return ramEndpoints;
};
