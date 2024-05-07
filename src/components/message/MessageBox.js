import React from 'react';
import MessageReply from './MessageReply';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MessageBox = ({ functions, type, replyTo, text, data }) => {
    return (
        <>
            <MessageBoxContainer
                onClick={(e) => functions?.messageClickHandler(e)}
                onDoubleClick={functions?.messageDoubleClickHandler}
                onMouseDown={functions?.onHoldStarts}
                onMouseUp={functions?.onHoldEnds}
                onTouchStart={functions?.onHoldStarts}
                onTouchEnd={functions?.onHoldEnds}
                data={{
                    ...data
                }}
            >
                <div className='message-text'>
                    <MessageReply
                        replyTo={replyTo}
                        type={type}
                    />
                    {
                        type != 'TRASH' ?
                        text?.map((item, index) =>
                            item.link ?
                            <a
                                key={index}
                                className={type == 'EDIT_REPLY' ? 'disabled-link' : 'link'}
                                href={item.word}
                                target='_blank'
                                rel='noopener nereferrer'
                                onClick={(e) => e.stopPropagation()}
                            >
                                {item.word}
                            </a> :
                            index == text.length-1 ?
                            `${item.word}` :
                            `${item.word} `
                        ) :
                        text
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
    border-radius: ${props => props.data.messageBoxBorderRadius};
    padding: ${props => props.data.messageBoxPadding};
    width: fit-content;
    max-width: ${props => props.data.type == 'EDIT_REPLY' || props.data.type == 'TRASH' ? '80%' : '65%'};
    word-break: break-all;
    cursor: pointer;
    box-shadow: var(--normal-shadow);
    color: var(--normal-color);
    background-color: var(--normal-bg);
    background-image: linear-gradient(
        90deg,
        #ffffff00 0%,
        #ffffff30 50%,
        #ffffff00 100%
    );
    background-position: ${props => `left ${-props.data.len}rem top 0`};
    background-repeat: no-repeat;
    animation: ${props => props.data.replyeffect || props.data.selected ? 'message-skeleton-animation linear 1s' : ''};
    transition: border-radius .2s, margin .4s, background .2s, padding .4s;

    .message-text {
        text-align: ${props => props.data.persian ? 'right' : 'left'};
        word-spacing: 1px;
        white-space: pre-wrap;
        word-break: ${props => props.data.type == 'TRASH' ? '' : 'keep-all'};
        font-family: ${props => props.data.persian ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
        font-size: ${props => props.data.type == 'TRASH' ? '.8rem' : '1rem'};
        font-weight: 200;
    }

    @keyframes message-skeleton-animation {
        to {
            background-position: ${props => `left ${props.data.len}rem top 0`};
        }
    }

    @media (max-width: 768px) {
        .message-box {
            max-width: 85%;
            border-radius: ${props => props.data.messageBoxBorderRadiusPhone};
        }
    }
`;

export default MessageBox;