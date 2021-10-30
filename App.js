import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { useFonts, AkayaKanadaka_400Regular } from '@expo-google-fonts/roboto';

const request = async (callback) => {
  const response = await fetch('https://thronesapi.com/api/v2/characters');
  const parsed = await response.json();
  callback(parsed);
};

export default function App() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    request(setRegistros);
  }, []);

  return (
    <View style={estilo.container}>
      <View><Text style={estilo.tema}>Personagens de Game of Thrones</Text></View>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title style={estilo.titulo}>{item.fullName}</Card.Title>
            <Card.Divider />
            <Card.Image
              source={{
                uri: item.imageUrl,
              }}></Card.Image>
            <Text style={estilo.texto}>
              A família é {item.family} e é conhecido(a) como {item.title}.
            </Text>
          </Card>
        )}
      />
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  tema:{
    fontSize:25,
    fontFamily: 'Roboto_300Light',
    textAlign: 'center',
    marginBottom: 10,
    marginTop:20,
    fontWeight: 'bold'
  },
  titulo: {
    fontSize: 25,
    color: '#840CB8',
    fontWeight: 'bold',
    bottom: 20,
    fontFamily: 'Roboto_300Light',
    textAlign: 'center',
    margin: 20,
  },
  texto: {
    fontFamily: 'Roboto_300Light',
    fontSize: 18,
    textAlign: 'justify',
    margin: 10,
  },
});
