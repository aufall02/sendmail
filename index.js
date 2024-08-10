const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "cakracare.info@gmail.com",
        pass: "keko ndpg kgcm dllb", // Replace with the application-specific password
    }
});

app.get('/', async (req, res) => {
    try {
        console.log('GET request received');
        res.send('Hello, world!');
    } catch (error) {
        console.error('Error in GET request:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Email sending route
app.post('/send-email', async (req, res) => {
    console.log('POST request to /send-email received');
    const { to, subject, text } = req.body;

    try {
        await transporter.sendMail({
            from: 'cakracare.info@gmail.com', // Replace with your name and email
            to,
            subject,
            text,
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message || error);
        res.status(500).send(`Failed to send email: ${error.message || 'Unknown error'}`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
