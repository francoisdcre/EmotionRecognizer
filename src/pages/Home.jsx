import Button from '../components/Button';
import Title from '../components/Title';

function Home() {

    const handleScroll = () => {
        const targetElement = document.getElementById('services');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="main flex flex-col">
            <div id='home' className="flex items-center justify-center min-h-screen text-white overflow-hidden relative p-5" style={{ backgroundColor: 'black'}}>
                <div className="flex flex-col items-center justify-center z-10 gap-8">
                    <h1 className="text-center text-3xl font-bold text-gradient">Emotion Recognizer</h1>
                    <p className="text-center text-white max-w-lg">Découvrez les émotions qui se cachent dans un texte, ou dans une image ! Avec EMOTION RECOGNIZER </p>
                    <Button href="#about">En savoir plus !</Button>
                </div>
                <div className="blur-background"></div>
                <div className="mouse cursor-pointer" onClick={handleScroll}></div>
            </div>
            <div id='services' className='flex items-center justify-center min-h-screen flex-col gap-8 p-5 mt-10' style={{backgroundColor: '#f8edeb'}}>
                <Title title='Nos services' />
                <div className='flex flex-wrap items-center justify-around gap-5 w-full'>
                    <div className='flex flex-col items-center justify-around gap-5'>
                        <h1 className='text-gradient text-xl'>Emotion dans une image</h1>
                        <p>Mettez une image et l'IA se charge de vous informer les émotions dans le texte !</p>
                        <Button href="/ImageEmotion">Essayer maintenant</Button>
                    </div>
                    <div>
                        <img src="/face.jpg" alt="Emotion dans une image" className='w-96 rounded-lg' />
                    </div>
                </div>
                <hr className='grandient-border w-4/5'></hr>
                <div className='flex flex-wrap-reverse items-center justify-around gap-5 w-full'>
                    <div>
                        <img src="/text.jpg" alt="Emotion dans un texte" className='w-96 rounded-lg' />
                    </div>
                    <div className='flex flex-col items-center justify-around gap-5'>
                        <h1 className='text-gradient text-xl'>Emotion dans un texte</h1>
                        <p>Mettez un texte et l'IA se charge de vous informer les émotions dans le texte !</p>
                        <Button href="/TextEmotion">Essayer maintenant</Button>
                    </div>
                </div>
                <hr className='grandient-border w-4/5'></hr>
                <div className='flex flex-wrap items-center justify-around gap-5 w-full'>
                    <div className='flex flex-col items-center justify-around gap-5'>
                        <h1 className='text-gradient text-xl'>Emotion en temps réel</h1>
                        <p>Allumer votre caméra et regarder vos émotions en temps réel !</p>
                        <Button href="/LiveEmotion">Essayer maintenant</Button>
                    </div>
                    <div>
                        <img src="/face-live.jpg" alt="Emotion dans une image" className='w-96 rounded-lg' />
                    </div>
                </div>
            </div>
            <div id='about' className='flex items-center justify-center min-h-screen flex-col gap-8 p-5 mt-10' style={{backgroundColor: 'black'}}>
                <Title title='À propos' />
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
                        <p>Notre application est développée en utilisant les technologies suivantes: React, TailwindCSS, React Router ... (à ajouter...)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;