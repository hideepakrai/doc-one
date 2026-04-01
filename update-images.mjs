import dbConnect from "./lib/dbConnect.js";
import Doctor from "./models/Doctor.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function updateImages() {
  try {
    await dbConnect();
    console.log("Connected to DB...");
    
    const brokenUrl = "https://images.unsplash.com/photo-1594824436998-ddf1f7d1a29b?auto=format\u0026fit=crop\u0026w=600\u0026q=80";
    const workingUrl = "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format\u0026fit=crop\u0026w=600\u0026q=80";
    
    const result = await Doctor.updateMany(
      { image: brokenUrl },
      { $set: { image: workingUrl } }
    );
    
    console.log(`Updated ${result.modifiedCount} doctors with working image URLs.`);
    process.exit(0);
  } catch (error) {
    console.error("Update error:", error);
    process.exit(1);
  }
}

updateImages();
