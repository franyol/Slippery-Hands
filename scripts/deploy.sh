gcloud config set project slipperyhands

#docker build -t gcr.io/slipperyhands/slipperyhands .

#docker push gcr.io/slipperyhands/slipperyhands

gcloud run deploy slipperyhands \
    --source . \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated
