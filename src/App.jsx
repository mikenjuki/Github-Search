import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />

        <main>Content</main>
      </div>
    </BrowserRouter>
  );
};

export default App;

//, Route, Routes
