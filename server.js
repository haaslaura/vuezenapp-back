const express = require('express')
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4001
const API_URL = process.env.API_URL || 'https://api.vuezenapp.laura-haas.dev'

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/api/translate', async (req, res) => {
    const { text } = req.body
    
    if (!text) {
        return res.status(400).json({ error: 'Texte manquant à traduire.' })
    }
    
    try {
        const response = await axios.post(
            'https://api-free.deepl.com/v2/translate',
            new URLSearchParams({
                auth_key: process.env.DEEPL_API_KEY,
                text,
                target_lang: 'FR',
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        )
        
        res.json({ translation: response.data.translations[0].text })
    } catch (error) {
        console.error('Erreur lors de la traduction DeepL :', error)
        res.status(500).json({ error: 'Erreur lors de la traduction.' })
    }
})

app.listen(PORT, () => {
    console.log(`✅ Serveur proxy DeepL lancé sur ${API_URL}:${PORT}`)
})