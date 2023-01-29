import { KeycloakInstance } from "keycloak-js";
import { KeycloakParsedToken } from "types";

export const getUser = (keycloak: KeycloakInstance) => {
    const {
        given_name,
        family_name,
        preferred_username,
        email,
    } = keycloak.tokenParsed as KeycloakParsedToken;

    return {
        firstName: given_name,
        lastName: family_name,
        username: preferred_username,
        email,
    }
};