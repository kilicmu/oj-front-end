import axios from "axios";

axios.defaults.timeout = 6000;
axios.defaults.baseURL = "http://112.126.90.230:8080/api/";

const pendingRequests: any[] = [];
const reSendCount = 4;

const handleRequestInterceptor = (config: any) => {
  const requestMark = `${config.method}-${config.url}`;
  const markIndex = pendingRequests.findIndex((item: any) => {
    return item.name === requestMark;
  });
  if (markIndex !== -1) {
    // 已经请求了，取消上个请求，发送新的请求
    pendingRequests[markIndex].cancel();
    pendingRequests.splice(markIndex, 1);
  }
  config.cancelToken = new axios.CancelToken((cancel) => {
    pendingRequests.push({
      name: requestMark,
      cancel: cancel,
      routeChangeCancel: config.routeChangeCancel,
    });
  });
  config.requestMark = requestMark;
  return config;
};

/**
 * response拦截器
 * @param config
 */
const clearMark = (config: any) => {
  // 如果请求存在pending数组，则清除数组中这个请求
  const markIndex = pendingRequests.findIndex((i: any) => {
    return i.name === config.requestMark;
  });
  if (markIndex !== -1) {
    pendingRequests.splice(markIndex, 1);
  }
};

const formatError = (error: any) => {
  const formatedError = {
    status: 0,
    data: "",
    selfCancel: axios.isCancel(error),
  };
  const response = error.response;
  if (response) {
    formatedError.status = response.status;
    formatedError.data = response.data;
    return formatedError;
  } else if (axios.isCancel(error)) {
    formatedError.status = 0;
    formatedError.data = "breaked";
    return formatedError;
  }
};

const handleRejectResponseIntercept = (error: any) => {
  const response = error.response;

  // 普通的请求
  if (response) {
    const config = response.config;
    const code = response.status;

    clearMark(response.config);
    if (error.message.includes("timeout")) {
      // 如果是timeout请求则判断是否需要次
      config._count = config._count || 0;
      if (++config._count > reSendCount) {
        return Promise.reject(formatError(error));
      }
      const handlePromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, config._count * 2000 || 1000);
      });

      return handlePromise.then(() => {
        return axios(config);
      });
    } else {
      clearMark(config);
      return Promise.reject(formatError(error));
    }
  }

  // axios取消的请求
  if (axios.isCancel(error)) {
    return;
  }
};

axios.interceptors.request.use(handleRequestInterceptor, (error: Error) =>
  Promise.reject(error)
);

axios.interceptors.response.use((resp) => {
  clearMark(resp.config);
  return resp;
}, handleRejectResponseIntercept);

const clearPendingRequest = () => {
  pendingRequests.forEach((item, index) => {
    item.cancel();
    pendingRequests.splice(index, 1);
  });
};

export { axios, clearPendingRequest };
