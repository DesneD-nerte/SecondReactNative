import AsyncStorage from "@react-native-async-storage/async-storage";

class NavigationService {

    static getParentRoute(navigation) {
        const routes = navigation.getParent().getState().routes;
        let routeName = "Home";

        for (let i = 0; i < routes.length; i++) {
            const obj = routes[i];

            if(obj.state) {
                routeName = obj.name;
                
                return routeName;
            }
        }

        return new Error('Cannot find right parent route');
    }

    static logOut(route, callbackIsAuth) {
        if (route.params?.logOut === true) {
            AsyncStorage.clear()
            .then(() => {
                callbackIsAuth(false);
                route.params.logOut = false;
            });
        }
    }
}

export default NavigationService;