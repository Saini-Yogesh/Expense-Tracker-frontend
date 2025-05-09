import '../Css/About.css';
import profileImage from './self_image.jpg';

import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const About = () => {
    return (
        <div className="about-page">
            <main className="about-container">
                <div className="about-text">
                    <h1 className="about-title">About Me</h1>
                    <p>
                        Hi, I'm <span style={{ fontWeight: 'bold', color: '#151515' }}>Yogesh Saini</span>, a full-stack developer skilled in <span style={{ fontWeight: 'bold', color: '#151515' }}>React, Node.js, MongoDB</span>. I enjoy building dynamic and efficient web apps.
                    </p>
                    <p>
                        I focus on creating user-friendly, responsive applications and love exploring new technologies to improve my projects.
                    </p>
                    <p>
                        <span style={{ fontWeight: 'bold', color: '#151515' }}>Backend development</span> is my passion, especially working with <span style={{ fontWeight: 'bold', color: '#151515' }}>APIs</span> and deploying applications to ensure scalability and performance.
                    </p>

                    <div className="about-contact-only-icons">
                        <a href="mailto:yogesh.saini4002@gmail.com" target="_blank" rel="noopener noreferrer">
                            <FaEnvelope />
                        </a>
                        <a href="https://www.linkedin.com/in/yogesh-saini-203153265/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/Saini-Yogesh" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://saini-yogesh.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">
                            <FaGlobe />
                        </a>
                    </div>
                </div>

                <div className="about-image">
                    <img src={profileImage} alt="Yogesh Saini" />
                </div>
            </main>

            {/* Footer */}
            <footer className="about-footer">
                Designed & Built by Yogesh Saini · All rights reserved © <span id="year">{new Date().getFullYear()}</span>
            </footer>
        </div>
    );
};

export default About;
