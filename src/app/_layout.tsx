import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProfileProvider } from '../context/ProfileContext';

export default function TabLayout() {
  return (
    <ProfileProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Perfil',
            tabBarIcon: (props: any) => (
              <Ionicons name="person" size={props.size} color={props.color} />
            ),
          }}
        />
        <Tabs.Screen
          name="academic"
          options={{
            title: 'Acadêmico',
            tabBarIcon: (props: any) => (
              <Ionicons name="school" size={props.size} color={props.color} />
            ),
          }}
        />
        <Tabs.Screen
          name="professional"
          options={{
            title: 'Profissional',
            tabBarIcon: (props: any) => (
              <Ionicons name="briefcase" size={props.size} color={props.color} />
            ),
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            title: 'Projetos',
            tabBarIcon: (props: any) => (
              <Ionicons name="code-working" size={props.size} color={props.color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sobre"
          options={{
            title: 'Sobre',
            tabBarIcon: (props: any) => (
              <Ionicons name="information-circle" size={props.size} color={props.color} />
            ),
          }}
        />
      </Tabs>
    </ProfileProvider>
  );
}