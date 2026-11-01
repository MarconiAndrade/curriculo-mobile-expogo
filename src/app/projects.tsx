import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

export default function ProjectsScreen() {
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://curriculo-express-gold.vercel.app/api/projects')
      .then((response) => response.json())
      .then((data) => {
        // Garante que pegamos um array independentemente da estrutura de retorno
        const results = Array.isArray(data) ? data : data.data || data.projects || [];
        setProjectsData(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados de projetos:', error);
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
      <Text style={styles.title}>Projetos</Text>
      
      {projectsData.map((item, index) => (
        <View key={item.id || index} style={styles.card}>
          <Text style={styles.projectName}>{item.name || item.title || item.titulo}</Text>
          <Text style={styles.projectDesc}>{item.description || item.descricao}</Text>
          {item.tech_stack || item.technologies || item.tecnologias ? (
            <Text style={styles.tech}>
              Tecnologias: {item.tech_stack || item.technologies || item.tecnologias}
            </Text>
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
    borderLeftColor: '#6f42c1', // Roxo para destacar os projetos
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  projectName: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  projectDesc: { fontSize: 13, color: '#555', marginBottom: 8, lineHeight: 18 },
  tech: { fontSize: 12, color: '#007AFF', fontWeight: '500' },
});