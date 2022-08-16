import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Agenda } from 'react-native-calendars';
import { mobileURI } from "../config/config";
import sortCurrentLessonsByDate from "../services/SortCurrentLessons";
import moment from 'moment';
import Data from '../data/AgendaData';
import axios from "axios";
import RenderDay from "../components/Agenda/renderDay";
import EmptyDay from "../components/Agenda/emptyDay";
import RenderItem from "../components/Agenda/renderItem";
import RenderKnob from "../components/Agenda/renderKnob";

moment.locale('ru');

const ScheduleScreen = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(true);

    const [items, setItems] = useState(Data);

	useEffect(() => {
        if(refreshing === true) {
            axios.get(`${mobileURI}/currentlessons`)
            .then(response => {
                const currentLessons = response.data;
                sortCurrentLessonsByDate(currentLessons);

                const newItems = JSON.parse(JSON.stringify(Data));
                for (const oneCurrentLesson of currentLessons) {
                    const beginDate = new Date(oneCurrentLesson.beginDate);
                    const endDate = new Date(oneCurrentLesson.endDate);
                    const dateForItem = beginDate.getFullYear()
                        + '-' +
                        ('0'+(beginDate.getMonth()+1)).slice(-2)
                        + '-' +
                        ('0'+(beginDate.getDate())).slice(-2);
                    const beginTime = ('0'+(beginDate.getHours())).slice(-2) 
                        + ':' + 
                        ('0'+(beginDate.getMinutes())).slice(-2);
                    
                    const endTime = ('0'+(endDate.getHours())).slice(-2) 
                        + ':' + 
                        ('0'+(endDate.getMinutes())).slice(-2)

                    const fixedImageUri = undefined;
                    if(oneCurrentLesson.teachers[0].imageUri !== undefined) {
                        fixedImageUri = oneCurrentLesson.teachers[0].imageUri.replace('http://localhost:5000', mobileURI);
                    }

                    const arrayName = oneCurrentLesson.teachers[0].name.split(' ');
                    let splittedName = '';
                    for(let i = 0; i < arrayName.length; i++) {
                        if(i === 0) {
                            splittedName += arrayName[i] + ' ';
                        } else {
                            splittedName += arrayName[i].slice(0, 1) + '.'
                        }
                    }
                    
                    const newLesson = {
                        title: oneCurrentLesson.name.name,
                        beginTime: beginTime,
                        endTime: endTime,
                        classroom: oneCurrentLesson.classroom.name,
                        teacher: {...oneCurrentLesson.teachers[0], imageUri: fixedImageUri, name: splittedName}
                    };
                    if(newItems[dateForItem]) {
                        newItems[dateForItem].push(newLesson);
                    } else {
                        newItems[dateForItem] = [newLesson];
                    }
                }
                setItems(newItems);
                onRefresh(false);
            })
        } 
        
	}, [refreshing]);

    const onRefresh = (boolean) => {
        setRefreshing(boolean);
    }

    return(
    <SafeAreaView style={{flex: 1}}>
        <Agenda 
            items={items}

            minDate={'2022-01-10'}
            maxDate={'2023-01-10'}

            renderItem={(item) => {
                return <RenderItem item={item}/>
            }}
            
            // Specify how each date should be rendered. day can be undefined if the item is not first in that day
            renderDay={(day, item) => {
                return <RenderDay day={day}/>
            }}

            renderEmptyDate={() => {
                return <EmptyDay/>
            }}
            //Кнопка под календарем
            renderKnob={() => {
                return <RenderKnob/>
            }}

            // Hide knob button. Default = false
            hideKnob={false}
            showClosingKnob={true}
            onRefresh={() => onRefresh(true)}
            refreshing={refreshing}
            futureScrollRange={50}
            pastScrollRange={50}
            rowHasChanged={(r1, r2) => {
                return r1.text !== r2.text;
            }}
            // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
            refreshControl={null}
            theme={{
                agendaDayTextColor: 'teal',
                agendaDayNumColor: 'teal',
                agendaTodayColor: 'teal',
                agendaKnobColor: 'blue'
            }}
        />
    </SafeAreaView>        
    );
};

export default ScheduleScreen;