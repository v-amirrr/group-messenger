import React from 'react';
import Check from '../../../common/Check';
import { IoIosClose } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";
import { motion } from 'framer-motion';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const OptionsEditConfirmation = ({ optionClick, setVariants }) => {
    return (
        <>
            <motion.div
                className='edit-close'
                onClick={() => optionClick('EDIT_CANCEL')}
                key='edit-cancel1' {...framerMotionAttributes(setVariants())}
            >
                <i><IoIosClose /></i>
            </motion.div>

            <motion.div
                className='edit-ok'
                onClick={() => optionClick('EDIT_OK')}
                key='edit-ok1' {...framerMotionAttributes(setVariants())}
            >
                <i><FcCheckmark /></i>
            </motion.div>
        </>
    );
};

export default OptionsEditConfirmation;