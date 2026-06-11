import React, { useEffect, useRef } from 'react';
import { useOptions } from '../../../hooks/useOptions';
import styled from 'styled-components';

const MessageBox = ({ messageClickHandler, editingMode, styles, data }) => {
    const messageBoxRef = useRef();
    const messageTextRef = useRef();
    const { storeEditedText } = useOptions();

    // Store the original text when editing mode is enabled
    const originalContentRef = useRef(null);

    useEffect(() => {
        if (editingMode) {
            // Focus on the message
            messageTextRef?.current?.focus();
            // Save the current content as the original content when entering edit mode
            originalContentRef.current = messageTextRef.current.innerHTML;
        } else if (originalContentRef.current) {
            // Revert to original content when exiting edit mode
            setTimeout(() => {
                messageTextRef.current.innerHTML = originalContentRef.current;
            }, 400);
        }
    }, [editingMode]);

    return (
        <>
            <MessageBoxContainer
                ref={messageBoxRef}
                onClick={messageClickHandler}
                data={{
                    width: messageBoxRef?.current?.offsetWidth,
                    height: messageBoxRef?.current?.offsetHeight,
                    ...styles,
                }}
            >
                <div
                    ref={messageTextRef}
                    className='message-text'
                    onInput={(e) => storeEditedText(e.currentTarget.textContent)}
                    contentEditable={editingMode}
                    autoFocus={editingMode && document.documentElement.offsetWidth > 500}
                >
                    {
                        data?.type != 'TRASH' ?
                        data?.arrayText?.map((item, index) =>
                            item.link ?
                            <a
                                key={index}
                                className={editingMode ? 'disabled-link' : 'link'}
                                href={item.word}
                                target='_blank'
                                rel='noopener nereferrer'
                                onClick={(e) => e.stopPropagation()}
                            >
                                {item.word}
                            </a> :
                            item.word == '\n' ? <br /> :
                            index == data?.arrayText.length-1 ?
                            `${item.word}` :
                            `${item.word} `
                        ) :
                        data?.plainText
                    }
                </div>
            </MessageBoxContainer>
        </>
    );
};

const MessageBoxContainer = styled.div`
    display: flex;
    justify-content: ${props => props.data.boxJustify};
    align-items: center;
    max-width: ${props => props.data.boxWidth};
    width: fit-content;
    border: ${props => props.data.editingMode ? 'solid 1.5px #ffffff20' : 'solid 1.5px #ffffff00'};
    border-radius: 25px;
    border-radius: ${props => props.data.boxRoundRadius};
    margin: ${props => props.data.boxMargin};
    padding: ${props => props.data.boxPadding};
    background-color: ${props => props.data.editingMode ? '#ffffff00' : props.data.selected ? 'var(--bg-hover)' : 'var(--bg)'};
    background-image: linear-gradient(
        90deg,
        #ffffff00 20%,
        #ffffff20 50%,
        #ffffff00 80%
    );
    background-position: ${props => `left ${-props.data.width}px top 0`};
    background-repeat: no-repeat;
    backdrop-filter: ${props => props.data.boxBackdropFilter};
    z-index: 2;
    box-shadow: ${props => props.data.boxShadow};
    cursor: ${props => props.data.editingMode ? 'auto' : 'pointer'};
    visibility: ${props => props.data.boxVisibility};
    animation: ${props => props.data.skeletonEffect ? 'skeleton-effect .8s 1 linear backwards' : ''};
    transition: border-radius .2s, margin .4s, border .2s, background-color .4s;

    .message-text {
        text-align: ${props => props.data.persian ? 'right' : 'left'};
        word-spacing: 1px;
        font-family: ${props => props.data.persian ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
        font-size: ${props => props.data.persian ? '.9rem' : '1rem'};
        font-weight: 300;
        white-space: pre-line;
    }

    @keyframes skeleton-effect {
        to {
            background-position: ${props => `left ${props.data.width}px top 0`};
        }
    }

    @media (max-width: 768px) {
        max-width: 77%;
        border-radius: ${props => props.data.height > 50 ? props.data.boxNotRoundRadius : props.data.boxRoundRadius};
    }
`;

export default MessageBox;