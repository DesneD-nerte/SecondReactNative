import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Agenda } from "react-native-calendars";
import { mobileURI } from "../config/config";
import sortCurrentLessonsByDate from "../services/SortCurrentLessons";
import moment from "moment";
import Data from "../data/AgendaData";
import axios from "axios";
import RenderDay from "../components/Agenda/renderDay";
import EmptyDay from "../components/Agenda/emptyDay";
import RenderItem from "../components/Agenda/renderItem";
import RenderKnob from "../components/Agenda/renderKnob";
import { CurrentLesson } from "../types";
import { useGetCurrentLessonsQuery } from "../store/api/currentLessonsAPI";

moment.locale("ru");

const ScheduleScreen = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(true);

    const [items, setItems] = useState(Data);
    const { data, error, isLoading } = useGetCurrentLessonsQuery();

    // useEffect(() => {
    //     if (refreshing === true) {
    //         axios.get(`${mobileURI}/currentlessons`).then((response) => {
    //             const currentLessons: CurrentLesson[] = response.data;

    //             sortCurrentLessonsByDate(currentLessons);

    //             const newItems = JSON.parse(JSON.stringify(Data));
    //             for (const oneCurrentLesson of data) {
    //                 const beginDate = new Date(oneCurrentLesson.beginDate);

    //                 const dateForItem = beginDate.toISOString().replace(/T.*/, "");

    //                 if (newItems[dateForItem]) {
    //                     newItems[dateForItem].push(oneCurrentLesson);
    //                 } else {
    //                     newItems[dateForItem] = [oneCurrentLesson];
    //                 }
    //             }
    //             setItems(newItems);
    //             onRefresh(false);
    //         });
    //     }
    // }, [refreshing]);

    useEffect(() => {
        if (refreshing) {
            console.log(data);
            data.pop(); //! Нельзя так делать, давай попробуем отсортировать занятия прям на сервере, а не на клиенте
            setRefreshing(false);
        }
    }, [data, refreshing]);

    const onRefresh = (boolean) => {
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
                //Кнопка под календарем
                renderKnob={() => {
                    return <RenderKnob />;
                }}
                // Hide knob button. Default = false
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
