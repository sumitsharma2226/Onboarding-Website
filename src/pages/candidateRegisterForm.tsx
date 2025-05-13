import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import CheckMark from '../assets/checkmark.svg';

const passwordRules = {
    min: /.{8,}/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    special: /[!@#$%^&*(),.?":{}|<>]/,
};

const CandidateRegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');

    const togglePassword = () => setShowPassword((prev) => !prev);

    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Minimum 8 characters')
            .matches(passwordRules.lowercase, 'Must contain a lowercase letter')
            .matches(passwordRules.uppercase, 'Must contain an uppercase letter')
            .matches(passwordRules.number, 'Must contain a number')
            .matches(passwordRules.special, 'Must contain a special character'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const isRuleValid = (rule: RegExp) => rule.test(passwordInput);

    const handleSubmit = (values: any, { resetForm }: any) => {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

        const emailExists = existingUsers.some(
            (user: any) => user.email === values.email && user.role === 'candidate'
        );

        if (emailExists) {
            alert('A candidate with this email already exists.');
            return;
        }

        const newUser = {
            ...values,
            role: 'candidate',
        };

        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        alert('Candidate registered successfully!');
        resetForm();
        setPasswordInput('');
    };

    const passwordChecks = [
        { label: 'Minimum 8 characters', rule: passwordRules.min },
        { label: 'Lowercase letter', rule: passwordRules.lowercase },
        { label: 'Uppercase letter', rule: passwordRules.uppercase },
        { label: 'Number', rule: passwordRules.number },
        { label: 'Special character', rule: passwordRules.special },
    ];

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-brand-dark">Candidate Registration</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className="space-y-4">
                        <div>
                            <label>Full Name</label>
                            <Field name="fullName" className="input" />
                            <ErrorMessage name="fullName" className="text-red-500 text-sm" component="div" />
                        </div>

                        <div>
                            <label>Email</label>
                            <Field name="email" type="email" className="input" />
                            <ErrorMessage name="email" className="text-red-500 text-sm" component="div" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label>Password</label>
                                <div className="relative">
                                    <Field
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="input w-full pr-10"
                                        onChange={(e: any) => {
                                            setPasswordInput(e.target.value);
                                            setFieldValue('password', e.target.value);
                                        }}
                                    />
                                    <span
                                        onClick={togglePassword}
                                        className="absolute right-2 top-2 cursor-pointer text-black"
                                    >
                                        {showPassword ? <EyeOff size={20} color="black" /> : <Eye size={20} color="black" />}
                                    </span>
                                </div>
                                <ErrorMessage name="password" className="text-red-500 text-sm" component="div" />
                                <ul className="text-sm mt-2 space-y-1 text-gray-600">
                                    {passwordChecks?.map((item, index) => (
                                        <li key={index} className={isRuleValid(item.rule) ? 'text-green-600' : ''}>
                                            <img src={CheckMark} alt="check" className="inline-block w-4 h-4 mr-2" />
                                            <span>{item.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" className="input" />
                                <ErrorMessage name="confirmPassword" className="text-red-500 text-sm" component="div" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CandidateRegisterForm;
