import admin from "../lib/firebaseAdmin.js";

import axios from "axios";
import { createUserProfile, getUserProfile, updateUserProfile } from "../models/user.model.js";

function toAuthError(err, fallback = "Authentication failed") {
  const raw = err?.response?.data?.error?.message || err?.code || err?.message || fallback;
  const value = String(raw);

  if (value.includes("EMAIL_EXISTS") || value.includes("email-already-exists")) {
    return { status: 409, message: "An account with this email already exists" };
  }
  if (value.includes("INVALID_PASSWORD") || value.includes("INVALID_LOGIN_CREDENTIALS")) {
    return { status: 401, message: "Invalid email or password" };
  }
  if (value.includes("EMAIL_NOT_FOUND") || value.includes("user-not-found")) {
    return { status: 404, message: "No account found for this email" };
  }
  if (value.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
    return { status: 429, message: "Too many login attempts. Please try again later." };
  }
  if (value.includes("invalid-phone-number")) {
    return { status: 400, message: "Phone must be in international format (e.g. +2519...)" };
  }

  if (value.toLowerCase().includes("default credentials") || value.includes("GOOGLE_APPLICATION_CREDENTIALS")) {
    return {
      status: 500,
      message: "Firebase Admin credentials are missing. Configure GOOGLE_APPLICATION_CREDENTIALS or run gcloud application-default login.",
    };
  }

  if (value.includes("app/invalid-credential")) {
    return {
      status: 500,
      message: "Firebase Admin credential is invalid. Re-authenticate ADC or provide a valid service-account JSON via GOOGLE_APPLICATION_CREDENTIALS.",
    };
  }

  return { status: err?.response?.status || 500, message: value || fallback };
}

export async function signup(req, res) {
  try {
    const { email, password, name, phone, businessType } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    if (!process.env.FIREBASE_APIKEY) {
      return res.status(500).json({ error: "Backend auth is not configured (missing FIREBASE_APIKEY)" });
    }

    const normalizedEmail = String(email).trim();
    const sanitizedPhone = typeof phone === "string" ? phone.trim() : "";

    const signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_APIKEY}`;
    const signupResponse = await axios.post(signupUrl, {
      email: normalizedEmail,
      password,
      returnSecureToken: true,
    });

    const uid = signupResponse?.data?.localId;
    let profile = null;

    if (uid) {
      try {
        profile = await createUserProfile(uid, {
          name: name ? String(name).trim() : "",
          phone: sanitizedPhone,
          businessType: businessType ? String(businessType).trim() : "",
          email: normalizedEmail,
        });
      } catch {
        profile = {
          id: uid,
          name: name ? String(name).trim() : "",
          phone: sanitizedPhone,
          businessType: businessType ? String(businessType).trim() : "",
          email: normalizedEmail,
        };
      }
    }

    res.status(201).json({
      uid,
      email: signupResponse?.data?.email || normalizedEmail,
      idToken: signupResponse?.data?.idToken,
      refreshToken: signupResponse?.data?.refreshToken,
      profile,
    });
  } catch (err) {
    const mapped = toAuthError(err, "Signup failed");
    res.status(mapped.status).json({ error: mapped.message });
  }
}

// LOGIN (uses Firebase Identity Toolkit REST API)
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (!process.env.FIREBASE_APIKEY) {
      return res.status(500).json({ error: "Backend auth is not configured (missing FIREBASE_APIKEY)" });
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_APIKEY}`;

    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });

    res.json(response.data);
  } catch (err) {
    const mapped = toAuthError(err, "Login failed");
    res.status(mapped.status).json({ error: mapped.message });
  }
}

// PROTECTED ROUTE (req.user filled by middleware)
export async function me(req, res) {
  try {
    const uid = req.user.uid;
    let profile = null;

    try {
      profile = await getUserProfile(uid);
    } catch {
      profile = null;
    }

    if (!profile) {
      profile = {
        id: uid,
        name: req.user.name || "",
        email: req.user.email || "",
      };
    }

    res.json({ uid, email: req.user.email, profile });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

export async function updateProfile(req, res) {
  try {
    const uid = req.user.uid;
    const { name, phone, businessType, languagePreference } = req.body || {};

    const payload = {
      ...(typeof name === "string" ? { name: name.trim() } : {}),
      ...(typeof phone === "string" ? { phone: phone.trim() } : {}),
      ...(typeof businessType === "string" ? { businessType: businessType.trim() } : {}),
      ...(typeof languagePreference === "string"
        ? { languagePreference: languagePreference.trim() }
        : {}),
    };

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ error: "No valid profile fields provided" });
    }

    const profile = await updateUserProfile(uid, payload);
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to update profile" });
  }
}