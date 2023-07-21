from flask import Flask,request,jsonify
from flask_cors import cross_origin

import psycopg2

app = Flask(__name__)

conn = psycopg2.connect(host='localhost',
                            database='smk627751',
                            user='postgres',
                            password='627751')

@app.route('/login',methods=["POST"])
@cross_origin()
def login():
    if request.method == "POST":
        user = request.get_json()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM accounts WHERE username = %s AND password = %s',(user['username'],user['password']))
        
        account = cursor.fetchone()
        if account:
            response = {
                "username": account[1],
                "email":account[2],
                "image":account[5],
                "role":account[4],
                "status":"Success"
                }
        else:
            response = {"status":"Invalid username or password"}

        cursor.close()
        return jsonify(response)

@app.route('/register',methods=["POST"])
@cross_origin()
def signup():
    if request.method == "POST" :
        user = request.get_json()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO accounts (username,email,password,role,image) VALUES(%s,%s,%s,%s,%s);',(user['username'],user['email'],user['password'],user['role'],user['image']))
        conn.commit()
        cursor.close()
        return jsonify({"status":"success"})

if __name__ == "__main__":
    app.run(debug=True)