  # gists-app-http-docker

# Table of Contents


1. [What is gists-app-http-docker ❓](#what-is-gists-app-http-docker-)
2. [Project setup 💼](#project-setup-)
3. [Building the Docker Image 🐋](#Building the Docker Image-)
4. [Running docker Image on Kubernetes/Minikube🎽](#running-docker-image-)
5. [STOPPING and REMOVING (all components) 🛑](#stopping-docker-docker-container-)



## What is gists-app-http-docker ❓

It is a demo project to demonstrate using a docker container running in docker to run an application that returns a gitlab users gists on first query, follow on queries then return the users new gists since the previous call.

- It 🏃runs a server (docker) using `nodejs` [v16] 
- Exposes following  RESTFUL endpoints ( no database required) with all Read operations

|**Rest API** call          | **CRUD** operation | REST endpoints|
|:----:                 |:----:           |:----:|
|**GET**                | **R**ead        | `http://192.168.49.2:30303/` <br /> `http://http://192.168.49.2:30303/api/gists/<user>`  <br /> `http://http://192.168.49.2:30303/api/gists/<user>?since=<timestamp>`|
 
 - You may get 2 types of **response**
 
  |Response `Code`  | Response `Status` |
  |:---------------:|:-----------------:|
  |     **200**     |       `OK`        |
  |     **404**     |    `Not Found`    |
  

## Project setup 💼

Exand the zip file to your machine 

```shell
git clone git@github.com:paulw99/gists-app-http-docker.git
cd gists-app-http-docker
```

💡 Prequisite / Assumption
- You have must have `docker` and `minikube` installed and running on your machine.


## Building the Docker Image 🐋

```
docker build . -t gists-app-http-docker
docker images
REPOSITORY                    TAG       IMAGE ID       CREATED       SIZE
gists-app-http-docker         latest    61c0d15d6395   2 hours ago   871MB
```

### Running the container in Minikube 🖼️

After `docker build` is completed, start the container in minikube

run `kubectl apply -f ./kubectl-deploy.yml`

### Access the application 🖼️
run `minikube service gists-service`
- This should start the app in the browser, alternativelty copy the URL and enter in the browser manually.
`http://192.168.49.2:30303`

## STOPPING and REMOVING (all components) 🛑

Stop using 👉 
  ```shell
   kubectl delete -f ./kubectl-deploy.yml
   docker image remove gists-app-http-docker