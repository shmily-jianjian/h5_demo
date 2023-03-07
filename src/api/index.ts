// v3/list/hot.json?ct=%E6%B7%B1%E5%9C%B3&ci=30&channelId=4
import request from '@/request';
export const requestDetail = async (params?: any) => {
  return await request.GET('/api/v3/list/hot.json', params);
};
