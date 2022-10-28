import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {initApiRamClient} from '../../api/api_ram_instance';

export const RickAndMorty = ({navigation}) => {
  const [characterList, setcharacterList] = useState([]);
  useEffect(() => {
    getCharacters();
    return () => {};
  }, []);

  const getCharacters = async () => {
    const ramEndpoints = await initApiRamClient();
    const res = await ramEndpoints.character.get();
    if (!res.status) return;
    console.log(res.data.info);
    setcharacterList(
      res.data.results.map(char => {
        return {
          name: char.name,
          status: char.status,
          species: char.species,
          url: char.url,
          id: char.id,
        };
      }),
    );
  };
  const goToDetails = id => {
    navigation.navigate('Details', {
      itemId: id,
    });
  };
  return (
    <View>
      <Text>RickAndMorty</Text>
      {characterList.map(({name, id}) => (
        <TouchableOpacity
          key={id}
          style={{padding: 10, backgroundColor: '#bbb', marginBottom: 4}}
          onPress={() => goToDetails(id)}>
          <Text>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
