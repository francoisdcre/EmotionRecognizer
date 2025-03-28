import Button from '../components/Button';
import Title from '../components/Title';
import { Link } from "react-router-dom";
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
                    <p className="text-center text-white max-w-lg">Découvrez les émotions qui se cachent dans un texte, dans une image ou en temps réel ! Avec EMOTION RECOGNIZER </p>
                    <Button href="#services">En savoir plus !</Button>
                </div>
                <div className="blur-background"></div>
                <div className="mouse cursor-pointer" onClick={handleScroll}></div>
            </div>
            <div id='services' className='flex items-center justify-center min-h-screen flex-col gap-8 p-5 mt-10' style={{backgroundColor: '#f8edeb'}}>
                <Title title='Nos services' />
                <div className='flex flex-wrap items-center justify-around gap-5 w-full'>
                    <div className='flex flex-col items-center justify-around gap-5'>
                        <h1 className='text-gradient text-xl'>Emotion dans un texte</h1>
                        <p>Mettez un texte et l'IA se charge de vous informer des émotions dans le texte !</p>
                        <Link
                            to="/TextEmotion"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full button text-center cursor-pointer"
                            style={{ transition: "transform 0.2s ease-in-out" }}
                            data-discover="true"
                        >
                            Essayer maintenant
                        </Link>
                    </div>
                    <div>
                        <img src="/text.jpg" alt="Emotion dans un texte" className='w-96 rounded-lg' />
                    </div>
                </div>
                <hr className='grandient-border w-4/5'></hr>
                <div className='flex flex-wrap-reverse items-center justify-around gap-5 w-full'>
                    <div>
                        <img src="/face.jpg" alt="Emotion dans une image" className='w-96 rounded-lg' />
                    </div>
                    <div className='flex flex-col items-center justify-around gap-5'>
                    <h1 className='text-gradient text-xl'>Emotion dans une image</h1>
                        <p>Mettez une image et l'IA se charge de vous informer des émotions dans l'image !</p>
                        <Link
                            to="/ImageEmotion"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full button text-center cursor-pointer"
                            style={{ transition: "transform 0.2s ease-in-out" }}
                            data-discover="true"
                        >
                            Essayer maintenant
                        </Link>
                    </div>
                </div>
                <hr className='grandient-border w-4/5'></hr>
                <div className='flex flex-wrap items-center justify-around gap-5 w-full'>
                    <div className='flex flex-col items-center justify-around gap-5'>
                        <h1 className='text-gradient text-xl'>Emotion en temps réel</h1>
                        <p>Allumez votre caméra et regardez vos émotions en temps réel !</p>
                        <Link
                            to="/LiveEmotion"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full button text-center cursor-pointer"
                            style={{ transition: "transform 0.2s ease-in-out" }}
                            data-discover="true"
                        >
                            Essayer maintenant
                        </Link>
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
                        <p>Nous sommes un groupe de 4 étudiants travaillant sur un projet visant à développer une application basée sur l'intelligence artificielle..</p>
                    </div>
                    <div className='bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6'>
                        <h2 className='text-xl underline'>Notre projet</h2>
                        <p>Notre projet consiste à développer une application capable de détecter les émotions présentes dans un texte ou dans une image.</p>
                    </div>
                    <div className='bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6'>
                        <h2 className='text-xl underline'>Notre objectif</h2>
                        <p>Notre objectif est d'aider les utilisateurs à identifier les émotions exprimées dans un texte ou une image, afin de mieux comprendre les sentiments des autres.</p>
                    </div>
                    <div className='bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6'>
                        <h2 className='text-xl underline'>Technologies Utilisées</h2>
                        <p>Notre application est développée à l'aide des technologies suivantes : NodeJS, React, Tailwind, ChartJS, FaceAPI, API HuggingFace.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;