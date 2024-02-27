import SubgraphClient from '@network/SubgraphClient';

import { DepositDtoModel } from '@models/dto/DepositDtoModel';
import { Hex } from 'viem';

const unixTime = Math.floor(new Date().getTime() / 1000);

export const GetDeposits = async (address: Hex): Promise<DepositDtoModel> => {
    const data = {
        query: `{deposits(where: {user: $address}) {
                        id
                        user
                        amount
                        preferredProtocol
                        blockTimestamp
                        referral
                    }
                }`, variables: { address: address.toString() }
    };
    const returnData = await SubgraphClient.post('', data);

    // Aggregate the amounts
    let totalAmount = BigInt(0); // Use the BigInt function
    if (returnData.data && returnData.data.deposits) {
        totalAmount = returnData.data.deposits.reduce((total: BigInt, deposit: any) => {
            // Ensure that deposit.amount is a string
            if (typeof deposit.amount === 'string') {
                return BigInt(total.toString()) + (BigInt(deposit.amount) * (BigInt(unixTime) - BigInt(deposit.blockTimestamp))) / BigInt(10**16);
            } else {
                throw new Error('deposit.amount must be a string');
            }
        }, BigInt(0)); // Use the BigInt function
    }
    
    // Create a new DepositDtoModel object with the aggregated amount
    const aggregatedDeposit: DepositDtoModel = {
        user: address.toString(),
        points: totalAmount,
    };

    //final return
    return aggregatedDeposit;
};

console.log(GetDeposits('0x1Ca7b496Ac4E609cf400793Db67916AC91773927'));
console.log(unixTime);