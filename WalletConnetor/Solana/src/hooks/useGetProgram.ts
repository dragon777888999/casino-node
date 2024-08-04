import { Connection } from "@solana/web3.js";
import { programId } from "../anchor/setup";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useCallback } from "react";
import { IDL } from "../anchor/idl";

export const useGetProgram = (connection: Connection, anchorWallet: AnchorWallet) => {
    const getProvider = useCallback(
        () =>
            new AnchorProvider(
                connection,
                anchorWallet,
                AnchorProvider.defaultOptions(),
            ),
        [connection, anchorWallet],
    );

    const getProgram = () => {
        const provider = getProvider()
        return new Program(IDL, programId, provider);
    }

    return {getProgram}
}