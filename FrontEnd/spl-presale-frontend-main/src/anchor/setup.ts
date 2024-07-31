import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { Buffer } from "buffer";
import { IDL, PresaleMultiple } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { parseUnits } from "ethers";

export const backendUrl = "https://localhost:7020"

export const network = "https://api.devnet.solana.com"
export const endDate = 1721001600;
export const startDate = 1719273600;
export const programId = new PublicKey("4HBYycKhytiviTGmCJX5dMKZuGBVJWakc9AyKH8PsvDd");
export const tokenMintKey = new PublicKey("KC3DVPP9gNe9pc8dohAehnrj392cPpjdKzF5iAro3bT");

export const tokenPerSol = BigInt("1600000");
export const jalaDecimal = 9;
export const minBuySolAmount = parseUnits("0.1", 9)

export const connection = new Connection(network, "confirmed");

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<PresaleMultiple>(IDL, programId, {
  connection,
});

// Derive a PDA for the counter account, using "counter" as the seed.
// We'll use this to update the counter on-chain.
export const [tokenVaultPda] = PublicKey.findProgramAddressSync(
  [Buffer.from("token-vault")],
  program.programId
);
export const [solVaultPda] = PublicKey.findProgramAddressSync(
  [Buffer.from("sol-vault")],
  program.programId
);
export const [globalAccountPda] = PublicKey.findProgramAddressSync(
  [Buffer.from("global-account")],
  program.programId
);

export const getUserAccountPda = (user: PublicKey) => {
  const [userAccountPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user-account"), user.toBuffer()],
    program.programId
  );
  return userAccountPda;
}
export const getUserAta = (user: PublicKey) => {
  const [address] = PublicKey.findProgramAddressSync(
    [user.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintKey.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  return address;
}



// Define a TypeScript type for the Counter data structure based on the IDL.
// This ensures type safety when interacting with the "counter" account, facilitating development and maintenance.
export type GlobalData = IdlAccounts<PresaleMultiple>["globalAccount"];
export type UserData = IdlAccounts<PresaleMultiple>["userAccount"];
