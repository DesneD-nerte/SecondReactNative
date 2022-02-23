const ScreenHeaderRight = ({ nameTitle, iconName }) => {
    return (
        {
        	headerTitle: {nameTitle},
			headerRight: () => (
				<Button 
					title={"Settings"}
					onPress={() => alert("Button was clicked ")}>
				</Button>
			),
			headerRightContainerStyle: {marginRight: 10},
			tabBarIcon: ({ color, size }) => (
				<MaterialCommunityIcons name={iconName}/>
			),
        }
    );
}

  export default ScreenHeaderRight;