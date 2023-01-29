import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tabs = [
    { name: 'Workspaces', href: '/workspaces', current: true },
    { name: 'Templates', href: '/workspaces/templates', current: false },
];

export const SubHeader = () => {
    const [currentTabs, setTab] = useState(tabs);
    const loc = useLocation();
    const history = useHistory();

    const updateTab = () => {
      const i = loc.pathname === '/workspaces' ? 0 : 1;
      const flip = 1 - i;

      const newArr = [...currentTabs];
      newArr[i].current = true
      newArr[flip].current = false;
      setTab(newArr);
    }

    const handleTabSelect = (path: string) => {
        history.replace(path);
    }

    useEffect( () => {
        updateTab();
    }, [loc])

    return (
        <nav className="space-x-8">
        {currentTabs.map((tab) => (
          <a
            key={tab.name}
            onClick={ () => handleTabSelect(tab.href) }
            className={classNames(
              tab.current
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
            )}
            aria-current={tab.current ? 'page' : undefined}
          >
            {tab.name}
          </a>
        ))}
      </nav>
    )
}