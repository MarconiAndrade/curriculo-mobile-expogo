import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

export default function AcademicScreen() {
  const [academicData, setAcademicData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://curriculo-express-gold.vercel.app/api/academic-experiences')
      .then((response) => response.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.data || data.experiences || [];
        setAcademicData(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados acadêmicos:', error);
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
      <Text style={styles.title}>Experiência Acadêmica</Text>
      
      {academicData.map((item, index) => (
        <View key={item.id || index} style={styles.card}>
          <Text style={styles.degree}>{item.degree || item.course || item.curso}</Text>
          <Text style={styles.institution}>{item.institution || item.instituicao}</Text>
          <Text style={styles.period}>
            {item.period || item.periodo || `${item.start_date || ''} - ${item.end_date || 'Atual'}`}
          </Text>
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
    borderLeftColor: '#007AFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  degree: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  institution: { fontSize: 14, color: '#555', marginBottom: 2 },
  period: { fontSize: 12, color: '#888' },
});