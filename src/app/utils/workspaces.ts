export const getAuthMessage = token => {
    return {
        type: 'authenticate',
        token
    };
}