import "dotenv/config";
import admin from "firebase-admin";
import process from "process";


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_PROJECT_BUCKET,
    });
    console.log("firebase admin initialized");
}

export default admin;