export const NOTION_ADDRESS = "0x587a04d8afAe1C2A9c09fa6CF2e99D08EfdC8601"


export const NOTION_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_not",
				"type": "string"
			}
		],
		"name": "NotEkle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "notId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "yazar",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "not",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "zamanDamgasi",
				"type": "uint256"
			}
		],
		"name": "NotEklendi",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "notlar",
		"outputs": [
			{
				"internalType": "address",
				"name": "yazar",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "not",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "zamanDamgasi",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toplamNotSayisi",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tumNotlariGetir",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "yazar",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "not",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "zamanDamgasi",
						"type": "uint256"
					}
				],
				"internalType": "struct NotDefteri.Not[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

