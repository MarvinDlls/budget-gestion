import { Tabs } from 'expo-router';

const Layout = () => {
  return (
	<Tabs>
        <Tabs.Screen name="welcome" options={{ title: "Welcome" }} />
        <Tabs.Screen name="Create" options={{ title: "Create" }} />
	</Tabs>
  );
};

export default Layout;