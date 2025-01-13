import Title from '../components/Title';

function ImageEmotion() {

    return (
        <div className='main flex flex-col bg-black min-h-screen justify-center items-center flex-col gap-15'>
            <Title title="Live Emotion" />
            <p className='text-white'>Détection d'émotion en temps réel.</p>
        </div>
    );
}

export default ImageEmotion;
