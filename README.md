# CYP3A4 Enzyme‑Inhibition Prediction Platform

A lightweight **React + TypeScript** web interface for rapid experimentation with QSAR models that estimate CYP3A4 enzyme inhibition from molecular structures. The UI guides you from raw CSVs all the way to downloadable competition submissions.

---

## ✨ Key Features

| Module                  | Purpose                                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Data Upload**         | Drag‑and‑drop training / test CSVs (SMILES + labels). Quick preview for sanity checks.                                                 |
| **Feature Engineering** | Select Morgan fingerprint length, radius, and normalisation method. Settings update in real time.                                      |
| **Model Training**      | One‑click training & benchmarking of four baseline regressors (Bayesian Ridge, Random Forest, Lasso, LightGBM). Progress bar included. |
| **Results**             | Sorted metrics table (RMSE, MAE, R², MAPE) for transparent model selection.                                                            |
| **Prediction**          | Generate test‑set predictions with the chosen model and export a ready‑to‑submit `submission.csv`.                                     |

> **Note** All models are currently mocked for UI demonstration—the hooks can be swapped for real API calls or web‑workers running PyCaret/Scikit‑learn.

---

## 🏗️ Architecture at a Glance

* **React 18 + TypeScript** – typed safety and modern hooks API
* **lucide‑react** – consistent, lightweight icon set
* Pure **CSS‑in‑JS** (inline styles) – no external stylesheet required

```
src/
 ├─ components/
 │   └─ CYP3A4PredictionApp.tsx   # single‑page application
 └─ index.tsx                     # entry point
```

---

## 🚀 Getting Started

```bash
# 1. Clone repo
$ git clone https://github.com/your‑org/cyp3a4‑prediction‑app.git
$ cd cyp3a4‑prediction‑app

# 2. Install deps
$ npm install   # or pnpm / yarn

# 3. Dev server
$ npm start     # http://localhost:3000
```

The app is completely client‑side; no backend is required unless you wire in model inference.

---

## 📑 Data Format

### Training (`train.csv`)

```
ID,Canonical_Smiles,Inhibition
cmpd_001,CCO... ,45.8
cmpd_002,Nc1ccc...,12.3
```

### Test (`test.csv`)

```
ID,Canonical_Smiles
cmpd_101,CN(C)C...
```

All columns are parsed as **strings**; numeric conversion happens just before modelling.

---

## 🛠️ Extending the App

1. **Replace mock training** – plug the `trainModel` function into a FastAPI/Gunicorn endpoint or WebWorker.
2. **Add new fingerprints** – expand the `featureSettings` state with ECFP‑variants or physicochemical descriptors.
3. **Custom metrics / charts** – feed `modelResults` into a chart library (e.g., Recharts).
4. **Deploy** – `npm run build` produces a static bundle ready for Netlify, Vercel, or GitHub Pages.

---

## 📜 License

MIT – feel free to use, modify, and cite. Scientific citations are always appreciated.

---

## 🇨🇳 简体中文简介

* **功能**：上传数据、特征工程、模型训练、结果比较、预测下载，全部在浏览器端完成。
* **注意**：当前模型为演示用假数据，如需真实预测，请接入后端服务或 WebWorker。
* **启动**：`npm install && npm start` 即可本地预览。
