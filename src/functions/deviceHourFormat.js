export const deviceHourFormat = () => {
    const date = new Date();
    const timeString = date.toLocaleTimeString();

    if (!timeString.toLowerCase().includes('am') && !timeString.toLowerCase().includes('pm')) {
        return 24;
    }
    else {
        return 12;
    }
  }