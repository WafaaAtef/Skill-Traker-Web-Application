'use client';

import { useState } from 'react';
import styles from './login.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError('Email and password are required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/authApi/SignIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json().catch(() => ({ msg: 'Login failed' }));

      if (!response.ok) {
        throw new Error(data?.msg || 'Login failed');
      }

      router.push('/roadmap');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <Image
          src="/icons/login.png"
          alt="login photo"
          className={styles.leftImage}
          width={600}
          height={600}
          priority
        />
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Log in</h1>

          <p className={styles.createAccountPrompt}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className={styles.createAccountLink}>
              Create one
            </Link>
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {error && <span className={styles.error}>{error}</span>}

            <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <Image
      src={open ? '/icons/hidden.png' : '/icons/show.png'}
      alt={open ? 'Hide password' : 'Show password'}
      width={20}
      height={20}
    />
  );
}
