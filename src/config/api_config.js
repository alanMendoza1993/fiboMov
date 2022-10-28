const environment = 'local';
const apiConfigEnv = {
  local: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3001,
    api: 'api',
    version: 'v1',
  },
};

export const apiConfig = () => apiConfigEnv[environment];
