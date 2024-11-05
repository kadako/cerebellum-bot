// Importing ethers library from Ethers.js
require('dotenv').config();
const { ethers } = require('ethers');
const { sendToTelegram } = require('./telegram-bot/telegramService.js');

const config = require('./service-conf.js');
const contractABI = require('./ABI/bellum-abi.js');
const tokenABI = require('./ABI/token-abi.js')

const logger = console;
// Variable to track the number of reconnection attempts
let reconnectAttempts = 0;
//Bellum CA
const contractAddress = '0x4274f80635183e9be3c16e1313a16f929b61e00e';

// Function to start and manage the WebSocket connection
async function startConnection() {
    // Initializing WebSocket provider with the Ethereum node URL
    let provider = new ethers.WebSocketProvider(config.WSS_URL);

    // Variables for managing keep-alive mechanism
    let pingTimeout = null;
    let keepAliveInterval = null;

    // Function to schedule a reconnection attempt
    async function scheduleReconnection() {
        if (reconnectAttempts < config.MAX_RECONNECT_ATTEMPTS) {
            let delay = config.RECONNECT_INTERVAL_BASE * Math.pow(2, reconnectAttempts);
            setTimeout(startConnection, delay);
            reconnectAttempts++;
            logger.log(`Scheduled reconnection attempt ${reconnectAttempts} in ${delay} ms`);
        } else {
            logger.error('Maximum reconnection attempts reached. Aborting.');
        }
    }

    // Event listener for 'open' event on WebSocket connection
    provider.websocket.on('open', () => {
        reconnectAttempts = 0;
        keepAliveInterval = setInterval(() => {
            logger.debug('Checking if the connection is alive, sending a ping');
            provider.websocket.ping();

            pingTimeout = setTimeout(() => {
                logger.error('No pong received, terminating WebSocket connection');
                provider.websocket.terminate();
            }, config.EXPECTED_PONG_BACK);
        }, config.KEEP_ALIVE_CHECK_INTERVAL);

        // Schedule a simulated disconnect if the feature is enabled
        if (config.simulateDisconnect) {
            setTimeout(() => simulateBrokenConnection(provider), config.SIMULATE_DISCONNECT_INTERVAL);
        }

        // Listen for the TokenCreated event after the connection is opened
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        // Use an arrow function to preserve async behavior
        contract.on("TokenCreated", async (token, creator, isPowder, curveIndex) => {
            await getData(token, creator, isPowder, curveIndex, provider); // Pass provider here
        });
    });

    // Event listener for 'close' event on WebSocket connection
    provider.websocket.on('close', () => {
        logger.error('The websocket connection was closed');
        clearInterval(keepAliveInterval);
        clearTimeout(pingTimeout);
        scheduleReconnection();
    });

    // Event listener for 'pong' response to ping
    provider.websocket.on('pong', () => {
        logger.debug('Received pong, connection is alive');
        clearTimeout(pingTimeout);
    });

    // Event listener for errors on WebSocket connection
    provider.websocket.on('error', (error) => {
        logger.error('WebSocket error:', error);
        scheduleReconnection();
    });
}


async function getTokenName(tokenAddress, provider) {
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
  const tokenName = await tokenContract.name();
  return tokenName;
}

async function getBalance(address, provider) {
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance); // Convert from Wei to AVAX
}

async function getData(token, creator, isPowder, curveIndex, provider) {

      // Get the token name
      const tokenName = await getTokenName(token, provider); // Ensure provider is passed
      const balance = await getBalance(creator, provider); // Ensure provider is passed
      console.log("==================+=================");
      console.log("Token Name:", tokenName);
      console.log("Token Address:", token);
      console.log("Creator Address:", creator);
      console.log("Deployer Balance:", balance, "AVAX");
      console.log("Is Powder:", isPowder);
      console.log("Curve Index:", curveIndex.toString());
      console.log("==================+=================");

      // Create a JSON object to hold the data
      const dataToken = {
        tokenName: tokenName,
        tokenAddress: token,
        creatorAddress: creator,
        deployerBalance: balance.slice(0,4), // Format balance AVAX
        isPowder: isPowder,
        curveIndex: curveIndex.toString()
      };
          // Send data to Telegram service
      await sendToTelegram(dataToken);

      return dataToken;
}

// Initiate the connection
startConnection();
