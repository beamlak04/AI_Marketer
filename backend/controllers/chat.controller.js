import admin from "../lib/firebaseAdmin.js";
import { gemini } from "../lib/vertex.js";

const db = admin.firestore();

export const sendMessage = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { message, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let convId = conversationId;

    // Create new chat conversation if none exists
    if (!convId) {
      const newConv = await db
        .collection("users")
        .doc(uid)
        .collection("conversations")
        .add({
          createdAt: new Date(),
        });

      convId = newConv.id;
    }

    // Fetch last 10 messages (context)
    const messagesSnap = await db
      .collection("users")
      .doc(uid)
      .collection("conversations")
      .doc(convId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .limit(10)
      .get();

    const chatHistory = [];
    messagesSnap.forEach((doc) => chatHistory.push(doc.data()));

    const formattedHistory = chatHistory
      .map((m) => `${m.sender}: ${m.text}`)
      .join("\n");

    const prompt = `
You are a smart and friendly AI Marketing Assistant.
Your job is to help users with:
- marketing strategy
- product promotion
- campaign ideas
- caption writing
- ads
- business consulting
- content ideas
- ecommerce advice

Conversation history:
${formattedHistory}

User: ${message}

Respond like a real marketing expert.
`;

    const result = await gemini.generateContent(prompt);
    const replyText = result.response.text();

    // Save user message
    await db
      .collection("users")
      .doc(uid)
      .collection("conversations")
      .doc(convId)
      .collection("messages")
      .add({
        sender: "user",
        text: message,
        timestamp: new Date(),
      });

    // Save AI reply
    await db
      .collection("users")
      .doc(uid)
      .collection("conversations")
      .doc(convId)
      .collection("messages")
      .add({
        sender: "assistant",
        text: replyText,
        timestamp: new Date(),
      });

    return res.json({
      conversationId: convId,
      reply: replyText,
    });

  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Failed to process chat message" });
  }
};
