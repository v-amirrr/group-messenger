import React from 'react';
import AnalogClock from './common/AnalogClock';
import { useSelector } from 'react-redux';
import { useOptions } from '../hooks/useOptions';
import { useSelect } from '../hooks/useSelect';
import { useModal } from '../hooks/useModal';
import { useNotification } from '../hooks/useNotification';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import { BiSelectMultiple } from 'react-icons/bi';
import { TbTrashX } from 'react-icons/tb';
import { FaTrashRestore } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { optionsVariants, optionLocalVariants, optionNonLocalVariants } from '../config/varitans';

const OptionsButtons = ({ type, optionsMessage, closeOptions }) => {
    const { enterAsAGuest } = useSelector(store => store.userStore);
    const { inputReply } = useSelector(store => store.appStore);
    const { copy, reply, moveToTrash, restore } = useOptions();
    const { openModal } = useModal();
    const { select } = useSelect();
    const { openNotification } = useNotification();

    const setVariants = () => optionsMessage?.isLocalMessage ? optionLocalVariants : optionNonLocalVariants;

    const optionClick = (option) => {
        switch (option) {
            case 'REPLY':
                setTimeout(() => {
                    reply(
                        optionsMessage?.id,
                        optionsMessage?.plainText,
                        optionsMessage?.username,
                    );
                }, 200);
                break;
            case 'SELECT':
                setTimeout(() => {
                    select({
                        id: optionsMessage?.id,
                        plainText: optionsMessage?.plainText,
                        isLocalMessage: optionsMessage?.isLocalMessage
                    });
                }, 450);
                break;
            case 'COPY':
                copy(optionsMessage?.plainText);
                break;
            case 'EDIT':
                setTimeout(() => {
                    openModal('EDIT', [optionsMessage]);
                }, 400);
                break;
            case 'TRASH':
                moveToTrash(optionsMessage?.id);
                closeOptions({ type: 'TRASH' });
                break;
            case 'DELETE':
                setTimeout(() => {
                    openModal("PERMENANT_DELETE_CONFIRMATION", [optionsMessage])
                }, 400);
                break;
            case 'RESTORE':
                restore(optionsMessage?.id);
                openNotification('Message restored', 'GENERAL');
                closeOptions({ type: 'RESTORE' });
                break;
        }
    };

    return (
        <>
            <OptionsButtonsContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={optionsVariants}
                localmessage={optionsMessage?.isLocalMessage ? 1 : 0}
                guest={enterAsAGuest ? 1 : 0}
                unreply={inputReply?.id == optionsMessage?.id ? 1 : 0}
                type={type}
            >
                {
                    type == 'TRASH' ?
                    <>
                        <motion.div
                            className='copy'
                            onClick={() => optionClick('COPY')}
                            variants={setVariants()}
                        >
                            <i><AiFillCopy /></i>
                            <p>Copy</p>
                        </motion.div>
                        <motion.div
                            className='select'
                            onClick={() => optionClick('SELECT')}
                            variants={setVariants()}
                        >
                            <i><BiSelectMultiple /></i>
                            <p>Select</p>
                        </motion.div>
                        <motion.div
                            className='restore'
                            onClick={() => optionClick('RESTORE')}
                            variants={setVariants()}
                        >
                            <i><FaTrashRestore /></i>
                            <p>Restore</p>
                        </motion.div>
                        <motion.div
                            className='delete'
                            onClick={() => optionClick('DELETE')}
                            variants={setVariants()}
                        >
                            <i><TbTrashX /></i>
                            <p>Delete</p>
                        </motion.div>
                    </> :
                    <>
                        <motion.div
                            className='reply'
                            onClick={() => optionClick('REPLY')}
                            variants={setVariants()}
                        >
                            <i><BsReplyFill /></i>
                            <p>{inputReply?.id == optionsMessage?.id ? 'Unreply' : 'Reply'}</p>
                        </motion.div>
                        <motion.div
                            className='select'
                            onClick={() => optionClick('SELECT')}
                            variants={setVariants()}
                        >
                            <i><BiSelectMultiple /></i>
                            <p>Select</p>
                        </motion.div>
                        <motion.div
                            className='copy'
                            onClick={() => optionClick('COPY')}
                            variants={setVariants()}
                        >
                            <i><AiFillCopy /></i>
                            <p>Copy</p>
                        </motion.div>
                        {
                            optionsMessage?.isLocalMessage ?
                            <>
                                <motion.div
                                    className='edit'
                                    onClick={() => optionClick('EDIT')}
                                    variants={setVariants()}
                                >
                                    <i><AiFillEdit /></i>
                                    <p>Edit</p>
                                </motion.div>
                                <motion.div
                                    className='trash'
                                    onClick={() => optionClick('TRASH')}
                                    variants={setVariants()}
                                >
                                    <i><AiFillDelete /></i>
                                    <p>Delete</p>
                                </motion.div>
                            </> : ''
                        }
                    </>
                }
                <motion.div
                    className='time'
                    variants={setVariants()}
                >
                    <AnalogClock time={optionsMessage?.time} scale={1.3} />
                    <p>
                        <span>{optionsMessage?.time?.hour}:{optionsMessage?.time?.minute}</span>
                        <span className='format'>{optionsMessage?.time?.format}</span>
                    </p>
                </motion.div>
            </OptionsButtonsContainer>
        </>
    );
};

const OptionsButtonsContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.localmessage ? 'row-reverse' : 'row'};

    .reply, .copy, .edit, .trash, .select, .time, .delete, .restore {
        position: relative;
        top: 2.5rem;
        background-color: var(--bg);
        margin: .2rem 0 0 .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        height: 2.25rem;
        padding: 0 .6rem 0 .5rem;
        cursor: pointer;
        transition: background .2s;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
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

    @media (max-width: 768px) {
        flex-wrap: wrap;
        justify-content: flex-start;

        .reply, .copy, .edit, .trash, .select, .time, .delete, .restore {
            top: 4.9rem;
        }
    }
`;

export default OptionsButtons;