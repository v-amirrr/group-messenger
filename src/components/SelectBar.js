import React, { useState, useEffect } from 'react';
import { useSelect } from '../hooks/useSelect';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { AiFillDelete, AiFillCopy } from 'react-icons/ai';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { selectBarVariants } from '../config/varitans';

const SelectBar = () => {
    const { selectedMessages, selectOthersMessage } = useSelector((store) => store.appStore);

    const {
        clearSelectedMessages,
        copySelectedMessages,
        trashSelectedMessages,
    } = useSelect();

    const [counterOne, setCounterOne] = useState(selectedMessages.length);
    const [counterTwo, setCounterTwo] = useState(selectedMessages.length);
    const [changeCounter, setChangeCounter] = useState(false);

    useEffect(() => {
        if (selectedMessages.length != 0) {
            setCounterTwo(selectedMessages.length);
        }
    }, [selectedMessages.length]);

    useEffect(() => {
        setChangeCounter(true);
        setTimeout(() => {
            setCounterOne(selectedMessages.length);
            setChangeCounter(false);
        }, 400);
    }, [counterTwo]);

    return (
        <>
            <SelectBarContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={selectBarVariants}
                changecounter={changeCounter ? 1 : 0}
            >
                <motion.button
                    className='close'
                    onClick={clearSelectedMessages}
                >
                    <IoClose />
                </motion.button>
                <div className='count'>
                    <p className='counter-one'>{counterOne}</p>
                    <p className='counter-two'>{counterTwo}</p>
                </div>

                <div className='options'>
                    <button className='copy' onClick={copySelectedMessages}>
                        <i>
                            <AiFillCopy />
                        </i>
                        <p>Copy</p>
                    </button>
                    <hr />
                    <button
                        className='delete'
                        disabled={selectOthersMessage}
                        onClick={trashSelectedMessages}
                    >
                        <i>
                            <AiFillDelete />
                        </i>
                        <p>Delete</p>
                    </button>
                </div>
            </SelectBarContainer>
        </>
    );
};

const SelectBarContainer = styled(motion.div)`
    position: absolute;
    bottom: 1rem;
    border: solid 1.5px #ffffff14;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    color: var(--normal-color);
    width: 22rem;
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 2;

    .close {
        position: absolute;
        right: 0.3rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        font-size: 1.4rem;
        cursor: pointer;
        z-index: 3;
        transition: background 0.2s;
    }

    .count {
        position: absolute;
        left: 0.3rem;
        font-size: 1rem;
        font-weight: 400;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .counter-one {
            position: absolute;
            opacity: ${(props) => (props.changecounter ? '0' : '1')};
            top: ${(props) => (props.changecounter ? '2rem' : '50%')};
            transform: translate(0, -50%);
            transition: ${(props) =>
                props.changecounter ? 'top .2s, opacity .2s' : ''};
        }

        .counter-two {
            position: absolute;
            opacity: ${(props) => (props.changecounter ? '1' : '0')};
            top: ${(props) => (props.changecounter ? '50%' : '-.5rem')};
            transform: translate(0, -50%);
            transition: ${(props) =>
                props.changecounter ? 'top .2s, opacity .2s' : ''};
        }
    }

    .options {
        display: flex;
        justify-content: center;
        align-items: center;

        .copy,
        .delete {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            margin: 0 0.2rem;
            width: 5rem;
            height: 2rem;
            letter-spacing: -1px;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;

            &:disabled {
                color: var(--pale-color);
                cursor: not-allowed;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 0.2rem;
                font-size: 1rem;
            }

            p {
                font-size: 0.9rem;
                font-weight: 400;
            }
        }

        hr {
            border: none;
            border-radius: 50px;
            width: 0.06rem;
            height: 1.2rem;
            background-color: #ffffff24;
        }
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        .close,
        .copy,
        .delete {
            &:hover {
                background-color: var(--normal-bg-hover);
                box-shadow: var(--normal-shadow);
            }
        }
    }

    @media (max-width: 500px) {
        width: 18rem;
        height: 3rem;
        margin-right: 4rem;
    }
`;

export default SelectBar;
