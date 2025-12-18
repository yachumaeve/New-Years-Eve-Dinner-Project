import os
import mysql.connector
from flask import Flask, jsonify

app = Flask(__name__)

# 從環境變數讀取連線資訊（對應您 K8s YAML 的 env 設定）
db_config = {
    'host': os.getenv('DB_HOST', 'mysql-service'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME'),
    'port': int(os.getenv('DB_PORT', 3306))
}

@app.route('/data', methods=['GET'])
def get_data():
    try:
        # 建立連線
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # 假設資料庫中有一個 users 資料表
        cursor.execute("SELECT * FROM users")
        results = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({"message": "連線成功！", "data": results})
    except Exception as e:
        return jsonify({"error": "資料庫連線或查詢失敗", "details": str(e)}), 500

@app.route('/')
def index():
    return "Python Backend 正在運行中..."

if __name__ == '__main__':
    # 監聽 0.0.0.0 才能讓容器外的流量進入
    app.run(host='0.0.0.0', port=8080)