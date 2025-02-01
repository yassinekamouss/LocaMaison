import { useState } from 'react';

export default function Test() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Veuillez sélectionner un fichier.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // Ajouter le fichier au FormData

        try {
            const response = await fetch('/test', {
                method: 'POST',
                body: formData, // Pas besoin de headers pour FormData
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du fichier');
            }

            const result = await response.json();
            console.log('Réponse du serveur:', result);
            alert('Fichier envoyé avec succès!');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'envoi du fichier');
        }
    };

    return (
        <div>
            <h1>Test</h1>
            <input
                type="file"
                onChange={handleFileChange} 
            />
            <button onClick={handleSubmit}>Envoyer</button>
        </div>
    );
}