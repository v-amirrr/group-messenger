import React, { useState, useEffect } from 'react';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import EditReply from './EditReply';
import Emoji from '../Emoji';
import { isRTL } from '../../functions/isRlt';
import styled from 'styled-components';

const EditPopup = ({ popupMessages }) => {

    const { message: messageText, id, replyTo } = popupMessages[0];

    const { editMessage, closePopup } = useMessageOptions();

    const [editInput, setEditInput] = useState("");
    const [editReplyOpen, setEditReplyOpen] = useState(false);
    const [emojiPickerShow, setEmojiPickerShow] = useState(false);

    const pressEnter = e => {
        if (e.key == "Enter" && !e.shiftKey) {
            e.preventDefault();
            editMessage(id, editInput, replyTo);
        }
    };

    useEffect(() => {
        let text = [];
        messageText?.map(item => {
            text.push(item.word);
        });
        setEditInput(text.join(" "));
    }, []);

    useEffect(() => {
        if (editReplyOpen) {
            setEmojiPickerShow(false);
        }
    }, [editReplyOpen]);

    return (
        <>
            <EditPopupContainer onKeyDown={e => pressEnter(e)} editreplyopen={editReplyOpen} ispersian={isRTL(editInput) ? 1 : 0}>
                <textarea value={editInput} onChange={e => setEditInput(e.target.value)} autoFocus={document.documentElement.offsetWidth > 500} dir={isRTL(editInput) ? "rtl" : "ltr"} />
                <div className='buttons'>
                    <button className='cancel' onClick={closePopup}>Cancel</button>
                    <button className='edit' onClick={() => editMessage(popupMessages[0], editInput)}>Edit</button>
                </div>
                <div className='emoji-picker'>
                    <Emoji replyToId={0} inputText={editInput} setInputText={setEditInput} show={emojiPickerShow} setShow={setEmojiPickerShow} place={"EDIT_POPUP"} />
                </div>
            </EditPopupContainer>

            <EditReply replyTo={replyTo} id={id} editReplyOpen={editReplyOpen} setEditReplyOpen={setEditReplyOpen} />
        </>
    );
};

const EditPopupContainer = styled.div`
    padding: ${props => props.editreplyopen ? "9rem 3rem" : "1rem 1rem 0 1rem"};
    transform: ${props => props.editreplyopen ? "scale(0.5)" : "scale(1)"};
    opacity: ${props => props.editreplyopen ? "0" : "1"};
    transition: ${props =>
        props.editreplyopen ?
        "transform .5s .2s, padding 1s .1s cubic-bezier(.53,0,0,.98), opacity .3s .2s" :
        "transform .5s .2s, padding .6s, opacity .5s .3s"
    };
    position: relative;

    textarea {
        border: none;
        background-color: transparent;
        font-size: 1rem;
        font-weight: 200;
        line-height: 1.5;
        resize: none;
        width: 25rem;
        min-height: 6rem;
        max-height: 8rem;
        padding: 0 .5rem;
        text-align: ${props => props.ispersian ? "right" : "left"};
        word-spacing: 1px;
        line-break: loose;
        font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
    }

    .emoji-picker {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 99;
    }

    @media (max-width: 768px) {
        padding: ${props => props.editreplyopen ? "6rem 2rem" : ""};

        textarea {
            font-size: .8rem;
            width: 15rem;
        }
    }
`;

export default EditPopup;