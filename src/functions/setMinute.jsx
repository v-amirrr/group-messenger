export const setMinute = (minute) => {
    return minute < 10 ? `0${minute}` : minute;
};