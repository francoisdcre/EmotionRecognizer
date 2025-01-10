import Home from './pages/Home';
import TextEmotion from './pages/TextEmotion';
import ImageEmotion from './pages/ImageEmotion';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav className="text-center p-4 flex items-center justify-between text-white z-50" style={{backgroundColor: '#171718'}}>
        <p>EmotionRecognizer</p>
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
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
}

export default App;

// const title = 'Hello World !'

// function App() {

//   const hangleCLick = () => {
//     alert("J'ai cliqué sur le titre !")
//   }

//   return <>
//     <h1 onClick={hangleCLick} style={{color: 'orange', backgroundColor: 'black'}}>{title}</h1>
//     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vero, asperiores doloribus praesentium ipsam, saepe accusamus doloremque expedita possimus recusandae alias illum facilis omnis. Veniam libero voluptatibus enim expedita porro.</p>
//   </>
// }

// export default App