sudo docker build -t dashboard-ui .
sudo docker run -p 6100:6100 --name dashboard-ui -d dashboard-ui
