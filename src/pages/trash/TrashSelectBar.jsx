import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { trashSelectBarVariants } from '../../config/varitans';
import Counter from '../../common/Counter';
import { TbTrashX } from 'react-icons/tb';
import { FaTrashRestore } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useModal } from '../../hooks/useModal';
import { useSelect } from '../../hooks/useSelect';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

export const TrashSelectBar = ({ selectedMessages }) => {
    const { openModal } = useModal();
    const { restoreSelectedMessages, clearSelectedMessages } = useSelect();
    return (
        <AnimatePresence>
            {
                selectedMessages?.length ?
                <motion.div key='trash-select-bar' className='trash-select-bar' {...framerMotionAttributes(trashSelectBarVariants)}>
                    <div className='counter'><Counter num={selectedMessages?.length} size={1} /></div>
                    <button className='delete-button' onClick={() => openModal("PERMENANT_DELETE_CONFIRMATION", selectedMessages)}>
                        <i><TbTrashX /></i>
                        <p>Delete</p>
                    </button>
                    <button className='restore-button' onClick={restoreSelectedMessages}>
                        <i><FaTrashRestore /></i>
                        <p>Restore</p>
                    </button>
                    <button className='close' onClick={clearSelectedMessages}><IoClose /></button>
                </motion.div> : ''
            }
        </AnimatePresence>
    );
};
