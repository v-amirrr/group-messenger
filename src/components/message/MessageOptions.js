import React from 'react';
import { useSelector } from 'react-redux';
import { useOptions } from '../../hooks/useOptions';
import { useSelect } from '../../hooks/useSelect';
import { useModal } from '../../hooks/useModal';
import { useNotification } from '../../hooks/useNotification';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import { BiSelectMultiple } from 'react-icons/bi';
import { TbTrashX } from 'react-icons/tb';
import { FaTrashRestore } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { optionsVariants, optionLocalVariants, optionNonLocalVariants } from '../../config/varitans';

const MessageOptions = ({ options, type }) => {
    const { enterAsAGuest } = useSelector(store => store.userStore);
    const { inputReply } = useSelector(store => store.appStore);
    const { copyMessage, replyMessage, trashMessage, undeleteMessage } = useOptions();
    const { openModal } = useModal();
    const { selectMessage } = useSelect();
    const { openNotification } = useNotification();

    const optionClick = (option) => {
        switch (option) {
            case 'REPLY':
                setTimeout(() => {
                    replyMessage(
                        options?.messageOptions?.id,
                        options?.messageOptions?.plainText,
                        options?.messageOptions?.username,
                    );
                }, 200);
                break;
            case 'SELECT':
                setTimeout(() => {
                    selectMessage({
                        id: options?.messageOptions?.id,
                        plainText: options?.messageOptions?.plainText,
                        isLocalMessage: options?.messageOptions?.isLocalMessage
                    });
                }, 550);
                break;
            case 'COPY':
                copyMessage(options?.messageOptions?.plainText);
                break;
            case 'EDIT':
                setTimeout(() => {
                    openModal('EDIT', [options?.messageOptions]);
                }, 200);
                break;
            case 'TRASH':
                trashMessage(options?.messageOptions?.id);
                options?.closeOptions({ type: 'TRASH' });
                break;
            case 'DELETE':
                setTimeout(() => {
                    openModal("PERMENANT_DELETE_CONFIRMATION", [options?.messageOptions])
                }, 550);
                break;
            case 'RESTORE':
                undeleteMessage(options?.messageOptions?.id);
                openNotification('Message restored.', false, 'RESTORE');
                options?.closeOptions({ type: 'RESTORE' });
                break;
        }
    };

    return (
        <>
            <MessageOptionsContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={optionsVariants}
                localmessage={options?.messageOptions?.isLocalMessage ? 1 : 0}
                guest={enterAsAGuest ? 1 : 0}
                hour={
                    options?.messageOptions?.time?.hour > 12 ?
                    ((options?.messageOptions?.time?.hour - 12) / 12) * 360 + 90 :
                    (options?.messageOptions?.time?.hour / 12) * 360 + 90
                }
                minute={(options?.messageOptions?.time?.minute / 60) * 360 + 90}
                unreply={inputReply?.id == options?.messageOptions?.id ? 1 : 0}
                type={type}
            >
                {
                    type == 'TRASH' ?
                    <>
                        <motion.div
                            className='copy'
                            onClick={() => optionClick('COPY')}
                            variants={optionLocalVariants}
                        >
                            <i><AiFillCopy /></i>
                            <p>Copy</p>
                        </motion.div>
                        <motion.div
                            className='select'
                            onClick={() => optionClick('SELECT')}
                            variants={optionLocalVariants}
                        >
                            <i><BiSelectMultiple /></i>
                            <p>Select</p>
                        </motion.div>
                        <motion.div
                            className='restore'
                            onClick={() => optionClick('RESTORE')}
                            variants={optionLocalVariants}
                        >
                            <i><FaTrashRestore /></i>
                            <p>Restore</p>
                        </motion.div>
                        <motion.div
                            className='delete'
                            onClick={() => optionClick('DELETE')}
                            variants={optionLocalVariants}
                        >
                            <i><TbTrashX /></i>
                            <p>Delete</p>
                        </motion.div>
                    </> :
                    <>
                        <motion.div
                            className='reply'
                            onClick={() => optionClick('REPLY')}
                            variants={
                                options?.messageOptions?.isLocalMessage ?
                                optionLocalVariants :
                                optionNonLocalVariants
                            }
                        >
                            <i><BsReplyFill /></i>
                            <p>{inputReply?.id == options?.messageOptions?.id ? 'Unreply' : 'Reply'}</p>
                        </motion.div>
                        <motion.div
                            className='select'
                            onClick={() => optionClick('SELECT')}
                            variants={
                                options?.messageOptions?.isLocalMessage ?
                                optionLocalVariants :
                                optionNonLocalVariants
                            }
                        >
                            <i><BiSelectMultiple /></i>
                            <p>Select</p>
                        </motion.div>
                        <motion.div
                            className='copy'
                            onClick={() => optionClick('COPY')}
                            variants={
                                options?.messageOptions?.isLocalMessage ?
                                optionLocalVariants :
                                optionNonLocalVariants
                            }
                        >
                            <i><AiFillCopy /></i>
                            <p>Copy</p>
                        </motion.div>
                        {
                            options?.messageOptions?.isLocalMessage ?
                            <>
                                <motion.div
                                    className='edit'
                                    onClick={() => optionClick('EDIT')}
                                    variants={
                                        options?.messageOptions?.isLocalMessage ?
                                        optionLocalVariants :
                                        optionNonLocalVariants
                                    }
                                >
                                    <i><AiFillEdit /></i>
                                    <p>Edit</p>
                                </motion.div>
                                <motion.div
                                    className='trash'
                                    onClick={() => optionClick('TRASH')}
                                    variants={
                                        options?.messageOptions?.isLocalMessage ?
                                        optionLocalVariants :
                                        optionNonLocalVariants
                                    }
                                >
                                    <i><AiFillDelete /></i>
                                    <p>Delete</p>
                                </motion.div>
                            </>
                            : ''
                        }
                    </>
                }
                <motion.div
                    className='time'
                    variants={
                        options?.messageOptions?.isLocalMessage ?
                        optionLocalVariants :
                        optionNonLocalVariants
                    }
                >
                    <div>
                        <span className='hour'></span>
                        <span className='minute'></span>
                    </div>
                    <p>
                        <span>
                            {
                                options?.messageOptions?.time?.hour < 10 ?
                                `0${options?.messageOptions?.time?.hour}` :
                                options?.messageOptions?.time?.hour
                            }
                        </span>
                        :
                        <span>
                            {
                                options?.messageOptions?.time?.minute < 10 ?
                                `0${options?.messageOptions?.time?.minute}` :
                                options?.messageOptions?.time?.minute
                            }
                        </span>
                    </p>
                </motion.div>
            </MessageOptionsContainer>
        </>
    );
};

const MessageOptionsContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.localmessage ? 'row-reverse' : 'row'};

    .reply, .copy, .edit, .trash, .select, .time, .delete, .restore {
        position: relative;
        top: 2.5rem;
        background-color: var(--normal-bg);
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
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--normal-bg-hover);
            }
        }
    }

    .time {
        cursor: auto;
        border: none;

        div {
            margin-right: .2rem;
            background-color: #fff;
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .hour,
            .minute {
                position: absolute;
                top: 50%;
                right: 50%;
                height: 2.2px;
                border-radius: 100px;
                background-color: #000;
                transform-origin: 100%;
                transform: ${(props) => `rotate(${props.hour}deg)`};
            }

            .hour {
                width: 30%;
                transform: ${(props) => `rotate(${props.hour}deg)`};
            }

            .minute {
                width: 40%;
                transform: ${(props) => `rotate(${props.minute}deg)`};
            }
        }

        p {
            transform: scale(1);
            opacity: 1;
            letter-spacing: 0px;
        }
    }

    .restore {
        background-color: #00ff0030;
        color: #00ff00;

        i {
            font-size: 1rem;
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #00ff0050;
            }
        }
    }

    .delete {
        background-color: #ff000030;
        color: #ff0000;

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

        .reply, .copy, .edit, .delete, .select, .time {
            top: ${props => props.type != 'TRASH' ? props.localmessage ? '4.5rem' : '2.5rem' : ''};
        }
    }
`;

export default MessageOptions;