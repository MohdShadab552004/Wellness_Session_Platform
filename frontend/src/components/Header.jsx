import { motion } from 'framer-motion';
import colors from '../color';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
    >
        <nav className="flex justify-between items-center p-4 rounded-lg shadow-md" style={{ backgroundColor: colors.primary }}>
            <motion.h1 whileHover={{ scale: 1.05 }} className="text-2xl font-bold" style={{ color: colors.text }}>
                Meditation Sessions
            </motion.h1>
            <div className="flex space-x-4">
                <Link to="/dashboard"
                    className="px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                    style={{ backgroundColor: colors.secondary, color: colors.text }}
                >Dashboard</Link>
                <Link to="/my-sessions"
                    className="px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                    style={{ backgroundColor: colors.secondary, color: colors.text }}
                >My Session</Link>
                <Link to="session-editor"
                    className="px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
                    style={{ backgroundColor: colors.accent, color: colors.text }}
                >
                    + New Session
                </Link>
            </div>
        </nav>
    </motion.header>
    
);
}

export default Header;
