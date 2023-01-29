import React from 'react';
import bitbucket from '../../../assets/bitbucket.png';
import github from '../../../assets/github.png';
import gitlab from '../../../assets/gitlab.png';

const integrationMapping = [
  { id: 'bitbucket', name: 'Bitbucket', icon: bitbucket, username: '', connected: false },
  { id: 'github', name: 'Github', icon: github, username: '', connected: false },
  { id: 'gitlab', name: 'Gitlab', icon: gitlab, username: 'spencer-mccracken', connected: false },
];

export const Integrations = ({ integrations }) => {

    const getIntegrationBorder = (connected: boolean) => {
        return connected
            ? 'hover:border-green-400 focus-within:ring-green-500 border-green-300'
            : 'hover:border-gray-400 focus-within:ring-gray-500 border-gray-300';
    };

    const openIntegrationModal = (index: number) => {
        console.log(integrations[index]);
    };

    return (
        <div className="space-y-6 sm:px-6 lg:px-6 lg:py-6 lg:col-span-9">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {integrationMapping.map((integration, i) => (
                    <div
                    key={integration.id}
                    onClick={ () => openIntegrationModal(i) }
                    className={`relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 focus-within:ring-2 focus-within:ring-offset-2 ${getIntegrationBorder(integration.connected)}`}
                    >
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={integration.icon} alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <a href="#" className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-base font-medium text-gray-900 font-sans">{integration.name}</p>
                            <p className="text-base text-gray-500 truncate font-sans">{integration.connected ? integration.username : 'Not Connected'}</p>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )
}
