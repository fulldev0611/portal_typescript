import Keycloak from 'keycloak-js'
const keycloakConfig = {
    url: 'https://keycloak.dev.workspacenow.cloud/auth',
    realm: 'officekube',
    clientId: 'platform-dev'
}
const keycloak = Keycloak(keycloakConfig);

// should probably add dynamic options based on env
// for example enableLogging: true can be useful for debugging
export const initOptions = {
    onLoad: 'login-required',
};

export default keycloak;