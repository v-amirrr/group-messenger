import React from 'react';
import { FaArrowDown } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { scrollButtonVariants } from '../config/varitans';

const ScrollButton = ({ click, scroll, newMessage, scrollDown }) => {
    return (
        <>
            <ScrollButtonContainer
                scrollup={scroll ? 1 : 0}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={scrollButtonVariants}
                newmessage={newMessage ? 1 : 0}
            >
                <div>
                    <div className='new' onClick={scrollDown}>
                        <p>
                            new
                        </p>
                    </div>
                    <i className='arrow' onClick={click}>
                        <FaArrowDown />
                    </i>
                </div>
            </ScrollButtonContainer>
        </>
    );
};

const ScrollButtonContainer = styled(motion.button)`
    box-sizing: content-box;
    position: absolute;
    bottom: 1.1rem;
    right: 8.2rem;
    width: ${props => props.newmessage ? '4.3rem' : '2.3rem'};
    height: ${props => props.newmessage ? '2.4rem' : '2.3rem'};
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2.5px #ffffff20;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    color: var(--normal-color);
    cursor: ${props => props.newmessage ? 'auto' : 'pointer'};
    overflow: hidden;
    z-index: 2;
    transition: width .3s cubic-bezier(0.53, 0, 0, 0.98), height .3s cubic-bezier(0.53, 0, 0, 0.98);

    div {
        width: ${props => props.newmessage ? '4.6rem' : '2.3rem'};
        height: ${props => props.newmessage ? '2.4rem' : '2.3rem'};
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .arrow {
        position: absolute;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        width: 2.3rem;
        height: 2.3rem;
        transform: ${props => !props.scrollup ? "rotateX(180deg)" : "rotateX(0deg)"};
        transition: transform .5s .3s;
        cursor: pointer;
    }

    .new {
        position: absolute;
        left: .1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.25rem;
        width: 2.3rem;
        height: 2.3rem;
        opacity: ${props => props.newmessage ? 1 : 0};
        transform: ${props => props.newmessage ? 'scale(1)' : 'scale(0)'};
        cursor: pointer;
        transition: ${props => props.newmessage ? 'opacity .2s .1s, transform .5s' : 'opacity .2s, transform .2s .5s'};

        p {
            font-size: .6rem;
            padding: .1rem .2rem;
            background-color: var(--red-color);
            border-radius: 50px;
        }
    }

    @media (max-width: 768px) {
        right: 0;
        bottom: 1rem;
    }
`;

export default ScrollButton;