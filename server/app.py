import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import cross_origin
import psycopg2
from datetime import datetime

app = Flask(__name__)
load_dotenv()

# PostgreSQL connection parameters
conn = psycopg2.connect(
    host= os.getenv('HOST'),
    database= os.getenv('DATABASE'),
    user= os.getenv('USER'),
    password= os.getenv('PASSWORD')
)

@app.route('/login', methods=["POST"])
@cross_origin()
def login():
    if request.method == "POST":
        user = request.get_json()
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM user_table WHERE email = '{user['email']}' AND password = '{user['password']}'")
        
        account = cursor.fetchone()
        if account:
            # Update the last login date for the user
            last_login = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            cursor.execute('UPDATE user_table SET last_login_date = %s WHERE user_id = %s', (last_login, account[0]))
            conn.commit()

            response = {
                "user_id": account[0],
                "username": account[1],
                "email": account[2],
                "role": account[4],
                "registration_date": account[5],
                "last_login_date": last_login,
                "image":account[7],
                "status": "Success"
            }
        else:
            response = {"status": "Invalid username or password"}

        cursor.close()
        return jsonify(response)

@app.route('/register', methods=["POST"])
@cross_origin()
def signup():
    if request.method == "POST":
        user = request.get_json()
        cursor = conn.cursor()

        # Check if the email already exists
        cursor.execute('SELECT * FROM user_table WHERE email = %s', (user['email'],))
        account = cursor.fetchone()
        if account:
            return jsonify({"status": "User already exists"})

        # Get the current registration date and time
        registration_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Insert the new user into the database
        cursor.execute(f"INSERT INTO user_table (username, email, password, role, registration_date,last_login_date,image) VALUES('{user['username']}', '{user['email']}', '{user['password']}', 'Student', '{registration_date}','{registration_date}', '{user['image']}')")
        conn.commit()
        cursor.close()
        return jsonify({"status": "success"})

@app.route('/educators')
@cross_origin()
def get_educators():
    cursor = conn.cursor()
    #Getting list of educators from the database
    cursor.execute("select u.user_id,u.username,u.email,e.subjects,u.image from educator_table as e join user_table as u on e.username = u.username")
    educators_list = cursor.fetchall()
    educators = []
    if not educators_list:
        return jsonify({"status":"None"})
    for e in educators_list:
        educator = {}
        educator['user_id'] = e[0]
        educator['username'] = e[1]
        educator['email'] = e[2]
        educator['subjects'] = e[3]
        educator['image'] = e[4]
        educators.append(educator)
    
    cursor.close()
    return jsonify(educators)

@app.route('/quiz')
@cross_origin()
def get_quiz():
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM quiz_table")
        quiz_list = cursor.fetchall()
        quiz = []
        if not quiz_list:
            return jsonify({'error': 'Quiz not found'})
        for q in quiz_list:
            que = {}
            que['quiz_id'] = q[0]
            que['course_id'] = q[1]
            que['quiz_title'] = q[2]
            que['description'] = q[3]
            quiz.append(que)

        cursor.close()
        return jsonify(quiz)

@app.route('/quiz/<int:quiz_id>')
@cross_origin()
def get_quizzes(quiz_id):
        cursor = conn.cursor()
        cursor.execute(f"select ques.question_id,quiz.quiz_id,quiz.course_id,quiz.quiz_title,ques.question_text,ques.question_options,ques.correct_answer from quiz_table as quiz join question_table as ques on quiz.quiz_id = cast(ques.quiz_id as integer) where quiz.quiz_id = {quiz_id}")
        quiz_list = cursor.fetchall()
        quiz = []
        if not quiz_list:
            return jsonify({'error': 'Quiz not found'})
        
        for q in quiz_list:
            que = {}
            que['question_id'] = q[0]
            que['quiz_id'] = q[1]
            que['course_id'] = q[2]
            que['quiz_title'] = q[3]
            que['question_text'] = q[4]
            que['question_options'] = q[5]
            que['correct_answer'] = q[6]
            quiz.append(que)
        
        cursor.close()
        return jsonify(quiz)

@app.route('/courses', methods=["GET"])
@cross_origin()
def get_courses():
    if request.method == "GET":
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM courses')
        courses = cursor.fetchall()
        cursor.close()
        response = [{"course_id": course[0],
                     "course_name": course[1],
                     "course_description": course[2],
                     "instructor_id": course[3],
                     "course_duration": course[4],
                     "enrollment_fees": course[5],
                     "creation_date": course[6].strftime('%Y-%m-%d %H:%M:%S')}
                    for course in courses]
        return jsonify(response)

@app.route('/courses', methods=["POST"])
@cross_origin()
def add_course():
    if request.method == "POST":
        course = request.get_json()
        cursor = conn.cursor()

        # Insert the new course into the database
        cursor.execute('INSERT INTO courses (course_name, course_description, instructor_id, course_duration, enrollment_fees, creation_date) VALUES(%s, %s, %s, %s, %s, %s);',
                       (course['course_name'], course['course_description'], course['instructor_id'], course['course_duration'], course['enrollment_fees'], datetime.now()))
        conn.commit()
        cursor.close()
        return jsonify({"status": "success"})

@app.route('/courses/<int:course_id>', methods=["PUT", "DELETE"])
@cross_origin()
def update_or_delete_course(course_id):
    if request.method == "PUT":
        course = request.get_json()
        cursor = conn.cursor()

        # Update the course in the database
        cursor.execute('UPDATE courses SET course_name = %s, course_description = %s, instructor_id = %s, course_duration = %s, enrollment_fees = %s WHERE course_id = %s;',
                       (course['course_name'], course['course_description'], course['instructor_id'], course['course_duration'], course['enrollment_fees'], course_id))
        conn.commit()
        cursor.close()
        return jsonify({"status": "success"})

    elif request.method == "DELETE":
        cursor = conn.cursor()
        cursor.execute('DELETE FROM courses WHERE course_id = %s;', (course_id,))
        conn.commit()
        cursor.close()
        return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True)