import React from 'react';
import useMessageoptions from "../../hooks/useMessageOptions";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DeletePopup = ({ popupMessageId }) => {

    const { deleteMessage, closePopup } = useMessageoptions();

    const pressEnter = e => {
        if (e.key == "Enter") {
            deleteMessage(popupMessageId);
        }
    };

    return (
        <>
            <DeletePopupContainer onKeyDown={e => pressEnter(e)}>
                <p>Are you sure that you want to delete this message?</p>
                <div className='buttons'>
                    <motion.button className='cancel' whileTap={{ scale: 0.9 }} onClick={closePopup}>Cancel</motion.button>
                    <motion.button className='delete' whileTap={{ scale: 0.9 }} onClick={() => deleteMessage(popupMessageId)} autoFocus>Delete</motion.button>
                </div>
            </DeletePopupContainer>
        </>
    );
};

const DeletePopupContainer = styled.div`

`;

export default DeletePopup;