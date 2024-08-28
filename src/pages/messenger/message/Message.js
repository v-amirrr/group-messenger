import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMessage } from '../../../hooks/useMessage';
import MessageBox from './MessageBox';
import MessageDate from './MessageDate';
import MessageSelectCheckbox from './MessageSelectCheckbox';
import MessageUsername from './MessageUsername';
import MessageSendStatus from './MessageSendStatus';
import MessageEditReplyIndicator from './MessageEditReplyIndicator';
import MessageRepliedTo from './MessageRepliedTo';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { localMessageVariants, nonLocalMessageVariants } from '../../../config/varitans';

const Message = ({ messageData, type }) => {

    const messageRef = useRef();
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { editReply } = useSelector(store => store.appStore);

    const {
        uid,
        plainText,
        time,
        id,
        replyTo,
        arrayText,
        previousMessageUid,
        nextMessageUid,
        previousMessageDifferentDate,
        nextMessageDifferentDate,
        isLocalMessage,
        isTextPersian,
        textLetters,
    } = messageData;

    const showMessageDate = () => previousMessageDifferentDate && time?.year;

    const showMessageUsername = () => !isLocalMessage && messagePosition < 2;

    const showMessageSelectCheckbox = () => selectedMessages?.length ? true : false;

    const showEditReplyIndicator = () => editReply?.replyId == id;

    const showRepliedTo = () => replyTo != 'NO_REPLY' && type != 'TRASH';

    const {
        messagePosition,
        messageClickHandler,
        selected,
        messageSkeletonEffect,
        status,
        styles
    } = useMessage(messageData, type, messageRef);

    return (
        <>
            <MessageContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={isLocalMessage ? localMessageVariants : nonLocalMessageVariants}
                layout
                layoutId={id}
                ref={messageRef}
                styles={{ ...styles }}
            >
                {showMessageDate() && <MessageDate layout layoutId={id} data={time} />}
                {showMessageUsername() && <MessageUsername uid={uid} isUserSelecting={selectedMessages?.length} showMessageDate={showMessageDate()} />}
                <AnimatePresence>
                    {showMessageSelectCheckbox() && <MessageSelectCheckbox selected={selected} messageClickHandler={messageClickHandler} isLocalMessage={isLocalMessage} />}
                </AnimatePresence>
                <MessageBox
                    messageClickHandler={messageClickHandler}
                    data={{
                        type: type,
                        replyTo: replyTo,
                        arrayText: arrayText,
                        plainText: plainText,
                    }}
                    styles={{
                        ...styles,
                        persian: isTextPersian ? 1 : 0,
                        skeletonEffect: messageSkeletonEffect ? 1 : 0,
                    }}
                />
                {showRepliedTo() ? <MessageRepliedTo replyTo={replyTo} type={type} isLocalMessage={isLocalMessage} /> : ''}
                <div className='next-to-message'>
                    <AnimatePresence>
                        {showEditReplyIndicator() ? <MessageEditReplyIndicator key='MessageEditReplyIndicator' /> : ''}
                    </AnimatePresence>
                    <MessageSendStatus status={status} />
                </div>
            </MessageContainer>
        </>
    );
};

const MessageContainer = styled(motion.div)`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${props => props.styles.messageFlexDirection};
    padding-top: ${props => props.styles.messagePaddingTop};
    transition: padding .2s;

    .next-to-message {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: ${props => props.styles.nextToMessageFlexDirection};
        margin: 0 .4rem;
    }
`;

export default memo(Message);