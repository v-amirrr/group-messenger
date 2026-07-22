import React from 'react';
import ChatButtons from './ChatButtons';
import TrashButtons from './TrashButtons';
import OptionsEditMenu from './OptionsEditMenu';
import OptionsEditConfirmation from './OptionsEditConfirmation';
import DetailsButtons from './DetailsButtons';
import { useDispatch, useSelector } from 'react-redux';
import { useOptions } from '../../../hooks/useOptions';
import { useSelect } from '../../../hooks/useSelect';
import { useModal } from '../../../hooks/useModal';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { optionsVariants, optionLocalVariants, optionNonLocalVariants } from '../../../config/varitans';
import { openToast } from '../../../functions/ToastHandler';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const OptionsButtonHandler = ({ type, optionsClickHandler, closeOptions }) => {
    const dispatch = useDispatch();
    const { inputReply } = useSelector(store => store.appStore);
    const { optionsMessage, optionsButtonsStage } = useSelector(store => store.optionsStore);
    const { copy, reply, editText, moveToTrash, restore, changeButtonsStage, activateEditReply } = useOptions();
    const { openModal } = useModal();
    const { select } = useSelect();

    const setVariants = () => optionsMessage?.isLocalMessage ? optionLocalVariants : optionNonLocalVariants;

    const optionClick = (option) => {
        switch (option) {
            case 'REPLY':
                closeOptions();
                setTimeout(() => {
                    reply(
                        optionsMessage?.id,
                        optionsMessage?.plainText,
                        optionsMessage?.username,
                    );
                }, 250);
                break;
            case 'SELECT':
                closeOptions();
                setTimeout(() => {
                    select({
                        id: optionsMessage?.id,
                        plainText: optionsMessage?.plainText,
                        isLocalMessage: optionsMessage?.isLocalMessage
                    });
                }, 450);
                break;
            case 'COPY':
                closeOptions();
                copy(optionsMessage?.plainText);
                break;
            case 'EDIT':
                changeButtonsStage(2);
                break;
            case 'EDIT_BACK':
                changeButtonsStage(1);
                break;
            case 'EDIT_TEXT':
                changeButtonsStage(3);
                break;
            case 'EDIT_CANCEL':
                changeButtonsStage(2);
                break;
            case 'EDIT_OK':
                editText(optionsMessage?.id, closeOptions);
                break;
            case 'EDIT_REPLY':
                optionsClickHandler(null, 'CHAT');
                setTimeout(() => {
                    activateEditReply(optionsMessage?.id, optionsMessage?.replyTo?.id);
                }, 350);
                break;
            case 'TRASH':
                closeOptions();
                setTimeout(() => {
                    moveToTrash(optionsMessage?.id);
                }, 300);
                break;
            case 'DELETE':
                closeOptions();
                setTimeout(() => {
                    openModal("PERMENANT_DELETE_CONFIRMATION", [optionsMessage])
                }, 300);
                break;
            case 'RESTORE':
                closeOptions();
                setTimeout(() => {
                    restore(optionsMessage?.id);
                    openToast(dispatch, 'Message restored', 'GENERAL');
                }, 300);
                break;
        }
    };

    return (
        <OptionsButtonHandlerContainer {...framerMotionAttributes(optionsVariants)} styles={{ isLocalMessage: optionsMessage?.isLocalMessage }}>
            <AnimatePresence exitBeforeEnter>
                {
                    optionsButtonsStage == 2 ?
                    <OptionsEditMenu
                        key='OptionsButtonsEdit'
                        optionClick={optionClick}
                        setVariants={setVariants}
                        optionsMessageReplyTo={optionsMessage?.replyTo?.id}
                    /> :
                    optionsButtonsStage == 3 ?
                    <OptionsEditConfirmation
                        key='OptionsButtonsEditing'
                        optionClick={optionClick}
                        setVariants={setVariants}
                    /> :
                    optionsButtonsStage == 1 ?
                    <>
                        {
                            type == 'TRASH' ?
                            <TrashButtons
                                key='OptionsButtonsTrash'
                                optionClick={optionClick}
                                setVariants={setVariants}
                            /> :
                            <ChatButtons
                                key='OptionsButtonsChat'
                                optionClick={optionClick}
                                setVariants={setVariants}
                                replyAlreadyClicked={inputReply?.id == optionsMessage?.id}
                                isMessageLocal={optionsMessage?.isLocalMessage}
                            />
                        }
                        <DetailsButtons
                            key='OptionsButtonsDetail'
                            time={optionsMessage?.time}
                            setVariants={setVariants}
                        />
                    </> : ''
                }
            </AnimatePresence>
        </OptionsButtonHandlerContainer>
    );
};

const OptionsButtonHandlerContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.styles.isLocalMessage ? 'row-reverse' : 'row'};
    z-index: -1;

    .reply, .copy, .edit, .trash, .select, .details, .delete, .restore, .edit-text, .edit-reply, .edit-back, .edit-ok, .edit-close {
        position: relative;
        top: 2.35rem;
        height: 2.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        margin: .2rem 0 0 .2rem;
        padding: 0 .6rem 0 .5rem;
        background-color: var(--bg);
        box-shadow: var(--shadow);
        border: solid 0.1px #202020;
        cursor: pointer;
        transition: background .2s;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .9rem;
            margin-right: .15rem;
        }

        p {
            font-size: .9rem;
            font-weight: 300;
            white-space: nowrap;
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--bg-hover);
            }
        }
    }

    .details {
        cursor: auto;
        background-color: #ffffff00;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        border: none;
        box-shadow: none;

        .clock, .calendar {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .calendar {
            margin: 0 .8rem 0 0;
            i {
                font-size: 1rem;
                color: #333;
                margin-right: .15rem;
            }
        }

        p {
            letter-spacing: 0px;
            font-size: .5rem;
            font-weight: 200;
            color: var(--grey);

            .format {
                margin-left: .1rem;
            }
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #00000000;
            }
        }
    }

    .delete {
        background-color: #ff000030;
        border: solid 0.1px #500000;
        color: var(--red);

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #ff000050;
            }
        }
    }

    .edit-back {
        padding: 0;
        width: 2.1rem;

        i {
            margin: 0;
            font-size: 1.2rem;
        }
    }

    .edit-close {
        padding: 0;
        width: 2.1rem;

        i {
            margin: 0;
            font-size: 2.2rem;
        }
    }

    .edit-ok {
        padding: .3rem;
        width: 2.1rem;

        i {
            margin: 0;
            font-size: 1.3rem;
        }
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        justify-content: flex-start;

        .reply, .copy, .edit, .trash, .select, .details, .delete, .restore {
            top: ${props => props.styles.isLocalMessage ? '4.65rem' : '2.35rem'};
        }
    }
`;

export default OptionsButtonHandler;