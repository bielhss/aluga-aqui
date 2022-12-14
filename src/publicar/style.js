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
    textInput: {
        width: '100%',
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#555',
        padding:10,
        marginBottom:10,
    },
    botaoContinuar: {
        borderRadius: 10,
        width: '100%',
        padding: 15,
        margin: 15,
        backgroundColor: '#f58634'
    },
    textoBotao: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: "bold"
    },
    botaoFotos: {
        // borderRadius: 5,
        // width: '100%',
        height: 300,
        // margin: 15,
        // borderWidth: 1,
        // borderColor: '#555',
        justifyContent: 'center'
    },
    textoBotaoFotos: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    }
});

export default styles;