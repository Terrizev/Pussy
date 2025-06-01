const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname));

const apis = [
    {
        endpoint: '/apis/news',
        realApi: 'https://newsapi.org/v2/top-headlines?apiKey=0f2c43ab11324578a7b1709651736382'
    },
    {
        endpoint: '/api/memes',
        realApi: 'https://api.imgflip.com/get_memes'
    },
    {
        endpoint: '/api/tiktok',
        realApi: 'https://delirius-apiofc.vercel.app/download/tiktok'
    },
    {
        endpoint: '/api/lyrics',
        realApi: (artist, title) => `https://api.lyrics.ovh/v1/${artist.trim()}/${title.trim()}`
    },
    {
        endpoint: '/api/gpt',
        realApi: 'https://chateverywhere.app/api/chat'
    },
    {
        endpoint: '/api/bible',
        realApi: (query) => `https://bible-api.com/${encodeURIComponent(query)}`
    },
    {
        endpoint: '/api/ytmp3',
        realApi: (url) => `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(url)}`
    },
    {
        endpoint: '/api/ytmp4',
        realApi: (url) => `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(url)}`
    },
    {
        endpoint: '/api/apk/dl',
        realApi: (query) => `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(query)}`
    },
    {
        endpoint: '/api/catbox',
        realApi: 'https://catbox.moe/user/api.php'
    },
    {
        endpoint: '/api/waifu',
        realApi: 'https://api.waifu.pics/sfw/waifu'
    },
    {
        endpoint: '/api/github/repos',
        realApi: (repo) => `https://api.github.com/repos/${repo}`
    },
    // GiftedTech APIs
    {
        endpoint: '/api/xvideosdl',
        realApi: (url) => `https://api.giftedtech.web.id/api/download/xvideosdl?apikey=gifted&url=${encodeURIComponent(url)}`
    },
    {
        endpoint: '/api/xnxxdl',
        realApi: (url) => `https://api.giftedtech.web.id/api/download/xnxxdl?apikey=gifted&url=${encodeURIComponent(url)}`
    },
    {
        endpoint: '/api/pastebin',
        realApi: (url) => `https://api.giftedtech.web.id/api/download/pastebin?apikey=gifted&url=${encodeURIComponent(url)}`
    }
];

apis.forEach((api) => {
    app.get(api.endpoint, async (req, res) => {
        try {
            let targetUrl;

            if (typeof api.realApi === 'function') {
                const { url, artist, title, query, repo } = req.query;
                if (url) targetUrl = api.realApi(url);
                else if (artist && title) targetUrl = api.realApi(artist, title);
                else if (query) targetUrl = api.realApi(query);
                else if (repo) targetUrl = api.realApi(repo);
                else return res.status(400).json({ message: 'Missing required parameters' });
            } else {
                targetUrl = api.realApi;
            }

            const response = await axios.get(targetUrl);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error: error.message });
        }
    });
});

app.get('/stats', async (req, res) => {
    try {
        res.json({ requests: 100, responses: 100 });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});