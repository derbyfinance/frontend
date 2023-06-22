export const MaskCoinAddress = (address?: `0x${string}`): string => {
	return address?.toString().slice(0, 6) + '...' + address?.slice(-4)
}

export const CopyToClipboard = (text: string): void => {
	navigator.clipboard.writeText(text)
}
