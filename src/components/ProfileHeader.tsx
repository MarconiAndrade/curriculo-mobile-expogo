import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileHeader({ selectedProfileId, onSelectProfile }: { selectedProfileId: number, onSelectProfile: (id: number) => void }) {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://curriculo-express-gold.vercel.app/api/profiles')
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.data || [];
        setProfiles(results);
        if (results.length > 0 && !selectedProfileId) {
          onSelectProfile(results[0].id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar perfis:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="small" color="#007AFF" style={{ marginVertical: 10 }} />;
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.label}>Perfil Ativo:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectorRow}>
        {profiles.map((p) => {
          const isSelected = p.id === selectedProfileId;
          return (
            <TouchableOpacity
              key={p.id}
              style={[styles.profileChip, isSelected && styles.profileChipSelected]}
              onPress={() => onSelectProfile(p.id)}
            >
              <Text style={[styles.profileText, isSelected && styles.profileTextSelected]}>
                {p.name || p.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  label: { fontSize: 12, color: '#666', marginBottom: 6, fontWeight: '600', textTransform: 'uppercase' },
  selectorRow: { flexDirection: 'row', gap: 8 },
  profileChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f1f3f5',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  profileChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  profileText: { fontSize: 14, color: '#495057', fontWeight: '500' },
  profileTextSelected: { color: '#fff', fontWeight: 'bold' },
});