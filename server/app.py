import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import cross_origin
import psycopg2
import jwt
from functools import wraps
from datetime import datetime,timedelta

app = Flask(__name__)
load_dotenv()

# PostgreSQL connection parameters
def connection():
    conn = psycopg2.connect(
        host= os.getenv('HOST'),
        database= os.getenv('DATABASE'),
        user= os.getenv('USER'),
        password= os.getenv('PASSWORD')
    )
    return conn

def authorization(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        token = request.args.get('apikey')
        # token = token.split(' ')
        if not token:
            return jsonify({"status":"token is missing"})
        try:
            data = jwt.decode(token, os.getenv('SECRET_KEY'),algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"status":"Token has expired"})
        except jwt.InvalidTokenError as e:
            return jsonify("Invalid token:", e)
        except Exception as e:
            return jsonify("Unexpected error:", e)

        
        return f(*args,**kwargs)
    return decorated

@app.route('/login', methods=["POST"])
@cross_origin(origins='*')
def login():
    conn = connection()
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

            token = jwt.encode({
            'public_id': account[0],
            'username':account[1],
            'email': account[2],
            'image':account[7],
            'exp' : datetime.utcnow() + timedelta(minutes = 30)}, os.getenv('SECRET_KEY'))

            response = {'API_Key':token }
        else:
            response = {"status": "Invalid username or password"}

        cursor.close()
        conn.close()
        return jsonify(response)


@app.route('/register', methods=["POST"])
@cross_origin(origins='*')
def signup():
    conn = connection()
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
        conn.close()
        return jsonify({"status": "success"})

@app.route('/user')
@authorization
@cross_origin(origins='*')
def user():
    return "user"

@app.route('/educators',methods=["GET","POST","PUT","DELETE"])
@authorization
@cross_origin(origins='*')
def educators():
    conn = connection()
    if request.method == "GET":
        cursor = conn.cursor()
        #Getting list of educators from the database
        cursor.execute("select u.user_id,u.username,u.email,e.subjects,u.image from educator_table as e join user_table as u on e.username = u.username where u.role = 'teacher'")
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
        conn.close()
        return jsonify(educators)
    
    if request.method == "POST":
        educator = request.get_json()
        cursor = conn.cursor()
        
        # Check if the educator already exists
        cursor.execute(f"SELECT * FROM user_table WHERE username = '{educator['username']}'")
        existing_educator = cursor.fetchone()
        if existing_educator:
            cursor.execute(f"UPDATE user_table SET role = 'teacher' WHERE username = '{educator['username']}'")
            # Insert the new educator into the database
            cursor.execute(f"INSERT INTO educator_table (username, subjects) VALUES ('{educator['username']}', ARRAY{educator['subjects']})")
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"status": "Inserted"})
        
        return jsonify({"status": "User not Found"})
    
    if request.method == "PUT":
        educator = request.get_json()
        cursor = conn.cursor()
        
        # Update educator's subjects
        cursor.execute(f"UPDATE educator_table SET subjects = ARRAY {educator['subjects']} WHERE username = '{educator['username']}'")
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "Updated"})
    
    if request.method == "DELETE":
        educator_username = request.args.get('username')
        cursor = conn.cursor()
        # Delete the educator from both user_table and educator_table
        cursor.execute(f"DELETE FROM user_table WHERE username = '{educator_username}'")
        cursor.execute(f"DELETE FROM educator_table WHERE username = '{educator_username}'")
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "Deleted"})


@app.route('/quiz',methods=["GET","POST","PUT","DELETE"])
@authorization
@cross_origin(origins='*')
def quiz():
        conn = connection()
        if request.method == "GET":
            cursor = conn.cursor()
            # Getting the quiz from the database 
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
                que['quiz_description'] = q[3]
                quiz.append(que)

            cursor.close()
            conn.close()
            return jsonify(quiz)
        
        if request.method == "POST":
            quiz = request.get_json()
            cursor = conn.cursor()
            # Adding the quiz in database 
            cursor.execute(f"INSERT INTO quiz_table (course_id,quiz_title,quiz_description) VALUES ('{quiz['course_id']}','{quiz['quiz_title']}','{quiz['quiz_description']}')")
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"status":"Inserted"})
        
        if request.method == "PUT":
            quiz = request.get_json()
            cursor = conn.cursor()
            # Update the quiz in the database
            cursor.execute(f"UPDATE quiz_table SET quiz_id = '{quiz['quiz_id']}', course_id = '{quiz['course_id']}', quiz_title = '{quiz['quiz_title']}', quiz_description = '{quiz['quiz_description']}' WHERE quiz_id = '{quiz['old_quiz_id']}'")
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"status":"Updated"})
        
        if request.method == "DELETE":
            quiz_id = request.args.get('quiz_id')
            cursor = conn.cursor()
            cursor.execute(f"DELETE FROM question_table WHERE quiz_id = {quiz_id}")
            conn.commit()
            # Delete the quiz in database
            cursor.execute(f"DELETE FROM quiz_table WHERE quiz_id = {quiz_id}")
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"status":"Deleted"})


@app.route('/quiz/<int:quiz_id>', methods=["GET","POST","PUT","DELETE"])
@authorization
@cross_origin(origins='*')
def update_quiz(quiz_id):
    conn = connection()
    if request.method == "GET":
        cursor = conn.cursor()
        cursor.execute(f"select ques.question_id,quiz.quiz_id,quiz.course_id,quiz.quiz_title,ques.question_text,ques.question_options,ques.correct_answer from quiz_table as quiz join question_table as ques on quiz.quiz_id = cast(ques.quiz_id as integer) where quiz.quiz_id = {quiz_id}")
        quiz_list = cursor.fetchall()
        quiz = []
        if not quiz_list:
            return jsonify({'error': 'No questions added'})
        
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
        conn.close()
        return jsonify(quiz)
    
    if request.method == "POST":
        ques = request.get_json()
        cursor = conn.cursor()
        # Update the quiz in the database
        cursor.execute(f"INSERT INTO question_table (quiz_id,question_text,question_options,correct_answer) VALUES({quiz_id},'{ques['question_text']}', ARRAY {ques['question_options']}, '{ques['correct_answer']}')")
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status":"Inserted"})
    
    if request.method == "PUT":
        ques = request.get_json()
        cursor = conn.cursor()
        # Update the quiz in the database
        cursor.execute(f"UPDATE question_table SET quiz_id = {ques['quiz_id']},question_text = '{ques['question_text']}',question_options = ARRAY {ques['question_options']}, correct_answer = '{ques['correct_answer']}' WHERE question_id = {ques['question_id']}")
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status":"Updated"})
    
    if request.method == "DELETE":
        ques_id = request.args.get('question_id')
        cursor = conn.cursor()
        # Update the quiz in the database
        cursor.execute(f"DELETE FROM question_table WHERE question_id = {ques_id}")
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status":"Deleted"})



@app.route('/courses', methods=["GET","POST"])
@authorization
@cross_origin(origins='*')
def courses():
    conn = connection()
    if request.method == "GET":
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM course_table')
        courses = cursor.fetchall()
        cursor.close()
        conn.close()
        response = [{"course_id": course[0],
                     "course_name": course[1],
                     "course_description": course[2],
                     "instructor_id": course[3],
                     "course_duration": course[4],
                     "enrollment_fees": course[5],
                     "creation_date": course[6].strftime('%Y-%m-%d %H:%M:%S')}
                    for course in courses]
        return jsonify(response)
    
    if request.method == "POST":
        course = request.get_json()
        cursor = conn.cursor()

        # Insert the new course into the database
        cursor.execute('INSERT INTO course_table (course_name, course_description, user_id, course_duration, enrollment_fee, creation_date) VALUES(%s, %s, %s, %s, %s, %s);',
                       (course['course_name'], course['course_description'], course['user_id'], course['course_duration'], course['enrollment_fee'], datetime.now()))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "Inserted"})


@app.route('/courses/<int:course_id>', methods=["PUT", "DELETE"])
@authorization
@cross_origin(origins='*')
def update_or_delete_course(course_id):
    conn = connection()
    if request.method == "PUT":
        course = request.get_json()
        cursor = conn.cursor()

        # Update the course in the database
        cursor.execute('UPDATE course_table SET course_name = %s, course_description = %s, instructor_id = %s, course_duration = %s, enrollment_fees = %s WHERE course_id = %s;',
                       (course['course_name'], course['course_description'], course['instructor_id'], course['course_duration'], course['enrollment_fees'], course_id))
        conn.commit()
        cursor.close()
        return jsonify({"status": "Updated"})

    if request.method == "DELETE":
        cursor = conn.cursor()
        cursor.execute('DELETE FROM course_table WHERE course_id = %s;', (course_id))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "Deleted"})


@app.route('/lessons', methods=["POST"])
@authorization
@cross_origin(origins='*')
def add_lesson():
    conn = connection()
    if request.method == "POST":
        lesson = request.get_json()
        cursor = conn.cursor()

        # Insert the new lesson into the database
        cursor.execute('INSERT INTO lesson_table (course_id, lesson_title, lesson_content, order, ) VALUES(%s, %s, %s, %s, %s, %s);',
                       (lesson['course_id'], lesson['lesson_title'], lesson['lesson_content'],lesson['order'], datetime.now()))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "success"})

@app.route('/lessons/<int:lesson_id>', methods=["PUT", "DELETE"])
@authorization
@cross_origin(origins='*')
def update_or_delete_lesson(lesson_id):
    conn = connection()
    if request.method == "PUT":
        lesson = request.get_json()
        cursor = conn.cursor()

        # Update the lesson in the database
        cursor.execute('UPDATE lesson_table SET course_id = %s, lesson_title = %s, lesson_content = %s, order = %s WHERE lesson_id = %s;',
                       (lesson['course_id'], lesson['lesson_title'], lesson['lesson_content'], lesson['order'], lesson_id))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "success"})

    elif request.method == "DELETE":
        cursor = conn.cursor()
        cursor.execute('DELETE FROM lesson_table WHERE lesson_id = %s;', (lesson_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=5000)