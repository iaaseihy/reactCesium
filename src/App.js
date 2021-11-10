/* eslint-disable no-unused-vars */
// import logo from './logo.svg';
// import { hot } from 'react-hot-loader/root'
import './App.css';
import React, {Component} from 'react'
import Router from './router/index'

export default class App extends Component{
  render() {
    return (
      <Router></Router>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// // export default App;
// export default process.env.NODE_ENV === 'development' ? hot(App) : App;