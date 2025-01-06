export interface Step {
  question?: string;
  options: {
    label: string;
    nextStepId?: number;
    link?: string;
    onSelect?: string;
    onCrawl?: string;
  }[];
}

const firstStep = 0;
const sendRequestStep = 7;
const closeChatStep = 8;
const askAgainStep = 1;

export const steps: Step[] = [
  {
    question: "How can I help you?",
    options: [
      { label: "Device Overview and Features", nextStepId: 2 },
      { label: "Parts of the Device", nextStepId: 3 },
      { label: "Setting up the Device", nextStepId: 4 },
      { label: "Using the Device", nextStepId: 5 },
    ],
  },
  {
    question: "Is there anything else I can assist you with?",
    options: [
      {
        label: "Yes, I'd like to chat with a Solinas Customer Service Agent",
        nextStepId: sendRequestStep,
        onSelect: "sendRequest",
      },
      {
        label: "Yes, I have another question",
        nextStepId: firstStep,
      },
      {
        label: "No thank you, this was helpful",
        onSelect: "closeChat",
        nextStepId: closeChatStep,
      },
    ],
  },
  {
    // Step 2: Device Overview and Features
    question: "Which part of the overview would you like more information on?",
    options: [
      {
        label: "Sonicfinder 1000 Description",
        link: "#cl1",
        nextStepId: askAgainStep,
      },
      {
        label: "Sonicfinder 1000 Parts",
        link: "#cl2",
        nextStepId: askAgainStep,
      },
      { label: "Device Setup", link: "#cl3", nextStepId: askAgainStep },
      { label: "Device Usage", link: "#cl4", nextStepId: askAgainStep },
    ],
  },
  {
    // Step 3: Parts of the Device
    question:
      "Which part of the Sonicfinder device are you having trouble with?",
    options: [
      {
        label: "SF1000 Display Unit",
        link: "#sf-display",
        onCrawl: "desc",
        nextStepId: askAgainStep,
      },
      {
        label: "SF1000 Sensor Unit",
        link: "#sf-sensor",
        onCrawl: "desc",
        nextStepId: askAgainStep,
      },
      {
        label: "RF Antenna",
        link: "#sf-antenna",
        onCrawl: "desc",
        nextStepId: askAgainStep,
      },
      {
        label: "Screw-in Spike",
        link: "#sf-spike",
        onCrawl: "desc",
        nextStepId: askAgainStep,
      },
      {
        label: "Battery",
        link: "#sf-battery",
        onCrawl: "desc",
        nextStepId: askAgainStep,
      },
      {
        label: "Charging Unit",
        link: "#sf-charger",
        onCrawl: "desc",
        nextStepId: askAgainStep,
      },
      {
        label: "Charging Cable",
        link: "#sf-wire",
        onCrawl: "desc",
        nextStepId: askAgainStep,
      },
    ],
  },
  {
    // Step 4: Setting up the Device
    question: "What part of the setup process do you need help with?",
    options: [
      {
        label: "Pairing SF1000 and SF1001",
        link: "#pairing",
        onCrawl: "setup",
        nextStepId: askAgainStep,
      },
      {
        label: "Attaching Ground Spikes",
        link: "#attaching-spikes",
        onCrawl: "setup",
        nextStepId: askAgainStep,
      },
      {
        label: "Setting Time Zone",
        link: "#time-zone",
        onCrawl: "setup",
        nextStepId: askAgainStep,
      },
      {
        label: "Setting IR Threshold",
        link: "#ir-threshold",
        onCrawl: "setup",
        nextStepId: askAgainStep,
      },
    ],
  },
  {
    // Step 5: Using the Device
    question: "Which part of using the device would you like help with?",
    options: [
      {
        label: "Setting up the SF1001 Sensor",
        link: "#setup-sf1001",
        nextStepId: askAgainStep,
      },
      {
        label: "Switching Operating Modes",
        link: "#modes",
        nextStepId: askAgainStep,
      },
      {
        label: "Taking Measurements",
        link: "#measurements",
        nextStepId: askAgainStep,
      },
      {
        label: "Pipe Location Process",
        link: "#location-process",
        nextStepId: askAgainStep,
      },
      { label: "Setting Gain", link: "#gain", nextStepId: askAgainStep },
      {
        label: "Setting Frequency",
        link: "#frequency",
        nextStepId: askAgainStep,
      },
      {
        label: "Sample Averaging",
        link: "#averaging",
        nextStepId: askAgainStep,
      },
      {
        label: "Understanding Status Icons",
        link: "#icons",
        nextStepId: askAgainStep,
      },
      {
        label: "SF1000 Keypad & LEDs",
        link: "#sf1000-keypad",
        nextStepId: askAgainStep,
      },
      {
        label: "SF10001 Keypad & LEDs",
        link: "#sf1001-keypad",
        nextStepId: askAgainStep,
      },
    ],
  },
  {
    // Step 6: Send chat request?
    question: "Would you like to speak to a live agent?",
    options: [
      {
        label: "Yes, send a chat request",
        nextStepId: sendRequestStep,
        onSelect: "sendRequest",
      },
      {
        label: "No thank you, this was helpful",
        onSelect: "closeChat",
        nextStepId: closeChatStep,
      },
    ],
  },
  {
    options: [
      {
        label: "Return to Operator Support",
        link: "#noSend",
        onSelect: "back",
      },
    ],
  },
  {
    options: [
      {
        label: "Start another chat",
        link: "#noSend",
        onSelect: "startChat",
      },
    ],
  },
];
