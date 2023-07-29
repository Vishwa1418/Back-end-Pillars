from flask import Flask,request,jsonify
from flask_cors import cross_origin

import psycopg2

app = Flask(__name__)

conn = psycopg2.connect(host='database-1.cewpaymndauh.us-east-1.rds.amazonaws.com',
                        port=5432,
                            database='postgres',
                            user='postgres',
                            password='Devopskadit')

@app.route('/users')
@cross_origin()
def users():
    cursor = conn.cursor()
    cursor.execute('select * from user_table')
    users = cursor.fetchall()
    users_list = []
    for user in users:
        user_data = {}
        user_data['user_id'] = user[0]
        user_data['username'] = user[1]
        user_data['email'] = user[2]
        user_data['role'] = user[4]
        user_data['registration_date'] = user[5]
        user_data['last_login_date'] = user[6]
        users_list.append(user_data)
    
    return jsonify(users_list)

@app.route('/quiz')
@cross_origin()
def quiz():
    cursor = conn.cursor()
    cursor.execute('select quiz.quiz_id,quiz.course_id,quiz.quiz_title,ques.question_text,ques.correct_answer from quiz_table as quiz join question_table as ques on quiz.quiz_id = cast(ques.quiz_id as integer)')
    questions = cursor.fetchall()
    questions_list = []
    for question in questions:
        question_data = {}
        question_data['quiz_id'] = question[0]
        question_data['course_id'] = question[1]
        question_data['quiz_title'] = question[2]
        question_data['question_text'] = question[3]
        question_data['correct_answer'] = question[4]
        questions_list.append(question_data)
    
    return jsonify(questions_list)

if __name__ == "__main__":
    app.run(debug=True)