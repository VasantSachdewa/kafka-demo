import { Kafka } from 'kafkajs';
import { kafkaHost, topicName } from './config.js';

export const getKafkaProducer = async ( host = kafkaHost ) => {
	const producer = new Kafka({ brokers: [host] }).producer();
	await producer.connect();
	return producer;
}

export const dropKafkaMessage = async (message, topic = topicName) => {
	try {
		const producer = await getKafkaProducer();
		const resp = await producer.send({ 
			topic: topic,
			messages: [{ value: JSON.stringify(message) }]
		});
		console.log(`Successfully dropped message into Kafka with resp: ${JSON.stringify(resp)}`);
		return resp;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
