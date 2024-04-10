# WebTrafficSimulator

Simulate web traffic with customizable, realistic patterns using WebTrafficSimulator, a Node.js tool designed for developers and QA engineers to test the performance and load handling of web applications.

## Features

- **Customizable Traffic Patterns**: Easily adjust the volume, frequency, and type of traffic to simulate real-world web activity.
- **Dynamic User-Agent Simulation**: Mimic requests from various browsers to test cross-browser compatibility and performance.
- **Cookie Support**: Maintain session continuity across requests, providing a more accurate simulation of user behavior.
- **Parallel Request Handling**: Test your application's concurrency capabilities by simulating multiple users accessing it simultaneously.
- **Configurable via JSON**: Use the `config.json` file to tweak your testing parameters without touching the code.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/WebTrafficSimulator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd WebTrafficSimulator
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

### Configuration

Edit the `config.json` file to set your target URLs, desired user-agent strings, number of requests, and other parameters. Here's an example configuration:

### Configuration Details

Here's a closer look at the configuration options for the WebTrafficSimulator, with comments to guide your customization:

- **`userAgents`**: This array contains user-agent strings that mimic different browsers. The simulator selects from these strings at random for each request, simulating traffic from various browsers and devices, such as Chrome, Safari, and Firefox. This diversity helps test your application's compatibility and performance across a broad user base.

- **`urls`**: A list of target URLs to which the simulator will send HTTP requests. These URLs should point to the specific endpoints or pages within your web application you wish to test. By randomly selecting from this list for each request, the simulator can mimic user interactions with different parts of your application, providing a comprehensive load and performance test.

- **`numberOfSessions`**: Specifies the total number of sessions the simulator will create. Each session is independent, with its own set of cookies, mirroring the behavior of multiple unique users accessing your application. This setting is crucial for testing how well your application manages user sessions under load.

- **`numberOfRequests`**: The total number of HTTP requests that the simulator will attempt to send. This figure gives you control over the extent of the load test, allowing you to simulate both light and heavy traffic scenarios to see how your application responds.

- **`delay`**: Defines the delay (in milliseconds) between each request. This delay is vital for simulating more realistic user behavior, as it prevents all requests from being sent simultaneously and can help avoid inadvertently overwhelming your server.

- **`parallelRequests`**: The maximum number of requests that can be sent in parallel during a single simulation cycle. A random number between 1 and this value is calculated for each cycle, determining how many requests will be sent concurrently. This setting helps simulate the unpredictable nature of web traffic, where the number of users accessing the application simultaneously can vary widely.

- **`additionalRequestsProbability`**: A probability factor that influences whether the simulator will send multiple parallel requests. This value, ranging from 0 to 1, dictates the likelihood of sending more than one request at a time, further adding to the randomness and realism of the simulation.

By adjusting these settings in the `config.json` file, you can tailor the simulation to meet your specific testing needs, whether you're looking to evaluate the performance under typical traffic conditions, identify bottlenecks, or understand how your application behaves under extreme load.

### Running the Simulator

Execute the script with Node.js:

```bash
node bot.js
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
