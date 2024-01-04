import './config/axios.config';
import './styles/App.scss';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import AppRouting from './routing/AppRouting';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </>
  );
}

export default App;
