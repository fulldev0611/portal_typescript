import React, { useEffect, useState } from 'react';
import { CreditCardIcon, BellIcon, UserCircleIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import { Header } from '../Shared/Header';
import { Profile } from './Profile';
import { SideNav } from '../Shared/SideNav';
import { Notifications } from './Notifications';

import { useLocation } from 'react-router-dom';
import { Integrations } from './Integrations';
import { Pricing } from './Pricing';
import { useKeycloak } from '@react-keycloak/web';
import { getUser } from 'app/utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import { getUserIntegrations } from 'app/actions/integrations';
import { getUserNotificationSettings } from 'app/actions/settings';
import { Billing } from './Billing';

const sideNav = [
    { id: 'profile', name: 'Account', href: '/profile', icon: UserCircleIcon, current: true },
    { id: 'integrations', name: 'Integrations', href: '/integrations', icon: ViewGridAddIcon, current: false },
    { id: 'plan', name: 'Plan', href: '/plan', icon: CreditCardIcon, current: false },
    { id: 'billing', name: 'Billing', href: '/billing', icon: CreditCardIcon, current: false },
    { id: 'notifications', name: 'Notifications', href: '/notifications', icon: BellIcon, current: false },
]

export const Account = () => {

    const loc = useLocation();
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak();
    const [currentItem, setCurrentItem] = useState('');

    const pathId = loc.pathname.split('/').pop();
    
    const user = getUser(keycloak);

    const setDisplayItem = () => {
        const curr = sideNav.find( (nav) => pathId?.includes(nav.id));
        setCurrentItem(curr?.id || '');
    };

    const { integrations: { integrations }, settings: { notifications } } = useSelector((state: RootState) => state);

    useEffect( () => {
        setDisplayItem();
    }, [loc]);

    useEffect( () => {
        getUserIntegrations(dispatch);
        getUserNotificationSettings(dispatch);
    }, [dispatch]);

    return (
        <>
            <Header />
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <SideNav navigation={sideNav}/>
                    { currentItem === 'profile' ? <Profile user={user}/> : '' }
                    { currentItem === 'notifications' ? <Notifications notifications={notifications} /> : '' }
                    { currentItem === 'integrations' ? <Integrations integrations={integrations} /> : '' }
                    { currentItem === 'plan' ? <Pricing /> : '' }
                    { currentItem === 'billing' ? <Billing /> : '' }
                </div>
            </div>
        </>
    )
}