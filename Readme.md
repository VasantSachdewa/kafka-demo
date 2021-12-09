To run this demo, follow the below steps:

- Run npm install

- Run kafka cluster on local using the following command
` docker compose up `
WARNING: Make sure zookeeper and kafka containers are running

- Start ingestion server by running the following command
` node index.js `

- Open new tab and start consumer by running the following command
` node consumer.js `

- Run the following command to drop message into kafka topic

curl --location --request POST 'localhost:3000/ingest' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "yo"
}' 

- You should see the message dropped into Kafka and also printed by the consumer