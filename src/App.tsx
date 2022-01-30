import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/styles/index.less';
import "rsuite/dist/rsuite.min.css";
// import './styles/tailwind.css';
import './App.css';
import { AppContextProvider } from './context';
import Routers from './router';
import { AuthProvider } from './context/auth/auth';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <AppContextProvider>
        <ToastContainer />
        <Routers />
      </AppContextProvider>
    </AuthProvider>
  );
}

export default App;
