export const findReplyId = (messages, replyToId, messageIndex) => {
    let filteredMessages = messages.filter((item, index) => index < messageIndex);
    let replyId = filteredMessages.find(item => item.id == replyToId);
    return replyId ? replyId : 'DELETED_REPLY';
};