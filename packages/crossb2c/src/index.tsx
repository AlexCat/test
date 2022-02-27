import React from 'react'
import ReactDOM from 'react-dom'
import TagManager from 'react-gtm-module'

import { AppProviders } from 'context/app-providers'
import { patchWindowEnv, isLocalhost } from 'utils'

import App from './app'

const tagManagerArgs = {
	gtmId: window._env_.REACT_APP_GOOGLE_TAG_MANAGER_CODE
}

if (!isLocalhost || tagManagerArgs.gtmId !== '-1') {
	TagManager.initialize(tagManagerArgs)
}

patchWindowEnv()

ReactDOM.render(
	<React.StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
