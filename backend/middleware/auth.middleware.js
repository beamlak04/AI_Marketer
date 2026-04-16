import admin from "../lib/firebaseAdmin.js";
import axios from "axios";
// middleware/authMiddleware.js

export default async function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer '))
    return res.status(401).json({ error: 'Missing token' });

  const token = header.split('Bearer ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
    };
    next();
  } catch (err) {
    try {
      if (!process.env.FIREBASE_APIKEY) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const lookupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_APIKEY}`;
      const response = await axios.post(lookupUrl, { idToken: token });
      const user = response?.data?.users?.[0];

      if (!user?.localId) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = {
        uid: user.localId,
        email: user.email,
        name: user.displayName || '',
      };

      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
}
