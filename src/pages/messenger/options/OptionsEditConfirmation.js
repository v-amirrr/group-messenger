import React from 'react';
import Check from '../../../common/Check';
import { IoIosClose } from "react-icons/io";
import { motion } from 'framer-motion';

const OptionsEditConfirmation = ({ optionClick, setVariants }) => {
    return (
        <>
            <motion.div
                className='edit-back'
                onClick={() => optionClick('EDIT_CANCEL')}
                key='edit-cancel1' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><IoIosClose /></i>
            </motion.div>

            <motion.div
                className='edit-ok'
                onClick={() => optionClick('EDIT_OK')}
                key='edit-ok1' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <Check scale={1.4} />
            </motion.div>
        </>
    );
};

export default OptionsEditConfirmation;