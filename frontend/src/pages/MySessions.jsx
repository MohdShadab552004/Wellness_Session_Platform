import colors from "../color";
import { useState } from "react";
import { motion } from "framer-motion";
import SessionCard from '../components/SessionCard';
import { useEffect } from "react";


const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {

    const token = localStorage.getItem('token');
    console.log(token);

    const fetchMySession = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sessions/my-sessions`,{
            method:'GET',
            headers:{
                'authorization' :  `Bearer ${token}`
            }
        });
        const mySession = await response.json();
        setSessions(mySession);
        console.log(mySession);
    }
    fetchMySession();
    },[])

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    if (filter === 'published') return session.status === 'published';
    if (filter === 'drafts') return session.status === 'draft';
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>My Sessions</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg ${filter === 'all' ? 'bg-opacity-100' : 'bg-opacity-50'}`}
            style={{ backgroundColor: colors.secondary, color: colors.text }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-3 py-1 rounded-lg ${filter === 'published' ? 'bg-opacity-100' : 'bg-opacity-50'}`}
            style={{ backgroundColor: colors.secondary, color: colors.text }}
          >
            Published
          </button>
          <button
            onClick={() => setFilter('drafts')}
            className={`px-3 py-1 rounded-lg ${filter === 'drafts' ? 'bg-opacity-100' : 'bg-opacity-50'}`}
            style={{ backgroundColor: colors.secondary, color: colors.text }}
          >
            Drafts
          </button>
        </div>
      </div>
      
      {filteredSessions.length === 0 ? (
        // <p className="text-center py-8" style={{ color: colors.text }}>
        //   {filter === 'published' 
        //     ? 'No published sessions yet' 
        //     : filter === 'drafts' 
        //       ? 'No drafts yet' 
        //       : 'No sessions created yet'}
        // </p>
        <p>no session</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
            <SessionCard 
              key={session._id} 
              session={session} 
              onEdit={() => navigate('session-editor', { session })}
              showEdit={true}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};


export default MySessions;