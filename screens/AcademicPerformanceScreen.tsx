import React, {useState, useEffect} from "react";
import { View, Text } from "react-native"
import {Picker} from '@react-native-picker/picker';
import { CurrentLesson, Group, Lesson, Marks } from "../types";
import axios from "axios";
import { mobileURI } from "../config/config";
import moment from "moment";
import JournalDataGrid from "../components/Journal/JournalDataGrid";

type informationType = {
    groups: Array<Group>,
    lessons: Array<Lesson>,
    currentLessons: Array<CurrentLesson>,
    marks: Array<Marks>,
}

const AcademicPerformanceScreen = ({ navigation, route }) => {

    const [selectedLesson, setSelectedLesson] = useState<Lesson>();
    const [selectedGroup, setSelectedGroup] = useState<Group>();
    const [currentMarks, setCurrentMarks] = useState<Array<Marks>>();
    const [selectedDate, setSelectedDate] = useState();

    const [information, setInformation] = useState<informationType>({
        groups: [],
        lessons: [],
        currentLessons: [],
        marks: []
    });

    useEffect(() => {
        const requestGroups = axios.get(`${mobileURI}/api/groups`);
        const requestLessons = axios.get(`${mobileURI}/api/lessons`);
        const requestCurrentLessons = axios.get(`${mobileURI}/currentlessons`)
        const requestMarks = axios.get(`${mobileURI}/marks`)

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
            return (oneMark.lesson._id === selectedLesson?._id &&
                oneMark.user.groups?.some((oneGroupObject) => oneGroupObject._id === selectedGroup?._id));
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
                        return <Picker.Item label={oneLesson.name.toString()} value={oneLesson} key={oneLesson._id as React.Key}/>
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
                        return <Picker.Item label={oneGroup.name.toString()} value={oneGroup} key={oneGroup._id as React.Key}/>
                    })
                }
            </Picker>

            <Picker
                selectedValue={selectedDate}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedDate(itemValue)
                }}>
                    <Picker.Item label="Дата занятия " value="" color="#bdb9b9" />
                {
                    currentMarks !== undefined && currentMarks.length !== 0
                    ? 
                        // currentMarks.find(elem => elem)//Нужно взять любого человека и заполнить даты
                        currentMarks[0]
                        .allCurrentLessons.map((oneMark) => {
                            return <Picker.Item label={moment(oneMark.currentLesson.beginDate).format("LL")} value={oneMark.currentLesson.beginDate} key={oneMark._id as React.Key}/>
                        })
                    :
                        <Picker.Item label="Занятий нет" value={-1}/>
                }
            </Picker>
            {
                currentMarks !== undefined && currentMarks.length !== 0 &&
                    <JournalDataGrid currentMarks={currentMarks} selectedDate={selectedDate}/>
            }
        </View>
    )
}

export default AcademicPerformanceScreen;


