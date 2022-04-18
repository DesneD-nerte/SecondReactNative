import { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { LocaleConfig, Agenda } from 'react-native-calendars';
import { Avatar, Divider, Input } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";
import moment from 'moment';
import { Marks } from "../../types";

type currentMarksProps = {
	currentMarks: Array<Marks>,
	selectedDate: Date
}

function JournalDataGrid(props: currentMarksProps) {

	const {currentMarks, selectedDate} = props;

	return (
		<View style={styles.container}>
			{
				currentMarks.map(oneMark => {
					const selectedDateLessons = oneMark.allCurrentLessons.find(oneCurrentLesson => {
						// console.log(selectedDate);
						return oneCurrentLesson.currentLesson.beginDate === selectedDate
					})
					console.log(selectedDateLessons);
					return (
						 <View style={styles.oneMark}>
							<View style={styles.leftPosition}>
								<Text numberOfLines={1}>
									{oneMark.user.name}
								</Text>
							</View>
							<View style={styles.rightPosition}>
								<TextInput placeholder={selectedDateLessons?.mark.toString()} style={styles.inputRightPosition} maxLength={8}>

								</TextInput>
							</View>
						</View> 
					)
				})
			}
			{/* <View style={styles.oneMark}>
				<View style={styles.leftPosition}>
					<Text numberOfLines={1}>
						{currentMarks[0].user.name}
					</Text>
				</View>
				<View style={styles.rightPosition}>
					<TextInput placeholder="123" style={styles.inputRightPosition} maxLength={8}>

					</TextInput>
				</View>
			</View> */}
			
		</View>
	)
}

export default JournalDataGrid


const styles = StyleSheet.create({
    container: {
		backgroundColor: 'white'
    },
	oneMark: {
		display: "flex",
		flexDirection: 'row',
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	leftPosition: {
		display: "flex",
		// alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		borderWidth: 1,
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		borderColor: '#CFCFCF',
		flex: 0.8
	},
	rightPosition: {
		display: "flex",
		// alignItems: 'center',
		borderWidth: 1,
		borderLeftWidth: 0,
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		borderColor: '#CFCFCF',
		padding: 15,
		flex: 0.2
	},
	inputRightPosition: {
		
	}
	
})