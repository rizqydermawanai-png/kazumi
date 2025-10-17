import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { Buffer } from 'buffer';
import http from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH"]
    }
});
const port = 3001;
const dbPath = path.join(__dirname, 'db.json');
const uploadDir = path.join(__dirname, 'public', 'uploads');

// Ensure upload directory exists
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// --- API Routes ---
const apiRouter = express.Router();

// This should be in an environment variable, e.g., process.env.RAJAONGKIR_API_KEY
const EXPEDITION_API_KEY = 'YOUR_API_KEY_NOW_SAFE_ON_BACKEND';
const ORIGIN_CITY_ID = '23'; // Bandung

apiRouter.get('/data', async (req, res) => {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading database file:', error);
        res.status(500).json({ error: 'Could not read data from the server.' });
    }
});

apiRouter.patch('/data', async (req, res) => {
    try {
        const currentData = JSON.parse(await fs.readFile(dbPath, 'utf-8'));
        const updatedData = { ...currentData, ...req.body };
        await fs.writeFile(dbPath, JSON.stringify(updatedData, null, 2), 'utf-8');
        
        // Broadcast the update to all connected clients
        io.emit('data_updated', req.body);
        
        res.json({ success: true, message: 'Data updated and broadcasted.' });
    } catch (error) {
        console.error('Error writing partial data to database file:', error);
        res.status(500).json({ error: 'Could not save data to the server.' });
    }
});


apiRouter.post('/upload', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image || !image.startsWith('data:image')) {
            return res.status(400).json({ error: 'Invalid image data' });
        }

        const matches = image.match(/^data:(image\/(\w+));base64,(.+)$/);
        if (!matches || matches.length !== 4) {
            return res.status(400).json({ error: 'Invalid image format' });
        }
        
        const extension = matches[2];
        const base64Data = matches[3];
        
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
        const filePath = path.join(uploadDir, filename);

        await fs.writeFile(filePath, buffer);

        const url = `/uploads/${filename}`;
        res.status(201).json({ url });

    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Server error during image upload.' });
    }
});

apiRouter.post('/shipping-cost', async (req, res) => {
    const { destination, weightInGrams } = req.body;
    if (!destination || !destination.city || !weightInGrams) {
        return res.status(400).json({ error: 'Missing destination city or weight' });
    }
    
    const randomBaseCost = 9000 + Math.random() * 25000;
    const simulatedResponse = [
        { code: 'jne', service: 'REG', description: 'JNE Reguler', cost: Math.round(randomBaseCost / 1000) * 1000, etd: '2-3 HARI' },
        { code: 'jnt', service: 'EZ', description: 'J&T Regular', cost: Math.round((randomBaseCost * 0.95) / 1000) * 1000, etd: '1-3 HARI' },
        { code: 'pos', service: 'Paket Kilat Khusus', description: 'POS Kilat Khusus', cost: Math.round((randomBaseCost * 1.1) / 1000) * 1000, etd: '2-4 HARI' },
    ];
    
    res.json(simulatedResponse);
});

apiRouter.post('/track-package', async (req, res) => {
    const { trackingNumber, courier } = req.body;
    if (!trackingNumber || !courier) {
        return res.status(400).json({ error: 'Missing tracking number or courier' });
    }
    
    const now = new Date();
    const simulatedResponse = [
        { timestamp: new Date(now.setDate(now.getDate() - 2)).toISOString(), status: 'Paket telah di-pickup oleh kurir', location: 'Bandung' },
        { timestamp: new Date(now.setDate(now.getDate() + 1)).toISOString(), status: 'Paket sedang diproses di gudang sortir', location: 'Bandung' },
        { timestamp: new Date(now.setDate(now.getDate() + 1)).toISOString(), status: 'Paket dalam perjalanan menuju kota tujuan', location: 'Jakarta' },
        { timestamp: new Date().toISOString(), status: 'Paket sedang diantar oleh kurir ke alamat Anda', location: 'Jakarta' },
    ].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    res.json(simulatedResponse);
});


app.use('/api', apiRouter);

app.use('/uploads', express.static(uploadDir));

// Serve static files from the 'dist' directory
const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));

// SPA Fallback for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
});

server.listen(port, () => {
    console.log(`Kazumi server running at http://localhost:${port}`);
});
