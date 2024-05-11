FROM python:3.12-alpine

RUN apk update && \
    apk add --no-cache bash tzdata

COPY owt_back /owt_back

WORKDIR /owt_back

RUN python -m venv venv && \
    venv/bin/pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD /bin/bash -c "venv/bin/python src/manage.py migrate && venv/bin/gunicorn -b 0.0.0.0:8000 src.owt_back_end.wsgi:application"



