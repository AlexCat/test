import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './theme/mobile-menu.css'

import { AppRoutes } from 'routes'
import { Error } from 'kit/error'

function App() {
    return (
        <ErrorBoundary
            FallbackComponent={() => (
                <Error fill />
            )}
        >
            <ToastContainer
                icon={false}
                position='top-center'
                transition={Slide}
                autoClose={1500}
                closeButton={false}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
            <AppRoutes />
        </ErrorBoundary>
    )
}

export default App