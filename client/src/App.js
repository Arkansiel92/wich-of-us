import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import io from "socket.io-client";
import Home from './pages/Home';

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
