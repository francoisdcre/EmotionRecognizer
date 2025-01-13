import React, { useState } from "react";
import Title from '../components/Title';
import DnD from '../components/DnD';

function ImageEmotion() {
    const [imageSrc, setImageSrc] = useState(null);

    // Fonction pour gérer le fichier déposé
    const handleFileDrop = (file) => {
        if (file && file.type.startsWith('image/')) { // Vérifie que le fichier est une image
            const imageUrl = URL.createObjectURL(file); // Crée une URL temporaire pour l'image
            setImageSrc(imageUrl); // Stocke l'URL dans l'état
        } else {
            alert("Veuillez déposer un fichier image valide.");
        }
    };

    return (
        <div className='main flex flex-col bg-black'>
            <div className="min-h-screen flex justify-center items-center flex-col gap-15">
                <div className="h-dvh flex justify-center items-center flex-col gap-8">
                    <Title title="Image Emotion" />
                    {/* Passez la fonction handleFileDrop à DnD */}
                    <DnD onFileDrop={handleFileDrop} />
                    <div id="image-preview" className="mt-5">
                        {/* Affichez l'image si une image a été déposée */}
                        {imageSrc && <img src={imageSrc} alt="Preview" className="w-64 h-64 object-cover border-2 border-gray-300" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageEmotion;
