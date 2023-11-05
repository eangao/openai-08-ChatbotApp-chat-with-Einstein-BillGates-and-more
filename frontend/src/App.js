import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import "./styles/bootstrap-custom.scss";
import Chat from "./screens/Chat";
import Chatbot from "./screens/Chatbot/Chatbot";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/chatbot" element={<Chatbot />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
