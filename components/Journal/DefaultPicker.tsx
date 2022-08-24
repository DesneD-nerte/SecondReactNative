import { Picker } from "@react-native-picker/picker";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Group, Lesson } from "../../types";

interface IDefaultPicker {
    selectedValue: Lesson | Group | Date;
    setSelectedValue: Dispatch<SetStateAction<Lesson | Group | Date>>;
    arrayValue?: Lesson[] | Group[];
    children?: ReactNode;
}

const DefaultPicker = (props: IDefaultPicker) => {
    const { selectedValue, setSelectedValue, arrayValue, children } = props;

    return (
        <Picker
            selectedValue={selectedValue}
            mode="dropdown"
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
            {arrayValue &&
                arrayValue.map((oneValue) => {
                    return (
                        <Picker.Item
                            label={oneValue.name.toString()}
                            value={oneValue}
                            key={oneValue._id as React.Key}
                        />
                    );
                })}
            {children}
        </Picker>
    );
};

export default React.memo(DefaultPicker);
