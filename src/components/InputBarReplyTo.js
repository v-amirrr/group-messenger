import React from 'react';
import styled from 'styled-components';
import { useSkeletonEffect } from '../hooks/useSkeletonEffect';
import { IoClose } from 'react-icons/io5';
import { BsReplyFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import { inputBarReplyToVariants } from '../config/varitans';

const InputBarReplyTo = ({ inputReply, clearInputReply, inputBarEmojiPicker }) => {

    const { addSkeletonEffect, scrollToMessage } = useSkeletonEffect();

    let mouseSituation = 'OUT';

    const hoverHandler = () => {
        mouseSituation = 'IN';
        setTimeout(() => {
            if (mouseSituation == 'IN') {
                addSkeletonEffect(inputReply?.id);
            }
        }, 300);
    };

    const clickHandler = () => {
        scrollToMessage(inputReply?.id);
        setTimeout(() => {
            addSkeletonEffect(inputReply.id);
        }, 1000);
    };

    return (
        <>
            <AnimatePresence>
                {
                    inputReply?.id ?
                    <InputBarReplyToContainer
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={inputBarReplyToVariants}
                        emoji={inputBarEmojiPicker ? 1 : 0}
                        messageletters={inputReply?.username?.length + inputReply?.message?.length}
                    >
                        <div
                            className='message'
                            onClick={clickHandler}
                            onMouseEnter={hoverHandler}
                            onMouseLeave={() => mouseSituation = 'OUT'}
                        >
                            <i className='icon'><BsReplyFill /></i>
                            <p className='text'>{inputReply.message}</p>
                        </div>
                        <button className='close-button' onClick={(e) => clearInputReply(e)}><IoClose /></button>
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
    max-width: 18rem;
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

    .message {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 0.2rem;
        overflow: hidden;
        font-family: ${(props) => (props.isrlt ? 'Vazirmatn' : 'Outfit')}, 'Vazirmatn', sans-serif;
        color: var(--pale-color);
        font-weight: 400;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            margin-right: 0.2rem;
        }

        .text {
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .close-button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        color: var(--red-color);
        border-radius: 50%;
        cursor: pointer;
        padding: .1rem;
        transition: background .2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--normal-bg-hover);
            }
        }
    }

    @media (max-width: 768px) {
        max-width: 15rem;
        bottom: ${props => props.emoji ? '12.4rem' : '4rem'};
    }
`;

export default InputBarReplyTo;