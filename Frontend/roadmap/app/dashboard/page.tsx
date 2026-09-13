"use client";

import { useState } from "react";
import Link from "next/link";
import styles from './dashoboard.module.css';

type Skill = {
  id: string;
  name: string;
};

const NAV_ITEMS = ["Skills", "Progress", "Contests", "Settings"];


const INITIAL_SKILLS: Skill[] = [
  { id: "1", name: "Frontend" },
  { id: "2", name: "Backend" },
];

export default function SkillDashboard() {
  const [skills] = useState<Skill[]>(INITIAL_SKILLS);
  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0]);

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.avatar} aria-hidden="true" />
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
      </aside>

      <main className={styles.main}>
        <h1 className={styles.heading}>Skills you are tracking</h1>

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
      </main>
    </div>
  );
}