<<<<<<< HEAD
import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Title from "../components/Title";
import Button from "../components/Button";
import { query } from "../API"; // Importe la fonction d'appel à l'API

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

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
                const labels = result[0].map((emotion) => emotion.label); // Labels des émotions
                const scores = result[0].map((emotion) => emotion.score * 100); // Scores des émotions (en pourcentage)

                // Définit les données du graphique
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Scores des émotions (%)",
                            data: scores,
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0",
                                "#9966FF",
                                "#FF9F40",
                                "#C9CBCF",
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0",
                                "#9966FF",
                                "#FF9F40",
                                "#C9CBCF",
                            ],
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
        <div className="main flex flex-col bg-black text-white">
            <div className="min-h-screen flex justify-center items-center flex-col">
                <Title title="Text Emotion" />
                {/* Formulaire */}
                <div className="flex flex-col gap-5 w-9/12 items-center justify-center p-5">
                    <p>Uniquement disponible en Anglais (pour le moment)</p>
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
                        <div className="w-96">
                            <Doughnut data={chartData} />
                        </div>
                    </div>
                )}
=======
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
>>>>>>> d4e3ca7a36f1d58129a2256c2125ae47c8021487
            </div>
        </div>
    );
}

export default TextEmotion;
