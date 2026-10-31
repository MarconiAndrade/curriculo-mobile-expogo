import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="academic"
        options={{
          title: 'Acadêmica',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="school" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="professional"
        options={{
          title: 'Profissional',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projetos',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="code-slash" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}