import { BrowserRouter, Routes, Route} from "react-router-dom";
import GameSettings from "./pages/GameSettings";
import Home from './pages/Home';
import {socket, socketContext} from "./context/socket"
import GamePlay from "./pages/GamePlay";

function App() {

  return (
    <socketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/GameSettings" element={<GameSettings/>} />
          <Route path="/GamePlay" element={<GamePlay/>} />
        </Routes>
      </BrowserRouter>
    </socketContext.Provider>
  );
}

export default App;
