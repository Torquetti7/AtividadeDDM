import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

//Estados do componente
export default function App() {
  const [cidade, setCidade] = useState(''); //Armazena o que o usuário digitou no campo de cidade
  const [clima, setClima] = useState(null); //Guarda os dados retornados da API após a requisição
  const [loading, setLoading] = useState(false); //Indica se os dados estão sendo carregados
  const [error, setError] = useState(''); //Mostra mensagem se ocorrer algum erro na requisição

  //Chave da API
  const apiKey = '0733b893d89d4e368cd135409240208';

  //Função principal, responsavel por buscar o clima
  //Verifica se a cidade foi digitada
  const getClima = async () => {
    if (!cidade) return;

    //Ativa o loading, limpa erros e resultados anteriores
    setLoading(true);
    setError('');
    setClima(null);

    //Faz uma requisição GET para a WeatherAPI
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&lang=pt`
      );
      //Se a requisição for bem-sucedida, salva a resposta em weather
      setClima(response.data);
    } catch (err) {
      //Se a requisição for bem-sucedida, salva a resposta em weather
      setError('Cidade não encontrada ou erro na requisição.');
    } finally {
      //Finaliza o loading independente do resultado
      setLoading(false);
    }
  };

  //Interface do usuário 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text> 
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      
      <Button title="Buscar" onPress={getClima} /> 
      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {clima && (
        <View style={styles.result}>
          <Text style={styles.cidade}>{clima.location.nome}, {clima.location.regiao}</Text>
          <Text style={styles.temp}>{clima.current.temp_c}°C</Text>
          <Text>{clima.current.condition.text}</Text>
        </View>
      )}
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  cidade: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
});
