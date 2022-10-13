# Setup

The script was built using Node `v14.20.0`. To run locally you need to have `npm` installed and then run the following commands:

```
npm install

npm start
```

These commands will first install any missing dependencies that are not present in the `node_modules` folder and then run the script.

---

Run the service locally using **Docker**, using the available `Dockerfile`.

```
local_port=8080
container_port=8080
docker_tag=relay:latest

docker build . -t $docker_tag

docker run -p $local_port:$container_port -t $docker_tag
```

## Deploying to Cloud Run

Deploying to Cloud Run is as easy as executing some commands and triggering the container push using the `gcloud run` command (this requires the Google Cloud SDK to be installed on your machine). Otherwise, you need to trigger the push manually on [Cloud Run plaform](https://console.cloud.google.com/run/create?project=)

```
# Only run this if this is the first time running cloud run on your GCP account

gcloud services enable containerregistry.googleapis.com
gcloud auth configure-docker

# Tag container image and push it to Google Cloud Registry

docker_tag=relay:latest
gcp_project_id=relay-cloud-run
gcp_container_tag=relay:latest
gcp_cloud_run_name=relay

docker tag $docker_tag gcr.io/$gcp_project_id/$gcp_container_tag

docker push gcr.io/$gcp_project_id/$gcp_container_tag

# Deploy (start) container using gcloud

gcloud run deploy $gcp_cloud_run_name --image gcr.io/$gcp_project_id/$gcp_container_tag 
```