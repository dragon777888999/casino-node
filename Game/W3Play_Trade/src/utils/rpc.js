import Web3 from 'web3';

export default class EthereumRpc {
    constructor(provider) {
        this.provider = provider;
    }

    async getChainId() {
        try {
            const web3 = new Web3(this.provider);

            // Get the connected Chain's ID
            const chainId = await web3.eth.getChainId();

            return chainId.toString();
        } catch (error) {
            return error.toString();
        }
    }

    async getAccounts() {
        try {
            const web3 = new Web3(this.provider);

            // Get user's Ethereum public address
            const address = (await web3.eth.getAccounts())[0];

            return address;
        } catch (error) {
            return error;
        }
    }

    async getBalance() {
        try {
            const web3 = new Web3(this.provider);

            // Get user's Ethereum public address
            const address = (await web3.eth.getAccounts())[0];

            // Get user's balance in ether
            const balance = web3.utils.fromWei(
                await web3.eth.getBalance(address), // Balance is in wei
                'ether', // Convert wei to ether
            );

            return balance;
        } catch (error) {
            return error.toString();
        }
    }

    async sendTransaction(to, etherAmount) {
        try {
            const web3 = new Web3(this.provider);

            // Get user's Ethereum public address
            const fromAddress = (await web3.eth.getAccounts())[0];

            // Convert ether to wei
            const amount = web3.utils.toWei(etherAmount.toString(), "ether");

            let transaction = {
                from: fromAddress,
                to: to,
                value: amount,
            };

            // Calculate gas transaction before sending
            const gasEstimation = await web3.eth.estimateGas(transaction);
            const gasPrice = await web3.eth.getGasPrice();

            // Set gas and gas price, with a bump to avoid underpricing
            transaction.gas = gasEstimation * 5;
            transaction.gasPrice = gasPrice * 5; // Use the current gas price with a multiplier, adjust as needed

            // Submit transaction to the blockchain and wait for it to be mined
            const receipt = await web3.eth.sendTransaction(transaction);

            return this.toStringJson(receipt);
        } catch (error) {
            console.log('error...', error)
            return error.toString();
        }
    }


    async signMessage() {
        try {
            const web3 = new Web3(this.provider);

            // Get user's Ethereum public address
            const fromAddress = (await web3.eth.getAccounts())[0];
            const originalMessage = 'YOUR_MESSAGE';

            // Sign the message
            const signedMessage = await web3.eth.personal.sign(
                originalMessage,
                fromAddress,
                'test password!', // configure your own password here.
            );

            return signedMessage;
        } catch (error) {
            return error.toString();
        }
    }

    async getPrivateKey() {
        try {
            const privateKey = await this.provider.request({
                method: 'eth_private_key',
            });

            return privateKey;
        } catch (error) {
            return error.toString();
        }
    }

    async getGeneralPrivateKey() {
        try {
            const privateKey = await this.provider.request({
                method: 'private_key',
            });

            return privateKey;
        } catch (error) {
            return error.toString();
        }
    }

    toStringJson(data) {
        // can't serialize a BigInt, so this hack
        return JSON.parse(JSON.stringify(data, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
    }
}