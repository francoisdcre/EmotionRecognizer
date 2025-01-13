import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
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
      {file && (
        <div id="image-preview" className="mt-5 overflow-hidden grandient-border">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="overflow-hidden max-w-screen-md w-full object-cover grandient-border"
          />
        </div>
      )}
    </div>
  );
}

export default DragDrop;
