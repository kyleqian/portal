import * as anchor from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react/lib/cjs';
import { Connection, PublicKey } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata'
import Wallet from "./TempNodeWallet";
import { programs } from '@metaplex/js';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID } from './utils';
import { TokenAccountNotFoundError, TokenInvalidAccountOwnerError, TokenInvalidAccountSizeError } from './errors';

export const SEED_SOCIETY_PROGRAM = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_NETWORK === 'mainnet-beta'
    ? 'tuberzVVow3N7VTNHmwmoaJ88BM8bNVJNnhTiSYYpRC'
    : '8eazG95C19di5LGttyz79qcKMbVy2AktvrPk69kgth51'
);

export const TUBER_STAGES = ['Seed', 'Sprout', 'Taproot', 'Dormant', 'Adult'];

export interface GardenerState {
  wateredInTimeframe: number,
  waterTimeOutUnix: number
}

export interface GardenerLeaderboardEntry {
  wateredOthers: number,
  name: string
}

export interface TuberState {
  name: string,
  pda: PublicKey,
  level: number,
  watered: number,
  mint: PublicKey,
  waterTimeOutUnix: number,
  isDead: boolean
}

export interface TuberMetadata {
  name: string,
  photoUri: string,
  metadataAddress: PublicKey,
  family: string
}

export const getLastWateredFromWaterTimeoutDateString = (waterTimeout: number): string => {
  const d = new Date((waterTimeout - 60 * 60 * 23) * 1000);
  return d.toLocaleString(undefined, { timeZoneName: 'short' });
}

export const getTimeNowUnixSeconds = (): number => {
  return Math.floor(Date.now() / 1000);
}

export const getMetadataAddress = async (
  mintAddress: PublicKey
): Promise<PublicKey> => {
  return programs.metadata.MetadataProgram.findProgramAddress([
    Buffer.from(programs.metadata.MetadataProgram.PREFIX),
    programs.metadata.MetadataProgram.PUBKEY.toBuffer(),
    mintAddress.toBuffer()]);
}

export const getPlantPda = async (
  paddedName: string,
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress([Buffer.from('plant'), Buffer.from(paddedName)], SEED_SOCIETY_PROGRAM);
}

export const getGardenerPda = async (
  authority: PublicKey,
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress([Buffer.from('gardener'), authority.toBuffer()], SEED_SOCIETY_PROGRAM);
}

export const getGardenerState = async (
  anchorWallet: AnchorWallet,
  connection: anchor.web3.Connection,
): Promise<GardenerState> => {
  const provider = new anchor.Provider(connection, anchorWallet as Wallet, {
    preflightCommitment: 'processed',
    commitment: 'processed'
  });

  const [pda, _] = await getGardenerPda(anchorWallet.publicKey);

  // TODO: Keep locally?
  const idl = await anchor.Program.fetchIdl(SEED_SOCIETY_PROGRAM, provider);
  const program = new anchor.Program(idl!, SEED_SOCIETY_PROGRAM, provider);
  const state = await program.account.gardener.fetch(pda);

  return {
    wateredInTimeframe: state.wateredInTimeframe,
    waterTimeOutUnix: state.waterTimeout.toNumber()
  };
}

export const getTuberState = async (
  anchorWallet: AnchorWallet,
  connection: anchor.web3.Connection,
  plantName: string,
): Promise<TuberState | null> => {
  const provider = new anchor.Provider(connection, anchorWallet as Wallet, {
    preflightCommitment: 'processed',
    commitment: 'processed'
  });

  const [pda, _] = await getPlantPda(plantName);

  // TODO: Keep locally?
  const idl = await anchor.Program.fetchIdl(SEED_SOCIETY_PROGRAM, provider);
  const program = new anchor.Program(idl!, SEED_SOCIETY_PROGRAM, provider);

  let state;
  try {
    state = await program.account.plant.fetch(pda);
  } catch {
    return null;
  }

  const dead = state.level < 4 && state.waterTimeout.toNumber() - (60 * 60 * 23) + (60 * 60 * 24 * 8) < getTimeNowUnixSeconds();

  return {
    name: String.fromCharCode(...state.name).replaceAll('\0', ''),
    pda: pda,
    level: state.level,
    watered: state.watered,
    mint: state.mint,
    waterTimeOutUnix: state.waterTimeout.toNumber(),
    isDead: dead
  };
};

export const getTuberMetadata = async (
  connection: anchor.web3.Connection,
  metadataAddress: PublicKey
): Promise<TuberMetadata> => {
  const { pubkey, data: { data: { uri, name } } } = await Metadata.load(connection, metadataAddress);
  let photoUri;
  let family;
  if (uri) {
    const json = await (await fetch(uri)).json();
    photoUri = json.image;
    family = json.attributes.filter((a: any) => a.trait_type === 'Tuber')[0].value;
  }

  return {
    photoUri: photoUri,
    name: name,
    metadataAddress: pubkey,
    family: family
  };
}

export const getATAForMintUnknownOwner = async (
  mint: PublicKey,
  connection: Connection
): Promise<[PublicKey, PublicKey]> => {
  const accounts = (await connection.getTokenLargestAccounts(mint)).value;
  if (accounts.length == 0 || accounts[0].amount !== '1') {
    return [PublicKey.default, PublicKey.default];
  }

  // Getting owner from ATA...
  const info = await connection.getAccountInfo(accounts[0].address, 'recent');
  if (!info) throw new TokenAccountNotFoundError();
  if (!info.owner.equals(TOKEN_PROGRAM_ID)) throw new TokenInvalidAccountOwnerError();
  if (info.data.length != AccountLayout.span) throw new TokenInvalidAccountSizeError();
  const rawAccount = AccountLayout.decode(info.data);
  return [accounts[0].address, new PublicKey(rawAccount.owner)];
}

export const getATAForMint = async (
  owner: PublicKey,
  mint: PublicKey,
): Promise<PublicKey> => {
  return (await anchor.web3.PublicKey.findProgramAddress(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  ))[0];
}

// const PLANT_WATER_PER_GROWTH_CUMU = [1, 3, 6, 10];
const PLANT_WATER_PER_GROWTH_CUMU = [3, 10, 21, 34];
export const getWaterFilled = (level: number, watered: number): number => {
  return level === 4 ? 1 : level === 0 ? watered : watered - PLANT_WATER_PER_GROWTH_CUMU[level - 1];
}
export const getWaterCapacity = (level: number): number => {
  return level === 4 ? 0 : level === 0 ? PLANT_WATER_PER_GROWTH_CUMU[level] : PLANT_WATER_PER_GROWTH_CUMU[level] - PLANT_WATER_PER_GROWTH_CUMU[level - 1];
}

export const processRawName = (rawName: string): [string, string] => {
  if (rawName.length > 12) {
    return ['', ''];
  }
  const sanitizedName = rawName.trim().charAt(0).toUpperCase() + rawName.trim().slice(1).toLowerCase();
  const paddedName = sanitizedName.concat('\0'.repeat(12 - rawName.length));
  return [sanitizedName, paddedName];
}

export const fetchOwnedTubers = async (wallet: PublicKey) => {
  let indexer = process.env.NEXT_PUBLIC_NETWORK === 'mainnet-beta'
    ? `https://3e7iuc6csg.execute-api.us-west-1.amazonaws.com/default/gm?owner=${wallet}`
    : `https://mqjeo5d7w4.execute-api.us-west-1.amazonaws.com/default/gm-devnet?owner=${wallet}`;
  if (process.env.NEXT_PUBLIC_NETWORK === 'mainnet-beta' && process.env.NEXT_PUBLIC_LOCALHOST === '1') {
    indexer += '&localhost=1';
  }
  const tubers = await (await fetch(indexer)).json();
  console.log(`${tubers.length} tubers`);
  return tubers;
}

export const getSeedSocietyProgram = async (connection: Connection, wallet: Wallet) => {
  const provider = new anchor.Provider(connection, wallet, anchor.Provider.defaultOptions());
  const idl = await anchor.Program.fetchIdl(SEED_SOCIETY_PROGRAM, provider);
  return new anchor.Program(idl!, SEED_SOCIETY_PROGRAM, provider);
}

export const getTopGardeners = async (): Promise<GardenerLeaderboardEntry[]> => {
  const gardenersUri = `https://107kh9tyf5.execute-api.us-west-1.amazonaws.com/default/top-gardeners${process.env.NEXT_PUBLIC_LOCALHOST === '1' ? '?localhost=1' : ''}`;
  const gardeners = await (await fetch(gardenersUri)).json();
  return gardeners;
}
