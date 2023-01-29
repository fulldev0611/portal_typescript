import React, { useEffect, useState } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, LogoutIcon } from '@heroicons/react/outline'
import { useHistory, useLocation } from 'react-router-dom'
import { SubHeader } from './SubHeader'
import { navigation } from 'app/utils/constants'
import { useKeycloak } from '@react-keycloak/web'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: ''
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Header = ( { teams = [] } ) => {
  const loc = useLocation();
  const history = useHistory();
  const [headerName, setHeaderName] = useState('');

  const { keycloak } = useKeycloak();
  // const user = keycloak.tokenParsed as KeycloakParsedToken;

  const onLogout = async () => {
      keycloak.logout();
      history.push('/login');
  }

  const [currentHeaderNav, setCurrentHeaderNav] = useState(navigation);
  const disbaled = "pointer-events:none opacity-50";
  const hoverCss = ""
  
  const handleHeaderSelect = (path: string) => {
    if (path.includes('teams')) return;
    history.push(`${path}`);
  }

  const updateCurrentHeader = () => {
    let curr = currentHeaderNav.findIndex( (nav) => loc.pathname.includes(nav.id));
    const old = currentHeaderNav.findIndex( (header) => header.current === true);
    if (currentHeaderNav[curr].id === 'templates') curr = curr + 1;
    const newArr = [...currentHeaderNav]
    newArr[old].current = false;
    newArr[curr].current = true;
    setCurrentHeaderNav(newArr);
  }

  const updateSubHeader = () => {
    const headerName = navigation.find( (nav) => loc.pathname.includes(nav.id));
    setHeaderName(headerName?.name || 'Workspaces');
  }

  useEffect( () => {
    updateSubHeader();
    updateCurrentHeader();
  },[loc])

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-indigo-500">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10"
                        src="https://officekube.io/images/logo.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {currentHeaderNav.map((item, i) => (
                          <a
                            key={item.id}
                            className={classNames(
                              item.current
                                ? 'bg-indigo-900 text-white'
                                : 'text-white',
                                item.id !== 'teams' ? 'hover:bg-indigo-800 hover:text-white cursor-pointer' : disbaled,
                              `px-3 py-2 rounded-md text-sm font-medium ${item.hide ? 'hidden' : '' }`
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={ () => handleHeaderSelect(item.href) }
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <button
                          type="button"
                          className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          onClick={onLogout}
                        >
                          <span className="sr-only">View notifications</span>
                          <LogoutIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        </div>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 cursor-pointer">
                  {currentHeaderNav.map((item, i) => (
                    <Disclosure.Button
                      key={item.id}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        `block px-3 py-2 rounded-md text-base font-medium ${item.hide ? 'hidden' : '' }`
                      )}
                      aria-current={item.current ? 'page' : undefined}
                      onClick={ () => handleHeaderSelect(item.href) }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1 cursor-pointer">
                    {currentHeaderNav.map((item, i) => (
                      <Disclosure.Button
                        key={item.name}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={ () => handleHeaderSelect(item.href) }
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">{ headerName }</h1>
            { headerName === 'Workspaces' ? <SubHeader />: '' }
          </div>
        </header>
      </div>
    </>
  )
}