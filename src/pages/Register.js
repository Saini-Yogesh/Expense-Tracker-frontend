import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/api';
import { AuthContext } from '../context/AuthContext';  // Assuming you have AuthContext set up
import '../Css/AuthForm.css';
import { toast } from 'react-toastify';

function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const { token } = useContext(AuthContext);  // Accessing token from context
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (token) {
            navigate('/');  // Redirect to home/dashboard if logged in
        }
    }, [token, navigate]);

    const validate = () => {
        const newErrors = {};

        if (form.username.length < 3) {
            newErrors.username = 'Name must be at least 3 characters.';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(form.email)) {
            newErrors.email = 'Enter a valid email.';
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(form.password)) {
            newErrors.password = 'Password must be at least 8 characters, include letters, a number, and a symbol.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getPasswordStrength = (password) => {
        if (password.length < 6) return 'Weak';
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) return 'Strong';
        return 'Medium';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await register(form);
            if (res.message === 'User registered successfully') {
                toast.success('Registration successful! Redirecting to login...');
                navigate('/login');
            } else {
                toast.error(res.message || 'Registration failed');
            }
        } catch (error) {
            toast.error(error.message || 'Registration failed. Please try again.');
        }

        setLoading(false); // Reset loading state
    };

    return (
        <div className="auth-form-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-form-header">Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="auth-form-input"
                />
                {errors.username && <p className="auth-error">{errors.username}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="auth-form-input"
                />
                {errors.email && <p className="auth-error">{errors.email}</p>}

                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="auth-form-input"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            color: '#007BFF'
                        }}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </span>
                </div>
                {errors.password && <p className="auth-error">{errors.password}</p>}

                {form.password && (
                    <p className={`password-strength ${getPasswordStrength(form.password).toLowerCase()}`}>
                        Password Strength: {getPasswordStrength(form.password)}
                    </p>
                )}

                <button
                    type="submit"
                    className="auth-form-submit"
                    disabled={loading} // Disable button when loading
                    style={{
                        backgroundColor: loading ? '#d3d3d3' : '#007BFF',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        color: loading ? '#151515' : '#fff',
                    }}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>

                <div className="auth-form-footer">
                    <p>Already have an account? <span onClick={() => navigate('/login')} className="auth-form-link">Login</span></p>
                </div>
            </form>
        </div>
    );
}

export default Register;
