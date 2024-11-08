import { Route, Routes } from 'react-router-dom';
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer"
import Learn from "./Pages/Learn"
import Acc from './Pages/Acc';
import Contact from './Pages/Contact';
function App() {
  return (
    <main>
      <NavBar />
      <Routes>
      <Route path="/" element={<HomePage/>}/>
     <Route path="/Learn" element={<Learn/>}/>
     <Route path="/acc" element={<Acc/>}/>
     <Route path="/contact" element={<Contact/>}/>
     </Routes>
      <Footer />
    </main>
  );
}

export default App;