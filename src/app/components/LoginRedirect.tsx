import React from "react";
import { useHistory } from "react-router-dom";

export const LoginRedirect = ( ): JSX.Element => {
    const history = useHistory();
    history.push('/workspaces');
    return (
        <>
        </>
    );
};
