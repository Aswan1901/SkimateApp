import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName]
) {
    if (navigationRef.isReady()) {
        console.log(`Navigation vers : ${name}`, params);
        navigationRef.navigate(name, params);
    } else {
        console.warn("Navigation non prête. Impossible de naviguer vers :", name);
    }
}