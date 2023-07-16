import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import DeletePopup from './DeletePopup';
import EditPopup from './EditPopup';
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
    background-color: var(--popup);
    backdrop-filter: var(--popup-blur);
    -webkit-backdrop-filter: var(--popup-blur);
    z-index: 9;
`;

const PopupContainer = styled(motion.div)`
    padding: 2rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--popup-container);
    border-radius: var(--popup-border-radius);
    position: relative;

    .buttons {
        margin-top: 2rem;

        .edit, .delete, .cancel {
            border: none;
            border-radius: var(--popup-button-border-radius);
            background-color: var(--popup-buttons);
            margin: 0 .3rem;
            width: 5rem;
            height: 2.3rem;
            font-size: 1rem;
            font-weight: 600;
            font-family: "Outfit", sans-serif;
            cursor: pointer;
            user-select: none;
            transition: background-color .3s;
            color: #fff;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--popup-buttons-hover);
                }
            }
        }

        .delete {
            color: #ff0000;
        }

        .edit {
            color: #00ff00;
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