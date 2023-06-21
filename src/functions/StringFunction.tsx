import { Hex } from 'viem'

export const MaskCoinAddress = (address?: Hex): string => {
	return address?.toString().slice(0, 6) + '...' + address?.slice(-4)
}

export const CopyToClipboard = (text: string): void => {
	navigator.clipboard.writeText(text)
}
