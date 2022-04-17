import 'react-toastify/dist/ReactToastify.css';
// import 'rsuite/styles/index.less';
// import "rsuite/dist/rsuite.min.css";
import './styles/tailwind.css';
import './App.css';
import { AppProvider } from './context';
import Routers from './router';
import { AuthProvider } from './context/auth/AuthContext';
import { ToastContainer } from 'react-toastify';
import { SocketProvider } from './context';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <SocketProvider>
          <>
            <ToastContainer />
            <Routers />
          </>
        </SocketProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
