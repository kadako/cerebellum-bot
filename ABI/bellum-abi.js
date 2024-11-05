// ABI.js
module.exports = [
  {
      "anonymous": false,
      "inputs": [
          { "indexed": true, "internalType": "address", "name": "token", "type": "address" },
          { "indexed": true, "internalType": "address", "name": "creator", "type": "address" },
          { "indexed": false, "internalType": "bool", "name": "isPowder", "type": "bool" },
          { "indexed": false, "internalType": "uint256", "name": "curveIndex", "type": "uint256" }
      ],
      "name": "TokenCreated",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "POWDER",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "ROUTER",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "name": "allTokens",
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "allTokensLength",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          { "internalType": "address", "name": "token0", "type": "address" },
          { "internalType": "uint8", "name": "minBin", "type": "uint8" }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [{ "internalType": "uint256", "name": "newFee_", "type": "uint256" }],
      "name": "changeFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [{ "internalType": "address", "name": "feeReceiver_", "type": "address" }],
      "name": "changeFeeReceiver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          { "internalType": "uint8", "name": "index", "type": "uint8" },
          { "internalType": "uint256[]", "name": "lists", "type": "uint256[]" }
      ],
      "name": "createCurve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          { "internalType": "string", "name": "name_", "type": "string" },
          { "internalType": "string", "name": "symbol_", "type": "string" },
          { "internalType": "uint112", "name": "totalSupply_", "type": "uint112" },
          { "internalType": "uint8", "name": "curveIndex_", "type": "uint8" }
      ],
      "name": "createToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          { "internalType": "string", "name": "name_", "type": "string" },
          { "internalType": "string", "name": "symbol_", "type": "string" },
          { "internalType": "uint112", "name": "totalSupply_", "type": "uint112" },
          { "internalType": "uint8", "name": "curveIndex_", "type": "uint8" }
      ],
      "name": "createTokenWithInitialBuy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  }
];
