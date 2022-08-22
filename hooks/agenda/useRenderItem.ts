import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { mobileURI } from '../../config/config';
import { CurrentLesson, User } from '../../types';

interface IRenderItemAgendaProps {
    item: CurrentLesson;
}

interface IRenderItemAgenda {
    title: string;
    beginTime: string;
    endTime: string;
    classroom: string;
    teacher: User;
}

const useRenderItem = (props: IRenderItemAgendaProps) => {
    const { item } = props;
    const [fixedItem, setFixedItem] = useState<IRenderItemAgenda>();

    useEffect(() => {
        const beginDate = new Date(item.beginDate);
        const endDate = new Date(item.endDate);

        const beginTime = moment(beginDate).format("HH:mm");
        const endTime = moment(endDate).format("HH:mm");

        let fixedImageUri = undefined;
        if (item.teachers[0].imageUri !== undefined) {
            fixedImageUri = item.teachers[0].imageUri.replace(
                "http://localhost:5000",
                mobileURI
            );
        }

        const arrayName = item.teachers[0].name.split(" ");
        let splittedName = "";
        for (let i = 0; i < arrayName.length; i++) {
            if (i === 0) {
                splittedName += arrayName[i] + " ";
            } else {
                splittedName += arrayName[i].slice(0, 1) + ".";
            }
        }

        setFixedItem({
            title: item.name.name,
            beginTime: beginTime,
            endTime: endTime,
            classroom: item.classroom.name,
            teacher: {
                ...item.teachers[0],
                imageUri: fixedImageUri,
                name: splittedName,
            },
        });
    }, []);
    
    return fixedItem;
}

export default useRenderItem