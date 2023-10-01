import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider} from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new QueryClient()

root.render(
  <QueryClientProvider client={client}>
    <App />
    <ToastContainer />
  </QueryClientProvider>
);
