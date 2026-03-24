# 🌿 VueZenApp-back

Mini Express proxy server to enable the VueZen application (frontend) to access the Quote and the DeepL API without CORS blocking.

## 🚀 Objectif

The DeepL API cannot be called directly from the browser because of the CORS policy.
This server acts as a relay between [the VueZen application](https://github.com/haaslaura/vuezenapp) and DeepL.

## ⚙️ Prerequisites

- Node.js
- A free API key DeepL (https://developers.deepl.com/api-reference/translate)

## 📦 Installation

1. Clone this folder.

2. Install the dependencies :

`npm install`

3. Create an .env file at the root of the project :

```bash
DEEPL_API_KEY=your_api_key_here
PORT=your_port_number
```

4. Launch the server

`npm run server`

## 🔔 Update

### Updated on 24/03/2026

The DeepL API has been updated. The main recommended change is authentication via the Authorization header: DeepL-Auth-Key <api-key> + JSON body. The API also includes additional parameters and responses. We recommend consulting the documentation after cloning this repository. (https://developers.deepl.com/api-reference/translate).

### Updated on 06/05/2025

The server now makes the call to the citation API directly. The translated citation and the author's name are uploaded to the front-end at the same time.
