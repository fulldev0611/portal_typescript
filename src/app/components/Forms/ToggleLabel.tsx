import React from 'react';
import { Switch } from '@headlessui/react'
import { Toggle } from './Toggle';

export const ToggleLabel = ({ enabled, setEnabled, label, description }) => {
    return (
        <Switch.Group as="div" className="flex items-center justify-between">
            <Switch.Label as="span" className="flex-grow flex flex-col" passive>
                <span className="text-sm font-medium text-gray-900">{ label }</span>
                <span className="text-sm text-gray-500">{ description }</span>
            </Switch.Label>
            <Toggle enabled={enabled} setEnabled={setEnabled} />
        </Switch.Group>
    )
}