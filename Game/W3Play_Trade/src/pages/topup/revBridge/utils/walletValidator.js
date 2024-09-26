const NETWORK_VALIDATORS = {
  bitcoin: validateBitcoinAddress,
  ethereum: validateEthereumAddress,
  polygon: validatePolygonAddress,
  dogechain: validateDogechainAddress,
  tron: validateTronAddress,
};

async function validateWalletAddress(address, network) {
  if (!address) {
    throw new Error("Address cannot be empty");
  }

  const validator = NETWORK_VALIDATORS[network.toLowerCase()];
  if (!validator) {
    throw new Error("Unsupported network");
  }

  return await validator(address);
}

function validateBitcoinAddress(address) {
  // Regex to check valid Bitcoin Address
  let regex = new RegExp(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,90}$/);

  // if address is empty or null return false
  if (address == null || address.length === 0) {
    return false;
  }

  // Return true if the address matched the regex
  return regex.test(address);
}

function validateEthereumAddress(address) {
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) return false;
  return true; // Since Ethereum addresses are hexadecimal and checksum is not validated here
}

function validatePolygonAddress(address) {
  return validateEthereumAddress(address);
}

function validateDogechainAddress(address) {
  return validateEthereumAddress(address);
}

async function validateTronAddress(address) {
  const isValid = /^T[0-9a-zA-Z]{33}$/.test(address);
  return isValid;
}

export {
  validateWalletAddress,
  validateBitcoinAddress,
  validateEthereumAddress,
  validatePolygonAddress,
  validateDogechainAddress,
  validateTronAddress,
};
