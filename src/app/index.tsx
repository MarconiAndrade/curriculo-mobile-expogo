import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os perfis disponíveis na API
    fetch('https://curriculo-express-gold.vercel.app/api/profiles')
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.data || data.profiles || [];
        setProfiles(results);
        if (results.length > 0) {
          setSelectedProfile(results[0]); // Define o primeiro como padrão
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar perfis:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>A carregar perfis...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho de Boas-Vindas */}
      <View style={styles.headerCard}>
        <Ionicons name="person-circle-outline" size={64} color="#007AFF" />
        <Text style={styles.welcomeTitle}>Currículo Profissional</Text>
        <Text style={styles.welcomeSubtitle}>Selecione abaixo o perfil desejado para visualizar os dados dinâmicos:</Text>
      </View>

      {/* Perfil Ativo em Destaque */}
      {selectedProfile && (
        <View style={styles.activeBanner}>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>PERFIL ATIVO</Text>
          </View>
          <Text style={styles.activeName}>{selectedProfile.name || selectedProfile.nome}</Text>
          <Text style={styles.activeRole}>{selectedProfile.role || selectedProfile.cargo || 'Desenvolvedor Full-Stack'}</Text>
        </View>
      )}

      {/* Lista de Seleção de Perfis */}
      <Text style={styles.sectionTitle}>Perfis Disponíveis no Sistema</Text>
      
      {profiles.map((profile, index) => {
        const isSelected = selectedProfile?.id === profile.id;
        return (
          <TouchableOpacity
            key={profile.id || index}
            style={[styles.profileCard, isSelected && styles.profileCardSelected]}
            onPress={() => setSelectedProfile(profile)}
          >
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, isSelected && styles.profileNameSelected]}>
                {profile.name || profile.nome}
              </Text>
              <Text style={styles.profileDescription}>
                {profile.bio || profile.descricao || 'Toque para ativar este perfil'}
              </Text>
            </View>
            <Ionicons
              name={isSelected ? 'checkmark-circle' : 'chevron-forward'}
              size={24}
              color={isSelected ? '#007AFF' : '#ccc'}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f4f6f9', flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f9' },
  loadingText: { marginTop: 10, color: '#666', fontSize: 14 },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: '#111', marginTop: 10 },
  welcomeSubtitle: { fontSize: 13, color: '#666', textAlign: 'center', marginTop: 6, lineHeight: 18 },
  activeBanner: {
    backgroundColor: '#eef4ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#007AFF',
  },
  activeBadge: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  activeBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  activeName: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  activeRole: { fontSize: 14, color: '#007AFF', marginTop: 2, fontWeight: '500' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  profileCardSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f8fbff',
  },
  profileInfo: { flex: 1, marginRight: 10 },
  profileName: { fontSize: 15, fontWeight: '600', color: '#333' },
  profileNameSelected: { color: '#007AFF', fontWeight: 'bold' },
  profileDescription: { fontSize: 12, color: '#666', marginTop: 4 },
});