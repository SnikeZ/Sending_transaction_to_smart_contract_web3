const keys = require("./keys.json")
const ALCHEMY_API_KEY = keys.ALCHEMY_API_KEY;
const GOERLI_PRIVATE_KEY = keys.GOERLI_PRIVATE_KEY;
const Web3 = require("web3")
const IERC20 = require('./IERC20.json')
const contractAdress = "0xbe3dbc8881f15def1cca48d537a159a2da5d7e7a"
const to = "0xB3FbdBDc07D50812c955b70AF7D8a094b18319Cd"
const amount = 1000

const init = async () => {
    web3 = new Web3(`https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`);
    
    const signer = web3.eth.accounts.privateKeyToAccount(GOERLI_PRIVATE_KEY);

    const Token = new web3.eth.Contract(IERC20.abi, contractAdress)
    const transaction = Token.methods.transfer(to, amount)
    const encodedABI = transaction.encodeABI()
    const tx = {
        from: signer.address,
        to: contractAdress,
        gas: 200000,
        data: encodedABI
    };
    web3.eth.accounts.signTransaction(tx, GOERLI_PRIVATE_KEY).then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction).then(result =>{
            console.log(result.transactionHash)
        })
        
    })

}
init()