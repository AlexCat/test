function createSberAuthRedirectUrl() {
    return `${window.location.origin}/auth/oids`
}

function createSberSendUserInfoRedirectUrl() {
    return `${window.location.origin}/itp/sp`
}

export {
    createSberAuthRedirectUrl,
    createSberSendUserInfoRedirectUrl
}