import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Col } from '../DataTable/Col';
import { ColDropdown } from '../DataTable/ColDropdown';
import { DropdownItem } from '../DataTable/DropDown';
import { Row } from '../DataTable/Row';
import { createWorkspace, deleteWorkspace, editWorkspace, openWorkspace } from 'app/actions/workspaces';
import { useDispatch } from 'react-redux';
import { statuses } from 'app/utils/constants';
import { Modal } from '../Shared/Modal';
import { DeleteWorkspaceModalContent } from './DeleteWorkspaceModalContent';
import { EditWorkspaceModalContent } from './EditWorkspaceModalContent';
import { CreateWorkspaceModalContent } from './CreateWorkspaceModalContent';
import { useHistory } from 'react-router-dom';

export const WorkspaceEntry = ({ id, name, status='', description, url='', version='', type }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [openDeleteModal, _setOpenDeleteModal] = useState(false);
    const [openEditModal, _setOpenEditModal] = useState(false);
    const [openCreateModal, _setOpenCreateModal] = useState(false);
    const getBadgeColor = (status: string) => {
        const statusObj = _.find(statuses, { status }) || { color: 'gray' }
        return statusObj.color;
    };

    const handleDelete = () => {
        deleteWorkspace(dispatch, id);
    };

    const handleEdit = (fields) => {
        editWorkspace(dispatch, id, fields);
    };

    const handleCreate = (fields) => {
        createWorkspace(dispatch, id, fields);
        history.push('/workspaces');
    }

    const handleOpen = () => {
        openWorkspace(dispatch, id);
    }

    const setOpenDeleteModal = () => {
        _setOpenDeleteModal(true);
    }

    const setOpenEditModal = () => {
        _setOpenEditModal(true);
    }

    const setOpenCreateModal = () => {
        _setOpenCreateModal(true);
    }

    const workspaceItems: DropdownItem[] = [
        {
            title: 'Open',
            onClick: () => handleOpen()
        },
        {
            title: 'Edit',
            href: "",
            onClick: () => { setOpenEditModal() }
        },
        {
            title: 'Delete',
            customFontStyle: 'text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300',
            onClick: () => { setOpenDeleteModal() }
        }
    
    ];

    const templateItems: DropdownItem[] = [
        {
            title: 'Create',
            onClick: () => { setOpenCreateModal() }
        },
    ];

    const items = type === 'workspaces' ? workspaceItems : templateItems;

    const deleteModalProps = {
        name,
        handleDelete,
    }
    const editModalProps = {
        name,
        handleEdit,
        description
    }

    const createModalProps = {
        handleCreate,
    }

    const pulse = status === 'pending' ? 'animate-pulse' : '';

    useEffect( () => {

    }, [])

    return (
        <>
        <Modal open={openDeleteModal} setOpen={_setOpenDeleteModal} ModalContent={DeleteWorkspaceModalContent} props={deleteModalProps} />
        <Modal open={openEditModal} setOpen={_setOpenEditModal} ModalContent={EditWorkspaceModalContent} props={editModalProps} />
        <Modal open={openCreateModal} setOpen={_setOpenCreateModal} ModalContent={CreateWorkspaceModalContent} props={createModalProps} />
        <Row className="bg-white shadow rounded whitespace-nowrap py-6 px-6 hover:bg-blue-100 mb-2">
            <Col className="w-3/12 flex flex-col my-auto">
                <div className="text-gray-500 dark:text-gray-400 overflow-ellipsis truncate">{name}</div>
                {type === 'workspaces' ? <a href={url} className='cursor-pointer'>
                    <div className="text-sm text-gray-400 dark:text-gray-500 overflow-ellipsis truncate hover:text-blue-600 dark:hover:text-blue-400">{id}</div>
                </a> : ''}
            </Col>
            <Col className="w-4/12 flex flex-col my-auto">
                <div className="text-gray-500 dark:text-gray-400 overflow-ellipsis truncate">{description}</div>
            </Col>
            <Col className="my-auto">
                {
                    type === 'workspaces' 
                    ? <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium border-2 border-${getBadgeColor(status)}-400 bg-white text-${getBadgeColor(status)}-400`}>
                        <svg className={`-ml-1 mr-1.5 h-2 w-2 text-${getBadgeColor(status)}-400 ${pulse}`} fill="currentColor" viewBox="0 0 8 8">
                            <circle cx={4} cy={4} r={3} />
                        </svg>
                        {status}
                    </span>
                    : <div className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800`}>{version}</div>
                }
            </Col>
            <ColDropdown items={items} />
        </Row>
        </>
    );
}
