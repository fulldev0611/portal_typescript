import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getWorkspaces, getWorkspaceStatus } from "app/actions/workspaces";
import { getTemplates } from "app/actions/templates";
import { WorkspaceEntry } from "./WorkspaceEntry";
import { RootState } from "app/reducers";
import { Header } from "../Shared/Header";
import { Search } from "./Search";
import { useLocation } from "react-router-dom";
import { NoWorkspaces } from "./NoWorkspaces";
import { TableRowLoading } from "../Shared/TableRowLoading";
import { Workspace } from "types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Workspaces = (): JSX.Element => {
    const dispatch = useDispatch();
    const [call, setCall] = useState(false);
    const { workspaces: { workspaces, loading: workspacesLoading, queried: workspacesQueried, create: { loading: createLoading, error: createError }, open: { loading: openLoading, error: openError, response: openResponse } }, templates: { templates, loading: templatesLoading, queried: templatesQueried } } = useSelector((state: RootState) => state);
    const loc = useLocation();
    const typeMapping = {
        '/workspaces' : 'workspaces',
        '/workspaces/templates': 'templates',
    };

    const needStatusCheck = (spaces: Workspace[]) => {
        return spaces.find( (w) => w.status === 'pending' || w.status === 'created');
    };

    useEffect(() => {
        const getUpdatedWorkspaces = () => {
            if (typeMapping[loc.pathname] === 'workspaces' && workspaces.length && needStatusCheck(workspaces)) {
                getWorkspaceStatus(dispatch);
                setCall(false);
            }
        }
        if (workspaces.length === 0 && !workspacesQueried && !workspacesLoading) {
            getWorkspaces(dispatch);
        }

        if (templates.length === 0 && !templatesQueried && !templatesLoading) {
            getTemplates(dispatch);
        }

        if (!createLoading && createError) {
            toast("There was an issue creating your workspace");
        }

        // Need to disbale actions while open is loading...
        // if (openLoading) {
        //     console.log('Open loading...');
        // }

        if (!openLoading && openError) {
            toast.error("Unable to open Workspace");
        }

        if (!openLoading && !openError && openResponse.status === 'ready' && openResponse.workspace.workspaceUrl) {
            console.log('Opening....');
            window.open(openResponse.workspace.workspaceUrl);
        }


        const interval = setInterval(() => getUpdatedWorkspaces(), 25000)
        return () => {
            clearInterval(interval);
        }
    }, [workspaces, workspacesLoading, templates, templatesLoading, workspacesQueried, templatesQueried, call, openLoading, openError]);

    return (
    <>
        <Header />
        <ToastContainer />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Search type={typeMapping[loc.pathname]}/>
            {
                typeMapping[loc.pathname] === 'workspaces' && workspacesLoading
                ? <TableRowLoading />
                : ''
            }
            {
                typeMapping[loc.pathname] === 'templates' && templatesLoading
                ? <TableRowLoading />
                : ''
            }
            {
                typeMapping[loc.pathname] === 'workspaces' && !workspacesLoading
                ? workspaces.map( (ws) => {
                    return <WorkspaceEntry id={ ws.id } name={ ws.name } status={ ws.status } description={ ws.description } url={ ws.workspaceUrl } type={typeMapping[loc.pathname]} key={ws.id}/>
                }) 
                : ''

            }
            {
                typeMapping[loc.pathname] === 'templates' && !templatesLoading
                ? templates.map( (template) => {
                    return <WorkspaceEntry id={ template.id } name={ template.name } description={ template.description } version={ template.version } type={typeMapping[loc.pathname]} key={template.id}/>
                })
                : ''
            }
            {
                ( typeMapping[loc.pathname] === 'workspaces' && !workspacesLoading && workspaces.length === 0 )
                ? <NoWorkspaces />
                : ''
            }
        </div>
    </>
    );
};
