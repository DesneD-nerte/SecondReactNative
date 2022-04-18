import { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import mainLogo from '../assets/favicon.png';
import { LocaleConfig, Agenda } from 'react-native-calendars';
import { Avatar, Divider, Input } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";
import $api from "../http";
import { mobileURI } from "../config/config";
import sortCurrentLessonsByDate from "../services/SortCurrentLessons";
import moment from 'moment';

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

const ScheduleScreen = () => {
    const [refreshing, setRefreshing] = useState(true);

    const [items, setItems] = useState(
        // {
        // '2022-01-24': [{title: 'Programming', time: '10:15'}, {title: 'Math', time: '12:00'}, {title: 'Modelling', time: '14:10'}],
        // '2022-01-25': [{title: 'Physics', time: '10.15'}],
        // '2022-01-26': [],
        // '2022-01-27': [],
        // '2022-01-28': [{title: 'SQL', time: '12:00'}, {title: 'Programming', time: '14:10'}],
        // }
        {}
    );

    const imageUrl = 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg';

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.container} onPress={e => alert('pressed item')}>
                <View style={styles.mainContainer} >
                    <View style={styles.itemContainer}>
                        <Text>{item.time}</Text>
                        <Text>{item.title}</Text>
                        <Text>453</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Avatar size={30} rounded source={{uri: imageUrl}}></Avatar>
                        <Text>Петров С.М.</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

	useEffect(() => {
        if(refreshing === true) {
            $api.get(`${mobileURI}/api/currentlessons`)
            .then(response => {
                const currentLessons = response.data;
                sortCurrentLessonsByDate(currentLessons);

                const newItems = {};
                for (const oneCurrentLesson of currentLessons) {
                    const date = new Date(oneCurrentLesson.beginDate);
                    const dateForItem = date.getFullYear()
                        + '-' +
                        ('0'+(date.getMonth()+1)).slice(-2)
                        + '-' +
                        ('0'+(date.getDate())).slice(-2);
                    const beginTime = ('0'+(date.getHours())).slice(-2) 
                        + ':' + 
                        ('0'+(date.getMinutes())).slice(-2)

                    newItems[dateForItem] = [{title: oneCurrentLesson.name.name, time: beginTime}];
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
            // Specify your item comparison function for increased performance
            rowHasChanged={(r1, r2) => {
                return r1.text !== r2.text;
            }}
            // Hide knob button. Default = false
            hideKnob={false}
            // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
            showClosingKnob={true}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            // markedDates={{
            //     '2012-05-16': {selected: true, marked: true},
            //     '2012-05-17': {marked: true},
            //     '2012-05-18': {disabled: true}
            // }}
            // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
            onRefresh={onRefresh}
            // Set this true while waiting for new data from a refresh
            refreshing={refreshing}
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
        flex: 1, 
        justifyContent:'center',
        marginLeft: 5
    }
})

//module.exports = HomeScreen;
//export default HomeScreen;