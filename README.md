# CYP3A4 Enzyme‑Inhibition Prediction Platform

A lightweight React application that demonstrates a full end‑to‑end cheminformatics workflow — from **CSV upload** through **feature engineering**, **model training & comparison**, to **test‑set prediction** and **submission‑file export**.

> **Why?** CYP3A4 is the most versatile human cytochrome P450 isoform, responsible for the metabolism of \~50 % of marketed drugs. Rapidly screening compounds for CYP3A4 inhibition helps flag potential DDIs early in the discovery pipeline.

---

\## ✨ Key Features

| Module | Highlights |
| --------| -----------|
\| **Data Upload** | Accepts `train.csv` and `test.csv` files (ID, SMILES, ±Inhibition%). Instant preview of first 5 rows. |
\| **Feature Engineering** | Interactive controls for Morgan‑fingerprint *bits* (1024‑4096), *radius* (1‑3), and *normalisation* (min‑max / z‑score / robust). |
\| **Model Training** | One‑click training of four regressors (Bayesian Ridge, Random Forest, Lasso, LightGBM) with a progress bar and metric table (RMSE, MAE, R², MAPE). |
\| **Prediction** | Generates mock predictions for the test set and exports a Kaggle‑style `submission.csv`. |
\| **UI/UX** | Pure React + inline CSS (no external CSS‑in‑JS lib). Icons by **lucide‑react**.

---

\## 🗂 Project Structure

```text
root
├─ src/
│  ├─ CYP3A4PredictionApp.tsx   ← single‑file application
│  └─ main.tsx / index.tsx       ← your React entry (Vite/CRA)
├─ public/
│  └─ ...                        ← static assets
├─ package.json
└─ tsconfig.json
```

---

\## 🚀 Getting Started

\### Prerequisites

* **Node ≥ 18 LTS**
* pnpm / Yarn / npm (your choice)

\### Installation & Dev Server

```bash
# clone
$ git clone https://github.com/your‑org/cyp3a4‑prediction.git
$ cd cyp3a4‑prediction

# install deps
$ pnpm install        # or: yarn / npm install

# start Vite / CRA dev server
$ pnpm dev            # or: yarn dev / npm start
```

Visit **[http://localhost:5173](http://localhost:5173)** (Vite default) and play with the app.

\### Build for Production

```bash
$ pnpm build          # outputs to /dist
$ pnpm preview        # optional local preview
```

---

\## 📄 CSV Format

\### Training (`train.csv`)

```csv
ID,Canonical_Smiles,Inhibition
CMPD0001,CC(C)OC1=CC=CC=C1C(=O)O,78.3
CMPD0002,CCN(CC)CCCC(C)NC1=NC=NC2=C1N=CN2,12.4
…
```

\### Test (`test.csv`)

```csv
ID,Canonical_Smiles
TST0001,N#CC1=CC=CC=C1C(=O)NCC=C
TST0002,COC1=CC=C(C=C1)C(=O)NCCN
…
```

---

\## 🔬 Extending the App

1. **Plug in RDKit.js** or an API endpoint to compute real fingerprints.
2. Swap the mock training loop with *scikit‑learn* service calls or *PyCaret* cloud functions.
3. Add extra metrics (Spearman, Kendall), cross‑validation controls, or hyper‑parameter search (e.g. Optuna).
4. Deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

---

\## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

```bash
# lint & type‑check
$ pnpm lint  # eslint + prettier
$ pnpm type  # tsc --noEmit
```

---

\## 📜 License

MIT © 2025 *Your Name / Lab*

---

\### 中文快速指南  🀄️

1. 将 `train.csv`、`test.csv` 放到本地磁盘后，点击 **Data Upload** 导入。
2. 在 **Feature Engineering** 中调整指纹长度、半径和归一化方法。
3. 切换到 **Model Training**，点击 *Train & Compare Models*，等待进度条完成。
4. 前往 **Prediction** 生成并下载 `submission.csv`。

祝使用顺利！

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
