import { useContext } from 'react';
import './App.css';
import Header from './components/header';
import { AppContext, AppContextProvider } from './context';

function App() {
  const { setNotification } = useContext(AppContext);
  return (
    <AppContextProvider>
      <Header className="text-3xl font-bold underline text-red-300" />
      <button onClick={() => setNotification}>Oke</button>
    </AppContextProvider>
  );
}

export default App;
