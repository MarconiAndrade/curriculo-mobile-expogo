import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { Ionicons } from '@expo/vector-icons';

const formatDate = (dateString: string) => {
  if (!dateString) return 'Atual';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

export default function AcademicScreen() {
  const { selectedProfile } = useProfile();
  const [academicData, setAcademicData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://curriculo-express-gold.vercel.app/api/academic-experiences')
      .then((response) => response.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.data || data.experiences || [];
        const filtered = selectedProfile
          ? results.filter((item: any) => item.profile_id === selectedProfile.id || item.profileId === selectedProfile.id || !item.profile_id)
          : results;

        setAcademicData(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados acadêmicos:', error);
        setLoading(false);
      });
  }, [selectedProfile]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedProfile && (
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle-outline" size={20} color="#007AFF" />
          <Text style={styles.profileHeaderText}>Exibindo para: <Text style={{fontWeight: 'bold'}}>{selectedProfile.name || selectedProfile.nome}</Text></Text>
        </View>
      )}

      <Text style={styles.title}>Experiência Acadêmica</Text>
      
      {academicData.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum registo acadêmico encontrado para este perfil.</Text>
      ) : (
        academicData.map((item, index) => (
          <View key={item.id || index} style={styles.card}>
            <Text style={styles.degree}>{item.degree || item.course || item.curso}</Text>
            <Text style={styles.institution}>{item.institution || item.instituicao}</Text>
            <Text style={styles.period}>
              {formatDate(item.start_date || item.startDate)} - {item.end_date || item.endDate ? formatDate(item.end_date || item.endDate) : 'Atual'}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa', flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eef4ff', padding: 10, borderRadius: 8, marginBottom: 15 },
  profileHeaderText: { fontSize: 13, color: '#007AFF', marginLeft: 6 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    elevation: 2,
  },
  degree: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  institution: { fontSize: 14, color: '#555', marginBottom: 2 },
  period: { fontSize: 12, color: '#888' },
});