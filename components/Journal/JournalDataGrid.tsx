import { ScrollView, TextInput } from "react-native";
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from "react-native-elements";
import { Marks } from "../../types";

type currentMarksProps = {
	currentMarks: Array<Marks>,
	selectedDate: Date
}

function JournalDataGrid(props: currentMarksProps) {

	const {currentMarks, selectedDate} = props;

	return (
		<ScrollView style={styles.container}>
			{
				currentMarks.map(oneMark => {
					const selectedDateLessons = oneMark.allCurrentLessons.find(oneCurrentLesson => {
						return oneCurrentLesson.currentLesson.beginDate === selectedDate
					})
					return (
						<View style={styles.oneMark} key={oneMark._id.toString()}>
							<View style={styles.leftPosition}>
								{oneMark.user.imageUri 
								?
									<Avatar size={30} rounded source={{uri: oneMark.user.imageUri.toString()}}></Avatar>
								:
									<Avatar size={30} rounded icon={{type:'font-awesome', name: 'user', color: '#5387E7'}}  overlayContainerStyle={{backgroundColor: '#DBDBDB'}}></Avatar>
								}
								<Text style={styles.textName} numberOfLines={1}>
									{oneMark.user.name}
								</Text>
							</View>
							<View style={styles.rightPosition}>
								<TextInput placeholder={selectedDateLessons?.mark.toString()}
									style={styles.inputRightPosition} 
									maxLength={8}>
								</TextInput>
							</View>
						</View> 
					)
				})
			}
		</ScrollView>
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
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: 15,
		borderWidth: 1,
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		borderColor: '#CFCFCF',
		flex: 0.8
	},

	textName: {
		flex: 1,
		marginLeft: 10,
		flexWrap: 'wrap'
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