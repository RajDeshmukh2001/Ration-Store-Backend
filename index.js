const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const rationRouter = require('./routes/ration');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/ration', rationRouter);
app.use('/api/order', orderRouter)

const dbConn = async () => {
    try {
        await dbConnection(process.env.CONNECTION_URI);
        app.listen(PORT, () => {
            console.log(`Server running at port : http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

dbConn();