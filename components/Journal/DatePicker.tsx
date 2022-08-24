import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import React, { Dispatch, SetStateAction } from "react";
import { Marks } from "../../types";
import DefaultPicker from "./DefaultPicker";

interface IDatePicker {
    selectedDate: Date;
    setSelectedDate: Dispatch<SetStateAction<Date>>;
    currentMarks: Marks[];
}

const DatePicker = (props: IDatePicker) => {
    const { selectedDate, setSelectedDate, currentMarks } = props;

    return (
        <DefaultPicker selectedValue={selectedDate} setSelectedValue={setSelectedDate}>
            <Picker.Item label="Дата занятия " value="" color="#bdb9b9" key={0} />
            {currentMarks && currentMarks.length !== 0 ? (
                //Нужно взять любого человека и заполнить даты
                currentMarks[0].allCurrentLessons.map((oneMark) => {
                    return (
                        <Picker.Item
                            label={moment(oneMark.currentLesson.beginDate).format("LL")}
                            value={oneMark.currentLesson.beginDate}
                            key={oneMark._id as React.Key}
                        />
                    );
                })
            ) : (
                <Picker.Item label="Занятий нет" value={-1} key={-1} />
            )}
        </DefaultPicker>
    );
};

export default DatePicker;
