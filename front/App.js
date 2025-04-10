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

  const showUser = async () => {
    fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); 
      })
      .then(data => {
        console.log('Usuários exibidos com sucesso:', JSON.stringify(data, null, 2)); 
      })
      .catch(error => {
        console.error('Erro ao mostrar usuários:', error); 
      });
  };

  const UpdateUser = (id) => {
    fetch(`http://localhost:3000/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            nome: 'xx', // Substitua pelo valor que deseja atualizar
        }),
      
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuário atualizado com sucesso:', JSON.stringify(data));
        })
        .catch(error => {
            console.error('Erro ao atualizar usuário:', error);
        });
};
   const DeleteUser = (id) => {
    fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE',
    
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuário deletado com sucesso:', JSON.stringify(data));
        })
        .catch(error => {
            console.error('Erro ao deletar usuário:', error);
        });
   }

  return (
    <View style={styles.container}>
      <Button
        title='Exibir User'
        onPress={() => { showUser() }}
      />
<br />
      <Button
        title='Add User'
        onPress={() => { addUser() }}
      />
      <br />
      <Button
        title='Update User'
        onPress={() => { UpdateUser('67f70cf9f66356c3fc90e84d') }}
      />
      <br />
      <Button
        title='Delete User'
        onPress={() => { DeleteUser('67f70cf9f66356c3fc90e84d') }}
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
