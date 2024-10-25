import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const App = () => {
  const [responseData, setResponseData] = useState('');

  // Function to handle the API call 
  const fetchData = () => {
    fetch(`http://${process.env.EXPO_PRIVATE_IP_ADDRESS}:3030`)
      .then(response => response.json())
      .then(data => {
        setResponseData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      {responseData ? <Text>{JSON.stringify(responseData)}</Text> : null}

      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Alex gay :D
      </Button>


    </View>
  );
};

export default App;