import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import colors from "../color";
import { CircleLoader } from "react-spinners";

const SessionEditor = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [inactiveTimer, setInactiveTimer] = useState(null);
  const [sessionId, setSessionId] = useState(id);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [session, setSession] = useState({
    title: state?.title || "",
    tags: state?.tags || "",
    json_file_url: state?.json_file_url || "",
  });

  // Handles changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedSession = { ...session, [name]: value };
    setSession(updatedSession);

    if (inactiveTimer) clearTimeout(inactiveTimer);
    const timer = setTimeout(() => {
      handleSaveDraft(updatedSession); // Pass updated session data to save
    }, 5000); // Autosave after 5 seconds of inactivity
    setInactiveTimer(timer);
  };

  // Save draft to the server
  const handleSaveDraft = async (data = session) => {
    console.log("Saving draft...");
    setIsSaving(true);

    try {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);
      console.log({
            ...data,
            sessionId, 
          })
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sessions/my-sessions/save-draft`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            sessionId, 
          }),
        }
      );

      const result = await res.json();
      console.log(result);

      if (result._id && !sessionId) {
        setSessionId(result._id); // Set the session ID if it was created
      }

      toast.success("Draft saved!");
    } catch (err) {
      toast.error("Failed to save draft.");
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Publish the session
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sessions/my-sessions/publish`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...session,
            sessionId, // Include session ID for publishing
          }),
        }
      );

      await res.json();

      setSession({ title: "", tags: "", json_file_url: "" }); // Reset session fields
      toast.success("Session published!");
    } catch (err) {
      toast.error("Failed to publish session.");
    } finally {
      setIsPublishing(false);
      if (inactiveTimer) clearTimeout(inactiveTimer);
    }
  };

  // Clean up timer on component unmount or inactive timer change
  useEffect(() => {
    return () => {
      if (inactiveTimer) clearTimeout(inactiveTimer);
    };
  }, [inactiveTimer]);

  return (
    <div className="space-y-6">
      <Toaster />
      <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
        Create Session
      </h2>

      <div className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block mb-1" style={{ color: colors.text }}>
            Title
          </label>
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

        {/* Tags Input */}
        <div>
          <label className="block mb-1" style={{ color: colors.text }}>
            Tags
          </label>
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

        {/* JSON URL Input */}
        <div>
          <label className="block mb-1" style={{ color: colors.text }}>
            JSON URL
          </label>
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

      <div className="pt-4 flex gap-3">
        {/* Publish Button */}
        <button
          onClick={handlePublish}
          className="px-4 py-2 rounded shadow"
          style={{ backgroundColor: colors.accent, color: colors.text }}
        >
          {isPublishing ? <CircleLoader /> : "Publish"}
        </button>

        {/* Save Draft Button */}
        <button
          onClick={() => {handleSaveDraft()}}
          className="px-4 py-2 rounded shadow"
          style={{ backgroundColor: colors.accent, color: colors.text }}
        >
          {isSaving ? <CircleLoader /> : "Save Draft"}
        </button>
      </div>
    </div>
  );
};

export default SessionEditor;
