import { motion, AnimatePresence } from 'framer-motion';
import colors from '../color';
import { Link } from 'react-router-dom';

const SessionCard = ({ session, showEdit = false }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
          {session.title}
        </h3>
        
        {session.tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {session.tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 rounded-full text-xs"
                style={{ backgroundColor: colors.accent, color: colors.text }}
              >
                {tag.trim()}
              </motion.span>
            ))}
          </div>
        )}
        
        {session.json_file_url && (
          <p className="text-sm mb-4 truncate" style={{ color: colors.text }}>
            JSON: <span className="opacity-80">{session.json_file_url}</span>
          </p>
        )}
        
        {showEdit && (
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: colors.text }}>
              Status: <span className="font-semibold">{session.status}</span>
            </span>
            <Link
            to={`/session-editor/${session._id}`}
            state={session}
              className="px-3 py-1 rounded text-sm hover:bg-opacity-70 transition-colors"
              style={{ backgroundColor: colors.primary, color: colors.text }}
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SessionCard;