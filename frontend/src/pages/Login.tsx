import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';
import { useAppDispatch } from '../hooks/redux';
import { loginSuccess } from '../store/slices/authSlice';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const response = await authAPI.login(values);
      dispatch(loginSuccess(response.data));
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 m-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SocialAutoWeb</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Formik
          initialValues={{ email: 'demo@socialauto.com', password: 'demo1234' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="input"
                  placeholder="your@email.com"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="input"
                  placeholder="••••••••"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
