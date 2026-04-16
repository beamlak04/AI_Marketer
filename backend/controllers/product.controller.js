import admin from "../lib/firebaseAdmin.js";
import { gemini } from "../lib/vertex.js";

const db = admin.firestore();

export async function addProduct(req, res) {
  try {
    const uid = req.user.uid;
    const { name, description, price, stock, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: "name and category are required" });
    }

    const normalizedPrice = Number(price || 0);
    const normalizedStock = Number(stock || 0);

    const productRef = db
      .collection("users")
      .doc(uid)
      .collection("products")
      .doc();

    await productRef.set({
      name: String(name).trim(),
      description: String(description || "").trim(),
      price: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
      stock: Number.isFinite(normalizedStock) ? normalizedStock : 0,
      category: String(category).trim(),
      views: 0,
      aiScore: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ success: true, id: productRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function listProducts(req, res) {
  try {
    const uid = req.user.uid;

    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection("products")
      .get();

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function editProduct(req, res) {
  try {
    const uid = req.user.uid;
    const { id } = req.params;

    const patch = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (typeof patch.price !== "undefined") patch.price = Number(patch.price) || 0;
    if (typeof patch.stock !== "undefined") patch.stock = Number(patch.stock) || 0;

    await db
      .collection("users")
      .doc(uid)
      .collection("products")
      .doc(id)
      .update(patch);

    res.json({ success: true, message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const uid = req.user.uid;
    const { id } = req.params;

    await db
      .collection("users")
      .doc(uid)
      .collection("products")
      .doc(id)
      .delete();

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function generateDescription(req, res) {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: "name and category are required" });
    }

    const prompt = `
      Generate a professional marketing description for this Ethiopian business product:

      Name: ${name}
      Category: ${category}

      Write the description in a simple, clear, attractive style.
    `;

    const response = await gemini.generateContent(prompt);
    const output = response.response.candidates[0].content.parts[0].text;

    res.json({ description: output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}