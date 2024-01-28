import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DeletePopup from './DeletePopup';
import EditPopup from './EditPopup';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { popupPageVariants, popupContainerVariants } from '../../config/varitans';
import ChangeUsernamePopup from './ChangeUsernamePopup';

const Popup = () => {
    const { popupShow, popupName, popupMessages, popupMessagesSelected, popupMessageReplyTo } = useSelector(store => store.popupStore);
    const { user } = useSelector(store => store.userStore);
    const popupPage = useRef();
    const { closePopup } = useMessageOptions();
    const [editReplyOpen, setEditReplyOpen] = useState(false);

    const closePopupByTap = (e) => {
        if (!popupPage.current.contains(e.target)) {
            if (editReplyOpen) {
                setEditReplyOpen(false);
            } else {
                closePopup();
            }
        }
    };

    return (
        <>
            <AnimatePresence>
                {
                    popupShow ?
                    <PopupContainer
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={popupPageVariants}
                        onClick={(e) => closePopupByTap(e)}
                    >
                        <motion.div className='popup' variants={popupContainerVariants} ref={popupPage}>
                            {
                                popupName == 'DELETE_POPUP' ?
                                <DeletePopup
                                    popupMessages={popupMessages}
                                /> :
                                popupName == 'EDIT_POPUP' ?
                                <EditPopup
                                    popupMessages={popupMessages}
                                    popupMessagesSelected={popupMessagesSelected}
                                    popupMessageReplyTo={popupMessageReplyTo}
                                    editReplyOpen={editReplyOpen}
                                    setEditReplyOpen={setEditReplyOpen}
                                /> :
                                popupName == 'CHANGE_USERNAME_POPUP' ?
                                <ChangeUsernamePopup
                                    closePopup={closePopup}
                                    newUsername={popupMessages}
                                    oldUsername={user?.displayName}
                                />
                                : ''
                            }
                        </motion.div>
                    </PopupContainer>
                    : ''
                }
            </AnimatePresence>
        </>
    );
};

const PopupContainer = styled(motion.section)`
    position: absolute;
    width: 100vw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000088;
    z-index: 3;
    color: var(--normal-color);

    .popup {
        padding: 1.2rem 1.5rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #ffffff04;
        border: solid 2.5px #ffffff20;
        border-radius: 25px;
        box-shadow: var(--bold-shadow);
        backdrop-filter: var(--bold-glass);
        -webkit-backdrop-filter: var(--bold-glass);
        position: relative;

        .buttons {
            margin-top: 1.5rem;

            .edit,
            .delete,
            .cancel,
            .change {
                border: none;
                border-radius: 50px;
                background-color: #ffffff08;
                box-shadow: var(--normal-shadow);
                margin: 0 0.3rem;
                width: 5rem;
                height: 2.3rem;
                font-size: 1rem;
                font-weight: 400;
                cursor: pointer;
                transition: background .2s;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: #ffffff14;
                    }
                }
            }

            .delete {
                color: #ff0000;
                background-color: #ff000040;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: #ff000050;
                    }
                }
            }

            .edit, .change {
                color: #00ff00;
                background-color: #00ff0010;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: #00ff0020;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .popup {
            padding: 1rem;

            textarea {
                font-size: 1rem;
                width: 16rem;
            }

            .buttons {
                margin-top: 1.5rem;

                button {
                    font-size: 0.8rem;
                }
            }
        }
    }
`;

export default Popup;
