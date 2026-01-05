import React, { useState } from 'react';
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
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '40px 20px',
            width: '100%'
        }}>
            <header style={{ textAlign: 'center', marginBottom: '48px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🥑</div>
                <h1 style={{
                    margin: 0,
                    fontSize: '42px',
                    fontWeight: 800,
                    letterSpacing: '-1px',
                    background: 'linear-gradient(45deg, #2C3E50, #34495E)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Savor AI
                </h1>
                <p style={{ color: '#7F8C8D', fontSize: '18px', marginTop: '8px' }}>
                    Smart Nutrition Estimator
                </p>
            </header>

            <main>
                {!result && (
                    <div className="animate-fade-in">
                        <ImageUpload onImageSelected={handleImageSelected} />
                    </div>
                )}

                {loading && (
                    <div style={{ textAlign: 'center', padding: '40px' }} className="animate-fade-in">
                        <div className="glass-panel" style={{ display: 'inline-block', padding: '16px 32px' }}>
                            <span style={{ fontSize: '24px' }}>✨ Analyzing your food...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="glass-panel animate-fade-in" style={{
                        color: '#c0392b',
                        textAlign: 'center',
                        padding: '24px',
                        marginTop: '24px',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        borderColor: 'rgba(231, 76, 60, 0.2)'
                    }}>
                        <strong>Error:</strong> {error}
                        <br />
                        <button
                            onClick={reset}
                            style={{
                                marginTop: '12px',
                                background: 'none',
                                border: '1px solid #c0392b',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                color: '#c0392b',
                                cursor: 'pointer'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {result && (
                    <div className="animate-fade-in">
                        <ResultCard result={result} />
                        <div style={{ textAlign: 'center', marginTop: '32px' }}>
                            <button className="btn-primary" onClick={reset}>
                                Analyze Another Photo
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <footer style={{
                textAlign: 'center',
                marginTop: '60px',
                color: '#BDC3C7',
                fontSize: '14px'
            }}>
                Powered by MobileNetV2 & PyTorch
            </footer>
        </div>
    );
}

export default App;
