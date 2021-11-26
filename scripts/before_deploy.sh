#!/bin/bash
REPOSITORY=/home/ubuntu/Storeasy-server
cd $REPOSITORY

sudo docker stop storeasy
sudo docker rm storeasy

sudo docker rmi storeasy

sudo rm -rf dist