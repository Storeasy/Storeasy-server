#!/bin/bash
REPOSITORY=/home/ubuntu/Storeasy-server
cd $REPOSITORY

sudo docker build -t storeasy .
sudo docker run -d -p 3000:3000 --name storeasy storeasy