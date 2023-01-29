import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Members } from "./Members";
import { Header } from "../Shared/Header";
import { Team } from "./Team";
import { Pricing } from "../Account/Pricing";
import { UserGroupIcon, PencilIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import { SideNav } from "../Shared/SideNav";
import { TeamsList } from "./TeamsList";
import { RootState } from "../../reducers";
import { getTeams } from "../../actions/teams"

const sideNav = 
[
    { id: 'teams', name: 'Teams', href: '/', current: true, hidden: true },
    { id: 'edit', name: 'Edit', href: '/edit', icon: PencilIcon, current: true },
    { id: 'members', name: 'Members', href: '/members', icon: UserGroupIcon, current: false },
    // { id: 'billing', name: 'Plan & Billing', href: '/billing', icon: CreditCardIcon, current: false }, TODO: need to figure this out still
    // { id: 'notifications', name: 'Notifications', href: '/notifications', icon: BellIcon, current: false }, TODO: should be on a per team basis
];

export const Teams = (): JSX.Element => {
    const { teams: { teams, loading: teamsLoading, queried: teamsQueried } } = useSelector((state: RootState) => state);

    const loc = useLocation();
    const dispatch = useDispatch();
    const [currentItem, setCurrentItem] = useState('');
    const pathId = loc.pathname.split('/').pop();

    const setDisplayItem = () => {
        const curr = sideNav.find((nav) => pathId?.includes(nav.id));
        setCurrentItem(curr?.id || '');
    };

    useEffect( () => {
        if (teams.length === 0 && !teamsQueried && !teamsLoading) {
            getTeams(dispatch);
        }
        setDisplayItem();
    }, [loc, teams, teamsQueried, teamsLoading]);
    return (
    <>
        <Header />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                { currentItem === 'teams' ? <TeamsList teams={teams}/> : <SideNav navigation={sideNav.filter(nav => !nav.hidden )}/>}
                { currentItem === 'edit' ? <Team team={teams[0]}/> : '' }
                { currentItem === 'members' ? <Members members={[]}/> : '' }
                { currentItem === 'billing' ? <Pricing /> : '' }
            </div>
        </div>
    </>
    );
};
