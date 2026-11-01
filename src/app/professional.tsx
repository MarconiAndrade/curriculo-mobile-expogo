import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { Ionicons } from '@expo/vector-icons';

const formatDate = (dateString: string) => {
  if (!dateString) return 'Atual';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

export default function ProfessionalScreen() {
  const { selectedProfile } = useProfile();
  const [professionalData, setProfessionalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://curriculo-express-gold.vercel.app/api/professional-experiences')
      .then((response) => response.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.data || data.experiences || [];
        const filtered = selectedProfile
          ? results.filter((item: any) => item.profile_id === selectedProfile.id || item.profileId === selectedProfile.id || !item.profile_id)
          : results;

        setProfessionalData(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados profissionais:', error);
        setLoading(false);
      });
  }, [selectedProfile]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedProfile && (
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle-outline" size={20} color="#28a745" />
          <Text style={styles.profileHeaderText}>Exibindo para: <Text style={{fontWeight: 'bold'}}>{selectedProfile.name || selectedProfile.nome}</Text></Text>
        </View>
      )}

      <Text style={styles.title}>Experiência Profissional</Text>
      
      {professionalData.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum registo profissional encontrado para este perfil.</Text>
      ) : (
        professionalData.map((item, index) => (
          <View key={item.id || index} style={styles.card}>
            <Text style={styles.role}>{item.role || item.cargo || item.title}</Text>
            <Text style={styles.company}>{item.company || item.empresa}</Text>
            <Text style={styles.period}>
              {formatDate(item.start_date || item.startDate)} - {item.end_date || item.endDate ? formatDate(item.end_date || item.endDate) : 'Atual'}
            </Text>
            {item.description ? (
              <Text style={styles.description}>{item.description}</Text>
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
  profileHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f8ed', padding: 10, borderRadius: 8, marginBottom: 15 },
  profileHeaderText: { fontSize: 13, color: '#28a745', marginLeft: 6 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
    elevation: 2,
  },
  role: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  company: { fontSize: 14, color: '#555', marginBottom: 2 },
  period: { fontSize: 12, color: '#888', marginBottom: 8 },
  description: { fontSize: 13, color: '#666', lineHeight: 18 },
});