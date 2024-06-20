import React, { useRef } from 'react';
import MessageReply from './MessageReply';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MessageBox = ({ data }) => {
    const messageBoxRef = useRef();
    return (
        <>
            <MessageBoxContainer
                ref={messageBoxRef}
                onClick={(e) => data?.functions?.messageClickHandler(e)}
                onMouseDown={data?.functions?.onHoldStarts}
                onMouseUp={data?.functions?.onHoldEnds}
                onTouchStart={data?.functions?.onHoldStarts}
                onTouchEnd={data?.functions?.onHoldEnds}
                data={{
                    width: messageBoxRef?.current?.offsetWidth,
                    height: messageBoxRef?.current?.offsetHeight,
                    ...data?.messageStyles,
                }}
            >
                <div className='message-text' dir='auto'>
                    <MessageReply
                        replyTo={data?.replyTo}
                        type={data?.type}
                    />
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

const MessageBoxContainer = styled(motion.div)`
    z-index: 1;
    display: flex;
    justify-content: ${props => props.data.localmessage ? 'flex-start' : 'flex-end'};
    align-items: center;
    margin: ${props => props.data.messageBoxMargin};
    margin-right: ${props => props.data.messageBoxMarginRight};
    margin-left: ${props => props.data.messageBoxMarginLeft};
    border-radius: 25px;
    border-radius: ${props => props.data.messageBoxRoundBorderRadius};
    padding: ${props => props.data.messageBoxPadding};
    width: fit-content;
    max-width: ${props => props.data.type == 'EDIT_REPLY' ? '70%' : '65%'};
    word-break: break-all;
    cursor: pointer;
    box-shadow: var(--normal-shadow);
    color: var(--normal-color);
    background-color: #151515;
    background-image: linear-gradient(
        90deg,
        #ffffff00 20%,
        #ffffff20 50%,
        #ffffff00 80%
    );
    visibility: ${props => props.data.options ? 'hidden' : 'visible'};
    background-position: ${props => `left ${-props.data.width}px top 0`};
    background-repeat: no-repeat;
    animation: ${props => props.data.replyeffect || props.data.selected ? 'message-skeleton-animation linear .8s' : ''};
    transition: border-radius .2s, margin .4s;

    .message-text {
        display: inline-block;
        text-align: ${props => props.data.persian ? 'right' : 'left'};
        word-spacing: 1px;
        white-space: pre-wrap;
        word-break: keep-all;
        font-family: ${props => props.data.persian ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
        font-size: ${props => props.data.persian ? '.9rem' : '1rem'};
        font-weight: 200;
    }

    @keyframes message-skeleton-animation {
        to {
            background-position: ${props => `left ${props.data.width}px top 0`};
        }
    }

    @media (max-width: 768px) {
        max-width: 75%;
        border-radius: ${props => props.data.height > 50 ? props.data.messageBoxNotRoundBorderRadius : props.data.messageBoxRoundBorderRadius};
    }
`;

export default MessageBox;