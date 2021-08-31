import { AppProps } from 'next/app';
import "@fontsource/rubik/500.css"
import '@fontsource/rubik/500-italic.css'
import "@fontsource/rubik/600.css"
import "@fontsource/rubik/700.css"
import "@fontsource/rubik/900.css"
import '../styles/global.scss';
import Standard from '../layouts/Standard'
import Minimal from '../layouts/Minimal'
import Admin from '../layouts/Admin'
import { Provider } from '../Context'
import Axios from 'axios';
// import { Notification } from '../components';

Axios.defaults.baseURL = '/api'
Axios.interceptors.request.use(
  function (request) {
    const bearerToken = localStorage.getItem('auth-token');
    if (bearerToken) {
      request.headers.Authorization = `Bearer ${bearerToken}`;
    }
    request.headers['Content-Type'] = 'application/json';
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const layouts = {
  ADMIN: Admin,
  STANDARD: Standard,
  MINIMAL: Minimal,
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const Layout =
    //@ts-ignore
    layouts[Component.layout] || (({ children }) => <Provider>{children}</Provider>);

  return (
    <Provider>
      <Layout>
        {/* <Notification /> */}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
