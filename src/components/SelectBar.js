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
    const { selectedMessages, nonLocalSelected } = useSelector(store => store.selectStore);
    const { clearSelectedMessages, copySelectedMessages, moveToTrashSelectedMessages } = useSelect();
    return (
        <>
            <SelectBarContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={selectBarVariants}
            >
                <button className='close' onClick={clearSelectedMessages}><IoClose /></button>

                <div className='counter'><Counter num={selectedMessages?.length} size={1} /></div>

                <div className='options'>
                    <button className='copy' onClick={copySelectedMessages}>
                        <i><AiFillCopy /></i>
                        <p>Copy</p>
                    </button>
                    <button className='delete' disabled={nonLocalSelected} onClick={moveToTrashSelectedMessages}>
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
    border: var(--border);
    border-radius: 50px;
    box-shadow: var(--shadow);
    backdrop-filter: var(--glass);
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
        color: var(--text);
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
            color: var(--text);

            &:disabled {
                color: var(--grey);
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
