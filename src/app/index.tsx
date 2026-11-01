import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../context/ProfileContext';

export default function HomeScreen() {
  const { profiles, setProfiles, selectedProfile, setSelectedProfile } = useProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://curriculo-express-gold.vercel.app/api/profiles')
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.data || data.profiles || [];
        setProfiles(results);
        if (results.length > 0 && !selectedProfile) {
          setSelectedProfile(results[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar perfis:', err);
        setLoading(false);
      });
  }, []);

  const getCargo = (item: any) => {
    return item?.role || item?.cargo || item?.position || item?.title || 'Cargo não especificado';
  };

  const getEmail = (item: any) => {
    return item?.email || item?.mail || '';
  };

  const getResumo = (item: any) => {
    return item?.summary || item?.bio || item?.resumo || '';
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>A carregar perfis do banco...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <Ionicons name="person-circle" size={72} color="#007AFF" />
        <Text style={styles.welcomeTitle}>Seletor de Perfis</Text>
        <Text style={styles.welcomeSubtitle}>Selecione abaixo o perfil para atualizar o currículo em tempo real:</Text>
      </View>

      {selectedProfile && (
        <View style={styles.activeBanner}>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>PERFIL ATIVO NO APP</Text>
          </View>
          <Text style={styles.activeName}>{selectedProfile.name || selectedProfile.nome}</Text>
          <Text style={styles.activeRole}>{getCargo(selectedProfile)}</Text>
          
          {getEmail(selectedProfile) ? (
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={16} color="#555" />
              <Text style={styles.infoText}>{getEmail(selectedProfile)}</Text>
            </View>
          ) : null}

          {getResumo(selectedProfile) ? (
            <Text style={styles.activeSummary}>{getResumo(selectedProfile)}</Text>
          ) : null}
        </View>
      )}

      <Text style={styles.sectionTitle}>Alternar Perfil</Text>
      
      {Array.isArray(profiles) && profiles.map((profile, index) => {
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
              <Text style={styles.profileDescription} numberOfLines={1}>
                {getCargo(profile)}
              </Text>
            </View>
            <Ionicons
              name={isSelected ? 'radio-button-on' : 'radio-button-off'}
              size={22}
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
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  welcomeTitle: { fontSize: 20, fontWeight: 'bold', color: '#111', marginTop: 8 },
  welcomeSubtitle: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 4 },
  activeBanner: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    elevation: 3,
  },
  activeBadge: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 10,
  },
  activeBadgeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  activeName: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  activeRole: { fontSize: 14, color: '#007AFF', marginTop: 2, fontWeight: '600', marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#444', marginLeft: 6 },
  activeSummary: { fontSize: 13, color: '#555', marginTop: 6, lineHeight: 18, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  profileCardSelected: { borderColor: '#007AFF', backgroundColor: '#f8fbff' },
  profileInfo: { flex: 1, marginRight: 10 },
  profileName: { fontSize: 15, fontWeight: '600', color: '#333' },
  profileNameSelected: { color: '#007AFF', fontWeight: 'bold' },
  profileDescription: { fontSize: 12, color: '#666', marginTop: 2 },
});