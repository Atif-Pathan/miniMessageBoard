const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getMessageById(id) {
  // Basic check for invalid input
  if (!id) {
    console.warn("Search query was empty or invalid.");
    return []; // Return an empty array for invalid input
  }

  try {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [id])
    return rows[0];
  } catch (error) {
    console.error("Error executing search query:", err.stack);
    return [];
  }
}

async function insertMessage(text, user) {
  await pool.query("INSERT INTO messages (message_text, username) VALUES ($1, $2)", [text, user]);
}

module.exports = {
  getAllMessages,
  getMessageById,
  insertMessage
};