import React from 'react';
import { AiFillCopy } from 'react-icons/ai';
import { BiSelectMultiple } from 'react-icons/bi';
import { TbTrashX } from 'react-icons/tb';
import { FaTrashRestore } from "react-icons/fa";
import { motion } from 'framer-motion';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const TrashButtons = ({ optionClick, setVariants }) => {
    return (
        <>
            <motion.div
                className='copy'
                onClick={() => optionClick('COPY')}
                key='copy' {...framerMotionAttributes(setVariants())}
            >
                <i><AiFillCopy /></i>
                <p>Copy</p>
            </motion.div>
            <motion.div
                className='select'
                onClick={() => optionClick('SELECT')}
                key='select' {...framerMotionAttributes(setVariants())}
            >
                <i><BiSelectMultiple /></i>
                <p>Select</p>
            </motion.div>
            <motion.div
                className='restore'
                onClick={() => optionClick('RESTORE')}
                key='restore' {...framerMotionAttributes(setVariants())}
            >
                <i><FaTrashRestore /></i>
                <p>Restore</p>
            </motion.div>
            <motion.div
                className='delete'
                onClick={() => optionClick('DELETE')}
                key='delete' {...framerMotionAttributes(setVariants())}
            >
                <i><TbTrashX /></i>
                <p>Delete</p>
            </motion.div>
        </>
    );
};

export default TrashButtons;