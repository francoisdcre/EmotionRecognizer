import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import Title from "../components/Title";
import DnD from "../components/DnD";
import Button from "../components/Button";

function ImageEmotion() {
    const [imageSrc, setImageSrc] = useState(null); // Source de l'image ou photo capturée
    const [noFacesDetected, setNoFacesDetected] = useState(false); // État pour afficher le message
    const [showCamera, setShowCamera] = useState(false); // État pour afficher ou cacher la caméra
    const videoRef = useRef(null); // Référence pour la webcam
    const canvasRef = useRef(null); // Référence pour le canvas d'analyse

    // Charger les modèles au montage du composant
    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                await faceapi.nets.faceExpressionNet.loadFromUri("/models");
                console.log("Modèles chargés avec succès.");
            } catch (err) {
                console.error("Erreur lors du chargement des modèles :", err);
            }
        };
        loadModels();
    }, []);

    const emotionTranslations = {
        happy: 'heureux 😊',
        sad: 'triste 😢',
        angry: 'en colère 😡',
        surprised: 'surpris 😲',
        neutral: 'neutre 😐',
        disgusted: 'dégoûté 🤢',
        fearful: 'peur 😱',
    };

    // Fonction pour analyser les émotions sur une image
    const analyzeImage = async () => {
        if (imageSrc) {
            const image = document.getElementById("input-image");
            const canvas = canvasRef.current;
    
            // Ajuster les dimensions du canvas pour correspondre à l'image
            canvas.width = image.naturalWidth; // Largeur native de l'image
            canvas.height = image.naturalHeight; // Hauteur native de l'image
    
            const detections = await faceapi
                .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();
    
            if (detections.length === 0) {
                setNoFacesDetected(true); // Aucun visage détecté
                console.log("Aucun visage détecté.");
                return;
            } else {
                setNoFacesDetected(false); // Visage(s) détecté(s)
            }
    
            const displaySize = { width: image.naturalWidth, height: image.naturalHeight };
            faceapi.matchDimensions(canvas, displaySize);
    
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
    
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    
            // Dessiner les émotions traduites avec émojis
            resizedDetections.forEach((detection) => {
                const { x, y } = detection.detection.box;
                const expressions = detection.expressions;
    
                // Trier les émotions par probabilité décroissante
                const sortedEmotions = Object.entries(expressions).sort(
                    (a, b) => b[1] - a[1]
                );
    
                // Prendre l'émotion la plus probable
                const topEmotion = sortedEmotions[0];
                if (topEmotion) {
                    const [emotion, probability] = topEmotion;
                    const translatedEmotion =
                        emotionTranslations[emotion] || emotion; // Traduction ou garder l'original
                    ctx.font = "30px Arial";
                    ctx.fillStyle = "red";
                    ctx.fillText(
                        `${translatedEmotion} (${Math.round(probability * 100)}%)`,
                        x,
                        y - 30
                    );
                }
            });
        }
    };
    

    // Fonction pour activer la caméra
    const startCamera = async () => {
        setShowCamera(true); // Afficher la caméra
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Erreur lors de l'accès à la caméra :", err);
        }
    };

    // Fonction pour capturer une photo
    const capturePhoto = async () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/png"); // Convertir en image
            setImageSrc(dataUrl); // Enregistrer la photo capturée
            setShowCamera(false); // Masquer la caméra après la capture
            setNoFacesDetected(false); // Réinitialiser l'état
        }
    };

    // Fonction pour réinitialiser l'état
    const reset = () => {
        setImageSrc(null); // Supprimer l'image capturée
        setNoFacesDetected(false); // Réinitialiser l'état des visages
        setShowCamera(false); // Réinitialiser la caméra
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks(); // Récupérer les pistes de la caméra
            tracks.forEach((track) => track.stop()); // Arrêter chaque piste
            videoRef.current.srcObject = null; // Réinitialiser la source vidéo
        }
    };

    // Fonction pour gérer l'image déposée
    const handleFileDrop = (file) => {
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
            setNoFacesDetected(false); // Réinitialiser l'état
        } else {
            alert("Veuillez déposer un fichier image valide.");
        }
    };

    // Analyser l'image lorsque l'imageSrc change
    useEffect(() => {
        if (imageSrc) {
            analyzeImage();
        }
    }, [imageSrc]);

    return (
        <div className="main flex flex-col bg-black mt-10">
            <div className="min-h-screen flex justify-center items-center flex-col gap-15">
                <div className="h-dvh flex justify-center items-center flex-col">
                    <Title title="Image Emotion" />
                    <p className="text-white">Analyses les émotions dans vos images ou capturez une photo !</p>
                    <DnD onFileDrop={handleFileDrop} />
                    <div id="image-preview">
                        {/* Activer la caméra */}
                        {!showCamera && !imageSrc && (
                            <Button onClick={startCamera}>Activer la Caméra</Button>
                        )}

                        {/* Vidéo de la caméra */}
                        {showCamera && (
                            <div className="flex flex-col items-center gap-5">
                                <video ref={videoRef} autoPlay muted></video>
                                <Button onClick={capturePhoto}>Prendre une Photo</Button>
                            </div>
                        )}

                        {/* Affiche l'image capturée ou déposée */}
                        {imageSrc && (
                            <>
                                <div className="image-container">
                                    <img id="input-image" src={imageSrc} alt="Preview" />
                                    <canvas ref={canvasRef}></canvas>
                                </div>
                            </>
                        )}

                        {/* Message si aucun visage n'est détecté */}
                        {noFacesDetected && (
                            <div className="text-red-900 text-center">
                                <p>Aucun visage détecté dans cette image.</p>
                                <p>Veuillez mettre une image avec une meilleure qualité ou des visages plus proches.</p>
                            </div>
                        )}

                        {/* Bouton pour recommencer */}
                        {imageSrc && (
                            <div className="p-5">
                                <Button onClick={reset}>Recommencer</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageEmotion;
