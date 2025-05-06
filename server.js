const express = require('express')
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/api/translate', async (req, res) => {

    try {

        // Step 1: Retrieve a random quote
        const quoteRes = await axios.get('https://zenquotes.io/api/random');
        const originalQuote = quoteRes.data[0].q;

        // Step 2: Translate the quote into English at DeepL
        const deeplRes = await axios.post(
            'https://api-free.deepl.com/v2/translate',
            new URLSearchParams({
                auth_key: process.env.DEEPL_API_KEY,
                text: originalQuote,
                target_lang: 'FR',
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        )

        const translatedQuote = deeplRes.data.translations[0].text;     

        // Step 3: Return the translated quote and the author
        res.json({
            translatedQuote,
            author: quoteRes.data[0].a
        })       

    } catch (error) {
        console.error('Erreur lors de la récupération ou la traduction :', error.response?.data || error.message || error)
        res.status(500).json({ error: "Une erreur est survenue." });
    }
})

app.listen(PORT, () => {
    console.log(`✅ Serveur proxy DeepL lancé sur http://localhost:${PORT}`)
})