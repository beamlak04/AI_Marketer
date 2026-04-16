import admin from "../lib/firebaseAdmin.js";


const db = admin.firestore();

export async function createUserProfile(uid, profile) {

    try {
        const ref = await db.collection('users').doc(uid);

  await ref.set(
    {
      ...profile,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  const snap = await ref.get();
  return { id: snap.id, ...snap.data() };
    } catch (error) {
        console.error("error in createUserProfile")
    }
  
}

export async function getUserProfile(uid) {
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export async function updateUserProfile(uid, updates) {
  const ref = db.collection('users').doc(uid);
  await ref.set(
    {
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  const snap = await ref.get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
}