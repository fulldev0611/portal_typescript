export const statuses = [
    {
        status: 'active',
        color: 'green'
    },
    {
        status: 'pending',
        color: 'yellow'
    },
    {
        staus: 'inactive',
        color: 'red'
    },
    {
        status: 'created',
        color: 'indigo'
    }
];

export const navigation = [
    {
        id: 'templates',
        hide: true,
        name: 'Workspaces',
        href: '/workspaces/templates',
        current: false
    },
    {
        id: 'workspaces',
        name: 'Workspaces',
        href: '/workspaces',
        current: true
    },
    {
        id: 'settings',
        name: 'Settings',
        href: '/settings/profile',
        current: false,
    },
    {
        id: 'teams',
        name: 'Teams',
        href: '/teams',
        current: false,
    },
];
  
export const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];