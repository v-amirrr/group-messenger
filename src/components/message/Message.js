import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMessage } from '../../hooks/useMessage';
import MessageBox from './MessageBox';
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
    const { uid, plainText, time, id, replyTo, arrayText, previousMessageUid, nextMessageUid, previousMessageDifferentDate, nextMessageDifferentDate, isLocalMessage, isTextPersian, textLetters, } = messageData;
    const { messagePosition, messageClickHandler, messageDoubleClickHandler, onHoldStarts, onHoldEnds, selected, skeletonEffect, status, messageStyles } = useMessage(messageData, type, messageRef, options, onClick);
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
                    date: previousMessageDifferentDate && time?.year && time?.month ? 1 : 0,
                }}
            >
                <MessageDate
                    layout
                    layoutId={id}
                    show={previousMessageDifferentDate && time?.year}
                    data={time}
                />
                <MessageUsername
                    show={!isLocalMessage && messagePosition < 2}
                    data={{
                        uid,
                        dateShown: previousMessageDifferentDate && time?.year,
                        selectMode: selectedMessages?.length
                    }}
                />
                <MessageBox
                    data={{
                        functions: {
                            messageClickHandler,
                            onHoldStarts,
                            onHoldEnds,
                            onHoldStarts,
                        },
                        type: type,
                        replyTo: replyTo,
                        arrayText: arrayText,
                        plainText: plainText,
                        messageStyles: {
                            ...messageStyles,
                            type: type,
                            localmessage: isLocalMessage ? 1 : 0,
                            persian: isTextPersian ? 1 : 0,
                            letters: textLetters,
                            position: messagePosition,
                            selected: selected ? 1 : 0,
                            selectmode: selectedMessages?.length ? 1 : 0,
                            date: previousMessageDifferentDate && time?.year && time?.month ? 1 : 0,
                            reply: replyTo != 'no_reply' ? 1 : 0,
                            replyeffect: skeletonEffect ? 1 : 0,
                            options: options?.messageOptions?.data?.id == id,
                        }
                    }}
                />
                <MessageSelectCheck
                    type={type}
                    selected={selected}
                    selectedMessagesLength={selectedMessages?.length}
                    messageClickHandler={messageClickHandler}
                    isLocalMessage={isLocalMessage}
                />
                <MessageReplyIcon
                    editReply={newreply}
                    editReplyClick={replyIconClick}
                    show={newreply && type != 'TRASH'}
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