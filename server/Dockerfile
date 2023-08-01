FROM python:3-alpine3.15

WORKDIR '/app'

COPY . .
WORKDIR '/app/server'

RUN pip install -r requirements.txt
EXPOSE 5000

CMD python ./app.py
