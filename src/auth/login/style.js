import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',        
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: -15,
    },
    titulo: {
        fontSize: 23,
        marginBottom: 10,
    },
    subtitulo: {
        fontSize: 15,
        marginBottom: 20,
    },
    mensagemErro: {
        fontSize: 12,
        color: 'red',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        margin: 10,
    },
    textInput: {
        width: '100%',
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#999',
        padding:10,
        marginBottom:10,
    },
    botaoContinuar: {
        borderRadius: 10,
        width: '100%',
        padding: 15,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#f58634'
    },
    textoBotaoContinuar: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: "bold"
    },
    botaoVoltar: {
        borderRadius: 10,
        width: '100%',
        padding: 10,
        backgroundColor: '#bbb'
    }, 
    textoBotaoVoltar: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    botaoAlternativa: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textoBotaoAlternativa: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "bold",
        width: '85%'
    },
    iconeBotao: {
        width: '15%',
        alignItems: 'flex-end',
    }
    
});

export default styles;