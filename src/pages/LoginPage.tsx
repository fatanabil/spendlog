import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '../schemas/LoginSchema';
import { useAuthStore } from '../store/authStore';
import { api } from '../utils/fetchAPI';

const LoginPage = () => {
    const { setAccessToken, setUser, loading, setLoading } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({ resolver: zodResolver(LoginSchema) });

    const navigate = useNavigate();

    const loginUser = async (data: LoginSchema) => {
        setLoading(true);
        try {
            const res = await api.post('/login', { ...data });

            if (res.status !== 200) {
                throw new Error(res.data.message);
            }

            setAccessToken(res.data.data.accessToken);
            setUser(res.data.data.user);
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Login failed: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <form method='POST' onSubmit={handleSubmit(loginUser)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' {...register('email')} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input id='email' type='password' {...register('password')} />
                </div>
                <button type='submit' disabled={loading}>
                    {isSubmitting ? 'LOADING...' : 'LOGIN'}
                </button>
            </form>
        </main>
    );
};

export default LoginPage;
