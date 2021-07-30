
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import MockupUI from './Components/MockupUI';
import API from './Components/API';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={MockupUI} />
      <Route exact path="/api" component={API} />
    </BrowserRouter>
    );
}

export default App;
