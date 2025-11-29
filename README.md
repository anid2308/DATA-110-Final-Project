# NCAA Basketball Teams’ Offensive and Defensive Efficiency

**Team Name:** Panda Ballers  
**Project Members:** Ira Joshi, Sanjana Holla, Anirudh Dhawan, Naomi Webster, Dane Nighswander, Audrey Sompie 

---

## 📌 Project Overview

This repository contains code and analysis for a data-driven exploration of NCAA Division I men’s basketball teams from **2013–2023 (excluding 2020)**. Our core question:

> **Does defensive strength or offensive strength matter more for consistently winning games across seasons?** 

Using team-level efficiency metrics, tempo, and schedule strength, we:

- Quantify how **adjusted offensive efficiency (ADJOE)** and **adjusted defensive efficiency (ADJDE)** relate to winning.
- Explore whether **pace (ADJ_T)** and **competition level (conference, power rating)** shift the balance between offense and defense.
- Build simple predictive models to estimate **wins / win percentage** from team statistics.

---

## 🏀 Data Description

- **Source:** Scraped from [barttorvik.com](https://barttorvik.com) (Division I men’s basketball).
- **Population:** All Division I men’s basketball teams from **2013–2023**, excluding 2020.  
- **Unit of analysis:** One row per **team-season**.
