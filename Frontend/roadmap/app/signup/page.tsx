'use client';

import { useState } from 'react';
import styles from './signup.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const COUNTRIES = [
  'Egypt',
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'France',
  'Saudi Arabia',
  'United Arab Emirates',
  'India',
  'Nigeria',
  'Morocco',
  'Jordan',
  'Lebanon',
  'Tunisia',
  'Algeria',
  'Qatar',
  'Kuwait',
  'Australia',
  'Brazil',
  'Japan',
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  password: string;
  confirmPassword: string;
};

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    if (!form.country) nextErrors.country = 'Country is required';
    if (!form.password) nextErrors.password = 'Password is required';
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters';
    if (!form.confirmPassword) nextErrors.confirmPassword = 'Please confirm your password';
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_BASE_URL}/authApi/SignUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userName: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
          email: form.email.trim(),
          password: form.password,
          country: form.country,
        }),
      });

      const data = await response.json().catch(() => ({ msg: 'Signup failed' }));

      if (!response.ok) {
        throw new Error(data?.msg || 'Signup failed');
      }

      router.push('/login');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <Image
          src="/icons/signup.png"
          alt="signup photo"
          className={styles.leftImage}
          fill
          priority
        />
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Create your account</h1>

            <p className={styles.loginPrompt}>
              Already have an account?
              <Link href="/login" className={styles.login}>
                Log in
              </Link>
            </p>
          </div>

          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  className={styles.input}
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Ahmed"
                />
                {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  className={styles.input}
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
                {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                className={styles.select}
                value={form.country}
                onChange={handleChange}
              >
                <option value="" disabled>Select your country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && <span className={styles.error}>{errors.country}</span>}
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
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirmPassword">Confirm password</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={styles.input}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showConfirmPassword} />
                </button>
              </div>
              {errors.confirmPassword && (
                <span className={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>

            {submitError && <span className={styles.error}>{submitError}</span>}

            <button type="submit" className={styles.signupButton} disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Sign up'}
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