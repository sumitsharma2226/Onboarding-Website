import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); 
    const sections = [
        {
            title: 'For Candidates',
            icon: '📇',
            features: [
                'Effortless Profile Creation',
                'Secure Document Upload',
                'Track Application Status',
                'Access Onboarding Guides'
            ]
        },
        {
            title: 'For Clients',
            icon: '📋',
            features: [
                'Manage Candidate Pipelines',
                'Automate Client Agreements',
                'Monitor Onboarding Progress',
                'Generate Compliance Reports'
            ]
        }
    ];

    const footerLinks = {
        Company: ['About Us', 'Careers', 'Contact'],
        Product: ['Features', 'Pricing', 'Integrations'],
        Resources: ['Blog', 'Help Center', 'Support'],
        Legal: ['Privacy Policy', 'Terms of Service', 'Security']
    };
    return (
        <>
            <section className="text-center py-16 px-4 container mx-auto px-4">
                <h1 className="text-6xl text-brand-dark font-bold mb-4 whitespace-pre-line">{`Your Onboarding 
                Journey Starts Here.`}</h1>
                <p className="text-gray-600 text-sm">
                    Streamline candidate profiles and client engagements with OnboardEasy's intuitive platform.
                </p>
            </section>
            
            <div className="flex flex-col md:flex-row justify-center items-start gap-8 px-4 md:px-0 max-w-6xl mx-auto">
                {sections.map(({ title, icon, features }) => (
                    <div key={title} className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/3 hover:shadow-lg transition">
                        <div className="w-14 h-14 mb-4 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                            {icon}
                        </div>
                        <h2 className="text-center text-lg font-semibold mb-2">{title}</h2>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                            {features.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
                <h3 className="mb-4 font-medium">Ready to get started?</h3>
                <div className="space-x-4">
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition" onClick={() => navigate('/candidate-register')}>
                        New Candidate
                    </button>
                    <button className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition" onClick={() => navigate('/client-register')}>
                        Client Login
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 bg-gray-50 py-12 text-sm">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section}>
                            <h4 className="font-semibold mb-2">{section}</h4>
                            <ul className="space-y-1 text-gray-600">
                                {links.map((link) => (
                                    <li key={link}>{link}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center text-gray-500 text-xs">
                    © 2025 OnboardEasy • Privacy Policy • Terms of Service
                </div>
            </footer>
        </>
    )
}

export default Home