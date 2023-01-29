import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface DropdownItems {
    children?: React.ReactChild[] | React.ReactChild;
    items: DropdownItem[];
    classes?: string;
}

export interface DropdownItem {
    title: string;
    active?: boolean;
    separator?: boolean;
    customFontStyle?: string;
    customContent?: React.ReactChild;
    onClick?: (event: React.MouseEvent) => void;
    href?: string;
    link?: string;
    target?: any;
}

export const Dropdown = ( { children, items, classes }: DropdownItems ): JSX.Element => {

    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    const handler = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
            setExpanded(false);
        }
    };

    const skipClickHandlerRef = React.useRef(false);
    const setSkipClickHandler = (data: boolean) => {
        skipClickHandlerRef.current = data;
    }
    const clickHandler = (evt: MouseEvent) => {
        if (skipClickHandlerRef.current) {
            // skip only once
            setSkipClickHandler(false);
        } else {
            setExpanded(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handler);
        window.addEventListener('click', clickHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', handler);
            window.removeEventListener('click', clickHandler);
        };
    }, []);
    // Default 'children' is the three dots hamburger button.
    children = children || <svg className="w-8 h-8 p-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Actions</title><g fill="currentColor" transform="rotate(90 12 12)"><circle cx="1" cy="1" r="2" transform="translate(5 11)" /><circle cx="1" cy="1" r="2" transform="translate(11 11)" /><circle cx="1" cy="1" r="2" transform="translate(17 11)" /></g></svg>;
    const font = "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100";
    const menuId = String(Math.random());

    return (
        <div className="relative cursor-pointer">
            <div onClick={(e) => {
                toggleExpanded();
                // Don't use `e.stopPropagation();` because that prevents that clicks on other context menus closes this one.
                setSkipClickHandler(true);
            }}>
                {children}
            </div>
            { expanded ?
                <div className={`mt-2 z-50 bg-white dark:bg-gray-900 absolute flex flex-col border border-gray-200 dark:border-gray-800 rounded-lg truncated ${classes || 'w-48 right-0'}`}>
                    {items.length === 0
                        ? <p className="px-4 py-3">No actions available</p>
                        : items.map((e, index) => {
                            const clickable = e.href || e.onClick || e.link;
                            const entry = <div className={`px-4 flex py-3 ${clickable ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''} ${e.active ? 'bg-gray-50 dark:bg-gray-800' : ''} ${index === 0 ? 'rounded-t-lg' : ''} ${index === items.length - 1 ? 'rounded-b-lg' : ''} text-sm leading-1 ${e.customFontStyle || font} ${e.separator ? ' border-b border-gray-200 dark:border-gray-800' : ''}`} title={e.title}>
                                {e.customContent || <><div className="truncate w-52">{e.title}</div><div className="flex-1"></div>{e.active ? <div className="pl-1 font-semibold">&#x2713;</div> : null}</>}
                            </div>
                            const key = `entry-${menuId}-${index}-${e.title}`;
                            if (e.link) {
                                return <Link key={key} to={e.link} onClick={e.onClick} target={e.target}> {entry} </Link>;
                            } else if (e.href) {
                                return <a key={key} href={e.href} onClick={e.onClick} target={e.target}>
                                    {entry}
                                </a>;
                            } else {
                                return <div key={key} onClick={e.onClick}>
                                    {entry}
                                </div>
                            }
                        })}
                </div>
                :
                null
            }
        </div>
    );
};
