import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            height: 'var(--nav-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 5%',
            transition: 'all 0.3s ease',
            background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            boxShadow: scrolled ? 'var(--shadow-sm)' : 'none'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div style={{ fontSize: '32px' }}>🥑</div>
                <div style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    background: 'var(--gradient-dark)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Savor AI
                </div>
            </div>

            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                {['Home', 'Upload', 'How it Works'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={(e) => {
                            e.preventDefault();
                            const id = item === 'Home' ? 'root' : item.toLowerCase().replace(/\s+/g, '-');
                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                            textDecoration: 'none',
                            color: 'var(--dark)',
                            fontWeight: 600,
                            fontSize: '16px',
                            transition: 'color 0.2s',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--dark)'}
                    >
                        {item}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
