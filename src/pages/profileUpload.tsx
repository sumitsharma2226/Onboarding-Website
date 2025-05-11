import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ProfileUpload = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    bio: '',
    profilePicture: null as File | null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    bio: Yup.string().max(200, 'Bio should not exceed 200 characters').optional(),
  });

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('bio', values.bio);
    if (profileImage) {
      formData.append('profilePicture', profileImage);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      const user = { ...values, profilePicture: imageUrl };

      localStorage.setItem('loggedInUser', JSON.stringify(user));

      console.log('Profile data:', values);
      console.log('Form Data:', formData);

      navigate('/dashboard');
    };
    reader.readAsDataURL(profileImage!);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Profile</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Field
              type="text"
              name="name"
              className="input"
              placeholder="Enter your name"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <Field
              as="textarea"
              name="bio"
              className="input"
              placeholder="Short bio (optional)"
            />
            <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              className="input"
              onChange={handleProfilePictureChange}
            />
            <ErrorMessage name="profilePicture" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Save Profile
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileUpload;
