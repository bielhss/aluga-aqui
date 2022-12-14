import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
    titulo: {
        width: '100%',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botaoLocador: {
        borderRadius: 50,
        width: 'auto',
        padding: 15,
        margin: 15,
        backgroundColor: '#f58634'
    },
    textoBotaoLocador: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: "bold"
    },
    slogan: {
        fontSize: 16,
        color: '#f58634',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    avatarContainer: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 30,
        alignItems: 'center',
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#000'
    },
    avatarInfo: {
        paddingLeft: 25,
        width: '80%'
    },
    avatarNome: {
        fontSize: 25,
    },
    botaoInformacao: {
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        padding: 10,
        alignItems: 'center',
    },
    textoBotaoInformacao: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        width: '85%'
    },
    iconBotaoInformacao: {
        width: '15%'
    },
    infoContainer: {
        backgroundColor: '#ddd',
        width: '100%',
        padding: 10,
    },
    textInput: {
        width: '100%',
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#999',
        padding:10,
    },
    inputEnabled: {
        color: '#000'
    },
    inputDisabled: {
        color: '#666'
    },
    grupoBotao: {
        flexDirection: 'row'
    },
    botaoForm: {
        borderRadius: 5,
        width: '100%',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: '1%',
    }, 
    textoBotaoForm: {
        fontSize: 15,
        textAlign: 'center',
        color: 'black',
        fontWeight: '600'
    },
    botaoSalvar: {
        backgroundColor: '#bbb',
        width: '49%'
    },
    botaoEditar: {
        backgroundColor: '#bbb'
    },
    botaoCancelar: {
        width: '49%',
        backgroundColor: '#be4d25'
    },
    badge: {
        backgroundColor: 'red',
        borderRadius: 100,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 3
    },
    badgeText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default styles;