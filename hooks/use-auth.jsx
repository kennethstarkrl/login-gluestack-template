import { useAuthContext } from '@/contexts/auth-context';

export const useAuth = () => {
    const { user, login, logout } = useAuthContext();

    const isAuthenticated = !!user;

    return {
        user,
        isAuthenticated,
        login,
        logout,
    };
};