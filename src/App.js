import React, { Component } from 'react';
import Login from './Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Provider} from 'unstated-x'

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="container">
        <Login></Login>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </div>
      </Provider>

    );
  }
}

export default App;
