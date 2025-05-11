import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [userType, setUserType] = useState<'candidate' | 'client'>('candidate');
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = (values: any) => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const user = allUsers.find(
      (u: any) => u.email === values.email && u.password === values.password
    );

    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      localStorage.setItem('otp', otp);
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      alert('Login successful! An OTP has been sent to your email.');
      alert(`Your OTP is: ${otp}`);

      setIsLoggedIn(true);

      navigate('/otp');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setUserType('candidate')}
          className={`w-1/2 py-2 text-sm font-semibold rounded-l-lg ${
            userType === 'candidate' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Candidate Login
        </button>
        <button
          onClick={() => setUserType('client')}
          className={`w-1/2 py-2 text-sm font-semibold rounded-r-lg ${
            userType === 'client' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Client Login
        </button>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
        <Form className="space-y-4">
          <div>
            <label>Email</label>
            <Field type="email" name="email" className="input" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label>Password</label>
            <Field type="password" name="password" className="input" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {userType === 'candidate' ? 'Login as Candidate' : 'Login as Client'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
