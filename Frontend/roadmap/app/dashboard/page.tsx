"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from './dashoboard.module.css';
import profile from './icons/defaultpp.png';

type Skill = {
  id: string;
  name: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const NAV_ITEMS = ["Skills"];

export default function SkillDashboard() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/userApi/user/skills`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/welcomePage");
          return;
        }

        if (!res.ok) {
          throw new Error(`Failed to load skills: ${res.status}`);
        }

        const data = await res.json();
        setSkills(data.skills);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Couldn't load your skills. Try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserSkills();
  }, [router]);

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/authApi/SignOut`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Sign out failed:", res.status);
        return;
      }

      router.push("/welcomePage");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Image
              src={profile}
              alt="Profile picture"
              className={styles.avatarImg}
            />
          </div>
          <span className={styles.profileName}>Profile</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className={`${styles.navItem} ${
                activeNav === item ? styles.navItemActive : ""
              }`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={styles.signOutButton}
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </aside>

      <main className={styles.main}>
        <h1 className={styles.heading}>Skills you are tracking</h1>

        {loading && <p>Loading your skills...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && (
          <div className={styles.skillGrid}>
            {skills.map((skill) => (
              <Link
                key={skill.id}
                href={`/skills/${skill.id}`}
                className={styles.skillCard}
              >
                <span className={styles.skillName}>{skill.name}</span>
              </Link>
            ))}

            <Link href="/skills/new" className={styles.addCard} aria-label="Add a skill">
              +
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}