## WishWithHeart - 認領心願平台
這是一個基於 Kubernetes (K8s) 架構開發的公益認領平台。後端採用 Flask 提供 RESTful API，前端使用 Angular 構建響應式介面，並部署於 AWS EC2 上的自建 K8s 叢集。

### 系統架構圖
系統採用高效且高可用性的雲端架構：

- 入口層 (Ingress): 使用 Ingress-Nginx 配合 Cert-manager 自動申請 Let's Encrypt SSL 憑證，提供全站 HTTPS 安全連線。
- 前端層 (Frontend): Angular 應用部署於 Nginx 容器，處理使用者介面互動。
- 後端層 (Backend): Python Flask 處理商業邏輯，支援動態擴展（Replicas: 2）。
- 資料層 (Database): MySQL 8.0 核心，透過 AWS EBS (Elastic Block Store) 結合 PersistentVolume (PV) 實現數據持久化。

### 技術重點

- 雲端數據持久化: 透過 K8s 的 PV/PVC 機制掛載 AWS EBS 磁碟，確保 Pod 在重啟或更新時，資料庫數據（派大星的心願）不會遺失。
- 自動化 CI/CD: 整合 GitHub Actions，透過 Base64 編碼的 KUBE_CONFIG 實現自動化部署，達成「代碼推送即更新」。
- 資源管理與監控: 為每個 Pod 設置 Resources Limits (CPU/Memory)，防止單一容器故障影響整台主機。
- 路徑路由優化: 利用 Ingress 正規表達式重寫技術（Rewrite Target），將 /api 流量精準導向後端。

### 部署腳本說明
本專案的 K8s 設定檔位於 k8s/ 目錄下：

- mysql-pv.yaml: 定義資料庫儲存卷。
- mysql-deployment.yaml: MySQL 部署與內部 Service 設定。
- backend-deployment.yaml: Flask API 部署及資料庫連線環境變數。
- frontend-deployment.yaml: Angular 網頁部署。
- ingress.yaml: 網域路由與 SSL 憑證聯動設定。

### 成果展示

1. K8s pod 運行狀態
   <img width="1294" height="736" alt="image" src="https://github.com/user-attachments/assets/c196ae19-1365-43cb-b0c1-188effe93795" />

2. 後端API返回結果
   <img width="1712" height="1124" alt="image" src="https://github.com/user-attachments/assets/b0ddc077-323f-48a5-83bb-cd4f7f5dc71b" />

4. 網頁展示
   <img width="2872" height="1622" alt="image" src="https://github.com/user-attachments/assets/1ecba9fe-d4eb-4ea3-8c51-cc7356ae2f7d" />
