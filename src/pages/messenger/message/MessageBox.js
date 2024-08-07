import React, { useEffect, useRef } from 'react';
import { useOptions } from '../../../hooks/useOptions';
import styled from 'styled-components';

const MessageBox = ({ messageClickHandler, editable, styles, data }) => {
    const messageBoxRef = useRef();
    const messageTextRef = useRef();
    const { storeEditedText } = useOptions();

    useEffect(() => {
        if (editable) {
            messageTextRef?.current?.focus();
        }
    }, [editable]);

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
                <div ref={messageTextRef} className='message-text' dir='auto' onInput={(e) => storeEditedText(e.currentTarget.textContent)} contentEditable={editable} autoFocus={editable}>
                    {
                        data?.type != 'TRASH' ?
                        data?.arrayText?.map((item, index) =>
                            item.link ?
                            <a
                                key={index}
                                className={data?.type == 'EDIT_REPLY' ? 'disabled-link' : 'link'}
                                href={item.word}
                                target='_blank'
                                rel='noopener nereferrer'
                                onClick={(e) => e.stopPropagation()}
                            >
                                {item.word}
                            </a> :
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
    border-radius: 25px;
    border-radius: ${props => props.data.boxRoundRadius};
    margin: ${props => props.data.boxMargin};
    margin-right: ${props => props.data.boxMarginRight};
    margin-left: ${props => props.data.boxMarginLeft};
    padding: ${props => props.data.boxPadding};
    background-color: var(--bg);
    background-image: linear-gradient(
        90deg,
        #ffffff00 20%,
        #ffffff20 50%,
        #ffffff00 80%
    );
    background-position: ${props => `left ${-props.data.width}px top 0`};
    background-repeat: no-repeat;
    box-shadow: var(--shadow);
    cursor: ${props => props.data.editable ? 'auto' : 'pointer'};
    visibility: ${props => props.data.boxVisibility};
    animation: ${props => props.data.skeletonEffect ? 'skeleton-effect linear .8s' : ''};
    transition: border-radius .4s, margin .4s;

    .message-text {
        display: inline-block;
        text-align: ${props => props.data.persian ? 'right' : 'left'};
        word-spacing: 1px;
        white-space: pre-line;
        font-family: ${props => props.data.persian ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
        font-size: ${props => props.data.persian ? '.9rem' : '1rem'};
        font-weight: 300;
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