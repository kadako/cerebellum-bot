const axios = require('axios');
require('dotenv').config();

// Replace with your actual Telegram bot token and chat ID
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const PHOTO_URL = 'https://i.imgur.com/PrD6e6P.jpeg';

async function sendToTelegram(data) {
    const message = 
`
*====== [Token Created] ======*
🔺 *Name:* ${data.tokenName}
📝 *CA:* ${data.tokenAddress}
🧑‍💻 *Dev:* ${data.creatorAddress}
⌛ *Wallet Age:* ${data.age} Ago
💰 *Balance:* ${data.deployerBalance} AVAX
- *Powder:* ${data.isPowder}
- *Curve:* ${data.curveIndex}
`;

    const keyboard = {
        inline_keyboard: [
            [
                {
                    text: "Open Bellum",
                    url: `https://bellum.exchange/token/${data.tokenAddress}`
                },
                {
                    text: "Deployer Wallet",
                    url: `https://snowscan.xyz/address/${data.creatorAddress}`
                }
            ]
        ]
    };
    
    // const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
    
    try {
        await axios.post(url, {
            chat_id: CHAT_ID,
            photo: PHOTO_URL,
            caption: message,
            parse_mode: 'Markdown',
            reply_markup: JSON.stringify(keyboard)
        });
        console.log("Message sent to Telegram!");
    } catch (error) {
        console.error("Error sending message to Telegram:", error);
    }
}

module.exports = { sendToTelegram };
