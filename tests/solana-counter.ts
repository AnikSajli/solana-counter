import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaCounter } from "../target/types/solana_counter";

describe("solana-counter", () => {
  let counter: anchor.web3.Keypair;
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  
  const program = anchor.workspace.SolanaCounter as Program<SolanaCounter>;

  it("Is initialized!", async () => {
    // Add your test here.
    counter = anchor.web3.Keypair.generate();
    const tx = await program.methods.initialize().accounts({
      counter: counter.publicKey,
      payer: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([
      counter
    ])
    .rpc();

    let counterData = await program.account.counter.fetch(counter.publicKey);
    console.log("Counter Data: ", counterData);
    console.log("Your transaction signature", tx);
  });

  it("Updates correctly", async() => {
    await program.methods.update(5).accounts({
      counter: counter.publicKey,
      payer: provider.wallet.publicKey,
    }).rpc();
    
    let counterData = await program.account.counter.fetch(counter.publicKey);
    console.log("Counter Data: ", counterData);
  })
});
