export const isURL = word => {
    let newWord = '';
    try {
        if (!/^https?:\/\//i.test(word)) {
            newWord = `http://${word}`;
        } else {
            newWord = word;
        }
        const url = new URL(newWord);
        return url.hostname && url.hostname.includes('.') ? { isLink: true, newWord: newWord } : { isLink: false, newWord: word };
    } catch {
        return { isLink: false, newWord: word };
    }
};