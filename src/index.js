import React,{Suspense}  from 'react';
import ReactDOM from 'react-dom/client';

import App from "./App";
import LoadingMarkup from './Components/loader/LoadingMarkup';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Suspense fallback={<LoadingMarkup/>}>
        <App />
    </Suspense>
  

);


