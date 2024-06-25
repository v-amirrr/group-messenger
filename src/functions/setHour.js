import { deviceHourFormat } from "./deviceHourFormat";

export const setHour = (hour) => {
    if (deviceHourFormat() == 12) {
        if (hour > 12) {
            let editedHour = hour - 12;
            return editedHour < 10 ? `0${editedHour}` : editedHour;
        } else {
            return hour < 10 ? `0${hour}` : hour;
        }
    } else {
        return hour < 10 ? `0${hour}` : hour;
    }
};