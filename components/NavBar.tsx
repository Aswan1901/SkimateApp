import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';

const NavBar = () => {
    const router = useRouter();
    const theme = useTheme(); // Get theme to modify colors

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'dashboard', title: 'Dashboard', focusedIcon: 'home', unfocusedIcon: 'home-circle' },
        { key: 'resort', title: 'Station', focusedIcon: 'ski' },
        { key: 'weather', title: 'Météo', focusedIcon: 'weather-snowy-heavy' },
        { key: 'settings', title: 'Paramèttres', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
    ]);

    const handleIndexChange = (newIndex) => {
        setIndex(newIndex);
        router.push(`/${routes[newIndex].key}`);
    };

    return (
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={handleIndexChange}
                renderScene={() => null}
                barStyle={{
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    elevation: 5,
                    height: 70,
                }}
                activeColor="#fff"
                inactiveColor="#0A3A5D"
                theme={{
                    ...theme,
                    colors: {
                        ...theme.colors,
                        secondaryContainer: '#0A3A5D',
                    },
                }}
            />
    );
};
export default NavBar;
