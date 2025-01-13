import Title from '../components/Title';
// import Button from '../components/Button';
import DnD from '../components/DnD';

function ImageEmotion() {
    
    return (
        <div className='main flex flex-col bg-black'>
            <div className="min-h-screen flex justify-center items-center flex-col gap-15">
                <div className="h-dvh flex justify-center items-center flex-col gap-8">
                    <Title title="Image Emotion" />
                    <DnD />
                </div>
            </div>
        </div>
    );
}

export default ImageEmotion;
