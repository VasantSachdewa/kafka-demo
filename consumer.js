import { Kafka } from 'kafkajs';
import { kafkaHost, topicName, groupId } from './config.js';

export const getConsumer = async (
	host = kafkaHost,
	topic = topicName,
	group = groupId
) => {
	const kafka = new Kafka({ brokers: [host] });
	const consumer = kafka.consumer({ groupId: groupId });
	await consumer.connect();
	await consumer.subscribe({
		topic: topic,
		fromBeginning:true
	});

	return consumer
} 

export const processMessage = async (func = console.log) => {
	const consumer = await getConsumer();
	await consumer.run({
		eachMessage: async({ topic, partition, message }) => {{
			func(message.value.toString());
		}}
	})
};

processMessage();