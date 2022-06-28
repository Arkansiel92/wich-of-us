import { BrowserRouter, Routes, Route} from "react-router-dom";
import GameSettings from "./pages/GameSettings";
import Home from './pages/Home';
import {socket, socketContext} from "./context/socket"

function App() {

  const player = {
    username: "",
    host: false,
    roomID: null,
    ready: false,
    points: 0
  }

  return (
    <socketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home player = {player} />} />
          <Route path="/GameSettings" element={<GameSettings player={player}/>} />
        </Routes>
      </BrowserRouter>
    </socketContext.Provider>
  );
}

export default App;
