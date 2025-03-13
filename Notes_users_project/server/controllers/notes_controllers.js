const Note = require("../models/Note");
const User = require("../models/User");

const get_all_notes = async (req, res) => {
  try {
    const notes = await Note.find({}).lean();

    if (!notes.length)
      return res
        .status(404)
        .json({ success: false, message: "=> No notes found" });

    const notes_with_user = await Promise.all(
      notes.map(async (note) => {
        const user = await User.findById(note.user).lean();
        return { ...note, username: user.username };
      })
    );

    res.status(200).json({ success: true, notes: notes_with_user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const get_note = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();

  if (!note)
    return res
      .status(404)
      .json({ success: false, message: "=> Note not found" });

  const user_note = await User.findById(note.user).lean();

  const note_with_user = {
    ...note,
    username: user_note.username,
  };

  res.status(200).json({ success: true, note: note_with_user });

  try {
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create_note = async (req, res) => {
  try {
    const { user, title, text } = req.body;

    if (!user || !title || !text)
      return res
        .status(400)
        .json({ success: false, message: "=> Missing required fields" });

    const duplicate = await Note.findOne({ title }).collation({
      locale: "en",
      strength: 3,
    });

    if (duplicate)
      return res
        .status(409)
        .json({ success: false, message: "=> Duplicate note" });

    const note = await Note.create({
      user,
      title,
      text,
    });

    if (!note)
      return res
        .status(400)
        .json({ success: false, message: "=> invalid data" });

    return res.status(201).json({ success: true, note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update_note = async (req, res) => {
  try {
    const { id, title, user, text, completed } = req.body;

    if (!id || !title || !user || !text || typeof completed !== "boolean")
      return res
        .status(400)
        .json({ success: false, message: "=> Missing required fields" });

    const note = await Note.findById(id);

    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "=> Note not found" });

    const duplicate = await Note.findOne({ title }).collation({
      locale: "en",
      strength: 3,
    });

    if (duplicate && duplicate?._id.toString() !== id.toString())
      return res
        .status(409)
        .json({ success: false, message: "=> Duplicate note" });

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updated_note = await note.save();

    res.status(200).json({ success: true, note: updated_note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const delete_note = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "=> Missing required fields" });

    const note = await Note.findById(id);

    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "=> Note not found" });

    await note.deleteOne();

    res
      .status(200)
      .json({ success: true, message: `=> Note ${note.title} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  get_all_notes,
  get_note,
  create_note,
  update_note,
  delete_note,
};
