import { AppProps } from 'next/app';
import "@fontsource/raleway/500.css"
import '@fontsource/raleway/500-italic.css'
import "@fontsource/raleway/600.css"
import "@fontsource/raleway/700.css"
import "@fontsource/raleway/900.css"
import '../styles/global.scss';
import Standard from '../layouts/Standard'
import Minimal from '../layouts/Minimal'
import { Provider } from '../Context'
import Axios from 'axios';

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
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
