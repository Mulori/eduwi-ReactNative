import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

import myResponseActivity from '../../mainActivity/myResponseActivity';
import myActivity from '../../mainActivity/myActivity';

export default function activity() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#FFA500',
        tabBarInactiveTintColor: '#FFA500',
        tabBarActiveTintColor: '#FFF',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Minhas Atividades') {
            iconName = 'user-edit'
          } else if (route.name === 'Atividades Realizadas') {
            iconName = 'user-tag'
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen 
        name="Minhas Atividades" 
        component={myActivity} 
        options={{ 
          headerTitle: 'Minhas Atividades', 
          headerStyle: { 
              backgroundColor: '#FFA500', 
          }, 
          headerTitleStyle: { 
              fontWeight: 'bold',
              color: '#FFF' 
          },
          }}
        />
      <Tab.Screen 
        name="Atividades Realizadas" 
        component={myResponseActivity} 
        options={{ 
          headerTitle: 'Atividades Realizadas', 
          headerStyle: { 
              backgroundColor: '#FFA500', 
          }, 
          headerTitleStyle: { 
              fontWeight: 'bold',
              color: '#FFF' 
          },
          }}
      />
    </Tab.Navigator>
  );
}