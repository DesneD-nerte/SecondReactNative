import { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import mainLogo from '../assets/favicon.png';
import { Agenda } from 'react-native-calendars';
import { Avatar, Divider, Input } from "react-native-elements";

const ScheduleScreen = () => {

    const [items, setItems] = useState({
        '2022-01-24': [{title: 'Programming', time: '10:15'}, {title: 'Math', time: '12:00'}, {title: 'Modelling', time: '14:10'}],
        '2022-01-25': [{title: 'Physics', time: '10.15'}],
        '2022-01-26': [],
        '2022-01-27': [],
        '2022-01-28': [{title: 'SQL', time: '12:00'}, {title: 'Programming', time: '14:10'}]
    });

    const imageUrl = 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg';

    const renderItem = (item) => {
        return (
            <View style={styles.mainContainer}>
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
        )
    }

	useEffect(() => {

	}, []);

    return(
    <SafeAreaView style={{flex: 1}}>
        <Agenda 
            items={items}
            // Callback that gets called when items for a certain month should be loaded (month became visible)
            loadItemsForMonth={month => {
                console.log('trigger items loading');
            }}
            // Callback that fires when the calendar is opened or closed
            onCalendarToggled={calendarOpened => {
                console.log(calendarOpened);
            }}
            // Callback that gets called on day press
            onDayPress={day => {
                console.log('day pressed');
            }}
            // Callback that gets called when day changes while scrolling agenda list
            onDayChange={day => {
                console.log('day changed');
            }}

            selected={'2022-01-24'}
            minDate={'2022-01-10'}
            maxDate={'2023-01-10'}

            // Specify how each item should be rendered in agenda
            // renderItem={(item, firstItemInDay) => {
            //     return (
            //         <SafeAreaView style={styles.container}>
                        
            //         </SafeAreaView>
            //     )
            // }}
            renderItem={renderItem}
            
            // Specify how each date should be rendered. day can be undefined if the item is not first in that day
            // renderDay={(day, item) => {
            //     return <View></View>;
            // }}
            // // Specify how empty date content with no items should be rendered
            renderEmptyDate={() => {
                return (
                    <View>
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
            onRefresh={() => console.log('refreshing...')}
            // Set this true while waiting for new data from a refresh
            refreshing={false}
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
        // <View style={styles.container}>
		// 	<StatusBar style="auto" />
		// 	<Agenda 
        //     />
			
		// 	{/* <Text>Open up App.js to start working on your app!</Text>
		// 	<Image source={mainLogo} alt='MainLogo'></Image>
		// 	<Button
		// 		title="Go to News Screen"
		// 		onPress={() => navigation.navigate('News', {name: text})}>                    
		// 	</Button> */}
        // </View>
        
    );

};

export default ScheduleScreen;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
        flex: 1
    },

    itemContainer: {
        alignItems: 'center',
        flex: 1
    }
})

//module.exports = HomeScreen;
//export default HomeScreen;