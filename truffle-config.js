const HDWalletProvider = require('@truffle/hdwallet-provider');

const dotenv = require("dotenv")
dotenv.config()

const MNEMONIC = process.env.MNEMONIC;
const BSCKEY = process.env.BSCKEY

module.exports = {
    plugins: ["truffle-plugin-verify", "truffle-contract-size", "truffle-flatten", "truffle-plugin-stdjsonin"],
    verify: {
        preamble: "Author: Lima.\nVersion: 1.0.0 \nProject name: Zapster \nProject description: Zapster is a non-custodial peer-to-peer lending protocol on Binance that enables users to borrow and lend assests without caring about the assests' ownership."
    },
    api_keys: {
        bscscan: BSCKEY,
        bscscanTestnet: BSCKEY
    },
    networks: {
        testnet: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://rpc.ankr.com/bsc_testnet_chapel/a458861634d1d73312f23913faf53dae99534c4edd91ff99984bceeab8c7f3fb'),
            network_id: 97,
            confirmations: 2,
            timeoutBlocks: 9999999,
            skipDryRun: true,
            networkCheckTimeout: 999999999
        },

        mainnet: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://bsc-rpc.publicnode.com'),
            network_id: 56,
            confirmations: 2,
            timeoutBlocks: 9999999,
            skipDryRun: true,
            networkCheckTimeout: 999999999
        },

        testnet_test: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://rpc.ankr.com/bsc_testnet_chapel/a458861634d1d73312f23913faf53dae99534c4edd91ff99984bceeab8c7f3fb'),
            network_id: 97,
            confirmations: 2,
            timeoutBlocks: 9999999,
            skipDryRun: true,
            networkCheckTimeout: 999999999
        },

        mainnet_test: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://bsc-rpc.publicnode.com'),
            network_id: 56,
            confirmations: 2,
            timeoutBlocks: 9999999,
            skipDryRun: true,
            networkCheckTimeout: 999999999
        }
    },

    // Set default mocha options here, use special reporters, etc.
    mocha: {
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.8.17", // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            settings: { // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 1000
                },
                viaIR: true
                //  evmVersion: "byzantium"
            }
        }
    }
};