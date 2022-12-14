import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
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
    locacaoContainer: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ddd',
        borderRadius: 10,
    },
    locacaoHeader: {
        flexDirection: 'row'
    },
    locacaoFoto: {
        width: 140, 
        height: 140, 
        borderRadius: 100
    },
    locacaoInfoContainer: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    locacaoTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    locacaoLocadores: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center',
    },
    locacaoBody: {
        marginTop: 15,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10
    },
    locacaoBodyItem: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
    },
    locacaoBodyItemFoto: {
        width: 100, 
        height: 100, 
        borderRadius: 100
    },
    locacaoBodyItemInfo: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    locacaoBodyItemTexto: {
        fontSize: 15,
        fontWeight: '600'
    }
})

export default styles;