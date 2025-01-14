import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import Title from '../components/Title';

function LiveEmotion() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

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

                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

                    faceapi.draw.drawDetections(canvas, resizedDetections);
                    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
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
        <div className="main flex flex-col bg-black min-h-screen justify-center items-center p-5">
            <Title title="Live Emotion" />
            <p className='text-white'>Détection d'émotion en directe avec votre caméra</p>
            <div className="relative live-emotion">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{ width: '720px', height: '560px' }}
                />
                <canvas
                    ref={canvasRef}
                    className="absolute"
                    style={{ width: '640px', height: '480px' }}
                />
            </div>
        </div>
    );
}

export default LiveEmotion;
