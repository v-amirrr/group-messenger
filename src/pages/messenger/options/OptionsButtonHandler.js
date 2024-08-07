import React from 'react';
import AnalogClock from '../../../common/AnalogClock';
import ChatButtons from './ChatButtons';
import TrashButtons from './TrashButtons';
import OptionsEditMenu from './OptionsEditMenu';
import OptionsEditConfirmation from './OptionsEditConfirmation';
import { useSelector } from 'react-redux';
import { useOptions } from '../../../hooks/useOptions';
import { useSelect } from '../../../hooks/useSelect';
import { useModal } from '../../../hooks/useModal';
import { useNotification } from '../../../hooks/useNotification';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { optionsVariants, optionLocalVariants, optionNonLocalVariants } from '../../../config/varitans';

const OptionsButtonHandler = ({ type, optionsClickHandler, closeOptions }) => {
    const { inputReply } = useSelector(store => store.appStore);
    const { editText: editTextRedux, optionsMessage, showEditButtons, showOptionsButtons } = useSelector(store => store.optionsStore);
    const {
        copy,
        reply,
        editText,
        moveToTrash,
        restore,
        activeEditButtons,
        deactivateEditButtons,
        activateEditText,
        deactivateEditText,
        activateOptionsButtons,
        deactivateOptionsButtons,
        activateEditReply,
    } = useOptions();
    const { openModal } = useModal();
    const { select } = useSelect();
    const { openNotification } = useNotification();

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
                }, 200);
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
                activeEditButtons();
                deactivateOptionsButtons();
                break;
            case 'EDIT_BACK':
                deactivateEditButtons();
                activateOptionsButtons();
                break;
            case 'EDIT_TEXT':
                activateEditText();
                break;
            case 'EDIT_CANCEL':
                deactivateEditText();
                break;
            case 'EDIT_OK':
                editText(optionsMessage?.id);
                break;
            case 'EDIT_REPLY':
                optionsClickHandler(null, 'CHAT');
                setTimeout(() => {
                    activateEditReply(optionsMessage?.id, optionsMessage?.replyTo?.id);
                }, 350);
                break;
            case 'TRASH':
                moveToTrash(optionsMessage?.id);
                optionsClickHandler(null, 'TRASH');
                break;
            case 'DELETE':
                closeOptions();
                setTimeout(() => {
                    openModal("PERMENANT_DELETE_CONFIRMATION", [optionsMessage])
                }, 400);
                break;
            case 'RESTORE':
                restore(optionsMessage?.id);
                openNotification('Message restored', 'GENERAL');
                optionsClickHandler(null, 'RESTORE');
                break;
        }
    };

    return (
        <>
            <OptionsButtonHandlerContainer
                initial='hidden' animate='visible' exit='exit' variants={optionsVariants}
                styles={{ isLocalMessage: optionsMessage?.isLocalMessage }}
            >
                <AnimatePresence exitBeforeEnter>
                    {
                        showEditButtons && !editTextRedux ?
                        <OptionsEditMenu
                            key='OptionsButtonsEdit'
                            optionClick={optionClick}
                            setVariants={setVariants}
                            optionsMessageReplyTo={optionsMessage?.replyTo?.id}
                        /> :
                        showEditButtons && editTextRedux ?
                        <OptionsEditConfirmation
                            key='OptionsButtonsEditing'
                            optionClick={optionClick}
                            setVariants={setVariants}
                        /> :
                        showOptionsButtons ?
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
                            <motion.div className='time' key='time' initial='hidden' animate='visible' exit='exit' variants={setVariants()}>
                                <AnalogClock time={optionsMessage?.time} scale={1.3} />
                                <p>
                                    <span>{optionsMessage?.time?.hour}:{optionsMessage?.time?.minute}</span>
                                    <span className='format'>{optionsMessage?.time?.format}</span>
                                </p>
                            </motion.div>
                        </> : ''
                    }
                </AnimatePresence>
            </OptionsButtonHandlerContainer>
        </>
    );
};

const OptionsButtonHandlerContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.styles.isLocalMessage ? 'row-reverse' : 'row'};

    .reply, .copy, .edit, .trash, .select, .time, .delete, .restore, .edit-text, .edit-reply, .edit-back, .edit-ok {
        position: relative;
        top: 2.5rem;
        height: 2.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        margin: .2rem 0 0 .2rem;
        padding: 0 .6rem 0 .5rem;
        background-color: var(--bg);
        cursor: pointer;
        transition: background .2s;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            margin-right: .2rem;
        }

        p {
            font-size: 1rem;
            font-weight: 400;
            white-space: nowrap;
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--bg-hover);
            }
        }
    }

    .time {
        cursor: auto;
        border: none;

        p {
            transform: scale(1);
            opacity: 1;
            letter-spacing: 0px;
            margin-left: .3rem;

            .format {
                margin-left: .2rem;
            }
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--bg);
            }
        }
    }

    .restore {
        i {
            font-size: 1rem;
        }
    }

    .delete {
        background-color: #ff000030;
        color: var(--red);

        i {
            font-size: 1.3rem;
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #ff000050;
            }
        }
    }

    .edit-text {
        i {
            font-size: 1.4rem;
        }
    }

    .edit-back {
        padding: 0;
        width: 2.25rem;

        i {
            margin: 0;
            font-size: 2.2rem;
        }
    }

    .edit-ok {
        padding: .3rem;
        width: 2.25rem;

        i {
            margin: 0;
        }
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        justify-content: flex-start;

        .reply, .copy, .edit, .trash, .select, .time, .delete, .restore {
            top: 4.9rem;
        }
    }
`;

export default OptionsButtonHandler;