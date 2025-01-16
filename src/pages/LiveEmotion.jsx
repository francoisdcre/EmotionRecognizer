import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Title from '../components/Title';

function LiveEmotion() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [message, setMessage] = useState(''); // État pour afficher un message

    // Traductions des émotions
    const emotionTranslations = {
        happy: 'heureux 😊',
        sad: 'triste 😢',
        angry: 'en colère 😡',
        surprised: 'surpris 😮',
        neutral: 'neutre 😐',
        disgusted: 'dégoûté 🤢',
        fearful: 'peur 😱',
    };

    useEffect(() => {
        const loadModels = async () => {
            try {
                // Charger les modèles nécessaires
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                await faceapi.nets.faceExpressionNet.loadFromUri('/models');
                console.log('Modèles chargés avec succès');
            } catch (err) {
                console.error('Erreur lors du chargement des modèles :', err);
            }
        };

        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Erreur lors de l’accès à la caméra :', err);
            }
        };

        const handleVideoPlay = () => {
            const interval = setInterval(async () => {
                if (videoRef.current) {
                    const detections = await faceapi
                        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks()
                        .withFaceExpressions();

                    const canvas = canvasRef.current;
                    const displaySize = {
                        width: videoRef.current.videoWidth,
                        height: videoRef.current.videoHeight,
                    };

                    faceapi.matchDimensions(canvas, displaySize);

                    const resizedDetections = faceapi.resizeResults(detections, displaySize);

                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    if (resizedDetections.length === 0) {
                        setMessage('Aucun visage détecté.'); // Afficher un message si aucun visage n'est détecté
                    } else {
                        setMessage(''); // Réinitialiser le message si un visage est détecté
                        faceapi.draw.drawDetections(canvas, resizedDetections);
                        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

                        // Traduire et afficher les émotions détectées
                        resizedDetections.forEach((detection) => {
                            const { x, y } = detection.detection.box;
                            const expressions = detection.expressions;
                            const sortedEmotions = Object.entries(expressions).sort(
                                (a, b) => b[1] - a[1]
                            ); // Trier par score décroissant
                            const topEmotion = sortedEmotions[0]; // Émotion la plus probable
                            if (topEmotion) {
                                const [emotion, score] = topEmotion;
                                const translatedEmotion =
                                    emotionTranslations[emotion] || emotion; // Traduire en français
                                ctx.fillStyle = 'red';
                                ctx.font = '20px Arial';
                                ctx.fillText(
                                    `${translatedEmotion} (${Math.round(score * 100)}%)`,
                                    x,
                                    y - 30
                                );
                            }
                        });
                    }
                }
            }, 300);

            return () => clearInterval(interval);
        };

        // Charger les modèles et démarrer la caméra
        loadModels();
        startVideo();

        if (videoRef.current) {
            videoRef.current.addEventListener('play', handleVideoPlay);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('play', handleVideoPlay);
            }
        };
    }, []);

    return (
        <div className="main flex flex-col bg-black min-h-screen justify-center items-center p-5 mt-10 gap-5">
            <Title title="Live Emotion" />
            <p className="text-white">Détection des émotions en direct grâce à votre caméra.</p>
            <div className="live-emotion">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                />
                <canvas
                    ref={canvasRef}
                />
            </div>
            {/* Message en dessous */}
            {message && (
                <p className="text-red-500 text-center mt-5">{message}</p>
            )}
        </div>
    );
}

export default LiveEmotion;
