chmod 600 deploy-key
mv deploy-key ~/.ssh/id_rsa
git remote add deploy ssh://root@138.68.147.114/var/git/frontend.git
git push deploy