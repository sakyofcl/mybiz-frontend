import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import root from './redux/reducer/root';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style/app.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);
const store = createStore(root, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
   <Provider store={store}>
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Provider>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
