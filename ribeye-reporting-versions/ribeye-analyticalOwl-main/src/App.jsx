import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './Routes/AppRouter';
import store from './store';
import axios from 'axios';

function App() {
  console.warn = () => {};
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
