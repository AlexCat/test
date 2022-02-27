import { ErrorBoundary } from 'react-error-boundary'
import { FormattedMessage } from 'react-intl'
import { AiOutlineHome } from 'react-icons/ai'

import { GetPersonalInfoV2_ServerResponse } from 'api/typings/get-personal-info-v2'
import { Spinner } from 'kit/spinner'
import { Error } from 'kit/error'
import { DocsByOrder } from 'modules/docs-by-order'
import { Callout } from 'kit/callout'
import { routesList } from 'routes/routes-list'
import { FancyLink } from 'kit/fancy-link'

import { useQuery } from 'react-query'

import { queryName } from 'api/query-name'
import { useClient } from 'context/auth-context'

export function ProfileScreen() {

    const client = useClient()
    const query = useQuery<HttpSuccessResponse<GetPersonalInfoV2_ServerResponse>, HttpErrorResponse>(
        [queryName.getProfile],
        () => client.getProfile()
    )

    return (
        <ErrorBoundary
            FallbackComponent={() => (
                <Error fill />
            )}
        >
            {query.status === 'success' && (
                <DocsByOrder
                    initialModel={query.data!.data}
                />
            )}

            {query.status === 'loading' && (
                <div style={{ marginTop: 48 }}>
                    <Spinner
                        fill
                        delay={0.5}
                    />
                </div>
            )}

            {query.status === 'error' && query.error.response?.status === 422 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Callout style={{ width: 250, marginTop: 24 }} intent='warning' size='small'>
                        {query.error.response?.data.title}
                    </Callout>
                </div>
            )}

            {query.status === 'error' && query.error.response?.status !== 422 && (
                <Error fill style={{ marginTop: 24 }}>
                    {query.error.response?.data.title ? query.error.response.data.title : <FormattedMessage id='app.networkError' />}
                </Error>
            )}

            {query.status === 'error' && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 24
                }}>
                    <FancyLink
                        to={routesList.orders}
                    >
                        <AiOutlineHome size={16} style={{ marginRight: 4 }} />
                        <FormattedMessage id='app.goHomePage' />
                    </FancyLink>
                </div>
            )}
        </ErrorBoundary>
    )
}