import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import Content from './components/Content';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<><Login /></>} />
          <Route path="/home" element={<><Home /></>} />
          <Route path="/content/:id" element={<><Content /></>} />
          {/* Uncomment the following line to add an About page */}
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
