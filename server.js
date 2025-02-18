const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// API Route: Submit Referral
app.post("/referral", async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

    // Validate Input Fields
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if referral already exists
    const existingReferral = await prisma.referral.findFirst({
      where: {
        OR: [{ referrerEmail }, { refereeEmail }],
      },
    });

    if (existingReferral) {
      return res.status(409).json({ error: "Referral already exists!" });
    }

    // Save Referral to Database
    const newReferral = await prisma.referral.create({
      data: { referrerName, referrerEmail, refereeName, refereeEmail },
    });

    // Send Email Notification
    const mailOptions1 = {
      from: process.env.GMAIL_USER,
      to: refereeEmail,
      subject: "Refer Mail",
      text: `Hello ${refereeName},\n\nYou have been refered by ${referrerName}!\n\nWe appreciate your support.`,
    };
    const mailOptions2 = {
        from: process.env.GMAIL_USER,
        to: referrerEmail,
        subject: "Referral Confirmation",
        text: `Hello ${referrerName},\n\nYour referal has been sent to ${refereeName}!\n\nWe appreciate your support.`,
      };
    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2);

    res.status(201).json({ message: "Referral submitted successfully!", newReferral });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API Route: Get All Referrals
app.get("/referrals", async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.status(200).json(referrals);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
