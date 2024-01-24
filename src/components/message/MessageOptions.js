import React from 'react';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useSelect } from '../../hooks/useSelect';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import { BiSelectMultiple } from 'react-icons/bi';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { optionsVariants, optionLocalVariants, optionNonLocalVariants } from '../../config/varitans';

const MessageOptions = ({ options, id }) => {
    const { enterAsAGuest } = useSelector(store => store.userStore);
    const { replyTo: replyToApp } = useSelector(store => store.sendMessageStore);
    const { openPopup, copyMessage, replyMessage, trashMessage } = useMessageOptions();
    const { selectMessage } = useSelect();

    const optionClick = (option) => {
        options?.setMessageOptions(false);
        setTimeout(() => {
            switch (option) {
                case 'REPLY':
                    replyMessage(
                        options?.messageOptions.id,
                        options?.messageOptions.plainText,
                        options?.messageOptions.messageUsername,
                    );
                    break;
                case 'SELECT':
                    selectMessage(options?.messageOptions);
                    break;
            }
        }, 400);
        switch (option) {
            case 'COPY':
                copyMessage(options?.messageOptions.plainText);
                break;
            case 'EDIT':
                openPopup('EDIT_POPUP', [options?.messageOptions]);
                break;
            case 'DELETE':
                trashMessage(options?.messageOptions.id);
                break;
        }
    };

    return (
        <>
            <AnimatePresence>
                {
                    options?.messageOptions.id == id ?
                    <MessageOptionsContainer
                        key={id}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={optionsVariants}
                        localmessage={options?.messageOptions.localMessage ? 1 : 0}
                        guest={enterAsAGuest ? 1 : 0}
                        hour={
                            options?.messageOptions.time.hour > 12 ?
                            ((options?.messageOptions.time.hour - 12) / 12) * 360 + 90 :
                            (options?.messageOptions.time.hour / 12) * 360 + 90
                        }
                        minute={(options?.messageOptions.time.minute / 60) * 360 + 90}
                    >
                        {
                            replyToApp.id != options?.messageOptions.id ?
                            <>
                                <motion.div
                                    className='reply'
                                    onClick={() => optionClick('REPLY')}
                                    variants={
                                        options?.messageOptions.localMessage ?
                                        optionLocalVariants :
                                        optionNonLocalVariants
                                    }
                                >
                                    <i>
                                        <BsReplyFill />
                                    </i>
                                    <p>Reply</p>
                                </motion.div>
                            </>
                            : ''
                        }
                        <motion.div
                            className='select'
                            onClick={() => optionClick('SELECT')}
                            variants={
                                options?.messageOptions.localMessage ?
                                optionLocalVariants :
                                optionNonLocalVariants
                            }
                        >
                            <i>
                                <BiSelectMultiple />
                            </i>
                            <p>Select</p>
                        </motion.div>
                        <motion.div
                            className='copy'
                            onClick={() => optionClick('COPY')}
                            variants={
                                options?.messageOptions.localMessage ?
                                optionLocalVariants :
                                optionNonLocalVariants
                            }
                        >
                            <i>
                                <AiFillCopy />
                            </i>
                            <p>Copy</p>
                        </motion.div>
                        {
                            options?.messageOptions.localMessage ?
                            <>
                                <motion.div
                                    className='edit'
                                    onClick={() => optionClick('EDIT')}
                                    variants={
                                        options?.messageOptions.localMessage ?
                                        optionLocalVariants :
                                        optionNonLocalVariants
                                    }
                                >
                                    <i>
                                        <AiFillEdit />
                                    </i>
                                    <p>Edit</p>
                                </motion.div>
                                <motion.div
                                    className='delete'
                                    onClick={() => optionClick('DELETE')}
                                    variants={
                                        options?.messageOptions.localMessage ?
                                        optionLocalVariants :
                                        optionNonLocalVariants
                                    }
                                >
                                    <i>
                                        <AiFillDelete />
                                    </i>
                                    <p>Delete</p>
                                </motion.div>
                            </>
                            : ''
                        }
                        <motion.div
                            className='time'
                            variants={
                                options?.messageOptions.localMessage ?
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
                                        options?.messageOptions.time?.hour < 10 ?
                                        `0${options?.messageOptions.time?.hour}` :
                                        options?.messageOptions.time?.hour
                                    }
                                </span>
                                :
                                <span>
                                    {
                                        options?.messageOptions.time?.minute < 10 ?
                                        `0${options?.messageOptions.time?.minute}` :
                                        options?.messageOptions.time?.minute
                                    }
                                </span>
                            </p>
                        </motion.div>
                    </MessageOptionsContainer>
                    : ''
                }
            </AnimatePresence>
        </>
    );
};

const MessageOptionsContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.localmessage ? 'row-reverse' : 'row'};
    margin: ${props => props.localmessage ? '0 .4rem 0 0' : '0 0 0 .4rem'};

    .reply,
    .copy,
    .edit,
    .delete,
    .select,
    .time {
        position: relative;
        background-color: var(--normal-bg);
        margin: 0 0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        width: 100%;
        height: 50%;
        padding: 0.5rem;
        cursor: pointer;
        transition: padding 0.2s;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            font-size: 1.1rem;
        }

        p {
            font-size: 0.8rem;
            font-weight: 400;
            position: absolute;
            right: 0.6rem;
            transform: scale(0);
            opacity: 0;
            transition: transform 0.2s, opacity 0.2s;
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                p {
                    transform: scale(1);
                    opacity: 1;
                    letter-spacing: 0;
                }
            }
        }
    }

    .time {
        cursor: auto;
        padding: 0.5rem 2.8rem 0.5rem 0.5rem;
        border: none;

        div {
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

    .reply {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: 0.5rem 2.8rem 0.5rem 0.5rem;
                transition: padding 0.3s;
            }
        }
    }

    .copy {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: 0.5rem 2.7rem 0.5rem 0.5rem;
                transition: padding 0.3s;
            }
        }
    }

    .edit {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: 0.5rem 2.3rem 0.5rem 0.5rem;
                transition: padding 0.3s;
            }
        }
    }

    .delete {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: 0.5rem 3.1rem 0.5rem 0.5rem;
                transition: padding 0.3s;
            }
        }
    }

    .select {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: 0.5rem 3rem 0.5rem 0.5rem;
                transition: padding 0.3s;
            }
        }
    }

    @media (max-width: 768px) {
        width: 6.5rem;
        flex-direction: column;
        justify-content: center;
        margin: ${props => props.localmessage ? '13rem 0 0 0' : '8rem 0 0 0'};
        z-index: 3;
        background-color: var(--normal-bg);
        border-radius: 15px;
        backdrop-filter: blur(20px) saturate(100%);
        -webkit-backdrop-filter: blur(20px) saturate(100%);
        overflow: hidden;

        hr {
            display: block;
            width: 100%;
            height: 0.1px;
            background-color: #ffffff30;
            border: none;
        }

        .reply,
        .copy,
        .edit,
        .delete,
        .select,
        .time {
            margin: 0.1rem 0;
            background-color: #ffffff00;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 6.5rem;
            height: 2rem;
            backdrop-filter: none;

            i {
                position: absolute;
                left: 0.6rem;
                margin: 0;
            }

            p {
                font-size: 0.8rem;
                right: none;
                left: 2.6rem;
                text-align: start;
                transform: scale(1);
                opacity: 1;
            }
        }
    }
`;

export default MessageOptions;
