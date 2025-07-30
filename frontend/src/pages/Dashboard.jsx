import { useState, useEffect } from "react";
import colors from "../color";
import { motion } from "framer-motion";
import SessionCard from "../components/SessionCard";

const Dashboard = ({ navigate }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sessions`);
            const allSession = await response.json();
            console.log(allSession);
            setSessions(allSession);
        } catch (error) {
            console.log(error)
        }
    }
    fetchSession();
  },[]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Published Sessions</h2>
      
      {sessions.length === 0 ? (
        <p className="text-center py-8" style={{ color: colors.text }}>No published sessions available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;