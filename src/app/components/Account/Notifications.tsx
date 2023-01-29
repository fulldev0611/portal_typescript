import { RootState } from 'app/reducers';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from '../Shared/Checkbox';
import { updateUserNotification } from '../../actions/settings';

import _ from 'lodash';

const notificationsObj = {
    account: {
        id: 'account',
        title: 'Account Updates',
        desc: 'Get notified updates related to your acccount.',
    },
    workspaceStatus: {
        id: 'workspaceStatus',
        title: 'Workspace Status',
        desc: 'Get notified about workspace status and issues.',
    },
    workspaceTemplate: {
        id: 'workspaceTemplate',
        title: 'Workspace Templates',
        desc: 'Get notified about new templates and changes.',
    },
    marketing: {
        id: 'marketing',
        title: 'Marketing Updates',
        desc: 'Get notified about news and updates related to our platform.',
    },
    teamUpdates: {
        id: 'teamUpdates',
        title: 'Team Updates',
        desc: 'Get notified about changes to your team(s).',
    }
}

export const Notifications = ({ notifications }) => {
    const dispatch = useDispatch();
    const [notificationsMap, setNotificationsMap] = useState(notifications);
    const { settings: { loading: notificationsLoading } } = useSelector( (state: RootState) => state);
    const updateNotifications = (n) => updateUserNotification(dispatch, n);
    const throttledUpdateCall = useCallback(_.throttle(updateNotifications, 5000),[])
    const checked = (notification) => {
        const newObj = {...notificationsMap};
        newObj[notification] = !notificationsMap[notification];
        setNotificationsMap(newObj);
        throttledUpdateCall(newObj);
    };

    useEffect( () => {
        if (!notificationsLoading && !!!notifications && !!!notificationsMap) {
            setNotificationsMap(notifications);
        }
    }, [notificationsMap, notifications, notificationsLoading])

    return (
        <div className="lg:col-span-9">
            {
                Object.keys(notificationsMap).map( (notification) => {
                    return <CheckBox
                        key={notificationsObj[notification].id}
                        title={notificationsObj[notification].title}
                        desc={notificationsObj[notification].desc}
                        checked={notificationsMap[notification]}
                        onChange={ () => checked(notification) }
                    />
                })
            }
        </div>
    )
}