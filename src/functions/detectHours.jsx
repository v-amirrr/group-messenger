export const detectHours = (hour) => {
    return hour < 12 ? 'AM' : 'PM';
};