// components/common/ReactQuillEditor.jsx
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillEditor = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-gray-700">Content *</label>
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default ReactQuillEditor;
