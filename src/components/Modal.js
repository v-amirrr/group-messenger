import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import DeleteModal from './DeleteModal';
import ChangeUsernameModal from './ChangeUsernameModal';
import { useModal } from '../hooks/useModal';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { popupPageVariants, popupContainerVariants } from '../config/varitans';

const Modal = () => {
    const { modalShow, modalName, modalMessages, modalEditedUsername } = useSelector(store => store.modalStore);
    const { user } = useSelector(store => store.userStore);
    const { usernames } = useSelector(store => store.firestoreStore);
    const popupPageRef = useRef();
    const { closeModal } = useModal();

    const closePopupByTap = (e) => {
        if (!popupPageRef?.current?.contains(e.target)) {
            closeModal();
        }
    };

    return (
        <>
            <AnimatePresence>
                {
                    modalShow ?
                    <ModalContainer
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={popupPageVariants}
                        onClick={(e) => closePopupByTap(e)}
                    >
                        <motion.div className='modal' variants={popupContainerVariants} ref={popupPageRef}>
                            {
                                modalName == 'PERMENANT_DELETE_CONFIRMATION' ?
                                <DeleteModal modalMessages={modalMessages} /> :
                                modalName == 'CHANGE_USERNAME_CONFIRMATION' ?
                                <ChangeUsernameModal
                                    closePopup={closeModal}
                                    newUsername={modalEditedUsername}
                                    oldUsername={usernames[user.uid]}
                                /> : ''
                            }
                        </motion.div>
                    </ModalContainer> : ''
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
    backdrop-filter: var(--glass);
    z-index: 9;

    .modal {
        z-index: 4;
        position: relative;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .modal-message {
            font-size: 1rem;
            font-weight: 400;
        }

        .modal-buttons {
            margin-top: 1.5rem;

            .delete, .cancel, .change {
                border: none;
                border-radius: 50px;
                background-color: var(--bg);
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

            .change {
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