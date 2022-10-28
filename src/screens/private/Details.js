import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {initApiRamClient} from '../../api/api_ram_instance';

const Details = ({route, navigation}) => {
  const {itemId} = route.params;
  const [details, setdetails] = useState([]);
  useEffect(() => {
    handleGetDetails();
    return () => {};
  }, [handleGetDetails]);
  const handleGetDetails = useCallback(async () => {
    const ramEndpoints = await initApiRamClient();
    const res = await ramEndpoints.details.getId(itemId);
    if (!res.status) return;
    console.log(res.data);
    setdetails(res.data);
  }, [itemId]);

  return (
    <View>
      <Text>Details</Text>
      <Text>Id: {itemId}</Text>
      <Text>Nombre: {details?.name}</Text>
      <Text>Origen: {details?.origin?.name}</Text>
      <Text>Especie: {details?.species}</Text>
      <Text>Genero: {details?.gender}</Text>
    </View>
  );
};

export default Details;
