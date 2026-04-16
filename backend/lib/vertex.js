import { VertexAI } from '@google-cloud/vertexai';
import dotenv from "dotenv"
dotenv.config()
const vertex = new VertexAI({
  project: process.env.GCLOUD_PROJECT_ID,
  location: 'us-central1',
});

export const gemini = vertex.getGenerativeModel({
  model: 'gemini-1.5-flash',
});
