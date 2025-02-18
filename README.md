Refer & Earn - Backend 🚀
This is the backend for the Refer & Earn application, built with Express.js and integrated with a MySQL database using Prisma ORM. It is deployed on Render.

⚠️ IMPORTANT NOTICE
📢 The backend is set to a dummy environment, meaning emails will NOT be sent. However, referral data will still be saved in the database.

📌 Features
✅ REST API to submit and fetch referrals
✅ Prisma ORM for MySQL database integration
✅ Proper error handling and validation
✅ Email notifications using Nodemailer (Disabled in dummy mode)

🛠️ Tech Stack
Express.js (Backend framework)
Prisma ORM (Database management)
MySQL (Database)
Nodemailer (Email service)
Render (Deployment)
🚀 API Endpoints
1️⃣ Submit a Referral
Endpoint:

h

POST /referral
Request Body:

json

{
  "referrerName": "John Doe",
  "referrerEmail": "john@example.com",
  "refereeName": "Jane Doe",
  "refereeEmail": "jane@example.com"
}
Response:

json

{
  "message": "Referral submitted successfully!"
}
2️⃣ Get All Referrals
Endpoint:

http

GET /referrals
Response:

json
Copy
Edit
[
  {
    "id": 1,
    "referrerName": "John Doe",
    "referrerEmail": "john@example.com",
    "refereeName": "Jane Doe",
    "refereeEmail": "jane@example.com"
  }
]
🏗️ Setup Instructions
1️⃣ Clone the Repository
sh

git clone https://github.com/YOUR_GITHUB_USERNAME/refer-earn-backend.git
cd refer-earn-backend
2️⃣ Install Dependencies
sh

npm install
3️⃣ Configure Environment Variables
Create a .env file in the root folder and add:

sh

DATABASE_URL=YOUR_DATABASE_URL_HERE
GMAIL_USER=your_dummy_email@gmail.com
GMAIL_PASS=dummy_password
⚠️ Note: These email credentials are set to dummy values, so emails won't be sent.

4️⃣ Apply Database Migrations
sh

npx prisma migrate dev --name init
5️⃣ Start the Server
sh

npm start
Your backend will run at http://localhost:5000.

🚀 Deployment on Render
Push your code to GitHub.
Go to Render and create a new Web Service.
Select your repository and set the build command:
sh

npm install && npx prisma migrate deploy
Set the environment variables in Render:
sh

DATABASE_URL=YOUR_INTERNAL_DATABASE_URL
GMAIL_USER=your_dummy_email@gmail.com
GMAIL_PASS=dummy_password
Click Deploy and your backend is live! 🎉



🎯 Notes:
Emails are disabled in this dummy environment.
The frontend must be connected for full functionality.
✅ Done! 🚀 Your backend is now well-documented and ready for use! 🎉 Let me know if you need any modifications.
