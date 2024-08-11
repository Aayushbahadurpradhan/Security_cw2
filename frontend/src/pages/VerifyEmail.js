import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const VerifyEmail = () => {
    const [pin, setPin] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePinChange = (e) => {
        const pinValue = e.target.value;
        setPin(pinValue);
        if (pinValue.length === 4) {
            setError('');
        } else {
            setError('PIN must be 4 digits long');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pin.length !== 4) {
            setError('PIN must be 4 digits long');
            return;
        }

        try {
            const response = await fetch(SummaryApi.verifyEmail.url, {
                method: SummaryApi.verifyEmail.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, verificationCode: pin }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                navigate('/login');
            } else {
                toast.error(data.message || 'Failed to verify email. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <section id="verify-email">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-sm mx-auto shadow-lg rounded-lg">
                    <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label htmlFor="email">Email:</label>
                            <div className="bg-slate-100 p-2 rounded">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pin">Verification PIN:</label>
                            <div className="bg-slate-100 p-2 flex rounded">
                                <input
                                    type="text"
                                    id="pin"
                                    placeholder="Enter the PIN"
                                    value={pin}
                                    onChange={handlePinChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                    maxLength={4}
                                />
                            </div>
                            {error && <p className="text-red-600 mt-2">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-transform mx-auto block mt-6"
                        >
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default VerifyEmail;
