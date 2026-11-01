import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

export default function ProfessionalScreen() {
  const [professionalData, setProfessionalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://curriculo-express-gold.vercel.app/api/professional-experiences')
      .then((response) => response.json())
      .then((data) => {
        // Garante que pegamos um array independentemente de como o back-end retorna
        const results = Array.isArray(data) ? data : data.data || data.experiences || [];
        setProfessionalData(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados profissionais:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Experiência Profissional</Text>
      
      {professionalData.map((item, index) => (
        <View key={item.id || index} style={styles.card}>
          <Text style={styles.role}>{item.role || item.cargo || item.title}</Text>
          <Text style={styles.company}>{item.company || item.empresa}</Text>
          <Text style={styles.period}>
            {item.period || item.periodo || `${item.start_date || ''} - ${item.end_date || 'Atual'}`}
          </Text>
          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa', flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745', // Verde para diferenciar da tela acadêmica
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  role: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  company: { fontSize: 14, color: '#555', marginBottom: 2 },
  period: { fontSize: 12, color: '#888', marginBottom: 8 },
  description: { fontSize: 13, color: '#666', lineHeight: 18 },
});