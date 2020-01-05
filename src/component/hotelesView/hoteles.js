import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, YellowBox , ActivityIndicator} from 'react-native';
import {
    Card, CardItem, Left, Thumbnail, Title, Subtitle, Right, Separator
} from 'native-base' ;
import Icon from 'react-native-vector-icons/Entypo';


export default class hoteles extends Component{

    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            hotels: [],
            //url: 'http://0.0.0.0:3000',   //Local -> Para que funcione local se debe cambiar la direccion 0.0.0.0 por la ip donde se esta ejecutando la api rest
            url: 'http://api-mundo-hoteles.herokuapp.com',  //En la nube -> El mismo servicio fue subido a la plataforma Heroku de esta manera podra ejecutarse siempre sin problemas
            api: '/api/hotelesL/'
        }
    }

    //funcion que se ejecuta despues que los pomponentes se han montado
    componentDidMount(){
        this.getHotels();
    }

    getHotels = () => {
        this.setState({ loading:true })
        fetch(this.state.url + this.state.api)
        .then(res => res.json())
        .then( res => {
            this.setState({
                hotels : res.hotels,
                loading: false
            })
        });

    };

    showDetail = (idh) => {
        this.props.navigation.navigate('Detalle', {idHotel: idh,});
    }

    render(){
        if(this.state.loading){
            return(
                <View>
                    <ActivityIndicator size="large" color="#f4511e" />
                </View>
            );
        }
        return (
            <View>
            <FlatList
                data = {this.state.hotels}
                renderItem = {
                    ({item}) => (
                        <Card>
                            <CardItem button onPress={() => this.showDetail(item._id)} cardBody>
                                    <Thumbnail source={{uri: this.state.url + item.image }}  style = {styles.imagen}/>
                                    <View style = {styles.vistaTexto}>
                                        <Text style = {styles.titulo}> {item.name} </Text>
                                        <Text style = {styles.ciudad}> {item.city} </Text>
                                        <Separator style = {styles.separador}/>
                                        
                                        <Text>
                                            <PintarAire plus={item.pluses}/>
                                            <PintarPiscina plus={item.pluses}/>
                                            <PintarWifi plus={item.pluses}/>
                                            <PintarGym plus={item.pluses}/> 
                                        </Text>

                                        <Separator style = {styles.separador}/>

                                        <View>
                                            <Text><PintarEstrellas stars={item.stars}/></Text>
                                            <Text style = {styles.inferiores}>$ {item.price}</Text>
                                        </View>
                                    </View>
                            </CardItem>
                        </Card>    
                    )
                }
            />
            </View>
        );
    }
}

//Logica

//Funcion que permite pintar la cantidad de estrellas segun el numero recivido
const PintarEstrellas = (cantidadEstrellas) => {
    switch (cantidadEstrellas.stars) {
        case '1':
            return (<Text style = {styles.estrellas}><Icon name='star' size={25}/></Text>);
          break;
        case '2':
            return (<Text style = {styles.estrellas}><Icon name='star' size={25}/><Icon name='star' size={25}/></Text>);
          break;
        case '3':
            return (<Text style = {styles.estrellas} ><Icon name='star' size={25}/><Icon name='star' size={25}/><Icon name='star' size={25}/></Text>);
          break;
        case '4':
            return (<Text style = {styles.estrellas}><Icon name='star' size={25}/><Icon name='star' size={25}/><Icon name='star' size={25}/><Icon name='star' size={25}/></Text>);
          break;
        case '5':
            return (<Text style = {styles.estrellas} ><Icon name='star' size={25}/><Icon name='star' size={25}/><Icon name='star' size={25}/><Icon name='star' size={25}/><Icon name='star' size={25}/></Text>);
          break;
        default:
            return <Text></Text>;
      }
}

//Funciones para pintar los iconos del Aire, Piscina, Gym y  wifi, segun si el hotel dispone o no de estos servicios

const PintarAire = (extras) => {
    var control;
    for (var i = 0; i < extras.plus.length; i++) {
        if(extras.plus[i] == "air"){
            control = true;
        }
    }
    if(control){
        return (<Text> <Icon name='air' size={20} style = {styles.iconosExtras}/> </Text>);
    }else{
        return (<Text></Text>);
    }
}

const PintarPiscina = (extras) => {
    var control;
    for (var i = 0; i < extras.plus.length; i++) {
        if(extras.plus[i] == "pool"){
            control = true;
        }
    }
    if(control){
        return (<Text> <Icon name='water' size={20} style = {styles.iconosExtras}/> </Text>);
    }else{
        return (<Text></Text>);
    }
}

const PintarWifi = (extras) => {
    var control;
    for (var i = 0; i < extras.plus.length; i++) {
        if(extras.plus[i] == "wifi"){
            control = true;
        }
    }
    if(control){
        return (<Text> <Icon name='signal' size={20} style = {styles.iconosExtras}/> </Text>);
    }else{
        return (<Text></Text>);
    }
}

const PintarGym = (extras) => {
    var control;
    for (var i = 0; i < extras.plus.length; i++) {
        if(extras.plus[i] == "gym"){
            control = true;
        }
    }
    if(control){
        return (<Text> <Icon name='dribbble' size={20} style = {styles.iconosExtras}/> </Text>);
    }else{
        return (<Text></Text>);
    }
}

//Estilos
const styles = StyleSheet.create({

    iconosExtras:{
        color: '#A5A5A5',
    },

    inferiores:{
        fontWeight: 'bold',
        fontSize:30,
        color: 'green',
    },

    inferiores:{
        fontWeight: 'bold',
        fontSize:30,
        color: 'green',
    },

    vistaTexto: {
        margin: 15,
    },

    estrellas: {
        color: '#E9EC00',
    },

    billete: {
        color: 'green',
    },

    separador:{
        backgroundColor: 'transparent',
    },

    titulo: {
        fontWeight: 'bold',
        fontSize:20,
    },

    letrasIconos: {
        fontWeight: 'bold',
        fontSize:20,
        marginBottom:15,
    },

    ciudad: {
        fontSize:15,
    },

    imagen: {
        width:'35%',
        height:250, 
        borderRadius: 5, 
     },


  });
