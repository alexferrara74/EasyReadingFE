import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

const App = () => {
  const [responseData, setResponseData] = useState('');

  // Function to handle the API call
  const fetchData = () => {
    fetch('http://localhost:3030')
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
      <Button title="Fetch Data" onPress={fetchData} />
      {responseData ? <Text>{JSON.stringify(responseData)}</Text> : null}
    </View>
  );
};

export default App;