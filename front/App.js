import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const addUser = async () => {
    fetch('http://localhost:3000/add', {
      method: 'POST',
      body: JSON.stringify({
        nome: 'MINDGROUP'
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
      console.log('Usuário adicionado com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro ao adicionar usuário:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Button
      title='AddUser'
      onPress={() =>{addUser()}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
