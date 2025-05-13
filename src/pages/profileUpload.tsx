import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ProfileUpload = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    skillset: '',
    bio: '',
    profilePicture: null as File | null,
  });

  useEffect(() => {
    const loggedInUserStr = localStorage.getItem('loggedInUser');
    if (loggedInUserStr) {
      const user = JSON.parse(loggedInUserStr);
      setInitialValues({
        skillset: user.skillset || '',
        bio: user.bio || '',
        profilePicture: null,
      });

      if (user.profilePicture) {
        fetch(user.profilePicture)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'profile.jpg', { type: blob.type });
            setProfileImage(file);
          });
      }
    }
  }, []);

  const validationSchema = Yup.object().shape({
    skillset: Yup.string().required('Skillset is required'),
    bio: Yup.string().max(200, 'Bio should not exceed 200 characters'),
  });

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = (values: any) => {
    const saveProfile = (imageUrl: string | null) => {
      const loggedInUserStr = localStorage.getItem('loggedInUser');
      const usersStr = localStorage.getItem('users');

      if (!loggedInUserStr || !usersStr) {
        alert('User session expired. Please log in again.');
        navigate('/login');
        return;
      }

      const loggedInUser = JSON.parse(loggedInUserStr);
      const users = JSON.parse(usersStr);

      const updatedUsers = users.map((user: any) =>
        user.email === loggedInUser.email && user.role === loggedInUser.role
          ? {
            ...user,
            skillset: values.skillset,
            bio: values.bio,
            profilePicture: imageUrl,
          }
          : user
      );

      const updatedLoggedInUser = {
        ...loggedInUser,
        skillset: values.skillset,
        bio: values.bio,
        profilePicture: imageUrl,
      };

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('loggedInUser', JSON.stringify(updatedLoggedInUser));

      alert('Profile updated successfully!');
      navigate('/dashboard');
    };

    if (profileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        saveProfile(imageUrl);
      };
      reader.readAsDataURL(profileImage);
    } else {
      saveProfile(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Upload Profile</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Set</label>
              <Field
                type="text"
                name="skillset"
                className="w-full border p-2 rounded text-black"
                placeholder="Enter your Skillset"
              />
              <ErrorMessage name="skillset" className="text-red-500 text-sm" component="div" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <Field
                as="textarea"
                name="bio"
                className="w-full border p-2 rounded text-black"
                placeholder="Short bio (optional)"
              />
              <ErrorMessage name="bio" className="text-red-500 text-sm" component="div"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                className="w-full border p-2 rounded"
                onChange={handleProfilePictureChange}
              />
              {profileImage && (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Preview"
                  className="w-20 h-20 mt-2 rounded-full object-cover"
                />
              )}
              <ErrorMessage name="profilePicture" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save Profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileUpload;

