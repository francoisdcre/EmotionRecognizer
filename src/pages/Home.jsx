import Button from '../components/Button';

function Home() {
    return (
        <div className="main flex flex-col">
            <div className="flex items-center justify-center h-screen text-white overflow-hidden relative" style={{ backgroundColor: 'black'}}>
                <div className="flex flex-col items-center justify-center z-10">
                    <h1 className="text-gradient text-center text-3xl font-bold">Emotion Recognizer</h1>
                    <p className="text-center text-white">Welcome to Emotion Recognizer, the best place to recognize emotions in text and images.</p>
                    <Button href="/about">En savoir plus !</Button>
                </div>
                <img src="./public/visage.png" className='visage'/>
            </div>
            <div className='flex items-center justify-center h-screen flex-col gap-5' style={{backgroundColor: 'white'}}>
                <h1 className='text-3xl overflow-hidden'>Nos services</h1>
                <div className='flex items-center justify-center gap-5'>
                    <div className="flex items-center justify-around h-96 w-72 bg-gray-200 rounded-lg flex-col border-solid border-2 border-sky-500">
                        <h1 className='font-bold text-2xl'>Emotion dans un texte</h1>
                        <p className='text-center'>Mettez un texte et l'IA se charge de vous informer les émotions dans le texte !</p>
                        <Button href="/TextEmotion">Découvrir</Button>
                    </div>
                    <div className="flex items-center justify-around h-96 w-72 bg-gray-200 rounded-lg flex-col border-solid border-2 border-sky-500">
                        <h1 className='font-bold text-2xl'>Emotion dans une image</h1>
                        <p className='text-center'>Mettez une image et l'IA se charge de vous informer les émotions dans le texte !</p>
                        <Button href="/ImageEmotion">Découvrir</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
