import { useStore } from '@/store';
import { Button } from 'antd-mobile';
import styles from '@/styles/global.module.less';
import { requestDetail } from '@/api';
import { useState } from 'react';
import { clearRequestListeners } from '@/request';

const Home = () => {
  const { userInfo, requestUserInfo, modifyUserInfo } = useStore();
  const [movieData, setMovieData] = useState([]);

  console.log(import.meta.env.VITE_APP_NAME);
  console.log(import.meta.env.VITE_APP_TITLE);

  const requestData = async () => {
    try {
      const res = await requestDetail();
      setMovieData(res.data.data.hot);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home bg">
      <span>Home</span>
      <main>
        <p className={styles.btn}>用户信息:</p>
        <p>
          <span>姓名: {userInfo.name}</span>
          <span>年龄: {userInfo.age}</span>
        </p>
      </main>
      <Button onClick={() => requestUserInfo()}>请求用户信息</Button>
      <Button onClick={() => modifyUserInfo()}>修改用户信息</Button>
      <Button onClick={() => requestData()}>请求电影数据</Button>
      <Button onClick={() => clearRequestListeners()}>取消请求</Button>
      <span>{JSON.stringify(movieData)}</span>
    </div>
  );
};

export default Home;
