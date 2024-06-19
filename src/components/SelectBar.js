import React from 'react';
import Counter from './common/Counter';
import { useSelect } from '../hooks/useSelect';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { AiFillDelete, AiFillCopy } from 'react-icons/ai';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { selectBarVariants } from '../config/varitans';

const SelectBar = () => {
    const { selectedMessages, selectOthersMessage } = useSelector(store => store.appStore);
    const { clearSelectedMessages, copySelectedMessages, trashSelectedMessages } = useSelect();
    return (
        <>
            <SelectBarContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={selectBarVariants}
            >
                <motion.button className='close' onClick={clearSelectedMessages}>
                    <IoClose />
                </motion.button>

                <div className='counter'><Counter num={selectedMessages?.length} /></div>

                <div className='options'>
                    <button className='copy' onClick={copySelectedMessages}>
                        <i><AiFillCopy /></i>
                        <p>Copy</p>
                    </button>
                    <button className='delete' disabled={selectOthersMessage} onClick={trashSelectedMessages}>
                        <i><AiFillDelete /></i>
                        <p>Delete</p>
                    </button>
                </div>
            </SelectBarContainer>
        </>
    );
};

const SelectBarContainer = styled(motion.div)`
    box-sizing: content-box;
    position: absolute;
    bottom: 1rem;
    width: 18rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--normal-color);
    border: solid 2.5px #ffffff10;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    z-index: 3;
    overflow: hidden;

    .close {
        position: absolute;
        right: 0.25rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        font-size: 1.4rem;
        cursor: pointer;
        z-index: 3;
        transition: background .2s;
    }

    .counter {
        position: absolute;
        left: 0.25rem;
        width: 2rem;
        height: 2rem;
    }

    .options {
        display: flex;
        justify-content: center;
        align-items: center;

        .copy, .delete {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            margin: 0 .5rem;
            cursor: pointer;
            transition: color .2s;

            &:disabled {
                color: var(--pale-color);
                cursor: not-allowed;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.1rem;
            }

            p {
                font-size: .9rem;
                font-weight: 400;
            }
        }
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        .close, .copy, .delete {
            &:hover {
            }
        }
    }

    @media (max-width: 745px) {
        width: 15rem;
        bottom: .9rem;

        .options {
            .delete, .copy {
                margin: 0;
                width: 4.5rem;
            }
        }
    }
`;

export default SelectBar;
