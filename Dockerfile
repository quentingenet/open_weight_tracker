FROM python:3.12-alpine

RUN apk update && \
    apk add --no-cache bash tzdata

COPY open_weight_tracker /open_weight_tracker

WORKDIR /open_weight_tracker/owt_back

RUN python -m venv venv && \
    venv/bin/pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD /bin/bash -c "venv/bin/python src/manage.py migrate && venv/bin/python src/manage.py runserver"
