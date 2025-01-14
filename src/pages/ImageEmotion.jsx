import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import Title from '../components/Title';
import DnD from '../components/DnD';

function ImageEmotion() {
    const [imageSrc, setImageSrc] = useState(null);
    const canvasRef = useRef(null);

    // Charger les modèles au montage du composant
    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                await faceapi.nets.faceExpressionNet.loadFromUri('/models');
                console.log("Modèles chargés avec succès.");
            } catch (err) {
                console.error("Erreur lors du chargement des modèles :", err);
            }
        };
        loadModels();
    }, []);

    // Fonction pour analyser les émotions sur l'image
    const analyzeImage = async () => {
        if (imageSrc) {
            const image = document.getElementById("input-image");
            const canvas = canvasRef.current;

            const detections = await faceapi
                .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            const displaySize = { width: image.width, height: image.height };
            faceapi.matchDimensions(canvas, displaySize);

            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }
    };

    // Fonction pour gérer l'image déposée
    const handleFileDrop = (file) => {
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
        } else {
            alert("Veuillez déposer un fichier image valide.");
        }
    };

    useEffect(() => {
        if (imageSrc) {
            analyzeImage();
        }
    }, [imageSrc]);

    return (
        <div className="main flex flex-col bg-black mt-10">
            <div className="min-h-screen flex justify-center items-center flex-col gap-15">
                <div className="h-dvh flex justify-center items-center flex-col gap-8">
                    <Title title="Image Emotion" />
                    <DnD onFileDrop={handleFileDrop} />
                    <div id="image-preview" className="relative mt-5">
                        {/* Affiche l'image et superpose le canvas */}
                        {imageSrc && (
                            <div className="relative flex flex-col items-center gap-5 max-w-2xl">
                                <img
                                    id="input-image"
                                    src={imageSrc}
                                    alt="Preview"
                                    className="object-cover border-2 border-gray-300"
                                    style={{
                                        width: "100%", // Largeur adaptative
                                    }}
                                />
                                <canvas
                                    ref={canvasRef}
                                    className="absolute top-0 left-0"
                                    style={{
                                        width: "100%", // Correspond à la largeur de l'image
                                        height: "100%", // Correspond à la hauteur de l'image
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default ImageEmotion;
