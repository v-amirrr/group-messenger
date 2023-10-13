import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DeletePopup from './DeletePopup';
import EditPopup from './EditPopup';
import Notification from '../Notification';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { popupPageVariants, popupContainerVariants } from '../../config/varitans';

const Popup = () => {
    const { popupShow, popupName, popupMessages, popupMessagesSelected, popupMessageReplyTo } = useSelector((store) => store.popupStore);
    const { closePopup } = useMessageOptions();

    const popupPage = useRef();

    const [editReplyOpen, setEditReplyOpen] = useState(false);

    const closePopupByTap = (e) => {
        if (editReplyOpen) {
            setEditReplyOpen(false);
            setTimeout(() => {
                if (!popupPage.current.contains(e.target)) {
                    closePopup();
                }
            }, 500);
        } else {
            if (!popupPage.current.contains(e.target)) {
                closePopup();
            }
        }
    };

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {popupShow ? (
                    <PopupPage
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={popupPageVariants}
                        onClick={(e) => closePopupByTap(e)}
                    >
                        <Notification />
                        <PopupContainer
                            variants={popupContainerVariants}
                            ref={popupPage}
                        >
                            {
                                popupName == 'DELETE_POPUP' ?
                                <DeletePopup popupMessages={popupMessages} />
                                : popupName == 'EDIT_POPUP' ?
                                <EditPopup
                                    popupMessages={popupMessages}
                                    popupMessagesSelected={
                                        popupMessagesSelected
                                    }
                                    popupMessageReplyTo={popupMessageReplyTo}
                                    editReplyOpen={editReplyOpen}
                                    setEditReplyOpen={setEditReplyOpen}
                                />
                                : ''
                            }
                        </PopupContainer>
                    </PopupPage>
                ) : (
                    ''
                )}
            </AnimatePresence>
        </>
    );
};

const PopupPage = styled(motion.section)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000088;
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    z-index: 3;
    color: var(--normal-color);
`;

const PopupContainer = styled(motion.div)`
    padding: 1.2rem 1.5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff04;
    border: solid 1.5px #ffffff14;
    border-radius: 25px;
    box-shadow: var(--normal-shadow);
    position: relative;

    .buttons {
        margin-top: 1.5rem;

        .edit,
        .delete,
        .cancel {
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
            transition: background-color 0.2s;

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

        .edit {
            color: #00ff00;
            background-color: #00ff0010;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: #00ff0020;
                }
            }
        }
    }

    @media (max-width: 768px) {
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
`;

export default Popup;
