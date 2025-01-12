import Title from '../components/Title';
import Button from '../components/Button';

function TextEmotion() {
    return (
        <div className='main flex flex-col bg-black'>
            <div className="min-h-screen flex justify-center items-center flex-col gap-12">
                <Title title='Text Emotion' />
                <form className='flex flex-col gap-5 w-9/12 items-center justify-center p-5'>
                    <textarea className='p-2 rounded-lg w-6/12 h-32 textarea' placeholder='Entrez votre texte ici'></textarea>
                    <Button className='w-6/12'>Envoyer</Button>
                </form>
                <Title title='Afficher les résultats avec ChartJS ici' />
            </div>
        </div>
    );
}

export default TextEmotion;
