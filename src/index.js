import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Root from './views/Root';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

// ReactDOM.render( //old version - throws error on console
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
