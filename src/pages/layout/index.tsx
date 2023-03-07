import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd-mobile';
import { useKeepOutlets } from '@/components/KeepAlive/useKeepOutlets';

const Layout = () => {
  const navigate = useNavigate();
  const element = useKeepOutlets();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#eee',
      }}
    >
      <div className=" bg-cyan-200 z-10 bottom-0 flex justify-around">
        <Button className="flex" color="primary" onClick={() => navigate('/')}>
          重定向
        </Button>
        <Button color="success" onClick={() => navigate('/home')}>
          首页
        </Button>
        <Button color="primary" onClick={() => navigate('/list')}>
          列表
        </Button>
        <Button color="primary" onClick={() => navigate('/403')}>
          403
        </Button>
        <Button color="primary" onClick={() => navigate('/404')}>
          404
        </Button>
      </div>
      {/* {element} */}
      <Outlet />
    </div>
  );
};

export default Layout;
