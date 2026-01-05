import React from 'react';

const NutritionBar = ({ label, value, max, color, unit }) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>
                <span style={{ color: '#7F8C8D' }}>{label}</span>
                <span style={{ color: '#2C3E50' }}>{value}{unit}</span>
            </div>
            <div style={{ height: '8px', background: '#ECF0F1', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: color,
                    borderRadius: '4px',
                    transition: 'width 1s ease-out'
                }}></div>
            </div>
        </div>
    );
};

const ResultCard = ({ result }) => {
    if (!result) return null;

    const {
        food,
        confidence,
        portion_scale,
        approx_weight_g,
        calories,
        protein,
        carbs,
        fat
    } = result;

    const confidencePercent = (confidence * 100).toFixed(1);

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '32px', marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h2 style={{
                        margin: '0 0 4px 0',
                        fontSize: '32px',
                        textTransform: 'capitalize',
                        background: 'linear-gradient(45deg, #FF6B6B, #EE5253)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {food.replace(/_/g, ' ')}
                    </h2>
                    <div style={{ fontSize: '14px', color: '#95A5A6', fontWeight: 500 }}>
                        Confidence: {confidencePercent}%
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#2C3E50' }}>{calories}</div>
                    <div style={{ fontSize: '12px', color: '#7F8C8D', textTransform: 'uppercase', letterSpacing: '1px' }}>Kcal</div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                padding: '16px',
                background: '#F7F9FC',
                borderRadius: '12px',
                marginBottom: '24px'
            }}>
                <div>
                    <div style={{ fontSize: '12px', color: '#95A5A6' }}>Weight</div>
                    <div style={{ fontWeight: 600, color: '#2C3E50' }}>~{approx_weight_g}g</div>
                </div>
                <div>
                    <div style={{ fontSize: '12px', color: '#95A5A6' }}>Portion Scale</div>
                    <div style={{ fontWeight: 600, color: '#2C3E50' }}>{portion_scale}x</div>
                </div>
            </div>

            <div>
                <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#2C3E50' }}>Macronutrients</h3>
                {/* Helper values for max bar width (approx daily values for context) */}
                <NutritionBar label="Protein" value={protein} max={50} unit="g" color="#4ECDC4" />
                <NutritionBar label="Carbs" value={carbs} max={100} unit="g" color="#FFD166" />
                <NutritionBar label="Fat" value={fat} max={30} unit="g" color="#FF6B6B" />
            </div>
        </div>
    );
};

export default ResultCard;
