import { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { LocaleConfig, Agenda } from 'react-native-calendars';
import { Avatar, Divider, Input } from "react-native-elements";
import { mobileURI } from "../config/config";
import sortCurrentLessonsByDate from "../services/SortCurrentLessons";
import moment from 'moment';
import Data from '../data/AgendaData';
import axios from "axios";

moment.locale('ru');

LocaleConfig.locales['ru'] = {
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ],
    monthNamesShort: ['Янв.', 'Фвр.', 'Март', 'Апр.', 'Mай', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
    dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    dayNamesShort: ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'],
    today: "Сегодня"
};

LocaleConfig.defaultLocale = 'ru';

const dayNamesShort = ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'];

const ScheduleScreen = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(true);

    const [items, setItems] = useState(
        // {
        // '2022-01-24': [{title: 'Programming', time: '10:15'}, {title: 'Math', time: '12:00'}, {title: 'Modelling', time: '14:10'}],
        // '2022-01-25': [{title: 'Physics', time: '10.15'}],
        // '2022-01-26': [],
        // '2022-01-27': [],
        // '2022-01-28': [{title: 'SQL', time: '12:00'}, {title: 'Programming', time: '14:10'}],
        // }
        Data
    );
    
    const navigateToJournal = (item) => {
        navigation.navigate('Performance');
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.container} onPress={(e) => navigateToJournal(item)}>
                <View style={styles.mainContainer} >
                    <View style={styles.itemContainer}>
                        <Text style={{fontWeight: "bold"}}>{item.title}</Text>
                        <Text>{item.beginTime} - {item.endTime}</Text>
                        <Text>{item.classroom}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        {item.teacher.imageUri 
                            ?
                                <Avatar size={30} rounded source={{uri: item.teacher.imageUri}}></Avatar>
                            :
                                <Avatar size={30} rounded icon={{type:'font-awesome', name: 'user', color: '#5387E7'}}  overlayContainerStyle={{backgroundColor: '#DBDBDB'}}></Avatar>
                        }
                        <Text>{item.teacher.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

	useEffect(() => {
        if(refreshing === true) {
            axios.get(`${mobileURI}/api/currentlessons`)
            .then(response => {
                const currentLessons = response.data;
                sortCurrentLessonsByDate(currentLessons);

                // const newItems = {};
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

            renderItem={renderItem}
            
            // Specify how each date should be rendered. day can be undefined if the item is not first in that day
            renderDay={(day, item) => {
                if(day) {
                    return (
                        <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 30, color: '#2089dc'}}>
                                {day.getDate()}
                            </Text>
                            <Text style={{color: '#2089dc'}}>
                                {dayNamesShort[day.getDay()]}
                            </Text>
                        </View>
                    )
                } else {
                    return (
                        <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
                            
                        </View>
                    )
                }
            }}
            // // Specify how empty date content with no items should be rendered
            renderEmptyDate={() => {
                return (
                    <View style={styles.emptyDateContainer}>
                        <Text>
                            Нет предметов
                        </Text>
                        <Divider/>
                    </View>
                )
            }}
            //Кнопка под календарем
            renderKnob={() => {
                return (
                    <View style={{flex:1,
                        paddingHorizontal: 25,
                        marginVertical: 7.5,
                        backgroundColor: 'lightgray',
                        borderRadius: 20}}>
                    </View>
                );
            }}
            // Specify what should be rendered instead of ActivityIndicator
            renderEmptyData={() => {
                return <View style={{flex: 1, justifyContent: "center"}}>
                            <ActivityIndicator size="large"></ActivityIndicator>
                        </View>
            }}
            // Hide knob button. Default = false
            hideKnob={false}
            // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
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
            // Agenda theme
            theme={{
                agendaDayTextColor: 'teal',
                agendaDayNumColor: 'teal',
                agendaTodayColor: 'teal',
                agendaKnobColor: 'blue'
            }}

            // Agenda container style
            style={{container: {
                flex: 1,
                paddingTop: StatusBar.currentHeight,
            },
            scrollView: {
                backgroundColor: 'pink',
                marginHorizontal: 20,
            },
            text: {
                fontSize: 42,
            },}}
        />
    </SafeAreaView>        
    );
};

export default ScheduleScreen;


const styles = StyleSheet.create({
    container: {
        margin: 5
    },

    mainContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 75,
        // margin: 5,
        padding: 5,
        alignItems: 'center',
        flex: 1
    },

    itemContainer: {
        alignItems: 'center',
        flex: 1
    },

    emptyDateContainer: {
        display: 'flex',
        flex: 1.5, 
        justifyContent:'center',
        marginLeft: 5
    }
})