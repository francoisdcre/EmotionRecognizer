import React from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "WEBP"]; 

function DragDrop({ onFileDrop }) {
    const handleChange = (file) => {
        if (onFileDrop) {
            onFileDrop(file);
        }
    };

    return (
        <div className="flex flex-col items-center gap-5 p-5">
            <FileUploader
                classes="overflow-hidden border-dashed border-2 border-gray-400 p-5"
                label="Déposez une image"
                hoverTitle="Déposez ici"
                uploadedLabel="Fichier déposé avec succès !"
                handleChange={handleChange}
                name="file"
                types={fileTypes}
            />
        </div>
    );
}

export default DragDrop;
