import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import DeletePopup from './DeletePopup';
import EditPopup from './EditPopup';
import Notification from '../Notification';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { popupPageVariants, popupPageContainer } from '../../config/varitans';

const Popup = () => {

    const popupPage = useRef();

    const { closePopup } = useMessageOptions();

    const { popupShow, popupName, popupMessages, popupMessagesSelected, popupMessageReplyTo } = useSelector(store => store.popupStore);

    const closePopupByTap = e => {
        if (!popupPage.current.contains(e.target)) {
            closePopup();
        }
    };

    return (
        <>
            {createPortal(
                <AnimatePresence exitBeforeEnter>
                    {popupShow ?
                    <PopupPage initial='hidden' animate='visible' exit='exit' variants={popupPageVariants} onClick={(e) => closePopupByTap(e)}>
                        <Notification />
                        <PopupContainer variants={popupPageContainer} ref={popupPage}>
                            {popupName == "DELETE_POPUP" ?
                            <DeletePopup popupMessages={popupMessages} />
                            : popupName == "EDIT_POPUP" ?
                            <EditPopup popupMessages={popupMessages} popupMessagesSelected={popupMessagesSelected} popupMessageReplyTo={popupMessageReplyTo} />
                            : ""}
                        </PopupContainer>
                    </PopupPage>
                    : ""}
                </AnimatePresence>,
                document.getElementById('popup')
            )}
        </>
    );
};

const PopupPage = styled(motion.section)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--page-first);
    backdrop-filter: var(--glass-second);
    -webkit-backdrop-filter: var(--glass-second);
    z-index: 9;
`;

const PopupContainer = styled(motion.div)`
    padding: 2rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--popup);
    border: var(--border-first);
    border-radius: var(--radius-third);
    box-shadow: var(--shadow-first);
    position: relative;

    .buttons {
        margin-top: 2rem;

        .edit, .delete, .cancel {
            border: none;
            border-radius: var(--radius-second);
            background-color: var(--button);
            box-shadow: var(--shadow-first);
            margin: 0 .3rem;
            width: 5rem;
            height: 2.3rem;
            font-size: 1rem;
            font-weight: var(--text-boldness-second);
            cursor: pointer;
            transition: background-color .2s;
            color: #fff;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--button-hover);
                }
            }
        }

        .delete {
            color: #ff0000;
            background-color: #ff000010;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: #ff000020;
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
        padding: 1.5rem;

        textarea {
            font-size: .8rem;
            width: 15rem;
        }

        .buttons {
            margin-top: 1.5rem;

            button {
                font-size: .8rem;
            }
        }
    }
`;

export default Popup;