import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ClientRegisterForm = () => {
    const initialValues = {
        companyName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required('Company name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = (values: any) => {
        console.log('Client registration submitted:', values);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-brand-dark">Client Registration</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="space-y-4">
                    <div>
                        <label>Company Name</label>
                        <Field name="companyName" className="input" />
                        <ErrorMessage name="companyName" className="text-red-500 text-sm" component="div" />
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

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
                    >
                        Register
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default ClientRegisterForm;
