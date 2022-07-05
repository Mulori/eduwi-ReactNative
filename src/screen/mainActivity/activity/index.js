import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import myActivity from '../../mainActivity/myActivity';

export default function activity() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Minhas Atividades" component={myActivity} />
      <Tab.Screen name="Atividades Realizadas" component={myActivity} />
    </Tab.Navigator>
  );
}