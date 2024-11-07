const express = require('express');
const mongoConnect = require('./config/mongo');
const app = express();
require('dotenv').config();

app.use(express.json());

// Require the bot module (make sure you handle any bot logic there)
require('./bot/bot');

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date(),
        message: 'Server is running smoothly!'
    });
});

const PORT = process.env.PORT || 3006;

async function startServer() {
    try {
        await mongoConnect();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process in case of a failure
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log("\nShutting down gracefully...");
    // You can implement additional cleanup logic here if needed
    process.exit(0);
});

// Start the server
startServer();