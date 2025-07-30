import { motion } from 'framer-motion';
import colors from '../color';

const NavButton = ({ onClick, text }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
    style={{ backgroundColor: colors.secondary, color: colors.text }}
  >
    {text}
  </motion.button>
);

export default NavButton;
