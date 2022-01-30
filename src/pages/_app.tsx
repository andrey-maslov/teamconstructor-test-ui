import App from 'next/app';
import '../assets/scss/index.scss';
import 'focus-visible/dist/focus-visible.js';
import { ToastProvider } from 'react-toast-notifications';
// import ScrollToTop from '../components/common/ScrollToTop';
// import { getCookie } from '../helper/cookie';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="bottom-left">
      {/*<ScrollToTop />*/}
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default appWithTranslation(MyApp);
