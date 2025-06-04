import React from 'react'

const About = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>About Us</h1>
            <p>
                Welcome to LearnLog! This platform is designed to help you track your learning journey and improve your skills.
            </p>
            <p>
                Follow us on social media for updates and more resources:
            </p>
            <div style={{ marginTop: '20px' }}>
                <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        marginRight: '15px',
                        textDecoration: 'none',
                        color: '#FF0000',
                        fontWeight: 'bold',
                    }}
                >
                    YouTube
                </a>
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        textDecoration: 'none',
                        color: '#4267B2',
                        fontWeight: 'bold',
                    }}
                >
                    Facebook
                </a>
            </div>
        </div>
    )
}

export default About