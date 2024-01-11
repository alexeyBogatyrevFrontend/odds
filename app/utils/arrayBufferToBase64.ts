export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
	const binaryArray = new Uint8Array(buffer)
	const base64 = binaryArray.reduce(
		(acc, byte) => acc + String.fromCharCode(byte),
		''
	)
	return btoa(base64)
}
