import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <FileUploader classes="overflow-hidden" label="Déposer une image" hoverTitle="Déposer ici" handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default DragDrop;