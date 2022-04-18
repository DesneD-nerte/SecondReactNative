import React, {useState, useEffect, useContext} from "react";
import { View, Text } from "react-native"
import {Picker} from '@react-native-picker/picker';
import { CurrentLesson, Group, Lesson, Marks } from "../types";
import axios from "axios";
import $api from "../http";
import { mobileURI } from "../config/config";
import moment from "moment";
import JournalDataGrid from "../components/Journal/JournalDataGrid";
import { Divider } from "react-native-elements";

type informationType = {
    groups: Array<Group>,
    lessons: Array<Lesson>,
    currentLessons: Array<CurrentLesson>,
    marks: Array<Marks>,
}

const AcademicPerformanceScreen = ({ navigation, route }) => {
    const [selectedLesson, setSelectedLesson] = useState();
    const [selectedGroup, setSelectedGroup] = useState();
    const [currentMarks, setCurrentMarks] = useState<Array<Marks>>();
    const [selectedDate, setSelectedDate] = useState();

    const [information, setInformation] = useState<informationType>({
        groups: [],
        lessons: [],
        currentLessons: [],
        marks: []
    });

    useEffect(() => {
        const requestGroups = $api.get(`${mobileURI}/api/groups`);
        const requestLessons = $api.get(`${mobileURI}/api/lessons`);
        const requestCurrentLessons = $api.get(`${mobileURI}/api/currentlessons`)
        const requestMarks = $api.get(`${mobileURI}/api/marks`)

        axios.all([requestGroups, requestLessons, requestCurrentLessons, requestMarks])
        .then(axios.spread((...response) => {
            const responseGroups= response[0].data;
            const responseLessons = response[1].data;
            const responseCurrentLessons = response[2].data;
            const responseMarks= response[3].data;

            setInformation({
                groups: responseGroups,
                lessons: responseLessons,
                currentLessons: responseCurrentLessons,
                marks: responseMarks,
            })
        }))
        .catch(error => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        const filteredMarks = information.marks.filter((oneMark, index) => {
            return (oneMark.lesson.name === selectedLesson &&
                oneMark.user.groups?.some((oneGroupObject) => oneGroupObject.name === selectedGroup));
        })

        setCurrentMarks(filteredMarks);
    }, [selectedLesson, selectedGroup])

    return(
        <View style={{backgroundColor: 'white'}}>
            <Picker
                selectedValue={selectedLesson}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLesson(itemValue)
                }>
                {
                    information.lessons.map((oneLesson: Lesson) => {
                        return <Picker.Item label={oneLesson.name.toString()} value={oneLesson.name.toString()} key={oneLesson._id as React.Key}/>
                    })
                }
            </Picker>

            <Picker
                selectedValue={selectedGroup}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedGroup(itemValue)
                }>
                {
                    information.groups.map((oneGroup: Group) => {
                        return <Picker.Item label={oneGroup.name.toString()} value={oneGroup.name} key={oneGroup._id as React.Key}/>
                    })
                }
            </Picker>

            <Picker
                selectedValue={selectedDate}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedDate(itemValue)
                }>
                    <Picker.Item label="Дата занятия " value="" color="#bdb9b9" />
                {
                    currentMarks !== undefined && currentMarks.length !== 0
                    ? 
                        currentMarks.find(elem => elem)//Нужно взять любого человека и заполнить даты
                        .allCurrentLessons?.map((oneMark) => {
                            return <Picker.Item label={moment(oneMark.currentLesson.beginDate).format("LL")} value={oneMark.currentLesson.beginDate} key={oneMark._id as React.Key}/>
                        })
                    :
                        <Picker.Item label="Занятий нет" value={-1}/>
                }
            </Picker>
            {
                currentMarks !== undefined && currentMarks.length !== 0
                ? 
                    <JournalDataGrid currentMarks={currentMarks} selectedDate={selectedDate}></JournalDataGrid>
                :
                null
            }
        </View>
    )
}

export default AcademicPerformanceScreen;


