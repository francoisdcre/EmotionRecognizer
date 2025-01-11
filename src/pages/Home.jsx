import Button from '../components/Button';

function Home() {

    const handleScroll = () => {
        const targetElement = document.getElementById('services');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="main flex flex-col">
            <div className="flex items-center justify-center min-h-screen text-white overflow-hidden relative" style={{ backgroundColor: 'black'}}>
                <div className="flex flex-col items-center justify-center z-10 gap-8">
                    <h1 className="text-center text-3xl font-bold text-gradient">Emotion Recognizer</h1>
                    <p className="text-center text-white max-w-lg">Découvrez les émotions qui se cachent dans un texte, ou dans une image ! Avec EMOTION RECOGNIZER </p>
                    <Button href="#about">En savoir plus !</Button>
                </div>
                <div className="blur-background"></div>
                <div className="mouse cursor-pointer" onClick={handleScroll}></div>
            </div>
            <div id='services' className='flex items-center justify-center min-h-screen flex-col gap-8' style={{backgroundColor: '#f8edeb'}}>
                <h1 className='text-3xl overflow-hidden text-gradient font-bold'>Nos services</h1>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                    <div className="flex items-center justify-around h-96 max-w-72 w-full flex-col grandient-border rounded-lg">
                        <h1 className='font-bold text-2xl'>Emotion dans un texte</h1>
                        <p className='text-center'>Mettez un texte et l'IA se charge de vous informer les émotions dans le texte !</p>
                        <Button href="/TextEmotion">Essayer maintenant</Button>
                    </div>
                    <div className="flex items-center justify-around h-96 max-w-72 w-full flex-col grandient-border rounded-lg">
                        <h1 className='font-bold text-2xl'>Emotion dans une image</h1>
                        <p className='text-center'>Mettez une image et l'IA se charge de vous informer les émotions dans le texte !</p>
                        <Button href="/ImageEmotion">Essayer maintenant</Button>
                    </div>
                </div>
            </div>
            <div id='about' className='flex items-center justify-center min-h-screen flex-col gap-8' style={{backgroundColor: 'black'}}>
                <h1 className='text-3xl overflow-hidden text-gradient font-bold'>À propos</h1>
                <div className='text-white flex flex-col items-center justify-center gap-2 max-w-lg text-center'>
                    <div className='bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6'>
                        <h2 className='text-xl underline'>Qui sommes nous ?</h2>
                        <p>Nous sommes un groupe de 4 étudiant qui a pour projet de développer une application axée sur l'Intelligence Artificielle.</p>
                    </div>
                    <div className='bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6'>
                        <h2 className='text-xl underline'>Notre projet</h2>
                        <p>Notre projet consiste à développer une application qui permet de détecter les émotions dans un texte, ou dans une image.</p>
                    </div>
                    <div className='bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6'>
                        <h2 className='text-xl underline'>Notre objectif</h2>
                        <p>Notre objectif est de permettre aux utilisateurs de détecter les émotions dans un texte, ou dans une image, pour mieux comprendre les émotions des autres.</p>
                    </div>
                    <div className='bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6'>
                        <h2 className='text-xl underline'>Technologies Utilisées</h2>
                        <p>Notre application est développée en utilisant les technologies suivantes: React, TailwindCSS, NodeJS, React Router ... (à ajouter...)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;