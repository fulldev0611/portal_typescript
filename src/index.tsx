import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import 'sanitize.css/sanitize.css';
import { store, persistedStore } from './app/store'
import { PersistGate } from 'redux-persist/integration/react';
import './content/main.css'

// Import root app
import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';
// Initialize languages
import './locales/i18n';
import { registerLicense } from '@syncfusion/ej2-base';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkNgWX5Zc31VT2JbUkE=');

interface Props {
    Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
            <HelmetProvider>
                <React.StrictMode>
                    <Component />
                </React.StrictMode>
            </HelmetProvider>
        </PersistGate>
    </Provider>
);
const render = (Component: typeof App) => {
    ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
    // Hot reloadable translation json files and app
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./app', './locales/i18n'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        const { App } = require('./app');
        render(App);
    });
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
