import {
    StyleSheet,
} from 'react-native';
export const styles = StyleSheet.create({
    listItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    listItemIcon: {
        fontSize: 20,
        marginLeft: 20,
        marginTop: -3,
    },
    listItemLeftIcon:{
        fontSize: 20,
        marginLeft: 0,
        marginRight: 10,
        marginTop: 0,
    },
    rightWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    }

});