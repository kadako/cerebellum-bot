require('dotenv').config();
// configuration file

module.exports = {
  WSS_URL: process.env.RPC_URL,
  EXPECTED_PONG_BACK: 60000,
  KEEP_ALIVE_CHECK_INTERVAL: 120000,
  MAX_RECONNECT_ATTEMPTS: 5,
  RECONNECT_INTERVAL_BASE: 1000,
  SIMULATE_DISCONNECT_INTERVAL: 30000,
  simulateDisconnect: false
};
