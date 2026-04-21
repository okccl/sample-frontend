# sample-frontend

Platform Engineering portfolio — サンプルアプリケーション（フロントエンド）

## 概要

Helm Library Chart（`common-app`）と Golden Path CI/CD の動作確認用サンプルフロントエンド。  
React + Vite で構成し、本番コンテナは nginx で静的ファイルを配信する。

このリポジトリは「アプリ開発者がプラットフォームをどう使うか」を示すことを目的としており、
アプリ自体の機能よりも **CI/CD パイプラインと Helm 統合** に焦点を当てている。

## このリポジトリが示すもの

| Phase | 内容 |
|-------|------|
| Phase 5 | `common-app` Library Chart を使い、最小限の `values.yaml` だけでデプロイ定義が完結することを示す |
| Phase 6 | `main` へのpushで自動的にイメージビルド → GHCR プッシュ → `platform-gitops` への通知まで完結する Golden Path |

## ディレクトリ構成

```
sample-frontend/
├── .github/workflows/
│   ├── build.yaml            # CI: イメージビルド & GHCR プッシュ
│   └── update-gitops.yaml    # CD: platform-gitops への image tag 更新通知
├── src/                      # React アプリケーション
├── public/
├── nginx.conf                # 本番コンテナ用 nginx 設定
└── Dockerfile
```

> デプロイ定義（Helm values / ArgoCD Application）は `platform-gitops/apps/sample-frontend/` で管理。

## CI/CD フロー

```
push to main
  └─► build.yaml
        ├─ Docker イメージをビルド（タグ: git SHA short）
        ├─ GHCR (ghcr.io/okccl/sample-frontend) にプッシュ
        └─► update-gitops.yaml
              └─► platform-gitops に repository_dispatch を送信
                    └─► ArgoCD が新しいイメージタグで自動同期
```

## ローカル開発

```bash
npm install
npm run dev
# → http://localhost:5173
```

## 関連リポジトリ

| リポジトリ | 役割 |
|---|---|
| [`platform-gitops`](https://github.com/okccl/platform-gitops) | このサービスの Helm values / ArgoCD Application を管理 |
| [`platform-charts`](https://github.com/okccl/platform-charts) | デプロイに使用する `common-app` Library Chart を提供 |
