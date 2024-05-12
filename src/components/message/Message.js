import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMessage } from '../../hooks/useMessage';
import MessageOptions from './MessageOptions';
import MessageDate from './MessageDate';
import MessageSelectCheck from './MessageSelectCheck';
import MessageUsername from './MessageUsername';
import MessageLoader from './MessageLoader';
import MessageReplyIcon from './MessageReplyIcon';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { messageVariants } from '../../config/varitans';
import MessageBox from './MessageBox';

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
    const messageRef = useRef();
    const { selectedMessages } = useSelector(store => store.appStore);
    const {
        messagePosition,
        messageClickHandler,
        messageDoubleClickHandler,
        onHoldStarts,
        onHoldEnds,
        selected,
        replyEffect,
        status,
        messageData
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
                    position: messagePosition,
                    date: priorDifferentDate && time.year && time.month ? 1 : 0,
                }}>
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
                <MessageBox
                    functions={{
                        messageClickHandler,
                        messageDoubleClickHandler,
                        onHoldStarts,
                        onHoldEnds,
                        onHoldStarts
                    }}
                    type={type}
                    replyTo={replyTo}
                    text={text}
                    data={{
                        ...messageData,
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
                        len: replyTo != 'no_reply' && replyTo && !replyTo?.deleted && type != 'TRASH' ?
                            textLetters+replyTo?.message?.length < 5 ?
                            5 :
                            textLetters+replyTo?.message?.length+1 :
                            textLetters < 5 ?
                            5 :
                            textLetters+1
                    }}
                />
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

    @media (max-width: 768px) {
        .options {
            position: absolute;
        }
    }
`;

export default memo(Message);