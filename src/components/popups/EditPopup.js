import React, { useEffect, useRef, useState } from 'react';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import EditReply from './EditReply';
import { isRTL } from '../../functions/isRlt';
import styled from 'styled-components';

const EditPopup = ({ popupMessages, editReplyOpen, setEditReplyOpen }) => {
    const { plainText, id, replyTo } = popupMessages[0];
    const { editMessage, closePopup } = useMessageOptions();
    const inputRef = useRef();
    const [editInput, setEditInput] = useState(plainText);

    const pressEnter = (e) => {
        if (e.key == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            editMessage(id, editInput);
        }
    };

    useEffect(() => {
        editInput && inputRef?.current?.setSelectionRange(editInput.length, editInput.length);
    }, []);

    return (
        <>
            <EditPopupContainer
                onKeyDown={(e) => pressEnter(e)}
                editreplyopen={editReplyOpen}
                ispersian={isRTL(editInput) ? 1 : 0}
            >
                <textarea
                    ref={inputRef}
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    autoFocus={document.documentElement.offsetWidth > 500}
                    dir={isRTL(editInput) ? 'rtl' : 'ltr'}
                />
                <div className='buttons'>
                    <button className='cancel' onClick={closePopup}>
                        Cancel
                    </button>
                    <button className='edit' onClick={() => editMessage(id, editInput)}>
                        Edit
                    </button>
                </div>
            </EditPopupContainer>

            <EditReply
                replyTo={replyTo}
                id={id}
                editReplyOpen={editReplyOpen}
                setEditReplyOpen={setEditReplyOpen}
            />
        </>
    );
};

const EditPopupContainer = styled.div`
    position: relative;
    padding: ${props => props.editreplyopen ? '7rem 2rem' : '1rem 1rem 0 1rem'};
    transform: ${props => props.editreplyopen ? 'scale(0.8)' : 'scale(1)'};
    opacity: ${props => props.editreplyopen ? '0' : '1'};
    transition: ${props =>
        props.editreplyopen ?
        'transform .2s, padding .8s cubic-bezier(.53,0,0,.98), opacity .3s' :
        'transform .8s, padding .4s, opacity .3s .3s'
    };

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
        padding: 0 0.5rem;
        text-align: ${props => props.ispersian ? 'right' : 'left'};
        word-spacing: 1px;
        line-break: loose;
        font-family: ${props => props.ispersian ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
    }

    @media (max-width: 768px) {
        padding: ${props => props.editreplyopen ? '6rem 1rem' : ''};

        textarea {
            font-size: 0.8rem;
            width: 15rem;
            min-height: 4rem;
            max-height: 5rem;
            margin-top: 1rem;
        }
    }
`;

export default EditPopup;