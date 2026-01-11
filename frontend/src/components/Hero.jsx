import React from 'react';

const Hero = () => {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: 'var(--nav-height)'
        }}>
            {/* Background Blobs */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '600px',
                height: '600px',
                background: 'linear-gradient(135deg, #FF6B6B 20%, #FFE66D 100%)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                opacity: 0.15,
                zIndex: -1
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '500px',
                height: '500px',
                background: 'linear-gradient(135deg, #4ECDC4 20%, #556EE6 100%)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                opacity: 0.15,
                zIndex: -1
            }} />

            <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                <div
                    className="animate-slide-up"
                    style={{
                        opacity: 0,
                        animationDelay: '0.1s',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'var(--primary)',
                        marginBottom: '16px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}
                >
                    AI-Powered Nutrition
                </div>

                <h1
                    className="animate-slide-up"
                    style={{
                        fontSize: 'clamp(48px, 6vw, 72px)',
                        fontWeight: 800,
                        marginBottom: '24px',
                        opacity: 0,
                        animationDelay: '0.2s',
                        background: 'var(--gradient-dark)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.1
                    }}
                >
                    Eat Smarter,<br />
                    Live Better.
                </h1>

                <p
                    className="animate-slide-up"
                    style={{
                        fontSize: 'clamp(18px, 2vw, 22px)',
                        color: '#576574',
                        marginBottom: '48px',
                        opacity: 0,
                        animationDelay: '0.3s',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                >
                    Snap a photo of your meal and get instant nutritional breakdown powered by advanced computer vision.
                </p>

                <div
                    className="animate-slide-up"
                    style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        opacity: 0,
                        animationDelay: '0.4s'
                    }}
                >
                    <button
                        className="btn-primary"
                        onClick={() => document.getElementById('upload').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Analyze My Food 🥑
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Learn More
                    </button>
                </div>

                <div
                    className="animate-slide-up"
                    style={{
                        marginTop: '48px',
                        opacity: 0,
                        animationDelay: '0.5s'
                    }}
                >
                    <p style={{ fontSize: '14px', color: '#95A5A6', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                        Currently Supporting
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {['Pizza 🍕', 'Hamburger 🍔', 'French Fries 🍟', 'Fried Rice 🍚', 'Samosa 🥟'].map(food => (
                            <span key={food} style={{
                                padding: '8px 16px',
                                background: 'rgba(255, 255, 255, 0.5)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '20px',
                                fontSize: '14px',
                                color: 'var(--dark)',
                                fontWeight: 500,
                                backdropFilter: 'blur(4px)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}>
                                {food}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
