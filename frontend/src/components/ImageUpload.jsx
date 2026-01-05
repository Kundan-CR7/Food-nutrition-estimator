import React, { useState, useRef } from 'react';

const ImageUpload = ({ onImageSelected }) => {
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            onImageSelected(file);
        }
    };

    const handleChange = (e) => {
        handleFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const containerStyle = {
        position: 'relative',
        border: `2px dashed ${isDragging ? '#FF6B6B' : '#ccc'}`,
        borderRadius: '24px',
        padding: '40px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragging ? 'rgba(255, 107, 107, 0.05)' : '#FAFAFA',
        transition: 'all 0.3s ease',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };

    const previewStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '22px',
        zIndex: 1
    };

    const overlayStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
        padding: '20px',
        zIndex: 2,
        color: 'white',
        opacity: preview ? 1 : 0,
        transition: 'opacity 0.3s'
    };

    return (
        <div
            className="glass-panel"
            style={containerStyle}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                accept="image/*"
                style={{ display: 'none' }}
            />

            {preview ? (
                <>
                    <img src={preview} alt="Upload preview" style={previewStyle} />
                    <div style={overlayStyle}>
                        <p style={{ margin: 0, fontWeight: 500 }}>Click or drop to replace</p>
                    </div>
                </>
            ) : (
                <div style={{ zIndex: 2 }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#2C3E50' }}>Drag & Drop Food Image</h3>
                    <p style={{ margin: 0, color: '#95A5A6' }}>or click to browse</p>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
