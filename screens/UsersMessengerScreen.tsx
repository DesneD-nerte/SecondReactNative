import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import UsersMessangerItem from '../components/Chat/UsersMessangerItem'
import { mobileURI } from '../config/config';
// import ChatRooms from '../data/ChatRooms';
import $api from '../http';
import { ChatType, User } from '../types';

export const UsersMessengerScreen = ({navigation, route}) => {
	const {socket} = route.params;

	const myData = useSelector((state) => ({...state.profileData}));
	
	const [listUsers, setListUsers] = useState<Array<User>>([]);
	const [showingListUsers, setShowingListUsers] = useState<Array<User>>();
	const [searchedUser, setSearcherUser] = useState('');

	useEffect(() => {
		$api.get(`${mobileURI}/api/users/all`, {params: {_id: myData._id}})
		.then((response) => {
			setListUsers(response.data);
			setShowingListUsers(response.data);
		})
		.catch(() => console.log("Ошибка при загрузке контактов"));
	}, [])

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Contacts',
			header: () => (
				<View style={styles.mainHeader}>
					<View style={styles.iconContainer}>
						<Icon type='antdesign' name='arrowleft' color={'#000000'} onPress={navigation.goBack}></Icon>
					</View>
					<View style={styles.inputContainer}>
						<TextInput autoFocus={true} onChangeText={text => setSearcherUser(text) } placeholder="Поиск" style={{fontSize: 16, flex: 1, marginRight: 10}}></TextInput>
					</View>
				</View>
			)
		});
	  }, [navigation]);

	  useEffect(() => {
		if(searchedUser) {
			let arrayOfArguments = searchedUser.toLowerCase().split(' ');
			arrayOfArguments = arrayOfArguments.filter(argument => argument !== '');

			const croppedLastMessages = listUsers.filter(oneUser => {
				for (const oneElement of arrayOfArguments) {
					if(oneUser.name.toLowerCase().includes(oneElement)) {
						return true;
					}
				}
			})
			setShowingListUsers(croppedLastMessages);
		}
	}, [searchedUser])

	return (
		<View>
			<FlatList
				data={showingListUsers}
				keyExtractor={(item, index) => item._id.toString()}
				renderItem={({ item }) => <UsersMessangerItem me={myData} user={item} socket={socket}/>}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	mainHeader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: 55,
		borderBottomColor: 'white',
		borderBottomWidth: 7,
		borderTopColor: '#55ADFF',
		borderRightColor: '#55ADFF',
		borderLeftColor: '#55ADFF', 
		borderTopWidth: 5,
		borderWidth: 6
	},

	iconContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center', 
		justifyContent: 'center',
		flex: 0.20
	},

	inputContainer: {
		flexDirection: 'row',
		flex: 1,
		width: '100%',
		justifyContent:'space-between', 
		alignItems: 'center',
		marginLeft: 15
	}
})