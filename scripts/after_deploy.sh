#!/bin/bash
REPOSITORY=/home/ubuntu/build/Storeasy-server
cd $REPOSITORY

cp /home/ubuntu/Storeasy-server/.production.env .

sudo docker run -d -p 3000:3000 --name storeasy .