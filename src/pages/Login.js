import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import '../Css/AuthForm.css';
import { toast } from 'react-toastify';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // State to track loading status
    const { token, login: loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (token) {
            navigate('/'); // Redirect to home/dashboard if logged in
        }
    }, [token, navigate]);

    const validate = () => {
        const newErrors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email || !emailPattern.test(form.email)) {
            newErrors.email = 'Enter a valid email.';
        }

        if (!form.password) {
            newErrors.password = 'Password cannot be empty.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true); // Start loading when submitting
        try {
            const res = await login(form);
            if (res.token) {
                loginUser(res.token);
                toast.success('Login successful');
                navigate('/');
            } else {
                toast.error(res.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);  // Log the error for debugging
            toast.error(error.message || 'Logging failed. Please try again.');
        } finally {
            setLoading(false); // Stop loading after the request completes
        }
    };

    return (
        <div className="auth-form-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-form-header">Login</h2>

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

                <button
                    type="submit"
                    className="auth-form-submit"
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? '#d3d3d3' : '#007BFF',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        color: loading ? '#151515' : '#fff',
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="auth-form-footer">
                    <p>Don't have an account? <span onClick={() => navigate('/register')} className="auth-form-link">Register</span></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
