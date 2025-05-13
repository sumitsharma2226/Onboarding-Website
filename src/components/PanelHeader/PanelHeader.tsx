import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const PanelHeader = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userStr = localStorage.getItem('loggedInUser');
        if (userStr) {
            try {
                const loggedInUser = JSON.parse(userStr);
                if (loggedInUser?.profilePicture) {
                    setProfileImage(loggedInUser.profilePicture);
                } else {
                    setProfileImage(null);
                }
            } catch (e) {
                console.error('Error parsing loggedInUser from localStorage', e);
                setProfileImage(null);
            }
        } else {
            setProfileImage(null);
        }
    }, [location]);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('otp');
        localStorage.removeItem('isVerified');
        navigate('/');
    };

    return (
        <header className="flex items-center justify-between w-full container mx-auto py-4">
            <a href="/" className="text-xl font-bold text-white">
                <img src={Logo} alt="Logo" className="h-10" />
            </a>

            <nav className="space-x-6 text-white">
                <Link to="/dashboard" className="text-black">Dashboard</Link>
                <Link to="/location" className="text-black">Location</Link>
            </nav>

            <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center space-x-2 bg-black p-1 rounded-full">
                    <img
                        src={profileImage || "https://i.pravatar.cc/150?img=3"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
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
