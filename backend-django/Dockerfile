FROM python:3-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /app/backend
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN apk del build-deps
COPY . ./
EXPOSE 8000