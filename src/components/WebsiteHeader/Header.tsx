import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg'

const WebsiteHeader = () => {
    return (
        <header className="flex items-center justify-between w-full container mx-auto px-4">
            <a href='/' className="text-xl font-bold text-indigo-700">
                <img src={Logo} alt="" />
            </a>
            <nav className="space-x-6 text-black">
                <Link to="/login" className="hover:text-indigo-600">Login</Link>
                <Link to="/register" className="hover:text-indigo-600">Register</Link>
            </nav>
        </header>
    )
}

export default WebsiteHeader;