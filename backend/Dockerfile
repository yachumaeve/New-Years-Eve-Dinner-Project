# 使用官方 Python 輕量版
FROM python:3.9-slim

# 設定工作目錄
WORKDIR /app

# 複製依賴清單並安裝
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製程式碼
COPY . .

# 開啟 8080 端口
EXPOSE 8080

# 啟動指令
CMD ["python", "app.py"]