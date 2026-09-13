'use client';

import welcome from './welcome.module.css';
import Link from 'next/link';

export default function Home() {
  return (
   <div className={welcome.page}>
      <header>
       <div className={welcome.NavBar}>
        <div className={welcome.leftBar}>
          <span>Skill Tracker</span>
        </div>

        <div className={welcome.rightBar}>
          <Link href="/login" className={welcome.logInButton}>
            Log in
          </Link>
          <Link href="/signup" className={welcome.getStartedButton}>
            Get Started
          </Link>
        </div>
      </div>
      </header>

      <main className={welcome.main}>
        <section className={welcome.first}>
          <div className={welcome.f1}>
            <h2>Practice Leaves a Mark</h2>
            <h2>Skill Tracker Keeps Track Of It.</h2>
          </div>

          <div className={welcome.f2}>
            <p>Log the skills you are building, keep a streak going, and 
              watch small daily reps turn into something you can point to.
            </p>
          </div>
        </section>

        <section className={welcome.second}>
          <div className={welcome.s1}>
            <h2>Practice and make it a habit</h2>
          </div>

          <div className={welcome.s2}>
            <h3>See Your Progress Take Shape</h3>

            <p>Every skill gets its own streak, its own history, and its own tracker. Open your dashboard and you wil find exactly where you left off.
            </p>
          </div>
        </section>
      </main>

      <footer className={welcome.footer}>
        <p>© Copyright - Skill Tracker - Hanebda2 Mn Bokra</p>
      </footer>
   </div>
  );
}