/**
 * Filename: bot.js
 * Description: Simulates web traffic by making automated HTTP requests based on configurable parameters.
 * Copyright © 2024 Max Brückner
 * License: MIT
 */

/* Required dependencies for HTTP requests and cookie support */
const axios = require('axios').default;
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const fs = require('fs');
const path = require('path');
const util = require('util');

/* Load the configuration file */
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

/**
 * Creates and returns a new axios client with cookie support.
 * @returns {AxiosInstance} A new axios client instance.
 */
const createSession = () => {
	const jar = new CookieJar();
	const client = wrapper(axios.create({ jar }));
	return client;
};

/**
 * Logs detailed error information to a file. This function converts an error object into a string
 * that retains much of the structure and details of the original object, making it ideal for logging purposes.
 * The log includes a timestamp and the detailed error information.
 * @param {Error} error - The error object to log. This object is stringified with all its properties and nested objects.
 */
const logErrorToFile = (error) => {
	const logFilePath = path.join(__dirname, 'error.log');
	const timestamp = new Date().toISOString();
	const errorDetails = util.inspect(error, { depth: null });
	const logMessage = `${timestamp} - ${errorDetails}\n\n`;

	fs.appendFile(logFilePath, logMessage, (err) => {
		if (err) {
			console.error('Failed to write to log file:', err);
		}
	});
};

/**
 * Sends an HTTP request using a specified axios client based on the provided request configuration.
 * This function supports sending both GET and POST requests, including data payload for POST requests.
 * @param {AxiosInstance} client - The axios client to use for the request.
 * @param {Object} requestConfig - The configuration object for the request, which includes:
 *  							 - method: The HTTP method to use ('GET', 'POST', etc.).
 *  							 - url: The URL to send the request to.
 *  							 - data: (Optional) The data payload for POST requests.
 */
const sendRequest = async (client, requestConfig) => {
	const { method, url, data } = requestConfig;
	const userAgent = config.userAgents[Math.floor(Math.random() * config.userAgents.length)];
	const headers = {
		'User-Agent': userAgent,
	};
	const startTime = new Date();

	try {
		const response = await client({
			method: method,
			url: url,
			data: method === 'POST' ? data : {},
			headers: headers,
		});
		const endTime = new Date();
		const responseTime = endTime - startTime;
		console.log(`[${startTime.toISOString()}] ${method} request to ${url}: ${response.status} | Response Time: ${responseTime}ms | User-Agent: ${userAgent}`);
	} catch (error) {
		const errorMessage = `Error in ${method} request to ${url}: ${error.message}`;
		console.error(errorMessage);
		logErrorToFile(error);
	}
};

/**
 * Returns a promise that resolves after a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>} A promise that resolves after the config.delay.
 */
const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Main function to execute the logic.
 */
const main = async () => {
	const sessions = Array.from({ length: config.numberOfSessions }, createSession);

	for (let i = 0; i < config.numberOfRequests; i++) {
		const requestConfigs = config.requests[Math.floor(Math.random() * config.requests.length)];
		const requestsToMake = Math.random() < config.additionalRequestsProbability
			? Math.floor(Math.random() * config.parallelRequests + 1)
			: 1;

		const requests = Array.from({ length: requestsToMake }, () => {
			const randomSessionIndex = Math.floor(Math.random() * sessions.length);
			return sendRequest(sessions[randomSessionIndex], requestConfigs);
		});

		await Promise.all(requests);
		await timeout(config.delay);
	}
};

main();
