import { customHistory } from '@/utils/history';
import { Toast } from 'antd-mobile';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const getMsgToStatus = (status: number) => {
  const msgMap = new Map([
    [400, '错误请求'],
    [401, '请求未授权'],
    [404, '请求路径错误'],
    [405, '请求方法不允许'],
    [500, '服务器异常'],
  ]);
  return msgMap.get(status);
};

// 声明一个容器存储当前正在进行的请求
const requestListeners: AbortController[] = [];

// 暴露一个清空容器的方法
export const clearRequestListeners = () => {
  requestListeners.length &&
    requestListeners.forEach((controller) => {
      controller.abort();
      console.log('路由跳转了取消所有请求');
    });
  requestListeners.length = 0;
};

const instance: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 请求
instance.interceptors.request.use(
  (config) => {
    config.method = config.method!.toLocaleLowerCase();
    config.headers = config.headers || {};
    // token
    config.headers.AuthorizationToken = localStorage.getItem('token') || '';
    // 存储controller用于取消请求
    const controller = new AbortController();
    requestListeners.push(controller);
    config.signal = controller.signal;
    console.log(requestListeners.length);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应
instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code === 21000 || !data.code) {
      Toast.show('登陆已过期');
      customHistory.push('/login');
    } else if (!data || (data.code && data.code !== 0)) {
      Toast.show(response.data.msg || '请求数据异常，请稍后再试');
    }
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('取消请求...');
      return Promise.reject(error);
    }
    const status = error?.response?.status;
    const errMsg = getMsgToStatus(status) || '服务异常';
    if (error.response) {
      Toast.show(errMsg);
    } else {
      if (error?.message?.indexOf('timeout') !== -1) {
        Toast.show('网络超时');
      }
    }
    return Promise.reject(error);
  }
);

const GET = (url: string, data = {}, config: AxiosRequestConfig = {}) => {
  return instance.get(url, {
    params: data,
    ...config,
  });
};

const POST = (url: string, data = {}, config: AxiosRequestConfig = {}) => {
  return instance.post(url, data, config);
};

const PUT = (url: string, data = {}, config: AxiosRequestConfig = {}) => {
  return instance.put(url, data, config);
};

const DELETE = (url: string, data = {}, config: AxiosRequestConfig = {}) => {
  return instance.put(url, data, config);
};

export default { GET, POST, PUT, DELETE };
