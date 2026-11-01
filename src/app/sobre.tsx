import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SobreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroCard}>
        <Ionicons name="code-slash" size={40} color="#007AFF" />
        <Text style={styles.title}>Currículo Mobile</Text>
        <Text style={styles.subtitle}>Desenvolvido com React Native & Expo</Text>
      </View>
      
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Tecnologias & Arquitetura</Text>
        <Text style={styles.text}>• <Text style={styles.bold}>Front-end:</Text> React Native, Expo Router, TypeScript</Text>
        <Text style={styles.text}>• <Text style={styles.bold}>Back-end:</Text> Node.js, Express (Hospedado na Vercel)</Text>
        <Text style={styles.text}>• <Text style={styles.bold}>Base de Dados:</Text> PostgreSQL na NeonDB</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Funcionalidade Extra</Text>
        <Text style={styles.text}>
          Implementação de um <Text style={styles.bold}>Seletor Dinâmico de Perfis</Text> conectado diretamente à API, permitindo alternar dados de diferentes perfis profissionais em tempo real.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f4f6f8', flexGrow: 1 },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#007AFF', marginBottom: 8 },
  text: { fontSize: 14, color: '#444', lineHeight: 20, marginBottom: 4 },
  bold: { fontWeight: '600', color: '#222' },
});