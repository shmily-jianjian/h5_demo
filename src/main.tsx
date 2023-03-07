import ReactDOM from 'react-dom/client';
// 兼容 iOS 9及以下
import 'antd-mobile/bundle/css-vars-patch.css';
import '@/styles/theme.module.less';
import '@/styles/global.module.less';
import 'uno.css';
import App from './App';
import KeepAlive from '@/components/KeepAlive';
import { customHistory } from './utils/history';
import { unstable_HistoryRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <KeepAlive keepalive={[]}>
    <Router history={customHistory} basename="/">
      <App />
    </Router>
  </KeepAlive>
);
