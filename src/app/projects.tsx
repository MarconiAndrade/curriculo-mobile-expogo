import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProjectsScreen() {
  const { selectedProfile } = useProfile();
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://curriculo-express-gold.vercel.app/api/projects')
      .then((response) => response.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.data || data.projects || [];
        const filtered = selectedProfile
          ? results.filter((item: any) => item.profile_id === selectedProfile.id || item.profileId === selectedProfile.id || !item.profile_id)
          : results;

        setProjectsData(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados de projetos:', error);
        setLoading(false);
      });
  }, [selectedProfile]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6f42c1" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedProfile && (
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle-outline" size={20} color="#6f42c1" />
          <Text style={styles.profileHeaderText}>Exibindo para: <Text style={{fontWeight: 'bold'}}>{selectedProfile.name || selectedProfile.nome}</Text></Text>
        </View>
      )}

      <Text style={styles.title}>Projetos</Text>
      
      {projectsData.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum projeto encontrado para este perfil.</Text>
      ) : (
        projectsData.map((item, index) => (
          <View key={item.id || index} style={styles.card}>
            <Text style={styles.projectName}>{item.name || item.title || item.titulo}</Text>
            <Text style={styles.projectDesc}>{item.description || item.descricao}</Text>
            {item.tech_stack || item.technologies || item.tecnologias ? (
              <Text style={styles.tech}>
                Tecnologias: {item.tech_stack || item.technologies || item.tecnologias}
              </Text>
            ) : null}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa', flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3eef8', padding: 10, borderRadius: 8, marginBottom: 15 },
  profileHeaderText: { fontSize: 13, color: '#6f42c1', marginLeft: 6 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6f42c1',
    elevation: 2,
  },
  projectName: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  projectDesc: { fontSize: 13, color: '#555', marginBottom: 8, lineHeight: 18 },
  tech: { fontSize: 12, color: '#6f42c1', fontWeight: '500' },
});