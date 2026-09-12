'use client';

import { useState } from 'react';
import styles from './login.module.css';
import Image from 'next/image';
import hidden from "./icons/hidden.png";
import show from './icons/show.png';
import login from './icons/login.png';

export default function Home() {

    const [showPassword, setShowPassword] = useState(false);
    const [form , setForm] = useState({identifier: '', password: ''});


    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <Image
            src={login}
            alt="login photo"
            className={styles.leftImage}
            priority
        />
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Log in</h1>

          <form className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="identifier">Login, email or phone number</label>
                <input
                id="identifier"
                name="identifier"
                className={styles.input}
                placeholder='example@gmail.com'
                value={form.identifier}
                onChange={handleChange}/>
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Password</label>
                <div className={styles.passwordWrapper}>
                    <input
                    id="password"
                    name="password"
                    type={showPassword? 'text' : 'password'}
                    className={styles.input}
                    value={form.password}
                    onChange={handleChange}/>

                    <button
                    type='button'
                    className={styles.eyeButton}
                    onClick={()=> setShowPassword((value)=> !value)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}>
                        <EyeIcon open={showPassword} />
                    </button>
                </div>
            </div>

            <button type="submit" className={styles.loginButton}>
                Log in
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
      src={open ? hidden : show}
      alt={open ? 'Hide password' : 'Show password'}
      width={20}
      height={20}
    />
  );
}
