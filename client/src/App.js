import { BrowserRouter, Routes, Route} from "react-router-dom";
import GameSettings from "./pages/GameSettings";
import Home from './pages/Home';

function App() {

  const player = {
    username: "",
    host: false,
    roomID: null,
    points: 0
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home player = {player} />} />
        <Route path="/GameSettings" element={<GameSettings player={player}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
