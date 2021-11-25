#!/bin/bash
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

sudo docker stop storeasy
sudo docker rm storeasy