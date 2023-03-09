import React, { useState, useEffect } from 'react';
import EditReply from './EditReply';
import useMessageoptions from '../../hooks/useMessageOptions';
import { isRTL } from '../../functions/isRlt';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const EditPopup = ({ popupMessageId, popupMessageText, popupMessageReplyTo }) => {

    const [editInput, setEditInput] = useState("");
    const [editReplyOpen, setEditReplyOpen] = useState(false);

    const { editMessage, closePopup } = useMessageoptions();

    useEffect(() => {
        let messageText = [];
        popupMessageText.map(item => {
            messageText.push(item.word);
        });
        setEditInput(messageText.join(" "));
    }, []);

    const pressEnter = e => {
        if (e.key == "Enter" && !e.shiftKey) {
            e.preventDefault();
            editMessage(popupMessageId, editInput, popupMessageReplyTo);
        }
    };

    return (
        <>
            <EditPopupContainer onKeyDown={e => pressEnter(e)} editreplyopen={editReplyOpen} ispersian={isRTL(editInput) ? 1 : 0}>
                <textarea value={editInput} onChange={e => setEditInput(e.target.value)} autoFocus={document.documentElement.offsetWidth > 500} dir={isRTL(editInput) ? "rtl" : "ltr"} />
                <div className='buttons'>
                    <motion.button className='cancel' whileTap={{ scale: 0.9 }} onClick={closePopup}>
                        Cancel
                    </motion.button>
                    <motion.button className='edit' whileTap={{ scale: 0.9 }} onClick={() => editMessage(popupMessageId, editInput, popupMessageReplyTo)}>
                        Edit
                    </motion.button>
                </div>
            </EditPopupContainer>

            <EditReply replyTo={popupMessageReplyTo} popupMessageId={popupMessageId} editReplyOpen={editReplyOpen} setEditReplyOpen={setEditReplyOpen} />
        </>
    );
};

const EditPopupContainer = styled.div`
    padding: ${props => props.editreplyopen ? "6rem 3rem" : ""};
    transform: ${props => props.editreplyopen ? "scale(0.5)" : ""};
    transition: transform 1s cubic-bezier(.53,0,0,.98), padding 1s cubic-bezier(.53,0,0,.98);

    textarea {
        border: none;
        background-color: #ffffff00;
        font-size: 1rem;
        font-weight: 200;
        line-height: 1.5;
        resize: none;
        width: 25rem;
        height: 5rem;
        text-align: ${props => props.ispersian ? "right" : "left"};
        word-spacing: 1px;
        line-break: loose;
        font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
    }

    @media (max-width: 768px) {
        padding: ${props => props.editreplyopen ? "5rem 1rem" : ""};

        textarea {
            font-size: .8rem;
            width: 15rem;
        }
    }
`;

export default EditPopup;