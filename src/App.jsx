import { Provider } from 'react-redux';
import { store } from '/src/app/store';
import CryptoTracker from './components/CryptoTracker';

function App() {
  return (
    <Provider store={store}>
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <CryptoTracker />
      </div>
    </Provider>
  );
}

export default App;
