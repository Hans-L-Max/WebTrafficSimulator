# Web Traffic Simulator

Welcome to `WebTrafficSimulator`, a streamlined tool designed for developers and QA engineers focused on evaluating web application performance and load capacity. It simplifies the simulation of web traffic by allowing both GET and POST requests, equipped with cookie support for maintaining session continuity. Whether you're testing a new feature or assessing your application's resilience under heavy load, `WebTrafficSimulator` offers the essential functionality to get the job done.

## Key Features

- **Flexible Request Handling**: Easily configure GET and POST requests to mimic real user interactions.
- **Cookie Support**: Session continuity is key for realistic traffic simulation, and cookie support is fully integrated.
- **Error Logging**: Encounter an issue? Detailed error logs provide the insights needed for quick resolution.
- **Customizable Testing**: Adjust your testing parameters directly in `config.json` for tailored simulation scenarios.

## Getting Started

1. **Preparation**: Ensure Node.js is installed on your system.
2. **Download**: Clone this repository and navigate to the project folder.
3. **Dependency Installation**: Run `npm install` to set up.
4. **Configure**: Edit `config.json` to define your testing parameters.
5. **Execute**: Start the simulation with `node bot.js`.

## Dependencies

- `axios` for making HTTP requests.
- `axios-cookiejar-support` and `tough-cookie` for cookie support.
- `fs` and `path` for file system operations.
- `util` for detailed error logging.

## Configuration (`config.json`)

Define your testing parameters:

- **`userAgents`**: List of user-agent strings to simulate different browsers.
- **`requests`**: Array of request configurations, including method (`GET`, `POST`), URL, and optional data payload for POST requests.
- **`numberOfSessions`**: Total number of simulated user sessions.
- **`numberOfRequests`**: Total number of requests to send.
- **`delay`**: Delay (in milliseconds) between requests.
- **`parallelRequests`**: Maximum number of requests to send in parallel.
- **`additionalRequestsProbability`**: Probability of sending more than one parallel request.

## Logging

Errors encountered during the simulation are logged in `error.log`, providing detailed information for troubleshooting. The log includes timestamps, error messages, and stack traces.

## Extending

The simulator is designed for extensibility. Additional request types and configurations can be easily added to `config.json`. The core simulation script (`bot.js`) can be modified to include new features, such as different types of authentication, custom headers, and more complex session management scenarios.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

Happy testing!
