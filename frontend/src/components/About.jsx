import React from 'react';

const StepCard = ({ number, title, desc, icon }) => (
    <div className="glass-panel" style={{ padding: '32px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
        <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            fontSize: '120px',
            opacity: 0.05,
            fontWeight: 800
        }}>
            {number}
        </div>
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>{icon}</div>
        <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 700 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '16px' }}>{desc}</p>
    </div>
);

const About = () => {
    return (
        <section id="how-it-works" style={{ padding: '100px 0', position: 'relative' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '42px', marginBottom: '16px', fontWeight: 800 }}>How It Works</h2>
                    <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                        Our multi-stage pipeline turns your food photo into actionable data in seconds.
                    </p>
                </div>

                <div className="grid-cols-3">
                    <StepCard
                        number="01"
                        icon="📸"
                        title="Upload & Detect"
                        desc="Your image is processed by MobileNetV2, an efficient Convolutional Neural Network trained to recognize thousands of food dishes."
                    />
                    <StepCard
                        number="02"
                        icon="📐"
                        title="Segment & Measure"
                        desc="We use Computer Vision (HSV Segmentation) to isolate the food from the plate and calculate its approximate pixel area and volume."
                    />
                    <StepCard
                        number="03"
                        icon="🍎"
                        title="Calculate Metrics"
                        desc="Using standard density tables, we convert volume to weight and look up the macronutrients for your specific dish."
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
