export const setHour = (hour) => {
    return hour < 10 ? `0${hour}` : hour;
};