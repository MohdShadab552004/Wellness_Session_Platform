import colors from "../color";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SessionEditor = () => {
    const [inactiveTimer, setInactiveTimer] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [session, setSession] = useState({
        title: '',
        tags: '',
        json_file_url: ''
    });

    const {id} = useParams();


    useEffect(() => {
        if(id){
            setSessionId(id);
        }
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSession((prev) => ({ ...prev, [name]: value }));

        if (inactiveTimer) clearTimeout(inactiveTimer);
        setInactiveTimer(setTimeout(handleSaveDraft, 5000));
    };

    const handleSaveDraft = async () => {
        const token = localStorage.getItem('token');
        console.log(token);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sessions/my-sessions/save-draft`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...session,
                sessionId
            })
        })
        const result = await response.json();
        if(result._id && !sessionId){
            setSessionId(result._id);
        }
        console.log("Auto-saving draft:", session);
    };

    const handlePublish = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sessions/my-sessions/publish`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...session,
                sessionId
            })
        })
        
        const result = await response.json();
        setSession({
            title: '',
            tags: '',
            json_file_url: ''
        })
        if (inactiveTimer) clearTimeout(inactiveTimer);

        console.log("Publishing session:", session);
    };

    useEffect(() => {
        return () => {
            if (inactiveTimer) clearTimeout(inactiveTimer);
        };
    }, [inactiveTimer]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                Create Session
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block mb-1" style={{ color: colors.text }}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={session.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded"
                        style={{ backgroundColor: colors.secondary, color: colors.text }}
                        placeholder="Session title"
                    />
                </div>

                <div>
                    <label className="block mb-1" style={{ color: colors.text }}>Tags</label>
                    <input
                        type="text"
                        name="tags"
                        value={session.tags}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded"
                        style={{ backgroundColor: colors.secondary, color: colors.text }}
                        placeholder="e.g. focus, calm"
                    />
                </div>

                <div>
                    <label className="block mb-1" style={{ color: colors.text }}>JSON URL</label>
                    <input
                        type="url"
                        name="json_file_url"
                        value={session.json_file_url}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded"
                        style={{ backgroundColor: colors.secondary, color: colors.text }}
                        placeholder="https://example.com/session.json"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={handlePublish}
                    className="px-4 py-2 rounded shadow"
                    style={{ backgroundColor: colors.accent, color: colors.text }}
                >
                    Publish
                </button>
            </div>
        </div>
    );
};

export default SessionEditor;
