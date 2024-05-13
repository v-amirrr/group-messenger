import React from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { BsReplyFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import { inputBarReplyToVariants } from '../config/varitans';

const InputBarReplyTo = ({ replyTo, applyScrollMessageId, closeHandler, inputBarEmojiPicker }) => {

    let mouseSituation = 'OUT';

    const hoverHandler = () => {
        mouseSituation = 'IN';
        setTimeout(() => {
            if (mouseSituation == 'IN') {
                applyScrollMessageId(replyTo?.id, 'HOVER');
            }
        }, 300);
    };

    return (
        <>
            <AnimatePresence>
                {
                    replyTo?.id ?
                    <InputBarReplyToContainer
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={inputBarReplyToVariants}
                        emoji={inputBarEmojiPicker ? 1 : 0}
                        messageletters={replyTo?.username?.length + replyTo?.message?.length}
                    >
                        <div
                            className='message'
                            onClick={() => applyScrollMessageId(replyTo.id, 'CLICK')}
                            onMouseEnter={hoverHandler}
                            onMouseLeave={() => mouseSituation = 'OUT'}
                        >
                            <i><BsReplyFill /></i>
                            <p className='text'>{replyTo.message}</p>
                        </div>
                        <button onClick={(e) => closeHandler(e)}><IoClose /></button>
                    </InputBarReplyToContainer>
                    : ''
                }
            </AnimatePresence>
        </>
    );
};

const InputBarReplyToContainer = styled(motion.div)`
    position: absolute;
    bottom: ${props => props.emoji ? '16rem' : '4rem'};
    max-width: 25%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.2rem;
    color: var(--normal-color);
    border: solid 2.5px #ffffff10;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    cursor: pointer;
    z-index: 2;
    transition: ${props => props.emoji ?
        'bottom .5s cubic-bezier(.53,0,0,.98)' :
        'bottom .3s cubic-bezier(.53,0,0,.98)'
    };

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        color: var(--red-color);
        border-radius: 50%;
        cursor: pointer;
        padding: 0.1rem;
        margin-left: 0.5rem;
        transition: background 0.2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--normal-bg-hover);
            }
        }
    }

    .message {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 0.2rem;
        overflow: hidden;
        font-family: ${(props) => (props.isrlt ? 'Vazirmatn' : 'Outfit')},
            'Vazirmatn', sans-serif;
        color: var(--pale-color);
        font-weight: 400;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            margin-right: 0.2rem;
        }

        .text {
            font-size: 0.7rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    @media (max-width: 768px) {
        max-width: 50%;
        margin-right: 4rem;
        bottom: 4rem;
    }
`;

export default InputBarReplyTo;