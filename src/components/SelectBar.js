import React from 'react';
import { useSelect } from '../hooks/useSelect';
import { useMessageOptions } from '../hooks/useMessageOptions';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { AiFillDelete, AiFillCopy } from 'react-icons/ai';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const selectBarVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.3 } }
};

const SelectBar = () => {

    const { clearSelectedMessages, copySelectedMessages } = useSelect();
    const { openPopup } = useMessageOptions();

    const { selectedMessages, enterAsAGuest, selectOthersMessage } = useSelector(store => store.userStore);

    return (
        <>
            <SelectBarContainer initial='hidden' animate='visible' exit='exit' variants={selectBarVariants}>
                <motion.button className='close' onClick={clearSelectedMessages} whileTap={{ scale: 0.8 }}><IoClose /></motion.button>
                <div className='count'>{selectedMessages.length}</div>

                <div className='options'>
                    <motion.button className='copy' whileTap={{ scale: 0.8 }} onClick={copySelectedMessages}>
                        <i><AiFillCopy /></i>
                        <p>Copy</p>
                    </motion.button>
                    {!enterAsAGuest && !selectOthersMessage ?
                    <motion.button className='delete' whileTap={{ scale: 0.8 }} onClick={() => openPopup("DELETE_POPUP", selectedMessages, true)}>
                        <i><AiFillDelete /></i>
                        <p>Delete</p>
                    </motion.button>
                    : ""}
                </div>
            </SelectBarContainer>
        </>
    );
};

const SelectBarContainer = styled(motion.div)`
    position: absolute;
    top: .8rem;
    background-color: var(--select-bar);
    backdrop-filter: var(--select-bar-blur);
    -webkit-backdrop-filter: var(--select-bar-blur);
    width: 20rem;
    height: 2.8rem;
    border-radius: var(--select-bar-border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    user-select: none;
    overflow: hidden;

    button {
        font-family: 'Outfit', sans-serif;
        border: none;
    }

    .close {
        position: absolute;
        right: .5rem;
        background-color: var(--select-bar-button);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        font-size: 1.3rem;
        cursor: pointer;
    }

    .count {
        position: absolute;
        left: .5rem;
        background-color: var(--select-bar-button);
        border-radius: 50%;
        font-size: 1rem;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .options {
        display: flex;
        justify-content: center;
        align-items: center;

        .copy, .delete {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--select-bar-button);
            margin: 0 .2rem;
            width: 5rem;
            height: 2rem;
            border-radius: 15px;
            cursor: pointer;

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .2rem;
                font-size: 1rem;
            }

            p {
                font-size: .8rem;
            }
        }
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        .close, .copy, .delete {
            transition: background .3s;

            &:hover {
                background-color: var(--select-bar-button-hover);
            }
        }
    }
`;

export default SelectBar;