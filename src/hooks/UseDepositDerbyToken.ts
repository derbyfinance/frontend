import { Abi, Hex, parseEther } from 'viem'
import {
	useFeeData,
	useSimulateContract,
	useWaitForTransactionReceipt,
	useWriteContract
} from 'wagmi'
import useDebounce from './UseDebounce'

const abi: Abi = [
	{
		inputs: [
			{ internalType: 'string', name: '_name', type: 'string' },
			{ internalType: 'string', name: '_symbol', type: 'string' },
			{ internalType: 'uint8', name: '_decimals', type: 'uint8' },
			{ internalType: 'uint256', name: '_vaultNumber', type: 'uint256' },
			{ internalType: 'address', name: '_dao', type: 'address' },
			{ internalType: 'address', name: '_game', type: 'address' },
			{ internalType: 'address', name: '_controller', type: 'address' },
			{ internalType: 'address', name: '_vaultCurrency', type: 'address' },
			{ internalType: 'uint256', name: '_uScale', type: 'uint256' }
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Approval',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '_vaultNumber',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint32',
				name: '_chainId',
				type: 'uint32'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_underlying',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_totalSupply',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_withdrawalRequests',
				type: 'uint256'
			}
		],
		name: 'PushTotalUnderlying',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '_vaultNumber',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint32',
				name: '_chain',
				type: 'uint32'
			},
			{
				indexed: false,
				internalType: 'int256[]',
				name: '_rewards',
				type: 'int256[]'
			}
		],
		name: 'PushedRewardsToGame',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '_vaultNumber',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'address',
				name: '_asset',
				type: 'address'
			}
		],
		name: 'RebalanceXChain',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'from', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'to', type: 'address' },
			{
				indexed: false,
				internalType: 'uint256',
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Transfer',
		type: 'event'
	},
	{
		inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
		name: 'addToWhitelist',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'owner', type: 'address' },
			{ internalType: 'address', name: 'spender', type: 'address' }
		],
		name: 'allowance',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'amountToSendXChain',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'approve',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_protocolNum', type: 'uint256' }
		],
		name: 'balanceUnderlying',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_protocolNum', type: 'uint256' }
		],
		name: 'blacklistProtocol',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_protocolNum', type: 'uint256' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' }
		],
		name: 'calcShares',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'claimTokens',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'decimals',
		outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'subtractedValue', type: 'uint256' }
		],
		name: 'decreaseAllowance',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'deltaAllocationsReceived',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_amount', type: 'uint256' },
			{ internalType: 'address', name: '_receiver', type: 'address' }
		],
		name: 'deposit',
		outputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'derbyToken',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'exchangeRate',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'game',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getDao',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getGuardian',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getRewardAllowance',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getVaultBalance',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getWithdrawalAllowance',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'governanceFee',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'homeChain',
		outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'addedValue', type: 'uint256' }
		],
		name: 'increaseAllowance',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'lastPrices',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'lastTimeStamp',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'liquidityPerc',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'marginScale',
		outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'maxDivergenceWithdraws',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'minimumPull',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'name',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'performanceFee',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_protocolNum', type: 'uint256' }
		],
		name: 'price',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'pushTotalUnderlyingToController',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'rebalance',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'rebalanceInterval',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'rebalanceNeeded',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_slippage', type: 'uint256' },
			{ internalType: 'uint256', name: '_relayerFee', type: 'uint256' }
		],
		name: 'rebalanceXChain',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'rebalancingPeriod',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'receiveFunds',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'receiveFundsGuard',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'int256[]', name: '_deltas', type: 'int256[]' }],
		name: 'receiveProtocolAllocations',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'int256[]', name: '_deltas', type: 'int256[]' }],
		name: 'receiveProtocolAllocationsGuard',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_value', type: 'uint256' },
			{ internalType: 'address', name: '_user', type: 'address' }
		],
		name: 'redeemRewardsGame',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'uint256', name: '', type: 'uint256' }
		],
		name: 'rewardPerLockedToken',
		outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'savedTotalUnderlying',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'sendRewardsToGame',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: '_dao', type: 'address' }],
		name: 'setDao',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
		name: 'setDaoToken',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: '_game', type: 'address' }],
		name: 'setGame',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint16', name: '_fee', type: 'uint16' }],
		name: 'setGovernanceFee',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: '_guardian', type: 'address' }],
		name: 'setGuardian',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint32', name: '_homeChain', type: 'uint32' }],
		name: 'setHomeChain',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: '_xProvider', type: 'address' }],
		name: 'setHomeXProvider',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_liquidityPerc', type: 'uint256' }
		],
		name: 'setLiquidityPerc',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'int256', name: '_marginScale', type: 'int256' }],
		name: 'setMarginScale',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_maxDivergence', type: 'uint256' }
		],
		name: 'setMaxDivergence',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_performanceFee', type: 'uint256' }
		],
		name: 'setPerformanceFee',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_timestampInternal', type: 'uint256' }
		],
		name: 'setRebalanceInterval',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bool', name: '_state', type: 'bool' }],
		name: 'setSwapRewards',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'setTotalUnderlying',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bool', name: '_state', type: 'bool' }],
		name: 'setTraining',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: '_maxDeposit', type: 'uint256' }],
		name: 'setTrainingDeposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'enum Vault.State', name: '_state', type: 'uint8' }
		],
		name: 'setVaultStateGuard',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_amountToSend', type: 'uint256' },
			{ internalType: 'uint256', name: '_exchangeRate', type: 'uint256' },
			{ internalType: 'bool', name: '_receivingFunds', type: 'bool' }
		],
		name: 'setXChainAllocation',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_amountToSend', type: 'uint256' },
			{ internalType: 'uint256', name: '_exchangeRate', type: 'uint256' },
			{ internalType: 'bool', name: '_receivingFunds', type: 'bool' }
		],
		name: 'setXChainAllocationGuard',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'state',
		outputs: [{ internalType: 'enum Vault.State', name: '', type: 'uint8' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'swapRewards',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bool', name: '_state', type: 'bool' }],
		name: 'toggleVaultOnOff',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'totalAllocatedTokens',
		outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'transfer',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'from', type: 'address' },
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'transferFrom',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'uScale',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'vaultCurrencyAddr',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'vaultNumber',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'vaultOff',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_amount', type: 'uint256' },
			{ internalType: 'address', name: '_receiver', type: 'address' },
			{ internalType: 'address', name: '_owner', type: 'address' }
		],
		name: 'withdraw',
		outputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'withdrawAllowance',
		outputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'withdrawRewards',
		outputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
		name: 'withdrawalRequest',
		outputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'xController',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'xProvider',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{ stateMutability: 'payable', type: 'receive' }
]

const useDepositDerbyToken = (amount: number, address: Hex | undefined, isApproved: boolean) => {
	const debouncedAmount = useDebounce<bigint>(
		parseEther(`${amount}`),
		500
	)
	const derbyVault = process.env.NEXT_PUBLIC_DERBY_TOKEN as Hex
	const approveToken = process.env.NEXT_PUBLIC_TEST_TOKEN as Hex

	const { data: dataFee } = useFeeData()
/*
	console.log(
		'useDepositDerbyToken',
		amount,
		debouncedAmount,
		Boolean(debouncedAmount)
	)
*/
	const {
		data,
		//data: dataGas,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = useSimulateContract({
		address: derbyVault,
		abi: abi,
		functionName: 'deposit',
		args: [debouncedAmount, address],
		query: {
			enabled: isApproved
		}
	})

	console.log('prepare', data, isLoadingPrepare, isSuccessPrepare, errorPrepare)

	const {
		data: dataApprove,
		error: errorApprove,
		isLoading: isLoadingApprove,
		isSuccess: isSuccessApprove
	} = useSimulateContract({
		address: approveToken,
		abi: abi,
		functionName: 'approve',
		args: [derbyVault, debouncedAmount],
		query: {
			enabled: Boolean(debouncedAmount)
		}
	})

	//const { data: dataApprove, writeContract: writeApprove } = useWriteContract()

	const { data: dataWrite, error: errorWrite, writeContract: write } = useWriteContract()

	const {
		error: errorTx,
		isLoading: isLoadingTx,
		isSuccess: isSuccessTx
	} = useWaitForTransactionReceipt({
		hash: dataWrite
	})

	return {
		data,
		dataApprove,
		//dataGas,
		dataFee,
		errorPrepare,
		isLoadingPrepare,
		isSuccessPrepare,
		errorTx,
		isLoadingTx,
		isSuccessTx,
		errorApprove,
		errorWrite,
		isLoadingApprove,
		isSuccessApprove,
		write
	}
}

export default useDepositDerbyToken
