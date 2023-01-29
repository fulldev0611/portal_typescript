import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export const Modal = ({ open, setOpen, ModalContent, props }) => {

    Object.assign(props, { setOpen })
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                open={open}
                onClose={setOpen}
            >
                { React.cloneElement(<ModalContent />, props) }
            </Dialog>
        </Transition.Root>
    )
}