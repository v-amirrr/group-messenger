import React, { useRef } from 'react';
import MessageReply from './MessageReply';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MessageBox = ({ functions, data }) => {
    const messageBoxRef = useRef();
    return (
        <>
            <MessageBoxContainer
                ref={messageBoxRef}
                onClick={functions?.messageClickHandler}
                onMouseDown={functions?.onHoldStarts}
                onMouseUp={functions?.onHoldEnds}
                onTouchStart={functions?.onHoldStarts}
                onTouchEnd={functions?.onHoldEnds}
                data={{
                    width: messageBoxRef?.current?.offsetWidth,
                    height: messageBoxRef?.current?.offsetHeight,
                    ...data?.styles,
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
    display: flex;
    justify-content: ${props => props.data.boxJustify};
    align-items: center;
    max-width: 65%;
    width: fit-content;
    border-radius: 25px;
    border-radius: ${props => props.data.boxRoundRadius};
    margin: ${props => props.data.boxMargin};
    margin-right: ${props => props.data.boxMarginRight};
    margin-left: ${props => props.data.boxMarginLeft};
    padding: ${props => props.data.boxPadding};
    background-color: #151515;
    background-image: linear-gradient(
        90deg,
        #ffffff00 20%,
        #ffffff20 50%,
        #ffffff00 80%
        );
    background-position: ${props => `left ${-props.data.width}px top 0`};
    background-repeat: no-repeat;
    box-shadow: var(--shadow);
    cursor: pointer;
    visibility: ${props => props.data.options ? 'hidden' : 'visible'};
    animation: ${props => props.data.skeletonEffect ? 'skeleton-effect linear .8s' : ''};
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

    @keyframes skeleton-effect {
        to {
            background-position: ${props => `left ${props.data.width}px top 0`};
        }
    }

    @media (max-width: 768px) {
        max-width: 75%;
        border-radius: ${props => props.data.height > 50 ? props.data.boxNotRoundRadius : props.data.boxRoundRadius};
    }
`;

export default MessageBox;