import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useMessage } from '../../hooks/useMessage';
import MessageOptions from './MessageOptions';
import MessageDate from './MessageDate';
import MessageReply from './MessageReply';
import MessageSelectCheck from './MessageSelectCheck';
import MessageUsername from './MessageUsername';
import MessageLoader from './MessageLoader';
import MessageReplyIcon from './MessageReplyIcon';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { messageVariants } from '../../config/varitans';

const Message = ({ message, type, options, onClick, replyIconClick, newreply }) => {
    const {
        messageUid,
        localUid,
        localMessage,
        text,
        plainText,
        isTextPersian,
        textLetters,
        id,
        replyTo,
        messageUsername,
        periorUsername,
        nextUsername,
        time,
        priorDifferentDate,
        nextDifferentDate,
    } = message;
    const { selectedMessages } = useSelector(store => store.appStore);
    const messageRef = useRef();
    const { applyScrollMessageId } = useMessageOptions();
    const {
        messagePosition,
        messageClickHandler,
        messageDoubleClickHandler,
        onHoldStarts,
        onHoldEnds,
        selected,
        replyEffect,
        status,
    } = useMessage(message, type, messageRef, options, onClick);

    return (
        <>
            <MessageContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={messageVariants}
                ref={messageRef}
                layout={type == 'EDIT_REPLY' ? 0 : 1}
                layoutId={type == 'EDIT_REPLY' ? id : null}
                data={{
                    type: type,
                    localmessage: localMessage ? 1 : 0,
                    persian: isTextPersian ? 1 : 0,
                    letters: textLetters,
                    position: messagePosition,
                    selected: selected ? 1 : 0,
                    selectmode: selectedMessages.length ? 1 : 0,
                    date: priorDifferentDate && time.year && time.month ? 1 : 0,
                    reply: replyTo != 'no_reply' ? 1 : 0,
                    replyeffect: replyEffect ? 1 : 0,
                    len: replyTo != 'no_reply' && !replyTo?.deleted && type != 'TRASH' ?
                        textLetters+replyTo?.message?.length < 5 ?
                        5 :
                        textLetters+replyTo?.message?.length+1 :
                        textLetters < 5 ?
                        5 :
                        textLetters+1
                }}
            >
                <MessageDate
                    layout={type == 'EDIT_REPLY' ? 0 : 1}
                    layoutId={type == 'EDIT_REPLY' ? id : null}
                    show={priorDifferentDate && time.year}
                    date={{
                        year: time.year,
                        month: time.month,
                        day: time.day
                    }}
                />
                <MessageUsername
                    show={messageUid != localUid && messagePosition < 2}
                    username={messageUsername}
                    dateShown={priorDifferentDate && time.year && time.month && time.day}
                    selectMode={selectedMessages.length ? 1 : 0}
                />
                <div
                    className='message-box'
                    onClick={(e) => messageClickHandler(e)}
                    onDoubleClick={messageDoubleClickHandler}
                    onMouseDown={onHoldStarts}
                    onMouseUp={onHoldEnds}
                    onTouchStart={onHoldStarts}
                    onTouchEnd={onHoldEnds}
                >
                    <div className='message-text'>
                        <MessageReply
                            replyTo={replyTo}
                            type={type}
                            applyScrollMessageId={applyScrollMessageId}
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
                </div>
                <MessageSelectCheck
                    type={type}
                    selected={selected}
                    selectedMessagesLength={selectedMessages.length}
                    messageClickHandler={messageClickHandler}
                    localMessage={localMessage}
                />
                <MessageReplyIcon
                    editReply={newreply}
                    editReplyClick={replyIconClick}
                    show={newreply}
                />
                <div className='options'>
                    <MessageOptions options={options} id={id} />
                </div>
                <MessageLoader
                    status={status}
                />
            </MessageContainer>
        </>
    );
};

const MessageContainer = styled(motion.div)`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${props => props.data.localmessage ? 'row-reverse' : 'row'};
    padding-top: ${props =>
        props.data.position < 2 && !props.data.localmessage && !props.data.date ?
        '1.8rem' :
        props.data.position < 2 && !props.data.localmessage && props.data.date ?
        '3rem' :
        props.data.date && '1.8rem'
    };
    transition: padding .4s;

    .options {
        display: flex;
        justify-content: ${props => props.data.localmessage ? 'flex-end' : 'flex-start'};
        align-items: center;
    }

    .message-box {
        z-index: 1;
        display: flex;
        justify-content: ${props => props.data.localmessage ? 'flex-start' : 'flex-end'};
        align-items: center;
        background-color: var(--normal-bg);
        margin: ${props =>
            props.data.type == 'TRASH' ?
            '.2rem' :
            props.data.position == 0 ?
            '.1rem 0 .1rem 0' :
            props.data.position == 1 ?
            '.1rem 0 .06rem 0' :
            props.data.position == 2 ?
            '.06rem 0 .06rem 0' :
            props.data.position == 3 &&
            '.06rem 0 .2rem 0'
        };
        margin-right: ${props =>
            props.data.type == 'TRASH' ?
            '2rem' :
            props.data.selectmode && props.data.localmessage ?
            '3rem' :
            ''
        };
        margin-left: ${props =>
            props.data.type != 'TRASH' && props.data.selectmode && !props.data.localmessage ?
            '3rem' :
            ''
        };
        border-radius: 25px;
        border-radius: ${props =>
            props.data.type == 'TRASH' ?
            '20px' :
            props.data.localmessage ?
            props.data.position == 0 ?
            '25px' : props.data.position == 1 ?
            '25px 25px 5px 25px' :
            props.data.position == 2 ?
            '25px 5px 5px 25px' :
            props.data.position == 3 &&
            '25px 5px 25px 25px' :
            props.data.position == 0 ?
            '5px 25px 25px 25px' :
            props.data.position == 1 ?
            '5px 25px 25px 5px' :
            props.data.position == 2 ?
            '5px 25px 25px 5px' :
            props.data.position == 3 &&
            '5px 25px 25px 25px'
        };
        padding: ${props =>
            props.data.type == 'TRASH' && props.data.letters > 3 ?
            '.5rem' :
            props.data.type == 'TRASH' && props.data.letters <= 3 ?
            '.5rem 1rem' :
            props.data.reply ?
            '.45rem .8rem .45rem .45rem' :
            props.data.letters <= 3 ?
            '.45rem 1rem' :
            props.data.letters > 3 ?
            '.45rem .7rem' : ''
        };
        width: fit-content;
        max-width: ${props => props.data.type == 'EDIT_REPLY' || props.data.type == 'TRASH' ? '80%' : '65%'};
        word-break: break-all;
        cursor: pointer;
        box-shadow: var(--normal-shadow);
        color: var(--normal-color);
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
    }

    @media (max-width: 768px) {
        .message-box {
            max-width: 85%;
            border-radius: ${props => props.data.localmessage ?
                props.data.position == 0 ?
                '20px' :
                props.data.position == 1
                ? '20px 20px 5px 20px' :
                props.data.position == 2 ?
                '20px 5px 5px 20px' :
                props.data.position == 3 &&
                '20px 5px 20px 20px' :
                props.data.position == 0 ?
                '5px 20px 20px 20px' :
                props.data.position == 1 ?
                '5px 20px 20px 5px' :
                props.data.position == 2 ?
                '5px 20px 20px 5px' :
                props.data.position == 3 &&
                '5px 20px 20px 20px'
            };
        }

        .options {
            position: absolute;
        }
    }
`;

export default memo(Message);