// useSessionActions.js
export const saveAsDraft = async (id, data) => {
  try {
    const res = await fetch(`/api/session/draft/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

export const publishSession = async (id, data) => {
  try {
    const res = await fetch(`/api/session/publish/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

export const autoSaveDraft = saveAsDraft;
