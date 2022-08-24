import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Group, Lesson } from '../../types';

interface IUseMarksProps {
    selectedLesson: Lesson,
    selectedGroup: Group
}

const useMarks = (props: IUseMarksProps) => {
    const {selectedLesson, selectedGroup} = props;

    const information = useSelector((state: RootState) => state.information);

    const currentMarks = useMemo(() => {
        const filteredMarks = information.marks.filter((oneMark, index) => {
            return (
                oneMark.lesson._id === selectedLesson?._id &&
                oneMark.user.groups?.some(
                    (oneGroupObject) => oneGroupObject._id === selectedGroup?._id
                )
            );
        });

        return filteredMarks;
    }, [selectedLesson, selectedGroup])
    
    return currentMarks;
}

export default useMarks