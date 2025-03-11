import type { Address } from '@solana/addresses';
import type {
    AccountInfoBase,
    AccountInfoWithBase58Bytes,
    AccountInfoWithBase58EncodedData,
    AccountInfoWithBase64EncodedData,
    AccountInfoWithBase64EncodedZStdCompressedData,
    AccountInfoWithJsonData,
    Commitment,
    DataSlice,
    Slot,
    SolanaRpcResponse,
} from '@solana/rpc-types';

type GetAccountInfoApiResponse<T> = (AccountInfoBase & T) | null;

type GetAccountInfoApiCommonConfig = Readonly<{
    /**
     * Fetch the details of the account as of the highest slot that has reached this level of
     * commitment. Defaults to `finalized`.
     */
    commitment?: Commitment;
    /** The minimum slot that the request can be evaluated at */
    minContextSlot?: Slot;
}>;

type GetAccountInfoApiSliceableCommonConfig = Readonly<{
    // Limit the returned account data using the provided "offset: <usize>" and "length: <usize>" fields.
    dataSlice?: DataSlice;
}>;

export type GetAccountInfoApi = {
    /**
     * Fetches information associated with the account at the given address.
     *
     * If the account has data, it will be returned in the response as a base64-encoded string.
     *
     * @see https://solana.com/docs/rpc/http/getaccountinfo
     */
    getAccountInfo(
        address: Address,
        config: GetAccountInfoApiCommonConfig &
            GetAccountInfoApiSliceableCommonConfig &
            Readonly<{
                encoding: 'base64';
            }>,
    ): SolanaRpcResponse<GetAccountInfoApiResponse<AccountInfoWithBase64EncodedData>>;
    /**
     * Fetches information associated with the account at the given address.
     *
     * If the account has data, it will first be compressed using
     * [ZStandard](https://facebook.github.io/zstd/) and the result will be returned in the response
     * as a base64-encoded string.
     *
     * @see https://solana.com/docs/rpc/http/getaccountinfo
     */
    getAccountInfo(
        address: Address,
        config: GetAccountInfoApiCommonConfig &
            GetAccountInfoApiSliceableCommonConfig &
            Readonly<{
                encoding: 'base64+zstd';
            }>,
    ): SolanaRpcResponse<GetAccountInfoApiResponse<AccountInfoWithBase64EncodedZStdCompressedData>>;
    /**
     * Fetches information associated with the account at the given address.
     *
     * If the account has data, the server will attempt to process it using a parser specific to the
     * account's owning program. If successful, the parsed data will be returned in the response as
     * JSON. Otherwise, the raw account data will be returned in the response as a base64-encoded
     * string.
     *
     * @see https://solana.com/docs/rpc/http/getaccountinfo
     */
    getAccountInfo(
        address: Address,
        config: GetAccountInfoApiCommonConfig &
            Readonly<{
                encoding: 'jsonParsed';
            }>,
    ): SolanaRpcResponse<GetAccountInfoApiResponse<AccountInfoWithJsonData>>;
    /**
     * Fetches information associated with the account at the given address.
     *
     * If the account has data, it will be returned in the response as a base58-encoded string. If
     * the account contains more than 129 bytes of data, this method will raise an error.
     *
     * @see https://solana.com/docs/rpc/http/getaccountinfo
     */
    getAccountInfo(
        address: Address,
        config: GetAccountInfoApiCommonConfig &
            GetAccountInfoApiSliceableCommonConfig &
            Readonly<{
                encoding: 'base58';
            }>,
    ): SolanaRpcResponse<GetAccountInfoApiResponse<AccountInfoWithBase58EncodedData>>;
    /**
     * Fetches information associated with the account at the given address.
     *
     * @see https://solana.com/docs/rpc/http/getaccountinfo
     */
    getAccountInfo(
        address: Address,
        config?: GetAccountInfoApiCommonConfig,
    ): SolanaRpcResponse<GetAccountInfoApiResponse<AccountInfoWithBase58Bytes>>;
};
