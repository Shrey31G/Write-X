import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './app/store.ts'



createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

/* 
  {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1YTY0NGU1LWE5MzgtNDU3My1iMzQ3LTliNTZmODQ2ZDU5YiJ9.sANy75n1asn2KJrjnOfHTvrQUNPxXjAOZw2LbWXL9tE",
    "userId": "05a644e5-a938-4573-b347-9b56f846d59b"
  }

  {
    "id": "a3c773e0-11cf-4a25-8d6e-060a041aba36"
  }
*/