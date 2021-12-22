/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

const InputStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        height: 30,
        paddingHorizontal: 10,
        fontSize: 18,
        textTransform: 'capitalize',
        
    },
    input: {
        borderRadius: 10,
        height: 40,
        backgroundColor: '#E2E2E2',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    picker: {
       marginBottom: 20,
       borderRadius: 20,
    },
});
export default InputStyles;
