import React from 'react'
import { useMedia as useMediaLib } from 'react-use'

export const small = '(min-width: 768px)'
export const medium = '(min-width: 1280px)'
export const large = '(min-width: 1440px)'

const MediaContext = React.createContext()
MediaContext.displayName = 'MediaContext'

function MediaProvider(props) {
	const isSmall = useMediaLib(small)
	const isMedium = useMediaLib(medium)
	const isLarge = useMediaLib(large)
	const isMobile = !isSmall && !isMedium && !isLarge
	const isDesktop = !isMobile
	return <MediaContext.Provider value={{
		isMobile,
		isDesktop,
		isSmall,
		isMedium, 
		isLarge,
	}} {...props} />
}

function useMedia() {
	const context = React.useContext(MediaContext)
	if (context === undefined) {
		throw new Error(`useMedia must be used within a MediaProvider`)
	}
	return context
}

export { MediaProvider, useMedia }