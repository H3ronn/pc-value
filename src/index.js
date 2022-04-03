import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// ReactDOM.render( //old version - throws error on console
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
