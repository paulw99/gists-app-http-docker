eval $(minikube -p minikube docker-env)

kubectl delete -f ./kubectl-deploy.yml

docker build . -t gists-app-http-docker

kubectl apply -f ./kubectl-deploy.yml

sleep 10

minikube service gists-service

#sleep 300
#kubectl delete -f ./kubectl-deploy.yml