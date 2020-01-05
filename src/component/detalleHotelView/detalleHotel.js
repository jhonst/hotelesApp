import React, { Component } from 'react';
import { View, Text, Image, Alert, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, CardItem, Title, Button } from 'native-base' ;
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo';



export default class detalleHotel extends Component{

    //Constructor
    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            hotelId: this.props.navigation.getParam('idHotel', '0000'),
            hotelGeneral: Object,
            hotelDet: Object,
            imss : Array,
            gps : Array,
            //url: 'http://0.0.0.0:3000',   //Local -> Para que funcione local se debe cambiar la direccion 0.0.0.0 por la ip donde se esta ejecutando la api rest
            url: 'http://api-mundo-hoteles.herokuapp.com',  //En la nube -> El mismo servicio fue subido a la plataforma Heroku de esta manera podra ejecutarse siempre sin problemas
            api: '/api/hotelesL/'
        }
    }

    componentDidMount(){
        this.getHotelDetails();
    }

    getHotelDetails = () => {
        this.setState({ loading:true })
        fetch(this.state.url + this.state.api + this.state.hotelId)
        .then(res => res.json())
        .then( res => {
            this.setState({
                hotelDet : res.hotels.details,
                hotelGeneral : res.hotels,
                imss : res.hotels.details.images,
                gps : (res.hotels.details.gps).replace(" ", "").split(","),
                loading: false
            })
        });
    };

    render(){
        if(this.state.loading){
            return(
                <View>
                    <ActivityIndicator size="large" color="#f4511e" />
                </View>
            );
        }
        return(
            <View  style = {{ flex:1 }}>
                <ScrollView>
                    <Card>
                        <CardItem >
                            <Image source={{uri: this.state.url + this.state.imss[1] }} style={{height: 150, width: null, flex: 1}}/>     
                            <Image source={{uri: this.state.url + this.state.imss[0] }} style={{height: 150, width: null, flex: 1}}/>                   
                        </CardItem>
                        <CardItem >
                            <Image source={{uri: this.state.url + this.state.imss[2] }} style={{height: 150, width: null, flex: 1}}/>
                            <Image source={{uri: this.state.url + this.state.imss[3] }} style={{height: 150, width: null, flex: 1}}/>                       
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style = {styles.seccionBoton}>
                            <Title style = {{color: '#000000'}}> {this.state.hotelGeneral.name} </Title>
                        </CardItem >
                        <CardItem style = {styles.seccionBoton}>
                            <PintarEstrellas stars={this.state.hotelGeneral.stars} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <PintarTarjeta tar={this.state.hotelDet.card} />
                        </CardItem>
                    </Card>
                    <Card >
                        <CardItem >
                            <Text>Tu hotel esta justo aqui:</Text>
                        </CardItem>
                    </Card>

                    <View style = {{height: 200}}>
                        <MapView style = {{height: 200}} initialRegion = {{latitude: parseFloat(this.state.gps[0]), longitude: parseFloat(this.state.gps[1]), latitudeDelta:0.02, longitudeDelta:0.0221}}>
                            <Marker coordinate = {{latitude: parseFloat(this.state.gps[0]), longitude: parseFloat(this.state.gps[1])}} title={this.state.hotelGeneral.name} ></Marker>
                        </MapView>
                    </View>
                </ScrollView>
                <View >
                    <Card style = {styles.seccionBoton}>
                        <CardItem header >
                            <Button style = {styles.botonFooter}
                            onPress={() => Alert.alert('¡Felicitaciones!','Tu reserva ha sido exitosa... Esperamos que disfrutes tu estadia.')}>
                                <Text style = {styles.textoBotonFooter}>¡Reserva ahora!</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </View>
            </View>
        )
    }
}

//Funcion que permite pintar la seccion que le indica al usuario si en el hotel reciven o no tarjetas
const PintarTarjeta = (pro) => {
    if (pro.tar == "yes"){
        return <Text><Icon name='credit-card' size={30} style = {{color: 'green'}}/> <Title style = {{color: '#000000'}}>  ¡Se aceptan tarjetas!</Title></Text> ;
    }else{
        return <Text><Icon name='credit-card' size={30} style = {{color: 'red'}}/> <Title style = {{color: '#000000'}}>  No aceptan tarjetas</Title></Text>;
    }
}

//Funcion que permite pintar la cantidad de estrellas segun el numero recivido
const PintarEstrellas = (cantidadEstrellas) => {
    switch (cantidadEstrellas.stars) {
        case '1':
            return (<Text style = {styles.estrellas}><Icon name='star' size={30}/></Text>);
          break;
        case '2':
            return (<Text style = {styles.estrellas}><Icon name='star' size={30}/><Icon name='star' size={30}/></Text>);
          break;
        case '3':
            return (<Text style = {styles.estrellas} ><Icon name='star' size={30}/><Icon name='star' size={30}/><Icon name='star' size={30}/></Text>);
          break;
        case '4':
            return (<Text style = {styles.estrellas}><Icon name='star' size={30}/><Icon name='star' size={30}/><Icon name='star' size={30}/><Icon name='star' size={30}/></Text>);
          break;
        case '5':
            return (<Text style = {styles.estrellas} ><Icon name='star' size={30}/><Icon name='star' size={30}/><Icon name='star' size={30}/><Icon name='star' size={30}/><Icon name='star' size={30}/></Text>);
          break;
        default:
            return <Text></Text>;
      }
}


//Estilos
const styles = StyleSheet.create({

    seccionBoton: {
        justifyContent: 'center',
        alignItems: 'center'
     },

    botonFooter: {
        width: '85%', 
        height: 60,
        backgroundColor: "#f4511e",
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center'
    },

    textoBotonFooter: {
        color: 'white',
        textAlign: "center",
        fontSize: 20,
    },

    estrellas: {
        color: '#E9EC00',
    },


  });