import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    imageIndex: {
        position: 'absolute',
        fontSize: 16,
        bottom: 10,
        left: 10,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#333',
        paddingVertical: 2,
        paddingHorizontal: 6,
        opacity: 0.8,
    },
    infoContainer: {
        width: '100%', 
        padding: 15, 
    },
    infoSection: {
        paddingBottom: 10,
        borderBottomColor: '#ccc', 
        borderBottomWidth: 2
    },
    titulo: {
        width: '100%',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#000',
    },
    endereco: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 15,
    },
    info: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginLeft: 10,
        lineHeight: 22,

    },
    tituloLocador: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    avatarContainer: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 30,
        alignItems: 'center'
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#f58634'
    },
    avatarInfo: {
        marginLeft: 20,
    },
    avatarLineInfo: {
        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'center',
        margin: 3,
    },
    botaoReservar: {
        borderRadius: 50,
        width: 'auto',
        padding: 15,
        margin: 15,
        backgroundColor: '#f58634',
        elevation: 5,
    },
    textoBotao: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.6)',
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        width:'90%',
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      textoModal: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
      },
})

export default styles;