import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './globalStyles'
import { GlobalProvider } from './globalState/GlobalState';
import { MSWContext, MSWProvider } from './pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider';
import reportWebVitals from './reportWebVitals';
import '../src/Languages/i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <GlobalStyles>
      {/* <DragDropState> */}
        <GlobalProvider>
          <MSWProvider>
            <App />
          </MSWProvider>
        </GlobalProvider>
      {/* </DragDropState> */}
    </GlobalStyles>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
