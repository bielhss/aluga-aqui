import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerSearch: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSearch: {
        width: '80%',
        fontSize: 16,
        borderRadius: 50,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: '#555',
        padding: 15,
        paddingRight: 0,
        marginBottom:10,
    },
    iconSearch: {
        width: '18%',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        borderColor: '#555',
        fontSize: 16,
        padding: 20,
        marginBottom: 10,
    },
    botaoAdd: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: '#f58634',
        borderRadius: 100,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999
    },
    card: {
        height: 'auto',
        padding: 6,
        paddingLeft: 0,
        marginVertical: 10        
    },
    cardTitulo: {
        fontSize: 20,
        fontWeight: "bold"
    },
    cardDescricao: {
        fontSize: 16,
        fontWeight: '400',
        color: '#555'
    }
});

export default styles;