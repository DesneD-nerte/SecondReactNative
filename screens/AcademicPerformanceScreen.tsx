import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Group, Lesson } from "../types";
import JournalDataGrid from "../components/Journal/JournalDataGrid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loadInformation } from "../store/slices/informationSlice";
import useMarks from "../hooks/journal/useMarks";
import DefaultPicker from "../components/Journal/DefaultPicker";
import DatePicker from "../components/Journal/DatePicker";

const AcademicPerformanceScreen = ({ navigation, route }) => {
    const information = useSelector((state: RootState) => state.information);
    const dispatch = useDispatch<AppDispatch>();

    const [selectedLesson, setSelectedLesson] = useState<Lesson>(information.lessons[0]);
    const [selectedGroup, setSelectedGroup] = useState<Group>(information.groups[0]);
    const [selectedDate, setSelectedDate] = useState();

    useEffect(() => {
        dispatch(loadInformation());
    }, []);

    const currentMarks = useMarks({ selectedLesson, selectedGroup });

    return (
        <View style={{ backgroundColor: "white" }}>
            <DefaultPicker
                selectedValue={selectedLesson}
                setSelectedValue={setSelectedLesson}
                arrayValue={information.lessons}
            />

            <DefaultPicker
                selectedValue={selectedGroup}
                setSelectedValue={setSelectedGroup}
                arrayValue={information.groups}
            />

            <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                currentMarks={currentMarks}
            />

            {currentMarks && currentMarks.length !== 0 && (
                <JournalDataGrid
                    currentMarks={currentMarks}
                    selectedDate={selectedDate}
                />
            )}
        </View>
    );
};

export default AcademicPerformanceScreen;
