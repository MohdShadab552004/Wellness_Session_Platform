import Session from "../models/sessionModel.js";

// Public sessions
export const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch public sessions", details: err.message });
  }
};

// User's sessions
export const getMySessions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sessions = await Session.find({ user_id: userId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's sessions", details: err.message });
  }
};

// View single session
export const getSingleSession = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user.userId });
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch session", details: err.message });
  }
};

// Save or update draft
export const saveDraft = async (req, res) => {
  console.log("save")
  const { title, tags, json_file_url, sessionId } = req.body;
  const userId = req.user.userId;
  try {
    let session;

    // Prepare only defined fields for update
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (tags !== undefined) updateFields.tags = tags;
    if (json_file_url !== undefined) updateFields.json_file_url = json_file_url;

    updateFields.updated_at = new Date();
    if (sessionId) {
      // Update existing session
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id: userId },
        { $set: updateFields },
        { new: true }
      );
    } else {
      // Create new session
      session = new Session({
        user_id: userId,
        ...updateFields,
        status: "draft"
      });
      await session.save();
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to save draft", details: err.message });
  }
};



// Publish session
export const publishSession = async (req, res) => {
  const { title, tags, json_file_url, sessionId } = req.body;
  const userId = req.user.userId;

  if (!title || !json_file_url) {
    return res.status(400).json({ error: "Session ID, title and JSON file URL are required" });
  }

  try {

    let session 
    if(sessionId){
    session = await Session.findOneAndUpdate(
      { _id: sessionId, user_id: userId },
      { title, tags, json_file_url, status: "published", updated_at: new Date() },
      { new: true }
    );
  }else{
    session = new Session({
        user_id: userId,
        title,
        tags,
        json_file_url,
        status: "published",
        updated_at: new Date()
      })
    await session.save();
  }
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: "Failed to publish session", details: err.message });
  }
};
