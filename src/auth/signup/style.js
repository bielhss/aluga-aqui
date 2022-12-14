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
    form: {
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 5
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
    fotoUsuario: {
        width: 120,
        height: 120,
        margin: 10,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'black'
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
    botaoAlternativa: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textoBotaoContinuar: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "bold",
        marginLeft: 16,
        width: '80%',
        color: 'white'
    },
    iconeBotao: {
        width: '20%',
        alignItems: 'flex-end',
    }
    
});
 
export default styles;