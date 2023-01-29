import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SideNavItem } from 'types';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
};

export const SideNav = ( { navigation }) => {
    const history = useHistory();
    const [currentTabs, setCurrentTabs] = useState(navigation as SideNavItem[]);
    const loc = useLocation();

    const currPath = loc.pathname.split('/').indexOf('settings') !== -1 ? 'settings' : 'teams';

    const updatePath = (path: string, i: number) => {
        const curr = currentTabs.findIndex( (tab) => tab.current === true);
        navigation[curr].current = false;
        navigation[i].current = true;
        setCurrentTabs(navigation);
        history.push(`/${currPath}${path}`);
    }

    const setCurrentTab = () => {
        const pathId = loc.pathname.split('/').pop() || '';
        if (pathId === 'teams') return;
        const old = currentTabs.findIndex( (tab) => tab.current === true);
        const curr = currentTabs.findIndex( (tab) => tab.id === pathId) || 0;
        const newArr = [...navigation];
        newArr[old].current = false;
        newArr[curr].current = true;
        setCurrentTabs(newArr);
    }

    useEffect( () => {
        setCurrentTab();
    }, [loc]);

    return (
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
                {currentTabs.map((item, index) => (
                    <a
                        key={item.name}
                        onClick={() => updatePath(item.href, index)}
                        className={classNames(
                            item.current
                                ? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
                                : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                            'group rounded-md px-3 py-2 flex items-center text-sm font-medium cursor-pointer'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        <item.icon
                            className={classNames(
                                item.current
                                    ? 'text-indigo-500 group-hover:text-indigo-500'
                                    : 'text-gray-400 group-hover:text-gray-500',
                                'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                            )}
                            aria-hidden="true" />
                        <span className="truncate">{item.name}</span>
                    </a>
                ))}
            </nav>
        </aside>
    )
}