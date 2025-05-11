import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CandidateRegisterForm = () => {
    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

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
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-brand-dark">Candidate Registration</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
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
                                <Field name="password" type="password" className="input" />
                                <ErrorMessage name="password" className="text-red-500 text-sm" component="div" />
                            </div>
                            <div>
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" className="input" />
                                <ErrorMessage name="confirmPassword" className="text-red-500 text-sm" component="div" />
                            </div>
                        </div>

                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CandidateRegisterForm;
