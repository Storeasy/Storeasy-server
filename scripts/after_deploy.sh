#!/bin/bash
REPOSITORY=/home/ubuntu/Storeasy-server
cd $REPOSITORY

sudo docker stop storeasy
sudo docker rm storeasy

sudo docker run -d -p 3000:3000 --name storeasy .