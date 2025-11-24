import React, { useRef, useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ label, value, onChange, error, required, accept = 'image/*' }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(value || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="file-upload-wrapper">
      {label && (
        <label className="file-upload-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      
      {!preview ? (
        <div 
          className={`file-upload-area ${error ? 'file-upload-error' : ''}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">+</div>
          <div className="upload-text">click to choose files</div>
          <div className="upload-hint">Max file size: 2 MB, Ideal dimensions: 20×20 px</div>
        </div>
      ) : (
        <div className="file-preview">
          <img src={preview} alt="Preview" className="preview-image" />
          <div className="preview-actions">
            <button 
              type="button"
              className="preview-action-btn" 
              onClick={handleRemove}
              title="Remove"
            >
              ×
            </button>
            <button 
              type="button"
              className="preview-action-btn" 
              onClick={() => fileInputRef.current?.click()}
              title="Edit"
            >
              ✎
            </button>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FileUpload;

