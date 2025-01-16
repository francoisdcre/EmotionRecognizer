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
    neutral: "#FF6384", // Rouge
    surprise: "#36A2EB", // Bleu
    sadness: "#FFCE56", // Jaune
    joy: "#4BC0C0", // Vert clair
    anger: "#9966FF", // Violet
    disgust: "#FF9F40", // Orange
    fear: "#C9CBCF", // Gris
};

// Fonction pour traduire un texte avec LibreTranslate
const translateText = async (text, sourceLang = "fr", targetLang = "en") => {
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
        );

        if (!response.ok) {
            throw new Error(`Erreur de traduction : ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.responseStatus !== 200) {
            throw new Error(`Erreur de traduction : ${result.responseDetails}`);
        }

        return result.responseData.translatedText; // Texte traduit
    } catch (error) {
        console.error("Erreur lors de la traduction :", error);
        throw new Error("Impossible de traduire le texte.");
    }
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
            console.log("Texte original (français) :", text);
    
            // Traduction du texte en anglais
            const translatedText = await translateText(text, "fr", "en");
            console.log("Texte traduit (anglais) :", translatedText);
    
            // Analyse des émotions sur le texte traduit
            const result = await query({ inputs: translatedText });
            console.log("Résultat brut de l'API :", result);
    
            // Vérifiez que les données sont bien structurées
            if (result && Array.isArray(result) && Array.isArray(result[0])) {
                const labels = result[0].map((emotion) => emotionLabels[emotion.label] || emotion.label);
                const scores = result[0].map((emotion) => emotion.score * 100);
                const backgroundColors = result[0].map((emotion) => emotionColors[emotion.label]);
    
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Scores des émotions (%)",
                            data: scores,
                            backgroundColor: backgroundColors,
                            hoverBackgroundColor: backgroundColors,
                        },
                    ],
                });
            } else {
                throw new Error("Résultats inattendus de l'API.");
            }
        } catch (err) {
            console.error("Erreur lors de l'analyse des émotions :", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="main flex flex-col bg-black text-white mt-10">
            <div className="min-h-screen flex justify-center items-center flex-col">
                <Title title="Text Emotion" />
                <p className="text-chite">Analysez les émotions dans vos textes !</p>
                {/* Formulaire */}
                <div className="flex flex-col gap-5 w-9/12 items-center justify-center p-5">
                    <textarea
                        className="p-2 rounded-lg w-6/12 h-32 textarea"
                        placeholder="Entrez votre texte ici"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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
