import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function SobreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o Aplicativo</Text>
      
      <Text style={styles.sectionTitle}>Tecnologias e Módulos Utilizados:</Text>
      <Text style={styles.text}>• React Native & Expo (Expo Router para navegação)</Text>
      <Text style={styles.text}>• Node.js & Express (Back-end da API)</Text>
      <Text style={styles.text}>• PostgreSQL / NeonDB (Base de dados na nuvem)</Text>
      <Text style={styles.text}>• Vercel (Hospedagem da API)</Text>
      <Text style={styles.text}>• TypeScript & @expo/vector-icons</Text>

      <Text style={styles.sectionTitle}>Funcionalidade Extra:</Text>
      <Text style={styles.text}>Implementação de um Seletor Dinâmico de Perfis, permitindo alternar dados consumidos diretamente do back-end em tempo real.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5, color: '#007AFF' },
  text: { fontSize: 14, color: '#444', marginBottom: 5 },
});