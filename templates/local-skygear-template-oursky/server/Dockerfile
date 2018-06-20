FROM quay.io/skygeario/py-skygear:v1.5.0
COPY requirements.txt /usr/src/app/
RUN pip install --upgrade --force-reinstall -r requirements.txt
COPY alembic.ini /usr/src/app/
COPY alembic /usr/src/app/alembic/
COPY helloworld /usr/src/app/helloworld/
CMD ["py-skygear", "helloworld"]
