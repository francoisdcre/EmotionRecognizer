import Home from './pages/Home';
import TextEmotion from './pages/TextEmotion';
import ImageEmotion from './pages/ImageEmotion';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav className="text-center p-4 flex items-center justify-between text-white z-50 fixed w-full" style={{backgroundColor: '#171718'}}>
        <p className='text-gradient'>EmotionRecognizer</p>
        <ul className='flex justify-center space-x-4'>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/TextEmotion">Text Emotion</Link></li>
          <li><Link to="/ImageEmotion">Image Emotion</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TextEmotion" element={<TextEmotion />} />
        <Route path="/ImageEmotion" element={<ImageEmotion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="text-center p-4 text-white" style={{backgroundColor: '#171718'}}>
        <p className='text-gradient'>EmotionRecognizer - 2025</p>
      </footer>
    </Router>
  );
}

export default App;