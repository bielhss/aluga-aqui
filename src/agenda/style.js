import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',        
        marginTop: 80,
    },
    titulo: {
        width: '100%',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    calendar: {
        marginBottom: 15,
        elevation: 5,
    },
    localNome: {
        fontSize: 18,
        fontWeight: 'bold', 
        color:'#fff',
        padding: 10, 
        borderRadius: 10,
        marginVertical: 5
    }
});

export default styles;