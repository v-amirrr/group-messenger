import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMessage } from '../../hooks/useMessage';
import MessageBox from './MessageBox';
import MessageOptions from './MessageOptions';
import MessageDate from './MessageDate';
import MessageSelectCheck from './MessageSelectCheck';
import MessageUsername from './MessageUsername';
import MessageLoader from './MessageLoader';
import MessageReplyIcon from './MessageReplyIcon';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { messageVariants } from '../../config/varitans';

const Message = ({ messageData, type, options, onClick, replyIconClick, newreply }) => {
    const messageRef = useRef();
    const { selectedMessages } = useSelector(store => store.appStore);
    const {
        uid,
        plainText,
        time,
        id,
        replyTo,
        deleted,
        arrayText,
        previousMessageUid,
        nextMessageUid,
        previousMessageDifferentDate,
        nextMessageDifferentDate,
        username,
        isLocalMessage,
        isTextPersian,
        textLetters,
     } = messageData;
    const {
        messagePosition,
        messageClickHandler,
        messageDoubleClickHandler,
        onHoldStarts,
        onHoldEnds,
        selected,
        replyEffect,
        status,
        messageStyles
    } = useMessage(messageData, type, messageRef, options, onClick);
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
                    islocalmessage: isLocalMessage ? 1 : 0,
                    position: messagePosition,
                    date: previousMessageDifferentDate && time.year && time.month ? 1 : 0,
                }}
            >
                <MessageDate
                    layout={type == 'EDIT_REPLY' ? 0 : 1}
                    layoutId={type == 'EDIT_REPLY' ? id : null}
                    show={previousMessageDifferentDate && time.year}
                    date={{
                        year: time.year,
                        month: time.month,
                        day: time.day
                    }}
                />
                <MessageUsername
                    show={!isLocalMessage && messagePosition < 2}
                    username={username}
                    dateShown={previousMessageDifferentDate && time.year && time.month && time.day}
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
                    arrayText={arrayText}
                    plainText={plainText}
                    messageStyles={{
                        ...messageStyles,
                        type: type,
                        localmessage: isLocalMessage ? 1 : 0,
                        persian: isTextPersian ? 1 : 0,
                        letters: textLetters,
                        position: messagePosition,
                        selected: selected ? 1 : 0,
                        selectmode: selectedMessages.length ? 1 : 0,
                        date: previousMessageDifferentDate && time.year && time.month ? 1 : 0,
                        reply: replyTo != 'no_reply' ? 1 : 0,
                        replyeffect: replyEffect ? 1 : 0,
                        options: options?.messageOptions?.data?.id == id,
                    }}
                />
                <MessageSelectCheck
                    type={type}
                    selected={selected}
                    selectedMessagesLength={selectedMessages.length}
                    messageClickHandler={messageClickHandler}
                    isLocalMessage={isLocalMessage}
                />
                <MessageReplyIcon
                    editReply={newreply}
                    editReplyClick={replyIconClick}
                    show={newreply}
                />
                <MessageLoader status={status} />
            </MessageContainer>
        </>
    );
};

const MessageContainer = styled(motion.div)`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${props => props.data.islocalmessage ? 'row-reverse' : 'row'};
    padding-top: ${props =>
        props.data.position < 2 && !props.data.islocalmessage && !props.data.date ?
        '1.8rem' :
        props.data.position < 2 && !props.data.islocalmessage && props.data.date ?
        '3rem' :
        props.data.date && '1.8rem'
    };
    transition: padding .4s;
    width: 100%;

    .options {
        display: flex;
        justify-content: ${props => props.data.islocalmessage ? 'flex-end' : 'flex-start'};
        align-items: center;
    }

    @media (max-width: 768px) {
        .options {
            position: absolute;
        }
    }
`;

export default memo(Message);