import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPForm = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedOtp = localStorage.getItem('otp');

    if (otp === storedOtp) {
      alert('OTP verified successfully!');
      localStorage.setItem('isVerified', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block mb-2 text-sm">OTP</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input"
            maxLength={6}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
