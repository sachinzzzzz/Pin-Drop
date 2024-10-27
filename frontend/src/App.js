import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/navbar';
import Map from './components/map'
import About from './components/about';



function App() {
  

  return (
    <div className="App">

      <Router>
      <Navbar />
        <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/about" element={<About />} />
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
