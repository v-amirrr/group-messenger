import React, { useRef } from 'react';
import DeletePopup from './DeletePopup';
import EditPopup from './EditPopup';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const popupPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren" } }
};

const popupPageContainer = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const Popup = ({ popupMessageId, popupMessageText, popupName, popupMessageReplyTo }) => {

    const popupPage = useRef();

    const { closePopup } = useMessageOptions();

    const closePopupByTap = e => {
        if (!popupPage.current.contains(e.target)) {
            closePopup();
        }
    };

    return (
        <>
            <PopupPage initial='hidden' animate='visible' exit='exit' variants={popupPageVariants} onClick={(e) => closePopupByTap(e)}>
                <PopupContainer variants={popupPageContainer} ref={popupPage}>
                    {popupName == "DELETE_POPUP" ?
                    <DeletePopup popupMessageId={popupMessageId} />
                    : popupName == "EDIT_POPUP" ? 
                    <EditPopup popupMessageId={popupMessageId} popupMessageText={popupMessageText} popupMessageReplyTo={popupMessageReplyTo} />
                    : ""}
                </PopupContainer>
            </PopupPage>
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
    backdrop-filter: blur(20px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(100%);
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
    border-radius: 25px;
    position: relative;

    p {
        font-weight: 200;
    }

    .buttons {
        margin-top: 2rem;

        .edit, .delete, .cancel {
            border: none;
            border-radius: 10px;
            background-color: var(--popup-buttons);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px 0px;
            margin: 0 .3rem;
            width: 5rem;
            height: 2.3rem;
            font-size: 1rem;
            font-weight: 600;
            font-family: "Outfit", sans-serif;
            cursor: pointer;
            user-select: none;
            transition: background-color .4s;
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

        p {
            font-size: .8rem;
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