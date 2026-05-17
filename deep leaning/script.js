/* ═══════════════════════════════════════════
   StudyOS — script.js
   ▸ Paste your notes inside the `notes` array.
   ▸ Each object follows the same schema.
   ▸ formulas support LaTeX: use \\( ... \\) inline,  \\[ ... \\] display.
═══════════════════════════════════════════ */

const notes = [
  {
    title: "1. The Perceptron (The Single Neuron)",
    summary: "A neuron takes multiple inputs, multiplies each by a specific weight, adds a base bias, and passes that sum through an activation function to get a single output.",
    points: [
      "Takes raw data and calculates a weighted decision.",
      "It is essentially a dot product math operation at its core."
    ],
    formulas: [
      "\\( \\sum (X_i \\cdot W_i) + w_0 \\)"
    ],
    facts: [
      "Lecture reference: [15:33] and [16:21]"
    ],
    examples: [
      "Low-Poly Combat: Think of your character in Slash of Sword. The Inputs (X) are your base stats, Weights (W) are weapon multipliers, and Bias (w_0) is your base level buff. The total sum is your raw attack power."
    ]
  },
  {
    title: "2. Non-Linear Activation Functions",
    summary: "A mathematical curve (like Sigmoid) that transforms the neuron's linear output into a bounded, non-linear space.",
    points: [
      "The real world is complex; linear math can only draw straight lines to separate data.",
      "Non-linearity allows the network to draw complex curves and boundaries to classify hard problems."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [18:48], [19:52], and [20:24]"
    ],
    examples: [
      "Tactical Football: A linear model is like playing foosball (straight lines). Non-linear activation functions are like handing the tactical board to Zidane or Mourinho, allowing players to make curved overlapping runs to break down a defense."
    ]
  },
  {
    title: "3. Deep Neural Networks (Hierarchical Stacking)",
    summary: "Stacking multiple layers of neurons together so the output of one layer feeds directly as the input into the next.",
    points: [
      "Builds hierarchical understanding.",
      "Layer 1 detects simple edges, Layer 2 combines edges into shapes, and Layer 3 combines shapes into complex features like faces."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [13:40], [28:10], and [30:19]"
    ],
    examples: [
      "J.A.R.V.I.S. Pipeline: Layer 1 looks at raw voltage spikes from MQ sensors. Layer 2 recognizes the pattern as Ammonia. Layer 3 correlates it with DHT11 temperature data to output 'Poultry Distress Detected'."
    ]
  },
  {
    title: "4. The Loss Function",
    summary: "A calculation of the deviation (error) between what the network predicted and what the actual ground truth is.",
    points: [
      "You cannot improve if you don't know how badly you messed up.",
      "The network uses this single number as a specific target to minimize."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [33:24] and [33:40]"
    ],
    examples: [
      "Match Analysis: It is the post-match breakdown. The Loss is the delta between your team's Expected Goals (xG) and the actual final score on the pitch."
    ]
  },
  {
    title: "5. Gradient Descent & Backpropagation",
    summary: "Gradient descent calculates the slope of the loss and steps downward to find the lowest error. Backpropagation works backward to find how much each weight contributed to that error.",
    points: [
      "This is how the network actually learns.",
      "It tweaks billions of parameters simultaneously so the next prediction is more accurate."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [38:00], [38:44], and [39:55]"
    ],
    examples: [
      "Debugging the Edge: Backpropagation is tracing a J.A.R.V.I.S. crash backward to a faulty line of code in the Pi's neural core. Gradient descent is tweaking that specific line to fix the bug."
    ]
  },
  {
    title: "6. Overfitting & Regularization",
    summary: "Overfitting happens when a model memorizes training data but fails on new data. Regularization (like Dropout and Early Stopping) artificially constrains the network.",
    points: [
      "Forces the network to find robust, generalized patterns rather than memorizing highly specific, useless noise.",
      "Dropout randomly kills 50% of the neurons during a training pass."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [48:40], [48:58], [51:28], and [53:04]"
    ],
    examples: [
      "Squad Rotation: Dropout is benching your star striker in training so the rest of the squad builds chemistry. Early Stopping is blowing the whistle on training camp before performance drops."
    ]
  },
  {
    title: "7. Recurrent Neural Networks (The Memory Loop)",
    summary: "An RNN takes an input at a specific time step and maintains an 'internal state' or memory. Predictions use both the current input and the previous hidden state.",
    points: [
      "Traditional networks treat inputs as isolated, but sequential data (audio, text) relies on the order of events.",
      "RNNs link time steps together to understand historical context."
    ],
    formulas: [
      "\\( h_t = f(h_{t-1}, x_t) \\)"
    ],
    facts: [
      "Lecture reference: [11:10] and [12:43]"
    ],
    examples: [
      "J.A.R.V.I.S. Anomaly Tracking: An isolated 10% ammonia spike means little, but an RNN's hidden state remembers it has been rising 2% every minute, triggering a severe distress alert."
    ]
  },
  {
    title: "8. Tokenization & Embeddings",
    summary: "Mapping words to numerical vectors (embeddings) in a continuous mathematical space where words with similar semantic meanings are grouped closer together.",
    points: [
      "Neural networks can only do math; they cannot read English characters.",
      "Embeddings force the network to understand the concept of a word, not just its spelling."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [26:07] and [27:53]"
    ],
    examples: [
      "Tactical Player Profiles: You don't feed 'Thierry Henry' into a simulator; you feed his numerical embedding [Pace: 94, Finishing: 92, Dribbling: 90]. Players like Mbappe end up with statistically similar vectors."
    ]
  },
  {
    title: "9. The Encoding Bottleneck & Vanishing Gradients",
    summary: "RNNs must compress past info into a single vector, causing early context to be forgotten. Backpropagation multiplies gradients repeatedly, which can shrink to zero (vanishing gradients).",
    points: [
      "This mathematical flaw causes short-term memory in RNNs.",
      "The network completely forgets data from early in a long sequence."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [33:52] and [38:51]"
    ],
    examples: [
      "Low-Poly Inventory Limit: Like having a 1-slot inventory in Slash of Sword. To pick up a shield, you drop the early healing potion. By the final boss, the early context is gone."
    ]
  },
  {
    title: "10. Transformers & Self-Attention",
    summary: "Transformers process entire sequences at once. Self-Attention creates Query, Key, and Value vectors, using the dot product of Query and Key to find attention weights.",
    points: [
      "Eliminates step-by-step recurrence, allowing parallel processing.",
      "Instantly solves the memory bottleneck by connecting any two words directly, bypassing the degrading chain."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [40:42], [42:19], [48:21], and [49:52]"
    ],
    examples: [
      "The Maestro's Vision: Prime Pirlo scans the pitch instantly. His vision (Query) locks onto the striker's run (Key). He bypasses the midfield to drop a 60-yard pass directly (Value)."
    ]
  },
  {
    title: "11. The Raw Data (Images as Matrices)",
    summary: "To a machine, an image is just a raw 2D grid of pixel intensities ranging from 0 to 255.",
    points: [
      "Before a network can learn anything visually, physical light must be translated into pure numerical format."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [04:48]"
    ],
    examples: [
      "Low-Poly Rendering: The Slash of Sword engine reads a giant matrix of 3D vertex coordinates and texture map numbers to calculate lighting, it doesn't 'see' an armored warrior."
    ]
  },
  {
    title: "12. The Convolution (Sliding the Filter)",
    summary: "The network takes a small 3x3 filter of weights and slides it step-by-step across the pixel grid, multiplying and summing to find patterns.",
    points: [
      "This is how the network preserves spatial relationships.",
      "An edge is recognized as an edge regardless of whether it is in the top-left or bottom-right."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [23:25]"
    ],
    examples: [
      "Tactical Scouting: You don't analyze all 22 players simultaneously. You slide your focus (the filter) across localized 3v3 battles to find structural patterns and defensive weaknesses."
    ]
  },
  {
    title: "Phase 1: The Goal of Generative AI",
    summary: "A shift from supervised learning (mapping data to labels) to unsupervised learning, aiming to capture the underlying probability distribution of the raw data itself.",
    points: [
      "The goal goes beyond classifying existing data.",
      "It synthesizes brand-new, realistic data points by sampling from that mathematically learned distribution."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [04:25] and [08:08]"
    ],
    examples: [
      "The Tactical Hallucination: Teaching a football scout the pure statistical essence of a striker, so they can mathematically hallucinate and generate a perfect, non-existent custom striker profile from scratch."
    ]
  },
  {
    title: "Phase 2: Autoencoders (The Compression Bottleneck)",
    summary: "An 'Encoder' neural network compresses high-dimensional raw data into a tiny, low-dimensional vector (Latent Space). A 'Decoder' then tries to perfectly reconstruct the original input.",
    points: [
      "Forcing data through a tiny mathematical bottleneck prevents the network from simply memorizing the image.",
      "The network is forced to learn only the absolute most critical, fundamental features of the data while throwing away the noise."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [12:08] and [16:44]"
    ],
    examples: [
      "J.A.R.V.I.S. Telemetry: The Encoder compresses a 4K camera feed of a poultry coop down to just 3 numbers (Temp, Bird Count, Agitation Level). The Decoder must perfectly redraw the 4K video using only those 3 numbers, forcing deep environmental understanding."
    ]
  },
  {
    title: "Phase 3: Variational Autoencoders (VAEs)",
    summary: "VAEs map inputs to a probability distribution defined by a mean and variance. To decode, a point is randomly sampled from within that distribution.",
    points: [
      "A deterministic point cannot generate anything new; it only reconstructs.",
      "Creating a continuous probability cloud allows you to sample anywhere inside it, generating infinite, slightly different variations that are still realistic."
    ],
    formulas: [
      "\\( \\mu \\)",
      "\\( \\sigma \\)"
    ],
    facts: [
      "Lecture reference: [18:18], [18:57], and [24:26]"
    ],
    examples: [
      "Low-Poly Combat Spawns: Instead of an enemy swinging a sword in exactly 1.50 seconds every time (standard autoencoder), a VAE encodes swing speed as a probability cloud. The engine samples the cloud, generating unpredictable but realistic combat timing."
    ]
  },
  {
    title: "Phase 4: Generative Adversarial Networks (GANs)",
    summary: "Pits two neural networks against each other: a 'Generator' turns random noise into realistic data, while a 'Discriminator' tries to identify which data is real and which is generated.",
    points: [
      "The Generator constantly updates its weights specifically to minimize the Discriminator's success rate.",
      "This allows the generation of hyper-realistic, complex data without needing to explicitly define rigid mathematical probability equations."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [36:11] and [41:34]"
    ],
    examples: [
      "The Training Ground Rivalry: An attacking coach (Generator) designs fake set-piece routines. A defensive manager (Discriminator) tries to spot the fake routines. Eventually, the attacking coach becomes so good that the fakes are indistinguishable from match-day tactics."
    ]
  },
  {
    title: "Phase 1: The RL Paradigm (Learning by Doing)",
    summary: "RL agents learn dynamically by physically acting in an environment. Data is generated on the fly as triplets: State, Action, and Reward.",
    points: [
      "The algorithm's sole objective is to maximize cumulative future rewards.",
      "Because unstructured environments cannot be fully hardcoded, the agent must learn optimal behaviors purely from the consequences of its own actions."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [04:07] and [04:23]"
    ],
    examples: [
      "J.A.R.V.I.S. Drone Deployment: A drone maps the optimal flight path over a coop through pure trial and error. Crashing into wire returns a negative reward, while successfully scanning a bird returns a positive reward."
    ]
  },
  {
    title: "Phase 2: Q-Learning (Value Forecasting)",
    summary: "The network learns a Q-Function that takes a State and a specific Action, outputting the expected total future return. It formulates strategy by executing the action that maximizes this Q-value.",
    points: [
      "It mathematically grounds decision-making.",
      "It calculates the long-term impact of a move to the end of the horizon, actively ignoring short-term gratification."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [13:17] and [26:00]"
    ],
    examples: [
      "The Tactical Simulation: A football manager evaluates late-game substitutions. They calculate the expected final match points (Reward) for each discrete sub option and pick the one with the highest mathematical win probability."
    ]
  },
  {
    title: "Phase 3: Policy Gradients (Continuous Control)",
    summary: "A Policy Network directly outputs a probability distribution over all possible actions for a given state. The agent samples this cloud to act, increasing probabilities of high-reward actions via gradient descent.",
    points: [
      "Solves the real-world problem where actions are rarely discrete.",
      "Policy distributions allow for infinite, continuous action spaces (e.g., turning a steering wheel exactly 42.5 degrees)."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [36:08], [38:42], and [46:05]"
    ],
    examples: [
      "Analog Combat Mechanics: Q-Learning is fighting with a rigid D-pad. Policy Gradients is fighting with an analog stick; the engine outputs a probability cloud of precise analog swing angles and power levels for fluid continuous combat."
    ]
  },
  {
    title: "Phase 4: Exploration vs. Exploitation",
    summary: "The training loop must carefully balance executing known high-reward actions (Exploitation) against taking random, unproven actions (Exploration) to discover better paths.",
    points: [
      "If a network only exploits early successes, it gets stuck utilizing a mediocre 'hack'.",
      "Exploration is entirely necessary to discover the true optimal mastery of the system."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [47:37]"
    ],
    examples: [
      "The Academy Gamble: Exploitation is playing a veteran for a guaranteed 7/10. Exploration is risking a 17-year-old academy player who might drop a 2/10, but might also be the next generational talent with a massive undiscovered reward."
    ]
  },
  {
    title: "1. Universal Approximation Theorem",
    summary: "A mathematical proof stating that a feed-forward neural network with just a single hidden layer is sufficient to approximate any continuous function to any degree of precision.",
    points: [
      "Proves neural networks are the ultimate universal calculators.",
      "The hidden layer might need to be infinitely wide, and it guarantees absolutely nothing about generalizing to new data."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [09:11] and [10:41]"
    ],
    examples: [
      "The Infinite Roster: A mathematical proof that there exists some combination of players that can beat any opponent's tactic. But in reality, you'd need an infinitely large squad and an unlimited transfer budget to find it."
    ]
  },
  {
    title: "2. The Memorization Trap (Rethinking Generalization)",
    summary: "A concept proving deep networks have so much capacity they can brute-force memorize pure garbage without actually learning the underlying concept.",
    points: [
      "When trained on completely randomized labels, networks still achieved perfect 100% accuracy on training data, but completely failed on test data.",
      "If your data is bad, the network won't learn the concept, it will just memorize the noise."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [13:05] and [14:56]"
    ],
    examples: [
      "Speedrunning the Spawns: Instead of learning parry timings (generalization) in Slash of Sword, you memorize exactly where and when enemies spawn (overfitting). An update randomizing spawns collapses your perfect gameplay."
    ]
  },
  {
    title: "3. Adversarial Attacks (Jailbreaking Vision)",
    summary: "Taking an image and mathematically calculating the absolute worst possible invisible noise to add to it, forcing the neural network to wildly misclassify the input.",
    points: [
      "Works by running gradient descent on the input image to maximize the error, rather than on the weights to minimize it.",
      "Exposes that AI does not see the world like humans; they see mathematical gradients that can be explicitly exploited."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [23:44], [24:24], and [25:53]"
    ],
    examples: [
      "The J.A.R.V.I.S. Bypass: Placing a tiny, mathematically calculated sticker on a camera lens alters the incoming matrix values to align with a blind spot, tricking J.A.R.V.I.S. into classifying an intruder as an authorized user."
    ]
  },
  {
    title: "4. Diffusion Models (Iterative Generation)",
    summary: "A generation method using a Forward Process that iteratively adds Gaussian noise to real data until it is pure static, and a Reverse Process that predicts the noise to subtract to generate an image.",
    points: [
      "Breaks down the impossibly hard task of generating reality from nothing into thousands of tiny, easy steps of removing a tiny bit of static."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [31:50], [32:38], and [34:09]"
    ],
    examples: [
      "Restoring the Masterclass: The Forward Process is a VHS tape of a Zidane match degrading into static. The Diffusion Model scrubs the static away frame-by-frame, layer-by-layer, until the pure tactical masterclass is recovered."
    ]
  },
  {
    title: "5. Large Language Models (LLMs)",
    summary: "Massive neural networks trained on vast amounts of internet text with the simple objective of predicting the probabilities of the next token in a sequence.",
    points: [
      "By scaling this simple next-word prediction across trillions of words, the network is forced to learn the underlying structure, logic, and reasoning of human knowledge."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [46:27], [46:38], and [53:23]"
    ],
    examples: [
      "The Tactical Anticipation: A midfielder reads the game by observing the last three passes (tokens) and probabilistically predicts the next pass. Scaled across 90 minutes, it exhibits pure tactical genius and reasoning."
    ]
  },
  {
    title: "6. The 'Playground' to 'Experiment' Pipeline",
    summary: "Moving from casual, subjective chatting with an LLM (Playground) to running rigorous, automated tests against hundreds of structured prompts simultaneously (Experiment).",
    points: [
      "Relying on casual conversation to test an AI is dangerous and subjective.",
      "You need a rigorous, automated pipeline to mathematically prove your system is robust before deployment."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [26:10] and [27:07]"
    ],
    examples: [
      "The Pre-Season Friendly: Chatting in the playground is like casual passing drills in training. Running an Experiment with a 100-prompt Data Set is scheduling 10 brutal pre-season friendlies to actively expose flaws in your defense."
    ]
  },
  {
    title: "7. LLM-as-a-Judge (The Automated Umpire)",
    summary: "Using a second, separate LLM to evaluate the natural language outputs of a primary LLM, rather than relying on brittle, rigid Python code.",
    points: [
      "Simple code is too brittle because an LLM might output rules-breaking data in infinite variations (like Morse code).",
      "Only another neural network has the semantic flexibility to accurately grade natural language outputs at scale."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [31:38] and [32:03]"
    ],
    examples: [
      "The V.A.R. Review: Writing Python rules to grade AI is like a linesman who only looks at feet. LLM-as-a-Judge is V.A.R. (Video Assistant Referee), reviewing the entire context to see if the spirit of the rule was broken."
    ]
  },
  {
    title: "8. Tools and Function Calling",
    summary: "Giving an LLM access to Python functions (Tools) so it can halt text generation, output a command to trigger code, wait for the result, and continue.",
    points: [
      "This is the core of Agentic AI.",
      "Transforms the AI from a passive text-predictor into an active, autonomous operator capable of manipulating the real world."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [37:30] and [42:17]"
    ],
    examples: [
      "The Raspberry Pi Handshake: Wiring the neural core to GPIO pins. The LLM decides it needs to cool the coop, triggers the activate_fan() tool, and turns digital thought into physical action."
    ]
  },
  {
    title: "9. Safety Drift (The Context Window Trap)",
    summary: "A vulnerability where an LLM's attention mechanism is slowly contaminated by the user's phrasing in a long conversation, causing it to 'mimic' the user and break its core safety rules.",
    points: [
      "An LLM's safety protocols naturally degrade the longer a conversation goes on.",
      "Developers must build specific, long-context evaluation data sets to test for this degradation."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [34:39], [35:08], and [35:56]"
    ],
    examples: [
      "The Fatigue Debuff: Your RPG character's stats are flawless at the start, but as the boss fight drags on, fatigue fills up. Your stats drift and degrade, causing you to miss a block you would have easily parried at the start."
    ]
  },
  {
    title: "1. Sequence Modeling vs. Static Networks",
    summary: "Traditional neural networks process single, isolated snapshots of data, while sequence models process data across time to carry history forward.",
    points: [
      "If you ignore the order of data, you lose the context."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [02:17]"
    ],
    examples: [
      "A static network is like a single screenshot of a low-poly game (a sword mid-air). Sequence modeling watches the whole animation frame-by-frame to accurately predict impact."
    ]
  },
  {
    title: "2. Recurrent Neural Networks (RNNs)",
    summary: "An RNN operates on a loop. At every time step, it takes the new input plus the 'Hidden State' (memory) from the previous step to generate an output and update the memory.",
    points: [
      "Maintains a running log of past computations so the network remembers what happened earlier in the sequence.",
      "RNNs process step-by-step, which is incredibly slow.",
      "They suffer from vanishing gradients, meaning in long sequences, the network forgets the earliest inputs."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [11:14] and [36:42]"
    ],
    examples: [
      "A slow buildup phase from the backline. By the time the ball reaches the strikers after 40 passes, the team has completely lost the original tactical intent of the center-backs."
    ]
  },
  {
    title: "3. Word Embeddings",
    summary: "Mapping a word from a vocabulary index into a fixed-size vector (a list of numbers) in a multi-dimensional space.",
    points: [
      "Neural networks only run math, so words must be converted into a numerical profile.",
      "Semantically similar words end up physically close to each other in the math space."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [29:04]"
    ],
    examples: [
      "Character stats in a brawler. The game engine reads a stat vector [Speed: 90, Burst Damage: 85, HP: 30] instead of the word 'Assassin'. Embeddings give every word a unique stat line."
    ]
  },
  {
    title: "4. Transformers & Self-Attention",
    summary: "Attention looks at the entire sequence at once (parallel processing) and mathematically scores how important every single word is to every other word.",
    points: [
      "Completely eliminates the RNN bottleneck; it processes infinitely faster and never forgets early sequence data.",
      "Breaks every word into three matrices: Query (what it's looking for), Key (what it represents), and Value (the actual meaning)."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [46:08] and [52:24]"
    ],
    examples: [
      "A Mourinho-style counter-attack. A midfielder scans the pitch, finds perfect mathematical alignment between a striker's run (Query) and his passing angle (Key), and delivers the cross (Value), bypassing step-by-step buildup."
    ]
  },
  {
    title: "5. The Core Problem with Standard Networks",
    summary: "Feeding a 2D image into a standard network requires 'flattening' the pixels into a single 1D line of numbers, destroying 100% of the spatial information.",
    points: [
      "Flattening means you completely lose the spatial context of who is standing next to whom.",
      "CNNs solve this by reading the image in its natural 2D state."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [14:07]"
    ],
    examples: [
      "Trying to understand a tactical formation by reading a completely flattened list of player coordinates on a spreadsheet, rather than looking at the 2D pitch."
    ]
  },
  {
    title: "6. Convolutions & Patch-Wise Processing",
    summary: "Instead of looking at every pixel at once, a CNN looks at the image through a sliding 'filter' (a small box), multiplying its weights against pixels patch-by-patch.",
    points: [
      "Relies on local connectivity.",
      "Forces the network to find local patterns (like a diagonal line, edge, or corner) regardless of where they appear on the screen."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [16:11]"
    ],
    examples: [
      "Mourinho scouting a low block defense. He scans the pitch zone by zone (patch-wise). If he spots the low block happening in the bottom-left corner, the filter 'activates'."
    ]
  },
  {
    title: "7. Filters (Feature Extractors)",
    summary: "A filter is a small matrix of numbers that acts as a feature detector, outputting a high number (activation) for a match, and zero if it doesn't match.",
    points: [
      "In deep learning, the network learns the best filters via backpropagation to optimize its accuracy, rather than relying on hand-coded filters."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [26:34]"
    ],
    examples: [
      "Configuring character stats for an assassin build. You configure the stat weights, and the CNN optimizes its own 'stat weights' (filters) to best detect the enemy (features)."
    ]
  },
  {
    title: "8. Deep Hierarchies & Pooling",
    summary: "Convolutions extract features, ReLU squashes negative numbers to zero, and Pooling shrinks the image dimensions to build hierarchical understanding.",
    points: [
      "Layer 1 finds basic lines, Layer 2 combines lines into shapes, and Layer 3 combines shapes into objects."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [39:02]"
    ],
    examples: [
      "Layer 1 is a scout spotting individual player movements. Pooling zooms the tactical camera out. Layer 2 is the assistant manager noticing a coordinated press. Layer 3 is Zidane realizing the opponent is vulnerable to a counter-attack."
    ]
  },
  {
    title: "9. The Split Architecture",
    summary: "Every CNN has two parts: a Feature Extractor (Convolutions + Pooling) on the left side, and a specific output objective (like a Classifier) on the right side.",
    points: [
      "You can use the exact same feature extraction logic for completely different tasks."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [48:10]"
    ],
    examples: [
      "The Feature Extractor is the game engine rendering a low-poly 3D environment. The right side is the specific game mode you load on top of it (battle royale, team deathmatch, etc.)."
    ]
  },
  {
    title: "1. Supervised vs. Unsupervised Learning",
    summary: "Supervised learning maps labeled data to an output, while unsupervised learning finds underlying patterns and structures in raw, unlabeled data.",
    points: [
      "You cannot always manually label every piece of data.",
      "Unsupervised learning is necessary to understand the deep, underlying distribution of the data so you can generate new data that matches those structural rules."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [02:02]"
    ],
    examples: [
      "Supervised: Handing a rookie defender a playbook with exact routes drawn out. Unsupervised: Dropping a rookie into 100 hours of raw match footage with zero commentary so they figure out the underlying logic on their own."
    ]
  },
  {
    title: "2. Latent Variables & The Cave Allegory",
    summary: "A latent variable is a hidden feature that you cannot observe directly, but it fundamentally controls what you can observe.",
    points: [
      "High-dimensional data (like a 4K image) is too complex to process raw.",
      "We need to compress it down to its absolute core 'DNA' (the latent variables) so the AI can efficiently manipulate it."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [07:37]"
    ],
    examples: [
      "Plato's Cave: Prisoners only see shadows (pixels) on the wall, not the real object (latent variable).",
      "Action RPG: You see the low-poly sword swinging (pixels), but the game engine manipulates hidden latent variables like [Hitbox: Active, Speed: 1.5, Animation_Frame: 12]."
    ]
  },
  {
    title: "3. Generative Adversarial Networks (GANs)",
    summary: "Pits two neural networks against each other in a zero-sum game: a Generator creating fake data, and a Discriminator trying to classify real vs. fake.",
    points: [
      "The Generator's loss function is tied directly to how often it successfully fools the Discriminator.",
      "Competition forces both to improve exponentially. The Generator must learn the exact latent probability distribution of the real data to survive."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [43:48]"
    ],
    examples: [
      "Training Ground Rivalry: An elite striker (Generator) tries to fake out a goalkeeper (Discriminator). Eventually, the striker's fakes become so hyper-realistic that the keeper has a 50/50 chance of guessing right, meaning reality has been perfectly replicated."
    ]
  },
  {
    title: "4. The Big Takeaway for Jarvis (Anomaly Detection)",
    summary: "To detect anomalies, do not just hardcode rules. Use density estimation (like an Autoencoder/VAE) to learn the normal probability distribution of the network traffic.",
    points: [
      "Anything that falls outside that normal learned distribution—an outlier—is instantly flagged as a threat."
    ],
    formulas: [],
    facts: [],
    examples: [
      "Instead of writing static security rules for the security matrix, Jarvis learns what 'normal' traffic looks like and flags anything mathematically abnormal."
    ]
  },
  {
    title: "1. The Forward Pass: Making a Guess",
    summary: "This is how a single 'brain cell' (neuron) takes in information and spits out an answer.",
    points: [
      "X (Inputs): The data you feed it (e.g., how many hours you studied).",
      "W (Weights): How important that data is.",
      "X · W (Dot Product): You multiply the input by its weight, and add them all together.",
      "b (Bias): A baseline 'head start' number to adjust the final score.",
      "g (Activation Function): A filter that squashes the final number so it makes sense (like turning it into a probability between 0 and 1).",
      "y (Output): The network's final guess!"
    ],
    formulas: [
      "\\[ y = g((X \\cdot W) + b) \\]"
    ],
    facts: [
      "Lecture reference: [16:17]"
    ],
    examples: []
  },
  {
    title: "2. The Loss Function: Checking the Score",
    summary: "Once the network makes a guess, we need to grade it to see how badly it messed up. The entire goal of AI is simply to make the total error as close to zero as possible.",
    points: [
      "J (Loss): The total error.",
      "If the network guesses exactly right, the loss is 0. If it guesses completely wrong, the loss is high."
    ],
    formulas: [
      "\\[ J = \\text{Average of (True Answer} - \\text{Network\\'s Guess)} \\]"
    ],
    facts: [
      "Lecture reference: [33:40]"
    ],
    examples: []
  },
  {
    title: "3. Gradient Descent: Learning from Mistakes",
    summary: "Now that the network knows it made a mistake, it needs to adjust its weights so it does better next time.",
    points: [
      "Gradient: The mathematical slope telling you which direction makes the error worse.",
      "Minus sign: Because the gradient points to the error going up, we subtract it so we go down towards zero error.",
      "Learning Rate (η): A tiny number (like 0.01) that acts like baby steps."
    ],
    formulas: [
      "\\[ W_{new} = W_{old} - (\\eta \\cdot \\text{Gradient}) \\]"
    ],
    facts: [
      "Lecture reference: [38:44]"
    ],
    examples: [
      "Imagine you are blindfolded on a hill and want to get to the bottom. You feel with your foot which way the hill goes up (the gradient), and you take a small baby step in the exact opposite direction."
    ]
  },
  {
    title: "4. Backpropagation: The Chain Rule",
    summary: "To find the gradient, the network uses the Chain Rule to trace the blame backward and figure out exactly which weight caused the mistake.",
    points: [
      "Calculates how much the final error changed because of the output, and how much the output changed because of a specific weight.",
      "Multiplying them together tells the network exactly who to blame and fix.",
      "Exam Summary Trick: Multiply inputs by weights → squash it to make a guess → check how wrong the guess was → take a baby step backward to fix the weights."
    ],
    formulas: [
      "\\[ \\frac{\\partial J}{\\partial W} = \\frac{\\partial J}{\\partial y} \\cdot \\frac{\\partial y}{\\partial W} \\]"
    ],
    facts: [
      "Lecture reference: [40:41]"
    ],
    examples: []
  },
  {
    title: "5. The RNN Hidden State Update",
    summary: "An RNN works by passing a memory (hidden state) from one word to the next. This equation decides how to update that memory when looking at a new word.",
    points: [
      "h_t (Current Memory): The new memory created right now.",
      "h_{t-1} (Past Memory): The old memory passed down from the previous word.",
      "x_t (Current Word): The actual data being looked at right now.",
      "W_hh and W_xh (Weights): Learned settings dictating how much to care about the old memory vs. the new word.",
      "tanh: A squashing function that keeps memory values between -1 and 1 so they don't blow up."
    ],
    formulas: [
      "\\[ h_t = \\tanh((W_{hh} \\cdot h_{t-1}) + (W_{xh} \\cdot x_t)) \\]"
    ],
    facts: [
      "Lecture reference: [17:07]"
    ],
    examples: []
  },
  {
    title: "6. The RNN Output Prediction",
    summary: "Once the RNN has updated its memory, it uses that memory to make a guess (like predicting the next word).",
    points: [
      "ŷ_t (The Guess): The network's final output for this exact step.",
      "W_hy (Output Weights): A final set of learned parameters.",
      "Summary: To guess the next word, just multiply your current memory by a set of weights."
    ],
    formulas: [
      "\\[ \\hat{y}_t = W_{hy} \\cdot h_t \\]"
    ],
    facts: [
      "Lecture reference: [17:07]"
    ],
    examples: []
  },
  {
    title: "7. The Attention Mechanism (Transformers)",
    summary: "Transformers look at all words at once and use Attention to figure out which words are mathematically related to each other.",
    points: [
      "Q (Query): What I am looking for. K (Key): What I have. V (Value): The actual underlying meaning.",
      "Dot Product (Q · K): Measures how similar the vectors are. Highly related words output a huge number.",
      "Scaling factor: Keeps the math from exploding.",
      "Softmax: A filter that turns similarity scores into percentages that add up to 100%.",
      "Exam Summary Trick: Multiply Q and K to find out which words are related → turn it into a percentage → apply it to V."
    ],
    formulas: [
      "\\[ \\text{Attention Score} = \\text{softmax}\\left(\\frac{Q \\cdot K}{\\text{scaling factor}}\\right) \\cdot V \\]"
    ],
    facts: [
      "Lecture reference: [49:45]"
    ],
    examples: []
  },
  {
    title: "1. The Expected Return (The Goal of RL)",
    summary: "When an AI plays a game, it wants to get the highest score possible, but values immediate rewards more than rewards way in the future.",
    points: [
      "R_t (Total Expected Return): The final score the AI thinks it will get from this point forward.",
      "r_t: The reward the AI gets right now.",
      "γ (Gamma - The Discount Factor): Acts like impatience, telling the AI to win efficiently by valuing future rewards slightly less.",
      "Review Summary Trick: Total Return: Grab points now, value future points slightly less."
    ],
    formulas: [
      "\\[ R_t = r_t + \\gamma r_{t+1} + \\gamma^2 r_{t+2} + ... \\]"
    ],
    facts: [],
    examples: [
      "A coin right now is worth 1 point, but a coin 10 steps from now is only worth 0.9 points."
    ]
  },
  {
    title: "2. Q-Learning (Value Learning)",
    summary: "The AI creates a cheat sheet (a 'Q-function') that calculates exactly how many points a specific action will earn in a specific situation.",
    points: [
      "s (State): Where the AI is right now.",
      "a (Action): What the AI is doing.",
      "Q(s, a) (Q-Value): The 'Quality' score of doing that specific action in that specific spot.",
      "E[R_t]: The expected total points it will get if it takes that action.",
      "The Goal: The AI just looks at its cheat sheet and picks the action with the highest Q-Value.",
      "Review Summary Trick: Q-Learning: Build a cheat sheet scoring every possible move, then pick the highest score."
    ],
    formulas: [
      "\\[ Q(s, a) = \\mathbb{E}[R_t | s_t = s, a_t = a] \\]"
    ],
    facts: [],
    examples: [
      "Standing in front of a gap (State), jumping (Action)."
    ]
  },
  {
    title: "3. Policy Gradients (Action Learning)",
    summary: "Instead of making a cheat sheet of scores, the AI learns a 'Policy'—a set of rules that directly outputs the probability of the best move to make.",
    points: [
      "π_θ (The Policy): The probability that the AI decides to take a certain action.",
      "R_t (The Reward): Did the AI win or lose?",
      "If the reward is Good, the math pushes the probability (π) of doing that action up.",
      "If the reward is Bad, the math pushes the probability of doing that action down.",
      "Review Summary Trick: Policy Learning: Just guess a move. If it wins, do it more often. If it loses, do it less."
    ],
    formulas: [
      "\\[ \\nabla J(\\theta) \\approx \\frac{1}{N} \\sum \\left( \\sum \\nabla \\log \\pi_\\theta (a_t | s_t) \\right) R_t \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "4. The Scaling Laws and Emergent Properties",
    summary: "Making a neural network bigger and feeding it more data unlocks entirely new skills it was never specifically trained for.",
    points: [
      "You only see these new skills (emergent abilities) once the model crosses a massive size threshold."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [53:04]"
    ],
    examples: [
      "A model spontaneously learning to do math or translate languages."
    ]
  },
  {
    title: "5. Hallucinations and Adversarial Attacks",
    summary: "Deep learning models don't actually know facts; they are highly advanced math engines trying to predict the next word, leading to specific vulnerabilities.",
    points: [
      "Hallucination: When the math leads the model to confidently output complete nonsense or fake facts.",
      "Adversarial Attacks ('Jailbreaking'): Tricking the model's math by giving it specifically crafted inputs that force it to bypass safety filters or break down."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [51:36]"
    ],
    examples: []
  },
  {
    title: "6. Robustness and Out-of-Distribution Data",
    summary: "Neural networks fail completely if shown something totally new (Out-of-Distribution) because they lack the human ability to realize they 'don't know'.",
    points: [
      "They will just guess blindly based on their old training math.",
      "Review Summary Trick: Deep learning is limited by Hallucinations, Fragility (failing on new things), and relying on making models Bigger to unlock new abilities."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [08:31]"
    ],
    examples: []
  },
  {
    title: "Summary of Lecture 7 (No Math)",
    summary: "History of AI (1956 to Present): The transition from rule-based symbolic systems (if/then statements) to modern neural networks.",
    points: [
      "The 'Laws' of AI: A modern re-imagining of Isaac Asimov's science fiction 'Three Laws of Robotics.'",
      "Engineering Best Practices: Build safe AI systems by logging traces, building test datasets, and evaluating prompts often. Publish data and be transparent.",
      "The Zeroth Rule: 'If you can't guarantee safety and security, don't build it.'"
    ],
    formulas: [],
    facts: [],
    examples: []
  },
  {
    title: "1. The Forward Pass: How the Network Guesses",
    summary: "This is the math of a single 'brain cell' (a perceptron). It takes in data, weighs its importance, and spits out an answer.",
    points: [
      "x_i (Inputs): The data you feed it (e.g., sensor readings).",
      "w_i (Weights): How important the network thinks each piece of data is.",
      "w_0 or b (Bias): A baseline adjustment, like giving a student a 5-point head start on a test.",
      "g (Activation Function): A filter that 'squashes' the final math into a useful number, like a percentage between 0 and 1.",
      "ŷ (Output): The network's final guess."
    ],
    formulas: [
      "\\[ \\hat{y} = g\\left( \\sum_{i=1}^{m} x_i w_i + w_0 \\right) \\]",
      "\\( \\hat{y} = g(XW + b) \\)"
    ],
    facts: [],
    examples: []
  },
  {
    title: "2. The Loss Function: Grading the Guess",
    summary: "Once the network makes a guess, we have to measure how badly it messed up. The goal of AI is simply to make the total loss as close to 0 as possible.",
    points: [
      "y_i (True Answer): What the answer should have been.",
      "ŷ_i (Network's Guess): What the network actually guessed.",
      "J(W) (Total Loss): We subtract the guess from the real answer, square it (so negative errors don't cancel out positive ones), and find the average across all the data."
    ],
    formulas: [
      "\\[ J(W) = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "3. Gradient Descent: Learning from the Mistake",
    summary: "Now that the network knows it was wrong, it uses calculus to figure out how to change its weights so it does better next time.",
    points: [
      "The Gradient: A mathematical slope that points toward maximum error.",
      "Learning Rate (η): A tiny number (like 0.01) representing baby steps.",
      "The minus sign (-): Because the gradient points up toward worse errors, we subtract it to take a step down toward zero error."
    ],
    formulas: [
      "\\[ W \\leftarrow W - \\eta \\frac{\\partial J}{\\partial W} \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "4. Backpropagation: Finding Who to Blame",
    summary: "To calculate the gradient, the network uses the Chain Rule to trace the error backward and figure out exactly which weight caused the bad guess.",
    points: [
      "It asks: How much did the final error change because of the output? How much did the output change because of the raw math? How much did the raw math change because of this specific weight?",
      "Multiplying those together tells the network exactly how much to adjust that one specific weight."
    ],
    formulas: [
      "\\[ \\frac{\\partial J}{\\partial w_1} = \\frac{\\partial J}{\\partial \\hat{y}} \\cdot \\frac{\\partial \\hat{y}}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w_1} \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "5. The RNN Hidden State Update",
    summary: "An RNN processes data one step at a time. It keeps a 'memory' (hidden state) and updates it as it sees new information.",
    points: [
      "h_t (Current Memory): The brand new memory we are calculating for this current step.",
      "h_{t-1} (Past Memory): The old memory carried over from the previous step.",
      "x_t (Current Input): The actual data we are looking at right now.",
      "W_hh and W_xh (Weights): The network's learned dials. They decide how much to care about the old memory versus the new data.",
      "tanh: A squashing function. It keeps the numbers between -1 and 1 so the math doesn't explode out of control as it loops."
    ],
    formulas: [
      "\\[ h_t = \\tanh((W_{hh} \\cdot h_{t-1}) + (W_{xh} \\cdot x_t)) \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "6. The RNN Output Prediction",
    summary: "Once the RNN has its updated memory for a specific step, it uses that memory to make a guess (like predicting the next word).",
    points: [
      "ŷ_t (The Guess): The network's final output for this exact step.",
      "W_hy (Output Weights): Another set of learned dials.",
      "Summary: It just multiplies the current memory by some weights to spit out an answer."
    ],
    formulas: [
      "\\[ \\hat{y}_t = W_{hy} \\cdot h_t \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "7. The Attention Mechanism (Transformers)",
    summary: "Transformers read everything at once and use Attention to figure out which pieces of data are connected to each other mathematically.",
    points: [
      "Q (Query): What I am looking for. K (Key): What I have. V (Value): The actual meaning.",
      "Q · K^T (Dot Product): Multiplies the Queries and Keys to test for similarity. If two words are strongly related, this outputs a very high number.",
      "Scaling factor: We divide by the square root of d_k to keep the math from getting too big.",
      "softmax: A filter that turns all the raw scores into percentages that add up to 100%.",
      "V: Finally, we multiply those percentages by the actual Values (V) to extract the exact features we need."
    ],
    formulas: [
      "\\[ \\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q \\cdot K^T}{\\sqrt{d_k}}\\right) V \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "1. Images as Math Matrices",
    summary: "Computers do not see colors or shapes; they just see a grid of numbers.",
    points: [
      "Grayscale Image: A 2D matrix where each number represents brightness (e.g., 0 for black, 255 for white).",
      "Color Image (RGB): A 3D matrix. It is essentially three 2D matrices stacked together—one for Red, one for Green, and one for Blue.",
      "Quick Review Summary: Image = Matrix: A grid of numbers representing pixel brightness."
    ],
    formulas: [],
    facts: [],
    examples: []
  },
  {
    title: "2. The Convolution Operation (The Core Equation)",
    summary: "A CNN uses a tiny grid (called a filter or kernel) that slides across the image to find specific features like edges, curves, or corners.",
    points: [
      "I (The Image): The grid of numbers making up your picture.",
      "F (The Filter/Kernel): A tiny grid of weights (like a 3x3 square) that the network learns during training. Each filter looks for one specific thing.",
      "* (Convolution): This does not mean basic multiplication. It means 'sliding.'",
      "The Process: Place the filter over a patch, multiply the overlapping numbers together, add them all up to get one single number, and slide over by one pixel.",
      "The Output: A new, slightly smaller grid (Feature Map) that lights up wherever the filter found its specific feature.",
      "Quick Review Summary: Convolution: Slide a tiny filter grid over the image, multiply overlapping numbers, and add them up to find features."
    ],
    formulas: [
      "\\[ (I * F)(x, y) = \\sum_{i} \\sum_{j} I(x+i, y+j) \\cdot F(i, j) \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "3. Non-Linearity (Activation)",
    summary: "After the convolution slides over the image, the results pass through an activation function to introduce non-linearity, allowing the network to learn complex shapes instead of just straight lines.",
    points: [
      "Any negative number becomes 0.",
      "Any positive number stays exactly the same.",
      "Quick Review Summary: ReLU Activation: Turn all negative numbers to 0."
    ],
    formulas: [
      "\\[ f(x) = \\max(0, x) \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "4. Variational Autoencoders (VAEs)",
    summary: "A VAE takes a big piece of data (like an image), squashes it down into a tiny summary (latent variables), and then tries to rebuild the original image from that summary.",
    points: [
      "Reconstruction Loss: Compares the original picture to the new fake picture pixel-by-pixel to see how badly it was redrawn.",
      "Regularization Loss: Forces the AI to use a nice, smooth bell curve for its summary. If the summary gets too weird or chaotic, this penalty goes up.",
      "Goal: The AI just wants to make both of these numbers as small as possible."
    ],
    formulas: [
      "\\[ \\text{Total Loss} = \\text{Reconstruction Loss} + \\text{Regularization Loss} \\]"
    ],
    facts: [],
    examples: [
      "Quick Review Trick: VAE: Squash the image → Add rules to keep it neat → Rebuild the image."
    ]
  },
  {
    title: "5. Generative Adversarial Networks (GANs)",
    summary: "A GAN works by putting two neural networks in a fighting ring against each other: a Generator creating fakes, and a Discriminator acting like a detective.",
    points: [
      "D(X): The detective looking at a Real image. It wants to give it a score of 100%.",
      "D(G(Z)): The detective looking at a Fake image made by the Generator. It wants to give it a score of 0%.",
      "The Detective tries to make the whole math equation as BIG as possible (meaning it successfully caught all the fakes).",
      "The Generator tries to make the exact same equation as SMALL as possible (meaning its fakes were so good they totally fooled the detective)."
    ],
    formulas: [
      "\\[ \\min_G \\max_D [ \\log(D(X)) + \\log(1 - D(G(Z))) ] \\]"
    ],
    facts: [],
    examples: [
      "Quick Review Trick: GAN: The Forger vs. The Detective. The Forger keeps making fakes until the Detective can't tell the difference anymore."
    ]
  },
  
  {
    title: "📦 CHAPTER 4: SMART SENSING FOR IOT",
    summary: "Designing sensing systems at the Edge, optimizing for low cost and extreme energy efficiency.",
    points: [],
    formulas: [],
    facts: [],
    examples: []
  },
  {
    title: "1. The Combat Hierarchy (The IoT Pipeline)",
    summary: "A standard IoT pipeline moves from Sensor to Cloud. This course focuses entirely on The Edge (Sensor + Microcontroller).",
    points: [
      "Sending every single raw data point (like every temperature fluctuation) to the cloud is a rookie mistake; it creates lag and drains resources.",
      "Process data locally and only send the final intelligence up the chain of command."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:42:04]"
    ],
    examples: [
      "Think of the Sensor as your frontline scout and the Microcontroller as your squad leader. The scout doesn't report every footstep to the General (Cloud); the squad leader analyzes it locally and reports the threat."
    ]
  },
  {
    title: "2. Character Stats (The Design Constraints)",
    summary: "When designing algorithms for the Edge, you are working with severely under-leveled hardware. Your system design must optimize two critical stats: Low Cost and Energy Efficiency.",
    points: [
      "Low Cost (Gold): The physical sensors must be dirt cheap (e.g., a $0.20 IR diode).",
      "Energy Efficiency (Stamina/Mana): Devices run on batteries. You cannot spam high-level 'spells' (heavy machine learning algorithms) or the device dies. You need lightweight, efficient algorithms."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [06:38]"
    ],
    examples: []
  },
  {
    title: "3. The Skill Tree (The 'Lego Blocks' Approach)",
    summary: "Mastering foundational signal processing and statistical inferencing tools that act as Lego blocks to build complex systems.",
    points: [
      "Peak Detection: Finding the highest value in a data wave.",
      "Fast Fourier Transform (FFT): Breaking down a messy wave into clean frequencies.",
      "K-Means Clustering: Grouping similar data points together."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [10:48]"
    ],
    examples: [
      "These are your basic combat mechanics (Light Attack, Parry, Dodge). You combo these Lego blocks together to build a custom attack strategy for any sensing problem."
    ]
  },
  {
    title: "4. Min-Maxing a Level 1 Item (The IR Photodiode)",
    summary: "An Infrared (IR) Photodiode simply emits invisible light and measures how much bounces back off an object. More light bounced back = a change in voltage.",
    points: [
      "Level 1 (Proximity Detection): Bring hand close -> light bounces back -> voltage changes.",
      "Level 2 (Gesture Recognition): Move hand fast vs. slow to create wide or tight waves on a graph. Analyze these frequencies to detect gestures.",
      "Level 3 (The Fitbit Hack): Strap the IR sensor to an ankle facing the floor. Walking creates a rhythmic pulsing voltage wave.",
      "Combo 1: Use Peak Detection on the wave; every peak is one footstep (pedometer).",
      "Combo 2: Use FFT to look at the wave's frequency to determine if the user is walking or running."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [16:45], [23:48], [30:26], and [42:24]"
    ],
    examples: [
      "You do not need expensive hardware to gain high-level intelligence. Deeply understand the physical principle of a cheap sensor and creatively apply lightweight algorithms."
    ]
  },
  {
    title: "📦 CHAPTER 5: IOT ARCHITECTURE & MICROCONTROLLERS",
    summary: "Understanding the tactical flow of IoT data and the inner hardware mechanics of edge devices.",
    points: [],
    formulas: [],
    facts: [],
    examples: []
  },
  {
    title: "1. The Tactical Setup (IoT Architecture)",
    summary: "The standard flow of IoT data is: IoT Device -> Gateway -> Edge -> Cloud.",
    points: [
      "IoT devices are severely under-resourced and lack the 'stamina' to run a full TCP/IP networking stack or heavy encryption.",
      "Data is passed to a Gateway in the local network to be secured, repackaged, and sent to the Cloud."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [16:33]"
    ],
    examples: [
      "The IoT Device is a Fast Winger (lightweight, specialized). The Gateway is a Holding Midfielder that secures the ball, encrypts it, and plays the long pass to the Cloud."
    ]
  },
  {
    title: "2. The Microcontroller Brain (Your Character Build)",
    summary: "To understand how to code for an IoT device, you need to understand its CPU components: the ALU, Registers, and Memory.",
    points: [
      "ALU (Processing Unit): Physical hardware circuits that do the actual math and logic.",
      "Registers: Tiny, ultra-fast memory slots built directly inside the CPU.",
      "Memory (SRAM/Flash): Larger storage located outside the CPU."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [37:29]"
    ],
    examples: [
      "ALU = Base combat mechanics. Registers = D-Pad Quick-Select slots for zero-latency access. Memory = Main Inventory Menu that requires pausing (processing time) to fetch items."
    ]
  },
  {
    title: "3. The Instruction Set (The Combo List)",
    summary: "An 'Instruction' is a 16-bit binary code consisting of an Opcode (Action) and Operands (Targets). The Instruction Decoder translates and executes these commands.",
    points: [
      "RISC Architecture (Reduced Instruction Set Computer): Microcontrollers use simple, lightweight instructions to heavily conserve battery."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [35:08], [44:04], and [48:25]"
    ],
    examples: [
      "RISC is like having basic Jump and Slash buttons instead of a heavy 'backflip fireball' button. You write longer code to chain combos, but it uses very little battery."
    ]
  },
  {
    title: "4. The Execution Loop (The Set-Piece Drill)",
    summary: "A rhythmic loop driven by the CPU Clock that processes logic sequentially using the Program Counter (PC).",
    points: [
      "Program Counter: Points to the current instruction in memory.",
      "Fetch & Decode: Reads the Opcode and identifies the Operands.",
      "Execute & Write-Back: The ALU processes the data and saves it to a Register.",
      "Update PC: Points to the next instruction for the next clock cycle."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [56:08]"
    ],
    examples: [
      "A set-piece drill: The Coach (PC) points to the play. The Playmaker (Decoder) reads it. The team executes. The score is recorded (Write-Back), and the Referee's whistle (Clock) triggers the next play."
    ]
  },
  {
    title: "5. Microprocessor vs. Microcontroller (The Solo Build)",
    summary: "While used interchangeably, they are entirely different beasts. Microcontrollers are used for edge computing due to low cost and high integration.",
    points: [
      "Microprocessor: Just the CPU. Has massive processing power but needs external support chips (RAM, Flash, I/O ports) to function.",
      "Microcontroller: An entire computer packed onto a single piece of silicon containing the CPU, Memory, ADCs, and clock."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [14:01]"
    ],
    examples: [
      "Microprocessor = Glass Cannon (powerful but needs a party to survive). Microcontroller = Paladin Solo-Build (everything you need packed into one unit)."
    ]
  },
  {
    title: "6. The Memory Loadout (Your Character Inventory)",
    summary: "Memory in a microcontroller is segmented into highly specific tactical zones.",
    points: [
      "Flash Memory (Non-Volatile): Where compiled application code and the Bootloader live. Survives a reboot.",
      "SRAM (Volatile): Stores active runtime variables. Wipes instantly if power drops.",
      "EEPROM (Non-Volatile): A tiny, slow hard drive for specific calibration constants.",
      "I/O Registers: Physical pins hardwired to specific memory addresses. Writing binary directly here physically alters the hardware."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [39:56], [50:18], and [55:41]"
    ],
    examples: [
      "Flash = Skill Tree. SRAM = Stamina Bar. EEPROM = Key Item Slot. I/O Registers = Hardware Hitboxes."
    ]
  },
  {
    title: "7. The Watchdog Timer (The Anti-Stunlock Failsafe)",
    summary: "An independent hardware timer that continuously counts down. Your code must periodically reset it ('feed the dog') to prevent a hard reset.",
    points: [
      "Because there is no OS, if a sensor traps your code in an infinite loop, there is no 'Ctrl+Alt-Del' to save you.",
      "If the timer hits 0, the Watchdog bypasses the software and hard-resets the physical chip."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [28:49]"
    ],
    examples: [
      "A 'Doom' status effect counting down from 10. Your main loop has a basic attack that resets it. If stunlock prevents the attack, the Watchdog resets the system (happened to NASA's Mars Helicopter!)."
    ]
  },
  {
    title: "8. Clock Prescaling (Controlling the Tempo)",
    summary: "A Prescaler mathematically divides the fast main CPU clock speed before feeding it to mechanically slower peripherals like ADCs or Timers.",
    points: [
      "If you feed a 16 MHz clock directly into a slow ADC, it will choke and drop data.",
      "The prescaler division directly dictates your maximum sensor sampling rate."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:05:52]"
    ],
    examples: [
      "CPU = Zidane processing at 100mph. ADC = Slow target man. The Prescaler is the instruction to 'slow down the tempo in the final third' so the target man receives the ball at a manageable speed."
    ]
  },
  {
    title: "7. The ROC Curve & AUC (Your System's Build Quality)",
    summary: "The Receiver Operating Characteristics (ROC) Curve is a scatter plot mapping P_D against P_FA across every possible threshold value. The Area Under the Curve (AUC) scores the overall system.",
    points: [
      "The Diagonal Line represents pure random guessing.",
      "The closer the curve aggressively arches toward the top-left corner, the more flawless the detector is (high P_D, low P_FA).",
      "Integrating the area yields a single score from 0.5 to 1.0.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--accent); overflow-x: auto; margin-top: 10px;">
 ROC CURVE (Detection vs False Alarms)
 1.0 |-------, (Perfect AUC = 1.0)
     |      /|
 P_D |    /  | <- Elite Detector (High AUC)
     |  /    |
     |/      | <- Random Guess (AUC = 0.5)
 0.0 +-------+----
    0.0     1.0  (P_FA)
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:08:29] and [01:09:50]"
    ],
    examples: [
      "ROC is a defensive backline executing an Offside Trap. A low AUC is a disorganized defense resulting in false alarms or misses. A high AUC is a perfectly drilled Mourinho-style block locking down the trap."
    ]
  },
  {
    title: "1. The Discretization Duels (Sampling vs. Quantization)",
    summary: "The physical world is analog and continuous, but a digital microcontroller only understands 1s and 0s. It must slice the world into discrete steps.",
    points: [
      "Sampling (Discretizing Time): Slicing a continuous timeline into fixed snapshot intervals (Δt). Too slow, and you drop frames and miss fast peaks.",
      "Quantization (Discretizing Amplitude): Slicing continuous real-world voltage levels into fixed, discrete numerical steps.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--success); overflow-x: auto; margin-top: 10px;">
 ANALOG vs DIGITAL (Quantization Snapping)
 Volts
  5V |       ___ (Snapped to Digital Grid)
     |    _ /   | (Smooth Analog Reality)
     |  _ / |
     | / |
  0V +---+---+---+---> Time
       Sampling Grid (Δt)
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [04:59], [06:59], and [01:03:07]"
    ],
    examples: [
      "Tactical Football Pitch: Sampling is your camera frame-rate (missing quick feints if too slow). Quantization is dividing the pitch into a tactical grid (low resolution = 4 quadrants, high resolution = precise spatial tracking)."
    ]
  },
  {
    title: "4. The Left-Adjustment Hack (Min-Maxing Code Latency)",
    summary: "By triggering the ADLAR bit, you force the 10-bit ADC output into Left-Adjustment, allowing you to bypass bit-shifting latency if you only need 8-bit accuracy.",
    points: [
      "Right-Adjusted (Default): The lowest 8 bits fill ADCL, remaining 2 bleed into ADCH. Requires reading both and running bit shifts (Critical Processing Cost).",
      "Left-Adjusted (ADLAR = 1): The 8 most critical, high-impact bits slam entirely into ADCH.",
      "The Optimization Payoff: You can read only ADCH and ignore ADCL entirely. You downsize the pipeline to an instant 8-bit read, eliminating bit-shifting latency and shrinking your machine code footprint.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--accent2); overflow-x: auto; margin-top: 10px;">
 RIGHT-ADJUSTED (Default - Slow)
 ADCH: [ -  -  -  -  -  - b9 b8 ] -> Requires Shift
 ADCL: [b7 b6 b5 b4 b3 b2 b1 b0 ] -> Requires Read

 LEFT-ADJUSTED (ADLAR = 1 - Fast 8-Bit)
 ADCH: [b9 b8 b7 b6 b5 b4 b3 b2 ] -> Read ONE register!
 ADCL: [b1 b0  -  -  -  -  -  - ] -> Ignored
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:00:56] and [01:01:02]"
    ],
    examples: []
  },
  {
    title: "3. Polling vs. Interrupts (CPU Frame Bottlenecks)",
    summary: "Analog-to-digital conversion takes a block of clock cycles to settle. Your code loop has two entirely different ways to wait for that data to cook.",
    points: [
      "Polling (Busy-Waiting): The code toggles the ADSC bit, then traps itself inside a tight while() loop, freezing the CPU 100% on that single line.",
      "Interrupts (Event-Driven): The code triggers the conversion and immediately jumps away. The hardware drops a flag when finished, pausing the main loop for a fraction of a microsecond.",
      "For complex systems, Polling is a critical bottleneck causing background diagnostic routines and security matrices to lag out completely.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--warn); overflow-x: auto; margin-top: 10px;">
 POLLING (CPU Blocked)
 Main: [Start ADC] -> [Wait...] -> [Wait...] -> [Read Data] -> [Run]

 INTERRUPT (CPU Free)
 Main: [Start ADC] -> [Do AI Math] -> [Run Logic] -> [Continue...]
 ADC:                 (Processing..)            |--> [ISR: Read Data]
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:02:06] and [01:03:10]"
    ],
    examples: [
      "Tactical Football Pitch: Polling is a Manager screaming at a midfielder to run, freezing completely until the player crosses the line while ignoring the rest of the pitch. Interrupts are Strategic Management: call the play, scan the whole pitch, and just note when the player raises a hand to signal completion."
    ]
  },
  {
    title: "1. SPI (Serial Peripheral Interface) Core Mechanics",
    summary: "A synchronous, full-duplex (two-way simultaneous), Master-Slave communication protocol that allows a Microcontroller to fetch data from digital sensors incredibly fast using 4 dedicated wires.",
    points: [
      "SCK (Serial Clock): The heartbeat. Generated by the Master. Nothing happens unless the clock is ticking.",
      "MOSI (Master Out, Slave In): The megaphone. The Master sends commands or data to the sensor.",
      "MISO (Master In, Slave Out): The microphone. The sensor sends data back to the Master.",
      "SS / CS (Slave Select / Chip Select): The tap on the shoulder. Pulled LOW (0) to wake up a specific sensor on a shared line.",
      "The Shift Register: SPI does not send data sequentially; it swaps data. A forced 1-to-1 exchange of 8 bits every clock cycle.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--accent); overflow-x: auto; margin-top: 10px;">
 FULL-DUPLEX SPI WIRING
 +-------------+            +-------------+
 |   MASTER    |            |   SLAVE     |
 |        SCK  |===========>| SCK         | (Clock Sync)
 |       MOSI  |----------->| MOSI        | (Data Out)
 |       MISO  |<-----------| MISO        | (Data In)
 |         CS  |----------->| CS          | (Target Lock)
 +-------------+            +-------------+
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [29:09], [30:13], [34:47], and [39:41]"
    ],
    examples: [
      "Action Points (SCK): No Action Points = Time is frozen. The Slave cannot speak or act unless the Master spends Action Points to drive the turn."
    ]
  },
  {
    title: "4. I2C Protocol Flow & The Nightclub Analogy",
    summary: "Communication on an I2C bus follows a strict chronological protocol managed by the Master: Start, Address, ACK, Data, Stop.",
    points: [
      "Start Condition (TWCR): Master pulls SDA low while SCL is high to grab everyone's attention.",
      "Address + R/W: Master sends the 7-bit address plus 1 bit to dictate Reading (1) or Writing (0).",
      "Acknowledge (ACK): The targeted sensor pulls SDA low to confirm presence. If no pull (NACK), the device is missing.",
      "Data Transfer: Sent in 8-bit chunks with an ACK after every chunk, ending with a Stop Condition (TWSTO).",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--success); overflow-x: auto; margin-top: 10px;">
 I2C MESSAGE SEQUENCE
 [MASTER]        [SLAVE]          [MASTER]      [SLAVE]    [MASTER]
  START -> [Address + R/W] -> (Waits for ACK)
                                     |
                                   [ACK] -> [Send Data]
                                                 |
                                               [ACK] -> STOP
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [17:08], [18:06], [18:48], [19:30], [21:01], and [24:05]"
    ],
    examples: [
      "The DJ Mic Drop (Start Condition): The Bouncer cuts the music to get everyone's attention.",
      "The Raised Hand (ACK): If Patron #0x68 is in the club when called over the PA, they raise their hand. If they don't (NACK), the Bouncer hangs up.",
      "Interrupts (Hiring a Helper): Instead of busy-waiting (staring at the patron for 10 minutes), the Bouncer uses an Interrupt (hires an assistant) to listen for the answer while he goes back to checking IDs."
    ]
  },
  {
    title: "1. The Hierarchy of Control (Abstraction Layers)",
    summary: "Embedded programming operates on a spectrum from High-Level APIs (easy but slow) down to Bare Metal (complex but instant).",
    points: [
      "High-level APIs hide implementation details so developers don't have to look up hexadecimal memory addresses, but this comes with massive hidden performance penalties."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [04:38] and [05:43]"
    ],
    examples: [
      "API Mode is like Auto-Battle (safe but terrible pathing and stamina drain). Bare-Metal Mode is Manual Controls (requires perfect timing but executes instantly for min-maxing stats)."
    ]
  },
  {
    title: "2. Arduino Sketch Anatomy (The Game Loop)",
    summary: "Every standard firmware sketch relies on two core functions: setup() and loop().",
    points: [
      "setup() (The Spawn Phase): Runs exactly once to configure the system.",
      "loop() (The Infinite Game Loop): An un-capped, infinite while(true) loop where the microcontroller is trapped forever, continuously checking sensors and driving actuators."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [07:20], [08:07], and [08:29]"
    ],
    examples: []
  },
  {
    title: "3. The High-Level Magic Tax (API Overhead)",
    summary: "Standard Arduino commands do a massive amount of hidden safety work under the hood, creating high latency and code bloat that time-sensitive AI cannot afford.",
    points: [
      "Switching from APIs to direct hardware commands can cut the machine code footprint in half and dramatically boost signal frequency."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:10:43]"
    ],
    examples: [
      "Calling digitalWrite() is like casting a spell through a slow, bureaucratic magical council. Bypassing the API is throwing the fireball straight out of your bare hands."
    ]
  },
  {
    title: "4. Direct Port Manipulation (Bypassing Bureaucracy)",
    summary: "To achieve zero-latency hardware execution, you completely bypass libraries and manually program the microcontroller's internal I/O Registers.",
    points: [
      "DDRx (Data Direction Register): Sets the pin's role. 0 = Input, 1 = Output.",
      "PORTx (Port Data Register): Dictates the output state. 1 = HIGH, 0 = LOW.",
      "PINx (Port Input Pins Register): Instantly reads the real-time physical voltages entering the chip.",
      "You can use bitwise operations to update an entire register simultaneously in a single clock cycle."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:12:44]"
    ],
    examples: [
      "Instead of a slow, single-target attack, updating a PORT register is a massive Area-of-Effect (AoE) strike that updates your entire sensor grid instantly."
    ]
  },
  {
    title: "5. Binary Hypothesis Testing (Combat Hitbox Check)",
    summary: "A sensor's primary job is to look at the noisy physical world and make a binary choice about an event, using a trigger threshold (γ).",
    points: [
      "H_0 (Null Hypothesis): No event occurred.",
      "H_1 (Alternative Hypothesis): An event occurred.",
      "If the threshold is too low, you detect everything but get constant False Alarms (P_FA). If too high, you eliminate alarms but get complete Misses (P_M)."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [06:38]"
    ],
    examples: [
      "Like the Parry Mechanism in combat. H_0 is the boss idling; parrying it is a False Alarm (P_FA) leaving you vulnerable. H_1 is a strike; missing the parry is a Miss (P_M). The threshold γ is your reaction window."
    ]
  },
  {
    title: "6. The Neyman-Pearson Criteria (Taming the Trade-Off)",
    summary: "The mathematical framework used to calculate the absolute best threshold by maximizing detection while capping false alarms.",
    points: [
      "You cannot simultaneously minimize False Alarms and maximize Detection perfectly.",
      "The rule: Maximize Probability of Detection (P_D) subject to the constraint that False Alarms (P_FA) do not exceed a strict, user-defined alpha tolerance (α)."
    ],
    formulas: [
      "\\text{Maximize } P_D \\quad \\text{subject to} \\quad P_{FA} \\le \\alpha"
    ],
    facts: [
      "Lecture reference: [01:11:02]"
    ],
    examples: [
      "Neyman-Pearson lets you dictate exactly how much risk your system can tolerate (e.g., max 5% false alarm rate) and squeezes out the highest possible sensitivity within that bound."
    ]
  },
  {
    title: "7. The ROC Curve & AUC (Your System's Build Quality)",
    summary: "The Receiver Operating Characteristics (ROC) Curve is a scatter plot mapping P_D against P_FA across every possible threshold value. The Area Under the Curve (AUC) scores the overall system.",
    points: [
      "The Diagonal Line represents pure random guessing.",
      "The closer the curve aggressively arches toward the top-left corner, the more flawless the detector is (high P_D, low P_FA).",
      "Integrating the area yields a single score from 0.5 to 1.0."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:08:29] and [01:09:50]"
    ],
    examples: [
      "ROC is a defensive backline executing an Offside Trap. A low AUC is a disorganized defense resulting in false alarms or misses. A high AUC is a perfectly drilled Mourinho-style block locking down the trap."
    ]
  },
  {
    title: "1. The Discretization Duels (Sampling vs. Quantization)",
    summary: "The physical world is analog and continuous, but a digital microcontroller only understands 1s and 0s. It must slice the world into discrete steps.",
    points: [
      "Sampling (Discretizing Time): Slicing a continuous timeline into fixed snapshot intervals (Δt). Too slow, and you drop frames and miss fast peaks.",
      "Quantization (Discretizing Amplitude): Slicing continuous real-world voltage levels into fixed, discrete numerical steps."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [04:59], [06:59], and [01:03:07]"
    ],
    examples: [
      "Tactical Football Pitch: Sampling is your camera frame-rate (missing quick feints if too slow). Quantization is dividing the pitch into a tactical grid (low resolution = 4 quadrants, high resolution = precise spatial tracking)."
    ]
  },
  {
    title: "2. The 10-Bit ADC Architecture (The 1024 Grid Lines)",
    summary: "The ATmega328P features an internal Analog-to-Digital Converter (ADC) with a 10-bit resolution profile.",
    points: [
      "A 10-bit resolution scale maps the incoming analog voltage (from 0V up to your reference voltage, usually 5V) onto a discrete integer scale of 1024 levels (0 to 1023).",
      "If your reference voltage is 5V, your minimum detectable step size is roughly 4.88mV. Any physical changes smaller than that fall into the same bucket and are invisible."
    ],
    formulas: [
      "\\[ \\text{Resolution Step Size} = \\frac{V_{ref}}{1024} \\]"
    ],
    facts: [
      "Lecture reference: [01:03:15]"
    ],
    examples: []
  },
  {
    title: "3. The 8-Bit Storage Dilemma (ADCL & ADCH)",
    summary: "The ADC outputs a 10-bit integer, but an 8-bit CPU cannot natively store it in a single register, forcing it to split the data.",
    points: [
      "The hardware forces the 10-bit result to split across two separate 8-bit registers: ADCL (ADC Low Byte) and ADCH (ADC High Byte).",
      "Your software must manually pull both pieces out at runtime and stitch them back together using a bitwise assembly combo: (ADCH << 8) | ADCL."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [58:13]"
    ],
    examples: [
      "Low-Poly RPG Gear: You loot a 10-bit broadsword but only have 8-bit slots. You store the hilt in ADCL and the blade in ADCH, manually stitching them together at runtime to swing the weapon."
    ]
  },
  {
    title: "4. The Left-Adjustment Hack (Min-Maxing Code Latency)",
    summary: "By triggering the ADLAR bit, you force the 10-bit ADC output into Left-Adjustment, allowing you to bypass bit-shifting latency if you only need 8-bit accuracy.",
    points: [
      "Right-Adjusted (Default): The lowest 8 bits fill ADCL, remaining 2 bleed into ADCH. Requires reading both and running bit shifts (Critical Processing Cost).",
      "Left-Adjusted (ADLAR = 1): The 8 most critical, high-impact bits slam entirely into ADCH.",
      "The Optimization Payoff: You can read only ADCH and ignore ADCL entirely. You downsize the pipeline to an instant 8-bit read, eliminating bit-shifting latency and shrinking your machine code footprint."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:00:56] and [01:01:02]"
    ],
    examples: []
  },
  {
    title: "1. Quantization Noise & Grid-Snapping (Precision Loss)",
    summary: "When an analog signal enters the ADC, the hardware maps a fluid real-world voltage onto a rigid digital number system. The difference between the actual incoming voltage and the closest digital step is the Quantization Error.",
    points: [
      "Increasing your resolution scale (e.g., from a crude 8-bit mesh to a 10-bit layout providing 1024 individual steps) shrinks the physical step-size, crushing the quantization noise floor."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [02:00] and [04:54]"
    ],
    examples: [
      "Low-Poly RPG Analogy: Think of this as Pixel Snapping. If a grid only allows characters to stand on absolute integers, a player at 2.4 is violently snapped to 2.0. That 0.4 rounding error is your Quantization Error. High-bit grids make voxels smaller, stopping spatial glitching."
    ]
  },
  {
    title: "2. Signal-to-Quantization-Noise Ratio (SQNR)",
    summary: "The formal mathematical metric used to calculate the sensory purity of your data stream.",
    points: [
      "This formula dictates that every single bit you allocate to your ADC hardware adds exactly 6 dB of clarity to your dynamic range."
    ],
    formulas: [
      "\\[ SQNR = 6.02N + 1.76 \\text{ dB} \\]"
    ],
    facts: [
      "Lecture reference: [06:55]"
    ],
    examples: [
      "Character Build Analogy: SQNR is your Sensory Perception Stat. An 8-bit build has a high noise floor, losing small signals in the fuzz. A 10-bit pipeline cleanly adds another 12 dB of separation, pushing fine targets clear out of the background noise."
    ]
  },
  {
    title: "3. Polling vs. Interrupts (CPU Frame Bottlenecks)",
    summary: "Analog-to-digital conversion takes a block of clock cycles to settle. Your code loop has two entirely different ways to wait for that data to cook.",
    points: [
      "Polling (Busy-Waiting): The code toggles the ADSC bit, then traps itself inside a tight while() loop, freezing the CPU 100% on that single line.",
      "Interrupts (Event-Driven): The code triggers the conversion and immediately jumps away. The hardware drops a flag when finished, pausing the main loop for a fraction of a microsecond.",
      "For complex systems, Polling is a critical bottleneck causing background diagnostic routines and security matrices to lag out completely."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:02:06] and [01:03:10]"
    ],
    examples: [
      "Tactical Football Pitch: Polling is a Manager screaming at a midfielder to run, freezing completely until the player crosses the line while ignoring the rest of the pitch. Interrupts are Strategic Management: call the play, scan the whole pitch, and just note when the player raises a hand to signal completion."
    ]
  },
  {
    title: "4. The 13-Cycle Freeze (The ADC Bottleneck)",
    summary: "An analog-to-digital conversion inside the ATmega328P doesn't happen instantly; it takes exactly 13 ADC clock cycles to process and lock down a value.",
    points: [
      "If your software uses polling to check the conversion flag, the CPU is completely frozen for those 13 cycles.",
      "During this freeze, the system is completely unable to process system diagnostics, run edge inference engines, or monitor other sensor feeds."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [05:29] and [06:26]"
    ],
    examples: []
  },
  {
    title: "5. The ISR Playbook (Interrupt Service Routines)",
    summary: "To free up the CPU, you trigger an Interrupt framework where the hardware runs the conversion independently. When finished, it forces the CPU to instantly jump to a specialized code block called an ISR.",
    points: [
      "The Golden Rule of ISRs: Keep it ultra-short. Never include heavy mathematical calculations, loops, or delay() statements.",
      "An ISR should only grab the 8-bit or 10-bit value from the registers, dump it into a global storage variable, and immediately exit."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [06:56] and [08:23]"
    ],
    examples: [
      "Low-Poly Combat Analogy: Polling is hitting attack and getting stuck in a 13-frame animation lock where you can't parry. An ISR is a Passive Counter-Attack Status: you move freely, and when an enemy hits your shield, the game triggers a lightning-fast 1-frame parry to ingest the event without breaking momentum."
    ]
  },
  {
    title: "6. Digital Serial Interfacing (The Clocked Data Matrix)",
    summary: "Instead of parsing raw, degrading analog voltages, the microcontroller talks to smart digital sensors by exchanging structured packets of data bit-by-bit.",
    points: [
      "To prevent data corruption, both chips must be perfectly synchronized.",
      "This requires a bi-directional synchronous bus where a shared Clock line (SCK) acts as the conductor, signaling exactly when to read and write every individual bit moving down the Data lines (MISO / MOSI)."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:04:20], [01:05:29], and [01:05:40]"
    ],
    examples: [
      "Tactical Football Pitch: Analog sensing is a chaotic route-one boot affected by wind and friction. Digital Serial Communication is a drilled, short-passing sequence strictly in rhythm with the referee's whistle (the clock). Every pass is a bit, ensuring zero data loss."
    ]
  },
  {
    title: "1. SPI (Serial Peripheral Interface) Core Mechanics",
    summary: "A synchronous, full-duplex (two-way simultaneous), Master-Slave communication protocol that allows a Microcontroller to fetch data from digital sensors incredibly fast using 4 dedicated wires.",
    points: [
      "SCK (Serial Clock): The heartbeat. Generated by the Master. Nothing happens unless the clock is ticking.",
      "MOSI (Master Out, Slave In): The megaphone. The Master sends commands or data to the sensor.",
      "MISO (Master In, Slave Out): The microphone. The sensor sends data back to the Master.",
      "SS / CS (Slave Select / Chip Select): The tap on the shoulder. Pulled LOW (0) to wake up a specific sensor on a shared line.",
      "The Shift Register: SPI does not send data sequentially; it swaps data. A forced 1-to-1 exchange of 8 bits every clock cycle."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [29:09], [30:13], [34:47], and [39:41]"
    ],
    examples: [
      "Action Points (SCK): No Action Points = Time is frozen. The Slave cannot speak or act unless the Master spends Action Points to drive the turn."
    ]
  },
  {
    title: "2. SPI Programming & The RPG Analogy",
    summary: "To code SPI, you manipulate three physical MCU registers (SPCR, SPSR, SPDR) to execute 'Target Locks' and 'Equivalent Exchanges' with your peripherals.",
    points: [
      "SPCR (Settings): Set MCU as Master, enable SPI, set clock speed.",
      "SPSR (Status): The notification bell that raises a flag when a transfer is complete.",
      "SPDR (Data): The loading dock. Write here to send; read from here to see what came back.",
      "Coding Flow: Target Lock (CS=LOW) -> Load SPDR -> Wait for animation (SPSR flag) -> Read SPDR -> Release Target (CS=HIGH)."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [40:25], [41:25], [43:15], and [55:08]"
    ],
    examples: [
      "Target Lock (CS): You can't yell 'Heal!' into the void; you must target the NPC by pulling CS LOW.",
      "The Read Exploit: You can't just take a stat sheet from an NPC. You hand them a 'Dummy Item' (0x00) to force the swap animation, making them hand you their stats in exchange."
    ]
  },
  {
    title: "3. I2C (Two-Wire Interface) Core Mechanics",
    summary: "A shared bus system allowing up to 128 devices to connect using only two wires. It uses an addressing system instead of dedicated Chip Select pins.",
    points: [
      "SCL (Serial Clock): The heartbeat generated by the Master.",
      "SDA (Serial Data): A single, shared, bi-directional data line used by both Master and all Slaves.",
      "Instead of a dedicated wire to wake up a sensor, I2C uses In-Band Addressing where the Master yells out a unique 7-bit ID onto the shared wire.",
      "The Trade-off: It saves massive amounts of wiring compared to SPI, but is slower and slightly more complex to program."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [12:45], [12:54], and [13:19]"
    ],
    examples: [
      "The Nightclub PA: The Master (Bouncer) uses the shared SDA wire (PA System) to shout out to the Slaves (Patrons) rather than walking up to them individually."
    ]
  },
  {
    title: "4. I2C Protocol Flow & The Nightclub Analogy",
    summary: "Communication on an I2C bus follows a strict chronological protocol managed by the Master: Start, Address, ACK, Data, Stop.",
    points: [
      "Start Condition (TWCR): Master pulls SDA low while SCL is high to grab everyone's attention.",
      "Address + R/W: Master sends the 7-bit address plus 1 bit to dictate Reading (1) or Writing (0).",
      "Acknowledge (ACK): The targeted sensor pulls SDA low to confirm presence. If no pull (NACK), the device is missing.",
      "Data Transfer: Sent in 8-bit chunks with an ACK after every chunk, ending with a Stop Condition (TWSTO)."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [17:08], [18:06], [18:48], [19:30], [21:01], and [24:05]"
    ],
    examples: [
      "The DJ Mic Drop (Start Condition): The Bouncer cuts the music to get everyone's attention.",
      "The Raised Hand (ACK): If Patron #0x68 is in the club when called over the PA, they raise their hand. If they don't (NACK), the Bouncer hangs up.",
      "Interrupts (Hiring a Helper): Instead of busy-waiting (staring at the patron for 10 minutes), the Bouncer uses an Interrupt (hires an assistant) to listen for the answer while he goes back to checking IDs."
    ]
  },
  {
    title: "2. The AC/DC Signal & SpO2 Algorithm",
    summary: "A pulse oximeter reads raw light intensity, separating it into a constant DC background and a fluctuating AC heartbeat signal to calculate oxygen levels.",
    points: [
      "The DC Component (Noise): About 98% of light absorption is constant, caused by skin, tissue, venous blood, and baseline arterial blood.",
      "The AC Component (Signal): The remaining 2% fluctuates because every systolic cycle pumps a fresh surge of arterial blood into the finger, changing the light absorption.",
      "The Algorithm: Extract the AC and DC components for both light streams, calculate the Ratio of Ratios (R), and apply the empirical calibration curve to get the percentage.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--accent); overflow-x: auto; margin-top: 10px;">
 RAW PHOTODIODE ABSORPTION
    |      __      __      __   <- AC (Pulsing Arterial Blood ~2%)
    |   __|  |____|  |____|  |__
    |  |------------------------| <- DC (Tissue, Bone, Venous ~98%)
    |  |                        |
    |__|________________________|
                 Time
      </pre>`
    ],
    formulas: [
      "\\[ R = \\frac{(AC_{Red} / DC_{Red})}{(AC_{IR} / DC_{IR})} \\]",
      "\\[ SpO_2 = aR^2 + bR + c \\]"
    ],
    facts: [
      "Lecture reference: [28:38], [31:04], [34:00], [38:09], and [43:24]"
    ],
    examples: [
      "The Pulse Check: The DC component is the club's constant baseline crowd. The AC component is the massive surge of new patrons rushing the floor when the DJ drops the bass (heartbeat). Comparing which bouncer gets stopped more during the drop gives the exact VIP to Regular ratio."
    ]
  },
  {
    title: "5. The Fourier Transform (Frequency Domain)",
    summary: "Transitioning from the Time Domain (intensity vs. time) to the Frequency Domain (intensity vs. repetition speed) to extract the true heart rate.",
    points: [
      "Instead of looking for peaks, the Fourier Transform asks: 'How many distinct repetitive patterns (frequencies) are mixed together to create this messy line?'",
      "A messy PPG signal is a combination of the slow heart pulse, random hand movement, and the 50/60Hz flicker of room lights.",
      "Fourier rips the data apart into frequency lanes. You ignore movement and ambient light, look only at the 1 to 3 Hz lane (60-180 BPM), and find the highest spike to get the true heart rate.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--success); overflow-x: auto; margin-top: 10px;">
 TIME DOMAIN (Messy)           FREQUENCY DOMAIN (Clean)
  |  /\\/\\/\\/\\/\\                 |        | (Target BPM Peak)
  | / \\/\\ /\\/ \\     ======>    |        |
  |/  /  \\  \\ /                |   |    |      | (Noise Peaks)
  +-------------               +---+----+------+---
       Time                          Frequency (Hz)
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [50:17]"
    ],
    examples: [
      "The Crowded Radio Station: You wiretap a room and hear an AC hum (60Hz), a ticking clock (1Hz), and whispers. Peak detection counts the clock and the hum. Fourier acts as an equalizer, ripping the audio into separate frequency lanes so you can isolate and listen purely to the whispers."
    ]
  },
  {
    title: "3. 1D Sliders (Spatial Tracking)",
    summary: "Pinpointing the exact location of a finger on a continuous strip by measuring the signal ratio between two ends.",
    points: [
      "Connect a sensing pin to both ends of a resistive/capacitive strip (Pin A and Pin B).",
      "Touching near Pin A causes a huge signal spike on A, and a small one on B.",
      "As you slide toward B, A drops and B rises. Calculating the difference/ratio maps the exact 1D coordinate.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--accent); overflow-x: auto; margin-top: 10px;">
 1D SPATIAL SLIDER
 [Pin A] ========================== [Pin B]
 (5V)                |               (0V)
                     V
                Finger Touch
        (Pin A: 3.8V, Pin B: 1.2V)
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [50:52]"
    ],
    examples: []
  },
  {
    title: "7. Code Division Multiple Access (CDMA)",
    summary: "How a receiver differentiates between multiple satellites broadcasting simultaneously on the exact same frequency (1575.42 MHz).",
    points: [
      "Each satellite multiplies its data by a unique, mathematical noise pattern (PRN Code) before broadcasting.",
      "The receiver contains a list of all noise patterns. It tests them sequentially on the incoming signal; when the correct pattern aligns, the satellite's data instantly decodes.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--warn); overflow-x: auto; margin-top: 10px;">
 SATELLITE CDMA MULTIPLEXING
 Data (1 bit):      [   1   ]           [   0   ]
 PRN Code (noise):  [1,0,1,0]           [1,0,1,0]
                    ---------           ---------
 Transmitted:       [1,0,1,0]           [0,1,0,1]
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [49:54]"
    ],
    examples: []
  },
  {
    title: "6. The Winding Machine Metaphor (Fourier Mechanics)",
    summary: "A visual analogy for how the Fourier Transform finds hidden frequencies by wrapping a signal around a circle and tracking its Center of Mass.",
    points: [
      "The Signal as a Wire: Imagine your messy time-series data is a long, colored wire.",
      "Wrapping the Wire: Wrap it around a circle at a specific speed (the Winding Frequency).",
      "Random Speed: The peaks and valleys overlap randomly, forming a symmetrical blob. The Center of Mass stays perfectly in the middle (0,0).",
      "The Resonance: If the wrapping speed exactly matches a hidden pattern (like the heartbeat), all peaks align on one side, and valleys on the other. The Center of Mass dramatically shifts away from the center.",
      "Plotting that Center of Mass shift across all possible wrapping speeds outputs a clean spike only at the frequencies that actually exist in the signal.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--accent2); overflow-x: auto; margin-top: 10px;">
 RANDOM SPEED (Center = 0,0)   RESONANT SPEED (Center Shifts)
        ,--,                           ,--,
      .'    '.                       .'    ======= (Peaks Align)
     /  + (0,0)\\                    /       \\
    |          |                   |     +   | (Center of Mass)
     \\        /                     \\       /
      '.    .'                       '.   .'
        '--'                           '--'
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [54:39], [01:05:37], and [01:06:29]"
    ],
    examples: []
  },
  {
    title: "1. Pulse Oximetry & Beer-Lambert's Law",
    summary: "Calculating SpO2 (oxygenated hemoglobin percentage) non-invasively by measuring how much Red and Infrared (IR) light is absorbed by arterial blood.",
    points: [
      "Beer-Lambert's Law: The amount of light absorbed depends on the path length, solute concentration, and the Extinction Coefficient.",
      "The Extinction Coefficient changes based on the light wavelength and blood oxygenation level.",
      "Deoxygenated blood absorbs more Red Light (~700 nm).",
      "Oxygenated blood absorbs more Infrared (IR) Light (~900 nm)."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [08:47], [17:43], [25:18], and [25:34]"
    ],
    examples: [
      "The Nightclub VIP Section: The Red and IR light waves are Bouncers trying to pass through the club. The Red Bouncers hate Regulars and get stopped easily by deoxygenated blood. The IR Bouncers hate VIPs and get stopped easily by oxygenated blood."
    ]
  },
  {
    title: "2. The AC/DC Signal & SpO2 Algorithm",
    summary: "A pulse oximeter reads raw light intensity, separating it into a constant DC background and a fluctuating AC heartbeat signal to calculate oxygen levels.",
    points: [
      "The DC Component (Noise): About 98% of light absorption is constant, caused by skin, tissue, venous blood, and baseline arterial blood.",
      "The AC Component (Signal): The remaining 2% fluctuates because every systolic cycle pumps a fresh surge of arterial blood into the finger, changing the light absorption.",
      "The Algorithm: Extract the AC and DC components for both light streams, calculate the Ratio of Ratios (R), and apply the empirical calibration curve to get the percentage."
    ],
    formulas: [
      "\\[ R = \\frac{(AC_{Red} / DC_{Red})}{(AC_{IR} / DC_{IR})} \\]",
      "\\[ SpO_2 = aR^2 + bR + c \\]"
    ],
    facts: [
      "Lecture reference: [28:38], [31:04], [34:00], [38:09], and [43:24]"
    ],
    examples: [
      "The Pulse Check: The DC component is the club's constant baseline crowd. The AC component is the massive surge of new patrons rushing the floor when the DJ drops the bass (heartbeat). Comparing which bouncer gets stopped more during the drop gives the exact VIP to Regular ratio."
    ]
  },
  {
    title: "3. Smartphone Photoplethysmography (PPG)",
    summary: "An optical technique to approximate a pulse oximeter using a smartphone's built-in white LED flash as the light source and the camera as the sensor.",
    points: [
      "You cover the flash and camera with your finger, and the camera records a video at a set framerate.",
      "Algorithms analyze the average Red pixel intensity of every frame over time.",
      "The rhythmic darkening and lightening of the frames correspond to the systolic and diastolic cycles, which allows for heart rate estimation."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [52:37] and [57:58]"
    ],
    examples: []
  },
  {
    title: "4. The Time-Domain Problem (Messy Signals)",
    summary: "Simple peak detection works for clean, resting heart rates, but fails completely when noise or movement is introduced into the signal.",
    points: [
      "If a person moves or exercises, or if there is ambient light noise, the raw signal gets flooded with false peaks.",
      "A simple algorithm will count every tiny erratic bump as a heartbeat, giving a wildly incorrect BPM.",
      "Smoothing the data (like taking a running average) is dangerous because it risks erasing the actual heartbeat signal entirely."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [46:06] and [48:00]"
    ],
    examples: []
  },
  {
    title: "5. The Fourier Transform (Frequency Domain)",
    summary: "Transitioning from the Time Domain (intensity vs. time) to the Frequency Domain (intensity vs. repetition speed) to extract the true heart rate.",
    points: [
      "Instead of looking for peaks, the Fourier Transform asks: 'How many distinct repetitive patterns (frequencies) are mixed together to create this messy line?'",
      "A messy PPG signal is a combination of the slow heart pulse, random hand movement, and the 50/60Hz flicker of room lights.",
      "Fourier rips the data apart into frequency lanes. You ignore movement and ambient light, look only at the 1 to 3 Hz lane (60-180 BPM), and find the highest spike to get the true heart rate."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [50:17]"
    ],
    examples: [
      "The Crowded Radio Station: You wiretap a room and hear an AC hum (60Hz), a ticking clock (1Hz), and whispers. Peak detection counts the clock and the hum. Fourier acts as an equalizer, ripping the audio into separate frequency lanes so you can isolate and listen purely to the whispers."
    ]
  },
  {
    title: "6. The Winding Machine Metaphor (Fourier Mechanics)",
    summary: "A visual analogy for how the Fourier Transform finds hidden frequencies by wrapping a signal around a circle and tracking its Center of Mass.",
    points: [
      "The Signal as a Wire: Imagine your messy time-series data is a long, colored wire.",
      "Wrapping the Wire: Wrap it around a circle at a specific speed (the Winding Frequency).",
      "Random Speed: The peaks and valleys overlap randomly, forming a symmetrical blob. The Center of Mass stays perfectly in the middle (0,0).",
      "The Resonance: If the wrapping speed exactly matches a hidden pattern (like the heartbeat), all peaks align on one side, and valleys on the other. The Center of Mass dramatically shifts away from the center.",
      "Plotting that Center of Mass shift across all possible wrapping speeds outputs a clean spike only at the frequencies that actually exist in the signal."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [54:39], [01:05:37], and [01:06:29]"
    ],
    examples: []
  },
  {
    title: "1. The Winding Machine Math (DFT)",
    summary: "Mathematically maps linear time-series data onto a circular/polar coordinate system to find prominent repeating frequencies.",
    points: [
      "If you wind data around a circle $f$ times, one full rotation is $2\\pi$ radians. The total angle spanned is $2\\pi f$.",
      "If data is collected at $k$ samples per second, the angle gap between each individual sample is $2\\pi f / k$."
    ],
    formulas: [
      "\\[ \\phi_n = \\frac{2\\pi f}{k} \\times n \\]",
      "\\[ Weight(f) = \\frac{1}{N} \\sum_{n=0}^{N-1} A_n \\times e^{j \\left(\\frac{2\\pi f}{k}\\right) n} \\]"
    ],
    facts: [
      "Lecture reference: [15:52], [16:59], and [38:00]"
    ],
    examples: [
      "The Radar Ping: You test different rotation speeds ($f$) to match an enemy ship's holding pattern. When speeds match, the noise cancels at (0,0), but the 'Average Position' (Center of Mass) violently pulls toward the ship, confirming the target lock."
    ]
  },
  {
    title: "2. Sample Size & Signal-to-Noise Ratio (SNR)",
    summary: "Processing larger amounts of data (like 32 seconds instead of 5) does not increase your maximum detectable frequency, but it drastically improves your SNR.",
    points: [
      "Random environmental noise tends to cancel itself out when wrapped around the circle thousands of times.",
      "The true repeating signal (like a heartbeat) stacks up perfectly, creating a massive, distinct peak rising high above the noise floor."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:02:41]"
    ],
    examples: []
  },
  {
    title: "3. The Nyquist Sampling Theorem (The Speed Limit)",
    summary: "Before you can trust any FFT output, you must mathematically ensure your hardware is sampling fast enough to see the frequency.",
    points: [
      "The Rule: To successfully track a frequency of $F$ Hertz, your hardware must sample data at a rate of at least $2F$ samples per second."
    ],
    formulas: [
      "\\[ F_{max} = \\frac{S}{2} \\]"
    ],
    facts: [
      "Lecture reference: [31:05]"
    ],
    examples: [
      "If a chicken sneeze contains 4,000 Hz frequencies, your USB mic must sample at a minimum of 8,000 samples per second, or the math breaks.",
      "If a sensor collects 50 samples/sec, the maximum frequency it can see is 25 Hz. A 60 Hz electrical noise will be mathematically invisible/corrupted."
    ]
  },
  {
    title: "4. Negative Frequencies (The FFT Mirror)",
    summary: "When you run an FFT on $N$ samples, it spits out $N$ frequency bins, but the second half is a useless mirror-image reflection representing negative frequencies.",
    points: [
      "Mathematically, these represent the winding machine turning in the opposite direction.",
      "In your Python arrays, you must always slice the FFT output to keep only the first half [0 : N/2]."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [11:04]"
    ],
    examples: []
  },
  {
    title: "5. Spectrograms (Time & Frequency)",
    summary: "A 2D image created by chopping a long stream of data into small sliding windows, performing an FFT on each, and stacking them chronologically.",
    points: [
      "The standard FFT assumes frequencies are constant. A Spectrogram allows you to track dynamic events that change over time.",
      "The Result: A 2D matrix where the X-axis is Time, the Y-axis is Frequency, and the color brightness indicates the Prominence."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [59:19] and [01:06:44]"
    ],
    examples: [
      "The Tactical Heatmap: A single FFT tells you a player averaged 10 km/h over 90 mins. A Spectrogram slices the match into 5-minute windows, showing exactly when they were walking vs. executing explosive counter-attack sprints."
    ]
  },
  {
    title: "6. The Edge Audio Pipeline (Code Logic)",
    summary: "The strict 4-step Python pipeline used to convert raw microphone audio into a 2D image for Convolutional Neural Networks.",
    points: [
      "1. Slice the Array: Take a chunk of incoming data (e.g., 0.5 seconds).",
      "2. Run the Algorithm: Pass it through the FFT, which runs in highly efficient $O(N \\log N)$ time.",
      "3. Drop the Ghosts: Slice the array in half to throw away the negative frequency mirror.",
      "4. Slide & Stack: Slide the window forward with a slight overlap, repeat, and stack the arrays to form the 2D image."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [54:52] and [01:08:53]"
    ],
    examples: [
      "Weaponizing FFT Size: Small FFT (The Dagger) gives fast attack speed (high time resolution) but terrible noise filtering. Large FFT (The Greatsword) is slow (low time resolution) but has a massive hit-box that easily slices through random noise."
    ]
  },
  {
    title: "1. Resistive Touch Sensing & Coordinate Mapping",
    summary: "A touch sensing modality that reads physical touch as an analog voltage drop across a continuous resistive gradient by bridging two flexible conductive layers.",
    points: [
      "The modality spans from simple binary switches to continuous multi-variable tracking.",
      "One layer maps the X-axis, the other maps the Y-axis. The physical finger press forces the layers to touch, creating a temporary voltage divider circuit."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [06:51], [57:08], and [58:48]"
    ],
    examples: [
      "The Tactical Offsets: X-Axis Read (Offside Trap Check). String a 5V to 0V line horizontally. A defender drops vertically to tag the striker. The exact voltage drop gives the horizontal percentage, completely independent of the vertical position."
    ]
  },
  {
    title: "2. The Two-Phase MCU Scheduling Routine",
    summary: "To resolve precise 2D coordinates using a single analog-to-digital converter (ADC), the Microcontroller rapidly flip-flops the active voltage gradients.",
    points: [
      "Phase 1 (X-Coordinate): 5V applied horizontally across the X-layer. The Y-layer acts as a voltage probe to read the contact point.",
      "Phase 2 (Y-Coordinate): 5V applied vertically across the Y-layer. The X-layer instantly switches to act as the voltage probe.",
      "The Master Loop: The MCU schedules this flip-flop routine thousands of times per second to stream a flawless coordinate map."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [58:23], [01:00:05], [01:00:18], and [01:01:34]"
    ],
    examples: [
      "Character Weapon Weight: A light tap barely closes the physical gap, yielding standard coordinate stats (a basic light swing). A heavy press crushes the conductive elements tighter together, drastically changing contact resistance tolerances. The engine detects this spike in current density and registers it as a Critical Heavy Strike."
    ]
  },
  {
    title: "3. Capacitive Touch Sensing (Solid-State)",
    summary: "Eliminates mechanical parts by relying on the human body acting as a massive electrical conductor to alter local electrostatic fields.",
    points: [
      "Mechanical buttons are plagued by fatigue, wear-and-tear, and high real-estate footprints.",
      "Capacitive sensing offers massive configuration flexibility (dynamic buttons, sliders) and drops overall system costs.",
      "When a finger approaches an electrode, it alters the local electrostatic field, introducing a measurable shift in capacitance."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [05:04] and [09:02]"
    ],
    examples: []
  },
  {
    title: "4. The RC Timer Mechanism (Measuring Time, Not Voltage)",
    summary: "Microcontrollers cannot easily measure capacitance directly. Instead, they treat the sensor pad as an RC circuit and measure the time it takes to charge.",
    points: [
      "Baseline State (No Touch): The circuit has a natural resistor and baseline capacitance. It takes a constant, specific amount of time to charge.",
      "Touch State (Finger Present): The human body adds parallel capacitance. Capacitors in parallel add together, forcing the time constant to expand.",
      "Because the total capacitance increased, the circuit demands more time to fill up to the logic threshold voltage.",
      "The MCU counts CPU cycles. If the charge time spikes beyond a baseline deviation, the algorithm registers a confirmed Touch Event."
    ],
    formulas: [
      "\\[ \\tau = R \\times C_{baseline} \\]",
      "\\[ C_{total} = C_{baseline} + C_{human} \\]"
    ],
    facts: [
      "Lecture reference: [44:48], [01:07:37], [01:07:54], [01:09:02], [01:09:21], [01:09:44], [01:10:35], and [01:10:57]"
    ],
    examples: [
      "The Mana Pool: The resistor is your Mana Regen Rate. A Level 1 Mana Pool fills quickly. A finger touch acts like equipping 'Finger Armor' that buffs your Max Mana (increases Capacitance). With the exact same Regen Rate, it takes way longer (more frames) to fill this massively upgraded pool."
    ]
  },
  {
    title: "5. Low-Level Code Optimization & Noise Averaging",
    summary: "Code techniques used to make capacitive touch loops run with zero latency and high accuracy against environmental noise.",
    points: [
      "To achieve zero-latency loops, you must avoid slow API functions like digitalRead().",
      "Instead, read the hardware Port Registers (like PORTD, PIND, DDRD) using bitwise operations to check pin states in a single CPU cycle.",
      "Averaging Beats Noise: A single loop is prone to noise. Execute the charge/discharge loop 10 to 50 times rapidly, sum up the delta values, and use the average as a low-pass filter."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [29:56], [54:12], [56:19], and [01:04:57]"
    ],
    examples: [
      "The Tactical Payload Push: Your objective is to push the Payload (Voltage) from Spawn to Checkpoint. Normally it takes 10 seconds. An enemy tank (the Finger) steps onto the track, adding parasitic drag (Capacitance). Because the payload is heavier, it takes 25 seconds. The system flags the 15 second delay as a Touch Detection."
    ]
  },
  {
    title: "1. The Auto-Zero Filter (Dynamic Calibration)",
    summary: "Raw charge time is noisy and drifts with the environment. To build a robust touch system, you must constantly subtract the baseline noise.",
    points: [
      "A humid room or a long wire will permanently increase the baseline capacitance, breaking hard-coded thresholds.",
      "The Logic: Maintain a rolling history of the lowest recent delta values to represent the 'untouched' baseline.",
      "The Calculation: Current Delta - Baseline History. Slow environmental shifts are canceled out, while fast human touches spike cleanly near zero."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [10:05] and [11:46]"
    ],
    examples: [
      "The Sniper Scope: Aiming dead center (Raw Delta) misses because changing wind (humidity) pushes the bullet. You use a spotter to calculate the wind (Baseline) and dial it into the scope. When you pull the trigger, you only worry about the target, not the wind."
    ]
  },
  {
    title: "2. Proximity Sensing & Aggro Radius",
    summary: "Increasing the physical surface area of the sensing electrode expands its electric field, allowing it to detect a human body without physical contact.",
    points: [
      "When a hand enters this extended field, the body acts as a virtual capacitor linked to the ground.",
      "Proximity signals are extremely weak (low SNR). To see them, you must drastically increase the number of samples in your loop (e.g., sum up 100 cycles) to average out the noise.",
      "Averaging acts as an aggressive Low-Pass Filter, smoothing out high-frequency electrical noise so only the slow human movements remain."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [36:01], [37:08], [40:41], and [44:03]"
    ],
    examples: [
      "The MMO Aggro Radius: A tiny pin electrode is a weak mob; you must physically touch it. A large aluminum plate is an Elite Boss with a massive Aggro Radius; walking into its zone triggers the alert."
    ]
  },
  {
    title: "3. 1D Sliders (Spatial Tracking)",
    summary: "Pinpointing the exact location of a finger on a continuous strip by measuring the signal ratio between two ends.",
    points: [
      "Connect a sensing pin to both ends of a resistive/capacitive strip (Pin A and Pin B).",
      "Touching near Pin A causes a huge signal spike on A, and a small one on B.",
      "As you slide toward B, A drops and B rises. Calculating the difference/ratio maps the exact 1D coordinate."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [50:52]"
    ],
    examples: []
  },
  {
    title: "4. Swept Frequency Sensing (Material Fingerprinting)",
    summary: "Hitting a sensor with a sweeping range of AC frequencies to find its resonant peak, which shifts uniquely depending on the material touching it.",
    points: [
      "Capacitance isn't binary; it changes based on material (water vs. apple).",
      "When an object touches the sensor, the resonant frequency shifts, creating a highly detailed material 'fingerprint'.",
      "Square Waves are Messy: Arduino outputs square waves filled with harmonics that ruin readings. You must use a hardware LC filter to smooth it into a pure sine wave."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:03:06] and [01:11:44]"
    ],
    examples: [
      "Sweeping for Weaknesses: Normal attacks (DC) do nothing. You rapid-fire every elemental magic (Swept Frequency). The boss takes critical damage at Level 45 Fire (Resonance). If the boss equips a new shield (touch event), the weakness shifts to Level 30 Ice. Tracking this identifies the shield."
    ]
  },
  {
    title: "5. GPS Core Mechanics (Time of Flight)",
    summary: "Localization is solving a geometry problem. The receiver calculates its distance from satellites by measuring the Time of Flight of incoming signals.",
    points: [
      "Satellites broadcast their known coordinates and the exact time the message was sent.",
      "The receiver notes its own time upon arrival and calculates distance: Time × Speed of Light = Distance."
    ],
    formulas: [],
    facts: [],
    examples: []
  },
  {
    title: "6. The 4 Satellite Requirement (Clock Bias)",
    summary: "To get a 3D coordinate fix, you strictly require signals from at least 4 satellites due to hardware desynchronization.",
    points: [
      "GPS satellites use multi-million dollar atomic clocks; smartphones use cheap quartz crystals. The receiver's clock is always slightly wrong.",
      "A 1-millisecond clock error multiplied by the speed of light causes a 300 km distance miscalculation.",
      "The receiver's clock error (b) is treated as a 4th unknown variable alongside x, y, and z. Solving a 4-variable equation requires 4 intersecting spheres."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [10:55], [23:44], and [41:56]"
    ],
    examples: [
      "The Server Ping: Your PC (Receiver) clock is desynced from the Server (Satellite). To fix the massive lag calculation, the game engine uses pings from 4 different servers simultaneously to figure out exactly how badly your PC clock is drifting, fixes it, and calculates your true location."
    ]
  },
  {
    title: "7. Code Division Multiple Access (CDMA)",
    summary: "How a receiver differentiates between multiple satellites broadcasting simultaneously on the exact same frequency (1575.42 MHz).",
    points: [
      "Each satellite multiplies its data by a unique, mathematical noise pattern (PRN Code) before broadcasting.",
      "The receiver contains a list of all noise patterns. It tests them sequentially on the incoming signal; when the correct pattern aligns, the satellite's data instantly decodes."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [49:54]"
    ],
    examples: []
  },
  {
    title: "8. Geometric Dilution of Precision (GDOP)",
    summary: "Having 4 satellites isn't enough; their physical arrangement in the sky directly dictates the accuracy of your location fix.",
    points: [
      "Real-world signals have noise, meaning calculated distances are thick, blurry bands, not perfect lines.",
      "Collinear (Bad GDOP): If satellites are clumped together, their bands intersect at shallow angles, creating a massive, elongated blob of uncertainty.",
      "Orthogonal (Good GDOP): If satellites are spread perfectly across the sky (overhead, N, E, W), their bands intersect at harsh 90-degree angles, creating a tiny, hyper-accurate intersection point."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [56:53], [01:04:40], [01:06:31], and [01:08:18]"
    ],
    examples: [
      "The Sniper Crossfire: Collinear GDOP is three teammates hiding behind the same rock; tracing the enemy bullet lines back creates a vague, parallel cone. Orthogonal GDOP is spreading teammates far apart; the bullet lines intersect at hard angles right on the sniper's window."
    ]
  },
  {
    title: "1. The Auto-Zero Filter (Dynamic Calibration)",
    summary: "Raw charge time is noisy and drifts with the environment. To build a robust touch system, you must constantly subtract the baseline noise.",
    points: [
      "A humid room or a long wire will permanently increase the baseline capacitance, breaking hard-coded thresholds.",
      "The Logic: Maintain a rolling history of the lowest recent delta values to represent the 'untouched' baseline.",
      "The Calculation: Current Delta - Baseline History. Slow environmental shifts are canceled out, while fast human touches spike cleanly near zero.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--accent); overflow-x: auto; margin-top: 10px;">
 RAW SIGNAL (Drifting)      FILTERED SIGNAL (Auto-Zero)
    Touch!                      Touch!
      /\\                          /\\
     /  \\    / (Baseline)        /  \\
    /    \\  /                   /    \\
 --/      \\/             ------/      \\-------- (Zero Baseline)
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [10:05] and [11:46]"
    ],
    examples: [
      "The Sniper Scope: Aiming dead center (Raw Delta) misses because changing wind (humidity) pushes the bullet. You use a spotter to calculate the wind (Baseline) and dial it into the scope. When you pull the trigger, you only worry about the target, not the wind."
    ]
  },
  {
    title: "8. Geometric Dilution of Precision (GDOP)",
    summary: "Having 4 satellites isn't enough; their physical arrangement in the sky directly dictates the accuracy of your location fix.",
    points: [
      "Real-world signals have noise, meaning calculated distances are thick, blurry bands, not perfect lines.",
      "Collinear (Bad GDOP): If satellites are clumped together, their bands intersect at shallow angles, creating a massive, elongated blob of uncertainty.",
      "Orthogonal (Good GDOP): If satellites are spread perfectly across the sky (overhead, N, E, W), their bands intersect at harsh 90-degree angles, creating a tiny, hyper-accurate intersection point.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--accent); overflow-x: auto; margin-top: 10px;">
 POOR GDOP (Collinear)       GOOD GDOP (Orthogonal)
    [Sat] [Sat]                     [Sat]
      \\   /                           |
       \\ /                          --+-- [Sat]
      [User]                        [User]
 (Large error zone)            (Pinpoint accuracy)
      </pre>`
    ],
    formulas: [],
    facts: [
      "Lecture reference: [56:53], [01:04:40], [01:06:31], and [01:08:18]"
    ],
    examples: [
      "The Sniper Crossfire: Collinear GDOP is three teammates hiding behind the same rock; tracing the enemy bullet lines back creates a vague, parallel cone. Orthogonal GDOP is spreading teammates far apart; the bullet lines intersect at hard angles right on the sniper's window."
    ]
  },
  {
    title: "2. Single-Sided Two-Way Ranging (SS-TWR)",
    summary: "Devices use a packet 'ping-pong' exchange to measure relative time intervals on their own internal clocks, bypassing the need for absolute time synchronization.",
    points: [
      "The Launch: Device A logs timestamp T1 and fires a Poll packet.",
      "The Intermission: Device B catches it at T2, processes it, and fires a reply at T3. The Processing Delay is (T3 - T2).",
      "The Return: Device A logs T4 upon receiving the reply.",
      "The Math: Device A calculates the total round-trip time (T4 - T1) and subtracts Device B's processing delay. Dividing the remainder by 2 yields the true one-way flight time."
    ],
    formulas: [
      "\\[ \\text{ToF} = \\frac{T_{round} - T_{reply}}{2} \\]"
    ],
    facts: [
      "Lecture reference: [01:10:25] and [01:11:18]"
    ],
    examples: [
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--success); overflow-x: auto; margin-bottom: 10px;">
 DEVICE A                       DEVICE B
 [T1] ---(Poll Packet)--------> [T2]
                                 | (Processing Delay: T3 - T2)
 [T4] <---(Reply Packet)------- [T3]

 ToF = ((T4 - T1) - (T3 - T2)) / 2
      </pre>`,
      "The Football 'One-Two': The Manager takes the total duration of the passing play (T4 - T1) and subtracts the exact time the Striker spent holding the ball at his feet (T3 - T2). The remaining time is the pure flight-time of the ball, completely independent of whatever watch the Striker is wearing."
    ]
  },
  {
    title: "6. Angle of Arrival (AoA)",
    summary: "Removes the need for multiple synchronized base stations. A single anchor point can determine the exact direction of an incoming signal by tracking wave physics.",
    points: [
      "The receiver node is equipped with multiple antenna elements separated by a fixed, ultra-precise sub-wavelength distance.",
      "When a radio wave hits from an angle, it strikes Antenna 1 slightly before it travels the extra distance to hit Antenna 2.",
      "The receiver measures this minuscule Phase Shift and uses trigonometry to calculate the precise incoming angle.",
      `<pre style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; color: var(--accent); overflow-x: auto; margin-top: 10px;">
 Incoming Radio Wave
    \\   \\   \\
     \\   \\   \\  <- Phase Delay (Δφ) measured here
      \\   \\   \\
     [Ant1]---[Ant2]
      (Distance: d)
      </pre>`
    ],
    formulas: [
      "\\[ \\theta = \\arcsin\\left(\\frac{\\lambda \\cdot \\Delta \\phi}{2\\pi \\cdot d}\\right) \\]"
    ],
    facts: [
      "Lecture reference: [01:03:24]"
    ],
    examples: [
      "Fighting Game Sound Localization: Hearing a gunshot in stereo headphones. The wave hits your left ear slightly before your right. Your brain registers the microsecond phase delay, converting it into a directional vector so you can aim blindly at the threat without a second reference point."
    ]
  },
  {
    title: "1. The Auto-Zero Filter (Dynamic Calibration)",
    summary: "Raw charge time is noisy and drifts with the environment. To build a robust touch system, you must constantly subtract the baseline noise.",
    points: [
      "A humid room or a long wire will permanently increase the baseline capacitance, breaking hard-coded thresholds.",
      "The Logic: Maintain a rolling history of the lowest recent delta values to represent the 'untouched' baseline.",
      "The Calculation: Current Delta - Baseline History. Slow environmental shifts are canceled out, while fast human touches spike cleanly near zero."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [10:05] and [11:46]"
    ],
    examples: [
      "The Sniper Scope: Aiming dead center (Raw Delta) misses because changing wind (humidity) pushes the bullet. You use a spotter to calculate the wind (Baseline) and dial it into the scope. When you pull the trigger, you only worry about the target, not the wind."
    ]
  },
  {
    title: "2. Proximity Sensing & Aggro Radius",
    summary: "Increasing the physical surface area of the sensing electrode expands its electric field, allowing it to detect a human body without physical contact.",
    points: [
      "When a hand enters this extended field, the body acts as a virtual capacitor linked to the ground.",
      "Proximity signals are extremely weak (low SNR). To see them, you must drastically increase the number of samples in your loop (e.g., sum up 100 cycles) to average out the noise.",
      "Averaging acts as an aggressive Low-Pass Filter, smoothing out high-frequency electrical noise so only the slow human movements remain."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [36:01], [37:08], [40:41], and [44:03]"
    ],
    examples: [
      "The MMO Aggro Radius: A tiny pin electrode is a weak mob; you must physically touch it. A large aluminum plate is an Elite Boss with a massive Aggro Radius; walking into its zone triggers the alert."
    ]
  },
  {
    title: "3. 1D Sliders (Spatial Tracking)",
    summary: "Pinpointing the exact location of a finger on a continuous strip by measuring the signal ratio between two ends.",
    points: [
      "Connect a sensing pin to both ends of a resistive/capacitive strip (Pin A and Pin B).",
      "Touching near Pin A causes a huge signal spike on A, and a small one on B.",
      "As you slide toward B, A drops and B rises. Calculating the difference/ratio maps the exact 1D coordinate."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [50:52]"
    ],
    examples: []
  },
  {
    title: "4. Swept Frequency Sensing (Material Fingerprinting)",
    summary: "Hitting a sensor with a sweeping range of AC frequencies to find its resonant peak, which shifts uniquely depending on the material touching it.",
    points: [
      "Capacitance isn't binary; it changes based on material (water vs. apple).",
      "When an object touches the sensor, the resonant frequency shifts, creating a highly detailed material 'fingerprint'.",
      "Square Waves are Messy: Arduino outputs square waves filled with harmonics that ruin readings. You must use a hardware LC filter to smooth it into a pure sine wave."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:03:06] and [01:11:44]"
    ],
    examples: [
      "Sweeping for Weaknesses: Normal attacks (DC) do nothing. You rapid-fire every elemental magic (Swept Frequency). The boss takes critical damage at Level 45 Fire (Resonance). If the boss equips a new shield (touch event), the weakness shifts to Level 30 Ice. Tracking this identifies the shield."
    ]
  },
  {
    title: "5. GPS Core Mechanics (Time of Flight)",
    summary: "Localization is solving a geometry problem. The receiver calculates its distance from satellites by measuring the Time of Flight of incoming signals.",
    points: [
      "Satellites broadcast their known coordinates and the exact time the message was sent.",
      "The receiver notes its own time upon arrival and calculates distance: Time × Speed of Light = Distance."
    ],
    formulas: [],
    facts: [],
    examples: []
  },
  {
    title: "6. The 4 Satellite Requirement (Clock Bias)",
    summary: "To get a 3D coordinate fix, you strictly require signals from at least 4 satellites due to hardware desynchronization.",
    points: [
      "GPS satellites use multi-million dollar atomic clocks; smartphones use cheap quartz crystals. The receiver's clock is always slightly wrong.",
      "A 1-millisecond clock error multiplied by the speed of light causes a 300 km distance miscalculation.",
      "The receiver's clock error (b) is treated as a 4th unknown variable alongside x, y, and z. Solving a 4-variable equation requires 4 intersecting spheres."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [10:55], [23:44], and [41:56]"
    ],
    examples: [
      "The Server Ping: Your PC (Receiver) clock is desynced from the Server (Satellite). To fix the massive lag calculation, the game engine uses pings from 4 different servers simultaneously to figure out exactly how badly your PC clock is drifting, fixes it, and calculates your true location."
    ]
  },
  {
    title: "7. Code Division Multiple Access (CDMA)",
    summary: "How a receiver differentiates between multiple satellites broadcasting simultaneously on the exact same frequency (1575.42 MHz).",
    points: [
      "Each satellite multiplies its data by a unique, mathematical noise pattern (PRN Code) before broadcasting.",
      "The receiver contains a list of all noise patterns. It tests them sequentially on the incoming signal; when the correct pattern aligns, the satellite's data instantly decodes."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [49:54]"
    ],
    examples: []
  },
  {
    title: "8. Geometric Dilution of Precision (GDOP)",
    summary: "Having 4 satellites isn't enough; their physical arrangement in the sky directly dictates the accuracy of your location fix.",
    points: [
      "Real-world signals have noise, meaning calculated distances are thick, blurry bands, not perfect lines.",
      "Collinear (Bad GDOP): If satellites are clumped together, their bands intersect at shallow angles, creating a massive, elongated blob of uncertainty.",
      "Orthogonal (Good GDOP): If satellites are spread perfectly across the sky (overhead, N, E, W), their bands intersect at harsh 90-degree angles, creating a tiny, hyper-accurate intersection point."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [56:53], [01:04:40], [01:06:31], and [01:08:18]"
    ],
    examples: [
      "The Sniper Crossfire: Collinear GDOP is three teammates hiding behind the same rock; tracing the enemy bullet lines back creates a vague, parallel cone. Orthogonal GDOP is spreading teammates far apart; the bullet lines intersect at hard angles right on the sniper's window."
    ]
  },
  {
    title: "1. The Local Ranging Problem (Clock Desync)",
    summary: "When tracking devices indoors (Wi-Fi, Bluetooth, UWB), you cannot rely on atomic clocks. Standard One-Way Time of Flight (ToF) fails because local devices have drifting, unsynchronized clocks.",
    points: [
      "The Core Hack (Matrix Least Squares): When tracking more than 4 baseline stations (anchors), the system is overdetermined.",
      "To eliminate noise, the equations are packed into a linear system AX = B and solved using the pseudo-inverse formula."
    ],
    formulas: [
      "\\[ X = (A^T A)^{-1} A^T B \\]"
    ],
    facts: [],
    examples: []
  },
  {
    title: "2. Single-Sided Two-Way Ranging (SS-TWR)",
    summary: "Devices use a packet 'ping-pong' exchange to measure relative time intervals on their own internal clocks, bypassing the need for absolute time synchronization.",
    points: [
      "The Launch: Device A logs timestamp T1 and fires a Poll packet.",
      "The Intermission: Device B catches it at T2, processes it, and fires a reply at T3. The Processing Delay is (T3 - T2).",
      "The Return: Device A logs T4 upon receiving the reply.",
      "The Math: Device A calculates the total round-trip time (T4 - T1) and subtracts Device B's processing delay. Dividing the remainder by 2 yields the true one-way flight time."
    ],
    formulas: [
      "\\[ \\text{ToF} = \\frac{T_{round} - T_{reply}}{2} \\]"
    ],
    facts: [
      "Lecture reference: [01:10:25] and [01:11:18]"
    ],
    examples: [
      "The Football 'One-Two': The Manager takes the total duration of the passing play (T4 - T1) and subtracts the exact time the Striker spent holding the ball at his feet (T3 - T2). The remaining time is the pure flight-time of the ball, completely independent of whatever watch the Striker is wearing."
    ]
  },
  {
    title: "3. The Clock Drift Vulnerability & SDS-TWR",
    summary: "If Device B's internal clock ticks slightly faster or slower than Device A's, a long processing delay scales up that error exponentially.",
    points: [
      "Symmetric Double-Sided Two-Way Ranging (SDS-TWR) adds a third packet to the sequence, creating a symmetric double round-trip.",
      "By executing opposite round-trip combos, the clock drift multiplier mirrors itself and cancels out entirely, unlocking ultra-reliable millimeter-level accuracy."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:12:40] and [01:14:23]"
    ],
    examples: [
      "RPG Cooldown Multipliers: If an unregistered stat debuff causes your clock to run 1% slower, a standard single-sided cast scales the error up, throwing your position off. SDS-TWR forces a mandatory cross-cast combination back to the initiator, perfectly canceling the timing debuff."
    ]
  },
  {
    title: "4. Ultra-Wideband (UWB) Dominance",
    summary: "Unlike Wi-Fi or Bluetooth which estimate distance via highly unstable signal strength (RSSI), UWB transmits incredibly sharp, nanosecond-wide pulses across a massive bandwidth.",
    points: [
      "This sharpness allows the receiver hardware to pinpoint the exact arrival of the first, direct light-path pulse, successfully ignoring delayed, bounced multipath reflections."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:15:54]"
    ],
    examples: []
  },
  {
    title: "5. Time Difference of Arrival (TDoA)",
    summary: "Offloads the clock sync burden from the mobile target. The target fires a raw pulse, and multiple synchronized anchors log when they receive it.",
    points: [
      "The system computes the time delta between anchors receiving the signal.",
      "Multiplying the delta by the Speed of Light calculates a constant difference in distance, mapping a hyperbolic line of position.",
      "The intersection of multiple hyperbolas pins the exact location.",
      "TDoA vs ToF: Because the mobile tag only sends a single packet and sleeps (instead of ping-ponging), TDoA is the gold standard for tracking thousands of low-power tags without crowding radio bandwidth."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [09:45] and [11:46]"
    ],
    examples: [
      "The Tactical Offside Trap: A striker shouts 'Pass!'. A Left Back and Right Back (Synchronized Anchors) hear it at slightly different times based on proximity. By tracking the time delay between his defenders reacting, the Manager draws a tactical trajectory map to pinpoint the striker's zone."
    ]
  },
  {
    title: "6. Angle of Arrival (AoA)",
    summary: "Removes the need for multiple synchronized base stations. A single anchor point can determine the exact direction of an incoming signal by tracking wave physics.",
    points: [
      "The receiver node is equipped with multiple antenna elements separated by a fixed, ultra-precise sub-wavelength distance.",
      "When a radio wave hits from an angle, it strikes Antenna 1 slightly before it travels the extra distance to hit Antenna 2.",
      "The receiver measures this minuscule Phase Shift and uses trigonometry to calculate the precise incoming angle."
    ],
    formulas: [
      "\\[ \\theta = \\arcsin\\left(\\frac{\\lambda \\cdot \\Delta \\phi}{2\\pi \\cdot d}\\right) \\]"
    ],
    facts: [
      "Lecture reference: [01:03:24]"
    ],
    examples: [
      "Fighting Game Sound Localization: Hearing a gunshot in stereo headphones. The wave hits your left ear slightly before your right. Your brain registers the microsecond phase delay, converting it into a directional vector so you can aim blindly at the threat without a second reference point."
    ]
  },
  {
    title: "7. The Multipath Corruption (AoA Vulnerability)",
    summary: "AoA math assumes the radio wave is traveling in a perfectly straight line from the target.",
    points: [
      "Indoors, signals bounce off concrete walls and metal pillars.",
      "If a bounced reflection hits the antenna array instead of the direct path, the phase calculation breaks entirely, mapping a phantom angle.",
      "You strictly require clear Line-of-Sight (LoS) for AoA to remain accurate."
    ],
    formulas: [],
    facts: [],
    examples: []
  },
  {
    title: "1. Relative Localization & MDS Pipeline",
    summary: "Architectural overview mapping multi-node cross-ping relative distances into a geometric layout via Multidimensional Scaling (MDS).",
    points: [
      "Captures a fully decentralized coordinate mapping sequence.",
      "Requires an O(N²) Euclidean Distance Matrix (EDM) to compute structural topologies."
    ],
    formulas: [],
    facts: [],
    examples: [
      `<pre style="font-family: var(--font-body); line-height: 1.2; overflow-x: auto; white-space: pre;">
[ Disaster Site ] 
       │
       ▼
 [ Every Node Pings Every Node ] 
       │
       ▼
 ┌─────────────────────────────────────────┐
 │   Euclidean Distance Matrix (EDM)       │
 │   ┌───┬─────┬─────┬─────┐               │
 │   │   │  A  │  B  │  C  │               │
 │   ├───┼─────┼─────┼─────┤               │
 │   │ A │  0  │  5m │  4m │               │
 │   │ B │  5m │  0  │  3m │               │
 │   │ C │  4m │  3m │  0  │               │
 │   └───┴─────┴─────┴─────┘               │
 └────────────────────┬────────────────────┘
                      │
                      ▼
             [ MDS Algorithm ]
                      │
                      ▼
 ┌─────────────────────────────────────────┐
 │       2D Relative Topology Map          │
 │                                         │
 │             (Node A)                    │
 │               /  \\                      │
 │             5m    4m                    │
 │             /      \\                    │
 │         (Node B)──3m──(Node C)          │
 │                                         │
 │   * Note: No Absolute North Orientation  │
 └─────────────────────────────────────────┘</pre>`
    ]
  },
  {
    title: "2. Graph Rigidity & The Reflection Flip Failure",
    summary: "Visual topology comparison showing how missing baseline structural links create non-rigid graphs susceptible to mirroring errors.",
    points: [
      "Rigid topologies lock down absolute structural coordinate maps safely.",
      "Missing critical range metrics allow sub-nodes to mathematically flip across remaining axes, creating phantom track readings."
    ],
    formulas: [],
    facts: [],
    examples: [
      `<pre style="font-family: var(--font-body); line-height: 1.2; overflow-x: auto; white-space: pre;">
  RIGID TOPOLOGY (Secure)             NON-RIGID TOPOLOGY (Ambiguous Flip)
  
        ( Node A )                            ( Node A )
          /    \\                                /    \\  
         /      \\                              /      \\ 
     Links     Links                       Links     Links
       /          \\                          /          \\
   ( Node B )───( Node C )               ( Node B )   ( Node C )
       \\          /                               \\     
      Links     Links                           Broken Link!
         \\      /                                   \\   
        ( Node D )                    [Node D_True] ──?── [Node D_Flipped]
                                      (Node D can mathematically mirror across
                                       the A-B axis due to missing range data)</pre>`
    ]
  },
  {
    title: "3. RSSI Fingerprinting Architecture",
    summary: "Processing pipeline separating pattern-matching geolocation into a calibration phase and a real-time tracking run.",
    points: [
      "Offline Training: Constructs an environment map by compiling regional signal feature vectors into a static database.",
      "Online Localization: Compares immediate real-time scans against vectors via K-Nearest Neighbors (KNN) logic."
    ],
    formulas: [],
    facts: [],
    examples: [
      `<pre style="font-family: var(--font-body); line-height: 1.2; overflow-x: auto; white-space: pre;">
【 OFFLINE TRAINING PHASE 】
 ┌──────────────────┐      ┌─────────────────────────────┐      ┌───────────────────────┐
 │ Grid Mapping     │ ───> │ Measure Signal Vectors      │ ───> │ Database Generation   │
 │ Split building   │      │ Scan all APs per grid cell  │      │ [Zone A]: AP1=-40dBm  │
 │ into static zones│      │ (Feature Vectors)           │      │           AP2=-80dBm  │
 └──────────────────┘      └─────────────────────────────┘      └───────────────────────┘

【 ONLINE LOCALIZATION PHASE 】
 ┌──────────────────┐      ┌─────────────────────────────┐      ┌───────────────────────┐
 │ User Live Scan   │ ───> │ Pattern Match Engine        │ ───> │ Coordinate Output     │
 │ Current RSSI:    │      │ Run K-Nearest Neighbors     │      │ Match Confirmed:      │
 │ AP1=-42, AP2=-78 │      │ (KNN) against database      │      │ "User is in Zone A"   │
 └──────────────────┘      └─────────────────────────────┘      └───────────────────────┘</pre>`
    ]
  },
  {
    title: "4. MEMS Accelerometer: Spring & Mass Mechanics",
    summary: "Physical layer schematic outlining the micro-mechanical capacitive comb layout used to translate motion into variations in distance.",
    points: [
      "Internal components displace dynamically relative to outer structures when subjected to linear shifts.",
      "Physical translation chain: Delta Distance (Δd) ──> Delta Capacitance (ΔC) ──> Analog Output Signal."
    ],
    formulas: [],
    facts: [],
    examples: [
      `<pre style="font-family: var(--font-body); line-height: 1.2; overflow-x: auto; white-space: pre;">
                [ FIXED OUTER CAGE HOUSING ]
             ═════════════╤══════════╤═════════════
                          │          │  <-- Fixed Outer Teeth
                          ▼          ▼
     ───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───
        │   │   │   │   │   │   │   │   │   │   │   │   │   │  
        └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   
     ───────────────────────┬───────────────────────────────────
                            │ ◄─── Suspended Moving Mass
                        ┌───┴───┐
                        │ SHIFT │ ◄── Acceleration Force
                        └───┬───┘
     ───────────────────────┴───────────────────────────────────
        ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   
        │   │   │   │   │   │   │   │   │   │   │   │   │   │   
     ───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───
                          ▲          ▲
                          │          │  <-- Fixed Outer Teeth
             ═════════════╧══════════╧═════════════</pre>`
    ]
  },
  {
    title: "5. Sensor Signal Clean-up: Gravity High-Pass Filter",
    summary: "Signal processing schematic illustrating how static DC gravity biases are filtered away to clean localized linear motion components.",
    points: [
      "Isolates true user kinetic inputs from constant gravitational pulls.",
      "Blocks static/low-frequency offsets while streaming structural high-frequency steps and sudden shifts."
    ],
    formulas: [],
    facts: [],
    examples: [
      `<pre style="font-family: var(--font-body); line-height: 1.2; overflow-x: auto; white-space: pre;">
 ┌───────────────────────────────┐
 │  Raw Accelerometer Output     │ ──> [ Fused Signal: Linear Motion + Gravity ]
 └──────────────┬────────────────┘
                │
                ▼
  ┌───────────────────────────┐
  │   High-Pass Filter (HPF)  │
  │                           │
  │   █                       │ ◄── Blocks Low-Frequency DC Offset (Gravity)
  │   █ █     █               │
  │   █ █ █   █ █             │ ◄── Passes High-Frequency AC Ripples (Jerks/Steps)
  └─────────────┬─────────────┘
                │
                ▼
 ┌───────────────────────────────┐
 │ Isolated Linear Acceleration  │ ──> [ Pure Motion Data Ready for PDR Tracking ]
 └───────────────────────────────┘</pre>`
    ]
  },
  {
    title: "6. Pedestrian Dead Reckoning: The Integration Drift Trap",
    summary: "Mathematical data flow mapping how microscopic acceleration noise error expands from structural velocity tracking down to displacement drift metrics.",
    points: [
      "PDR architecture requires step-by-step calculus loops to map positioning trajectories.",
      "First integration compounds sensor noise linearly, while the second integration curves displacement metrics away exponentially."
    ],
    formulas: [],
    facts: [],
    examples: [
      `<pre style="font-family: var(--font-body); line-height: 1.2; overflow-x: auto; white-space: pre;">
                    ┌────────────────────────┐
                    │ Raw Acceleration (a)   │ ◄── Contains micro-voltage noise (e.g., +0.01 m/s²)
                    └───────────┬────────────┘
                                │
                                ▼
                       [ First Integral ]  ( ∫ a dt )
                                │
                                ▼
                    ┌────────────────────────┐
                    │    Velocity (v)        │ ◄── Error compounds linearly over time
                    └───────────┬────────────┘
                                │
                                ▼
                       [ Second Integral ] ( ∫ v dt )
                                │
                                ▼
                    ┌────────────────────────┐
                    │   Displacement (s)     │ ◄── Error compounds exponentially!
                    └────────────────────────┘     (Phone thinks it drifted 30m away)</pre>`
    ]
  },
  {
    title: "7. Complementary Filter Block Diagram (Sensor Fusion)",
    summary: "System pipeline combining short-term angular bursts from gyroscopes with long-term tracking components from accelerometers.",
    points: [
      "Filters out low-frequency gyroscope drift errors utilizing dedicated High-Pass architecture blocks.",
      "Dampens high-frequency accelerometer vibration noise through corresponding Low-Pass math operations."
    ],
    formulas: [],
    facts: [],
    examples: [
      `<pre style="font-family: var(--font-body); line-height: 1.2; overflow-x: auto; white-space: pre;">
┌───────────────┐      ┌─────────────────────────┐      ┌─────────────┐
│ Gyroscope     │ ───> │ Fast Integration (∫)    │ ───> │ High Pass   │ ───┐
│ (Angular Vel) │      │ Capture High-Freq Bursts│      │ Filter (α)  │    │
└───────────────┘      └─────────────────────────┘      └─────────────┘    │
                                                                           ▼
                                                                     [ Sum Junction ] ──> Stable Angle 
                                                                           ▲              (No Noise / No Drift)
┌───────────────┐      ┌─────────────────────────┐      ┌─────────────┐    │
│ Accelerometer │ ───> │ Trigonometric Mapping   │ ───> │ Low Pass    │ ───┘
│ (G-Force Vector)     │ Track Gravity Vector    │      │ Filter (1-α)│
└───────────────┘      └─────────────────────────┘      └─────────────┘</pre>`
    ]
  },
  {
    title: "1. Relative Localization & MDS (The 'No Minimap' Problem)",
    summary: "When fixed anchors (GPS) are unavailable, devices figure out their relative positions by measuring distances between themselves, creating an EDM converted into a 2D map via MDS.",
    points: [
      "Useful in unpredictable zones (like disaster sites) where you cannot pre-deploy tracking infrastructure.",
      "Every device pings every other device. The Multidimensional Scaling (MDS) algorithm crunches the raw Euclidean Distance Matrix (EDM) to draw a topological map.",
      "The map is strictly relative: it lacks absolute coordinates and can be freely rotated, translated, or reflected."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [03:32], [06:25], [07:59], and [11:15]"
    ],
    examples: [
      "Combat Analogy: Your squad spawns without a minimap. You yell your distance from one another. By combining distances (EDM), the engine (MDS) instantly draws a floating wireframe layout of the squad's formation."
    ]
  },
  {
    title: "2. Graph Rigidity & Missing Ranges",
    summary: "You don't need every single N² distance measurement to build a map. Capturing only the critical 'load-bearing' ranges ensures the graph remains uniquely rigid.",
    points: [
      "Pinging every single node takes too long in a dynamic, moving network.",
      "As long as you capture the critical structural ranges, the algorithm can predict the missing gaps.",
      "If you miss a critical range, a node's location becomes ambiguous and can accidentally mathematically 'flip' to the wrong side of the map."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [09:25], [12:03], and [13:17]"
    ],
    examples: [
      "Football Analogy: As long as the Center Back knows exactly where the LB, RB, and CDM are, the defensive line's shape is rigid. If the link to the LB breaks, that player might mathematically flip to the wrong side of the pitch and ruin the formation."
    ]
  },
  {
    title: "3. RSSI & Path Loss (Distance by Signal)",
    summary: "Estimating distance using Received Signal Strength Indicator (RSSI). Signal decays exponentially over distance, creating a straight line when plotted logarithmically.",
    points: [
      "Calculating exact 'Time of Flight' requires expensive hardware. RSSI is basically free on any Wi-Fi/Bluetooth chip.",
      "Because humans or walls absorb signals (shadowing) and waves bounce randomly (fading), distance estimates based on RSSI constantly fluctuate and glitch out."
    ],
    formulas: [
      "\\[ RSSI = \\text{Slope} \\times \\log(\\text{Distance}) + \\text{Intercept} \\]"
    ],
    facts: [
      "Lecture reference: [23:22], [31:19], [37:00], and [53:40]"
    ],
    examples: [
      "Combat Analogy: Shotgun Damage Falloff. Up close = High RSSI. At 10m, it drops logarithmically. Cover acts as Armor (Shadowing), and bullet spread is RNG (Fading). Guessing enemy distance by damage dealt fails completely if they are behind a wall."
    ]
  },
  {
    title: "4. RSSI Fingerprinting (The Data-Driven Map)",
    summary: "Bypassing unpredictable path loss physics by mapping a building into a database of signal strengths and pattern-matching the user's current readings.",
    points: [
      "Offline Phase (Training): Stand in discrete zones and record the specific signal strengths (feature vectors) of all visible Access Points to build the database.",
      "Online Phase: A user measures their current AP signals.",
      "The Brains: Algorithms like K-Nearest Neighbors (KNN) search the database to find the closest signal match and declare the user's exact zone."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [56:22], [01:01:25], and [01:04:15]"
    ],
    examples: [
      "RPG Biome Analogy: You are blindfolded. Poison 50 / Heat 10 = Swamp. Poison 5 / Heat 90 = Volcano. You don't calculate geometry; you just pattern-match your passive environmental debuffs against the game's bestiary database to know where you are."
    ]
  },
  {
    title: "1. The Accelerometer (Spring & Mass Physics)",
    summary: "Accelerometers measure linear force (acceleration) across X, Y, and Z axes using a micro-mechanical structure (MEMS) with a suspended mass attached to comb-like spring structures.",
    points: [
      "When the device moves linearly, the suspended mass shifts, changing the distance between the comb teeth.",
      "This physical displacement alters the electrical capacitance, which the chip converts into a readable measure of acceleration."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [04:53] and [06:21]"
    ],
    examples: [
      "Racing Game Analogy: Think of the accelerometer as a bobblehead on your car's dashboard. When you slam the gas (accelerate), the head whips backward. When you slam the brakes (decelerate), it whips forward. The sensor measures the angle of the bobblehead to calculate G-force."
    ]
  },
  {
    title: "2. The Gravity Problem & High-Pass Filtering",
    summary: "An accelerometer constantly feels Earth's gravity pulling it down, which must be mathematically separated from the actual device movement.",
    points: [
      "The raw output is a fused signal: Linear Acceleration (your movement) + Gravity.",
      "Because gravity is a constant, slow-changing force relative to the device's orientation, it appears as a low-frequency signal.",
      "Actual hand jerks or running motions are high-frequency signals. We apply a High-Pass Filter to block the slow gravity offset and isolate the true motion data."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [09:45], [13:01], and [48:07]"
    ],
    examples: [
      "Audio Mixing Analogy: Gravity is a deep, constant bass hum (Low Frequency) in your audio track, while your actual footsteps are sharp snare hits (High Frequency). To isolate the footsteps, you apply a High-Pass Filter on your equalizer to cut out the bass hum."
    ]
  },
  {
    title: "3. Pedestrian Dead Reckoning & Integration Drift",
    summary: "Dead Reckoning guesses your current coordinates from a last known location using time and speed, but integrating microscopic sensor noise causes compounding mathematical drift.",
    points: [
      "To find velocity, you integrate acceleration once; to find displacement, you integrate a second time.",
      "Accelerometers possess microscopic electrical noise (e.g., reading 0.01 m/s² when completely still).",
      "Because integration acts like a running accumulator, these tiny errors compound over time. A completely stationary phone can mathematically 'drift' 30 meters away after just 5 minutes."
    ],
    formulas: [
      "\\[ v = u + at \\]",
      "\\[ s = ut + 0.5at^2 \\]"
    ],
    facts: [
      "Lecture reference: [23:07], [25:36], and [33:48]"
    ],
    examples: [
      "Compound Interest Analogy: The accelerometer noise is like a 1% daily interest rate applied to a bank account by mistake. On day one, it's a tiny error. But because integration acts like compound interest, after 5 minutes, that tiny 1% error has compounded into an account-breaking sum."
    ]
  },
  {
    title: "4. The Gyroscope (The Spin Doctor)",
    summary: "Gyroscopes measure Angular Velocity—how fast a device is rotating along the Roll, Pitch, and Yaw axes—by exploiting the Coriolis Effect.",
    points: [
      "While accelerometers detect linear pushes, gyroscopes track rotational change in radians per second.",
      "Similar to accelerometers, you must integrate angular velocity over time to find absolute orientation angles.",
      "Integrating gyroscope data also creates a compounding drift error, which heavily corrupts low-frequency (long-term) readings."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [55:38], [57:17], and [01:00:52]"
    ],
    examples: [
      "Flight Sim Analogy: The accelerometer tracks your engine thrust (pushing you forward). The gyroscope tracks your flight stick adjustments (Pitch = nose up/down, Roll = barrel roll, Yaw = turning the rudder left/right). You need both to map the aircraft's state."
    ]
  },
  {
    title: "5. Sensor Fusion & The Complementary Filter",
    summary: "Fusing raw data from an accelerometer and a gyroscope into a single, perfectly stable orientation vector by letting their frequency properties cover each other's weaknesses.",
    points: [
      "The Trade-off: Accelerometers are incredibly noisy in the short term (high-frequency jitter) but highly stable in the long term (gravity always points down).",
      "The Reverse: Gyroscopes are precise in the short term (high-frequency accuracy) but drift terribly over time (low-frequency error).",
      "The Solution (Complementary Filter): Take the short-term, fast-changing rotation data from the Gyroscope and combine it with the long-term, slow-changing gravity angle from the Accelerometer to calculate a flawless orientation angle."
    ],
    formulas: [],
    facts: [
      "Lecture reference: [01:03:20] and [01:03:28]"
    ],
    examples: [
      "RPG Character Stats Analogy: The Gyroscope is a Rogue: insane burst damage (high-frequency accuracy) but terrible stamina (drifts over time). The Accelerometer is a Paladin: clunky and slow in a fast fight (high-frequency noise) but has infinite stamina (long-term gravity stability). Sensor Fusion puts them in the same party to balance the build."
    ]
  },

  /* ─── ADD MORE TOPICS — just copy the block below and fill it in ────

  ,{
    title: "Your Topic Title",
    summary: "One or two sentence overview of the topic.",
    points: [
      "Key point 1",
      "Key point 2"
    ],
    formulas: [
      "\\( inline\\ formula \\)",
      "\\[ display\\ formula \\]"
    ],
    facts: [
      "Important fact 1",
      "Important fact 2"
    ],
    examples: [
      "Example A",
      "Example B"
    ]
  }

  ────────────────────────────────────────────────────────────────────── */
];

/* ═══════════════════════════════════════════
   DOM references
═══════════════════════════════════════════ */
const cardsGrid   = document.getElementById('cardsGrid');
const navList     = document.getElementById('navList');
const searchInput = document.getElementById('searchInput');
const progressBar = document.getElementById('progressBar');
const noResults   = document.getElementById('noResults');
const focusBtn    = document.getElementById('focusBtn');
const themeBtn    = document.getElementById('themeBtn');
const sectionCount= document.getElementById('sectionCount');
const parallax    = document.getElementById('parallax');

let currentIndex = 0;   // for N / B navigation
let visibleCards = [];  // after filtering

/* ═══════════════════════════════════════════
   Build cards
═══════════════════════════════════════════ */
function buildCard(note, idx) {
  const id = `card-${idx}`;

  // ── nav item
  const li = document.createElement('li');
  li.className = 'nav-item';
  li.dataset.idx = idx;
  
  // Detect if this is a chapter header
  if (note.title.includes('📦') || note.title.toUpperCase().includes('CHAPTER')) {
    li.classList.add('nav-chapter');
  }

  const a = document.createElement('a');
  a.href = `#${id}`;
  a.textContent = note.title;
  a.addEventListener('click', () => highlightNav(idx));
  li.appendChild(a);
  navList.appendChild(li);

  // ── card
  const card = document.createElement('div');
  card.className = 'card open'; // open by default
  card.id = id;
  card.dataset.idx = idx;

  // header
  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = `
    <span class="card-title">${note.title}</span>
    <span class="card-toggle">›</span>`;
  header.addEventListener('click', () => {
    card.classList.toggle('open');
  });

  // body
  const body = document.createElement('div');
  body.className = 'card-body';
  body.innerHTML = `
    <p class="section-label">Summary</p>
    <p class="summary-text">${note.summary}</p>

    ${note.points?.length ? `
    <p class="section-label">Key Points</p>
    <ul class="points-list">
      ${note.points.map(p => `<li>${p}</li>`).join('')}
    </ul>` : ''}

    ${note.formulas?.length ? `
    <p class="section-label">Formulas</p>
    <div class="formulas-block">
      ${note.formulas.map(f => `<div class="formula-item">${f}</div>`).join('')}
    </div>` : ''}

    ${note.facts?.length ? `
    <p class="section-label">Important Facts</p>
    <div class="facts-block">
      ${note.facts.map(f => `<div class="fact-item">${f}</div>`).join('')}
    </div>` : ''}

    ${note.examples?.length ? `
    <p class="section-label">Examples</p>
    <ul class="examples-list">
      ${note.examples.map(e => `<li>${e}</li>`).join('')}
    </ul>` : ''}
  `;

  card.appendChild(header);
  card.appendChild(body);
  cardsGrid.appendChild(card);
}
/* ═══════════════════════════════════════════
   Auto-Chapter Engine (Drop above init)
═══════════════════════════════════════════ */
function autoInjectChapters() {
  let chapterCounter = 1;
  let processedNotes = [];
  
  notes.forEach((note) => {
    // Detects if the title starts with "1." or "Phase 1"
    const isRestart = note.title.match(/^(1\.|Phase 1)/i);
    const isAlreadyChapter = note.title.includes("📦");
    
    if (isRestart && !isAlreadyChapter) {
      processedNotes.push({
        title: `📦 MODULE ${chapterCounter}: ML & NEURAL NETWORKS`,
        summary: "Auto-detected section boundary.",
        points: [], formulas: [], facts: [], examples: []
      });
      chapterCounter++;
    }
    processedNotes.push(note);
  });
  
  // Hot-swap the array in memory
  notes.splice(0, notes.length, ...processedNotes);
}
function init() {
    autoInjectChapters(); // ◄── INJECTS CHAPTERS AUTOMATICALLY
  notes.forEach((note, idx) => buildCard(note, idx));
  sectionCount.textContent = `${notes.length} topics`;
  visibleCards = [...document.querySelectorAll('.card')];

  // Typeset MathJax — poll until library is ready
  function runMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      MathJax.typesetPromise([cardsGrid]).catch(console.warn);
    } else {
      setTimeout(runMathJax, 150);
    }
  }
  runMathJax();
}

/* ═══════════════════════════════════════════
   Search
═══════════════════════════════════════════ */
function doSearch(query) {
  const q = query.trim().toLowerCase();
  visibleCards = [];
  let matched = 0;

  notes.forEach((note, idx) => {
    const card    = document.getElementById(`card-${idx}`);
    const navItem = navList.querySelector(`[data-idx="${idx}"]`);
    const haystack = [
      note.title, note.summary,
      ...(note.points  || []),
      ...(note.formulas|| []),
      ...(note.facts   || []),
      ...(note.examples|| [])
    ].join(' ').toLowerCase();

    const show = !q || haystack.includes(q);
    card.classList.toggle('hidden', !show);
    navItem.classList.toggle('hidden', !show);

    if (show) { visibleCards.push(card); matched++; }
  });

  noResults.classList.toggle('hidden', matched > 0);
  sectionCount.textContent = q ? `${matched}/${notes.length} topics` : `${notes.length} topics`;
  currentIndex = 0;
}

searchInput.addEventListener('input', e => doSearch(e.target.value));

/* ═══════════════════════════════════════════
   Progress bar
═══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
  progressBar.style.width = pct + '%';

  // highlight active nav item based on scroll
  visibleCards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    if (rect.top <= 80 && rect.bottom > 80) {
      highlightNav(+card.dataset.idx);
    }
  });
});

function highlightNav(idx) {
  navList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
  
  const li = navList.querySelector(`[data-idx="${idx}"]`);
  if (li) {
    const a = li.querySelector('a');
    if (a) a.classList.add('active');
    
    // Smoothly auto-scroll the sidebar to keep the active item in view
    li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  currentIndex = visibleCards.findIndex(c => +c.dataset.idx === idx);
}

/* ═══════════════════════════════════════════
   Keyboard shortcuts
═══════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  const tag = document.activeElement.tagName;
  const inInput = tag === 'INPUT' || tag === 'TEXTAREA';

  if (e.key === '/' && !inInput) {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
    return;
  }

  if (e.key === 'Escape' && inInput) {
    searchInput.blur();
    return;
  }

  if (inInput) return;

  if (e.key === 'n' || e.key === 'N') {
    e.preventDefault();
    navigateSection(1);
  }
  if (e.key === 'b' || e.key === 'B') {
    e.preventDefault();
    navigateSection(-1);
  }
  if (e.key === 'f' || e.key === 'F') {
    e.preventDefault();
    toggleFocus();
  }
});

function navigateSection(dir) {
  if (!visibleCards.length) return;
  currentIndex = (currentIndex + dir + visibleCards.length) % visibleCards.length;
  visibleCards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
  highlightNav(+visibleCards[currentIndex].dataset.idx);
}

/* ═══════════════════════════════════════════
   Focus mode
═══════════════════════════════════════════ */
function toggleFocus() {
  document.body.classList.toggle('focus');
  focusBtn.textContent = document.body.classList.contains('focus') ? '◈ Exit' : '◈ Focus';
}
focusBtn.addEventListener('click', toggleFocus);

/* ═══════════════════════════════════════════
   Light / dark toggle
═══════════════════════════════════════════ */
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

/* ═══════════════════════════════════════════
   Parallax
═══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  parallax.style.transform = `translateY(${window.scrollY * 0.25}px)`;
}, { passive: true });

/* ═══════════════════════════════════════════
   Mobile sidebar toggle (topbar pseudo-element click)
═══════════════════════════════════════════ */
document.querySelector('.topbar').addEventListener('click', e => {
  if (window.innerWidth <= 768) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX - rect.left < 38) {          // tap on hamburger zone
      document.body.classList.toggle('sidebar-open');
    }
  }
});

// close sidebar on nav link tap (mobile)
navList.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    document.body.classList.remove('sidebar-open');
  }
});

/* ─── RUN ─── */
init();

/* ═══════════════════════════════════════════
   Toggle All Cards Feature
═══════════════════════════════════════════ */
const topbarActions = document.querySelector('.topbar-actions');
const toggleAllBtn = document.createElement('button');
toggleAllBtn.className = 'btn-ghost';
toggleAllBtn.innerHTML = '⇕ Toggle All';
toggleAllBtn.title = "Collapse or Expand all cards";

// Inject the button next to the Focus button
if(topbarActions) topbarActions.prepend(toggleAllBtn);

let allOpen = true;
toggleAllBtn.addEventListener('click', () => {
  allOpen = !allOpen;
  document.querySelectorAll('.card').forEach(card => {
    if (allOpen) {
      card.classList.add('open');
    } else {
      card.classList.remove('open');
    }
  });
  toggleAllBtn.style.color = allOpen ? 'var(--text)' : 'var(--accent)';
});