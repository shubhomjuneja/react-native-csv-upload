import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    container: { flex: 1, padding: 4, paddingTop: 4, backgroundColor: '#fff' },
    head: {
        height: 40, backgroundColor: '#f1f8ff', color: '#fff'
    },
    text: { margin: 6 },
    back: {
        fontSize: 16,
        marginLeft: 10
    },
    backIcon: {
        marginTop: -2,
    }
})