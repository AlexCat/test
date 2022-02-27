import React from 'react';
import ReactDOM from 'react-dom';
import Button from "./components/Button";
import reportWebVitals from './reportWebVitals';

function App () {
    return (
        <Button
            onClick={() => {
                console.log('clicked')
            }}
        />
    )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



export  { Button };
