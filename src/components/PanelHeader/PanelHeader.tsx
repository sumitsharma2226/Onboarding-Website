import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const PanelHeader = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    console.log('profileImage', profileImage)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = localStorage.getItem('loggedInUser');
        if (userStr) {
            try {
                const loggedInUser = JSON.parse(userStr);
                if (loggedInUser?.profilePicture) {
                    setProfileImage(loggedInUser.profilePicture);
                }
            } catch (e) {
                console.error("Error parsing loggedInUser from localStorage", e);
            }
        } else {
            setProfileImage(null)
        }
    }, []);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('otp');
        navigate('/login');
    };

    return (
        <header className="flex items-center justify-between w-full container mx-auto">
            <a href="/" className="text-xl font-bold text-white">
                <img src={Logo} alt="Logo" />
            </a>

            <nav className="space-x-6 text-white">
                <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
                <Link to="/location" className="hover:text-indigo-200">Location</Link>
            </nav>

            <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center space-x-2">
                    {profileImage ? (
                        <img
                            src={profileImage} 
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        />
                    ) : null}

                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                        <div className="p-2">
                            <Link to="/profile-upload" className="block py-2 px-4 hover:bg-gray-200">View Profile</Link>
                            <button onClick={handleLogout} className="block w-full py-2 px-4 text-left hover:bg-gray-200">Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default PanelHeader;
