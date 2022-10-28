import axios from 'axios';
//import {interceptorHandler} from '../interceptors';
import {createEndpoint} from './create_endpoints';

export const initApiClient = async () => {
  // Log app env
  const getApiClient = async () => {
    const axiosConfig = {
      baseURL: `http://192.168.3.79:3000`,
      responseType: 'json',
      validateStatus: () => true,
    };
    console.log('Pointed API: ', axiosConfig);
    return axios.create(axiosConfig);
  };

  const fiboInstance = await getApiClient();

  //interceptorHandler(fiboInstance);
  const routes = {
    user: {
      post: '/user',
      validate: '/validate',
    },
  };
  const fiboEndpoints = {
    user: createEndpoint(routes.user.post, fiboInstance),
    login: createEndpoint(routes.user.validate, fiboInstance),
  };
  return fiboEndpoints;
};
