// Lidia

import { Route, Routes } from 'react-router-dom';
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer"
import Learn from "./Pages/Learn"
import Acc from './Pages/Acc';
import Contact from './Pages/Contact';
import Community from './Pages/Community';
import ScrollToTop from './Components/scroll';
import Plantabase from './Pages/Plantabase';
import Article from './Pages/Article';
import Plant from './Pages/Plant';

// one page application structure -> navigation switches the main component

function App() {
  return (
    <main>
      <NavBar />
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage/>}/>
     <Route path="/Learn" element={<Learn/>}/>
     <Route path="/article/:articleId" element={<Article />} />
     <Route path="/acc" element={<Acc/>}/>
     <Route path="/plantabase" element={<Plantabase />}/>
     <Route path="/plant/:plantId" element={<Plant />} />
     <Route path="/contact" element={<Contact/>}/>
     <Route path="/community" element={<Community/>}/>
     </Routes>
      <Footer />
    </main>
  );
}

export default App;