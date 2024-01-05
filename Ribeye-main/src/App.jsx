import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './Routes/AppRouter';
import store from './store';
import axios from 'axios';
import { LicenseInfo } from '@mui/x-license-pro';

function App() {
  console.warn = () => {};
  LicenseInfo.setLicenseKey(
    '79025a2b3a132015423bab76db8e2c7eTz04MTMwNSxFPTE3MzU0ODAxNjUwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
  );

  axios.defaults.baseURL = 'https://ribeye-one.vercel.app/api/v1';
  const theme = createTheme({});
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ToastContainer />
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
