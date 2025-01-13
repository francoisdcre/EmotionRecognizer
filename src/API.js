const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

export async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
