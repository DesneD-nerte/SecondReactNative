class DateMessage {
    static CheckDateMessage (currentDate: Date, previousDate: Date) : boolean {
        if(currentDate.getFullYear() === previousDate.getFullYear() &&
            currentDate.getMonth() === previousDate.getMonth() &&
            currentDate.getDate() === previousDate.getDate()) {
                return false;
        }

        return true;
    }
}

export default DateMessage;