import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ------------------- MongoDB Connection -------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ------------------- Mongoose Schema ----------------------
const leadFieldSchema = new mongoose.Schema({
  name: String,
  values: [String],
});

const leadSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // prevent duplicate entries
  created_time: String,
  field_data: [leadFieldSchema],
});

const Lead = mongoose.model("Lead", leadSchema);

// ------------------- API Routes ---------------------------

// Fetch from Facebook and Save to DB
app.get("/api/getLeads", async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v23.0/${process.env.FORM_ID}/leads?access_token=${process.env.PAGE_ACCESS_TOKEN}`;

    const response = await axios.get(url);
    const leads = response.data.data || [];

    // Save leads into MongoDB
    for (const lead of leads) {
      await Lead.findOneAndUpdate(
        { id: lead.id }, // search by lead id
        lead,            // update with new data
        { upsert: true, new: true } // create if not exists
      );
    }

    res.json({ message: "Leads fetched & stored successfully", data: leads });
  } catch (error) {
    console.error("Error fetching leads:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch leads",
      details: error.response?.data || error.message,
    });
  }
});

// Get leads directly from MongoDB (for frontend)
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads from DB" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
