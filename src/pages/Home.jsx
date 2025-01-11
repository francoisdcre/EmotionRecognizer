import Button from '../components/Button';

function Home() {
    return (
        <div className="main flex flex-col">
            <div className="flex items-center justify-center h-screen text-white overflow-hidden relative" style={{ backgroundColor: 'black'}}>
                <div className="flex flex-col items-center justify-center z-10 gap-8">
                    <h1 className="text-center text-3xl font-bold text-gradient">Emotion Recognizer</h1>
                    <p className="text-center text-white max-w-lg">Découvrez les émotions qui se cachent dans un texte, ou dans une image ! Avec EMOTION RECOGNIZER </p>
                    <Button href="/about">En savoir plus !</Button>
                </div>
                <div className="blur-background"></div>
                {/* <img src="./public/visage.png" className='visage'/> */}
            </div>
            <div className='flex items-center justify-center h-screen flex-col gap-8' style={{backgroundColor: '#f8edeb'}}>
                <h1 className='text-3xl overflow-hidden text-gradient font-bold'>Nos services</h1>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                    <div className="flex items-center justify-around h-96 max-w-72 w-full flex-col grandient-border rounded-lg">
                        <h1 className='font-bold text-2xl'>Emotion dans un texte</h1>
                        <p className='text-center'>Mettez un texte et l'IA se charge de vous informer les émotions dans le texte !</p>
                        <Button href="/TextEmotion">Découvrir</Button>
                    </div>
                    <div className="flex items-center justify-around h-96 max-w-72 w-full flex-col grandient-border rounded-lg">
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