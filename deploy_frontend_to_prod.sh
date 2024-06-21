
# WIP not tested


# add in build process ! using package-prod.json

cd ./frontend
echo 'front end build complete'


npm run build
echo 'npm build completed'

# move build to nginx hosting folder
sudo cp -rf /home/truejambles/Projects/michaels-chalet-website/frontend/build/* /var/www/michaels-chalet/
echo 'copied build folder to nginx production folder'

# restart nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
echo 'restarted nginx'

# might want to echo the following for status check
sudo systemctl status nginx
echo