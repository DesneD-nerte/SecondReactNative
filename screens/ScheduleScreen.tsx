import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import RenderDay from "../components/Agenda/RenderDay";
import EmptyDay from "../components/Agenda/EmptyDay";
import RenderItem from "../components/Agenda/RenderItem";
import RenderKnob from "../components/Agenda/RenderKnob";
import { useGetCurrentLessonsQuery } from "../store/api/currentLessonsAPI";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { toAgendaDataForm } from "../store/slices/currentLessonsSlice";

moment.locale("ru");

const ScheduleScreen = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(true);
    const items = useSelector((state: RootState) => state.currentLessonsAgenda);
    const dispatch = useDispatch<AppDispatch>();

    const { data, error, isLoading, refetch } = useGetCurrentLessonsQuery();

    useEffect(() => {
        if (refreshing && data) {
            dispatch(toAgendaDataForm(data));
            setRefreshing(false);
        }
    }, [data, refreshing]);

    const onRefresh = (boolean) => {
        refetch();
        setRefreshing(boolean);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Agenda
                items={items}
                minDate={"2022-01-10"}
                maxDate={"2023-01-10"}
                renderItem={(item) => {
                    return <RenderItem item={item} />;
                }}
                // Specify how each date should be rendered. day can be undefined if the item is not first in that day
                renderDay={(day, item) => {
                    return <RenderDay day={day} />;
                }}
                renderEmptyDate={() => {
                    return <EmptyDay />;
                }}
                renderKnob={() => {
                    return <RenderKnob />;
                }}
                hideKnob={false}
                showClosingKnob={true}
                onRefresh={() => onRefresh(true)}
                refreshing={refreshing}
                futureScrollRange={50}
                pastScrollRange={50}
                rowHasChanged={(r1, r2) => {
                    // return r1.text !== r2.text;
                    return r1.day !== r2.day;
                }}
                // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
                refreshControl={null}
                theme={{
                    agendaDayTextColor: "teal",
                    agendaDayNumColor: "teal",
                    agendaTodayColor: "teal",
                    agendaKnobColor: "blue",
                }}
            />
        </SafeAreaView>
    );
};

export default ScheduleScreen;
