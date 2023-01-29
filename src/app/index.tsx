import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { Home } from './components/Home/home';
import { Workspaces } from './components/Workspaces';
import { Account } from './components/Account';
import { LoginRedirect } from './components/LoginRedirect';
import { Teams } from './components/Teams';

import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'
import keycloak, { initOptions } from './keycloak'

import ReactLoading from 'react-loading';
import Pricing from '../app/components/Account/Pricing' ;

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-react-popups/styles/material.css';


function PrivateRoute ({component: Component, ...rest}) {
    const { keycloak, initialized, } = useKeycloak();
    const authed: boolean | undefined = initialized && keycloak.authenticated;
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}

export function App() {

    return (
            <BrowserRouter>
                <Helmet titleTemplate="%s - Workspaces" defaultTitle="Workspaces">
                    <meta name="description" content="A Workspaces application" />
                </Helmet>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/pricing" component={Pricing} />
                    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} LoadingComponent={<div className='flex justify-center'><ReactLoading type={'bubbles'} color='#3483eb' height={'15%'} width={'15%'} /></div>} >
                        <PrivateRoute exact path="/login" component={LoginRedirect} />
                        <PrivateRoute exact path="/workspaces" component={Workspaces} />
                        <PrivateRoute exact path="/workspaces/templates" component={Workspaces} />
                        <PrivateRoute path="/settings" component={Account} />
                        <PrivateRoute path="/teams" component={Teams} />
                    </ ReactKeycloakProvider >
                </Switch>
                <GlobalStyle />
            </BrowserRouter>
    );
};