source ./settings.conf

echo "Init imagen..."
aws ecr get-login-password --region $REGION --profile $PROFILE | docker login --username $AWS_DOCKER_USER --password-stdin $AWS_DOCKER_PASS
docker build -t zoo-app $PATH_DOCKER_FILE
docker tag zoo-app:latest $AWS_IMAGE
docker push $AWS_IMAGE
kubectl create -f ./deployment.yaml 
kubectl expose deployment zoo-app --port=3000
echo "success --host=zoo"
