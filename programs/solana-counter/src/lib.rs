use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use std::str;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solana_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        Ok(())
    }

    pub fn update(ctx: Context<UpdateCtx>, data: u8) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + 1
    )]
    counter: Account<'info, Counter>,
    #[account(mut)]
    payer: Signer<'info>,
    system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct UpdateCtx<'info> {
    #[account(mut)]
    counter: Account<'info, Counter>,
    #[account(mut)]
    payer: Signer<'info>,
}

#[account]
pub struct Counter {
    pub count: u8
}
