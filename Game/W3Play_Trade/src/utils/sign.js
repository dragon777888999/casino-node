import {ethers} from 'ethers';

export const doSign = async (signer, token, tokenName, tokenAddress, value, owner, spender, deadline, chainId) => {
    console.log('in do sign');

    const salt = ethers.solidityPacked(['uint256'], [chainId]);

    const domain = {
        name: tokenName,
        version: '1',
        chainId: chainId,
        verifyingContract: tokenAddress
    };

    console.log('in do sign domain',domain);
    console.log('in do sign token.address',token.address);

    const types = {
        Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
        ]
    };

    const data = {
        owner: owner,
        spender: spender,
        value: value,
        nonce: await token.nonces(owner),
        deadline: deadline
    };

    console.log('in do sign data',data);

    const sig = await signer.signTypedData(domain, types, data);

    const returnValue = ethers.Signature.from(sig);


    const sigVerification = ethers.verifyTypedData(domain,types,data,returnValue);

    console.log('sigVerification',sigVerification);

    return returnValue;
};

