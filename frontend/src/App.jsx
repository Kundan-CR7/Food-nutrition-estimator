import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ImageUpload from './components/ImageUpload';
import ResultCard from './components/ResultCard';
import { predictFood } from './api';

function App() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageSelected = async (file) => {
        setLoading(true);
        setError(null);
        setResult(null);

        // Scroll to results area if needed, or keep focus here
        try {
            const data = await predictFood(file);
            if (data.status === 'failed') {
                setError(data.error);
            } else {
                setResult(data);
            }
        } catch (err) {
            setError("Failed to process image. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
    };

    return (
        <div className="app-wrapper">
            <Navbar />
            <Hero />

            <main id="upload" style={{
                minHeight: '80vh',
                padding: '100px 20px',
                background: 'var(--light)',
                position: 'relative'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '36px', marginBottom: '16px', fontWeight: 800 }}>Try Identifing Food</h2>
                        <p style={{ fontSize: '18px' }}>Upload an image to get started.</p>
                    </div>

                    {!result && (
                        <div className="animate-fade-in">
                            <ImageUpload onImageSelected={handleImageSelected} />
                        </div>
                    )}

                    {loading && (
                        <div style={{ textAlign: 'center', padding: '60px' }} className="animate-fade-in">
                            <div className="glass-panel" style={{ display: 'inline-flex', padding: '24px 48px', alignItems: 'center', gap: '16px' }}>
                                <div className="spinner" style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '3px solid var(--primary)',
                                    borderTopColor: 'transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite' // Add keyframes in index.css if missing or rely on simple verify
                                }}></div>
                                <span style={{ fontSize: '20px', fontWeight: 600 }}>Analyzing yummy pixels...</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="glass-panel animate-fade-in" style={{
                            color: '#e74c3c',
                            textAlign: 'center',
                            padding: '32px',
                            marginTop: '32px',
                            backgroundColor: 'rgba(231, 76, 60, 0.05)',
                            borderColor: 'rgba(231, 76, 60, 0.2)'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                            <strong>{error}</strong>
                            <br />
                            <button
                                onClick={reset}
                                className="btn-secondary"
                                style={{ marginTop: '24px', borderColor: '#e74c3c', color: '#e74c3c' }}
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {result && (
                        <div className="animate-fade-in">
                            <ResultCard result={result} />
                            <div style={{ textAlign: 'center', marginTop: '48px' }}>
                                <button className="btn-primary" onClick={reset}>
                                    Analyze Another Photo
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <About />

            <footer style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'var(--dark)',
                color: 'white',
            }}>
                <div style={{ fontSize: '24px', marginBottom: '16px' }}>🥑</div>
                <p style={{ color: '#95a5a6' }}>&copy; {new Date().getFullYear()} Savor AI. Built with PyTorch & React.</p>
            </footer>
        </div>
    );
}

export default App;
