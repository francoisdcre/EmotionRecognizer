import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Title from "../components/Title";
import Button from "../components/Button";
import { query } from "../API"; // Importe la fonction d'appel à l'API

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Mapping des étiquettes d'émotions (anglais -> français avec emojis)
const emotionLabels = {
    neutral: "Neutre 😐",
    surprise: "Surprise 😲",
    sadness: "Tristesse 😢",
    joy: "Joie 😊",
    anger: "Colère 😡",
    disgust: "Dégoût 🤢",
    fear: "Peur 😨",
};

// Mapping des couleurs par émotion
const emotionColors = {
    neutral: "#FF6384",  // Rouge
    surprise: "#36A2EB", // Bleu
    sadness: "#FFCE56",  // Jaune
    joy: "#4BC0C0",      // Vert clair
    anger: "#9966FF",    // Violet
    disgust: "#FF9F40",  // Orange
    fear: "#C9CBCF",     // Gris
};

function TextEmotion() {
    const [text, setText] = useState(""); // État pour stocker le texte saisi
    const [loading, setLoading] = useState(false); // État pour indiquer que l'analyse est en cours
    const [error, setError] = useState(""); // État pour afficher une erreur si nécessaire
    const [chartData, setChartData] = useState(null); // État pour stocker les données du graphique

    const handleClick = async () => {
        setLoading(true);
        setError("");

        try {
            console.log("Texte envoyé à l'API :", text); // Affiche le texte envoyé à l'API
            const result = await query({ inputs: text }); // Appel à l'API avec le texte saisi
            console.log("Résultat brut de l'API :", result); // Affiche le résultat brut de l'API dans la console

            // Vérifiez que les données sont bien structurées
            if (result && Array.isArray(result) && Array.isArray(result[0])) {
                // Prépare les données pour le graphique
                const labels = result[0].map((emotion) => emotionLabels[emotion.label] || emotion.label); // Traduire les labels
                const scores = result[0].map((emotion) => emotion.score * 100); // Scores des émotions (en pourcentage)
                const backgroundColors = result[0].map((emotion) => emotionColors[emotion.label]); // Couleurs définies

                // Définit les données du graphique
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Scores des émotions (%)",
                            data: scores,
                            backgroundColor: backgroundColors, // Couleurs spécifiques
                            hoverBackgroundColor: backgroundColors, // Même couleur pour le hover
                        },
                    ],
                });
            } else {
                throw new Error("Résultats inattendus de l'API.");
            }
        } catch (err) {
            console.error("Erreur lors de l'analyse des émotions :", err); // Affiche l'erreur dans la console
            setError("Erreur lors de l'analyse des émotions."); // Définit un message d'erreur
        } finally {
            setLoading(false); // Arrête l'indicateur de chargement
        }
    };

    return (
        <div className="main flex flex-col bg-black text-white mt-10">
            <div className="min-h-screen flex justify-center items-center flex-col">
                <Title title="Text Emotion" />
                <p className="text-chite">Analisez les émotions dans vos textes !</p>
                {/* Formulaire */}
                <div className="flex flex-col gap-5 w-9/12 items-center justify-center p-5">
                    <textarea
                        className="p-2 rounded-lg w-6/12 h-32 textarea"
                        placeholder="Entrez votre texte ici"
                        value={text} // Liaison avec l'état du texte
                        onChange={(e) => setText(e.target.value)} // Met à jour l'état avec le texte saisi
                    ></textarea>
                    <Button className="w-6/12" onClick={handleClick} disabled={loading}>
                        {loading ? "Analyse en cours..." : "Envoyer"}
                    </Button>
                </div>

                {/* Erreur */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Graphique des résultats */}
                {chartData && (
                    <div className="w-6/12 flex flex-col items-center justify-center gap-8">
                        <Title title="Résultats des émotions" />
                        <div className="w-full flex justify-center items-center max-w-lg">
                            <Doughnut data={chartData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TextEmotion;
