import type { Commitment, Slot } from '@solana/rpc-types';

type GetEpochInfoApiResponse = Readonly<{
    /** the current slot */
    absoluteSlot: Slot;
    /** the current block height */
    blockHeight: bigint;
    /** the current epoch */
    epoch: bigint;
    /** the current slot relative to the start of the current epoch */
    slotIndex: bigint;
    /** the number of slots in this epoch */
    slotsInEpoch: bigint;
    /** total number of transactions processed without error since genesis */
    transactionCount: bigint | null;
}>;

export type GetEpochInfoApi = {
    /**
     * Returns the balance of the account of provided Pubkey
     */
    getEpochInfo(
        config?: Readonly<{
            /**
             * Fetch epoch information as of the highest slot that has reached this level of
             * commitment. Defaults to `finalized`.
             */
            commitment?: Commitment;
            /** The minimum slot that the request can be evaluated at */
            minContextSlot?: Slot;
        }>,
    ): GetEpochInfoApiResponse;
};
