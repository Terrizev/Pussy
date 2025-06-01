const apiGrid = document.querySelector('.api-grid');
const container = document.querySelector('.container');

// ✅ APIs that exist in the server code
const apis = [
    {
        endpoint: '/api/tiktok',
        name: 'TikTok Downloader',
        description: 'Download TikTok videos without watermark.'
    },
    {
        endpoint: '/api/ytmp3?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        name: 'YouTube MP3',
        description: 'Download YouTube videos as MP3 audio.'
    },
    {
        endpoint: '/api/ytmp4?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        name: 'YouTube MP4',
        description: 'Download YouTube videos as MP4 video.'
    },
    {
        endpoint: '/api/lyrics?artist=Coldplay&title=Yellow',
        name: 'Lyrics API',
        description: 'Get lyrics for a specific song.'
    },
    {
        endpoint: '/api/bible?query=John+3:16',
        name: 'Bible API',
        description: 'Get Bible verses by reference.'
    },
    {
        endpoint: '/api/gpt?message=Hello',
        name: 'GPT Chat',
        description: 'Send a message to ChatGPT API.'
    },
    {
        endpoint: '/api/memes',
        name: 'Memes API',
        description: 'Get trending memes.'
    },
    {
        endpoint: '/apis/news',
        name: 'News API',
        description: 'Get the latest headlines.'
    },
    {
        endpoint: '/api/apk/dl?query=whatsapp',
        name: 'APK Downloader',
        description: 'Search APK files by name.'
    },
    {
        endpoint: '/api/catbox',
        name: 'Catbox Upload',
        description: 'Upload files to catbox.moe.'
    },
    {
        endpoint: '/api/waifu',
        name: 'Waifu Generator',
        description: 'Get a random anime waifu image.'
    },
    {
        endpoint: '/api/github/repos?repo=openai/gpt-3',
        name: 'GitHub Repo Info',
        description: 'Fetch GitHub repository details.'
    },
    {
        endpoint: '/api/xvideosdl?url=https://www.xvideos.com/video-url',
        name: 'XVideos Downloader',
        description: 'Download videos from XVideos.'
    },
    {
        endpoint: '/api/xnxxdl?url=https://www.xnxx.com/video-url',
        name: 'XNXX Downloader',
        description: 'Download videos from XNXX.'
    },
    {
        endpoint: '/api/pastebin?url=https://pastebin.com/raw/example',
        name: 'Pastebin Scraper',
        description: 'Fetch raw content from Pastebin.'
    }
];

// Display stats
const statsDiv = document.createElement('div');
statsDiv.classList.add('stats-box');
statsDiv.style.border = '1px solid white';
statsDiv.style.padding = '10px';
statsDiv.textContent = 'Loading stats...';
container.appendChild(statsDiv);

setInterval(() => {
    fetch('/stats')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            statsDiv.textContent = `Requests: ${data.requests}, Responses: ${data.responses}`;
        })
        .catch((error) => {
            statsDiv.textContent = `Error: ${error.message}`;
        });
}, 1000);

apis.forEach((api) => {
    const apiCard = document.createElement('div');
    apiCard.classList.add('api-card');

    const apiStatus = document.createElement('div');
    apiStatus.classList.add('api-status');

    const apiName = document.createElement('h2');
    apiName.textContent = api.name;

    const apiDescription = document.createElement('p');
    apiDescription.textContent = api.description;

    const apiLink = document.createElement('p');
    apiLink.textContent = `API: ${window.location.origin}${api.endpoint}`;

    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-button');
    copyButton.textContent = 'Copy';
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(`${window.location.origin}${api.endpoint}`).then(() => {
            alert('API copied to clipboard!');
        });
    });

    const testButton = document.createElement('button');
    testButton.classList.add('test-button');
    testButton.textContent = 'Test API';
    testButton.addEventListener('click', () => {
        const responseDiv = document.createElement('div');
        apiCard.appendChild(responseDiv);
        fetch(api.endpoint)
            .then((response) => response.json())
            .then((data) => {
                responseDiv.textContent = JSON.stringify(data, null, 2);
            })
            .catch((error) => {
                responseDiv.textContent = `Error: ${error.message}`;
            });
    });

    apiCard.appendChild(apiStatus);
    apiCard.appendChild(apiName);
    apiCard.appendChild(apiDescription);
    apiCard.appendChild(apiLink);
    apiCard.appendChild(copyButton);
    apiCard.appendChild(testButton);

    apiGrid.appendChild(apiCard);

    // Check API status
    fetch(api.endpoint)
        .then((response) => {
            if (response.ok) {
                apiStatus.style.backgroundColor = 'green';
            } else {
                apiStatus.style.backgroundColor = '#964B00';
            }
        })
        .catch(() => {
            apiStatus.style.backgroundColor = '#964B00';
        });

    Object.assign(apiStatus.style, {
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '10px'
    });
});
