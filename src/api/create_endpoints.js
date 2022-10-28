export const urlBuilder = (url, urlVar) => {
  if (!urlVar || !Object.keys(urlVar).length) {
    return url;
  }
  if (url.includes(':') && Object.keys(urlVar).length) {
    const entries = Object.entries(urlVar);
    let newUrl;
    for (const [key, value] of entries) {
      newUrl = url.replace(`:${key}`, value);
    }
    console.log(url);
    console.log('url a utilizar');
    console.log(newUrl);
    return newUrl;
  }
};
// creates endpoints attached to conditionally pointed methods
export const createEndpoint = (url = '', instance) => {
  return {
    request: reqConfig => {
      return instance.request({...reqConfig, url});
    },
    get: (reqConfig = {}, urlVar) => {
      console.log(url);
      console.log(urlVar);
      return instance.get(urlBuilder(url, urlVar), {...reqConfig});
    },
    getId: (data, reqConfig = {}, urlVar) => {
      return instance.get(urlBuilder(url + data, urlVar));
    },
    delete: (reqConfig = {}, urlVar) => {
      return instance.delete(urlBuilder(url, urlVar), {...reqConfig});
    },
    post: (data, reqConfig = {}, urlVar) => {
      return instance.post(urlBuilder(url, urlVar), data, {
        ...reqConfig,
      });
    },
    put: (data, reqConfig = {}, urlVar) => {
      return instance.put(urlBuilder(url, urlVar), data, {
        ...reqConfig,
      });
    },
    patch: (reqConfig = {}, urlVar) => {
      return instance.patch(urlBuilder(url, urlVar), reqConfig.data, {
        ...reqConfig,
      });
    },
  };
};
