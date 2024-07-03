import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import ChangeUsernameModal from './ChangeUsernameModal';
import { useModal } from '../../hooks/useModal';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { popupPageVariants, popupContainerVariants } from '../../config/varitans';

const Modal = () => {
    const { modal } = useSelector(store => store.appStore);
    const { user } = useSelector(store => store.userStore);
    const popupPageRef = useRef();
    const { closeModal } = useModal();
    const [editReplyOpen, setEditReplyOpen] = useState(false);

    const closePopupByTap = (e) => {
        if (!popupPageRef?.current?.contains(e.target)) {
            if (editReplyOpen) {
                setEditReplyOpen(false);
            } else {
                closeModal();
            }
        }
    };

    return (
        <>
            <AnimatePresence>
                {
                    modal?.show ?
                    <ModalContainer
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={popupPageVariants}
                        onClick={(e) => closePopupByTap(e)}
                    >
                        <motion.div className='modal' variants={popupContainerVariants} ref={popupPageRef}>
                            {
                                modal?.type == 'PERMENANT_DELETE_CONFIRMATION' ?
                                <DeleteModal modalMessages={modal?.messages} /> :
                                modal?.type == 'EDIT' ?
                                <EditModal
                                    modalMessages={modal?.messages}
                                    modalEditedReply={modal?.editedReply}
                                    editReplyOpen={editReplyOpen}
                                    setEditReplyOpen={setEditReplyOpen}
                                /> :
                                modal?.type == 'CHANGE_USERNAME_CONFIRMATION' ?
                                <ChangeUsernameModal
                                    closePopup={closeModal}
                                    newUsername={modal?.editedUsername}
                                    oldUsername={user?.displayName}
                                />
                                : ''
                            }
                        </motion.div>
                    </ModalContainer>
                    : ''
                }
            </AnimatePresence>
        </>
    );
};

const ModalContainer = styled(motion.section)`
    position: absolute;
    width: 100vw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000088;
    z-index: 3;

    .modal {
        z-index: 4;
        position: relative;
        padding: 1.2rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: var(--border);
        border-radius: 25px;
        box-shadow: var(--shadow);
        backdrop-filter: var(--glass);

        .modal-message {
            font-size: 1rem;
            font-weight: 400;
        }

        .modal-buttons {
            margin-top: 1.5rem;

            .edit, .delete, .cancel, .change {
                border: none;
                border-radius: 50px;
                background-color: var(--bg);
                box-shadow: var(--shadow);
                margin: 0 0.3rem;
                width: 5rem;
                height: 2.3rem;
                font-size: 1rem;
                font-weight: 400;
                cursor: pointer;
                transition: background .2s;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: var(--bg-hover);
                    }
                }
            }

            .delete {
                color: var(--red);
                background-color: #ff000030;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: #ff000050;
                    }
                }
            }

            .edit, .change {
                color: var(--green);
                background-color: #00ff0030;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: #00ff0050;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .modal {
            padding: 1rem;
            max-width: 20rem;
            border-radius: 20px;

            textarea {
                font-size: 1rem;
                width: 16rem;
            }

            .modal-buttons {
                margin-top: 1.5rem;

                button {
                    font-size: 0.8rem;
                }
            }
        }
    }
`;

export default Modal;