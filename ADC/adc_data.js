const CHAPTERS = [
  
  {
    "id": "exam_cheat_sheet",
    "label": "0 · Cheat Sheet",
    "title": "EXAM CHEAT SHEET: The Instant Solve Formula Core",
    "content": [
      { 
        "type": "para", 
        "text": "These are the absolute 'weapons-grade' equations extracted directly from your notes, stripped of derivations, and formatted for rapid numerical solving." 
      },

      { "type": "heading", "text": "1. Amplitude Modulation (AM) Core" },
      { "type": "para", "text": "Use these when dealing with standard DSB-FC or power/efficiency calculations." },
      { "type": "para", "text": "<b>Modulation Index (\\(\\mu\\)):</b><br><em>When to use:</em> To find the depth of modulation given the message signal's peak amplitude and carrier amplitude." },
      { "type": "eq", "tex": "\\mu = \\frac{\\max|m(t)|}{A_c}" },
      { "type": "para", "text": "<b>Total Transmitted Power (\\(P_t\\)):</b><br><em>When to use:</em> Only for <b>single-tone sinusoidal</b> messages to find total power." },
      { "type": "eq", "tex": "P_t = P_c\\left(1 + \\frac{\\mu^2}{2}\\right)" },
      { "type": "para", "text": "<b>Total Transmitted Power (Square Wave):</b><br><em>When to use:</em> A classic exam trap; use this if the message is specifically a square wave." },
      { "type": "eq", "tex": "P_t = P_c(1 + \\mu^2)" },
      { "type": "para", "text": "<b>Modulation Efficiency (\\(\\eta\\)):</b><br><em>When to use:</em> To find the percentage of useful power (sidebands) for sinusoidal signals. Maximum is 33.33% at \\(\\mu=1\\)." },
      { "type": "eq", "tex": "\\eta = \\frac{\\mu^2}{2+\\mu^2} \\times 100\\%" },
      { "type": "para", "text": "<b>Multi-Tone Modulation Index (\\(\\mu_t\\)):</b><br><em>When to use:</em> When the message signal has multiple frequencies, use the root-sum-square to find the total index before calculating power." },
      { "type": "eq", "tex": "\\mu_t = \\sqrt{\\mu_1^2 + \\mu_2^2 + \\dots}" },

      { "type": "heading", "text": "2. Angle Modulation (FM & PM) Core" },
      { "type": "para", "text": "Use these for bandwidth, phase deviation, and frequency deviation numericals." },
      { "type": "para", "text": "<b>Frequency Deviation (\\(\\Delta f\\)) in FM:</b><br><em>When to use:</em> To find the max frequency shift. Note that it is strictly proportional to amplitude \\(A_m\\) and <em>independent</em> of message frequency \\(f_m\\)." },
      { "type": "eq", "tex": "\\Delta f = K_f A_m" },
      { "type": "para", "text": "<b>Modulation Index (\\(\\beta\\)):</b><br><em>When to use:</em> To classify as Narrowband (\\(\\beta < 0.6\\)) or Wideband (\\(\\beta > 0.6\\))." },
      { "type": "eq", "tex": "\\beta_{FM} = \\frac{K_f A_m}{f_m} = \\frac{\\Delta f}{f_m}, \\qquad \\beta_{PM} = K_p A_m" },
      { "type": "para", "text": "<b>Carson’s Rule (Bandwidth):</b><br><em>When to use:</em> The universal formula for finding the practical bandwidth of Wideband FM or PM containing 98% of the power." },
      { "type": "eq", "tex": "BW = 2(\\beta + 1)f_{\\max} = 2(\\Delta f + f_{\\max})" },
      { "type": "para", "text": "<b>Total Power (Wideband/Angle):</b><br><em>When to use:</em> Always. Total power in angle modulation is completely constant and independent of the modulation index \\(\\beta\\)." },
      { "type": "eq", "tex": "P_t = P_c = \\frac{A_c^2}{2}" },

      { "type": "heading", "text": "3. Probability, Random Variables & Noise" },
      { "type": "para", "text": "Crucial for finding expectations, power, and error probabilities." },
      { "type": "para", "text": "<b>Expected Value / Mean (CRV):</b><br><em>When to use:</em> To find the DC value or mean of a continuous random variable given its PDF." },
      { "type": "eq", "tex": "E[X] = \\int_{-\\infty}^{\\infty} x f_X(x) dx" },
      { "type": "para", "text": "<b>Variance (\\(\\sigma_x^2\\)):</b><br><em>When to use:</em> To calculate the AC power of a signal. \\(E[X^2]\\) is the Mean Square Value (total power)." },
      { "type": "eq", "tex": "\\sigma_x^2 = E[X^2] - (E[X])^2" },
      { "type": "para", "text": "<b>Variance of a Linear Combination:</b><br><em>When to use:</em> If \\(X\\) and \\(Y\\) are <b>independent</b> or <b>uncorrelated</b>, the covariance term vanishes, leaving just \\(a^2\\sigma_X^2 + b^2\\sigma_Y^2\\)." },
      { "type": "eq", "tex": "Var(aX + bY) = a^2\\sigma_X^2 + b^2\\sigma_Y^2 + 2ab \\cdot cov(XY)" },
      { "type": "para", "text": "<b>The Q-Function Shortcut (Gaussian RVs):</b><br><em>When to use:</em> To find the right-tail probability of a Gaussian signal exceeding threshold \\(a\\) without integrating the messy PDF." },
      { "type": "eq", "tex": "P(X > a) = Q\\left( \\frac{a - \\mu_X}{\\sigma_X} \\right)" },

      { "type": "heading", "text": "4. Digital Comms & Information Theory" },
      { "type": "para", "text": "Use these for digital transmission, channel capacity, and error rates." },
      { "type": "para", "text": "<b>Entropy / Avg Info:</b><br><em>When to use:</em> To find the average information in bits/symbol." },
      { "type": "eq", "tex": "H(X) = -\\sum P(x_i) \\log_2 P(x_i)" },
      { "type": "para", "text": "<b>Information Rate (\\(R\\)):</b><br><em>When to use:</em> To find bits/sec, where \\(r\\) is the symbol rate (symbols/sec)." },
      { "type": "eq", "tex": "R = r \\times H(X)" },
      { "type": "para", "text": "<b>Superheterodyne Image Frequency:</b><br><em>When to use:</em> To find the dangerous ghost frequency that will interfere with your target station \\(f_s\\)." },
      { "type": "eq", "tex": "f_{si} = f_s + 2IF" },
      { "type": "para", "text": "<b>General Probability of Error (\\(P_e\\)):</b><br><em>When to use:</em> The universal baseband error formula, where \\(d_{12}\\) is the distance between points on the constellation diagram." },
      { "type": "eq", "tex": "P_e = Q\\left[ \\sqrt{\\frac{d_{12}^2}{2N_0}} \\right]" },
      { "type": "para", "text": "<b>2-Ary PAM \\(P_e\\):</b><br><em>When to use:</em> Specific error formula for binary Pulse Amplitude Modulation (since \\(d_{12} = 2\\sqrt{E_s}\\))." },
      { "type": "eq", "tex": "P_e = Q\\left[ \\sqrt{\\frac{2A^2 T_b}{N_0}} \\right]" },
      
      {
    "type": "heading",
    "text": "5. Advanced Random Variables & Probability"
  },
  {
    "type": "para",
    "text": "Use these to bypass heavy integration when dealing with distributions and combined variables."
  },
  {
    "type": "para",
    "text": "<b>Uniform Distribution Variance (\\(X \\sim U[a, b]\\)):</b><br><em>When to use:</em> Instant variance calculation for a flat/uniform PDF without integrating."
  },
  {
    "type": "eq",
    "tex": "\\sigma_x^2 = \\frac{(b-a)^2}{12}"
  },
  {
    "type": "para",
    "text": "<b>Correlation Coefficient (\\(\\rho\\)):</b><br><em>When to use:</em> To find the normalized relationship between two variables. Bounded between -1 and 1."
  },
  {
    "type": "eq",
    "tex": "\\rho(X,Y) = \\frac{cov(XY)}{\\sigma_X \\sigma_Y} = \\frac{R_{XY} - \\mu_X\\mu_Y}{\\sigma_X \\sigma_Y}"
  },
  {
    "type": "para",
    "text": "<b>Point Probability from CDF:</b><br><em>When to use:</em> If asked for exact point probability from a CDF. If the graph is continuous, it's 0. If there's a jump, it's the height of the jump."
  },
  {
    "type": "eq",
    "tex": "P(X=a) = F_X(a^+) - F_X(a^-)"
  },
  {
    "type": "para",
    "text": "<b>Q-Function Symmetry Rule:</b><br><em>When to use:</em> When your standard normal calculation results in a negative Z-score."
  },
  {
    "type": "eq",
    "tex": "Q(-z) = 1 - Q(z)"
  },
  {
    "type": "heading",
    "text": "6. Superheterodyne Receivers"
  },
  {
    "type": "para",
    "text": "Use these when dealing with antenna frequencies, local oscillators, and interference."
  },
  {
    "type": "para",
    "text": "<b>Intermediate Frequency (\\(IF\\)):</b><br><em>When to use:</em> The core mixer formula to find the stepped-down target frequency."
  },
  {
    "type": "eq",
    "tex": "IF = |f_s - f_{LO}|"
  },
  {
    "type": "para",
    "text": "<b>Image Rejection Ratio (IRR or \\(\\alpha\\)):</b><br><em>When to use:</em> To calculate how well the antenna's pre-selector filter (with Quality factor \\(Q\\)) blocks the ghost image frequency (\\(f_{si}\\))."
  },
  {
    "type": "eq",
    "tex": "\\rho = \\frac{f_{si}}{f_s} - \\frac{f_s}{f_{si}}, \\qquad \\alpha = \\sqrt{1 + Q^2 \\rho^2}"
  },
  {
    "type": "heading",
    "text": "7. Digital Baseband & Bandpass Modulation (ASK, PSK, FSK, PAM)"
  },
  {
    "type": "para",
    "text": "Crucial for calculating energy, constellation distances, and probability of error (\\(P_e\\))."
  },
  {
    "type": "para",
    "text": "<b>Baseband vs. Bandpass Pulse Energy:</b><br><em>When to use:</em> Baseband is for raw digital pulses (PAM). Bandpass is for carrier-modulated signals (ASK, PSK, FSK)."
  },
  {
    "type": "eq",
    "tex": "E_s (\\text{Baseband}) = A^2 T_b, \\qquad E_s (\\text{Bandpass}) = \\frac{A^2 T_b}{2}"
  },
  {
    "type": "para",
    "text": "<b>Universal Probability of Error (\\(P_e\\)):</b><br><em>When to use:</em> The master formula for <em>any</em> constellation diagram. \\(d_{12}\\) is the distance between the two dots in energy space."
  },
  {
    "type": "eq",
    "tex": "P_e = Q\\left[ \\sqrt{\\frac{d_{12}^2}{2N_0}} \\right]"
  },
  {
    "type": "para",
    "text": "<b>ASK / OOK Average Bit Energy:</b><br><em>When to use:</em> Because ASK sends energy for '1' but zero energy for '0', the average energy is exactly half of the active pulse energy."
  },
  {
    "type": "eq",
    "tex": "(E_b)_{avg} = \\frac{A^2 T_b}{4}"
  },
  {
    "type": "para",
    "text": "<b>ASK Probability of Error:</b><br><em>When to use:</em> Instant substitution for standard Amplitude Shift Keying."
  },
  {
    "type": "eq",
    "tex": "P_e = Q \\left[ \\sqrt{\\frac{(E_b)_{avg}}{N_0}} \\right]"
  },
  {
    "type": "para",
    "text": "<b>Phase Error Impact (ASK):</b><br><em>When to use:</em> If the correlator receiver has a phase mismatch (\\(\\theta\\)), multiplying the energy inside the Q-function by \\(\\cos^2 \\theta\\)."
  },
  {
    "type": "eq",
    "tex": "P_e = Q \\left[ \\sqrt{\\frac{A^2 T_b \\cos^2 \\theta}{4 N_0}} \\right]"
  },
  {
    "type": "heading",
    "text": "8. Information Theory Matrices"
  },
  {
    "type": "para",
    "text": "Use these for discrete communication channels and entropy."
  },
  {
    "type": "para",
    "text": "<b>Output Probability Matrix:</b><br><em>When to use:</em> To find the final probabilities at the receiver. Note: \\([P(Y|X)]\\) is the Conditional Matrix, where <b>rows must sum to 1</b>."
  },
  {
    "type": "eq",
    "tex": "[P(Y)] = [P(X)] \\times [P(Y|X)]"
  },
  {
    "type": "para",
    "text": "<b>Mutual Information (\\(I(X;Y)\\)):</b><br><em>When to use:</em> To find the actual useful data transferred. \\(H(X|Y)\\) is Equivocation (lost info), and \\(H(Y|X)\\) is Noise Entropy (fake info)."
  },
  {
    "type": "eq",
    "tex": "I(X;Y) = H(X) - H(X|Y) = H(Y) - H(Y|X)"
  },
  
  {
    "type": "heading",
    "text": "1. Advanced AM & Waveform Traps"
  },
  {
    "type": "para",
    "text": "Use these when given oscilloscope readings or non-standard message shapes."
  },
  {
    "type": "para",
    "text": "<b>Oscilloscope Envelope Measurements:</b><br><em>When to use:</em> When given the maximum and minimum peak voltages of an AM envelope directly from a graph."
  },
  {
    "type": "eq",
    "tex": "\\mu = \\frac{V_{\\max}-V_{\\min}}{V_{\\max}+V_{\\min}}, \\qquad A_c = \\frac{V_{\\max}+V_{\\min}}{2}"
  },
  {
    "type": "para",
    "text": "<b>General Message Power (\\(P_m\\)) Shortcuts:</b><br><em>When to use:</em> To plug into the universal power formula \\(P_t = P_c \\left[ 1 + \\frac{P_m}{A_c^2} \\right]\\) when the message is not a simple sine wave."
  },
  {
    "type": "eq",
    "tex": "P_m (\\text{Sine}) = \\frac{A_m^2}{2}, \\quad P_m (\\text{Square}) = A_m^2, \\quad P_m (\\text{Triangular}) = \\frac{A_m^2}{3}"
  },
  {
    "type": "heading",
    "text": "2. The Phase Modulation (PM) Trap"
  },
  {
    "type": "para",
    "text": "Use this to avoid the most common mistake when switching between FM and PM."
  },
  {
    "type": "para",
    "text": "<b>Max Frequency Deviation in PM:</b><br><em>When to use:</em> To find \\(\\Delta f\\) for Phase Modulation. <b>Crucial difference:</b> FM depends on the maximum <em>amplitude</em> of the message, but PM depends strictly on the maximum <em>derivative (slope)</em> of the message."
  },
  {
    "type": "eq",
    "tex": "| \\Delta f(t) |_{\\max} = \\frac{K_p}{2\\pi} \\left| \\frac{dm(t)}{dt} \\right|_{\\max}"
  },
  {
    "type": "heading",
    "text": "3. Advanced Gaussian & Probability Shortcuts"
  },
  {
    "type": "para",
    "text": "Use these to bypass pages of integration during high-level random variable numericals."
  },
  {
    "type": "para",
    "text": "<b>The Gaussian Area Trick:</b><br><em>When to use:</em> When asked to integrate a complex exponential that looks like a bell curve. Find the variance and plug it into the right side to get the area instantly."
  },
  {
    "type": "eq",
    "tex": "\\int_{-\\infty}^{\\infty} e^{\\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}} dx = \\sqrt{2\\pi\\sigma_x^2}"
  },
  {
    "type": "para",
    "text": "<b>Gaussian Interval Probabilities:</b><br><em>When to use:</em> When calculating the probability of a Gaussian variable falling <em>between</em> two bounds. (Note the subtraction order!)."
  },
  {
    "type": "eq",
    "tex": "P(a < X \\le b) = Q\\left(\\frac{a - \\mu_X}{\\sigma_X}\\right) - Q\\left(\\frac{b - \\mu_X}{\\sigma_X}\\right)"
  },
  {
    "type": "para",
    "text": "<b>Independent MAX Logic:</b><br><em>When to use:</em> If asked for the probability that the maximum of two independent variables is <em>less than</em> \\(z\\), simply multiply their individual CDFs."
  },
  {
    "type": "eq",
    "tex": "P[\\max(X,Y) \\le z] = F_X(z) \\times F_Y(z)"
  },
  {
    "type": "para",
    "text": "<b>Independent MIN Logic:</b><br><em>When to use:</em> If asked for the probability that the minimum of two independent variables is <em>greater than</em> \\(z\\), multiply their right-tail probabilities."
  },
  {
    "type": "eq",
    "tex": "P[\\min(X,Y) \\ge z] = P(X \\ge z) \\times P(Y \\ge z)"
  },
  {
    "type": "heading",
    "text": "4. High-Level Digital & Information Matrices"
  },
  {
    "type": "para",
    "text": "Use these for multi-level constellations and channel probability routing."
  },
  {
    "type": "para",
    "text": "<b>4-Ary PAM Coordinate Rule:</b><br><em>When to use:</em> To find where a 4-Ary symbol lives on the energy constellation diagram. Because it sends 2 bits at once, the time duration is \\(2T_b\\)."
  },
  {
    "type": "eq",
    "tex": "\\text{Coordinate} = \\text{Voltage} \\times \\sqrt{2T_b}"
  },
  {
    "type": "para",
    "text": "<b>4-Ary PAM Minimum Distance (\\(d_{min}\\)):</b><br><em>When to use:</em> To find the critical distance gap between the two closest points on a 4-Ary PAM constellation for error calculation."
  },
  {
    "type": "eq",
    "tex": "d_{min} = \\frac{A}{2}\\sqrt{2T_b}"
  },
  {
    "type": "para",
    "text": "<b>Receiver Total Output Probability:</b><br><em>When to use:</em> To find the total probability of receiving a specific symbol (e.g., \\(y_1\\)) across <em>all</em> possible transmission paths in a channel matrix."
  },
  {
    "type": "eq",
    "tex": "P(y_j) = \\sum_i P(x_i) P(y_j | x_i)"
  }
    ]
  },

  
  {
    "id": "pattern_numericals",
    "label": "1 · Pattern Numericals",
    "title": "PATTERN NUMERICALS: Layer 2 Execution",
    "content": [
      {
        "type": "para",
        "text": "We are going to train the brain to recognize the <em>structure</em> of the questions so you don't freeze up on the exam. Here are highly-tested patterns derived directly from the core materials."
      },
      {
        "type": "heading",
        "text": "🧩 Type 1: AM Power & Efficiency (The Multi-Tone & Wave Shape Trap)"
      },
      {
        "type": "para",
        "text": "Examiners love to trick you by giving you a message signal that is <em>not</em> a single sine wave. If it has multiple frequencies or is a square/triangular wave, the standard formulas change."
      },
      {
        "type": "heading",
        "text": "Solved Example (Multi-Tone Efficiency)"
      },
      {
        "type": "para",
        "text": "<b>The Problem:</b> Given an AM message signal \\(m(t) = \\frac{1}{2} \\cos(\\omega_1 t) - \\frac{1}{2} \\sin(\\omega_2 t)\\), find the total modulation efficiency \\(\\eta\\)."
      },
      {
        "type": "para",
        "text": "<b>Step-by-Step Execution:</b><br>1. <b>Extract Individual Indices:</b> Ignore the signs and phases; they do not impact power."
      },
      {
        "type": "eq",
        "tex": "\\mu_1 = 0.5, \\quad \\mu_2 = 0.5"
      },
      {
        "type": "para",
        "text": "2. <b>Calculate Total Modulation Index (RSS Rule):</b> Never just add them. Use the Root-Sum-Square method."
      },
      {
        "type": "eq",
        "tex": "\\mu_t = \\sqrt{0.5^2 + 0.5^2} = \\sqrt{0.5} = \\frac{1}{\\sqrt{2}}"
      },
      {
        "type": "para",
        "text": "3. <b>Calculate Efficiency:</b> Plug \\(\\mu_t\\) into the standard sinusoidal efficiency formula."
      },
      {
        "type": "eq",
        "tex": "\\eta = \\frac{\\mu_t^2}{2 + \\mu_t^2} = \\frac{0.5}{2 + 0.5} = \\frac{0.5}{2.5} = 20\\%"
      },
      {
        "type": "heading",
        "text": "Exam-Style Variations"
      },
      {
        "type": "para",
        "text": "<b>Variation A (The Square Wave Trap):</b> You are given a square wave message with 100% modulation (\\(\\mu = 1\\)). What is the efficiency?<br><em>Pattern Recognition:</em> Do NOT use the formula above. For a square wave, \\(P_m = A_m^2\\), making \\(\\eta = \\frac{\\mu^2}{1 + \\mu^2}\\). At \\(\\mu=1\\), efficiency is <b>50%</b>."
      },
      {
        "type": "para",
        "text": "<b>Variation B (Power Scaling):</b> What happens to the total transmitted power if a single-tone AM signal goes from 0% to 100% modulation?<br><em>Pattern Recognition:</em> Total power increases by exactly <b>50%</b> (\\(P_t = 1.5P_c\\)), and all of that extra power goes directly into the sidebands."
      },
      {
        "type": "heading",
        "text": "🧩 Type 2: Angle Modulation Bandwidth (Carson's Rule)"
      },
      {
        "type": "para",
        "text": "FM and PM calculate maximum frequency deviation (\\(\\Delta f\\)) differently. If you mix them up, your bandwidth calculation will be entirely wrong."
      },
      {
        "type": "heading",
        "text": "Solved Example (Triangular Wave FM vs PM)"
      },
      {
        "type": "para",
        "text": "<b>The Problem:</b> A periodic triangular signal \\(m(t)\\) has a peak amplitude of \\(\\pm 1\\text{V}\\), a period \\(T_0 = 2 \\times 10^{-4}\\text{ s}\\), and essential bandwidth up to the 3rd harmonic. Given \\(K_f = 2\\pi \\times 10^5\\text{ rad/V-s}\\) and \\(K_p = 5\\pi\\text{ rad/V}\\), calculate the FM and PM bandwidth."
      },
      {
        "type": "para",
        "text": "<b>Step-by-Step Execution:</b><br>1. <b>Find Frequencies:</b> \\(f_0 = \\frac{1}{T_0} = 5\\text{ kHz}\\). Max frequency \\(f_{\\max} = 3 \\times 5\\text{ kHz} = 15\\text{ kHz}\\)."
      },
      {
        "type": "para",
        "text": "2. <b>FM Bandwidth:</b> FM \\(\\Delta f\\) depends <em>only</em> on the absolute peak amplitude (\\(|m(t)|_{\\max} = 1\\text{V}\\))."
      },
      {
        "type": "eq",
        "tex": "| \\Delta f |_{\\max} = \\frac{K_f}{2\\pi} |m(t)|_{\\max} = 10^5(1) = 100\\text{ kHz}"
      },
      {
        "type": "eq",
        "tex": "BW_{FM} = 2(\\Delta f + f_{\\max}) = 2(100 + 15) = 230\\text{ kHz}"
      },
      {
        "type": "para",
        "text": "3. <b>PM Bandwidth:</b> PM \\(\\Delta f\\) depends on the <em>maximum slope</em> (derivative) of \\(m(t)\\). It rises \\(2\\text{V}\\) (from -1 to 1) over half a period (\\(1 \\times 10^{-4}\\text{ s}\\))."
      },
      {
        "type": "eq",
        "tex": "\\text{Slope} = \\frac{2}{10^{-4}} = 2 \\times 10^4\\text{ V/s}"
      },
      {
        "type": "eq",
        "tex": "| \\Delta f |_{\\max} = \\frac{K_p}{2\\pi} \\times \\text{Slope} = 2.5 \\times (2 \\times 10^4) = 50\\text{ kHz}"
      },
      {
        "type": "eq",
        "tex": "BW_{PM} = 2(50 + 15) = 130\\text{ kHz}"
      },
      {
        "type": "heading",
        "text": "Exam-Style Variations"
      },
      {
        "type": "para",
        "text": "<b>Variation A (Amplitude Doubling):</b> What happens to the bandwidths if the message amplitude doubles to \\(\\pm 2\\text{V}\\)?<br><em>Pattern Recognition:</em> Both \\(\\Delta f\\) values double. \\(f_{\\max}\\) stays the same. \\(BW_{FM} = 2(200+15) = 430\\text{ kHz}\\) and \\(BW_{PM} = 2(100+15) = 230\\text{ kHz}\\)."
      },
      {
        "type": "para",
        "text": "<b>Variation B (Time Expansion):</b> What happens to the bandwidths if the signal is time-expanded by a factor of 2 (period becomes \\(4 \\times 10^{-4}\\text{ s}\\))?<br><em>Pattern Recognition:</em> Frequencies halve (\\(f_{\\max} = 7.5\\text{ kHz}\\)). FM \\(\\Delta f\\) stays the exact same because amplitude didn't change! PM \\(\\Delta f\\) halves because the slope became less steep."
      },
      {
    "type": "heading",
    "text": "🧩 Type 3: Probability & PDF Area Tricks (The \"No Calculus\" Gaussian)"
  },
  {
    "type": "para",
    "text": "Examiners intentionally write integrals that are mathematically impossible to solve by hand. The pattern is to recognize the Gaussian shape and bypass integration entirely by matching coefficients."
  },
  {
    "type": "heading",
    "text": "Solved Example (The Full Area Trick)"
  },
  {
    "type": "para",
    "text": "<b>The Problem:</b> Evaluate the integral \\(I = \\int_{-\\infty}^{\\infty} e^{-5x^2} dx\\)."
  },
  {
    "type": "para",
    "text": "<b>Step-by-Step Execution:</b><br>1. <b>Match the Exponent:</b> Force the given exponent to match the standard Gaussian form \\(\\frac{-x^2}{2\\sigma_x^2}\\)."
  },
  {
    "type": "eq",
    "tex": "-5x^2 = \\frac{-x^2}{(1/5)} \\implies 2\\sigma_x^2 = \\frac{1}{5}"
  },
  {
    "type": "para",
    "text": "2. <b>Extract the Variance:</b>"
  },
  {
    "type": "eq",
    "tex": "\\sigma_x^2 = \\frac{1}{10} = 0.1"
  },
  {
    "type": "para",
    "text": "3. <b>Apply the Total Area Shortcut:</b> We know the integral of a standard un-normalized Gaussian \\(e^{\\frac{-x^2}{2\\sigma_x^2}}\\) over all space is simply \\(\\sqrt{2\\pi\\sigma_x^2}\\)."
  },
  {
    "type": "eq",
    "tex": "I = \\sqrt{2\\pi \\left(\\frac{1}{10}\\right)} = \\sqrt{\\frac{\\pi}{5}}"
  },
  {
    "type": "heading",
    "text": "Exam-Style Variations"
  },
  {
    "type": "para",
    "text": "<b>Variation A (The Even Function Bound):</b> Evaluate \\(\\int_{0}^{\\infty} e^{-3x^2} dx\\).<br><em>Pattern Recognition:</em> The bounds are 0 to \\(\\infty\\). Because \\(e^{-3x^2}\\) is a perfectly symmetrical even function, this is exactly half the total area. Calculate the full area using \\(2\\sigma_x^2 = 1/3\\), then multiply by \\(0.5\\). Answer: \\(\\frac{1}{2} \\sqrt{\\frac{\\pi}{3}}\\)."
  },
  {
    "type": "para",
    "text": "<b>Variation B (Extracting Moments):</b> Evaluate \\(\\int_{-\\infty}^{\\infty} x^2 e^{\\frac{-(x-4)^2}{12}} dx\\).<br><em>Pattern Recognition:</em> You are multiplying \\(x^2\\) by a Gaussian shape. This is the definition of the second moment (Mean Square Value, \\(E[X^2]\\)). Find the normalization constant (\\(\\sqrt{12\\pi}\\)), find \\(\\mu_x\\) (4) and \\(\\sigma_x^2\\) (6), then use \\(E[X^2] = \\sigma_x^2 + \\mu_x^2\\). Multiply the final expected value by the missing normalization constant."
  },
  {
    "type": "heading",
    "text": "🧩 Type 4: Baseband Digital PAM (Constellations & \\(P_e\\))"
  },
  {
    "type": "para",
    "text": "In digital communications, questions revolve around mapping voltages into \"Energy Space\" to find the distance between symbols. The closer the symbols, the higher the Probability of Error (\\(P_e\\))."
  },
  {
    "type": "heading",
    "text": "Solved Example (2-Ary PAM Error Calculation)"
  },
  {
    "type": "para",
    "text": "<b>The Problem:</b> A 2-Ary PAM system transmits pulses of amplitude \\(+A\\) for bit '1' and \\(-A\\) for bit '0' over a bit duration \\(T_b\\). Find the exact Probability of Error (\\(P_e\\)) given noise spectral density \\(N_0\\)."
  },
  {
    "type": "para",
    "text": "<b>Step-by-Step Execution:</b><br>1. <b>Calculate Symbol Energy (\\(E_s\\)):</b> Energy is voltage squared times time."
  },
  {
    "type": "eq",
    "tex": "E_s = (A)^2 \\times T_b = A^2 T_b"
  },
  {
    "type": "para",
    "text": "2. <b>Map to Constellation:</b> The symbols live on a 1D number line at coordinates \\(+\\sqrt{E_s}\\) and \\(-\\sqrt{E_s}\\)."
  },
  {
    "type": "para",
    "text": "3. <b>Find the Distance (\\(d_{12}\\)):</b>"
  },
  {
    "type": "eq",
    "tex": "d_{12} = \\sqrt{E_s} - (-\\sqrt{E_s}) = 2\\sqrt{E_s}"
  },
  {
    "type": "para",
    "text": "4. <b>Plug into Master Error Formula:</b> Use \\(P_e = Q\\left[ \\sqrt{\\frac{d_{12}^2}{2N_0}} \\right]\\)."
  },
  {
    "type": "eq",
    "tex": "d_{12}^2 = 4E_s = 4A^2 T_b, \\qquad P_e = Q\\left[ \\sqrt{\\frac{4A^2 T_b}{2N_0}} \\right] = Q\\left[ \\sqrt{\\frac{2A^2 T_b}{N_0}} \\right]"
  },
  {
    "type": "heading",
    "text": "Exam-Style Variations"
  },
  {
    "type": "para",
    "text": "<b>Variation A (The 4-Ary Time Trap):</b> Calculate the minimum distance (\\(d_{min}\\)) for 4-Ary PAM where symbols are \\(+A, +A/2, -A/2, -A\\).<br><em>Pattern Recognition:</em> 4-Ary sends 2 bits at once, meaning the symbol time doubles to \\(T = 2T_b\\). The coordinate rule is \\(\\text{Voltage} \\times \\sqrt{\\text{Time}}\\). The smallest gap is between \\(A/2\\) and \\(A\\), which is a voltage gap of \\(A/2\\). Therefore, \\(d_{min} = \\frac{A}{2}\\sqrt{2T_b}\\)."
  },
  {
    "type": "para",
    "text": "<b>Variation B (Bandpass ASK Energy):</b> Find \\(P_e\\) if the baseband pulse is replaced by an ASK (On-Off Keying) high-frequency carrier wave.<br><em>Pattern Recognition:</em> Carriers are sine waves, which average out to half power. The active pulse energy drops to \\(\\frac{A^2 T_b}{2}\\). Since bit '0' transmits nothing (0 energy), the Average Bit Energy is cut in half again: \\((E_b)_{avg} = \\frac{A^2 T_b}{4}\\)."
  },
  {
    "type": "heading",
    "text": "🧩 Type 5: Channel Matrices (The Information Theory Trap)"
  },
  {
    "type": "para",
    "text": "In Information Theory, you will be given matrices and asked to find output probabilities or joint probabilities. The pattern is to recognize <em>which</em> matrix you are looking at to avoid violating the laws of probability."
  },
  {
    "type": "heading",
    "text": "Solved Example (Binary Output Calculation)"
  },
  {
    "type": "para",
    "text": "<b>The Problem:</b> You are given the Conditional Matrix \\([P(Y|X)]\\) for a non-symmetric binary channel, where the crossover errors are \\(p = 0.2\\) and \\(q = 0.3\\). If the input probabilities are \\(P(X_0) = 0.6\\) and \\(P(X_1) = 0.4\\), find the output probabilities \\([P(Y)]\\)."
  },
  {
    "type": "para",
    "text": "<b>Step-by-Step Execution:</b><br>1. <b>Build the Conditional Matrix \\([P(Y|X)]\\):</b> The Golden Rule: <b>Every row MUST sum to 1</b>.<br>Row 1 (\\(X_0\\)): \\((1-p)\\) and \\(p \\implies [0.8 \\quad 0.2]\\)<br>Row 2 (\\(X_1\\)): \\(q\\) and \\((1-q)\\) \\implies [0.3 \\quad 0.7]\\)"
  },
  {
    "type": "eq",
    "tex": "[P(Y|X)] = \\begin{bmatrix} 0.8 & 0.2 \\\\ 0.3 & 0.7 \\end{bmatrix}"
  },
  {
    "type": "para",
    "text": "2. <b>Set up the Input Matrix \\([P(X)]\\):</b> This is always a row matrix."
  },
  {
    "type": "eq",
    "tex": "[P(X)] = \\begin{bmatrix} 0.6 & 0.4 \\end{bmatrix}"
  },
  {
    "type": "para",
    "text": "3. <b>Execute the Matrix Multiplication:</b> \\([P(Y)] = [P(X)] \\times [P(Y|X)]\\)"
  },
  {
    "type": "eq",
    "tex": "P(Y_0) = (0.6 \\times 0.8) + (0.4 \\times 0.3) = 0.60, \\quad P(Y_1) = (0.6 \\times 0.2) + (0.4 \\times 0.7) = 0.40"
  },
  {
    "type": "heading",
    "text": "Exam-Style Variations"
  },
  {
    "type": "para",
    "text": "<b>Variation A (The Joint Matrix Conversion):</b> You are asked to find the overall Joint Matrix \\([P(X,Y)]\\).<br><em>Pattern Recognition:</em> Do not use matrix multiplication. Multiply <em>Row 1</em> of the conditional matrix by \\(P(X_0)\\), and <em>Row 2</em> by \\(P(X_1)\\). The rule here changes: the <b>entire matrix</b> must sum to 1."
  },
  {
    "type": "para",
    "text": "<b>Variation B (Matrix Identification):</b> You are given a matrix and asked to identify the channel type.<br><em>Pattern Recognition:</em> If the matrix is a perfect identity matrix (diagonal 1s, everything else 0), it is a <b>Noiseless Channel</b>. If every column has exactly one non-zero element, it is a <b>Lossless Channel</b>."
  },
  {
    "type": "heading",
    "text": "🧩 Type 6: Superheterodyne Receivers (The Image Frequency Ghost)"
  },
  {
    "type": "para",
    "text": "Exams test your understanding of why we use an Intermediate Frequency (\\(IF\\)) and how to calculate the interference it accidentally creates."
  },
  {
    "type": "heading",
    "text": "Solved Example (Image Frequency & IRR)"
  },
  {
    "type": "para",
    "text": "<b>The Problem:</b> A superheterodyne receiver is tuned to a target signal frequency \\(f_s = 1000\\text{ kHz}\\). The receiver's \\(IF\\) is \\(455\\text{ kHz}\\). Calculate the Image Frequency (\\(f_{si}\\)) and the Image Rejection Ratio (\\(\\alpha\\)) if the antenna's Quality Factor (\\(Q\\)) is 50."
  },
  {
    "type": "para",
    "text": "<b>Step-by-Step Execution:</b><br>1. <b>Calculate the Image Frequency (\\(f_{si}\\)):</b> This is the \"Cheat Code\" formula. The ghost frequency is always \\(2 \\times IF\\) away from your target."
  },
  {
    "type": "eq",
    "tex": "f_{si} = f_s + 2IF = 1000 + 2(455) = 1910\\text{ kHz}"
  },
  {
    "type": "para",
    "text": "2. <b>Calculate the Ratio \\(\\rho\\):</b>"
  },
  {
    "type": "eq",
    "tex": "\\rho = \\frac{f_{si}}{f_s} - \\frac{f_s}{f_{si}} = \\frac{1910}{1000} - \\frac{1000}{1910} = 1.387"
  },
  {
    "type": "para",
    "text": "3. <b>Calculate Image Rejection Ratio (\\(\\alpha\\)):</b>"
  },
  {
    "type": "eq",
    "tex": "\\alpha = \\sqrt{1 + Q^2 \\rho^2} = \\sqrt{1 + 2500(1.387)^2} \\approx 69.2"
  },
  {
    "type": "heading",
    "text": "🧩 Type 7: Variance of Linear Combinations (The Negative Sign Trap)"
  },
  {
    "type": "para",
    "text": "Professors notoriously bait students into subtracting variances when combining random signals."
  },
  {
    "type": "heading",
    "text": "Solved Example (Variance of a Difference)"
  },
  {
    "type": "para",
    "text": "<b>The Problem:</b> You define a new signal \\(Z = 2X - 3Y\\). If \\(X\\) and \\(Y\\) are statistically independent, what is the variance of \\(Z\\) (\\(\\sigma_Z^2\\))?"
  },
  {
    "type": "para",
    "text": "<b>Step-by-Step Execution:</b><br>1. <b>Apply the Master Variance Formula:</b>"
  },
  {
    "type": "eq",
    "tex": "\\sigma_Z^2 = a^2\\sigma_X^2 + b^2\\sigma_Y^2 + 2ab \\cdot cov(XY)"
  },
  {
    "type": "para",
    "text": "2. <b>Analyze Independence:</b> Because \\(X\\) and \\(Y\\) are independent, they are automatically uncorrelated. Therefore, the covariance term becomes strictly zero (\\(cov = 0\\)).<br>3. <b>Square the Coefficients (The Trap):</b> Variance measures AC power (chaos). It <b>never</b> subtracts. The negative sign gets squared away."
  },
  {
    "type": "eq",
    "tex": "\\sigma_Z^2 = (2)^2\\sigma_X^2 + (-3)^2\\sigma_Y^2 = 4\\sigma_X^2 + 9\\sigma_Y^2"
  },
  {
    "type": "heading",
    "text": "Exam-Style Variations"
  },
  {
    "type": "para",
    "text": "<b>Variation A (The \"Orthogonal\" Trigger):</b> The problem states \\(X\\) and \\(Y\\) are orthogonal instead of independent.<br><em>Pattern Recognition:</em> Orthogonal means Correlation \\(R_{XY} = 0\\). The covariance term \\(cov(XY) = R_{XY} - \\mu_X\\mu_Y\\) becomes just \\(-\\mu_X\\mu_Y\\). The formula becomes \\(\\sigma_W^2 = a^2\\sigma_X^2 + b^2\\sigma_Y^2 - 2ab\\mu_X\\mu_Y\\)."
  },
  {
    "type": "heading",
    "text": "🧩 Type 8: 2D Joint PDF (The \"Arrow Method\" Trap)"
  },
  {
    "type": "para",
    "text": "When you are given a Joint PDF \\(f_{XY}(x,y)\\) over a triangular region, setting the integration limits is where 90% of mistakes happen."
  },
  {
    "type": "heading",
    "text": "Solved Example (Finding Constant \\(K\\))"
  },
  {
    "type": "para",
    "text": "<b>The Problem:</b> \\(f_{XY}(x,y) = Kx\\) for the region bounded by \\((x \\ge 0) \\cap (y \\ge 0) \\cap (x+y \\le 1)\\). Find \\(K\\)."
  },
  {
    "type": "para",
    "text": "<b>Step-by-Step Execution:</b><br>1. <b>Visualize the Region:</b> It's a right-angled triangle. The slanted roof is the line \\(x+y=1\\), which rearranges to \\(y = 1-x\\).<br>2. <b>Set Limits via the \"Arrow Method\":</b><br><em>Inner (Vertical Arrow):</em> Tail is at \\(y=0\\), head hits the roof \\(y=1-x\\). So, integrate \\(dy\\) from \\(0\\) to \\(1-x\\).<br><em>Outer (Horizontal Sweep):</em> The triangle spans from \\(x=0\\) to \\(x=1\\). So, integrate \\(dx\\) from \\(0\\) to \\(1\\)."
  },
  {
    "type": "eq",
    "tex": "\\int_{0}^{1} \\int_{0}^{1-x} Kx \\, dy \\, dx = 1"
  },
  {
    "type": "para",
    "text": "3. <b>Execute the Double Integral:</b>"
  },
  {
    "type": "eq",
    "tex": "\\int_{0}^{1} (Kx - Kx^2) dx = K\\left[\\frac{1}{2} - \\frac{1}{3}\\right] = \\frac{K}{6}"
  },
  {
    "type": "para",
    "text": "4. <b>Solve:</b> \\(\\frac{K}{6} = 1 \\implies K = 6\\)."
  },
  {
    "type": "heading",
    "text": "🧩 Type 9: Convolution Shapes (The \"No Calculus\" Trick)"
  },
  {
    "type": "para",
    "text": "When summing two independent Uniform Random Variables (\\(Z = X + Y\\)), their PDF is the convolution of two rectangles. Do not integrate; use pure geometry."
  },
  {
    "type": "para",
    "text": "<b>Variation A (Same Widths):</b> \\(X \\sim U[-2, 2]\\) and \\(Y \\sim U[-2, 2]\\). Find the shape of \\(Z\\).<br><em>Pattern Recognition:</em> Two rectangles of the <em>same</em> width convoluted always make a <b>Triangle</b>."
  },
  {
    "type": "para",
    "text": "<b>Variation B (Different Widths):</b> \\(X \\sim U[-2, 2]\\) and \\(Y \\sim U[-4, 4]\\). Find the shape of \\(Z\\).<br><em>Pattern Recognition:</em> Two rectangles of <em>different</em> widths always make a <b>Trapezium</b>. The top flat plateau width is just the difference of their individual widths (\\(8 - 4 = 4\\)). Total base width is the sum (\\(8 + 4 = 12\\))."
  },
  {
    "type": "heading",
    "text": "🧩 Type 10: WBFM Bessel Harmonics"
  },
  {
    "type": "para",
    "text": "Wideband FM expands into an infinite series. Exams will ask for the amplitude of one specific frequency."
  },
  {
    "type": "heading",
    "text": "Solved Example (Finding the Coefficient)"
  },
  {
    "type": "para",
    "text": "<b>The Problem:</b> \\(C(t) = 5\\cos(2\\pi \\times 10^6 t)\\) and \\(m(t) = \\cos(4\\pi \\times 10^3 t)\\). The FM modulation index \\(\\beta = 6\\). Find the coefficient of the \\(\\cos(2\\pi \\times 1016 \\times 10^3 t)\\) term."
  },
  {
    "type": "para",
    "text": "<b>Step-by-Step Execution:</b><br>1. <b>Extract Frequencies:</b> \\(f_c = 1000\\text{ kHz}\\) and \\(f_m = 2\\text{ kHz}\\).<br>2. <b>Match the Target:</b> A WBFM component is at \\(f_c + n f_m\\)."
  },
  {
    "type": "eq",
    "tex": "1000 + n(2) = 1016 \\implies 2n = 16 \\implies n = 8"
  },
  {
    "type": "para",
    "text": "3. <b>Extract Coefficient:</b> The amplitude is always \\(A_c J_n(\\beta)\\)."
  },
  {
    "type": "eq",
    "tex": "\\text{Answer: } 5 J_8(6)"
  },


  {
    "id": "theory_core",
    "label": "2 · Theory Core",
    "title": "THEORY CORE: Layer 3 Execution",
    "content": [
      {
        "type": "para",
        "text": "Bulletproof structures to memorize fast for written theory and viva questions."
      },
      {
        "type": "heading",
        "text": "📝 5-Mark Question: Compare Narrowband FM (NBFM) vs. Wideband FM (WBFM)"
      },
      {
        "type": "para",
        "text": "<table border='1' cellpadding='8' style='border-collapse: collapse; width: 100%; text-align: left;'><tr><th>Parameter</th><th>Narrowband FM (NBFM)</th><th>Wideband FM (WBFM)</th></tr><tr><td><b>Modulation Index (\\(\\beta\\))</b></td><td>\\(\\beta < 0.6\\) (or \\(\\beta \\ll 1\\))</td><td>\\(\\beta > 0.6\\) (or \\(\\beta \\gg 1\\))</td></tr><tr><td><b>Bandwidth</b></td><td>\\(BW = 2f_m\\) (Same as AM)</td><td>\\(BW = 2(\\beta + 1)f_m\\) (Carson's Rule)</td></tr><tr><td><b>Frequency Spectrum</b></td><td>Carrier + 1 USB + 1 LSB</td><td>Carrier + Infinite Sidebands</td></tr><tr><td><b>LSB Phase</b></td><td>180° out of phase (inverted)</td><td>Evaluated via Bessel functions</td></tr><tr><td><b>Mathematical Expansion</b></td><td>Simple trigonometric approximation</td><td>Infinite series using Bessel Functions (\\(J_n(\\beta)\\))</td></tr></table>"
      },
      {
        "type": "heading",
        "text": "📝 10-Mark Question: Explain the Superheterodyne Receiver with a Block Diagram"
      },
      {
        "type": "para",
        "text": "<b>1. The Core Problem:</b> Radio signals are weak and high-frequency. Building a tunable amplifier for every possible channel is expensive and unstable.<br><br><b>2. The Solution:</b> Step <em>any</em> incoming signal down to one standard, fixed Intermediate Frequency (IF), allowing the use of one highly optimized amplifier.<br><br><b>3. Key Components (The Diagram Flow):</b><br><ul><li><b>Antenna & Pre-selector:</b> Filters out the dangerous Image Frequency (\\(f_{si} = f_s + 2IF\\)) before it enters the system.</li><li><b>Local Oscillator (\\(f_{LO}\\)):</b> An internal signal generator. Tuning the radio actually changes this frequency.</li><li><b>The Mixer (\\(\\otimes\\)):</b> Multiplies the incoming signal (\\(f_s\\)) with the Local Oscillator (\\(f_{LO}\\)) to produce the difference frequency: \\(IF = |f_s - f_{LO}|\\). For AM, this is standard at \\(455\\text{ kHz}\\).</li><li><b>IF Amplifier:</b> Amplifies the fixed IF signal cleanly.</li><li><b>Demodulator:</b> Recovers the original baseband message.</li></ul>"
      },
      {
        "type": "heading",
        "text": "📝 10-Mark Question: Explain the Correlator Receiver Architecture for Bandpass Signals"
      },
      {
        "type": "para",
        "text": "<b>1. Purpose:</b> Detects digital bandpass signals (ASK, PSK, FSK) buried in Additive White Gaussian Noise (AWGN).<br><br><b>2. Architecture Steps:</b><br><ul><li><b>Multiplier (Mixer):</b> The noisy incoming signal \\(S(t) + W(t)\\) is multiplied by a perfectly synchronized, locally generated basis function \\(\\phi(t)\\). <em>Note:</em> If there is a phase mismatch (\\(\\theta\\)), the detected energy is degraded by \\(\\cos \\theta\\).</li><li><b>Integrator:</b> The multiplied signal is integrated precisely over one bit duration (\\(T_b\\)) to accumulate the symbol energy.</li><li><b>Sampler:</b> A switch closes exactly at \\(t = T_b\\) to sample the final scalar energy value (\\(Y\\)).</li><li><b>Decision Device:</b> Compares \\(Y\\) against an optimal threshold (\\(\\lambda_{opt}\\)). If \\(Y > \\lambda_{opt}\\), it outputs bit '1'. If below, it outputs bit '0'.</li></ul>"
      },
    ]
  },
]
},
  
  
  // ══════════════════════════
  // CHAPTER 1 — AM Basics
  // ══════════════════════════
  {
    id: "am_basics",
    label: "1 · AM Basics",
    title: "1. Amplitude Modulation — DSB-FC",
    content: [

      { type: "heading", text: "1.1  Carrier Signal" },
      { type: "para",   text: "Before modulation the carrier is an unmodified sinusoid with constant amplitude \\(A_c\\) and constant frequency \\(f_c\\):" },
      { type: "eq",     tex:  "c(t) = A_c \\cos(2\\pi f_c t)" },

      { type: "heading", text: "1.2  DSB-FC Modulated Signal" },
      { type: "para",   text: "In Double Sideband Full Carrier (conventional AM) the carrier amplitude is varied by the message \\(m(t)\\):" },
      { type: "eq",     tex:  "s(t) = [A_c + m(t)]\\cos(2\\pi f_c t)" },
      { type: "para",   text: "Define the envelope \\(A(t) = A_c + m(t)\\), so \\(s(t) = A(t)\\cos(2\\pi f_c t)\\)." },

      { type: "heading", text: "1.3  Modulation Index" },
      { type: "para",   text: "The modulation index \\(\\mu\\) (unitless) quantifies the extent of modulation. Always take the <em>absolute</em> maximum of \\(m(t)\\):" },
      { type: "eq",     tex:  "\\mu = \\frac{\\max|m(t)|}{A_c}" },
      { type: "para",   text: "Depth of modulation = \\(\\mu \\times 100\\%\\)." },

      { type: "heading", text: "1.4  Worked Examples" },
      { type: "table",
        headers: ["Signal range", "\\(\\max|m(t)|\\)", "\\(A_c\\)", "\\(\\mu\\)"],
        rows: [
          ["\\([-4,+4]\\)", "4", "10", "0.4"],
          ["\\([-2,+6]\\)", "6", "10", "0.6"],
          ["\\([-8,+2]\\)", "8", "10", "0.8"]
        ]
      }
    ]
  },

  // ══════════════════════════
  // CHAPTER 2 — Freq & Power
  // ══════════════════════════
  {
    id: "freq_power",
    label: "2 · Freq & Power",
    title: "2. Frequency Domain and Power Analysis",
    content: [

      { type: "heading", text: "2.1  Spectral Components of DSB-FC" },
      { type: "para",   text: "A conventional AM signal has three spectral components:" },
      { type: "list",   items: [
          "Carrier impulse at \\(f_c\\)",
          "Upper sideband (USB) at \\(f_c + f_m\\)",
          "Lower sideband (LSB) at \\(f_c - f_m\\)"
        ]
      },
      { type: "eq", tex: "BW = 2f_m" },

      { type: "heading", text: "2.2  Power Relations" },
      { type: "para", text: "Total transmitted power for a single-tone sinusoidal message:" },
      { type: "eq",  tex: "P_t = P_c\\!\\left(1 + \\frac{\\mu^2}{2}\\right)" },
      { type: "para", text: "Power in both sidebands (the information-bearing part):" },
      { type: "eq",  tex: "P_{sb} = \\frac{P_c\\,\\mu^2}{2}" },

      { type: "heading", text: "2.3  Modulation Efficiency" },
      { type: "eq", tex: "\\eta = \\frac{\\mu^2}{2+\\mu^2}\\times 100\\%" },
      { type: "para", text: "Maximum efficiency at \\(\\mu = 1\\) is \\(\\eta_{\\max} = 33.33\\%\\). At least two-thirds of transmitted power is consumed by the carrier and carries no information." },

      { type: "heading", text: "2.4  Power Summary" },
      { type: "table",
        headers: ["\\(\\mu\\)", "\\(P_t/P_c\\)", "\\(P_{sb}/P_c\\)", "\\(\\eta\\)"],
        rows: [
          ["0.3", "1.045", "0.045", "4.3%"],
          ["0.5", "1.125", "0.125", "11.1%"],
          ["0.8", "1.320", "0.320", "24.2%"],
          ["1.0", "1.500", "0.500", "33.3%"]
        ]
      }
    ]
  },

  // ══════════════════════════
  // CHAPTER 3 — Envelope
  // ══════════════════════════
  {
    id: "envelope",
    label: "3 · Envelope",
    title: "3. Envelope Analysis and Demodulation",
    content: [

      { type: "heading", text: "3.1  Envelope Parameters" },
      { type: "eq", tex: "V_{\\max} = A_c(1+\\mu),\\qquad V_{\\min} = A_c(1-\\mu)" },
      { type: "para", text: "These allow direct measurement from an oscilloscope:" },
      { type: "eq", tex: "\\mu = \\frac{V_{\\max}-V_{\\min}}{V_{\\max}+V_{\\min}},\\qquad A_c = \\frac{V_{\\max}+V_{\\min}}{2}" },

      { type: "heading", text: "3.2  Condition for Distortion-Free Recovery" },
      { type: "para", text: "An envelope detector outputs \\(E(t)=|A(t)|\\). For faithful recovery the envelope must stay positive:" },
      { type: "eq", tex: "A(t) = A_c + m(t) > 0 \\;\\Longleftrightarrow\\; \\mu \\le 1" },

      { type: "heading", text: "3.3  Modulation States" },
      { type: "table",
        headers: ["Condition", "Behaviour", "\\(E(t)\\)", "Recovery"],
        rows: [
          ["\\(\\mu<1\\) — Under",    "\\(A(t)>0\\) always",              "\\(A_c+m(t)\\)",             "✓ Clean"],
          ["\\(\\mu=1\\) — Critical", "Envelope just touches zero",        "\\(A_c+m(t)\\)",             "✓ Clean"],
          ["\\(\\mu>1\\) — Over",     "Phase reversal at zero crossings",  "\\(|A_c+m(t)|\\) distorted", "✗ Distorted"]
        ]
      },
      { type: "para", text: "After detection, a DC-blocking capacitor removes \\(A_c\\) to recover \\(m(t)\\)." }
    ]
  },

  // ══════════════════════════
  // CHAPTER 4 — DSB-SC
  // ══════════════════════════
  {
    id: "dsbsc",
    label: "4 · DSB-SC",
    title: "4. Double Sideband Suppressed Carrier (DSB-SC)",
    content: [

      { type: "heading", text: "4.1  Signal Expression" },
      { type: "para", text: "DSB-SC eliminates the carrier. The transmitted signal is simply the product of the message and carrier:" },
      { type: "eq",  tex: "s_{SC}(t) = m(t)\\cos(2\\pi f_c t)" },

      { type: "heading", text: "4.2  Spectrum" },
      { type: "para", text: "USB at \\(f_c+f_m\\) and LSB at \\(f_c-f_m\\) are present, but <em>no impulse at \\(f_c\\)</em>. Bandwidth is unchanged:" },
      { type: "eq",  tex: "BW_{DSB\\text{-}SC} = 2f_m" },

      { type: "heading", text: "4.3  Power and Efficiency" },
      { type: "para", text: "All transmitted power goes to the sidebands:" },
      { type: "eq",  tex: "P_t = P_{sb},\\qquad \\eta_{DSB\\text{-}SC} = 100\\%" },

      { type: "heading", text: "4.4  Coherent Demodulation" },
      { type: "para", text: "An envelope detector cannot recover DSB-SC because the envelope is \\(|m(t)|\\). Coherent detection multiplies by a local carrier then low-pass filters:" },
      { type: "eq",  tex: "s(t)\\cdot\\cos(2\\pi f_c t) = \\frac{m(t)}{2} + \\frac{m(t)}{2}\\cos(4\\pi f_c t) \\;\\xrightarrow{\\text{LPF}}\\; \\tfrac{1}{2}m(t)" },

      { type: "heading", text: "4.5  DSB-FC vs DSB-SC" },
      { type: "table",
        headers: ["Property", "DSB-FC", "DSB-SC"],
        rows: [
          ["Signal",       "\\([A_c+m(t)]\\cos(2\\pi f_c t)\\)", "\\(m(t)\\cos(2\\pi f_c t)\\)"],
          ["Carrier",      "Present",   "Suppressed"],
          ["BW",           "\\(2f_m\\)","\\(2f_m\\)"],
          ["Max \\(\\eta\\)", "33.33%", "100%"],
          ["Demodulation", "Envelope (simple)", "Coherent (complex)"]
        ]
      }
    ]
  },
    // ══════════════════════════
  // CHAPTER 5 — Gen Power Analysis
  // ══════════════════════════
  {
    id: "gen_power",
    label: "5 · Gen Power",
    title: "5. Generalized Power Analysis",
    content: [

      // --- SECTION: ENVELOPE REQUISITE ---
      { type: "heading", text: "5.1  Envelope Detection Requisite" },
      { type: "para",   text: "For an envelope detector to work without distortion, the envelope signal must remain positive. If it crosses zero, phase reversals occur, and the detector outputs the absolute value, leading to distortion:" },
      { type: "eq",     tex:  "|A(t)|" },

      // --- SECTION: CORE POWER FORMULA ---
      { type: "heading", text: "5.2  Total Power Equation" },
      { type: "para",   text: "The total transmitted power in an AM signal is the sum of the unmodulated carrier power and the sideband power generated by the message signal." },
      { type: "eq",     tex:  "P_t = P_c + P_{sb}" },
      { type: "para",   text: "Derived from the fundamental AM signal equation:" },
      { type: "eq",     tex:  "s(t) = A_c \\cos(2\\pi f_c t) + m(t) \\cos(2\\pi f_c t)" },

      // --- SECTION: GENERAL POWER EQUATIONS ---
      { type: "heading", text: "5.3  General Power Components" },
      { type: "list",   items: [
          "<b>Carrier Power:</b> Depends only on carrier amplitude.",
          "<b>Sideband Power:</b> Depends entirely on the message signal power."
        ]
      },
      { type: "eq",     tex:  "P_c = \\frac{A_c^2}{2}, \\qquad P_{sb} = \\frac{P_m}{2}" },
      { type: "para",   text: "Substituting these yields the generalized power equation (where \\(P_m\\) is the power of the message signal):" },
      { type: "eq",     tex:  "P_t = P_c \\left[ 1 + \\frac{P_m}{A_c^2} \\right]" },

      // --- SECTION: SIDEBAND SPLIT ---
      { type: "heading", text: "5.4  Sideband Power Distribution" },
      { type: "para",   text: "Because conventional AM (DSB-FC) has two sidebands, the information power is split equally between the Upper (USB) and Lower (LSB) sidebands:" },
      { type: "eq",     tex:  "P_{USB} = P_{LSB} = \\frac{P_m}{4}" },

      // --- SECTION: EFFICIENCY METRICS ---
      { type: "heading", text: "5.5  Efficiency & Carrier Overhead" },
      { type: "para",   text: "<b>The Unused Power:</b> The carrier power carries absolutely no information, yet it consumes the vast majority of the total power (at least 66.6% for single-tone at critical modulation). Information is only contained in the sidebands." },
      { type: "para",   text: "<b>Modulation Efficiency (\\(\\eta\\)):</b> The ratio of useful power (sidebands) to total transmitted power:" },
      { type: "eq",     tex:  "\\eta = \\frac{P_{sb}}{P_t} \\times 100\\%" }

    ]
  },
  
  // ══════════════════════════
  // CHAPTER 7 — Fourier Analysis
  // ══════════════════════════
  {
    id: "fourier_am",
    label: "7 · Fourier Analysis",
    title: "7. Fourier Transform of AM Signal",
    content: [

      { type: "heading", text: "7.1  Time-Domain to Frequency-Domain" },
      { type: "para", text: "To determine the exact spectrum of any modulated signal \\(s(t)\\), we apply the Fourier Transform to the standard AM equation. We assume the message signal \\(m(t)\\) is bandlimited to a maximum frequency of \\(f_m\\)." },
      { type: "eq", tex: "s(t) = A_c \\cos(2\\pi f_c t) + m(t) \\cos(2\\pi f_c t)" },

      { type: "heading", text: "7.2  The Spectrum Equation S(f)" },
      { type: "para", text: "Applying the frequency-shifting property of Fourier Transforms, multiplying by a cosine function shifts the spectrum to \\(+f_c\\) and \\(-f_c\\):" },
      { type: "eq", tex: "S(f) = \\frac{A_c}{2} [\\delta(f - f_c) + \\delta(f + f_c)] + \\frac{1}{2} [M(f - f_c) + M(f + f_c)]" },
      
      { type: "para", text: "This mathematically proves the components of the spectrum:" },
      { type: "list", items: [
          "<b>Carrier Component:</b> Two delta functions (impulses) at \\(\\pm f_c\\) with an area of \\(A_c/2\\).",
          "<b>Sideband Components:</b> The original message spectrum \\(M(f)\\) shifted to \\(\\pm f_c\\) and scaled down by half."
        ]
      },

      { type: "heading", text: "7.3  Baseband vs. Passband" },
      { type: "para", text: "<b>Baseband Signal:</b> The original message signal \\(m(t)\\) is a low-pass signal centered around zero frequency." },
      { type: "para", text: "<b>Passband Signal:</b> The modulated signal \\(s(t)\\) is a band-pass signal, shifted up to the high-frequency carrier range \\(f_c\\)." },
      
      { type: "heading", text: "7.4  Bandwidth Inefficiency" },
      { type: "para", text: "From the Fourier Transform, we can explicitly see that DSB-FC is highly bandwidth-inefficient. It transmits the exact same information twice (in the Upper and Lower sidebands) alongside a massive central carrier impulse that consumes power but carries zero message data." }

    ]
  },
  
  // ══════════════════════════
  // CHAPTER 8 — Single-Tone AM
  // ══════════════════════════
  {
    id: "single_tone_am",
    label: "8 · Single-Tone AM",
    title: "8. Single-Tone Amplitude Modulation",
    content: [

      // --- SECTION: CONTEXT ---
      { type: "heading", text: "8.1  Practical Behavior & The Single-Tone" },
      { type: "para", text: "The instructor explains that to deeply understand the practical behavior of AM, we must fix the message signal's shape. Choosing a Single-Tone Sinusoidal Signal is ideal because it serves as the fundamental building block for analyzing more complex signals." },
      { type: "para", text: "For a single-tone modulation, the message signal \\(m(t)\\) is a pure cosine wave:" },
      { type: "eq", tex: "m(t) = A_m \\cos(2\\pi f_m t), \\qquad c(t) = A_c \\cos(2\\pi f_c t)" },

      // --- SECTION: DERIVATION ---
      { type: "heading", text: "8.2  Mathematical Derivation" },
      { type: "para", text: "<b>Step 1:</b> The instructor starts with the standard DSB-FC equation and substitutes the single-tone message:" },
      { type: "eq", tex: "S(t) = [A_c + A_m \\cos(2\\pi f_m t)] \\cos(2\\pi f_c t)" },
      
      { type: "para", text: "<b>Step 2:</b> Factoring out \\(A_c\\) reveals the Modulation Index (\\(\\mu = A_m/A_c\\)):" },
      { type: "eq", tex: "S(t) = A_c \\left[1 + \\mu \\cos(2\\pi f_m t)\\right] \\cos(2\\pi f_c t)" },

      { type: "para", text: "<b>Step 3:</b> The instructor then breaks down the signal into distinct frequency components using the trigonometric identity \\(\\cos(A)\\cos(B) = \\frac{1}{2}[\\cos(A+B) + \\cos(A-B)]\\):" },
      { type: "eq", tex: "S(t) = \\underbrace{A_c \\cos(2\\pi f_c t)}_{\\text{Carrier}} + \\underbrace{\\frac{\\mu A_c}{2} \\cos[2\\pi (f_c + f_m)t]}_{\\text{Upper Sideband (USB)}} + \\underbrace{\\frac{\\mu A_c}{2} \\cos[2\\pi (f_c - f_m)t]}_{\\text{Lower Sideband (LSB)}}" },

      // --- SECTION: COMPONENT BREAKDOWN ---
      { type: "heading", text: "8.3  Component Breakdown & Bandwidth" },
      { type: "table",
        headers: ["Component", "Frequency", "Amplitude", "Description"],
        rows: [
          ["Carrier", "\\(f_c\\)", "\\(A_c\\)", "Contains no information; purely for transmission."],
          ["USB", "\\(f_c + f_m\\)", "\\(\\frac{\\mu A_c}{2}\\)", "The translated information in the higher frequency range."],
          ["LSB", "\\(f_c - f_m\\)", "\\(\\frac{\\mu A_c}{2}\\)", "The translated information in the lower frequency range."]
        ]
      },
      { type: "para", text: "As the instructor notes, the bandwidth is the difference between the highest and lowest frequency components in this spectrum. This confirms the bandwidth required for AM is exactly twice the maximum frequency of the message signal:" },
      { type: "eq", tex: "BW = (f_c + f_m) - (f_c - f_m) = 2f_m" }

    ]
  },
  
  // ══════════════════════════
  // CHAPTER 9 — Single-Tone Power
  // ══════════════════════════
  {
    id: "single_tone_power",
    label: "9 · S-Tone Power",
    title: "9. Power Analysis (Single-Tone AM)",
    content: [

      // --- SECTION: CONTEXT ---
      { type: "heading", text: "9.1  Translating Spectrum to Power" },
      { type: "para", text: "The instructor explains that by knowing the amplitudes of the carrier and sidebands from the frequency spectrum, we can calculate the power consumed by each individual component. Recall that the power for any sinusoidal term \\(A \\cos(\\theta)\\) is \\(A^2/2\\)." },

      // --- SECTION: COMPONENT CALCS ---
      { type: "heading", text: "9.2  Component Power Calculations" },
      { type: "para", text: "<b>Carrier Power (\\(P_c\\)):</b>" },
      { type: "eq", tex: "P_c = \\frac{A_c^2}{2}" },
      
      { type: "para", text: "<b>Upper & Lower Sideband Power (\\(P_{USB}\\) and \\(P_{LSB}\\)):</b>" },
      { type: "para", text: "Using the amplitude \\(\\frac{\\mu A_c}{2}\\) derived in the spectrum analysis:" },
      { type: "eq", tex: "P_{USB} = \\frac{\\left(\\frac{\\mu A_c}{2}\\right)^2}{2} = \\frac{\\mu^2 A_c^2}{8} = \\frac{\\mu^2}{4} \\left( \\frac{A_c^2}{2} \\right) = \\frac{\\mu^2 P_c}{4}" },
      { type: "eq", tex: "P_{LSB} = \\frac{\\mu^2 P_c}{4} \\quad \\text{(Due to symmetry)}" },

      { type: "para", text: "<b>Total Sideband Power (\\(P_{sb}\\)):</b>" },
      { type: "eq", tex: "P_{sb} = P_{USB} + P_{LSB} = \\frac{\\mu^2 P_c}{2}" },

      { type: "para", text: "<b>Total Transmitted Power (\\(P_t\\)):</b>" },
      { type: "eq", tex: "P_t = P_c + P_{sb} = P_c \\left( 1 + \\frac{\\mu^2}{2} \\right)" },

      // --- SECTION: EFFICIENCY ---
      { type: "heading", text: "9.3  Modulation Efficiency (\\(\\eta\\))" },
      { type: "para", text: "Efficiency represents the fraction of total power that actually carries information (the sidebands)." },
      { type: "eq", tex: "\\eta = \\frac{P_{sb}}{P_t} = \\frac{\\mu^2}{2 + \\mu^2} \\times 100\\%" },
      { type: "para", text: "<b>Key Performance Insight:</b> The instructor highlights that even at 100% modulation (\\(\\mu = 1\\)), the maximum efficiency is only 33.33%. This means 66.6% of the total power is strictly wasted on transmitting the carrier." },

      // --- SECTION: THE TRAP ---
      { type: "heading", text: "9.4  The \"General Formula\" Trap (GATE Warning)" },
      { type: "para", text: "The instructor strongly warns students against applying the formula \\(P_t = P_c(1 + \\mu^2/2)\\) blindly. <b>This formula is ONLY valid for single-tone sinusoidal messages.</b>" },
      { type: "para", text: "For any other message shape, you MUST use the general formula relying on the message power (\\(P_m\\)). Here are the standard shortcuts for calculating \\(P_m\\) based on the wave shape of the message signal \\(m(t)\\):" },
      { type: "table",
        headers: ["Message Signal Shape", "Message Power (\\(P_m\\))", "Total Power Formula"],
        rows: [
          ["Sinusoidal", "\\(\\frac{A_m^2}{2}\\)", "\\(P_t = P_c(1 + \\frac{\\mu^2}{2})\\)"],
          ["Square Wave", "\\(A_m^2\\)", "\\(P_t = P_c(1 + \\mu^2)\\)"],
          ["Triangular Wave", "\\(\\frac{A_m^2}{3}\\)", "\\(P_t = P_c(1 + \\frac{\\mu^2}{3})\\)"]
        ]
      }

    ]
  },
  
  // ══════════════════════════
  // CHAPTER 10 — Multi-Tone AM
  // ══════════════════════════
  {
    id: "multi_tone",
    label: "10 · Multi-Tone",
    title: "10. Power Limits & Multi-Tone AM",
    content: [

      // --- SECTION: POWER SCALING ---
      { type: "heading", text: "10.1  Power Scaling (0 to 100% Modulation)" },
      { type: "para", text: "The instructor discusses a classic exam scenario: \"What happens when \\(\\mu\\) increases from 0 to 1?\" He analyzes the power scaling when moving from no modulation to full modulation." },
      { type: "eq", tex: "P_t (\\mu=0) = P_c \\left(1 + \\frac{0^2}{2}\\right) = P_c" },
      { type: "eq", tex: "P_t (\\mu=1) = P_c \\left(1 + \\frac{1^2}{2}\\right) = 1.5 P_c" },
      { type: "para", text: "<b>Conclusion:</b> The instructor demonstrates that increasing modulation from 0 to 100% results in exactly a 50% increase in total transmitted power. This is a common \"shortcut\" students should memorize for competitive exams like GATE, noting that this power increase occurs entirely within the sidebands." },

      // --- SECTION: MULTI-TONE ---
      { type: "heading", text: "10.2  Multi-Tone Modulation Expression" },
      { type: "para", text: "Real-world signals (like voice) are not one frequency but a sum of many. The instructor introduces the mathematical expression for a message containing two different frequencies:" },
      { type: "eq", tex: "m(t) = A_{m1} \\cos(2\\pi f_{m1}t) + A_{m2} \\cos(2\\pi f_{m2}t)" },
      { type: "para", text: "With individual modulation indices \\(\\mu_1 = A_{m1}/A_c\\) and \\(\\mu_2 = A_{m2}/A_c\\), the general AM equation becomes:" },
      { type: "eq", tex: "s(t) = A_c [1 + \\mu_1 \\cos(2\\pi f_{m1}t) + \\mu_2 \\cos(2\\pi f_{m2}t)] \\cos(2\\pi f_ct)" },

      // --- SECTION: SPECTRUM ---
      { 
        type: "canvas_sim_dual", 
        simId: "multitone_spec_sim", 
        height: 180, 
        controlLabel1: "Tone 1 (μ₁):", min1: 0, max1: 1.0, step1: 0.1, defaultVal1: 0.6,
        controlLabel2: "Tone 2 (μ₂):", min2: 0, max2: 1.0, step2: 0.1, defaultVal2: 0.5
      },
      
      // --- SECTION: GATE TAKEAWAYS ---
      { type: "heading", text: "10.4  Key Takeaways for GATE" },
      { type: "para", text: "<b>Bandwidth Rule:</b> In multi-tone modulation, the bandwidth is strictly determined by the highest frequency component in the message signal:" },
      { type: "eq", tex: "BW = 2 \\times \\max(f_{m1}, f_{m2}, \\dots)" },
      { type: "para", text: "<b>Modulation Index Warning:</b> Do not simply add \\(\\mu_1 + \\mu_2\\). The instructor warns that the Total Modulation Index (\\(\\mu_t\\)) follows a \"root sum of squares\" rule:" },
      { type: "eq", tex: "\\mu_t = \\sqrt{\\mu_1^2 + \\mu_2^2 + \\dots}" }

    ]
  },
  
  // ══════════════════════════
  // CHAPTER 11 — Message Shapes
  // ══════════════════════════
  {
    id: "message_shapes",
    label: "11 · Wave Shapes",
    title: "11. Impact of Message Signal Shape",
    content: [

      // --- SECTION: MULTI-TONE POWER ---
      { type: "heading", text: "11.1  Multi-Tone Power & Efficiency" },
      { type: "para", text: "Building on the multi-tone spectrum, the instructor details how to calculate total power and efficiency using the Total Modulation Index (\\(\\mu_t\\))." },
      { type: "eq", tex: "P_t = P_c \\left( 1 + \\frac{\\mu_t^2}{2} \\right)" },
      { type: "eq", tex: "\\eta = \\frac{\\mu_t^2}{2 + \\mu_t^2} \\times 100\\%" },

      // --- SECTION: SQUARE WAVE AM ---
      { type: "heading", text: "11.2  Square Wave Message Modulation" },
      { type: "para", text: "The instructor introduces a case where the message is a Square Wave with amplitude \\(A_m\\). He explicitly warns: <em>\"Students often memorize \\(1 + \\mu^2/2\\) and use it everywhere. That is a blunder. That formula is ONLY for sinusoidal waves.\"</em>" },
      { type: "para", text: "For a square wave, the message power is \\(P_m = A_m^2\\). This removes the \\(1/2\\) factor from the standard power derivation:" },
      { type: "eq", tex: "P_t = P_c(1 + \\mu^2), \\qquad \\eta = \\frac{\\mu^2}{1 + \\mu^2} \\times 100\\%" },
      { type: "para", text: "At 100% modulation (\\(\\mu = 1\\)), the sideband power actually equals the carrier power (\\(P_t = 2P_c\\)), yielding a maximum efficiency of 50%." },

      // --- SECTION: MASTER SUMMARY TABLE ---
      { type: "heading", text: "11.3  Master Summary: Message Shapes" },
      { type: "para", text: "The lecture concludes this segment with a definitive comparison table for different message waveforms \\(m(t)\\) at a modulation index of \\(\\mu\\)." },
      { type: "table",
        headers: ["Message Shape", "Total Power (\\(P_t\\))", "Max Efficiency (\\(\\eta_{\\max}\\) at \\(\\mu=1\\))"],
        rows: [
          ["Sinusoidal", "\\(P_c\\left(1 + \\frac{\\mu^2}{2}\\right)\\)", "33.33%"],
          ["Square Wave", "\\(P_c(1 + \\mu^2)\\)", "50%"],
          ["Triangular Wave", "\\(P_c\\left(1 + \\frac{\\mu^2}{3}\\right)\\)", "25%"]
        ]
      },
      { type: "list", items: [
          "<b>Sinusoidal Case:</b> The standard textbook case. Sideband power is exactly half of the carrier power at 100% modulation.",
          "<b>Square Wave Case:</b> The most efficient shape. More information power is packed into the sidebands.",
          "<b>Triangular Case:</b> The least efficient shape. Only 25% of the total transmitted power is useful information at maximum modulation."
        ]
      },

      // --- SECTION: GATE TRAP ---
      { type: "heading", text: "11.4  GATE Distinction: Modulation vs. Mobility" },
      { type: "para", text: "<b>Important Side Note:</b> The instructor clarifies a common confusion in competitive exams between Modulation Index (\\(\\mu\\)) in communications and Mobility (\\(\\mu\\)) in semiconductor physics." },
      { type: "para", text: "While the symbols are the exact same, their mathematical behaviors are completely different:" },
      { type: "list", items: [
          "<b>Communication (Modulation):</b> Total \\(\\mu\\) is added via the root-sum-square method: \\(\\mu_t = \\sqrt{\\mu_1^2 + \\mu_2^2 + \\dots}\\)",
          "<b>Semiconductors (Mobility):</b> Components are added harmonically: \\(\\frac{1}{\\mu_{total}} = \\frac{1}{\\mu_1} + \\frac{1}{\\mu_2} + \\dots\\)"
        ]
      },
      { type: "para", text: "<span style='color:var(--red); font-weight:bold;'>Do not mix these up on the exam!</span>" }

    ]
  },
  
  // ══════════════════════════
  // CHAPTER 12 — Adv. Efficiency & Spectrum
  // ══════════════════════════
  {
    id: "adv_spectrum",
    label: "12 · Adv. Spectrum",
    title: "12. Advanced Efficiency & Spectrum Analysis",
    content: [

      // --- SECTION: MASTER TABLE FROM SNAPSHOT ---
      { type: "heading", text: "12.1  Master Summary: Power & Efficiency" },
      { type: "para", text: "The instructor highlights that Modulation Efficiency (\\(\\eta\\)) is an increasing function of the Modulation Index (\\(\\mu\\)). As \\(\\mu\\) increases, the sidebands take up a larger share of the total power. Here is the definitive table directly from the lecture board:" },
      { type: "table",
        headers: ["\\(m(t)\\)", "\\(P_{AM}\\)", "\\(P_{AM} (\\mu=1)\\)", "\\(\\eta\\)", "\\(\\eta (\\mu=1)\\)"],
        rows: [
          ["Sinusoidal", "\\(P_c\\left(1 + \\frac{\\mu^2}{2}\\right)\\)", "\\(\\frac{3}{2}P_c\\)", "\\(\\frac{\\mu^2}{2 + \\mu^2}\\)", "33.33%"],
          ["Square Waveform", "\\(P_c(1 + \\mu^2)\\)", "\\(2P_c\\)", "\\(\\frac{\\mu^2}{1 + \\mu^2}\\)", "50%"],
          ["Triangular Waveform", "\\(P_c\\left(1 + \\frac{\\mu^2}{3}\\right)\\)", "\\(\\frac{4}{3}P_c\\)", "\\(\\frac{\\mu^2}{3 + \\mu^2}\\)", "25%"]
        ]
      },
      { type: "para", text: "<b>Interview Trap:</b> When asked \"What is the maximum percentage efficiency of AM?\", many students instinctively say 33.33%. However, the technically correct answer for any generic signal is <b>50%</b> (achieved with a square wave)." },

      // --- SECTION: EXTRACTING M(T) ---
      { type: "heading", text: "12.2  Extracting \\(m(t)\\) from the Envelope" },
      { type: "para", text: "To recover a message signal \\(m(t)\\) from the envelope of an AM wave \\(E(t)\\):" },
      { type: "list", items: [
          "<b>Carrier Component:</b> The center baseline of the envelope represents \\(A_c\\).",
          "<b>Message Recovery:</b> Subtract \\(A_c\\) from the envelope: \\(m(t) = E(t) - A_c\\)"
        ]
      },
      { type: "eq", tex: "V_{\\max} = A_c + A_m, \\qquad V_{\\min} = A_c - A_m" },

      // --- SECTION: HARMONICS ---
      { type: "heading", text: "12.3  Problem Solving: Square Wave Harmonics" },
      { type: "para", text: "If \\(m(t)\\) is a periodic Square Wave, it contains odd harmonics (\\(f_m, 3f_m, 5f_m, \\dots\\)). When modulated with a carrier \\(f_c\\), the resulting AM signal will have frequency components at:" },
      { type: "eq", tex: "f_c \\pm f_m, \\quad f_c \\pm 3f_m, \\quad f_c \\pm 5f_m, \\dots" },
      { type: "para", text: "<b>Example:</b> If \\(f_c = 1000\\text{ kHz}\\) and \\(f_m = 10\\text{ kHz}\\) (Square Wave), the spectrum will contain \\(1000 \\pm 10\\) (990, 1010 kHz), \\(1000 \\pm 30\\) (970, 1030 kHz), etc. Frequencies like 995 kHz will <b>not</b> be present because they are not odd multiples." },

      // --- SECTION: FILTER RESPONSE ---
      { 
        type: "canvas_sim_dual", 
        simId: "filter_sim", 
        height: 180, 
        controlLabel1: "Low Cutoff (kHz):", min1: 500, max1: 1200, step1: 10, defaultVal1: 700,
        controlLabel2: "High Cutoff (kHz):", min2: 1200, max2: 1800, step2: 10, defaultVal2: 1700
      }
    ]
  },
  // ══════════════════════════
  // CHAPTER 13 — Hardware & Synthesis
  // ══════════════════════════
  {
    id: "hardware_synth",
    label: "13 · Hardware & Synth",
    title: "13. Signal Synthesis & Hardware Limits",
    content: [
      
      // --- FOURIER SYNTHESIZER ---
      { type: "heading", text: "13.1  Fourier Series: Square Wave Synthesis" },
      { type: "para", text: "As established, a square wave yields the maximum 50% modulation efficiency. This interactive simulator demonstrates how a square wave is mathematically synthesized in the real world by adding the fundamental frequency with its infinite <b>odd harmonics</b>." },
      { type: "canvas_sim", simId: "fourier_sim", height: 160, controlLabel: "Odd Harmonics (n):", min: 1, max: 19, step: 2, defaultVal: 3 },
      
      // --- RC ENVELOPE DETECTOR ---
      { type: "heading", text: "13.2  Practical RC Envelope Detector" },
      { type: "para", text: "In hardware, an envelope detector relies on a capacitor discharging through a resistor (RC time constant). Adjust the slider below to observe the hardware limits:" },
      { type: "list", items: [
          "<b>RC Too Low (Fast):</b> The capacitor discharges too quickly, causing jagged <b>excessive ripple</b>.",
          "<b>RC Too High (Slow):</b> The capacitor cannot discharge fast enough to track the message, causing <b>diagonal clipping</b>."
        ]
      },
      { type: "canvas_sim", simId: "rc_env_sim", height: 160, controlLabel: "RC Discharge Rate:", min: 0.01, max: 0.3, step: 0.01, defaultVal: 0.05 }

    ]
  },
  
  // ══════════════════════════
  // CHAPTER 14 — GATE PYQs
  // ══════════════════════════
  {
    id: "gate_pyqs",
    label: "14 · GATE PYQs",
    title: "14. Practical Problem Solving (GATE PYQs)",
    content: [
      
      { type: "heading", text: "I. Maximum Power Efficiency" },
      { type: "para", text: "<b>Question:</b> What is the maximum power efficiency of an AM modulator?" },
      { type: "para", text: "<b>Instructor Insight:</b> A classic trap. If the message shape isn't specified, you must assume the theoretical maximum. Sinusoidal is only 33.3%, but a <b>Square Wave</b> achieves 50%." },
      { type: "eq", tex: "\\eta_{\\max} = 50\\%" },

      { type: "heading", text: "II. Choosing a Demodulator" },
      { type: "para", text: "<b>Rule:</b> Choosing a device depends entirely on the Modulation Index (\\(\\mu\\)):" },
      { type: "list", items: [
          "<b>Envelope Detector:</b> Simple/Cheap. Only works if \\(\\mu \\le 1\\).",
          "<b>Synchronous Detector:</b> Required for Over-modulation (\\(\\mu > 1\\)) because it tracks phase, not just peak amplitude."
        ]
      },

      { type: "heading", text: "III. Overmodulation Detector Output" },
      { type: "para", text: "<b>Question:</b> If \\(|m(t)| > A_c\\), what does an ideal envelope detector output?" },
      { type: "para", text: "Because the detector strictly traces absolute positive peaks, it ignores phase reversals and outputs the modulus:" },
      { type: "eq", tex: "E(t) = | A_c [1 + k \\cdot m(t)] |" },

      { type: "heading", text: "IV. Square Wave Harmonic Spectrum" },
      { type: "para", text: "<b>Scenario:</b> Carrier = 1000 kHz, Message = Symmetrical Square Wave (Period = 100 μs)." },
      { type: "list", items: [
          "\\(f_m = 1/100\\mu s = 10\\text{ kHz}\\).",
          "Symmetrical square waves contain <b>only odd harmonics</b> (10, 30, 50...).",
          "AM Components will exist at \\(f_c \\pm f_m, f_c \\pm 3f_m\\)..."
        ]
      },
      { type: "para", text: "<b>Result:</b> 990, 1010, 970, 1030 kHz are present. Any even shift (like 980 or 1020 kHz) is <b>NOT</b> present." },

      { type: "heading", text: "V. Multi-Tone Power Efficiency (PYQ 6)" },
      { type: "para", text: "<b>Problem:</b> Given \\(m(t) = \\frac{1}{2} \\cos(\\omega_1 t) - \\frac{1}{2} \\sin(\\omega_2 t)\\), find \\(\\eta\\)." },
      { type: "para", text: "<b>Step 1: Extract Individual Indices</b> (Note: sign/phase doesn't impact power):" },
      { type: "eq", tex: "\\mu_1 = 0.5, \\quad \\mu_2 = 0.5" },
      { type: "para", text: "<b>Step 2: Total Modulation Index (RSS Rule):</b>" },
      { type: "eq", tex: "\\mu_t = \\sqrt{0.5^2 + 0.5^2} = \\sqrt{0.5} = \\frac{1}{\\sqrt{2}}" },
      { type: "para", text: "<b>Step 3: Calculate Efficiency:</b>" },
      { type: "eq", tex: "\\eta = \\frac{\\mu_t^2}{2 + \\mu_t^2} = \\frac{0.5}{2 + 0.5} = \\frac{0.5}{2.5} = 20\\%" }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 15 — Angle Modulation Part 1
  // ══════════════════════════
  {
    id: "angle_modulation_pt1",
    label: "15 · Angle Mod Pt. 1",
    title: "15. Angle Modulation (Part 1)",
    content: [

      // --- SECTION: TOPICS ---
      { type: "heading", text: "17.1  Topics To Be Covered" },
      { type: "list", items: [
          "Concept of Instantaneous angle and frequency",
          "Angle Modulation",
          "Frequency Modulation",
          "Mathematical Analysis of FM",
          "Phase Modulation",
          "Frequency and Phase Calculation",
          "Common Conclusions"
        ]
      },
      
      // --- SECTION: EXAM CHEAT SHEET ---
      { type: "heading", text: "17.1.5  Exam Formula Cheat Sheet" },
      { type: "para", text: "<b>1. Fundamental Angle & Frequency Relations</b>" },
      { type: "table",
        headers: ["Parameter", "Formula", "Units"],
        rows: [
          ["Inst. Angular Freq", "\\(\\omega_i(t) = \\frac{d\\theta_i(t)}{dt}\\)", "Rad/sec"],
          ["Inst. Frequency", "\\(f_i(t) = \\frac{1}{2\\pi}\\frac{d\\theta_i(t)}{dt}\\)", "Hz"],
          ["Inst. Angle", "\\(\\theta_i(t) = \\int \\omega_i(t) dt = 2\\pi \\int f_i(t) dt\\)", "Radians"]
        ]
      },
      { type: "para", text: "<b>2. PM vs FM: Core Equations (Message = \\(m(t)\\))</b>" },
      { type: "table",
        headers: ["Modulation", "Inst. Phase \\(\\theta_i(t)\\)", "Inst. Freq \\(f_i(t)\\)", "Max Freq Deviation \\(|\\Delta f|_{\\max}\\)"],
        rows: [
          ["<b>Phase (PM)</b>", "\\(\\omega_c t + K_p m(t)\\)", "\\(f_c + \\frac{K_p}{2\\pi}\\frac{dm(t)}{dt}\\)", "\\(\\frac{K_p}{2\\pi} \\left| \\frac{dm(t)}{dt} \\right|_{\\max}\\)"],
          ["<b>Freq (FM)</b> <br>\\(K_f\\) in Hz/V", "\\(\\omega_c t + 2\\pi K_f \\int m(t) dt\\)", "\\(f_c + K_f m(t)\\)", "\\(K_f |m(t)|_{\\max}\\)"]
        ]
      },
      { type: "para", text: "<b>3. Single-Tone Proportionalities (CRITICAL FOR EXAMS)</b>" },
      { type: "para", text: "Given a single tone message \\(m(t) = A_m \\cos(2\\pi f_m t)\\):" },
      { type: "table",
        headers: ["Parameter", "Phase Modulation (PM)", "Frequency Modulation (FM)"],
        rows: [
          ["<b>Modulation Index (\\(\\beta\\))</b>", "\\(\\beta_{PM} = K_p A_m\\)", "\\(\\beta_{FM} = \\frac{K_f A_m}{f_m}\\)"],
          ["<b>Max Phase Dev (\\(\\Delta \\phi\\))</b>", "\\(|\\Delta \\phi|_{\\max} = \\beta_{PM}\\)", "\\(|\\Delta \\phi|_{\\max} = \\beta_{FM}\\)"],
          ["<b>\\(\\Delta f\\) Proportionality</b>", "\\(\\Delta f \\propto A_m \\cdot f_m\\)", "\\(\\Delta f \\propto A_m\\) (Independent of \\(f_m\\))"],
          ["<b>\\(\\beta\\) Proportionality</b>", "\\(\\beta_{PM} \\propto A_m\\) (Independent of \\(f_m\\))", "\\(\\beta_{FM} \\propto \\frac{A_m}{f_m}\\)"]
        ]
      },
      { type: "para", text: "<b>4. Multi-Tone & Bessel Rules</b>" },
      { type: "list", items: [
          "<b>Multi-tone FM Index:</b> \\(\\beta = \\frac{K_f(|A_{m1}| + |A_{m2}|)}{\\max(f_{m1}, f_{m2})}\\)",
          "<b>WBFM Bandwidth (Carson's Rule):</b> \\(BW = 2(\\Delta f + f_{\\max})\\)",
          "<b>Bessel Function Symmetry:</b> \\(J_{-n}(\\beta) = (-1)^n J_n(\\beta)\\) (Even harmonics are equal, odd harmonics invert sign)"
        ]
      },

      // --- SECTION: MAX AMPLITUDE (BASIC) ---
      { type: "heading", text: "17.2  Maximum Amplitude: Basic Signals" },
      { type: "para", text: "Before analyzing instantaneous angles, it is critical to quickly evaluate the absolute maximum amplitude \\(|x(t)|_{\\max}\\) of standard carrier signals." },
      { type: "table",
        headers: ["Signal \\(x(t)\\)", "Maximum Amplitude \\(|x(t)|_{\\max}\\)"],
        rows: [
          ["\\(A\\cos\\omega_0t\\)", "\\(|A|\\)"],
          ["\\(-A\\cos\\omega_0t\\)", "\\(|A|\\)"],
          ["\\(A\\sin\\omega_0t\\)", "\\(|A|\\)"],
          ["\\(-A\\sin\\omega_0t\\)", "\\(|A|\\)"]
        ]
      },

      // --- SECTION: MAX AMPLITUDE (SAME FREQ) ---
      { type: "heading", text: "17.3  Maximum Amplitude: Combined Signals (Same Frequency)" },
      { type: "para", text: "When combining signals operating at the exact same fundamental frequency (\\(\\omega_0\\)), the maximum amplitudes resolve geometrically or algebraically:" },
      { type: "table",
        headers: ["Combined Signal \\(x(t)\\)", "Maximum Amplitude \\(|x(t)|_{\\max}\\)"],
        rows: [
          ["\\(A\\cos\\omega_0t + B\\sin\\omega_0t\\)", "\\(\\sqrt{A^2 + B^2}\\)"],
          ["\\(A\\cos\\omega_0t + B\\cos\\omega_0t = (A+B)\\cos\\omega_0t\\)", "\\(|A+B|\\)"],
          ["\\(A\\sin\\omega_0t + B\\sin\\omega_0t = (A+B)\\sin\\omega_0t\\)", "\\(|A+B|\\)"]
        ]
      },

      // --- SECTION: MAX AMPLITUDE (DIFF FREQ) ---
      { type: "heading", text: "17.4  Maximum Amplitude: Combined Signals (Different Frequencies)" },
      { type: "para", text: "When combining signals operating at different frequencies (\\(\\omega_1\\) and \\(\\omega_2\\)), the maximum peak is generally the sum of absolute amplitudes, with one specific conditional exception:" },
      { type: "table",
        headers: ["Combined Signal \\(x(t)\\)", "Maximum Amplitude \\(|x(t)|_{\\max}\\)"],
        rows: [
          ["\\(A\\cos\\omega_1t + B\\cos\\omega_2t\\)", "\\(|A+B|\\)"],
          ["\\(A\\sin\\omega_1t + B\\sin\\omega_2t\\)", "\\(|A+B|\\)"],
          ["\\(A\\cos\\omega_1t + B\\sin\\omega_2t\\)", "\\(|A+B|\\) if \\(A = B\\) <br><br> \\(< |A+B|\\) if \\(A \\neq B\\)"]
        ]
      },

      
      
      // --- SECTION: INSTANTANEOUS ANGLE & FREQUENCY ---
      { type: "heading", text: "17.5  Concept of Instantaneous Angle & Frequency" },
      { type: "para", text: "For an angle modulated signal defined generally as \\(S(t) = A \\cos[\\theta_i(t)]\\), the parameters are defined as follows:" },
      { type: "list", items: [
          "<b>Instantaneous Angle:</b> \\(\\theta_i(t)\\) (in Radians)",
          "<b>Instantaneous Angular Frequency:</b> \\(\\omega_i(t) = \\frac{d\\theta_i(t)}{dt}\\) (in rad/sec)",
          "<b>Instantaneous Frequency:</b> \\(f_i(t) = \\frac{1}{2\\pi} \\frac{d\\theta_i(t)}{dt}\\) (in Hz)"
        ]
      },

      // --- SECTION: INTERCHANGING VARIABLES ---
      { type: "heading", text: "17.6  Interchanging Angle and Frequency" },
      { type: "para", text: "You can convert between instantaneous angle and frequency using differentiation or running integration:" },
      { type: "table",
        headers: ["If \\(\\theta_i(t)\\) is given", "If \\(f_i(t)\\) is given"],
        rows: [
          ["\\(\\omega_i(t) = \\frac{d\\theta_i(t)}{dt}\\)", "\\(\\omega_i(t) = 2\\pi f_i(t)\\)"],
          ["\\(f_i(t) = \\frac{1}{2\\pi}\\frac{d\\theta_i(t)}{dt}\\)", "\\(\\theta_i(t) = \\int_{-\\infty}^{t} \\omega_i(t) dt\\) (Running Integration)"]
        ]
      },
      
      // --- SECTION: GENERAL EXPRESSION ---
      { type: "heading", text: "17.7  General Expression of Angle Modulation" },
      { type: "para", text: "Let \\(m(t)\\) be the baseband message signal and \\(C(t) = A_c \\cos(\\omega_c t)\\) be the carrier before modulation." },
      { type: "para", text: "The general mathematical expression for any angle modulated signal is defined by adding a time-varying phase deviation term \\(\\Delta\\phi(t)\\) to the carrier angle:" },
      { type: "eq", tex: "S(t) = A_c \\cos(\\omega_c t + \\Delta\\phi(t))" },

      // --- SECTION: TYPES OF ANGLE MODULATION ---
      { type: "heading", text: "17.8  Classification of Angle Modulation" },
      { type: "para", text: "Angle Modulation strictly branches into two primary categories based on how the message signal alters the instantaneous phase:" },
      { type: "list", items: [
          "<b>Frequency Modulation (F.M.):</b> Analysis requires defining the core concept, evaluating Narrowband (NBFM) vs. Wideband (WBFM), and calculating Bandwidth (BW).",
          "<b>Phase Modulation (P.M.):</b> Analysis requires defining the core concept, evaluating Narrowband (NBPM) vs. Wideband (WBPM), and calculating Bandwidth (BW)."
        ]
      },
      
      // --- SECTION: PHASE MODULATION ---
      { type: "heading", text: "17.9  Phase Modulation (PM) & Sensitivity" },
      { type: "para", text: "In Phase Modulation (Case 1), the phase deviation \\(\\Delta\\phi(t)\\) is directly proportional to the message signal \\(m(t)\\)." },
      { type: "eq", tex: "\\Delta\\phi(t) = K_p m(t)" },
      { type: "para", text: "Where \\(K_p\\) is the <b>Phase sensitivity of the phase modulator</b>, measured in rad/volt." },
      { type: "para", text: "Substituting this into the general equation yields the definition of PM:" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + K_p m(t)" },
      { type: "eq", tex: "S_{PM}(t) = A_c \\cos(\\omega_c t + K_p m(t))" },

      // --- SECTION: FREQUENCY MODULATION ---
      { type: "heading", text: "17.10  Frequency Modulation (FM) & Sensitivity" },
      { type: "para", text: "In Frequency Modulation (Case 2), the angular frequency deviation \\(\\Delta\\omega(t)\\) is directly proportional to the message signal \\(m(t)\\)." },
      { type: "eq", tex: "\\Delta\\omega(t) = \\frac{d\\Delta\\phi(t)}{dt} = K_f m(t)" },
      { type: "para", text: "Where \\(K_f\\) is the <b>Frequency sensitivity of the frequency modulator</b>, measured in rad/V-sec." },
      { type: "para", text: "This yields the instantaneous angular frequency for FM:" },
      { type: "eq", tex: "\\omega_i(t) = \\omega_c + K_f m(t)" },

      // --- SECTION: FM PHASE INTEGRATION ---
      { type: "heading", text: "17.11  Deriving the FM Angle Equation" },
      { type: "para", text: "To write the full time-domain equation for an FM signal, we must find the instantaneous angle \\(\\theta_i(t)\\) by integrating the instantaneous frequency:" },
      { type: "eq", tex: "\\theta_i(t) = \\int_{-\\infty}^{t} \\omega_i(t) dt = \\int_{-\\infty}^{t} [\\omega_c + K_f m(t)] dt" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + K_f \\int_{-\\infty}^{t} m(t) dt" },
      { type: "para", text: "Substituting this back into the general carrier formula yields the definitive standard equation for FM:" },
      { type: "eq", tex: "S_{FM}(t) = A_c \\cos\\left(\\omega_c t + K_f \\int_{-\\infty}^{t} m(t) dt\\right)" },

      // --- SECTION: DEFINITION SUMMARY ---
      { type: "heading", text: "17.12  Summary: Core Definitions of PM and FM" },
      { type: "para", text: "The fundamental distinction between the two modulations lies in which instantaneous parameter directly follows the message signal:" },
      { type: "table",
        headers: ["Modulation", "Core Defining Equation"],
        rows: [
          ["<b>PM (Phase Modulation)</b>", "\\(\\theta_i(t) = \\omega_c t + K_p m(t)\\)"],
          ["<b>FM (Frequency Modulation)</b>", "\\(\\omega_i(t) = \\omega_c + K_f m(t)\\)"]
        ]
      },
      
      // --- SECTION: FM UNIT ANALYSIS ---
      { type: "heading", text: "17.13  FM Sensitivity Unit Analysis" },
      { type: "para", text: "The units for frequency sensitivity (\\(K_f\\)) dictate the structure of the instantaneous frequency equation:" },
      { type: "table",
        headers: ["Given \\(K_f\\) Units", "Instantaneous Equation", "Resulting Units"],
        rows: [
          ["\\(\\text{Rad / V-sec}\\)", "\\(\\omega_i(t) = \\omega_c + K_f m(t)\\)", "Radians / sec"],
          ["\\(\\text{Hz / Volt}\\)", "\\(f_i(t) = f_c + K_f m(t)\\)", "Hertz (Hz)"]
        ]
      },

      // --- SECTION: FREQUENCY DEVIATION ---
      { type: "heading", text: "17.14  Instantaneous Frequency Deviation" },
      { type: "para", text: "Frequency deviation represents how far the signal's frequency shifts from the unmodulated carrier frequency." },
      { type: "list", items: [
          "<b>1. Instantaneous frequency Deviation:</b> \\(\\Delta\\omega(t) = K_f m(t)\\)",
          "<b>2. Deviation in positive direction (Max):</b> \\(\\{\\Delta\\omega(t)\\}_{\\max} = \\{K_f m(t)\\}_{\\max}\\)",
          "<b>3. Deviation in negative direction (Min):</b> \\(\\{\\Delta\\omega(t)\\}_{\\min} = \\{K_f m(t)\\}_{\\min}\\)"
        ]
      },

      // --- SECTION: FREQUENCY EXTREMES ---
      { type: "heading", text: "17.15  Maximum & Minimum Instantaneous Frequency" },
      { type: "para", text: "Applying the deviations to the carrier frequency yields the absolute limits of the modulated signal's frequency:" },
      { type: "list", items: [
          "<b>4. Maximum value:</b> \\(\\{\\omega_i(t)\\}_{\\max} = \\omega_c + \\{\\Delta\\omega(t)\\}_{\\max} = \\omega_c + \\{K_f m(t)\\}_{\\max}\\)",
          "<b>5. Minimum value:</b> \\(\\{\\omega_i(t)\\}_{\\min} = \\omega_c + \\{\\Delta\\omega(t)\\}_{\\min} = \\omega_c + \\{K_f m(t)\\}_{\\min}\\)",
          "<b>6. Peak-to-peak frequency Deviation:</b> \\(\\{\\Delta\\omega(t)\\}_{p-p} = \\{\\omega_i(t)\\}_{\\max} - \\{\\omega_i(t)\\}_{\\min}\\)"
        ]
      },

      // --- SECTION: FM MODULATION INDEX ---
      { type: "heading", text: "17.16  Modulation Index (Deviation Ratio)" },
      { type: "para", text: "For Frequency Modulation, the modulation index \\(\\beta_{FM}\\) (also called the Deviation Ratio) is defined as the absolute maximum frequency deviation divided by the maximum angular frequency of the message signal (\\(\\omega_{\\max}\\))." },
      { type: "para", text: "<b>7. Maximum frequency deviation:</b> \\(|\\Delta\\omega(t)|_{\\max}\\)" },
      { type: "para", text: "<b>8. Modulation index of F.M.:</b>" },
      { type: "eq", tex: "\\beta_{FM} = \\frac{|\\Delta\\omega(t)|_{\\max}}{\\omega_{\\max}} = \\frac{|K_f m(t)|_{\\max}}{\\omega_{\\max}}" },
      
      // --- SECTION: FM PHASE CALCULATION ---
      { type: "heading", text: "17.17  Phase Calculation in FM" },
      { type: "para", text: "Even though Frequency Modulation alters the instantaneous frequency, it inherently induces a phase deviation that we must calculate via integration." },
      { type: "para", text: "Starting with the FM frequency equation and integrating with respect to time:" },
      { type: "eq", tex: "\\omega_i(t) = \\omega_c + K_f m(t)" },
      { type: "eq", tex: "\\int_{-\\infty}^{t} \\omega_i(t) dt = \\int_{-\\infty}^{t} \\omega_c dt + \\int_{-\\infty}^{t} K_f m(t) dt" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + \\int_{-\\infty}^{t} K_f m(t) dt = \\omega_c t + \\Delta\\phi(t)" },

      // --- SECTION: MAX PHASE DEVIATION ---
      { type: "heading", text: "17.18  Instantaneous & Maximum Phase Deviation" },
      { type: "para", text: "From the integration above, we can extract the explicit formula for instantaneous angular phase deviation in an FM signal:" },
      { type: "eq", tex: "\\Delta\\phi(t) = K_f \\int_{-\\infty}^{t} m(t) dt" },
      { type: "para", text: "To find the maximum phase deviation (a critical parameter for bandwidth calculations later), we evaluate the maximum absolute value of this integral:" },
      { type: "eq", tex: "|\\Delta\\phi(t)|_{\\max} = \\left| K_f \\int_{-\\infty}^{t} m(t) dt \\right|_{\\max}" },

      // --- SECTION: GENERAL FM EXPRESSIONS ---
      { type: "heading", text: "17.19  Definitive FM Expressions (Unit Dependent)" },
      { type: "para", text: "Substituting the phase deviation back into the general carrier equation yields the definitive FM equations. The structure used depends entirely on the units of sensitivity provided:" },
      { type: "list", items: [
          "<b>Case 1 (\\(K_f\\) in Rad/V-sec):</b> \\(S_{FM}(t) = A_c \\cos\\left[\\omega_c t + K_f \\int_{-\\infty}^{t} m(t) dt\\right]\\)",
          "<b>Case 2 (\\(K_f\\) in Hz/Volt):</b> Defines the frequency directly as \\(f_i(t) = f_c + K_f m(t)\\)"
        ]
      },
      
      // --- SECTION: FREQ CALCULATION (HZ/VOLT) ---
      { type: "heading", text: "17.20  Frequency Calculation (when \\(K_f\\) is in Hz/Volt)" },
      { type: "para", text: "When frequency sensitivity \\(K_f\\) is given in Hz/Volt, the formulas directly calculate standard frequency \\(f_i(t)\\) rather than angular frequency:" },
      { type: "eq", tex: "f_i(t) = f_c + K_f m(t)" },
      { type: "list", items: [
          "<b>1. Instantaneous frequency Deviation:</b> \\(\\Delta f(t) = K_f m(t)\\)",
          "<b>2. Frequency Deviation in positive direction:</b> \\(\\{\\Delta f(t)\\}_{\\max} = \\{K_f m(t)\\}_{\\max}\\)",
          "<b>3. Frequency Deviation in negative direction:</b> \\(\\{\\Delta f(t)\\}_{\\min} = \\{K_f m(t)\\}_{\\min}\\)",
          "<b>4. Maximum value of instantaneous frequency:</b> \\(\\{f_i(t)\\}_{\\max} = f_c + \\{\\Delta f(t)\\}_{\\max}\\)",
          "<b>5. Minimum value of instantaneous frequency:</b> \\(\\{f_i(t)\\}_{\\min} = f_c + \\{\\Delta f(t)\\}_{\\min}\\)",
          "<b>6. Peak to peak frequency Deviation:</b> \\(\\{\\Delta f(t)\\}_{p-p} = \\{f_i(t)\\}_{\\max} - \\{f_i(t)\\}_{\\min}\\)"
        ]
      },
      { type: "para", text: "From this, the maximum frequency deviation and modulation index (Deviation ratio) are defined as:" },
      { type: "eq", tex: "7. \\quad |\\Delta f(t)|_{\\max} = |K_f m(t)|_{\\max}" },
      { type: "eq", tex: "8. \\quad \\beta_{FM} = \\frac{|\\Delta f(t)|_{\\max}}{f_{\\max}}" },

      // --- SECTION: PHASE CALCULATION (HZ/VOLT) ---
      { type: "heading", text: "17.21  Phase Calculation (when \\(K_f\\) is in Hz/Volt)" },
      { type: "para", text: "To find the phase \\(\\theta_i(t)\\) when working in Hz, we must first convert the instantaneous frequency back to angular frequency by multiplying by \\(2\\pi\\):" },
      { type: "eq", tex: "\\omega_i(t) = \\omega_c + 2\\pi K_f m(t)" },
      { type: "para", text: "Integrating this yields the instantaneous angle:" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + 2\\pi K_f \\int_{-\\infty}^{t} m(t)dt = \\omega_c t + \\Delta\\phi(t)" },
      { type: "para", text: "This gives us the phase deviation parameters:" },
      { type: "list", items: [
          "<b>1. Instantaneous angular phase deviation:</b> \\(\\Delta\\phi(t) = 2\\pi K_f \\int_{-\\infty}^{t} m(t)dt\\)",
          "<b>2. Maximum Phase Deviation:</b> \\(|\\Delta\\phi(t)|_{\\max} = \\left| 2\\pi K_f \\int_{-\\infty}^{t} m(t)dt \\right|_{\\max}\\)"
        ]
      },

      // --- SECTION: DEFINITIVE SUMMARY ---
      { type: "heading", text: "17.22  General Expression & Unit Summary" },
      { type: "para", text: "Substituting the phase deviation back in gives the general expression for FM when \\(K_f\\) is in Hz/Volt:" },
      { type: "eq", tex: "S_{FM}(t) = A_c \\cos\\left[\\omega_c t + 2\\pi K_f \\int_{-\\infty}^{t} m(t)dt\\right]" },
      { type: "para", text: "<b>Master Summary of FM Definitions based on Units:</b>" },
      { type: "table",
        headers: ["If \\(K_f\\) unit is...", "Angular Frequency \\(\\omega_i(t)\\)", "Standard Frequency \\(f_i(t)\\)"],
        rows: [
          ["<b>Rad / V-sec</b>", "\\(\\omega_c + K_f m(t)\\)", "\\(f_c + \\frac{K_f}{2\\pi} m(t)\\)"],
          ["<b>Hz / Volt</b>", "\\(\\omega_c + 2\\pi K_f m(t)\\)", "\\(f_c + K_f m(t)\\)"]
        ]
      },
      
      // --- SECTION: SINGLE TONE FM OVERVIEW ---
      { type: "heading", text: "17.23  Single Tone Sinusoidal FM Overview" },
      { type: "para", text: "When analyzing Frequency Modulation, we often use a single tone sinusoidal message signal to establish the fundamental parameters:" },
      { type: "eq", tex: "m(t) = A_m \\cos(2\\pi f_m t) \\implies f_{\\max} = f_m" },
      { type: "list", items: [
          "<b>Positive Peak:</b> \\(\\{m(t)\\}_{\\max} = +A_m\\)",
          "<b>Negative Peak:</b> \\(\\{m(t)\\}_{\\min} = -A_m\\)",
          "<b>Absolute Max:</b> \\(|m(t)|_{\\max} = A_m\\)"
        ]
      },

      // --- SECTION: SINGLE TONE FREQ CALC ---
      { type: "heading", text: "17.24  Single Tone Frequency Calculations" },
      { type: "para", text: "Given \\(K_f\\) in Hz/Volt, the instantaneous frequency deviation directly tracks the cosine wave:" },
      { type: "eq", tex: "\\Delta f(t) = K_f m(t) = K_f A_m \\cos(2\\pi f_m t)" },
      { type: "para", text: "This yields the following explicit limits:" },
      { type: "list", items: [
          "<b>Positive Deviation:</b> \\(\\{\\Delta f(t)\\}_{\\max} = +K_f A_m\\)",
          "<b>Negative Deviation:</b> \\(\\{\\Delta f(t)\\}_{\\min} = -K_f A_m\\)",
          "<b>Max Inst. Frequency:</b> \\(\\{f_i(t)\\}_{\\max} = f_c + K_f A_m\\)",
          "<b>Min Inst. Frequency:</b> \\(\\{f_i(t)\\}_{\\min} = f_c - K_f A_m\\)",
          "<b>Peak-to-Peak Deviation:</b> \\(\\{\\Delta f(t)\\}_{p-p} = \\{f_i(t)\\}_{\\max} - \\{f_i(t)\\}_{\\min} = 2K_f A_m\\)"
        ]
      },

      // --- SECTION: MAX DEVIATION & MOD INDEX ---
      { type: "heading", text: "17.25  Max Deviation & Modulation Index (Single Tone)" },
      { type: "para", text: "A critical property for exam questions is that maximum frequency deviation is strictly proportional to the message signal's amplitude, regardless of its frequency:" },
      { type: "eq", tex: "|\\Delta f(t)|_{\\max} = \\Delta f = K_f A_m \\implies \\Delta f \\propto A_m" },
      { type: "eq", tex: "\\frac{\\Delta f_1}{\\Delta f_2} = \\frac{A_{m1}}{A_{m2}}" },
      { type: "para", text: "The FM Modulation Index (\\(\\beta_{FM}\\)) for a single tone evaluates to:" },
      { type: "eq", tex: "\\beta_{FM} = \\frac{|\\Delta f(t)|_{\\max}}{f_{\\max}} = \\frac{K_f A_m}{f_m}" },
      
      // --- SECTION: SINGLE TONE PHASE INTEGRATION ---
      { type: "heading", text: "17.26  Phase Integration for Single Tone FM" },
      { type: "para", text: "To find the final time-domain expression for a single tone FM signal (where \\(K_f\\) is in Hz/Volt), we integrate the instantaneous angular frequency:" },
      { type: "eq", tex: "\\omega_i(t) = \\omega_c + 2\\pi K_f (A_m \\cos 2\\pi f_m t)" },
      { type: "eq", tex: "\\theta_i(t) = \\int \\omega_i(t) dt = \\omega_c t + \\frac{2\\pi K_f A_m}{2\\pi f_m} \\sin 2\\pi f_m t" },
      { type: "para", text: "Simplifying this reveals that the modulation index (\\(\\beta_{FM} = \\frac{K_f A_m}{f_m}\\)) embeds itself directly into the phase angle:" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + \\beta_{FM} \\sin 2\\pi f_m t" },

      // --- SECTION: SINGLE TONE FINAL EXPRESSION ---
      { type: "heading", text: "17.27  Standard Single Tone FM Expression" },
      { type: "para", text: "Substituting \\(\\theta_i(t)\\) into the general carrier equation yields the definitive standard form for a single-tone FM signal:" },
      { type: "eq", tex: "S_{FM}(t) = A_c \\cos[\\omega_c t + \\beta_{FM} \\sin 2\\pi f_m t]" },
      { type: "para", text: "<em>Note:</em> In the expanded form \\(A_c \\cos[2\\pi f_c t + \\beta_{FM} \\sin(2\\pi f_m t)]\\), the parameter \\(2\\pi f_m t\\) specifically stores the information of the maximum frequency of \\(m(t)\\)." },

      // --- SECTION: KEY PROPORTIONALITIES ---
      { type: "heading", text: "17.28  Crucial Proportionalities for Problem Solving" },
      { type: "para", text: "For fast calculations during exams, memorizing how parameters scale with the message amplitude (\\(A_m\\)) and message frequency (\\(f_m\\)) is essential:" },
      { type: "list", items: [
          "<b>1. Frequency Deviation (\\(\\Delta f\\)):</b> Strictly proportional to amplitude, entirely independent of frequency.<br> \\(\\Delta f \\propto A_m \\implies \\frac{\\Delta f_1}{\\Delta f_2} = \\frac{A_{m1}}{A_{m2}}\\)",
          "<b>2. Modulation Index (\\(\\beta_{FM}\\)):</b> Directly proportional to amplitude, inversely proportional to frequency.<br> \\(\\beta_{FM} \\propto \\frac{A_m}{f_m} \\implies \\frac{(\\beta_{FM})_1}{(\\beta_{FM})_2} = \\left(\\frac{A_{m1}}{f_{m1}}\\right) \\times \\left(\\frac{f_{m2}}{A_{m2}}\\right)\\)",
          "<b>3. Maximum Phase Deviation (\\(\\Delta \\phi\\)):</b> In FM, the maximum phase deviation evaluates to exactly the modulation index.<br> \\(|\\Delta\\phi(t)|_{\\max} = \\Delta\\phi = \\beta_{FM}\\)<br> \\(\\Delta\\phi \\propto \\frac{A_m}{f_m} \\implies \\frac{\\Delta\\phi_1}{\\Delta\\phi_2} = \\left(\\frac{A_{m1}}{f_{m1}}\\right) \\times \\left(\\frac{f_{m2}}{A_{m2}}\\right)\\)"
        ]
      },
      
      // --- SECTION: MULTI-TONE FM FREQUENCY ---
      { type: "heading", text: "17.29  Multi-Tone FM Frequency Parameters" },
      { type: "para", text: "When the message signal consists of multiple frequencies, such as \\(m(t) = A_{m1} \\cos 2\\pi f_{m1} t + A_{m2} \\cos 2\\pi f_{m2} t\\), the frequency parameters expand algebraically:" },
      { type: "eq", tex: "\\Delta f(t) = K_f A_{m1} \\cos 2\\pi f_{m1} t + K_f A_{m2} \\cos 2\\pi f_{m2} t" },
      { type: "list", items: [
          "<b>Max Frequency Deviation:</b> \\(\\{\\Delta f(t)\\}_{\\max} = K_f \\{m(t)\\}_{\\max}\\)",
          "<b>Min Frequency Deviation:</b> \\(\\{\\Delta f(t)\\}_{\\min} = K_f \\{m(t)\\}_{\\min}\\)",
          "<b>Max Instantaneous Freq:</b> \\(\\{f_i(t)\\}_{\\max} = f_c + K_f \\{m(t)\\}_{\\max}\\)",
          "<b>Min Instantaneous Freq:</b> \\(\\{f_i(t)\\}_{\\min} = f_c + K_f \\{m(t)\\}_{\\min}\\)"
        ]
      },
      { type: "para", text: "Evaluating the absolute maximums yields the crucial parameters for calculating bandwidth:" },
      { type: "eq", tex: "|\\Delta f(t)|_{\\max} = \\Delta f = K_f |A_{m1} + A_{m2}|" },
      { type: "eq", tex: "\\beta_{FM} = \\frac{|\\Delta f(t)|_{\\max}}{f_{\\max}} = \\frac{K_f (A_{m1} + A_{m2})}{\\max(f_{m1}, f_{m2})}" },

      // --- SECTION: MULTI-TONE FM PHASE ---
      { type: "heading", text: "17.30  Multi-Tone Phase Integration" },
      { type: "para", text: "Integrating the multi-tone frequency equation yields the instantaneous phase. Each frequency component generates its own distinct modulation index (\\(\\beta_1\\) and \\(\\beta_2\\)):" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + \\underbrace{\\frac{K_f A_{m1}}{f_{m1}}}_{\\beta_1} \\sin 2\\pi f_{m1} t + \\underbrace{\\frac{K_f A_{m2}}{f_{m2}}}_{\\beta_2} \\sin 2\\pi f_{m2} t" },
      { type: "para", text: "This gives us the maximum phase deviation for a multi-tone signal:" },
      { type: "eq", tex: "|\\Delta\\phi(t)|_{\\max} = K_f \\left| \\frac{A_{m1}}{f_{m1}} + \\frac{A_{m2}}{f_{m2}} \\right|" },

      // --- SECTION: MULTI-TONE FM EXPRESSION ---
      { type: "heading", text: "17.31  Standard Multi-Tone FM Expression" },
      { type: "para", text: "Substituting the integrated phase back into the carrier formula yields the definitive multi-tone FM equation:" },
      { type: "eq", tex: "S_{FM}(t) = A_c \\cos\\left[2\\pi f_c t + \\frac{K_f A_{m1}}{f_{m1}} \\sin 2\\pi f_{m1} t + \\frac{K_f A_{m2}}{f_{m2}} \\sin 2\\pi f_{m2} t \\right]" },
      { type: "para", text: "<em>Key Insight:</em> The denominators inside the sine terms (\\(f_{m1}\\) and \\(f_{m2}\\)) structurally store the maximum frequency information of the individual components of \\(m(t)\\)." },
      
      // --- SECTION: PM BASE DEFINITION ---
      { type: "heading", text: "17.32  Phase Modulation (PM) Base Parameters" },
      { type: "para", text: "In Phase Modulation, the phase deviation is directly proportional to the baseband message signal \\(m(t)\\):" },
      { type: "eq", tex: "\\Delta\\phi(t) = K_p m(t) \\quad (K_p : \\text{rad/Volt})" },
      { type: "para", text: "Substituting this into the general angle modulated signal equation yields the standard expression for PM:" },
      { type: "eq", tex: "S_{PM}(t) = A_c \\cos(\\omega_c t + K_p m(t))" },

      // --- SECTION: PM PHASE CALCULATION ---
      { type: "heading", text: "17.33  Phase Calculation in PM" },
      { type: "para", text: "From the standard equation, we can explicitly extract the instantaneous angle and phase deviation metrics:" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + K_p m(t) = \\omega_c t + \\Delta\\phi(t)" },
      { type: "list", items: [
          "<b>1. Instantaneous phase deviation:</b> \\(\\Delta\\phi(t) = K_p m(t)\\)",
          "<b>2. Maximum phase deviation:</b> \\(|\\Delta\\phi(t)|_{\\max} = K_p |m(t)|_{\\max}\\)"
        ]
      },

      // --- SECTION: PM FREQUENCY CALCULATION ---
      { type: "heading", text: "17.34  Frequency Calculation in PM" },
      { type: "para", text: "Because phase and frequency are inherently linked, phase modulating a signal also changes its instantaneous frequency. We find this by differentiating the instantaneous angle \\(\\theta_i(t)\\):" },
      { type: "eq", tex: "\\omega_i(t) = \\frac{d\\theta_i(t)}{dt} = \\omega_c + K_p \\frac{dm(t)}{dt}" },
      { type: "para", text: "Dividing by \\(2\\pi\\) gives the instantaneous frequency in Hertz:" },
      { type: "eq", tex: "f_i(t) = f_c + \\frac{K_p}{2\\pi} \\frac{dm(t)}{dt} = f_c + \\Delta f(t)" },

      // --- SECTION: PM DEVIATION LIMITS ---
      { type: "heading", text: "17.35  PM Frequency Deviation Limits" },
      { type: "para", text: "The frequency deviation in PM is strictly governed by the derivative of the message signal:" },
      { type: "eq", tex: "1. \\quad \\Delta f(t) = \\frac{K_p}{2\\pi} \\frac{dm(t)}{dt}" },
      { type: "para", text: "Evaluating the extremes yields:" },
      { type: "list", items: [
          "<b>2. Positive Direction Deviation:</b> \\(\\{\\Delta f(t)\\}_{\\max} = \\frac{K_p}{2\\pi} \\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\max}\\)",
          "<b>3. Negative Direction Deviation:</b> \\(\\{\\Delta f(t)\\}_{\\min} = \\frac{K_p}{2\\pi} \\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\min}\\)",
          "<b>4. Max Instantaneous Freq:</b> \\(\\{f_i(t)\\}_{\\max} = f_c + \\frac{K_p}{2\\pi} \\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\max}\\)",
          "<b>5. Min Instantaneous Freq:</b> \\(\\{f_i(t)\\}_{\\min} = f_c + \\frac{K_p}{2\\pi} \\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\min}\\)",
          "<b>6. Peak-to-Peak Deviation:</b> \\(\\{\\Delta f(t)\\}_{p-p} = \\{f_i(t)\\}_{\\max} - \\{f_i(t)\\}_{\\min}\\)"
        ]
      },

      // --- SECTION: PM MODULATION INDEX ---
      { type: "heading", text: "17.36  PM Maximum Deviation & Modulation Index" },
      { type: "para", text: "The maximum frequency deviation is the absolute peak of the frequency deviation equation:" },
      { type: "eq", tex: "7. \\quad |\\Delta f(t)|_{\\max} = \\frac{K_p}{2\\pi} \\left| \\frac{dm(t)}{dt} \\right|_{\\max}" },
      { type: "para", text: "The Modulation Index (or Deviation Ratio) for PM evaluates to:" },
      { type: "eq", tex: "8. \\quad \\beta_{PM} = \\frac{|\\Delta f(t)|_{\\max}}{f_{\\max}} = \\frac{\\frac{K_p}{2\\pi} \\left| \\frac{dm(t)}{dt} \\right|_{\\max}}{f_{\\max}}" },
      
      // --- SECTION: SINGLE TONE PM PHASE ---
      { type: "heading", text: "17.37  Single Tone PM Phase Calculation" },
      { type: "para", text: "Applying a single tone sinusoidal message signal \\(m(t) = A_m \\cos(2\\pi f_m t)\\) to Phase Modulation yields the following phase deviations:" },
      { type: "eq", tex: "\\Delta\\phi(t) = K_p m(t) = K_p A_m \\cos(2\\pi f_m t)" },
      { type: "list", items: [
          "<b>Positive Phase Deviation:</b> \\(\\{\\Delta\\phi(t)\\}_{\\max} = +K_p A_m\\)",
          "<b>Negative Phase Deviation:</b> \\(\\{\\Delta\\phi(t)\\}_{\\min} = -K_p A_m\\)",
          "<b>Absolute Max Phase Deviation:</b> \\(|\\Delta\\phi(t)|_{\\max} = K_p A_m\\)"
        ]
      },

      // --- SECTION: SINGLE TONE PM FREQUENCY ---
      { type: "heading", text: "17.38  Single Tone PM Frequency Calculation" },
      { type: "para", text: "To find the instantaneous frequency, we differentiate the angle equation with respect to time:" },
      { type: "eq", tex: "f_i(t) = f_c + \\frac{1}{2\\pi} \\frac{d}{dt}[K_p A_m \\cos(2\\pi f_m t)]" },
      { type: "eq", tex: "f_i(t) = f_c - \\frac{K_p A_m (2\\pi f_m)}{2\\pi} \\sin(2\\pi f_m t)" },
      { type: "eq", tex: "f_i(t) = f_c - K_p A_m f_m \\sin(2\\pi f_m t)" },
      { type: "para", text: "This gives us the explicit instantaneous frequency deviation equation for single-tone PM:" },
      { type: "eq", tex: "\\Delta f(t) = -K_p A_m f_m \\sin(2\\pi f_m t)" },

      // --- SECTION: SINGLE TONE PM DEVIATION LIMITS ---
      { type: "heading", text: "17.39  Single Tone PM Frequency Limits" },
      { type: "para", text: "Evaluating the sine wave extremes yields the absolute frequency limits for the PM signal:" },
      { type: "list", items: [
          "<b>Positive Freq Deviation:</b> \\(\\{\\Delta f(t)\\}_{\\max} = +K_p A_m f_m\\)",
          "<b>Negative Freq Deviation:</b> \\(\\{\\Delta f(t)\\}_{\\min} = -K_p A_m f_m\\)",
          "<b>Max Instantaneous Freq:</b> \\(\\{f_i(t)\\}_{\\max} = f_c + K_p A_m f_m\\)",
          "<b>Min Instantaneous Freq:</b> \\(\\{f_i(t)\\}_{\\min} = f_c - K_p A_m f_m\\)",
          "<b>Peak-to-Peak Deviation:</b> \\(\\{\\Delta f(t)\\}_{p-p} = 2 K_p A_m f_m\\)"
        ]
      },

      // --- SECTION: PM MODULATION INDEX ---
      { type: "heading", text: "17.40  PM Modulation Index & Max Phase" },
      { type: "para", text: "Extracting the absolute maximum frequency deviation allows us to calculate the PM Modulation Index (\\(\\beta_{PM}\\)):" },
      { type: "eq", tex: "|\\Delta f(t)|_{\\max} = K_p A_m f_m" },
      { type: "eq", tex: "\\beta_{PM} = \\frac{|\\Delta f(t)|_{\\max}}{f_m} = \\frac{K_p A_m f_m}{f_m} = K_p A_m" },
      { type: "para", text: "Notice that in Phase Modulation, the modulation index is exactly equal to the maximum phase deviation:" },
      { type: "eq", tex: "\\beta_{PM} = |\\Delta\\phi(t)|_{\\max} = K_p A_m" },

      // --- SECTION: PM PROPORTIONALITIES ---
      { type: "heading", text: "17.41  Crucial PM Proportionalities" },
      { type: "para", text: "For competitive exams, memorizing how PM parameters scale is critical. Unlike FM, PM frequency deviation depends on the message frequency:" },
      { type: "list", items: [
          "<b>1. Frequency Deviation (\\(\\Delta f\\)):</b> Proportional to BOTH amplitude and frequency of the message signal.<br> \\(\\Delta f \\propto A_m f_m \\implies \\frac{\\Delta f_1}{\\Delta f_2} = \\left(\\frac{A_{m1}}{A_{m2}}\\right) \\times \\left(\\frac{f_{m1}}{f_{m2}}\\right)\\)",
          "<b>2. Modulation Index (\\(\\beta_{PM}\\)):</b> Proportional ONLY to amplitude. Independent of frequency.<br> \\(\\beta_{PM} \\propto A_m \\implies \\frac{(\\beta_{PM})_1}{(\\beta_{PM})_2} = \\frac{A_{m1}}{A_{m2}}\\)",
          "<b>3. Max Phase Deviation (\\(\\Delta \\phi\\)):</b> Same as the modulation index.<br> \\(\\Delta\\phi \\propto A_m \\implies \\frac{\\Delta\\phi_1}{\\Delta\\phi_2} = \\frac{A_{m1}}{A_{m2}}\\)"
        ]
      },
      
      
      
      
      // --- SECTION: PROBLEM SOLVING QUEUE ---
      { type: "heading", text: "17.XX  Problem Solving & Questions" },
      { type: "para", text: "<i></i>" },
      // --- QUESTION: INSTANTANEOUS FREQUENCY 1 ---
      { type: "heading", text: "Q2. Instantaneous Frequency (Linear Variation)" },
      { type: "para", text: "<b>Question:</b> Given \\(S(t) = 2\\cos(20\\pi t + \\pi t^2)\\), determine the instantaneous frequency \\(f_i(t)\\)." },
      { type: "para", text: "<b>Solution Steps:</b>" },
      { type: "para", text: "Extract the instantaneous angle \\(\\theta_i(t)\\):" },
      { type: "eq", tex: "\\theta_i(t) = 20\\pi t + \\pi t^2 \\text{ Rad} \\quad \\text{}" },
      { type: "para", text: "Differentiate with respect to time to find the instantaneous angular frequency \\(\\omega_i(t)\\):" },
      { type: "eq", tex: "\\omega_i(t) = \\frac{d\\theta_i(t)}{dt} = (20\\pi + 2\\pi t) \\text{ Rad/sec} \\quad \\text{}" },
      { type: "para", text: "Divide by \\(2\\pi\\) to find \\(f_i(t)\\):" },
      { type: "eq", tex: "f_i(t) = \\frac{\\omega_i(t)}{2\\pi} = 10 + t \\text{ Hz} \\quad \\text{}" },
      { type: "para", text: "<em>Graphical Note:</em> The plot of \\(f_i(t)\\) versus \\(t\\) yields a linear slope intersecting the y-axis at 10 Hz." },

      // --- QUESTION: INSTANTANEOUS FREQUENCY 2 ---
      { type: "heading", text: "Q3. Instantaneous Frequency (Complex Sinusoidal)" },
      { type: "para", text: "<b>Question:</b> Given \\(S(t) = A\\cos(\\omega_c t + 2\\cos 20\\pi t + 4\\cos 40\\pi t)\\), determine \\(f_i(t)\\)." },
      { type: "para", text: "<b>Solution Steps:</b>" },
      { type: "para", text: "Extract the instantaneous angle \\(\\theta_i(t)\\):" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + 2\\cos(20\\pi t) + 4\\cos(40\\pi t) \\quad \\text{}" },
      { type: "para", text: "Differentiate to find \\(\\omega_i(t)\\), applying the chain rule \\(\\frac{d}{dt}\\cos(kt) = -k\\sin(kt)\\):" },
      { type: "eq", tex: "\\omega_i(t) = \\omega_c - 40\\pi\\sin(20\\pi t) - 160\\pi\\sin(40\\pi t) \\quad \\text{}" },
      { type: "para", text: "Divide the entire expression by \\(2\\pi\\) to isolate \\(f_i(t)\\):" },
      { type: "eq", tex: "f_i(t) = f_c - 20\\sin(20\\pi t) - 80\\sin(40\\pi t) \\quad \\text{}" },
      
      // --- QUESTION: MAX PHASE DEVIATION (FRACTION) ---
      { type: "heading", text: "Q4. Maximum Phase Deviation (Fractional Term)" },
      { type: "para", text: "<b>Question:</b> Given \\(S(t) = A_c \\cos\\left(\\omega_c t + \\frac{t}{1+t^2}\\right)\\), calculate the maximum phase deviation \\(|\\Delta\\phi(t)|_{\\max}\\)." },
      { type: "para", text: "<b>Solution Steps:</b>" },
      { type: "para", text: "Extract the instantaneous angle \\(\\theta_i(t)\\) and isolate the phase deviation term:" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + \\frac{t}{1+t^2} \\implies \\Delta\\phi(t) = \\frac{t}{1+t^2}" },
      { type: "para", text: "To find the maximum, set the derivative to zero:" },
      { type: "eq", tex: "\\frac{d\\Delta\\phi(t)}{dt} = 0 \\implies t = \\pm 1" },
      { type: "para", text: "Evaluate the phase deviation at these critical points:" },
      { type: "list", items: [
          "\\(\\{\\Delta\\phi(t)\\}_{\\max} = 1/2\\) (at \\(t = 1\\))",
          "\\(\\{\\Delta\\phi(t)\\}_{\\min} = -1/2\\) (at \\(t = -1\\))"
        ]
      },
      { type: "para", text: "Thus, the absolute maximum phase deviation is:" },
      { type: "eq", tex: "|\\Delta\\phi(t)|_{\\max} = \\frac{1}{2} \\text{ Rad}" },

      // --- QUESTION: MAX PHASE DEVIATION (SINC FUNCTION) ---
      { type: "heading", text: "Q5. Maximum Phase Deviation (Sinc Function)" },
      { type: "para", text: "<b>Question:</b> Given \\(S(t) = A_c \\cos\\left(\\omega_c t + \\frac{4\\sin 2t}{t}\\right)\\), calculate the maximum phase deviation." },
      { type: "para", text: "<b>Solution Steps:</b>" },
      { type: "para", text: "Extract the phase deviation term:" },
      { type: "eq", tex: "\\Delta\\phi(t) = \\frac{4\\sin 2t}{t}" },
      { type: "para", text: "Apply the standard sinc function property substitution \\(\\frac{\\sin at}{bt} = \\frac{a}{b}\\text{sinc}\\left(\\frac{at}{\\pi}\\right)\\):" },
      { type: "eq", tex: "\\Delta\\phi(t) = 4 \\left\\{ 2 \\text{sinc}\\left(\\frac{2t}{\\pi}\\right) \\right\\} = 8 \\text{sinc}\\left(\\frac{2t}{\\pi}\\right)" },
      { type: "para", text: "Since the absolute maximum value of a sinc function is 1 (occurring at \\(t=0\\)), the maximum phase deviation is:" },
      { type: "eq", tex: "|\\Delta\\phi(t)|_{\\max} = 8 \\text{ Rad}" },

      // --- QUESTION: INSTANTANEOUS FREQUENCY PLOTS 1 & 2 ---
      { type: "heading", text: "Q6. Instantaneous Frequency Plot (Constant & Linear)" },
      { type: "para", text: "<b>Question A:</b> Given \\(S(t) = A_c \\cos(200\\pi t + \\pi/3)\\), plot \\(f_i(t)\\)." },
      { type: "eq", tex: "\\theta_i(t) = 200\\pi t + \\pi/3 \\implies \\omega_i(t) = 200\\pi \\implies f_i(t) = 100" },
      { type: "para", text: "<em>Plot Result:</em> A flat horizontal line at 100 Hz." },
      { type: "para", text: "<b>Question B:</b> Given \\(S(t) = A_c \\cos(200\\pi t + \\pi t^2)\\), plot \\(f_i(t)\\)." },
      { type: "eq", tex: "\\theta_i(t) = 200\\pi t + \\pi t^2 \\implies \\omega_i(t) = 200\\pi + 2\\pi t \\implies f_i(t) = 100 + t" },
      { type: "para", text: "<em>Plot Result:</em> A linear ramp starting at a y-intercept of 100 Hz with a positive slope." },

      // --- QUESTION: INSTANTANEOUS FREQUENCY PLOT 3 ---
      { type: "heading", text: "Q7. Instantaneous Frequency Plot (Trig Identity)" },
      { type: "para", text: "<b>Question:</b> Given \\(S(t) = \\cos(200\\pi t)\\cos(5\\sin 2\\pi t) + \\sin(200\\pi t)\\sin(5\\sin 2\\pi t)\\), plot \\(f_i(t)\\)." },
      { type: "para", text: "<b>Solution Steps:</b>" },
      { type: "para", text: "Apply the trigonometric identity \\(\\cos A \\cos B + \\sin A \\sin B = \\cos(A-B)\\) to simplify the signal:" },
      { type: "eq", tex: "S(t) = \\cos(200\\pi t - 5\\sin 2\\pi t)" },
      { type: "para", text: "Extract the angle and differentiate to find frequency:" },
      { type: "eq", tex: "\\theta_i(t) = 200\\pi t - 5\\sin 2\\pi t" },
      { type: "eq", tex: "\\omega_i(t) = 200\\pi - 10\\pi\\cos 2\\pi t \\implies f_i(t) = 100 - 5\\cos 2\\pi t" },
      { type: "para", text: "Find the upper and lower limits based on the boundaries of cosine (\\(-1 \\le \\cos 2\\pi t \\le 1\\)):" },
      { type: "eq", tex: "95 \\le f_i(t) \\le 105" },
      { type: "para", text: "<em>Plot Result:</em> A sinusoidal wave centered at 100 Hz, oscillating vertically between 95 Hz and 105 Hz." },
      
      // --- QUESTION: MULTI-TONE PARAMETERS (SAME FREQUENCY) ---
      { type: "heading", text: "Q8. Multi-Tone Parameters (Same Frequency Components)" },
      { type: "para", text: "<b>Question:</b> An angle modulated signal is given by \\(S(t) = \\cos(4\\pi \\times 10^6 t + 60\\pi \\cos 150t + 80\\pi \\sin 150t)\\). Determine: (i) Max phase deviation, (ii) Max frequency deviation, (iii) Deviation ratio." },
      { type: "para", text: "<b>(i) Maximum Phase Deviation:</b>" },
      { type: "para", text: "Extract the phase deviation term \\(\\Delta\\phi(t)\\). Since both terms share the exact same frequency (\\(\\omega_m = 150\\)), they combine vectorially (square root of sum of squares):" },
      { type: "eq", tex: "\\Delta\\phi(t) = 60\\pi \\cos 150t + 80\\pi \\sin 150t" },
      { type: "eq", tex: "|\\Delta\\phi(t)|_{\\max} = \\sqrt{(60\\pi)^2 + (80\\pi)^2} = 100\\pi \\text{ Rad}" },
      { type: "para", text: "<b>(ii) Maximum Frequency Deviation:</b>" },
      { type: "para", text: "Differentiate the phase deviation with respect to time to get \\(\\Delta\\omega(t)\\):" },
      { type: "eq", tex: "\\Delta\\omega(t) = \\frac{d\\Delta\\phi(t)}{dt} = 60\\pi(150)(-\\sin 150t) + 80\\pi(150)(\\cos 150t)" },
      { type: "eq", tex: "\\Delta\\omega(t) = (-150 \\times 60\\pi)\\sin 150t + (150 \\times 80\\pi)\\cos 150t" },
      { type: "para", text: "Again, because the frequencies are the same, combine the amplitudes vectorially:" },
      { type: "eq", tex: "|\\Delta\\omega(t)|_{\\max} = \\sqrt{(-150 \\times 60\\pi)^2 + (150 \\times 80\\pi)^2} = 15000\\pi \\text{ rad/sec}" },
      { type: "para", text: "<b>(iii) Deviation Ratio (\\(\\beta\\)):</b>" },
      { type: "para", text: "Divide the max frequency deviation by the maximum frequency of the message signal (\\(\\omega_{\\max} = 150\\)):" },
      { type: "eq", tex: "\\beta = \\frac{|\\Delta\\omega(t)|_{\\max}}{\\omega_{\\max}} = \\frac{15000\\pi}{150} = 100\\pi" },

      // --- QUESTION: MULTI-TONE PARAMETERS (DIFFERENT FREQUENCIES) ---
      { type: "heading", text: "Q9. Multi-Tone Parameters (Different Frequency Components)" },
      { type: "para", text: "<b>Question:</b> An angle modulated signal is given as \\(S(t) = 10\\cos(\\omega_c t + 5\\sin 2000t + 10\\sin 3000\\pi t)\\). Determine: (i) Max phase deviation, (ii) Max frequency deviation, (iii) Deviation ratio." },
      { type: "para", text: "<b>(i) Maximum Phase Deviation:</b>" },
      { type: "para", text: "Extract the phase deviation term. Because the frequencies are different (\\(\\omega_1 = 2000\\) and \\(\\omega_2 = 3000\\pi\\)), the maximum peak is simply the algebraic sum of their absolute amplitudes:" },
      { type: "eq", tex: "\\Delta\\phi(t) = 5\\sin 2000t + 10\\sin 3000\\pi t" },
      { type: "eq", tex: "|\\Delta\\phi(t)|_{\\max} = |5| + |10| = 15 \\text{ Rad}" },
      { type: "para", text: "<b>(ii) Maximum Frequency Deviation:</b>" },
      { type: "para", text: "Differentiate the phase deviation with respect to time:" },
      { type: "eq", tex: "\\Delta\\omega(t) = \\frac{d\\Delta\\phi(t)}{dt} = 5(2000)\\cos 2000t + 10(3000\\pi)\\cos 3000\\pi t" },
      { type: "eq", tex: "\\Delta\\omega(t) = 10000\\cos 2000t + 30000\\pi\\cos 3000\\pi t" },
      { type: "para", text: "Sum the absolute amplitudes of the resulting terms:" },
      { type: "eq", tex: "|\\Delta\\omega(t)|_{\\max} = 10000 + 30000\\pi \\text{ rad/sec}" },
      { type: "para", text: "<b>(iii) Deviation Ratio (\\(\\beta\\)):</b>" },
      { type: "para", text: "Identify the highest frequency component in the message signal (\\(\\omega_{\\max} = 3000\\pi\\)) and calculate the ratio:" },
      { type: "eq", tex: "\\beta = \\frac{|\\Delta\\omega(t)|_{\\max}}{\\omega_{\\max}} = \\frac{10000 + 30000\\pi}{3000\\pi}" },
      
      // --- QUESTION: EXTRACTING M(T) FROM S(T) ---
      { type: "heading", text: "Q10. Extracting Message Signal m(t) from S(t)" },
      { type: "para", text: "<b>Question:</b> An angle modulated signal is given by \\(S(t) = 10\\cos(2\\pi \\times 10^6 t + 0.1\\sin(2\\pi \\times 10^3 t))\\). Calculate \\(m(t)\\) for two cases: (i) If it is a PM signal with \\(K_p = 10 \\text{ rad/V}\\), and (ii) If it is an FM signal with \\(K_f = 10 \\text{ rad/V-sec}\\)." },
      { type: "para", text: "<b>(i) Case 1: Phase Modulation (PM)</b>" },
      { type: "para", text: "In PM, the phase deviation is directly proportional to \\(m(t)\\):" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + K_p m(t)" },
      { type: "para", text: "Equating the phase term from the given signal:" },
      { type: "eq", tex: "K_p m(t) = 0.1 \\sin(2\\pi \\times 10^3 t)" },
      { type: "para", text: "Substitute \\(K_p = 10\\) and solve for \\(m(t)\\):" },
      { type: "eq", tex: "10 \\cdot m(t) = 0.1 \\sin(2\\pi \\times 10^3 t) \\implies m(t) = 0.01 \\sin(2\\pi \\times 10^3 t)" },
      { type: "para", text: "<b>(ii) Case 2: Frequency Modulation (FM)</b>" },
      { type: "para", text: "In FM, the phase deviation is the integral of \\(m(t)\\):" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + \\int K_f m(t) dt" },
      { type: "para", text: "Equating the phase term and differentiating both sides with respect to time:" },
      { type: "eq", tex: "\\int K_f m(t) dt = 0.1 \\sin(2\\pi \\times 10^3 t)" },
      { type: "eq", tex: "K_f m(t) = \\frac{d}{dt} [0.1 \\sin(2\\pi \\times 10^3 t)] = 0.1(2\\pi \\times 10^3) \\cos(2\\pi \\times 10^3 t)" },
      { type: "eq", tex: "K_f m(t) = 200\\pi \\cos(2\\pi \\times 10^3 t)" },
      { type: "para", text: "Substitute \\(K_f = 10\\) and solve for \\(m(t)\\):" },
      { type: "eq", tex: "10 \\cdot m(t) = 200\\pi \\cos(2\\pi \\times 10^3 t) \\implies m(t) = 20\\pi \\cos(2\\pi \\times 10^3 t)" },

      // --- QUESTION: PM WITH GRAPHICAL M(T) ---
      { type: "heading", text: "Q11. PM Parameters from Graphical Message Signal" },
      { type: "para", text: "<b>Question:</b> A message signal \\(m(t)\\) is a sawtooth-like waveform (peaks at 16, rises over 8ms, falls over 2ms). It is applied to a Phase Modulator with a 1 MHz carrier. If the maximum frequency deviation is 80 kHz, calculate (i) \\(K_p\\), and (ii) the max and min values of instantaneous frequency." },
      { type: "para", text: "<b>Step 1: Analyze the slopes of \\(m(t)\\)</b>" },
      { type: "para", text: "Since frequency deviation in PM depends heavily on the derivative of \\(m(t)\\), we must first find the slopes of the waveform:" },
      { type: "list", items: [
          "Rising slope (0 to 8 ms): \\(\\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\max} = \\frac{16 - 0}{8 \\times 10^{-3}} = 2 \\times 10^3\\)",
          "Falling slope (8 to 10 ms): \\(\\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\min} = \\frac{0 - 16}{2 \\times 10^{-3}} = -8 \\times 10^3\\)"
        ]
      },
      { type: "para", text: "The absolute maximum slope magnitude is \\(|\\frac{dm(t)}{dt}|_{\\max} = 8 \\times 10^3\\)." },
      { type: "para", text: "<b>(i) Calculate Phase Sensitivity (\\(K_p\\)):</b>" },
      { type: "para", text: "Using the fundamental formula for maximum frequency deviation in PM:" },
      { type: "eq", tex: "|\\Delta f(t)|_{\\max} = \\frac{K_p}{2\\pi} \\left| \\frac{dm(t)}{dt} \\right|_{\\max} = 80 \\text{ kHz}" },
      { type: "eq", tex: "\\frac{K_p}{2\\pi} \\times (8000) = 80,000 \\implies \\frac{K_p}{2\\pi} = 10 \\implies K_p = 20\\pi \\text{ rad/V}" },
      { type: "para", text: "<b>(ii) Calculate Max & Min Instantaneous Frequency:</b>" },
      { type: "para", text: "Apply the positive and negative extreme slopes directly to the carrier frequency (\\(f_c = 1000 \\text{ kHz}\\)) using the extracted ratio \\(\\frac{K_p}{2\\pi} = 10\\):" },
      { type: "eq", tex: "\\{f_i(t)\\}_{\\max} = f_c + \\frac{K_p}{2\\pi} \\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\max} = 1000\\text{ kHz} + 10(2\\text{ kHz}) = 1020 \\text{ kHz}" },
      { type: "eq", tex: "\\{f_i(t)\\}_{\\min} = f_c + \\frac{K_p}{2\\pi} \\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\min} = 1000\\text{ kHz} + 10(-8\\text{ kHz}) = 920 \\text{ kHz}" },
      
      // --- QUESTION: PM PEAK-TO-PEAK DEVIATION (GRAPHICAL) ---
      { type: "heading", text: "Q12. PM Peak-to-Peak Frequency Deviation (Graphical)" },
      { type: "para", text: "<b>Question:</b> Given a periodic message signal \\(m(t)\\) and \\(S(t) = A_c \\cos(2\\pi \\times 10^8 t + K_p m(t))\\), calculate \\(K_p\\) if the peak-to-peak frequency deviation is 100 kHz." },
      { type: "para", text: "<b>Step 1: Extract the slopes of \\(m(t)\\)</b>" },
      { type: "para", text: "From the given graph, we identify the steepest positive and negative slopes:" },
      { type: "list", items: [
          "Maximum slope: \\(\\left(\\frac{dm(t)}{dt}\\right)_{\\max} = 2.5 \\times 10^3\\)",
          "Minimum slope: \\(\\left(\\frac{dm(t)}{dt}\\right)_{\\min} = -17.5 \\times 10^3\\)"
        ]
      },
      { type: "para", text: "<b>Step 2: Apply the PM frequency deviation formula</b>" },
      { type: "para", text: "The instantaneous frequency is \\(f_i(t) = 10^8 + \\frac{K_p}{2\\pi} \\frac{dm(t)}{dt}\\). The peak-to-peak deviation is the difference between the max and min frequency limits:" },
      { type: "eq", tex: "\\Delta f(t)_{p-p} = \\frac{K_p}{2\\pi} \\left\\{ \\left(\\frac{dm(t)}{dt}\\right)_{\\max} - \\left(\\frac{dm(t)}{dt}\\right)_{\\min} \\right\\} = 100 \\text{ kHz}" },
      { type: "eq", tex: "\\frac{K_p}{2\\pi} \\{2.5 \\times 10^3 - (-17.5 \\times 10^3)\\} = 100 \\times 10^3" },
      { type: "eq", tex: "\\frac{K_p}{2\\pi} \\{20 \\times 10^3\\} = 100 \\times 10^3 \\implies \\frac{K_p}{2\\pi} = 5" },
      { type: "eq", tex: "K_p = 10\\pi \\text{ Rad/V}" },

      // --- QUESTION: FM K_F FROM PEAK-TO-PEAK ---
      { type: "heading", text: "Q13. Calculating \\(K_f\\) from Peak-to-Peak Deviation" },
      { type: "para", text: "<b>Question:</b> An FM signal is given by \\(S(t) = 10 \\cos\\left(2\\pi f_c t + 2\\pi K_f \\int_{-\\infty}^{t} m(\\lambda) d\\lambda\\right)\\). The modulating signal \\(m(t)\\) has a max voltage of 10V and min voltage of -5V. If the peak-to-peak frequency deviation is 25 kHz, find \\(K_f\\) (in Hz/volt)." },
      { type: "para", text: "<b>Step 1: Define the instantaneous frequency</b>" },
      { type: "para", text: "Since the integration is multiplied by \\(2\\pi K_f\\), the parameter \\(K_f\\) is directly in Hz/volt:" },
      { type: "eq", tex: "f_i(t) = f_c + K_f m(t)" },
      { type: "para", text: "<b>Step 2: Set up the peak-to-peak deviation</b>" },
      { type: "eq", tex: "\\Delta f(t)_{p-p} = K_f (m(t))_{\\max} - K_f (m(t))_{\\min}" },
      { type: "para", text: "<b>Step 3: Substitute and solve</b>" },
      { type: "eq", tex: "25 \\times 10^3 = K_f [10 - (-5)] = K_f [15]" },
      { type: "eq", tex: "K_f = \\frac{25 \\times 10^3}{15} = \\frac{5}{3} \\text{ kHz/V}" },

      // --- QUESTION: INSTANTANEOUS FREQUENCY AT SPECIFIC TIME ---
      { type: "heading", text: "Q14. Instantaneous Frequency at a Specific Time" },
      { type: "para", text: "<b>Question:</b> A PM signal is modulated by \\(x(t) = 5\\sin(4\\pi \\times 10^3 t - 10\\pi \\cos(2\\pi \\times 10^3 t))\\). Given \\(K_p = 5 \\text{ rad/V}\\) and a carrier frequency of 20 kHz, find the instantaneous frequency of \\(S(t)\\) at \\(t = 0.5 \\text{ m-sec}\\)." },
      { type: "para", text: "<b>Step 1: Differentiate to find angular frequency \\(\\omega_i(t)\\)</b>" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + K_p \\cdot x(t) \\implies \\omega_i(t) = \\omega_c + K_p \\cdot \\frac{dx(t)}{dt}" },
      { type: "para", text: "Applying the chain rule to \\(x(t)\\):" },
      { type: "eq", tex: "\\omega_i(t) = \\omega_c + 5K_p \\cos[4\\pi \\times 10^3 t - 10\\pi \\cos(2\\pi \\times 10^3 t)] \\cdot \\{4\\pi \\times 10^3 - 10\\pi(-\\sin(2\\pi \\times 10^3 t)) \\cdot 2\\pi \\times 10^3\\}" },
      { type: "para", text: "<b>Step 2: Evaluate at \\(t = 0.5 \\text{ ms} (0.5 \\times 10^{-3} \\text{ s})\\)</b>" },
      { type: "para", text: "Calculate the internal terms first: \\(4\\pi \\times 10^3 (0.5 \\times 10^{-3}) = 2\\pi\\) and \\(2\\pi \\times 10^3 (0.5 \\times 10^{-3}) = \\pi\\)." },
      { type: "eq", tex: "\\omega_i(0.5\\text{ms}) = \\omega_c + 5K_p \\cos[2\\pi - 10\\pi \\cos(\\pi)] \\cdot \\{4\\pi \\times 10^3 + 20\\pi^2 \\times 10^3 \\sin(\\pi)\\}" },
      { type: "para", text: "Since \\(\\cos(\\pi) = -1\\) and \\(\\sin(\\pi) = 0\\), this simplifies significantly:" },
      { type: "eq", tex: "\\omega_i = \\omega_c + 5K_p \\cos(12\\pi) \\cdot \\{4\\pi \\times 10^3\\} \\implies \\omega_i = \\omega_c + 20\\pi \\times 10^3 K_p" },
      { type: "para", text: "<b>Step 3: Convert to standard frequency \\(f_i\\) and solve</b>" },
      { type: "para", text: "Divide the entire expression by \\(2\\pi\\):" },
      { type: "eq", tex: "f_i = f_c + 10 K_p \\times 10^3" },
      { type: "eq", tex: "f_i = 20\\text{ kHz} + 10(5)(1\\text{ kHz}) = 20\\text{ kHz} + 50\\text{ kHz} = 70 \\text{ kHz}" },
      
      // --- QUESTION: MAX FREQ WITH DIFFERENTIATOR ---
      { type: "heading", text: "Q15. Maximum Instantaneous Frequency with Pre-Differentiator" },
      { type: "para", text: "<b>Question:</b> A message signal \\(m(t)\\) is passed through a differentiator to produce \\(m_1(t)\\). This \\(m_1(t)\\) is then applied to an FM modulator with \\(K_f = 10 \\text{ kHz/V}\\) and a carrier \\(2\\cos(2\\pi \\times 10^4 t)\\). If \\(m(t)\\) is a triangular wave peaking at 4V with a rising edge duration of 2 seconds, find the maximum instantaneous frequency of \\(S(t)\\)." },
      { type: "para", text: "<b>Step 1: Identify Carrier and Sensitivity</b>" },
      { type: "eq", tex: "f_c = 10^4 \\text{ Hz} = 10 \\text{ kHz}, \\quad K_f = 10 \\text{ kHz/V}" },
      { type: "para", text: "<b>Step 2: Define Instantaneous Frequency</b>" },
      { type: "para", text: "Because the input to the FM modulator is the derivative of \\(m(t)\\), the instantaneous frequency is:" },
      { type: "eq", tex: "f_i(t) = f_c + K_f m_1(t) = f_c + K_f \\left\\{ \\frac{dm(t)}{dt} \\right\\}" },
      { type: "para", text: "To find the maximum instantaneous frequency, we need the maximum positive slope of \\(m(t)\\):" },
      { type: "eq", tex: "\\{f_i(t)\\}_{\\max} = f_c + K_f \\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\max}" },
      { type: "para", text: "<b>Step 3: Calculate Max Slope and Final Frequency</b>" },
      { type: "para", text: "From the graph, the steepest rising slope occurs from \\(t=0\\) to \\(t=2\\) seconds, where the voltage goes from 0 to 4V:" },
      { type: "eq", tex: "\\left\\{ \\frac{dm(t)}{dt} \\right\\}_{\\max} = \\frac{4 - 0}{2 - 0} = 2 \\text{ V/s}" },
      { type: "para", text: "Substitute this back into the frequency equation:" },
      { type: "eq", tex: "\\{f_i(t)\\}_{\\max} = 10\\text{ kHz} + 10\\text{ kHz/V} (2) = 10\\text{ kHz} + 20\\text{ kHz} = 30 \\text{ kHz}" },

      // --- QUESTION: EQUATING PHASE DEVIATION ---
      { type: "heading", text: "Q16. Equating Maximum Phase Deviation (PM vs FM)" },
      { type: "para", text: "<b>Question:</b> Calculate the ratio \\(K_p/K_f\\) in rad/Hz such that the maximum phase deviation is exactly the same for both PM and FM systems when subjected to the same message signal \\(m(t)\\)." },
      { type: "para", text: "<b>Step 1: Calculate Maximum Phase Deviation for PM</b>" },
      { type: "para", text: "For Phase Modulation, the phase deviation is directly proportional to the message signal:" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + K_p m(t) \\implies |\\Delta\\phi(t)|_{\\max} = \\Delta\\phi_{PM} = K_p |m(t)|_{\\max}" },
      { type: "para", text: "From the provided waveform graph, the absolute maximum amplitude of \\(m(t)\\) is 4V:" },
      { type: "eq", tex: "\\Delta\\phi_{PM} = 4 K_p" },
      { type: "para", text: "<b>Step 2: Calculate Maximum Phase Deviation for FM</b>" },
      { type: "para", text: "For Frequency Modulation, where \\(K_f\\) is in Hz/V, the phase deviation depends on the integral (area under the curve) of \\(m(t)\\):" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + \\int 2\\pi K_f m(t) dt \\implies |\\Delta\\phi(t)|_{\\max} = \\Delta\\phi_{FM} = 2\\pi K_f \\left| \\int_{-\\infty}^{t} m(t) dt \\right|_{\\max}" },
      { type: "para", text: "We compute the cumulative area under \\(m(t)\\) over time:" },
      { type: "table",
        headers: ["Time (upto)", "Area Segment", "Cumulative Area (\\(|\\int m(t) dt|\\))"],
        rows: [
          ["t = 0", "0", "0"],
          ["t = 1", "\\(A_1 = \\frac{1}{2} \\times 1 \\times 4 = 2\\)", "2"],
          ["t = 2", "\\(A_1 + A_2 = 2 + (1 \\times 4)\\)", "6"],
          ["t = 3", "\\(A_1 + A_2 + A_3 = 6 + (1 \\times -4)\\)", "2"]
        ]
      },
      { type: "para", text: "The maximum absolute area is 6. Substitute this into the FM phase equation:" },
      { type: "eq", tex: "\\Delta\\phi_{FM} = 2\\pi K_f (6) = 12\\pi K_f" },
      { type: "para", text: "<b>Step 3: Equate and Solve for the Ratio</b>" },
      { type: "para", text: "Set the max phase deviations equal to each other as required by the problem:" },
      { type: "eq", tex: "\\Delta\\phi_{PM} = \\Delta\\phi_{FM} \\implies 4 K_p = 12\\pi K_f" },
      { type: "eq", tex: "\\frac{K_p}{K_f} = \\frac{12\\pi}{4} = 3\\pi \\text{ Rad/Hz}" },
      
      // --- QUESTION: EQUATING FREQ DEVIATION ---
      { type: "heading", text: "Q17. Equating Maximum Frequency Deviation (PM vs FM)" },
      { type: "para", text: "<b>Question:</b> Given a specific message signal \\(m(t)\\) passing through both a Phase Modulator and a Frequency Modulator, calculate the ratio \\(K_p/K_f\\) in rad/Hz if the maximum frequency deviation in both cases is exactly the same." },
      { type: "para", text: "<b>Step 1: Extract Parameters from \\(m(t)\\)</b>" },
      { type: "para", text: "From the given waveform, we need two key values depending on the modulation scheme:" },
      { type: "list", items: [
          "<b>Maximum amplitude (for FM):</b> The highest peak on the graph is \\(|m(t)|_{\\max} = 10\\).",
          "<b>Maximum slope magnitude (for PM):</b> We check the slopes of each segment. The steepest slope occurs in the final drop from \\(t=20\\) to \\(t=21\\), where voltage drops from 5 to 0.<br> \\(|\\frac{dm(t)}{dt}|_{\\max} = \\left|\\frac{0 - 5}{21 - 20}\\right| = |-5| = 5\\)."
        ]
      },
      { type: "para", text: "<b>Step 2: Calculate Max Frequency Deviation for FM</b>" },
      { type: "para", text: "For FM, the frequency deviation is proportional to the amplitude of \\(m(t)\\):" },
      { type: "eq", tex: "f_i(t) = f_c + K_f m(t) \\implies |\\Delta f(t)|_{\\max} = \\Delta f_{FM} = K_f |m(t)|_{\\max}" },
      { type: "eq", tex: "\\Delta f_{FM} = 10 K_f \\quad \\dots (i)" },
      { type: "para", text: "<b>Step 3: Calculate Max Frequency Deviation for PM</b>" },
      { type: "para", text: "For PM, the frequency deviation is proportional to the derivative (slope) of \\(m(t)\\):" },
      { type: "eq", tex: "\\theta_i(t) = \\omega_c t + K_p m(t) \\implies \\omega_i(t) = \\omega_c + K_p \\frac{dm(t)}{dt}" },
      { type: "eq", tex: "f_i(t) = f_c + \\frac{K_p}{2\\pi} \\frac{dm(t)}{dt} \\implies |\\Delta f(t)|_{\\max} = \\Delta f_{PM} = \\frac{K_p}{2\\pi} \\left|\\frac{dm(t)}{dt}\\right|_{\\max}" },
      { type: "eq", tex: "\\Delta f_{PM} = \\frac{K_p}{2\\pi} (5) \\quad \\dots (ii)" },
      { type: "para", text: "<b>Step 4: Equate and Solve for the Ratio</b>" },
      { type: "para", text: "Equate the two frequency deviations as instructed by the problem:" },
      { type: "eq", tex: "\\Delta f_{PM} = \\Delta f_{FM} \\implies \\frac{K_p}{2\\pi} (5) = 10 K_f" },
      { type: "eq", tex: "\\frac{K_p}{K_f} = \\frac{10 \\times 2\\pi}{5} = 4\\pi \\text{ Rad/Hz}" },
      
      // --- SECTION: PROBLEM SOLVING QUEUE ---
      { type: "heading", text: "16.30 Problem Solving & Questions" },
      
      // --- QUESTION: BW OF TRIANGULAR WAVE ---
      { type: "heading", text: "Q1. Bandwidth of FM and PM (Triangular Modulating Signal)" },
      { type: "para", text: "<b>Question:</b> A periodic triangular modulating signal \\(m(t)\\) has a period \\(T_0 = 2 \\times 10^{-4}\\text{ sec}\\) and peak amplitude \\(\\pm 1\\text{ V}\\). Given \\(K_f = 2\\pi \\times 10^5 \\text{ rad/V-sec}\\) and \\(K_p = 5\\pi \\text{ rad/V}\\), calculate the bandwidth for both FM and PM. Assume the essential bandwidth of \\(m(t)\\) is up to the 3rd harmonic." },
      
      // Interactive Triangular Wave Simulator
      { type: "canvas_sim", simId: "triangular_bw_sim", height: 180, controlLabel: "Amplitude Multiplier:", min: 1, max: 3, step: 1, defaultVal: 1 },
      
      { type: "para", text: "<b>Step 1: Find Fundamental Frequency & Essential Bandwidth</b>" },
      { type: "eq", tex: "f_0 = \\frac{1}{T_0} = \\frac{1}{2 \\times 10^{-4}} = 5\\text{ kHz}" },
      { type: "eq", tex: "f_{\\max} = 3f_0 = 3(5\\text{ kHz}) = 15\\text{ kHz}" },
      { type: "para", text: "<b>Step 2: Calculate FM Bandwidth</b>" },
      { type: "para", text: "For FM, maximum frequency deviation depends directly on the absolute maximum amplitude of \\(m(t)\\), which is 1V:" },
      { type: "eq", tex: "|\\Delta f(t)|_{\\max} = \\frac{K_f}{2\\pi} |m(t)|_{\\max} = \\frac{2\\pi \\times 10^5}{2\\pi} (1) = 100\\text{ kHz}" },
      { type: "eq", tex: "(BW)_{FM} = 2(|\\Delta f(t)|_{\\max} + f_{\\max}) = 2(100 + 15) = 230\\text{ kHz}" },
      { type: "para", text: "<b>Step 3: Calculate PM Bandwidth</b>" },
      { type: "para", text: "For PM, maximum frequency deviation depends on the absolute maximum slope of \\(m(t)\\). The wave rises from -1V to 1V over half a period (\\(1 \\times 10^{-4}\\text{ sec}\\)):" },
      { type: "eq", tex: "\\left|\\frac{dm(t)}{dt}\\right|_{\\max} = \\frac{1 - (-1)}{1 \\times 10^{-4}} = \\frac{2}{10^{-4}} = 2 \\times 10^4 \\text{ V/s}" },
      { type: "eq", tex: "|\\Delta f(t)|_{\\max} = \\frac{K_p}{2\\pi} \\left|\\frac{dm(t)}{dt}\\right|_{\\max} = \\frac{5\\pi}{2\\pi} (2 \\times 10^4) = 50\\text{ kHz}" },
      { type: "eq", tex: "(BW)_{PM} = 2(|\\Delta f(t)|_{\\max} + f_{\\max}) = 2(50 + 15) = 130\\text{ kHz}" },

      // --- QUESTION: BW WITH DOUBLED AMPLITUDE ---
      { type: "heading", text: "Q2. Bandwidth if Amplitude is Doubled" },
      { type: "para", text: "<b>Question:</b> Calculate the bandwidth for both FM and PM if the amplitude of the modulating signal \\(m(t)\\) is doubled, i.e., \\(x(t) = 2m(t)\\)." },
      { type: "para", text: "<b>Solution Steps:</b>" },
      { type: "para", text: "When amplitude doubles, the peak value goes to 2V, and the maximum slope also geometrically doubles. However, the period and essential bandwidth (\\(f_{\\max} = 15\\text{ kHz}\\)) remain completely unchanged." },
      { type: "para", text: "<b>For FM:</b>" },
      { type: "eq", tex: "\\Delta f_{new} = \\frac{K_f}{2\\pi} |x(t)|_{\\max} = 10^5 \\times (2) = 200\\text{ kHz}" },
      { type: "eq", tex: "(BW)_{FM} = 2(200 + 15) = 430\\text{ kHz}" },
      { type: "para", text: "<b>For PM:</b>" },
      { type: "eq", tex: "\\Delta f_{new} = \\frac{K_p}{2\\pi} \\left|\\frac{dx(t)}{dt}\\right|_{\\max} = 2.5 \\times (4 \\times 10^4) = 100\\text{ kHz}" },
      { type: "eq", tex: "(BW)_{PM} = 2(100 + 15) = 230\\text{ kHz}" },
      
      // --- QUESTION: TIME EXPANDED TRIANGULAR WAVE ---
      { type: "heading", text: "Q3. Bandwidth with Time-Expanded Signal" },
      { type: "para", text: "<b>Question:</b> Calculate the bandwidth of FM and PM if the previous triangular signal \\(m(t)\\) is time-expanded by a factor of 2, i.e., \\(y(t) = m(t/2)\\)." },
      { type: "para", text: "<b>Solution Steps:</b>" },
      { type: "para", text: "Time expansion stretches the signal horizontally. The amplitude remains the same, but the period doubles and the frequencies halve:" },
      { type: "list", items: [
          "New Period: \\(T_0 = 4 \\times 10^{-4} \\text{ sec}\\)",
          "New Fundamental Freq: \\(f_0 = 2.5 \\text{ kHz}\\)",
          "New Essential Bandwidth (up to 3rd harmonic): \\(f_{\\max} = 3f_0 = 7.5 \\text{ kHz}\\)"
        ]
      },
      { type: "para", text: "<b>For FM:</b>" },
      { type: "para", text: "Frequency deviation in FM depends only on the peak amplitude, which is unchanged (1V). Thus, \\(\\Delta f\\) is still 100 kHz." },
      { type: "eq", tex: "BW_{FM} = 2(\\Delta f + f_{\\max}) = 2(100 + 7.5) = 215 \\text{ kHz}" },
      { type: "para", text: "<b>For PM:</b>" },
      { type: "para", text: "Frequency deviation in PM depends on the slope. Because the time period doubled, the signal takes twice as long to rise to 1V, meaning the slope is halved:" },
      { type: "eq", tex: "\\left| \\frac{dy(t)}{dt} \\right|_{\\max} = \\frac{1 - (-1)}{2 \\times 10^{-4}} = 10^4 \\text{ V/s}" },
      { type: "eq", tex: "\\Delta f = \\frac{K_p}{2\\pi} \\left| \\frac{dy(t)}{dt} \\right|_{\\max} = \\frac{5\\pi}{2\\pi} \\times 10^4 = 2.5 \\times 10^4 = 25 \\text{ kHz}" },
      { type: "eq", tex: "BW_{PM} = 2(\\Delta f + f_{\\max}) = 2(25 + 7.5) = 65 \\text{ kHz}" },

      // --- QUESTION: SQUARE WAVE BW ---
      { type: "heading", text: "Q4. FM Bandwidth of a Square Wave Message" },
      { type: "para", text: "<b>Question:</b> A square wave \\(m(t)\\) with period \\(T_0 = 4 \\times 10^{-4} \\text{ sec}\\) (amplitude \\(\\pm 1\\text{V}\\)) contains maximum frequency components up to the 5th harmonic. It modulates an FM carrier with \\(K_f = 3 \\text{ kHz/V}\\). Calculate the bandwidth of the FM signal." },
      
      // Interactive Square Wave Simulator
      { type: "canvas_sim", simId: "square_bw_sim", height: 180, controlLabel: "Max Harmonic Included:", min: 1, max: 9, step: 2, defaultVal: 5 },

      { type: "para", text: "<b>Step 1: Determine \\(f_{\\max}\\)</b>" },
      { type: "eq", tex: "f_0 = \\frac{1}{T_0} = \\frac{1}{4 \\times 10^{-4}} = 2.5 \\text{ kHz}" },
      { type: "para", text: "Since the signal includes up to the 5th harmonic:" },
      { type: "eq", tex: "f_{\\max} = 5f_0 = 5(2.5 \\text{ kHz}) = 12.5 \\text{ kHz}" },
      { type: "para", text: "<b>Step 2: Calculate Frequency Deviation</b>" },
      { type: "para", text: "For FM, \\(\\Delta f\\) only cares about the absolute maximum amplitude of the square wave, which is 1V:" },
      { type: "eq", tex: "\\Delta f = K_f |m(t)|_{\\max} = (3 \\text{ kHz/V})(1\\text{V}) = 3 \\text{ kHz}" },
      { type: "para", text: "<b>Step 3: Calculate Bandwidth using Carson's Rule</b>" },
      { type: "eq", tex: "BW_{FM} = 2(\\Delta f + f_{\\max}) = 2(3 + 12.5) = 2(15.5) = 31 \\text{ kHz}" },

      // --- QUESTION: BESSEL COEFFICIENT EXTRACTION ---
      { type: "heading", text: "Q5. Extracting Bessel Coefficients from WBFM" },
      { type: "para", text: "<b>Question:</b> Given \\(C(t) = 5\\cos(2\\pi \\times 10^6 t)\\) and \\(m(t) = \\cos(4\\pi \\times 10^3 t)\\). The frequency deviation of the resulting FM signal is 3 times the bandwidth of an AM signal using the same message. Find the coefficient of the \\(\\cos(2\\pi \\times 1016 \\times 10^3 t)\\) term in the FM signal expression." },
      { type: "para", text: "<b>Step 1: Extract Base Parameters</b>" },
      { type: "eq", tex: "f_c = 10^6 \\text{ Hz} = 1000 \\text{ kHz}" },
      { type: "eq", tex: "2\\pi f_m t = 4\\pi \\times 10^3 t \\implies f_m = 2 \\times 10^3 \\text{ Hz} = 2 \\text{ kHz}" },
      { type: "para", text: "<b>Step 2: Find \\(\\Delta f\\) and \\(\\beta\\)</b>" },
      { type: "para", text: "The bandwidth of an AM signal is \\(2f_m\\). The problem states \\(\\Delta f = 3 \\times BW_{AM}\\):" },
      { type: "eq", tex: "\\Delta f = 3(2f_m) = 6(2 \\text{ kHz}) = 12 \\text{ kHz}" },
      { type: "para", text: "Calculate the modulation index:" },
      { type: "eq", tex: "\\beta = \\frac{\\Delta f}{f_m} = \\frac{12}{2} = 6" },
      { type: "para", text: "Since \\(\\beta \\gg 1\\), this is Wideband FM, and we must use the infinite Bessel series expansion:" },
      { type: "eq", tex: "S_{FM}(t) = \\sum_{n=-\\infty}^{\\infty} A_c J_n(\\beta) \\cos[2\\pi(f_c + n f_m)t]" },
      { type: "para", text: "<b>Step 3: Match the Target Frequency</b>" },
      { type: "para", text: "Substitute our knowns (\\(A_c=5\\), \\(\\beta=6\\), \\(f_c=1000k\\), \\(f_m=2k\\)) into the generic frequency component term:" },
      { type: "eq", tex: "f_{component} = 1000\\text{k} + n(2\\text{k})" },
      { type: "para", text: "Set this equal to the target frequency from the question (1016 kHz) and solve for \\(n\\):" },
      { type: "eq", tex: "1000 + 2n = 1016 \\implies 2n = 16 \\implies n = 8" },
      { type: "para", text: "<b>Step 4: Extract the Coefficient</b>" },
      { type: "para", text: "The coefficient for any term is \\(A_c J_n(\\beta)\\). Plugging in our values yields the final answer:" },
      { type: "eq", tex: "\\text{Coefficient} = 5 J_8(6)" },
      
      // --- QUESTION: WBFM BESSEL COEFFICIENTS ---
      { type: "heading", text: "Q6. WBFM Spectral Coefficients & Symmetry Ratios" },
      { type: "para", text: "<b>Question:</b> An FM signal is given as \\(100\\cos(2\\pi f_c t + 4\\sin 6000\\pi t)\\) where \\(f_c = 1 \\text{ MHz}\\). Calculate: <br>(a) Modulation index, <br>(b) Coefficient of \\(\\cos(2018\\pi \\times 10^3 t)\\) in terms of Bessel functions, and <br>(c) The ratio of coefficients for the terms \\(\\frac{\\cos(1976\\pi \\times 10^3 t)}{\\cos(2024\\pi \\times 10^3 t)}\\)." },
      
      { type: "para", text: "<b>Step 1: Extract Base Parameters</b>" },
      { type: "para", text: "Compare the given equation to the standard single-tone FM equation: \\(S(t) = A_c \\cos(\\omega_c t + \\beta \\sin \\omega_m t)\\)." },
      { type: "list", items: [
          "Carrier Amplitude: \\(A_c = 100\\)",
          "Carrier Freq: \\(f_c = 1 \\text{ MHz} = 1000 \\text{ kHz} \\implies \\omega_c = 2000\\pi \\times 10^3 \\text{ rad/sec}\\)",
          "Message Freq: \\(\\omega_m = 6000\\pi \\implies f_m = 3 \\text{ kHz}\\)"
        ]
      },
      { type: "para", text: "<b>(a) Modulation Index:</b> Directly from the equation, we can see \\(\\beta = 4\\)." },

      { type: "para", text: "<b>Step 2: Solve (b) - Find Specific Harmonic Coefficient</b>" },
      { type: "para", text: "In WBFM, the signal expands into infinite sidebands: \\(S(t) = \\sum A_c J_n(\\beta) \\cos(2\\pi(f_c + n f_m)t)\\)." },
      { type: "para", text: "Let's define the angular frequency of the \\(n^{th}\\) component:" },
      { type: "eq", tex: "\\omega_n = 2\\pi(f_c + n f_m) = 2\\pi(1000\\text{k} + n \\cdot 3\\text{k}) = (2000 + 6n)\\pi \\times 10^3" },
      { type: "para", text: "Set this equal to the target frequency (\\(2018\\pi \\times 10^3\\)) and solve for the harmonic order \\(n\\):" },
      { type: "eq", tex: "2000 + 6n = 2018 \\implies 6n = 18 \\implies n = 3" },
      { type: "para", text: "The coefficient for the \\(3^{rd}\\) order sideband is \\(A_c J_3(\\beta)\\). Plugging in our values:" },
      { type: "eq", tex: "\\text{Coefficient} = 100 J_3(4)" },

      { type: "para", text: "<b>Step 3: Solve (c) - Ratio of Coefficients</b>" },
      { type: "para", text: "First, find the harmonic order \\(n\\) for both target frequencies:" },
      { type: "list", items: [
          "<b>Numerator (1976):</b> \\(2000 + 6n = 1976 \\implies 6n = -24 \\implies n = -4\\)",
          "<b>Denominator (2024):</b> \\(2000 + 6n = 2024 \\implies 6n = 24 \\implies n = 4\\)"
        ]
      },
      { type: "para", text: "Set up the ratio using their respective Bessel coefficients:" },
      { type: "eq", tex: "\\text{Ratio} = \\frac{100 J_{-4}(4)}{100 J_4(4)} = \\frac{J_{-4}(4)}{J_4(4)}" },
      { type: "para", text: "Apply the crucial Bessel symmetry property: \\(J_{-n}(\\beta) = (-1)^n J_n(\\beta)\\). Since \\(n=4\\) is an even number, \\((-1)^4 = 1\\), meaning \\(J_{-4}(4) = J_4(4)\\)." },
      { type: "eq", tex: "\\text{Ratio} = \\frac{J_4(4)}{J_4(4)} = 1" },
    ]
  },
  
  
  // ══════════════════════════
  // CHAPTER 16 — Angle Modulation Part 2
  // ══════════════════════════
  {
    id: "angle_modulation",
    label: "16 · Angle Mod Pt. 2",
    title: "16. Angle Modulation (Part 2)",
    content: [

      // --- SECTION: TOPICS ---
      { type: "heading", text: "15.1  Topics To Be Covered" },
      { type: "list", items: [
          "Types of Angle Modulated Signal",
          "Narrow Band Angle Modulation",
          "Parameters of Narrow band FM and PM",
          "Wide Band Angle Modulation",
          "Properties of Bessel's Function",
          "Parameters of Wideband FM and PM"
        ]
      },
      
      // --- SECTION: EXAM CHEAT SHEET (PART 2) ---
      { type: "heading", text: "15.1.5  Exam Formula Cheat Sheet (NB & WB)" },
      { type: "para", text: "<b>1. Narrowband vs. Wideband Quick Reference</b>" },
      { type: "table",
        headers: ["Parameter", "Narrowband (NBFM)", "Wideband (WBFM)"],
        rows: [
          ["<b>Condition</b>", "\\(\\beta \\ll 1\\) (or \\(< 0.6\\))", "\\(\\beta \\gg 1\\) (or \\(> 0.6\\))"],
          ["<b>Bandwidth</b>", "\\(BW = 2f_m\\)", "\\(BW = 2(\\beta + 1)f_m\\) (Carson's Rule)"],
          ["<b>Total Power</b>", "\\(P_t = P_c\\left(1 + \\frac{\\beta^2}{2}\\right)\\)", "\\(P_t = P_c = \\frac{A_c^2}{2}\\) (Constant)"],
          ["<b>Spectrum</b>", "Carrier + 1 USB + 1 LSB", "Carrier + Infinite Sidebands"]
        ]
      },
      { type: "para", text: "<b>2. The NBFM LSB Phase Trap</b>" },
      { type: "para", text: "Unlike AM/DSB-FC, the Lower Sideband in NBFM is 180° out of phase (negative sign):" },
      { type: "eq", tex: "S_{NBFM}(t) = A_c \\cos(\\omega_c t) + \\frac{A_c \\beta}{2} \\cos(\\omega_c + \\omega_m)t \\mathbf{-} \\frac{A_c \\beta}{2} \\cos(\\omega_c - \\omega_m)t" },
      { type: "para", text: "<b>3. Bessel Function \\(J_n(\\beta)\\) Golden Rules</b>" },
      { type: "list", items: [
          "<b>Symmetry:</b> \\(J_{-n}(\\beta) = (-1)^n J_n(\\beta)\\) <br><i>(Even \\(n\\) = same sign, Odd \\(n\\) = inverted sign)</i>",
          "<b>Power Conservation:</b> \\(\\sum_{n=-\\infty}^{\\infty} J_n^2(\\beta) = 1\\) <br><i>(This is why total WBFM power never exceeds \\(P_c\\))</i>",
          "<b>100% Efficiency (Zero Carrier):</b> Occurs when \\(J_0(\\beta) = 0\\). <br><i>(Eigenvalues: \\(\\beta = 2.4, 5.5, 8.6, 11.8\\))</i>"
        ]
      },
      { type: "para", text: "<b>4. Carson's Rule for Bandwidth</b>" },
      { type: "table",
        headers: ["Signal Type", "Bandwidth Formula"],
        rows: [
          ["Single Tone / Periodic", "\\(BW = 2(\\beta + 1)f_m\\) or \\(2(\\Delta f + f_m)\\)"],
          ["Bandlimited Signal", "\\(BW = 2(\\beta + 1)f_{\\max}\\) or \\(2(\\Delta f + f_{\\max})\\)"]
        ]
      },

      // --- SECTION: TYPES ---
      { type: "heading", text: "15.2  Types of Angle Modulated Signals" },
      { type: "table",
        headers: ["Modulation", "Narrowband", "Wideband"],
        rows: [
          ["<b>Types of F.M.</b>", "Narrowband F.M.", "Wideband F.M."],
          ["<b>Types of P.M.</b>", "Narrowband P.M.", "Wideband P.M."]
        ]
      },

      // --- SECTION: WIDEBAND SPECTRUM ---
      { type: "heading", text: "15.3  Wideband Angle Modulated Signal Spectrum" },
      { type: "para", text: "Unlike conventional AM, the frequency spectrum of a wideband angle modulated signal splits into infinite components:" },
      { type: "list", items: [
          "<b>1 Carrier</b>: The central frequency component.",
          "<b>Multiple S.B. (Sidebands)</b>: Which further divide symmetrically into <b>Multiple USB</b> (Upper Sidebands) and <b>Multiple LSB</b> (Lower Sidebands)."
        ]
      },

      // --- SECTION: SPECTRAL ANALYSIS ---
      { type: "heading", text: "15.4  Spectral Analysis (Single Tone)" },
      { type: "para", text: "Assume Case 1: A single tone sinusoidal message signal \\(m(t)\\) modulating a high-frequency carrier \\(C(t)\\)." },
      { type: "eq", tex: "m(t) = A_m \\cos(2\\pi f_m t)" },
      { type: "eq", tex: "C(t) = A_c \\cos(2\\pi f_c t)" },
      
      { type: "para", text: "<b>Method 1: Frequency Modulation (FM)</b>. The standard mathematical expression for the modulated signal is:" },
      { type: "eq", tex: "S_{FM}(t) = A_c \\cos(2\\pi f_c t + \\beta \\sin(2\\pi f_m t))" },
      
      // --- SECTION: NBFM DERIVATION ---
      { type: "heading", text: "15.5  NBFM Derivation & Small Angle Approximation" },
      { type: "para", text: "Starting with the standard FM equation, we expand the signal using the trigonometric identity \\(\\cos(A+B)\\):" },
      { type: "eq", tex: "S_{FM}(t) = A_c \\cos(2\\pi f_c t) \\cos(\\beta \\sin 2\\pi f_m t) - A_c \\sin(2\\pi f_c t) \\sin(\\beta \\sin 2\\pi f_m t)" },
      { type: "para", text: "<b>Assumption:</b> For Narrowband FM (NBFM), the modulation index \\(\\beta\\) is very small (\\(\\beta \\ll 1\\)). Using small-angle approximations (\\(\\cos \\theta \\approx 1\\) and \\(\\sin \\theta \\approx \\theta\\)), where \\(\\theta = \\beta \\sin 2\\pi f_m t\\):" },
      { type: "eq", tex: "S_{FM}(t) \\approx A_c \\cos(2\\pi f_c t) - A_c \\sin(2\\pi f_c t) [\\beta \\sin 2\\pi f_m t]" },

      // --- SECTION: NBFM EXPANSION ---
      { type: "heading", text: "15.6  NBFM Sideband Expansion" },
      { type: "para", text: "Applying the product-to-sum identity \\(2\\sin A \\sin B = \\cos(A-B) - \\cos(A+B)\\) to the second term:" },
      { type: "eq", tex: "S_{NBFM}(t) = A_c \\cos(2\\pi f_c t) - \\frac{A_c \\beta}{2} [\\cos(2\\pi(f_c - f_m)t) - \\cos(2\\pi(f_c + f_m)t)]" },
      { type: "para", text: "Distributing the negative sign yields the final NBFM equation, revealing the Carrier, Upper Sideband (USB), and Lower Sideband (LSB):" },
      { type: "eq", tex: "S_{NBFM}(t) = \\underbrace{A_c \\cos(2\\pi f_c t)}_{\\text{Carrier}} + \\underbrace{\\frac{A_c \\beta}{2} \\cos(2\\pi(f_c + f_m)t)}_{\\text{USB}} - \\underbrace{\\frac{A_c \\beta}{2} \\cos(2\\pi(f_c - f_m)t)}_{\\text{LSB}}" },

      // --- SECTION: NBFM SPECTRUM ---
      { type: "heading", text: "15.7  NBFM Spectrum & Bandwidth" },
      { type: "para", text: "The frequency spectrum of NBFM looks remarkably similar to conventional AM, but with one critical distinction: <b>the Lower Sideband is phase-reversed (inverted)</b>." },
      { type: "list", items: [
          "<b>Carrier:</b> Impulses at \\(\\pm f_c\\) with magnitude \\(A_c / 2\\).",
          "<b>USB:</b> Impulses at \\(\\pm (f_c + f_m)\\) with magnitude \\(A_c \\beta / 4\\).",
          "<b>LSB:</b> Impulses at \\(\\pm (f_c - f_m)\\) with magnitude <b>\\(-A_c \\beta / 4\\)</b>."
        ]
      },
      { type: "para", text: "Despite the phase inversion on the LSB, the bandwidth remains identical to AM:" },
      { type: "eq", tex: "BW_{NBFM} = 2f_m" },
      
      // --- SECTION: NBFM FREQUENCY PARAMETERS ---
      { type: "heading", text: "15.8  NBFM Frequency Parameters" },
      { type: "para", text: "Given a message signal \\(m(t)\\) with frequency \\(f_m\\) and a carrier signal \\(C(t)\\) with frequency \\(f_c\\), the NBFM signal \\(S_{NBFM}(t)\\) yields the following:" },
      { type: "list", items: [
          "<b>Components Present:</b> \\(f_c\\) and \\(f_c \\pm f_m\\)",
          "<b>Bandwidth (BW):</b> \\(2f_m\\)"
        ]
      },

      // --- SECTION: NBFM STRICT CONDITION ---
      { type: "heading", text: "15.9  Strict Condition for NBFM" },
      { type: "para", text: "For the small-angle approximation to hold, ensuring the phase deviation remains narrow enough to be classified strictly as Narrowband FM:" },
      { type: "eq", tex: "\\beta < 0.6 \\quad \\text{or} \\quad \\beta \\ll 1" },

      // --- SECTION: NBFM POWER CALCULATION ---
      { type: "heading", text: "15.10  Power Calculation" },
      { type: "para", text: "Assuming the message signal power is \\(P_m = \\frac{A_m^2}{2}\\) and unmodulated carrier power is \\(P_c = \\frac{A_c^2}{2}\\). The total power of the NBFM signal is the sum of the carrier and both sidebands:" },
      { type: "eq", tex: "P_t = \\frac{A_c^2}{2} + \\frac{A_c^2 \\beta^2}{8} + \\frac{A_c^2 \\beta^2}{8}" },
      { type: "para", text: "Combining the sideband terms and factoring out the carrier power yields a formula identical in structure to single-tone AM:" },
      { type: "eq", tex: "P_t = \\frac{A_c^2}{2} \\left( 1 + \\frac{\\beta^2}{2} \\right) = P_c \\left( 1 + \\frac{\\beta^2}{2} \\right)" },

      // --- SECTION: DSB-FC VS NBFM ---
      { type: "heading", text: "15.11  Relation Between DSB-FC and NBFM" },
      { type: "para", text: "Comparing the standard equations in terms of angular frequency (\\(\\omega_c\\) and \\(\\omega_m\\)) reveals their structural similarities and one major difference:" },
      { type: "eq", tex: "S_{DSB-FC}(t) = A_c \\cos \\omega_c t + \\frac{A_c \\mu}{2} \\cos(\\omega_c + \\omega_m)t + \\frac{A_c \\mu}{2} \\cos(\\omega_c - \\omega_m)t" },
      { type: "eq", tex: "S_{NBFM}(t) = A_c \\cos \\omega_c t + \\frac{A_c \\beta}{2} \\cos(\\omega_c + \\omega_m)t - \\frac{A_c \\beta}{2} \\cos(\\omega_c - \\omega_m)t" },
      { type: "para", text: "<b>Key Difference:</b> The Lower Sideband (LSB) in NBFM is exactly 180° phase-inverted with respect to the LSB in DSB-FC." },

      // --- SECTION: SIGNAL ALGEBRA ---
      { type: "heading", text: "15.12  Signal Algebra (Let \\(\\mu = \\beta\\))" },
      { type: "para", text: "By setting the modulation indices equal (\\(\\mu = \\beta\\)), we can add or subtract the modulated signals to isolate specific components:" },
      { type: "list", items: [
          "<b>Addition:</b> \\(S_{DSB-FC}(t) + S_{NBFM}(t) \\rightarrow \\text{SSB} + \\text{FC} \\rightarrow \\text{USB} + \\text{FC}\\)",
          "<b>Subtraction:</b> \\(S_{DSB-FC}(t) - S_{NBFM}(t) \\rightarrow \\text{SSB} - \\text{SC} \\rightarrow \\text{LSB} + \\text{SC}\\)"
        ]
      },
      
      // --- SECTION: NB VS WIDEBAND CONCLUSION ---
      { type: "heading", text: "15.13  Conclusion: NB vs. Wideband Angle Modulation" },
      { type: "para", text: "For a single tone angle modulated signal, the modulation index \\(\\beta\\) determines the bandwidth classification." },
      { type: "table",
        headers: ["Modulation Type", "Condition", "Equation Structure"],
        rows: [
          ["Narrowband (NB)", "\\(\\beta \\ll 1\\) or \\(\\beta < 0.6\\)", "Uses standard trigonometric expansion"],
          ["Wideband", "\\(\\beta \\gg 1\\) or \\(\\beta > 0.6\\)", "Requires infinite series summation using Bessel Functions"]
        ]
      },
      { type: "para", text: "When \\(\\beta \\gg 1\\), the Wideband signal expands into an infinite series using Bessel Functions of the \\(n^{th}\\) order, denoted as \\(J_n(\\beta)\\):" },
      { type: "eq", tex: "S_{angle}(t) = \\sum_{n=-\\infty}^{\\infty} A_c J_n(\\beta) \\cos[2\\pi(f_c + n f_m)t]" },

      // --- SECTION: BESSEL FUNCTION PROPERTIES ---
      { type: "heading", text: "15.14  Properties of Bessel's Function" },
      { type: "para", text: "Understanding the properties of \\(J_n(\\beta)\\) is critical for analyzing the power and spectral components of Wideband FM:" },
      { type: "list", items: [
          "<b>Property 1 (Symmetry):</b> \\(J_{-n}(\\beta) = (-1)^n J_n(\\beta)\\). This implies that for even values of \\(n\\), \\(J_{-n}(\\beta) = J_n(\\beta)\\), and for odd values of \\(n\\), \\(J_{-n}(\\beta) = -J_n(\\beta)\\).",
          "<b>Property 1 Consequence:</b> Squaring the function removes the sign, yielding \\(J_{-n}^2(\\beta) = J_n^2(\\beta)\\) for all \\(n\\).",
          "<b>Property 2 (Power Conservation):</b> The sum of squares of all Bessel coefficients equals 1: \\(\\sum_{n=-\\infty}^{\\infty} J_n^2(\\beta) = 1\\).",
          "<b>Property 2 Expansion:</b> This can be expanded as \\(1 = J_0^2(\\beta) + 2\\{J_1^2(\\beta) + J_2^2(\\beta) + J_3^2(\\beta) + \\dots\\}\\).",
          "<b>Property 3 (Zero Crossings):</b> The carrier component drops to zero, \\(J_0(\\beta) = 0\\), at specific eigenvalues: \\(\\beta = 2.4, 5.5, 8.6, 11.8\\).",
          "<b>Property 4 (Decay):</b> As the order \\(n\\) increases, the magnitude of the Bessel function decreases: As \\(n \\uparrow, J_n(\\beta) \\downarrow\\)."
        ]
      },

      // --- SECTION: WBFM SPECTRAL EXPANSION ---
      { type: "heading", text: "15.15  WBFM Spectral Analysis Expansion" },
      { type: "para", text: "Expanding the infinite sum reveals the carrier and the symmetrically paired sidebands (USB and LSB) for each order \\(n\\):" },
      { type: "list", items: [
          "<b>Carrier Component:</b> \\(A_c J_0(\\beta) \\cos(\\omega_c t)\\)",
          "<b>1st Order Sidebands:</b> LSB is \\(A_c J_{-1}(\\beta) \\cos(\\omega_c - \\omega_m)t\\) and USB is \\(A_c J_1(\\beta) \\cos(\\omega_c + \\omega_m)t\\)",
          "<b>2nd Order Sidebands:</b> LSB is \\(A_c J_{-2}(\\beta) \\cos(\\omega_c - 2\\omega_m)t\\) and USB is \\(A_c J_2(\\beta) \\cos(\\omega_c + 2\\omega_m)t\\)",
          "<b>3rd Order Sidebands:</b> LSB is \\(A_c J_{-3}(\\beta) \\cos(\\omega_c - 3\\omega_m)t\\) and USB is \\(A_c J_3(\\beta) \\cos(\\omega_c + 3\\omega_m)t\\)"
        ]
      },
      
      // --- SECTION: WIDEBAND SPECTRUM GRAPH ---
      { type: "heading", text: "15.16  Wideband Spectrum Visual Analysis" },
      { type: "para", text: "Graphing the Wideband Angle Modulated spectrum reveals an infinite number of sidebands spaced by the spectral gap \\(f_m\\):" },
      { type: "list", items: [
          "<b>Carrier:</b> Located at \\(\\pm f_c\\) with amplitude \\(\\frac{A_c J_0(\\beta)}{2}\\).",
          "<b>1st Order LSB Phase Inversion:</b> The first lower sideband at \\(- (f_c - f_m)\\) and \\(f_c - f_m\\) has a negative amplitude \\(\\frac{-A_c J_1(\\beta)}{2}\\).",
          "<b>Spectral Gap:</b> The distance between any two adjacent frequency components is exactly \\(f_m\\)."
        ]
      },

      // --- SECTION: IDEAL BANDWIDTH ---
      { type: "heading", text: "15.17  Parameters & Ideal Bandwidth" },
      { type: "para", text: "For a message signal with frequency \\(f_m\\) and carrier \\(f_c\\), the presence of specific frequency components in the modulated signal \\(S(t)\\) depends entirely on their corresponding Bessel coefficients:" },
      { type: "list", items: [
          "Component \\(f_c\\) exists if \\(J_0(\\beta) \\neq 0\\).",
          "Components \\(f_c \\pm f_m\\) exist if \\(J_1(\\beta) \\neq 0\\).",
          "Components \\(f_c \\pm 2f_m\\) exist if \\(J_2(\\beta) \\neq 0\\)."
        ]
      },
      { type: "para", text: "Because the Bessel expansion continues indefinitely, the <b>Ideal B.W. of wideband angle modulated signal = \\(\\infty\\)</b>." },

      // --- SECTION: SIDEBAND TABLE ---
      { type: "heading", text: "15.18  Sideband Orders vs. Bandwidth" },
      { type: "para", text: "The effective bandwidth expands as higher-order sidebands are included:" },
      { type: "table",
        headers: ["Sidebands upto", "Bandwidth", "Only when"],
        rows: [
          ["I order", "\\(2f_m = 1 \\times 2f_m\\)", "\\(J_1(\\beta) \\neq 0\\)"],
          ["II order", "\\(4f_m = 2 \\times 2f_m\\)", "\\(J_2(\\beta) \\neq 0\\)"],
          ["III order", "\\(6f_m = 3 \\times 2f_m\\)", "\\(J_3(\\beta) \\neq 0\\)"],
          ["...", "...", "..."],
          ["\\((\\beta + 1)\\) order", "\\((\\beta + 1)2f_m\\)", "\\(J_{\\beta+1}(\\beta) \\neq 0\\)"]
        ]
      },

      // --- SECTION: CARSON'S RULE ---
      { type: "heading", text: "15.19  Practical Bandwidth & Carson's Rule" },
      { type: "para", text: "Since ideal bandwidth is infinite, we require a functional boundary. This is defined by <b>Carson's Rule</b>." },
      { type: "para", text: "<em>\"Consider those sidebands which contains 98% of the total power of the time domain angle modulated signal.\"</em>" },
      
      // --- SECTION: CARSON'S RULE BW ---
      { type: "heading", text: "15.20  Bandwidth Calculation via Carson's Rule" },
      { type: "para", text: "Applying Carson's Rule means we consider sidebands up to the \\((\\beta + 1)^{th}\\) order to capture 98% of the total signal power." },
      { type: "eq", tex: "BW = (\\beta + 1) 2f_m" },
      { type: "para", text: "This formula applies universally to both Frequency Modulation (FM) and Phase Modulation (PM):" },
      { type: "list", items: [
          "<b>FM Bandwidth:</b> \\(BW = (\\beta_{FM} + 1) 2f_m\\)",
          "<b>PM Bandwidth:</b> \\(BW = (\\beta_{PM} + 1) 2f_m\\)",
          "<b>Spectral Spacing:</b> The spacing between any adjacent spectral components is always \\(f_m\\)."
        ]
      },

      // --- SECTION: SPECTRAL COMPONENT STRENGTHS ---
      { type: "heading", text: "15.21  Spectral Component Strengths" },
      { type: "para", text: "The amplitude (strength) of each individual frequency component in the spectrum is determined directly by its corresponding Bessel function value." },
      { type: "table",
        headers: ["Freq. Compo.", "Strength"],
        rows: [
          ["\\(f_c\\)", "\\(\\frac{A_c J_0(\\beta)}{2}\\)"],
          ["\\(f_c + f_m\\)", "\\(\\frac{A_c J_1(\\beta)}{2}\\)"],
          ["\\(f_c - f_m\\)", "\\(\\frac{A_c J_{-1}(\\beta)}{2}\\)"],
          ["\\(f_c + 2f_m\\)", "\\(\\frac{A_c J_2(\\beta)}{2}\\)"],
          ["\\(f_c - 2f_m\\)", "\\(\\frac{A_c J_{-2}(\\beta)}{2}\\)"],
          ["\\(\\vdots\\)", "\\(\\vdots\\)"]
        ]
      },

      // --- SECTION: TOTAL EXPANSION ---
      { type: "heading", text: "15.22  Full WBFM Time-Domain Expansion" },
      { type: "para", text: "When \\(\\beta \\gg 1\\), the signal fully expands into the carrier and infinite sidebands:" },
      { type: "eq", tex: "S(t) = \\sum_{n=-\\infty}^{\\infty} A_c J_n(\\beta) \\cos(\\omega_c + n\\omega_m)t" },
      { type: "para", text: "Expanding this mathematical summation yields:" },
      { type: "eq", tex: "\\begin{aligned} S(t) =& A_c J_0(\\beta)\\cos\\omega_c t \\\\ &+ A_c J_1(\\beta)\\cos(\\omega_c + \\omega_m)t + A_c J_{-1}(\\beta)\\cos(\\omega_c - \\omega_m)t \\\\ &+ A_c J_2(\\beta)\\cos(\\omega_c + 2\\omega_m)t + A_c J_{-2}(\\beta)\\cos(\\omega_c - 2\\omega_m)t \\\\ &+ \\dots \\end{aligned}" },

      // --- SECTION: POWER PARAMETERS ---
      { type: "heading", text: "15.23  Power Related Parameters" },
      { type: "para", text: "A massive, critical insight for angle modulation is that <b>total power remains constant and independent of the modulation index (\\(\\beta\\))</b>." },
      { type: "list", items: [
          "Message Power: \\(P_m = \\frac{A_m^2}{2}\\)",
          "Unmodulated Carrier Power: \\(P_c = \\frac{A_c^2}{2}\\)"
        ]
      },
      { type: "para", text: "Because the amplitude \\(A_c\\) of the modulated signal \\(S(t)\\) never changes (only the angle changes), the total angle modulated power is just the power of the carrier:" },
      { type: "eq", tex: "P_{angle} = \\overline{S^2(t)} = \\frac{A_c^2}{2}" },
      { type: "para", text: "We can prove this by summing the individual powers of the infinite sideband components (which rely on the Bessel power conservation property):" },
      { type: "eq", tex: "\\overline{S^2(t)} = \\frac{A_c^2 J_0^2(\\beta)}{2} + \\left[ \\frac{A_c^2 J_1^2(\\beta)}{2} + \\frac{A_c^2 J_{-1}^2(\\beta)}{2} \\right] + \\left[ \\frac{A_c^2 J_2^2(\\beta)}{2} + \\frac{A_c^2 J_{-2}^2(\\beta)}{2} \\right] + \\dots" },
      
      // --- SECTION: POWER CONSERVATION PROOF ---
      { type: "heading", text: "15.24  Power Conservation Proof" },
      { type: "para", text: "Using the properties of Bessel functions, we can mathematically prove that the total power remains constant:" },
      { type: "eq", tex: "\\overline{S^2(t)} = P_c \\left[ J_0^2(\\beta) + 2\\{J_1^2(\\beta) + J_2^2(\\beta) + J_3^2(\\beta) + \\dots\\} \\right]" },
      { type: "para", text: "Since the sum of squares of all Bessel coefficients equals 1 (\\(\\sum_{n=-\\infty}^{\\infty} J_n^2(\\beta) = 1\\)), the entire bracketed term reduces to exactly 1:" },
      { type: "eq", tex: "\\overline{S^2(t)} = P_c(1) = \\frac{A_c^2}{2}" },

      // --- SECTION: IMPORTANT POWER POINTS ---
      { type: "heading", text: "15.25  Important Power Points" },
      { type: "list", items: [
          "<b>1. Power of carrier before modulation:</b> \\(P_c = \\frac{A_c^2}{2}\\)",
          "<b>2. Power of carrier after angle modulation:</b> \\(P_{angle} = P_c \\left[ J_0^2(\\beta) + 2\\{J_1^2(\\beta) + J_2^2(\\beta) + J_3^2(\\beta) + \\dots\\} \\right] = \\frac{A_c^2}{2}\\)",
          "<b>3. Power of carrier component after angle modulation:</b> \\(P_c J_0^2(\\beta)\\)"
        ]
      },

      // --- SECTION: POWER OF NTH ORDER ---
      { type: "heading", text: "15.26  Power of Angle Modulated Signal Upto n-th Order" },
      { type: "table",
        headers: ["Power of Angle Modulated signal upto", "Power"],
        rows: [
          ["I order S.B", "\\(P_c [J_0^2(\\beta) + 2J_1^2(\\beta)]\\)"],
          ["II order S.B", "\\(P_c [J_0^2(\\beta) + 2J_1^2(\\beta) + 2J_2^2(\\beta)]\\)"],
          ["III order S.B", "\\(P_c \\left[ J_0^2(\\beta) + 2\\sum_{n=1}^{3} J_n^2(\\beta) \\right]\\)"]
        ]
      },

      // --- SECTION: SIDEBAND POWER & EFFICIENCY ---
      { type: "heading", text: "15.27  Sideband Power & Efficiency" },
      { type: "para", text: "<b>5. Power of Sidebands (S.B):</b> The power contained exclusively within the sidebands is the total power minus the unmodulated carrier component power." },
      { type: "eq", tex: "P_{SB} = P_c [2J_1^2(\\beta) + 2J_2^2(\\beta) + 2J_3^2(\\beta) + \\dots]" },
      { type: "para", text: "<b>6. Modulation Efficiency (\\(\\eta\\)):</b> The ratio of sideband power to the total angle modulated power." },
      { type: "eq", tex: "\\eta = \\frac{P_{SB}}{P_{angle}} = \\frac{2P_c [J_1^2(\\beta) + J_2^2(\\beta) + J_3^2(\\beta) + \\dots]}{P_c J_0^2(\\beta) + 2P_c (J_1^2(\\beta) + J_2^2(\\beta) + J_3^2(\\beta) + \\dots)}" },
      { type: "para", text: "<b>Condition for 100% Efficiency:</b> Efficiency reaches 100% when the carrier component drops to zero (\\(J_0(\\beta) = 0\\)). This occurs specifically at the Bessel eigenvalues:" },
      { type: "eq", tex: "\\beta = 2.4, 5.5, 8.6, 11.8 \\implies J_0(\\beta) = 0 \\implies \\eta = 100\\%" },
      
      // --- SECTION: INFINITE SIDEBANDS POWER ---
      { type: "heading", text: "16.28  Power with Infinite Sidebands" },
      { type: "para", text: "To reiterate the power theorem: if infinite side-bands are considered, the total power equates exactly to the unmodulated carrier power:" },
      { type: "eq", tex: "P_{angle} = P_c \\sum_{n=-\\infty}^{\\infty} J_n^2(\\beta)" },
      { type: "eq", tex: "P_{angle} = P_c" },

      // --- SECTION: GENERAL BANDWIDTH RULES ---
      { type: "heading", text: "16.29  General Bandwidth Rules for m(t)" },
      { type: "para", text: "The Carson's Rule bandwidth formula adapts based on the specific nature of the message signal \\(m(t)\\):" },
      { type: "table",
        headers: ["Message Signal \\(m(t)\\)", "Bandwidth Formula"],
        rows: [
          ["Sinusoidal single tone", "\\((\\beta + 1)2f_m\\) <br><em>\\(f_m\\): fundamental frequency of \\(m(t)\\)</em>"],
          ["Non-sinusoidal periodic signal", "\\((\\beta + 1)2f_m\\) <br><em>\\(f_m\\): fundamental frequency of \\(m(t)\\)</em>"],
          ["Bandlimited \\(m(t)\\)", "\\((\\beta + 1)2f_{\\max}\\) <br><em>\\(f_{\\max}\\): max. frequency of \\(m(t)\\) or Essential B.W.</em>"]
        ]
      },
      
      
    ]
    
  },
  
  // ══════════════════════════
  // CHAPTER 18 — Random Variables
  // ══════════════════════════
  {
    id: "random_variables",
    label: "18 · Random Variables",
    title: "18. Probability & Random Variables",
    content: [
      
      // --- SECTION: TOPICS ---
      { type: "heading", text: "18.1  Topics To Be Covered" },
      { type: "list", items: [
          "Random Variable",
          "CDF (Cumulative Distribution Function)",
          "PDF (Probability Density Function)"
        ]
      },

      // --- SECTION: EXPERIMENT & OUTCOME ---
      { type: "heading", text: "18.2  Important Terms: Experiment & Outcome" },
      { type: "para", text: "<b>Experiment:</b> \"Any process of observation.\"" },
      { type: "para", text: "<b>Outcome:</b> \"Result of an experiment.\"" },
      { type: "table",
        headers: ["Experiment", "Outcome"],
        rows: [
          ["Tossing of fair / unbiased coin", "H, T"],
          ["Tossing of unfair / biased coin (both sides same)", "H, H or T, T"],
          ["Rolling of fair / unbiased dice", "1, 2, 3, 4, 5, 6"]
        ]
      },

      // --- SECTION: RANDOM VS DETERMINISTIC ---
      { type: "heading", text: "18.3  Random vs. Deterministic Experiments" },
      { type: "para", text: "<b>Random Experiment (R.E.):</b> Those experiments in which outcomes cannot be predicted with certainty. The outcomes are uncertain and have an associated probability strictly between 0 and 1." },
      { type: "eq", tex: "0 < P(E) < 1 \\implies \\text{Random Experiment}" },
      { type: "para", text: "<b>Deterministic Experiment:</b> Those experiments where the outcome is absolutely certain or entirely impossible." },
      { type: "eq", tex: "P(E) = 1 \\quad \\text{or} \\quad P(E) = 0 \\implies \\text{Deterministic Experiment}" },
      { type: "table",
        headers: ["Experiment", "Outcome", "Nature of Experiment"],
        rows: [
          ["Tossing of fair coin", "H, T", "Random Experiment (R.E.)"],
          ["Tossing of unfair coin (both sides H)", "H, H", "Not R.E. (Deterministic)"],
          ["Rolling of fair dice", "1, 2, 3, 4, 5, 6", "Random Experiment (R.E.)"]
        ]
      },

      // --- SECTION: NOTATION NOTE ---
      { type: "heading", text: "18.4  Mathematical Notation Note" },
      { type: "para", text: "In probability, it is crucial to distinguish between different types of brackets when defining sets and intervals:" },
      { type: "list", items: [
          "\\(x \\in (0, 1)\\) means \\(0 < x < 1\\) <b>(Open interval)</b>. It excludes the boundaries.",
          "\\(x \\in [0, 1]\\) means \\(0 \\le x \\le 1\\) <b>(Closed interval)</b>. It includes the boundaries.",
          "\\(x \\in \\{0, 1\\}\\) means \\(x = 0\\) or \\(x = 1\\) <b>(Discrete set)</b>. It represents specific distinct values only."
        ]
      },

      // --- SECTION: SAMPLE SPACE ---
      { type: "heading", text: "18.5  Sample Space" },
      { type: "para", text: "<b>Sample Space (S):</b> \"Set of all possible outcomes\" of a random experiment." },
      { type: "table",
        headers: ["Random Experiment", "Outcome", "Sample Space (S)"],
        rows: [
          ["Tossing of coin", "H, T", "\\(S = \\{H, T\\}\\)"],
          ["Rolling of dice", "1, 2, 3, 4, 5, 6", "\\(S = \\{1, 2, 3, 4, 5, 6\\}\\)"]
        ]
      },
      
      // --- SECTION: SAMPLE SPACE EXAMPLES ---
      { type: "heading", text: "18.6  Sample Space Example (3 Coins)" },
      { type: "para", text: "<b>Question:</b> A coin is tossed 3 times, or 3 coins are tossed once. Write the sample space." },
      { type: "eq", tex: "S = \\{TTT, TTH, THT, HTT, HHT, HTH, THH, HHH\\}" },

      // --- SECTION: SAMPLE POINT ---
      { type: "heading", text: "18.7  Sample Point (\\(\\lambda\\))" },
      { type: "para", text: "A <b>Sample Point</b> (denoted by \\(\\lambda\\)) is defined as:" },
      { type: "list", items: [
          "Each individual element of a sample space.",
          "An individual outcome of a random experiment."
        ]
      },

      // --- SECTION: REPRESENTATION OF SAMPLE SPACE ---
      { type: "heading", text: "18.8  General Representation of Sample Space" },
      { type: "para", text: "A sample space can be represented conceptually in two primary ways:" },
      { type: "list", items: [
          "<b>1. Set Representation:</b> Expressed mathematically as a set of sample points.<br>\\(S = \\{\\lambda_1, \\lambda_2, \\lambda_3, \\dots, \\lambda_n\\}\\) or compactly as \\(S = \\{\\lambda_i\\}_{i=1}^{n}\\)",
          "<b>2. Venn Diagram:</b> A visual bounding region representing the entire Sample Space (S), containing discrete internal nodes representing each individual \\(\\lambda\\)."
        ]
      },

      // --- SECTION: EVENT ---
      { type: "heading", text: "18.9  Event (E)" },
      { type: "para", text: "An <b>Event</b> is strictly defined as a subset of the sample space." },
      { type: "para", text: "<b>Example:</b> If 2 coins are tossed simultaneously, the sample space is \\(S = \\{TT, TH, HT, HH\\}\\). Possible events drawn from this space include:" },
      { type: "list", items: [
          "\\(E_1 = \\{TT\\} \\rightarrow\\) A single Sample Point.",
          "\\(E_2 = \\{TT, TH\\}\\)",
          "\\(E_3 = \\{\\phi\\} \\rightarrow\\) <b>Impossible event</b> (Null set).",
          "\\(E_4 = \\{TT, TH, HT, HH\\} \\rightarrow\\) <b>Certain event</b> (The entire sample space \\(S\\))."
        ]
      },

      // --- SECTION: EVENT PROPERTIES ---
      { type: "heading", text: "18.10  Important Notes on Events" },
      { type: "list", items: [
          "Every sample point is an event, but the converse is not necessarily true (an event can consist of multiple sample points).",
          "If a sample space has <b>\\(n\\) sample points</b>, you can form a total of <b>\\(2^n\\) possible events</b>."
        ]
      },
      
      // --- SECTION: EVENT REPRESENTATION ---
      { type: "heading", text: "18.11  General Representation of an Event" },
      { type: "para", text: "Just like the sample space, an event can be represented visually via a Venn Diagram (as a closed bubble inside the sample space \\(S\\)) or mathematically as a subset of sample points:" },
      { type: "eq", tex: "E = \\{\\lambda_2, \\lambda_3\\} \\quad \\text{(where } E \\subset S \\text{)}" },

      // --- SECTION: MUTUALLY EXCLUSIVE ---
      { type: "heading", text: "18.12  Types of Events: Mutually Exclusive (Disjoint)" },
      { type: "para", text: "Two events \\(E_1\\) and \\(E_2\\) are said to be mutually exclusive if they <b>cannot occur simultaneously</b>." },
      { type: "para", text: "<b>Mathematical Condition:</b> Their intersection must be a null set." },
      { type: "eq", tex: "E_1 \\cap E_2 = \\phi" },
      { type: "para", text: "<b>Example:</b> Drawing a single card from a standard deck." },
      { type: "list", items: [
          "\\(E_1\\): The card is a King.",
          "\\(E_2\\): The card is a Queen.",
          "A single drawn card cannot be both a King and a Queen at the same time. Therefore, \\(E_1 \\cap E_2 = \\phi\\)."
        ]
      },

      // --- SECTION: EQUALLY LIKELY ---
      { type: "heading", text: "18.13  Types of Events: Equally Likely" },
      { type: "para", text: "Two events \\(E_1\\) and \\(E_2\\) are said to be equally likely if they have the exact <b>same probability of occurrence</b>." },
      { type: "para", text: "<b>Mathematical Condition:</b>" },
      { type: "eq", tex: "P(E_1) = P(E_2)" },
      { type: "para", text: "<b>Example:</b> Tossing a fair (unbiased) coin." },
      { type: "list", items: [
          "\\(E_1\\): Getting a Head \\(\\implies P(E_1) = 1/2\\).",
          "\\(E_2\\): Getting a Tail \\(\\implies P(E_2) = 1/2\\).",
          "Since \\(P(E_1) = P(E_2)\\), the events are equally likely."
        ]
      },

      // --- SECTION: INDEPENDENT EVENTS ---
      { type: "heading", text: "18.14  Types of Events: Independent" },
      { type: "para", text: "Two events \\(E_1\\) and \\(E_2\\) are independent if the occurrence (or non-occurrence) of one event <b>does not affect</b> the probability of occurrence of the other." },
      { type: "para", text: "<b>Mathematical Condition:</b> The probability of their intersection equals the product of their individual probabilities." },
      { type: "eq", tex: "P(E_1 \\cap E_2) = P(E_1) \\cdot P(E_2)" },
      { type: "para", text: "<b>Proof Example:</b> Two coins are tossed simultaneously. The sample space is \\(S = \\{TT, TH, HT, HH\\}\\)." },
      { type: "list", items: [
          "\\(E_1\\): Getting a Head on the 1st coin = \\(\\{HT, HH\\}\\) \\(\\implies P(E_1) = 2/4 = 1/2\\).",
          "\\(E_2\\): Getting a Head on the 2nd coin = \\(\\{TH, HH\\}\\) \\(\\implies P(E_2) = 2/4 = 1/2\\).",
          "Intersection \\(E_1 \\cap E_2\\): Head on both coins = \\(\\{HH\\}\\) \\(\\implies P(E_1 \\cap E_2) = 1/4\\)."
        ]
      },
      { type: "para", text: "Checking the strict condition:" },
      { type: "eq", tex: "\\frac{1}{4} = \\frac{1}{2} \\times \\frac{1}{2} \\implies \\frac{1}{4} = \\frac{1}{4} \\quad \\text{(Condition Satisfied)}" },

      // --- SECTION: EXHAUSTIVE EVENTS ---
      { type: "heading", text: "18.15  Types of Events: Exhaustive" },
      { type: "para", text: "Events are considered exhaustive if their union constitutes the <b>entire sample space</b>. In a set of exhaustive events, at least one of the events is guaranteed to happen." },
      { type: "para", text: "<b>Mathematical Condition:</b>" },
      { type: "eq", tex: "E_1 \\cup E_2 = S" },
      
      // --- SECTION: AXIOMS OF PROBABILITY ---
      { type: "heading", text: "18.16  Axioms of Probability" },
      { type: "para", text: "All probability calculations are built upon three fundamental axioms:" },
      { type: "list", items: [
          "<b>1. Certainty:</b> The probability of the entire sample space (a certain event) is exactly 1. <br>\\(P(S) = 1\\)",
          "<b>2. Range:</b> The probability of any event \\(E\\) must lie between 0 and 1 (inclusive). <br>\\(0 \\le P(E) \\le 1\\)",
          "<b>3. Mutually Exclusive Addition:</b> If two events \\(A\\) and \\(B\\) are mutually exclusive (\\(A \\cap B = \\phi\\)), the probability of their union is the sum of their individual probabilities. <br>\\(P(A \\cup B) = P(A) + P(B)\\)"
        ]
      },
      { type: "para", text: "<b>General Addition Rule:</b> If \\(A\\) and \\(B\\) are <i>not</i> mutually exclusive, you must subtract the intersection to avoid double-counting:" },
      { type: "eq", tex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)" },

      // --- SECTION: RANDOM VARIABLE DEFINITION ---
      { type: "heading", text: "18.17  Concept of a Random Variable (X)" },
      { type: "para", text: "A <b>Random Variable</b> is neither random nor a standard variable. It is strictly a <b>rule or mapping</b>." },
      { type: "list", items: [
          "It assigns a specific real number to every outcome (sample point \\(\\lambda\\)) of a random experiment.",
          "It bridges the Sample Space \\(S\\) to the Real Number Line \\((-\\infty, \\infty)\\).",
          "<b>Notation:</b> Random variables are denoted by capital letters (e.g., \\(X, Y, Z\\)), while the specific real numbers they take are denoted by lowercase letters (e.g., \\(x, y, z\\))."
        ]
      },

      // --- SECTION: RANDOM VARIABLE EXAMPLE ---
      { type: "heading", text: "18.18  Mapping Example: 2 Coin Toss" },
      { type: "para", text: "<b>Experiment:</b> Tossing 2 coins. Let the Random Variable \\(X\\) be defined as the <b>\"number of heads\"</b>." },
      { type: "para", text: "First, define the sample space: \\(S = \\{TT, TH, HT, HH\\}\\)" },
      { type: "para", text: "Now apply the mapping rule \\(X\\) to each sample point:" },
      { type: "list", items: [
          "\\(X(TT) = 0\\)",
          "\\(X(TH) = 1\\)",
          "\\(X(HT) = 1\\)",
          "\\(X(HH) = 2\\)"
        ]
      },
      { type: "para", text: "The resulting set of values \\(\\{0, 1, 2\\}\\) represents the range of the random variable \\(X\\)." },

      // --- SECTION: TYPES OF RANDOM VARIABLES ---
      { type: "heading", text: "18.19  Types of Random Variables" },
      { type: "para", text: "Depending on the mapped values on the real line, Random Variables are classified into three types:" },
      { type: "table",
        headers: ["Type", "Definition", "Example"],
        rows: [
          ["<b>Discrete (D.R.V.)</b>", "Takes only distinct, countable values.", "\\(X \\in \\{0, 1, 2\\}\\)"],
          ["<b>Continuous (C.R.V.)</b>", "Takes an infinite, uncountable number of values within a continuous range.", "\\(X \\in [a, b]\\)"],
          ["<b>Mixed (M.R.V.)</b>", "Exhibits properties of both discrete jumps and continuous ranges.", "A clipped continuous voltage signal."]
        ]
      },

      // --- SECTION: CDF INTRO ---
      { type: "heading", text: "18.20  Cumulative Distribution Function (CDF) Intro" },
      { type: "para", text: "The most fundamental function to describe a random variable is the CDF. Denoted as \\(F_X(x)\\), it defines the probability that the random variable \\(X\\) takes a value less than or equal to a specific real number \\(x\\)." },
      { type: "eq", tex: "F_X(x) = P(X \\le x) \\quad \\text{for } -\\infty < x < \\infty" },
      
      // --- SECTION: PROPERTIES OF CDF ---
      { type: "heading", text: "18.21  Properties of CDF" },
      { type: "para", text: "The Cumulative Distribution Function \\(F_X(x)\\) has several strict mathematical properties:" },
      { type: "list", items: [
          "<b>1. Lower Bound:</b> \\(F_X(-\\infty) = P(X \\le -\\infty) = 0\\)",
          "<b>2. Upper Bound:</b> \\(F_X(\\infty) = P(X \\le \\infty) = 1\\)",
          "<b>3. Range:</b> The value of the CDF always lies between 0 and 1. <br>\\(0 \\le F_X(x) \\le 1\\)",
          "<b>4. Non-Decreasing Function:</b> The CDF never goes down. If \\(x_1 < x_2\\), then \\(F_X(x_1) \\le F_X(x_2)\\)."
        ]
      },

      // --- SECTION: PROBABILITY FROM CDF ---
      { type: "heading", text: "18.22  Calculating Probability from CDF" },
      { type: "para", text: "You can find the probability of the random variable falling within a specific interval by taking the difference of the CDF values at the boundaries." },
      { type: "para", text: "<b>Important:</b> Pay close attention to the inequality signs. The upper bound is inclusive, while the lower bound is exclusive:" },
      { type: "eq", tex: "P(x_1 < X \\le x_2) = P(X \\le x_2) - P(X \\le x_1)" },
      { type: "eq", tex: "P(x_1 < X \\le x_2) = F_X(x_2) - F_X(x_1)" },

      // --- SECTION: DISCRETE RV & PMF ---
      { type: "heading", text: "18.23  Discrete Random Variable & PMF" },
      { type: "para", text: "For a <b>Discrete Random Variable (D.R.V.)</b>, the variable takes on specific, distinct values (e.g., \\(x_1, x_2, x_3\\))." },
      { type: "para", text: "We describe its probability distribution using the <b>Probability Mass Function (PMF)</b>, denoted as \\(P_X(x_i)\\):" },
      { type: "eq", tex: "P_X(x_i) = P(X = x_i)" },
      { type: "para", text: "<b>Properties of PMF:</b>" },
      { type: "list", items: [
          "1. \\(0 \\le P_X(x_i) \\le 1\\) (Individual probabilities must be between 0 and 1)",
          "2. \\(\\sum P_X(x_i) = 1\\) (The sum of all probabilities must exactly equal 1)"
        ]
      },

      // --- SECTION: CDF OF DRV ---
      { type: "heading", text: "18.24  CDF of a Discrete Random Variable" },
      { type: "para", text: "To find the CDF of a discrete random variable, we accumulate (sum) the probabilities of all discrete points up to \\(x\\):" },
      { type: "eq", tex: "F_X(x) = \\sum_{x_i \\le x} P_X(x_i) = \\sum_{x_i \\le x} P(X = x_i)" },
      { type: "para", text: "<em>Graphical Note:</em> The plot of a CDF for a Discrete Random Variable always forms a <b>stair-case (or step) waveform</b>, where the height of each jump corresponds to the probability mass at that specific point." },

      // --- SECTION: PROBLEM SOLVING PMF/CDF ---
      { type: "heading", text: "18.25  Example: PMF & CDF of 3 Coin Tosses" },
      { type: "para", text: "<b>Question:</b> A coin is tossed 3 times. Let the Random Variable \\(X\\) be the number of heads. Find the PMF and CDF, and verify the PMF properties." },
      { type: "para", text: "<b>Step 1: Define Sample Space and Mapping</b>" },
      { type: "para", text: "Sample Space \\(S\\) has 8 outcomes: \\(\\{TTT, TTH, THT, HTT, HHT, HTH, THH, HHH\\}\\)" },
      { type: "para", text: "The random variable \\(X\\) (number of heads) can take the values: \\(x \\in \\{0, 1, 2, 3\\}\\)." },
      { type: "para", text: "<b>Step 2: Calculate PMF \\(P(X=x)\\)</b>" },
      { type: "table",
        headers: ["Value of \\(X\\) (\\(x\\))", "Outcomes", "Probability \\(P(X=x)\\)"],
        rows: [
          ["\\(X = 0\\)", "TTT (1 outcome)", "\\(1/8\\)"],
          ["\\(X = 1\\)", "TTH, THT, HTT (3 outcomes)", "\\(3/8\\)"],
          ["\\(X = 2\\)", "HHT, HTH, THH (3 outcomes)", "\\(3/8\\)"],
          ["\\(X = 3\\)", "HHH (1 outcome)", "\\(1/8\\)"]
        ]
      },
      { type: "para", text: "<b>Verification:</b> \\(\\sum P(x) = \\frac{1}{8} + \\frac{3}{8} + \\frac{3}{8} + \\frac{1}{8} = \\frac{8}{8} = 1\\) (Verified!)" },
      { type: "para", text: "<b>Step 3: Calculate CDF \\(F_X(x)\\)</b>" },
      { type: "para", text: "Accumulate the probabilities step-by-step:" },
      { type: "list", items: [
          "\\(F_X(0) = P(X \\le 0) = P(X=0) = 1/8\\)",
          "\\(F_X(1) = P(X \\le 1) = P(X=0) + P(X=1) = 1/8 + 3/8 = 4/8 = 1/2\\)",
          "\\(F_X(2) = P(X \\le 2) = P(X=0) + P(X=1) + P(X=2) = 1/8 + 3/8 + 3/8 = 7/8\\)",
          "\\(F_X(3) = P(X \\le 3) = P(X=0) + P(X=1) + P(X=2) + P(X=3) = 7/8 + 1/8 = 1\\)"
        ]
      },
      
      // --- SECTION: 2 COIN TOSS PROBABILITIES ---
      { type: "heading", text: "18.30 Extended Example: 2 Coin Toss Probabilities" },
      { type: "para", text: "Consider the random experiment of tossing 2 coins simultaneously." },
      { type: "para", text: "The sample space is \\(S = \\{TT, TH, HT, HH\\}\\)." },
      { type: "para", text: "Let the random variable \\(X\\) represent the number of HEADs, taking values \\(X = \\{0, 1, 2\\}\\)." },
      { type: "list", items: [
          "The event \\(\\{X = 1\\}\\) corresponds to the outcomes \\(\\{TH, HT\\}\\).",
          "The probability is calculated as \\(P\\{X = 1\\} = \\frac{2}{4} = \\frac{1}{2}\\).",
          "Alternatively, using independent events: \\(P\\{X = 1\\} = (\\frac{1}{2} \\times \\frac{1}{2}) + (\\frac{1}{2} \\times \\frac{1}{2}) = \\frac{1}{2}\\).",
          "The event \\(\\{X < 1.5\\}\\) corresponds to outcomes \\(\\{TT, TH, HT\\}\\), yielding \\(P\\{X < 1.5\\} = \\frac{3}{4}\\).",
          "The event \\(\\{|X| < 2\\}\\) translates to \\(\\{-2 < X < 2\\}\\), encompassing outcomes \\(\\{TT, HT, TH\\}\\).",
          "Therefore, \\(P\\{|X| < 2\\} = \\frac{3}{4}\\)."
        ]
      },

      // --- SECTION: LIMITING PROBABILITIES ---
      { type: "heading", text: "18.31 Limiting Probabilities" },
      { type: "para", text: "The fundamental bounds of probability as a random variable approaches infinity are defined as follows:" },
      { type: "list", items: [
          "\\(P(X < \\infty) = 1\\) (This covers the entire possible sample space).",
          "\\(P(X < -\\infty) = 0\\) (It is impossible to be less than negative infinity).",
          "\\(P(X > \\infty) = 0\\) (It is impossible to exceed positive infinity).",
          "\\(P(X) + P(\\bar{X}) = 1\\) (The sum of an event and its complement is always 1)."
        ]
      },

      // --- SECTION: FORMAL CDF DEFINITION ---
      { type: "heading", text: "18.32 Formal Definition & Symbolism of CDF" },
      { type: "para", text: "For a given Random Variable \\(X\\), the Cumulative Distribution Function (CDF) represents the probability that the random variable takes a value less than or equal to a specific dummy variable." },
      { type: "list", items: [
          "The standard symbol for CDF is \\(F_X(x)\\).",
          "In this notation, \\(X\\) is the Random Variable, while the lowercase letter (e.g., \\(x\\), \\(z\\), or \\(a\\)) serves as the dummy variable representing the values taken by \\(X\\).",
          "Expressed mathematically: \\(F_X(x) = P\\{X \\le x\\} = 1 - P\\{X > x\\}\\).",
          "This holds true regardless of the dummy variable used, such as \\(F_X(z) = P\\{X \\le z\\} = 1 - P\\{X > z\\}\\) or \\(F_X(a) = P\\{X \\le a\\} = 1 - P\\{X > a\\}\\)."
        ]
      },

      // --- SECTION: PROPERTIES OF CDF REVISITED ---
      { type: "heading", text: "18.33 Comprehensive Properties of CDF" },
      { type: "list", items: [
          "The CDF is always a non-negative quantity.",
          "It is strictly bounded: \\(0 \\le F_X(x) \\le 1\\), where the lower bound is 0 and the upper bound is 1.",
          "At the extreme lower limit: \\(F_X(-\\infty) = P(X \\le -\\infty) = 0\\).",
          "At the extreme upper limit: \\(F_X(\\infty) = P(X \\le \\infty) = 1\\).",
          "Combining these extremes: \\(F_X(\\infty) + F_X(-\\infty) = 1 + 0 = 1\\).",
          "The CDF is monotonically 'NON-DECREASING'.",
          "A non-decreasing function means it is either increasing or constant, but never falls.",
          "Mathematically, the slope of the CDF is always positive or zero: \\(\\frac{dF_X(x)}{dx} \\ge 0\\).",
          "Consequently, if \\(x_2 > x_1\\), then it must be true that \\(F_X(x_2) \\ge F_X(x_1)\\)."
        ]
      },

      // --- SECTION: VISUALIZING THE CDF ---
      { type: "heading", text: "18.34 Visualizing the CDF (Graphs)" },
      { type: "para", text: "Because the CDF is non-decreasing and bounded between 0 and 1, its graphical representation takes specific shapes depending on the type of random variable." },
      { type: "list", items: [
          "For a Continuous Random Variable, the CDF appears as a smooth, continuous curve that either increases or remains constant.",
          "In regions where the continuous CDF is strictly increasing, \\(x_2 > x_1 \\implies F_X(x_2) > F_X(x_1)\\).",
          "For a Discrete Random Variable, the CDF takes the shape of a discrete 'Staircase'.",
          "In the flat, constant regions of the staircase, moving from \\(x_1\\) to \\(x_2\\) yields no increase: \\(x_2 > x_1 \\implies F_X(x_2) = F_X(x_1)\\)."
        ]
      },
      
      // Interactive CDF Graph Simulator
      { type: "canvas_sim", simId: "cdf_graph_sim", height: 250, controlLabel: "Hover to inspect values:", min: 0, max: 1, step: 1, defaultVal: 0 },
      
      // --- SECTION: RIGHT CONTINUITY ---
      { type: "heading", text: "18.35 Right Continuity of CDF" },
      { type: "para", text: "A fundamental property of the Cumulative Distribution Function is that its graph is always \"Amplitude Continuous\" from the right. Let \\(x = a\\) be the point under consideration." },
      { type: "eq", tex: "\\lim_{x \\to a} F_X(x) = \\lim_{x \\to a^+} F_X(x) \\implies F_X(a) = F_X(a^+)" },
      { type: "para", text: "This leads to two distinct cases when analyzing a specific point:" },
      { type: "list", items: [
          "<b>Case 1 (Continuous):</b> If \\(F_X(x)\\) is continuous at \\(x = a\\), the left limit, right limit, and exact value are all equal: \\(F_X(a^+) = F_X(a) = F_X(a^-)\\).",
          "<b>Case 2 (Discontinuous):</b> If \\(F_X(x)\\) is discontinuous at \\(x = a\\), the exact value tracks the right-hand limit, but it does not equal the left-hand limit: \\(F_X(a^+) = F_X(a) \\neq F_X(a^-)\\)."
      ]},

      // --- SECTION: EXAMPLE CONTINUITY ---
      { type: "heading", text: "18.36 Example: Evaluating CDF Continuity" },
      { type: "para", text: "Consider a mixed CDF graph with a jump at \\(x=1\\) and continuous segments elsewhere. We can evaluate specific points using the right-continuity rule:" },
      { type: "list", items: [
          "At \\(x=2\\) (Continuous point): \\(F_X(2) = F_X(2^+) = 0.5\\).",
          "At \\(x=1\\) (Discontinuous jump): \\(F_X(1) = F_X(1^+) = 0.5\\). Notice that the value takes the higher right-side limit, not the lower left-side approach of 1/4.",
          "At \\(x=3\\) (Corner point): \\(F_X(3) = F_X(3^+) = 1\\)."
      ]},

      // --- SECTION: VALIDITY OF CDF ---
      { type: "heading", text: "18.37 Validity of a CDF" },
      { type: "para", text: "For any function to be considered a valid Cumulative Distribution Function, it must strictly satisfy the intersection of three specific mathematical conditions (\\(1 \\cap 2 \\cap 3\\)):" },
      { type: "list", items: [
          "<b>Condition 1:</b> \\(0 \\le F_X(x) \\le 1\\).",
          "<b>Condition 2:</b> \\(F_X(-\\infty) = 0\\) and \\(F_X(\\infty) = 1\\).",
          "<b>Condition 3:</b> The graph of the CDF must be non-decreasing."
      ]},
      { type: "para", text: "<b>Graphical Verification Examples:</b>" },
      { type: "list", items: [
          "<b>Invalid Example 1:</b> A graph that starts at a positive constant value on the left violates Condition 2 because \\(F_X(-\\infty) \\neq 0\\).",
          "<b>Invalid Example 2:</b> A graph that loops back or has a segment with a negative slope (going downwards) violates Condition 3 (non-decreasing).",
          "<b>Valid Example:</b> A mixed staircase and ramp graph that starts at 0, never decreases, and plateaus at 1 is perfectly valid."
      ]},

      // --- SECTION: INTERVAL PROBABILITIES ---
      { type: "heading", text: "18.38 Probabilities over Intervals" },
      { type: "para", text: "When calculating the probability that a random variable falls within an interval from \\(a\\) to \\(b\\), the inclusion or exclusion of the boundary points depends strictly on the left and right limits of the CDF:" },
      { type: "list", items: [
          "\\(P(a < X \\le b) = F_X(b^+) - F_X(a^+)\\)",
          "\\(P(a < X < b) = F_X(b^-) - F_X(a^+)\\)",
          "\\(P(a \\le X < b) = F_X(b^-) - F_X(a^-)\\)",
          "\\(P(a \\le X \\le b) = F_X(b^+) - F_X(a^-)\\)"
      ]},

      // --- SECTION: SINGLE VALUE PROBABILITIES ---
      { type: "heading", text: "18.39 Probability at a Single Value (Point Probability)" },
      { type: "para", text: "To find the probability that a random variable takes exactly a single value \\(X = a\\), we evaluate the difference between the CDF up to and including \\(a\\), and the CDF approaching \\(a\\) from the left:" },
      { type: "eq", tex: "P(X=a) = P(X \\le a) - P(X \\le a^-)" },
      { type: "eq", tex: "P(X=a) = F_X(a) - F_X(a^-) = F_X(a^+) - F_X(a^-)" },
      { type: "para", text: "This yields two absolute rules depending on the continuity of the CDF at that point:" },
      { type: "list", items: [
          "<b>Case 1 (Continuous):</b> If \\(F_X(x)\\) is continuous at \\(x = a\\), there is no jump. Thus, \\(P\\{X=a\\} = F_X(a^+) - F_X(a^-) = 0\\).",
          "<b>Case 2 (Discontinuous):</b> If \\(F_X(x)\\) has a jump-type discontinuity at \\(x = a\\), the exact point probability equals the height of the jump: \\(P\\{X=a\\} = F_X(a^+) - F_X(a^-) = \\text{jump size}\\)."
      ]},

      // --- SECTION: INTERACTIVE SIMULATOR ---
      { type: "heading", text: "18.40 Interactive CDF Validity & Continuity Analyzer" },
      { type: "para", text: "Use the dropdown to explore valid and invalid CDF graphs. Notice how discontinuities (jumps) represent point probabilities, while invalid graphs violate one of the three core CDF conditions." },
      { type: "canvas_sim_select", simId: "cdf_validity_sim", height: 260, controlLabel: "Select Graph Type:",
        options: [
          { value: "mixed", text: "Valid Mixed CDF (Ramp + Jump)" },
          { value: "invalid1", text: "Invalid: F(-∞) ≠ 0" },
          { value: "invalid2", text: "Invalid: Decreasing Segment" }
        ]
      }
      
    ]
  },
  
  
  // ══════════════════════════
  // CHAPTER 19 — PDF Properties
  // ══════════════════════════
  {
    id: "rv_pdf",
    label: "19 · RV PDF",
    title: "19. PDF Properties and Validity",
    content: [
      // --- SECTION: MIXED CDF PROBLEM ---
      { type: "heading", text: "18.41 Comprehensive Example: Mixed CDF Probabilities" },
      { type: "para", text: "Consider a mixed Cumulative Distribution Function (CDF) graph with both continuous ramps and discrete jumps. By analyzing the left-hand limits (\\(x^-\\)), right-hand limits (\\(x^+\\)), and exact values, we can determine specific probabilities:" },
      { type: "list", items: [
          "<b>1. Validity:</b> The graph is a VALID CDF because it starts at 0, ends at 1, and is strictly non-decreasing.",
          "<b>2. Point Probability \\(P\\{X = 1\\}\\):</b> Evaluated by the jump size at \\(x=1\\). The jump goes from \\(1/8\\) to \\(1/4\\), so \\(P\\{X=1\\} = 1/4 - 1/8 = 1/8\\).",
          "<b>3. Point Probability \\(P\\{X = 2\\}\\):</b> Evaluated by the jump size at \\(x=2\\). The jump goes from \\(1/2\\) to \\(1\\), so \\(P\\{X=2\\} = 1 - 0.5 = 0.5\\).",
          "<b>4. Point Probability \\(P\\{X = 1.5\\}\\):</b> The graph is continuous at \\(x=1.5\\) with no jump, therefore \\(P\\{X=1.5\\} = 0\\).",
          "<b>5. Interval \\(P\\{1 < X < 2\\}\\):</b> Uses open boundaries. \\(F_X(2^-) - F_X(1^+) = 1/2 - 1/4 = 1/4\\).",
          "<b>6. Interval \\(P\\{1 \\le X < 2\\}\\):</b> Includes the lower jump. \\(F_X(2^-) - F_X(1^-) = 1/2 - 1/8 = 3/8\\).",
          "<b>7. Interval \\(P\\{1 \\le X \\le 2\\}\\):</b> Includes both jumps. \\(F_X(2^+) - F_X(1^-) = 1 - 1/8 = 7/8\\).",
          "<b>8. Interval \\(P\\{1 < X \\le 2\\}\\):</b> Includes only the upper jump. \\(F_X(2^+) - F_X(1^+) = 1 - 1/4 = 3/4\\)."
      ]},
            // Interactive Mixed CDF Simulator
      { type: "canvas_sim_select", simId: "mixed_cdf_sim", height: 280, controlLabel: "Select Probability Calculation:",
        options: [
          { value: "p_x1", text: "2. Point Prob: P{X = 1}" },
          { value: "p_x2", text: "3. Point Prob: P{X = 2}" },
          { value: "p_open", text: "5. Interval: P{1 < X < 2}" },
          { value: "p_closed", text: "7. Interval: P{1 ≤ X ≤ 2}" }
        ]
      },

      // --- SECTION: PDF DEFINITION ---
      { type: "heading", text: "18.42 Probability Density Function (PDF) Definition" },
      { type: "para", text: "For a continuous random variable \\(X\\), the Probability Density Function (PDF) is denoted by the symbol \\(f_X(x)\\), where \\(x\\) represents the values taken by \\(X\\). A dummy variable like \\(m\\) can also be used, written as \\(f_X(m)\\)." },
      { type: "para", text: "The PDF is defined mathematically as the exact derivative of the Cumulative Distribution Function (CDF):" },
      { type: "eq", tex: "f_X(x) = \\frac{dF_X(x)}{dx}" },
      { type: "para", text: "Conversely, the CDF is the running integration of the PDF from negative infinity up to the point \\(x\\):" },
      { type: "eq", tex: "F_X(x) = \\int_{-\\infty}^{x} f_X(x) dx" },
      { type: "para", text: "Graphically, the value of the CDF at any point \\(x\\) is equal to the shaded area under the PDF curve from \\(-\\infty\\) up to that point \\(x\\)." },

      // --- SECTION: PDF PROPERTIES & VALIDITY ---
      { type: "heading", text: "18.43 Properties and Validity of the PDF" },
      { type: "para", text: "Because the CDF is non-decreasing in nature (meaning it either increases or remains constant), its derivative must always be positive or zero. This leads to the fundamental rules for a valid PDF:" },
      { type: "list", items: [
          "<b>1. Non-Negative:</b> The PDF is always non-negative: \\(f_X(x) \\ge 0\\).",
          "<b>Graph Consequence:</b> The entire graph of the PDF must exist on or above the x-axis. Its lower bound is 0, but unlike the CDF, the PDF has no strict upper bound.",
          "<b>2. Total Area:</b> The mathematical integration of the PDF over all space must equal 1: \\(\\int_{-\\infty}^{\\infty} f_X(x) dx = 1\\).",
          "<b>Note on Slope:</b> While the CDF can never decrease, the graph of the PDF \\(f_X(x)\\) itself can be increasing, decreasing, or constant."
      ]},

      // --- SECTION: PDF SYMMETRY ---
      { type: "heading", text: "18.44 PDF Symmetry and Unknown Parameters" },
      { type: "para", text: "The total area property (\\(\\int f_X(x) dx = 1\\)) is frequently used in exam problems to calculate unknown scaling parameters within a given PDF equation." },
      { type: "list", items: [
          "The graph of a PDF can <b>never</b> be an odd function of \\(x\\), because an odd function would have cancelling negative areas, making it impossible to sum to 1 while remaining strictly non-negative.",
          "If the graph of the PDF is an <b>Even</b> function (symmetric across the y-axis), the area calculation can be simplified.",
          "For an Even PDF: \\(\\int_{-\\infty}^{\\infty} f_X(x) dx = 2 \\int_{0}^{\\infty} f_X(x) dx = 1\\).",
          "For a Non-Even PDF, the full integral \\(\\int_{-\\infty}^{\\infty} f_X(x) dx = 1\\) must be computed directly."
      ]},
      
      // --- SECTION: VALIDITY OF PDF (OCR Extension) ---
      { type: "heading", text: "19.2 Validity of PDF (Formal Conditions)" },
      { type: "para", text: "To be a valid Probability Density Function, \\(f_X(x)\\) must satisfy two absolute conditions:" },
      { type: "list", items: [
          "<b>1. Non-negativity:</b> \\(f_X(x) \\ge 0\\) for all \\(x\\).",
          "<b>2. Total Area:</b> \\(\\int_{-\\infty}^{\\infty} f_X(x)dx = 1\\)."
      ]},
      { type: "para", text: "<b>Note:</b> The function \\(f_X(x)\\) itself can be increasing, decreasing, or constant. It does not have to be monotonic like a CDF." },

      // --- SECTION: PROBABILITY IN A RANGE ---
      { type: "heading", text: "19.3 Probability in a Range (Area of PDF)" },
      { type: "para", text: "<b>Fundamental Rule:</b> Probability in a range equals the AREA of the PDF in that exact range." },
      { type: "para", text: "When dealing with continuous ranges, we must strictly observe the integration limits (\\(a^-, a^+, b^-, b^+\\)), especially if the PDF contains impulses at the boundaries:" },
      { type: "list", items: [
          "<b>(i) Open Lower, Closed Upper:</b> \\(P(a < X \\le b) = \\int_{a^+}^{b^+} f_X(x)dx\\)",
          "<b>(ii) Fully Open:</b> \\(P(a < X < b) = \\int_{a^+}^{b^-} f_X(x)dx\\)",
          "<b>(iii) Closed Lower, Open Upper:</b> \\(P(a \\le X < b) = \\int_{a^-}^{b^-} f_X(x)dx\\)",
          "<b>(iv) Fully Closed:</b> \\(P(a \\le X \\le b) = \\int_{a^-}^{b^+} f_X(x)dx\\)"
      ]},

      // --- SECTION: PROBABILITY AT A POINT ---
      { type: "heading", text: "19.4 Calculation of Probability at a Point" },
      { type: "para", text: "To find the probability at an exact point \\(X = a\\), we integrate the PDF over an infinitesimally small interval around \\(a\\):" },
      { type: "eq", tex: "P(X = a) = F_X(a^+) - F_X(a^-) = \\int_{-\\infty}^{a^+} f_X(x)dx - \\int_{-\\infty}^{a^-} f_X(x)dx" },
      { type: "eq", tex: "P\\{X = a\\} = \\int_{a^-}^{a^+} f_X(x)dx" },

      // --- SECTION: CONTINUOUS VS IMPULSE ---
      { type: "heading", text: "19.5 Point Probability: Continuous vs. Impulse" },
      { type: "para", text: "The result of the point integration depends entirely on whether an impulse (Dirac delta) exists at that location:" },
      { type: "list", items: [
          "<b>Case 1 (No Impulse):</b> If the PDF is purely continuous at \\(x = a\\), the area of a mathematical line is zero.<br> \\(P(X = a) = \\int_{a^-}^{a^+} f_X(x)dx = 0\\)",
          "<b>Case 2 (Impulse Exists):</b> If the PDF contains an impulse \\(\\Delta\\delta(x-a)\\) at \\(x = a\\), the probability equals the weight (area) of that impulse.<br> \\(P(X = a) = \\int_{a^-}^{a^+} f_X(x)dx = \\Delta = \\text{Area of impulse}\\)"
      ]},

      // --- SECTION: SUMMARY MAP ---
      { type: "heading", text: "19.6 Master Summary: CDF vs. PDF Calculations" },
      { type: "table",
        headers: ["Calculation Type", "Using CDF \\(F_X(x)\\)", "Using PDF \\(f_X(x)\\)"],
        rows: [
          ["<b>Probability in a Range</b> \\(P(a < X \\le b)\\)", "\\(F_X(b^+) - F_X(a^+)\\)", "\\(\\int_{a^+}^{b^+} f_X(x)dx\\)"],
          ["<b>Probability at a Point</b> \\(P(X = a)\\)", "\\(F_X(a^+) - F_X(a^-)\\)", "\\(\\int_{a^-}^{a^+} f_X(x)dx\\)"]
        ]
      },
      // --- SECTION: INTERACTIVE PDF INTEGRATION SIMULATOR ---
      { type: "heading", text: "19.7 Interactive PDF Area Visualizer" },
      { type: "para", text: "Use the dropdown to observe how impulses (Dirac deltas) fundamentally change probability calculations. Notice that for a continuous PDF, the probability at an exact point is always zero, but for a mixed PDF, it equals the weight (area) of the impulse." },
      { type: "canvas_sim_select", simId: "pdf_area_sim", height: 280, controlLabel: "Select Calculation Scenario:",
        options: [
          { value: "cont_point", text: "1. Continuous PDF: P(X = a)" },
          { value: "mixed_point", text: "2. Mixed PDF: P(X = a) [Impulse at 'a']" },
          { value: "cont_open", text: "3. Continuous PDF: P(a < X < b)" },
          { value: "mixed_open", text: "4. Mixed PDF: P(a < X < b) [Fully Open]" },
          { value: "mixed_closed", text: "5. Mixed PDF: P(a ≤ X ≤ b) [Fully Closed]" }
        ]
      },
      // --- SECTION: PROBLEM STATEMENT ---
      { type: "heading", text: "19.8 Comprehensive Problem: CDF to PDF & Conditional Probability" },
      { type: "para", text: "<b>Question:</b> The graph of the CDF of a Random Variable \\(X\\) is given by the mathematical function below. Calculate the corresponding PDF, several range probabilities, and conditional probabilities." },
      { type: "eq", tex: "F_X(x) = \\begin{cases} 0 & x \\le 2 \\\\ A(x-2) & 2 < x \\le 6 \\\\ 1 & x > 6 \\end{cases}" },

      // --- SECTION: PART 1 PDF ---
      { type: "heading", text: "Part 1: Finding the PDF and Unknown Constant 'A'" },
      { type: "para", text: "To be a valid CDF, the maximum value must reach 1. Evaluating the function at the upper boundary \\(x = 6\\):" },
      { type: "eq", tex: "F_X(6) = A(6 - 2) = 4A = 1 \\implies A = \\frac{1}{4}" },
      { type: "para", text: "The Probability Density Function (PDF) is the derivative of the CDF. The derivative of the ramp \\(\\frac{1}{4}(x-2)\\) is the constant \\(1/4\\)." },
      { type: "eq", tex: "f_X(x) = \\frac{d}{dx}F_X(x) = \\begin{cases} \\frac{1}{4} & 2 < x \\le 6 \\\\ 0 & \\text{otherwise} \\end{cases}" },

      // --- SECTION: PART 2 RANGE ---
      { type: "heading", text: "Part 2: Range Probabilities" },
      { type: "para", text: "<b>(2) Calculate \\(P\\{X > 2\\}\\):</b> This spans from 2 to \\(\\infty\\)." },
      { type: "list", items: [
          "<b>Using CDF:</b> \\(F_X(\\infty) - F_X(2^+) = 1 - 0 = 1\\)",
          "<b>Using PDF:</b> \\(\\int_{2^+}^{\\infty} f_X(x)dx = \\int_{2}^{6} \\frac{1}{4} dx = 1\\)"
      ]},
      { type: "para", text: "<b>(3) Calculate \\(P\\{3 < X < 5\\}\\):</b>" },
      { type: "list", items: [
          "<b>Using CDF:</b> \\(F_X(5^-) - F_X(3^+) = \\frac{1}{4}(5-2) - \\frac{1}{4}(3-2) = \\frac{3}{4} - \\frac{1}{4} = \\frac{1}{2}\\)",
          "<b>Using PDF:</b> \\(\\int_{3}^{5} f_X(x)dx = \\int_{3}^{5} \\frac{1}{4} dx = \\frac{1}{4}[5 - 3] = \\frac{1}{2}\\)"
      ]},

      // --- SECTION: PART 3 CONDITIONAL ---
      { type: "heading", text: "Part 3: Conditional Probabilities" },
      { type: "para", text: "Recall the standard formula for Conditional Probability: \\(P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}\\)." },
      { type: "para", text: "<b>(4) Calculate \\(P\\{X > 2 \\mid X > 3\\}\\):</b>" },
      { type: "eq", tex: "P(X>2 \\mid X>3) = \\frac{P(\\{X>2\\} \\cap \\{X>3\\})}{P(X>3)}" },
      { type: "para", text: "Since any number greater than 3 is strictly also greater than 2, the intersection of these sets is simply \\(X > 3\\):" },
      { type: "eq", tex: "= \\frac{P(X>3)}{P(X>3)} = 1" },
      { type: "para", text: "<b>(5) Calculate \\(P\\{-2X + 1 > 2 \\mid X > 1/8\\}\\):</b>" },
      { type: "para", text: "First, simplify the condition in the numerator: \\(-2X + 1 > 2 \\implies -2X > 1 \\implies X < -1/2\\)." },
      { type: "eq", tex: "P(X < -1/2 \\mid X > 1/8) = \\frac{P(\\{X < -1/2\\} \\cap \\{X > 1/8\\})}{P(X > 1/8)}" },
      { type: "para", text: "A number cannot simultaneously be less than -1/2 and greater than 1/8. The intersection is a null set (\\(\\emptyset\\))." },
      { type: "eq", tex: "= \\frac{P(\\emptyset)}{P(X > 1/8)} = \\frac{0}{P(X > 1/8)} = 0" },
      
      // --- SECTION: INTERACTIVE ---
      { type: "heading", text: "19.9 Visualizing the CDF and PDF Relationship" },
      { type: "para", text: "Use the interactive graph below to visually verify how the area under the PDF block directly translates to the vertical height difference (probability) on the CDF ramp." },
      { type: "canvas_sim_select", simId: "cdf_pdf_problem_sim", height: 420, controlLabel: "Select Probability Calculation:",
        options: [
          { value: "full", text: "Full Graph Structure" },
          { value: "p_x_gt_2", text: "(2) P{X > 2}" },
          { value: "p_3_5", text: "(3) P{3 < X < 5}" },
          
        ]
      },
      
      // --- SECTION: PROBLEM 2 STATEMENT ---
      { type: "heading", text: "19.10 Comprehensive Problem 2: Mixed R.V. Analysis" },
      { type: "para", text: "<b>Question:</b> The CDF of a Mixed Random Variable (M.R.V.) \\(X\\) is given graphically. It features continuous ramps and discrete jumps. Find the PDF and calculate several specific probabilities." },
      { type: "para", text: "By analyzing the slopes and discontinuities of the CDF, we construct the PDF \\(f_X(x)\\):" },
      { type: "list", items: [
          "<b>Ramp (-2 to -1):</b> Rises from 0 to 1/4 over a width of 1. Slope = \\(1/4\\). The PDF has a continuous pulse of height 1/4 here.",
          "<b>Jump at x = -1:</b> Jumps from 1/4 to 1/2 (\\(\\Delta = 1/4\\)). The PDF has an impulse \\(\\frac{1}{4}\\delta(x+1)\\).",
          "<b>Flat (-1 to 1):</b> Slope = 0. The PDF is exactly 0.",
          "<b>Jump at x = 1:</b> Jumps from 1/2 to 1 (\\(\\Delta = 1/2\\)). The PDF has an impulse \\(\\frac{1}{2}\\delta(x-1)\\)."
      ]},

      // --- SECTION: PROBLEM 2 CALCULATIONS ---
      { type: "heading", text: "19.11 Calculating Probabilities (Strict vs. Inclusive Bounds)" },
      
      { type: "para", text: "<b>(1) Calculate \\(P\\{|X| < 1\\}\\):</b>" },
      { type: "para", text: "This translates to \\(P(-1 < X < 1)\\). Because the boundaries are STRICTLY LESS THAN, we do NOT include the impulses located exactly at -1 and 1." },
      { type: "eq", tex: "\\text{CDF: } F_X(1^-) - F_X(-1^+) = \\frac{1}{2} - \\frac{1}{2} = 0" },
      { type: "eq", tex: "\\text{PDF: } \\int_{-1^+}^{1^-} f_X(x)dx = 0" },

      { type: "para", text: "<b>(2) Calculate \\(P\\{|X| \\le 1\\}\\):</b>" },
      { type: "para", text: "This translates to \\(P(-1 \\le X \\le 1)\\). Because the boundaries are INCLUSIVE (≤), we MUST capture the impulses at -1 and 1." },
      { type: "eq", tex: "\\text{CDF: } F_X(1^+) - F_X(-1^-) = 1 - \\frac{1}{4} = \\frac{3}{4}" },
      { type: "eq", tex: "\\text{PDF: } \\int_{-1^-}^{1^+} f_X(x)dx = \\underbrace{\\frac{1}{4}}_{\\text{impulse}} + 0 + \\underbrace{\\frac{1}{2}}_{\\text{impulse}} = \\frac{3}{4}" },

      { type: "para", text: "<b>(5) Calculate \\(P\\{-1.5 \\le X < 2\\}\\):</b>" },
      { type: "para", text: "At \\(x=-1.5\\), the ramp is exactly halfway between 0 and 1/4, so the CDF value is \\(1/8\\). The PDF area from -1.5 to -1 is a rectangular box." },
      { type: "eq", tex: "\\text{CDF: } F_X(2^-) - F_X(-1.5^-) = 1 - \\frac{1}{8} = \\frac{7}{8}" },
      { type: "eq", tex: "\\text{PDF: } \\int_{-1.5^-}^{2^-} f_X(x)dx = \\underbrace{\\frac{1}{8}}_{\\text{box}} + \\underbrace{\\frac{1}{4}}_{\\text{impulse}} + \\underbrace{\\frac{1}{2}}_{\\text{impulse}} = \\frac{7}{8}" },

      { type: "para", text: "<b>(6) Conditional Probability \\(P\\{X < 0.5 \\mid X > -1.5\\}\\):</b>" },
      { type: "eq", tex: "P = \\frac{P(X < 0.5 \\cap X > -1.5)}{P(X > -1.5)} = \\frac{P(-1.5 < X < 0.5)}{P(X > -1.5)}" },
      { type: "para", text: "<b>Numerator:</b> \\(\\int_{-1.5^+}^{0.5^-} f_X(x)dx = \\text{box area} + \\text{impulse} = \\frac{1}{8} + \\frac{1}{4} = \\frac{3}{8}\\)." },
      { type: "para", text: "<b>Denominator:</b> \\(\\int_{-1.5^+}^{\\infty} f_X(x)dx = \\text{box} + \\text{impulse} + \\text{impulse} = \\frac{1}{8} + \\frac{1}{4} + \\frac{1}{2} = \\frac{7}{8}\\)." },
      { type: "eq", tex: "P = \\frac{3/8}{7/8} = \\frac{3}{7}" },

      // --- SECTION: INTERACTIVE ---
      { type: "heading", text: "19.12 Interactive Mixed R.V. Visualizer" },
      { type: "para", text: "Select a probability calculation from the dropdown to visualize how boxes (continuous ramps) and impulses (discrete jumps) combine to form the total area." },
      { type: "canvas_sim_select", simId: "mixed_rv_problem_sim", height: 420, controlLabel: "Select Probability Calculation:",
        options: [
          { value: "full", text: "Full Graph Structure" },
          { value: "p_x_lt_1", text: "(1) P{|X| < 1} [Strict bounds]" },
          { value: "p_x_le_1", text: "(2) P{|X| ≤ 1} [Inclusive bounds]" },
          { value: "p_range_5", text: "(5) P{-1.5 ≤ X < 2}" },
          { value: "p_cond_6", text: "(6) Numerator: P{-1.5 < X < 0.5}" }
        ]
      },
      
      // --- SECTION: PROBLEM 3 TRIANGULAR PDF ---
      { type: "heading", text: "19.13 Problem 3: Probability from a Triangular PDF" },
      { type: "para", text: "<b>Question:</b> The PDF of a continuous random variable \\(X\\) is represented by a symmetric triangle peaking at \\(x = 0\\) with a height of \\(b\\), and a base extending from \\(-a\\) to \\(a\\). Calculate \\(P(X > a/2)\\)." },
      { type: "para", text: "<b>Step 1: Use the Total Area Property</b>" },
      { type: "para", text: "By definition, the total area under any valid PDF curve must be exactly 1. The area of this entire triangle is:" },
      { type: "eq", tex: "\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2}(2a)(b) = ab = 1" },
      { type: "para", text: "<b>Step 2: Calculate the Target Area</b>" },
      { type: "para", text: "We need the probability for \\(x > a/2\\), which forms a smaller triangle on the right tail. Using similar triangles, if the peak at \\(0\\) is \\(b\\), the height exactly halfway down the slope at \\(x = a/2\\) is \\(b/2\\). The base of this small triangle is \\(a - a/2 = a/2\\)." },
      { type: "eq", tex: "P(X > a/2) = \\int_{a/2}^{\\infty} f_X(x)dx = \\frac{1}{2} \\times \\left(\\frac{a}{2}\\right) \\times \\left(\\frac{b}{2}\\right) = \\frac{ab}{8}" },
      { type: "para", text: "<b>Step 3: Final Substitution</b>" },
      { type: "para", text: "Since we derived \\(ab = 1\\) from the total area rule, substitute it into the final probability:" },
      { type: "eq", tex: "P(X > a/2) = \\frac{1}{8}" },

      // --- SECTION: INTERACTIVE TRIANGLE ---
      { type: "heading", text: "19.14 Interactive Triangular PDF Visualizer" },
      { type: "para", text: "Use the dropdown to see how the geometric areas correspond directly to the probability fractions." },
      { type: "canvas_sim_select", simId: "triangular_pdf_prob_sim", height: 320, controlLabel: "Select Probability Calculation:",
        options: [
          { value: "full", text: "Total Area: P(-a < X < a)" },
          { value: "gt_a_half", text: "Right Tail: P(X > a/2)" },
          { value: "mid", text: "Center Mass: P(-a/2 < X < a/2)" }
        ]
      },

      // --- SECTION: PROBLEM 4 LAPLACIAN PDF ---
      { type: "heading", text: "19.15 Problem 4: Laplacian PDF Normalization" },
      { type: "para", text: "<b>Question:</b> A Laplacian PDF is given by \\(f_X(x) = ae^{-b|x|}\\) for \\(-\\infty < x < \\infty\\), where \\(a>0, b>0\\). Find the relationship between \\(a\\) and \\(b\\)." },
      { type: "para", text: "<b>Solution Steps:</b>" },
      { type: "para", text: "Apply the absolute total area condition: \\(\\int_{-\\infty}^{\\infty} f_X(x)dx = 1\\)." },
      { type: "para", text: "Because \\(e^{-b|x|}\\) is a strictly <b>Even function</b> (perfectly symmetric across the y-axis), we can simplify the integral by evaluating only the right side (from 0 to \\(\\infty\\)) and multiplying by 2:" },
      { type: "eq", tex: "2 \\int_{0}^{\\infty} ae^{-bx}dx = 1" },
      { type: "eq", tex: "2a \\left[ \\frac{e^{-bx}}{-b} \\right]_{0}^{\\infty} = 1 \\implies \\frac{2a}{-b}(0 - 1) = 1" },
      { type: "eq", tex: "\\frac{2a}{b} = 1 \\implies 2a = b" },
      { type: "para", text: "<b>Instructor's Extended Shortcut Rule:</b>" },
      { type: "para", text: "If the PDF is a linear combination of multiple Laplacian-style symmetric exponentials, e.g., \\(f_X(x) = Me^{-\\alpha|x|} + Ne^{-\\beta|x|}\\), the total area property directly expands to:" },
      { type: "eq", tex: "\\frac{2M}{\\alpha} + \\frac{2N}{\\beta} = 1" },

      // --- SECTION: PROBLEM 5 EXPONENTIAL CDF ---
      { type: "heading", text: "19.16 Problem 5: Conditional Probability from CDF" },
      { type: "para", text: "<b>Question:</b> The CDF of a random variable \\(Z\\) is given by \\(F_Z(x) = 1 - e^{-x}\\) for \\(x > 0\\), and \\(0\\) for \\(x < 0\\). Calculate \\(P(Z > 2 \\mid Z > 1)\\)." },
      { type: "para", text: "<b>Solution Steps:</b>" },
      { type: "para", text: "First, apply the standard formula for conditional probability:" },
      { type: "eq", tex: "P(Z > 2 \\mid Z > 1) = \\frac{P(\\{Z > 2\\} \\cap \\{Z > 1\\})}{P(Z > 1)}" },
      { type: "para", text: "Since any number greater than 2 is inherently also greater than 1, the intersection of these two sets is simply \\(Z > 2\\):" },
      { type: "eq", tex: "= \\frac{P(Z > 2)}{P(Z > 1)} = \\frac{P(2 < Z < \\infty)}{P(1 < Z < \\infty)}" },
      { type: "para", text: "Convert these open range probabilities into CDF evaluations. Since we know \\(F_Z(\\infty) = 1\\):" },
      { type: "eq", tex: "= \\frac{F_Z(\\infty) - F_Z(2)}{F_Z(\\infty) - F_Z(1)} = \\frac{1 - (1 - e^{-2})}{1 - (1 - e^{-1})}" },
      { type: "eq", tex: "= \\frac{e^{-2}}{e^{-1}} = e^{-1}" },
      
      // --- SECTION: SUMMARY CDF VS PDF ---
      { type: "heading", text: "19.17 Master Summary: CDF vs. PDF Properties" },
      { type: "table",
        headers: ["Cumulative Distribution Function (CDF)", "Probability Density Function (PDF)"],
        rows: [
          ["\\(0 \\le F_X(x) \\le 1\\)", "\\(0 \\le f_X(x) < \\infty\\)"],
          ["\\(F_X(\\infty) = 1, \\quad F_X(-\\infty) = 0\\)", "\\(\\int_{-\\infty}^{\\infty} f_X(x)dx = 1\\)"],
          ["Monotonically non-decreasing", "No monotonic condition"]
        ]
      },

      // --- SECTION: PROBABILITY RANGE & POINT ---
      { type: "heading", text: "19.18 Master Summary: Probability Calculations" },
      { type: "para", text: "The three standard methods (Basic, CDF, and PDF) for calculating probabilities in a range or at a specific point:" },
      { type: "table",
        headers: ["Calculation", "Basic Formula", "Using CDF \\(F_X(x)\\)", "Using PDF \\(f_X(x)\\)"],
        rows: [
          ["<b>Probability in a Range</b><br>\\(P\\{a < X \\le b\\}\\)", "\\(\\frac{n(E)}{n(S)}\\)", "\\(F_X(b^+) - F_X(a^+)\\)", "\\(\\int_{a^+}^{b^+} f_X(x)dx\\)"],
          ["<b>Probability at a Point</b><br>\\(P\\{X = a\\}\\)", "\\(\\frac{n(E)}{n(S)}\\)", "\\(F_X(a^+) - F_X(a^-)\\)", "\\(\\int_{a^-}^{a^+} f_X(x)dx\\)"]
        ]
      },

      // --- SECTION: ZERO POINT PROBABILITY ---
      { type: "heading", text: "19.19 The Zero Point Probability Condition" },
      { type: "para", text: "The probability of a Random Variable taking an exact point value \\(P\\{X = a\\} = 0\\) if and only if:" },
      { type: "list", items: [
          "The <b>CDF</b> does not have a <b>jump</b> at \\(x = a\\).",
          "The <b>PDF</b> does not have an <b>impulse</b> at \\(x = a\\)."
      ]},

      // --- SECTION: TYPES OF RV ---
      { type: "heading", text: "19.20 Types of Random Variables" },
      { type: "list", items: [
          "<b>(1) Discrete Random Variable (D.R.V.)</b>",
          "<b>(2) Continuous Random Variable (C.R.V.)</b>",
          "<b>(3) Mixed Random Variable (DRV + CRV)</b>"
      ]},

      // --- SECTION: DRV DEEP DIVE ---
      { type: "heading", text: "19.21 Deep Dive: Discrete Random Variable (D.R.V.)" },
      { type: "para", text: "If a Random Variable is defined over a countable Sample Space, it is called a Discrete Random Variable (D.R.V.). A D.R.V. maps the sample points onto discrete values on the real number line." },
      { type: "para", text: "A sample space is considered countable in two scenarios:" },
      { type: "list", items: [
          "<b>Countable Finite:</b> e.g., Tossing two coins. \\(S = \\{HH, HT, TH, TT\\}\\)",
          "<b>Countable Infinite:</b> e.g., Rolling a die continuously until a '3' appears. The sample space is \\(S = \\{3, \\bar{3}3, \\bar{3}\\bar{3}3, \\dots\\}\\). The Random Variable \\(X\\) (Number of times the dice is rolled) maps this to the countable infinite set \\(X \\in \\{1, 2, 3, \\dots\\}\\)."
      ]},

      // --- SECTION: DRV PARAMETERS ---
      { type: "heading", text: "19.22 Parameters of a D.R.V." },
      { type: "para", text: "A Discrete Random Variable is fully characterized by three main functions:" },
      { type: "list", items: [
          "<b>1. Probability Mass Function (P.M.F.):</b> Defined as \\(P_X(x_i) = P(X = x_i)\\)",
          "<b>2. Probability Density Function (PDF):</b> Composed entirely of Dirac delta impulses.",
          "<b>3. Cumulative Distribution Function (CDF):</b> Forms a discrete staircase waveform."
      ]},

      // --- SECTION: INTERACTIVE DRV ---
      { type: "heading", text: "19.23 Interactive D.R.V. Visualizer (Geometric Distribution)" },
      { type: "para", text: "This simulator visualizes the 'Countable Infinite' example from the lecture: Rolling a dice until a 3 appears. Use the dropdown to see how the discrete probabilities map into a P.M.F., translate into PDF impulses, and accumulate into a CDF staircase." },
      { type: "canvas_sim_select", simId: "drv_geometric_sim", height: 350, controlLabel: "Select D.R.V. Parameter View:",
        options: [
          { value: "pmf", text: "1. Probability Mass Function (P.M.F.)" },
          { value: "pdf", text: "2. Probability Density Function (PDF) - Impulses" },
          { value: "cdf", text: "3. Cumulative Distribution Function (CDF) - Staircase" }
        ]
      },
    ]
  },
  

  // ══════════════════════════
  // CHAPTER 20 — DRV & CRV Analysis
  // ══════════════════════════
  {
    id: "drv_crv_analysis",
    label: "20 · DRV & CRV Deep Dive",
    title: "20. Advanced Analysis of D.R.V. and C.R.V.",
    content: [
      
      // --- PMF OF DRV ---
      { type: "heading", text: "20.1 PMF of Discrete Random Variable (D.R.V.)" },
      { type: "para", text: "Let X be a Discrete Random Variable (D.R.V.). The Probability Mass Function (PMF) denotes the probability at a specific point \\(X = x_i\\)." },
      { type: "eq", tex: "p_X(x_i) = P\\{X = x_i\\}" },
      { type: "para", text: "Standard symbols include \\(p_X(x) = P\\{X = x\\}\\) or \\(p_X(\\lambda) = P\\{X = \\lambda\\}\\), where \\(x_i\\) represents the distinct values taken by X." },
      
      { type: "heading", text: "20.2 Properties of PMF" },
      { type: "list", items: [
          "<b>1. Bounded Probability:</b> \\(0 \\le p_X(x_i) \\le 1\\)",
          "<b>2. Total Sum:</b> \\(\\sum_i p_X(x_i) = 1\\)"
      ]},

      // --- PDF OF DRV ---
      { type: "heading", text: "20.3 PDF of a D.R.V." },
      { type: "para", text: "The Probability Density Function (PDF) of a D.R.V. contains <b>only impulses</b>. It is formed by multiplying each PMF probability by a continuous x-axis impulse, \\(\\delta(x)\\)." },
      { type: "eq", tex: "f_X(x) = \\sum_i p_X(x_i) \\delta(x - x_i) = \\sum_i P\\{X=x_i\\} \\delta(x - x_i)" },
      { type: "para", text: "Expanded form:" },
      { type: "eq", tex: "f_X(x) = P(X=x_1)\\delta(x-x_1) + P(X=x_2)\\delta(x-x_2) + P(X=x_3)\\delta(x-x_3) + \\dots" },
      
      // --- Replace the PDF graph block with this: ---
      { type: "canvas_sim_select", simId: "drv_pdf_graph", height: 260, controlLabel: "Visualizing PDF from PMF:",
        options: [
          { value: "pmf", text: "Step 1: P.M.F. (Discrete Points)" },
          { value: "pdf", text: "Step 2: PDF (Continuous Impulses)" }
        ]
      },

      // --- CDF OF DRV ---
      { type: "heading", text: "20.4 CDF of a D.R.V." },
      { type: "para", text: "The Cumulative Distribution Function (CDF) is the integration of the PDF. Integrating impulses \\(\\delta(x)\\) yields unit step functions \\(u(x)\\)." },
      { type: "eq", tex: "F_X(x) = \\int_{-\\infty}^{x} f_X(x)dx = \\int_{-\\infty}^{x} \\left[ \\sum_i p_X(x_i) \\delta(x - x_i) \\right] dx" },
      { type: "para", text: "This yields the standard Step Function expression:" },
      { type: "eq", tex: "F_X(x) = p_X(x_1)u(x-x_1) + p_X(x_2)u(x-x_2) + p_X(x_3)u(x-x_3) + \\dots" },
      
      { type: "canvas_sim_select", simId: "drv_cdf_graph", height: 280, controlLabel: "Visualizing CDF Construction:",
        options: [
          { value: "impulses", text: "Step 1: PDF Impulses" },
          { value: "staircase", text: "Step 2: Accumulate into Staircase" }
        ]
      },

      // --- IDENTIFICATION ---
      { type: "heading", text: "20.5 Note: Identification of D.R.V." },
      { type: "para", text: "A Discrete Random Variable can be strictly identified by the following characteristics:" },
      { type: "list", items: [
          "i) By observing its sample space (must be countable finite or countable infinite).",
          "ii) By analyzing its Random Variable mapping.",
          "iii) Its PDF should contain <b>impulses only</b>.",
          "iv) Its CDF should contain <b>STAIRCASE forms only</b>."
      ]},

      // --- CRV CHARACTERISTICS ---
      { type: "heading", text: "20.6 Continuous Random Variables (C.R.V.)" },
      { type: "para", text: "<b>1. PDF of C.R.V.</b>" },
      { type: "list", items: [
          "Does <b>not</b> contain impulses at all.",
          "Probability that a C.R.V. takes a single exact value is 0. <br>Example: \\(P(X=2) = \\int_{2^-}^{2^+} f_X(x)dx = 0\\)"
      ]},
      { type: "para", text: "<b>2. CDF of C.R.V.</b>" },
      { type: "list", items: [
          "It is always <b>amplitude continuous</b>.",
          "It will not have jump-type discontinuities anywhere.",
          "\\(P\\{X=a\\} = F_X(a^+) - F_X(a^-) = 0\\)"
      ]},
      { type: "canvas_sim_select", simId: "crv_graphs", height: 240, controlLabel: "C.R.V. Graph Views:",
        options: [
          { value: "pdf", text: "PDF of C.R.V. (No Impulses)" },
          { value: "cdf", text: "CDF of C.R.V. (Amplitude Continuous)" }
        ]
      },
      // --- PMF NOT DEFINED FOR CRV ---
      { type: "heading", text: "20.7 Why PMF is not defined for C.R.V." },
      { type: "para", text: "Let X be a Continuous Random Variable (C.R.V.). The PMF evaluates the probability at an exact single point." },
      { type: "eq", tex: "p_X(x_i) = P\\{X = x_i\\} = \\int_{x_i^-}^{x_i^+} f_X(x)dx = 0" },
      { type: "eq", tex: "F_X(x_i^+) - F_X(x_i^-) = 0" },
      
      { type: "heading", text: "20.8 Note on Point Probabilities" },
      { type: "list", items: [
          "1. In case of D.R.V., Probability at a single point \\(P\\{X=a\\}\\) may or may not be zero.",
          "2. In case of C.R.V., Probability at a single point \\(P\\{X=a\\}\\) is always zero."
      ]},

      // --- MIXED RANDOM VARIABLES ---
      { type: "heading", text: "20.9 Mixed Random Variables (M.R.V.)" },
      { type: "para", text: "Mixed random variables exhibit the nature of both C.R.V. and D.R.V. simultaneously." },
      { type: "canvas_sim_select", simId: "mixed_rv_graph_sim", height: 260, controlLabel: "Mixed R.V. Visualizer:",
        options: [
          { value: "pdf", text: "PDF: Continuous Triangle + Discrete Impulses" },
          { value: "cdf", text: "CDF: Continuous Ramps + Discrete Jumps" }
        ]
      },

      // --- EXPECTATION OPERATOR ---
      { type: "heading", text: "20.10 Statistical Averages of R.V. (Expectation Operator)" },
      { type: "para", text: "The Expectation operator \\(E[\\cdot]\\) operates only on random variables and random signals." },
      { type: "para", text: "Let \\(C\\) be a deterministic constant and \\(h(t)\\) be a deterministic signal. Let \\(X\\) and \\(Y\\) be Random Variables:" },
      { type: "list", items: [
          "1. \\(E[C] = C\\)",
          "2. \\(E[h(t)] = h(t)\\)",
          "3. \\(E[X] \\neq X\\)",
          "4. \\(E[aX] = aE[X]\\)",
          "5. \\(E[aX+b] = aE[X] + b\\)",
          "6. \\(E[aX+bY] = aE[X] + bE[Y]\\)",
          "7. \\(E[g(X)] \\neq g(X)\\)",
          "8. \\(E[ag(X) + bH(Y)] = aE[g(X)] + bE[H(Y)]\\)",
          "9. \\(E[X+g(X)+Y^2+H(Y)] = E[X] + E[g(X)] + E[Y^2] + E[H(Y)]\\)"
      ]},
      { type: "para", text: "<b>Note:</b> If \\(X\\) is an R.V., then any function \\(g(X)\\) is also an R.V.." },

      // --- CALCULATING EXPECTATION ---
      { type: "heading", text: "20.11 Definition of Expectation Operator" },
      { type: "para", text: "The calculation of Expectation branches depending on whether the variable is Continuous (uses PDF and integration) or Discrete (uses PMF and summation)." },
      { type: "table",
        headers: ["Expected Value", "C.R.V. (Using PDF)", "D.R.V. (Using PMF)"],
        rows: [
          ["\\(E[X]\\)", "\\(\\int_{-\\infty}^{\\infty} x f_X(x) dx\\)", "\\(\\sum_i x_i P\\{X=x_i\\}\\)"],
          ["\\(E[X^2]\\)", "\\(\\int_{-\\infty}^{\\infty} x^2 f_X(x) dx\\)", "\\(\\sum_i x_i^2 P\\{X=x_i\\}\\)"],
          ["\\(E[g(X)]\\)", "\\(\\int_{-\\infty}^{\\infty} g(x) f_X(x) dx\\)", "\\(\\sum_i g(x_i) P\\{X=x_i\\}\\)"]
        ]
      },
      { type: "para", text: "<b>Important:</b> The variable used inside the PDF integral is just a dummy variable. For example, let \\(Y\\) be a C.R.V: \\(E[Y] = \\int_{-\\infty}^{\\infty} y f_Y(y) dy\\) where \\(f_Y(y)\\) is the PDF of Y." },
      
      
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 21 — Expectation Operator
  // ══════════════════════════
  {
    "id": "expectation_operator",
    "label": "21 · Expectation",
    "title": "21. Statistical Averages & Expectation Operator",
    "content": [
      { "type": "heading", "text": "21.1 Properties of Expectation (Random Variables X and Y)" },
      { "type": "para", "text": "The Expectation operator \\(E[\\cdot]\\) follows strict linearity properties. If \\(X\\) is a Random Variable, then any function \\(g(X)\\) is also a Random Variable." },
      { "type": "list", "items": [
          "3. \\(E[X] \\neq X\\)",
          "4. \\(E[aX] = aE[X]\\)",
          "5. \\(E[aX + b] = aE[X] + b\\)",
          "6. \\(E[aX + bY] = aE[X] + bE[Y]\\)",
          "7. \\(E[g(X)] \\neq g(X)\\)",
          "8. \\(E[ag(X) + bH(Y)] = aE[g(X)] + bE[H(Y)]\\)",
          "9. \\(E[X + g(X) + Y^2 + H(Y)] = E[X] + E[g(X)] + E[Y^2] + E[H(Y)]\\)"
        ]
      },

      { "type": "heading", "text": "21.2 Definition Framework" },
      { "type": "para", "text": "The definition and calculation of the Expectation Operator depend entirely on whether the Random Variable is Continuous (C.R.V.) or Discrete (D.R.V.):" },
      { "type": "list", "items": [
          "For <b>X: C.R.V.</b> \\(\\rightarrow\\) Use the <b>PDF</b> (Probability Density Function).",
          "For <b>X: D.R.V.</b> \\(\\rightarrow\\) Use the <b>PMF</b> (Probability Mass Function)."
        ]
      },

      { "type": "heading", "text": "21.3 Master Formulas for Expectation" },
      { "type": "para", "text": "Let \\(X\\) be a Random Variable. The expected values are defined as follows:" },
      { "type": "eq", "tex": "1. \\quad E[X] = \\begin{cases} \\int_{-\\infty}^{\\infty} x f_X(x) dx & \\text{X: C.R.V (using PDF)} \\\\ \\sum_i x_i P\\{X = x_i\\} & \\text{X: D.R.V (using PMF)} \\end{cases}" },
      { "type": "eq", "tex": "2. \\quad E[g(X)] = \\begin{cases} \\int_{-\\infty}^{\\infty} g(x) f_X(x) dx & \\text{X: C.R.V} \\\\ \\sum_i g(x_i) P\\{X = x_i\\} & \\text{X: D.R.V} \\end{cases}" },
      { "type": "eq", "tex": "3. \\quad E[X^2] = \\begin{cases} \\int_{-\\infty}^{\\infty} x^2 f_X(x) dx & \\text{X: C.R.V} \\\\ \\sum_i x_i^2 P\\{X = x_i\\} & \\text{X: D.R.V} \\end{cases}" },
      { "type": "para", "text": "*(Equations codified from the core expectation framework)*." },

      { "type": "heading", "text": "21.4 Continuous Random Variables (C.R.V) Examples" },
      { "type": "para", "text": "For Continuous Random Variables \\(X\\) and \\(Y\\), the standard expectations are strictly based on their respective PDFs:" },
      { "type": "eq", "tex": "E[X] = \\int_{-\\infty}^{\\infty} x f_X(x) dx \\quad \\text{where } f_X(x) \\text{ is PDF of X}" },
      { "type": "eq", "tex": "E[Y] = \\int_{-\\infty}^{\\infty} y f_Y(y) dy \\quad \\text{where } f_Y(y) \\text{ is PDF of Y}" },
      { "type": "para", "text": "<b>Function Evaluation Examples:</b> To calculate the expectation of a function of \\(X\\) (like \\(Y = X^2\\) or \\(Y = \\sin X\\)), you substitute the function directly into the integral while keeping the PDF of \\(X\\):" },
      { "type": "eq", "tex": "E[Y = X^2] = \\int_{-\\infty}^{\\infty} y f_Y(y) dy = \\int_{-\\infty}^{\\infty} x^2 f_X(x) dx" },
      { "type": "eq", "tex": "E[Y = \\sin X] = \\int_{-\\infty}^{\\infty} y f_Y(y) dy = \\int_{-\\infty}^{\\infty} \\sin(x) f_X(x) dx" },

      { "type": "heading", "text": "21.5 Discrete Random Variables (D.R.V) Examples" },
      { "type": "para", "text": "For Discrete Random Variables \\(X\\) and \\(Y\\), the expectations are based on their respective PMFs:" },
      { "type": "eq", "tex": "E[X] = \\sum_i x_i P\\{X = x_i\\} \\quad \\text{where } P\\{X = x_i\\} \\text{ is PMF of X}" },
      { "type": "eq", "tex": "E[Y] = \\sum_j y_j P\\{X = y_j\\} \\quad \\text{where } P\\{Y = y_j\\} \\text{ is PMF of Y}" },
      { "type": "para", "text": "<b>Function Evaluation (Let \\(Y = g(X)\\)):</b> By expanding the substitution across the summations, the expected value of \\(Y\\) maps back to the PMF of \\(X\\):" },
      { "type": "eq", "tex": "E[Y = g(X)] = \\sum_j y_j P\\{Y = y_j\\} = \\sum_i g(x_i) P\\{X = x_i\\}" }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 22 — Statistical Average & Moments
  // ══════════════════════════
  {
    "id": "statistical_moments",
    "label": "22 · Moments & Variance",
    "title": "22. Statistical Average of R.V. (Moments)",
    "content": [

      // --- SECTION: N-TH ORDER ABOUT ORIGIN ---
      { "type": "heading", "text": "22.1  \\(n^{th}\\) Order Moment About Origin" },
      { "type": "para", "text": "The general formula for the \\(n^{th}\\) order moment about the origin evaluates the expected value of \\(X^n\\):" },
      { "type": "eq", "tex": "E[(X-0)^n] = E[X^n] = \\begin{cases} \\sum_i x_i^n P\\{X = x_i\\} & X:DRV \\\\ \\int_{-\\infty}^{\\infty} x^n f_X(x)dx & X:CRV \\end{cases}" },

      // --- SECTION: 1ST ORDER ABOUT ORIGIN ---
      { "type": "heading", "text": "22.2  First Order Moment About Origin (Mean)" },
      { "type": "para", "text": "Substituting \\(n = 1\\) yields the first moment about the origin:" },
      { "type": "eq", "tex": "E[(X-0)^1] = E[X] = \\begin{cases} \\sum_i x_i P\\{X = x_i\\} & X:DRV \\\\ \\int_{-\\infty}^{\\infty} x f_X(x)dx & X:CRV \\end{cases}" },
      { "type": "para", "text": "This value has several critical notations and physical interpretations in signal analysis:" },
      { "type": "list", "items": [
          "\\(E[X] = \\bar{X} = \\mu_x = m_1\\).",
          "It represents the <b>dc value</b>, <b>mean value</b>, or <b>avg value</b> of the Random Variable.",
          "Squaring this value \\((E[X])^2 = \\mu_x^2 = (\\bar{X})^2 = m_1^2\\) represents the <b>dc power</b> of the Random Variable."
        ]
      },

      // --- SECTION: 2ND ORDER ABOUT ORIGIN ---
      { "type": "heading", "text": "22.3  Second Order Moment About Origin" },
      { "type": "para", "text": "Substituting \\(n = 2\\) yields the second moment about the origin:" },
      { "type": "eq", "tex": "E[(X-0)^2] = E[X^2] = \\begin{cases} \\sum_i x_i^2 P\\{X = x_i\\} & X:DRV \\\\ \\int_{-\\infty}^{\\infty} x^2 f_X(x)dx & X:CRV \\end{cases}" },
      { "type": "para", "text": "Physical interpretation of the second moment:" },
      { "type": "list", "items": [
          "\\(E[X^2] = \\overline{X^2} = m_2\\), which represents the <b>Mean square value</b> of R.V. X.",
          "This equates directly to the <b>Total or avg power</b> of R.V. X."
        ]
      },

      // --- SECTION: N-TH ORDER ABOUT MEAN ---
      { "type": "heading", "text": "22.4  \\(n^{th}\\) Order Moment About Mean (Central Moments)" },
      { "type": "para", "text": "Moments calculated around the mean (\\(\\mu_x\\)) rather than the origin (0) are defined as:" },
      { "type": "eq", "tex": "E[(X-\\mu_x)^n] = \\begin{cases} \\sum_i (x_i - \\mu_x)^n P\\{X = x_i\\} & X:DRV \\\\ \\int_{-\\infty}^{\\infty} (x - \\mu_x)^n f_X(x)dx & X:CRV \\end{cases}" },

      // --- SECTION: 1ST ORDER ABOUT MEAN ---
      { "type": "heading", "text": "22.5  First Order Moment About Mean" },
      { "type": "para", "text": "Evaluating the first order moment about the mean always results in zero. Because the expectation of a constant (\\(\\mu_x\\)) is the constant itself:" },
      { "type": "eq", "tex": "E[(X-\\mu_x)] = E[X-\\mu_x] = E[X] - E[\\mu_x]" },
      { "type": "eq", "tex": "= \\mu_x - \\mu_x = 0" },

      // --- SECTION: 2ND ORDER ABOUT MEAN (VARIANCE) ---
      { "type": "heading", "text": "22.6  Second Order Moment About Mean (Variance)" },
      { "type": "para", "text": "The second order moment about the mean is one of the most important statistical parameters. The mathematical derivation unfolds as follows:" },
      { "type": "eq", "tex": "E[(X-\\mu_x)^2] = E[X^2 + \\mu_x^2 - 2X\\mu_x]" },
      { "type": "eq", "tex": "= E[X^2] + E[\\mu_x^2] - E[2X\\mu_x]" },
      { "type": "para", "text": "Since \\(\\mu_x\\) is a constant, it factors out of the expectation operator:" },
      { "type": "eq", "tex": "= E[X^2] + \\mu_x^2 - 2\\mu_x E[X]" },
      { "type": "eq", "tex": "= E[X^2] + \\mu_x^2 - 2\\mu_x^2" },
      { "type": "eq", "tex": "\\sigma_x^2 = E[X^2] - \\mu_x^2" },
      { "type": "para", "text": "Key interpretations of this result:" },
      { "type": "list", "items": [
          "\\(E[(X-\\mu_x)^2] = \\sigma_x^2\\) represents the <b>Variance of R.V. X</b>.",
          "It can be written in terms of moments: \\(\\sigma_x^2 = m_2 - m_1^2\\).",
          "In signal terminology, \\(\\sigma_x^2\\) exactly represents the <b>AC power of R.V. \"X\"</b>."
        ]
      }
    ]
  },
  // ══════════════════════════
  // CHAPTER 23 — Properties of Variance & Problems
  // ══════════════════════════
  {
    "id": "variance_properties_problems",
    "label": "23 · Variance & Probs",
    "title": "23. Properties of Variance & Problem Solving",
    "content": [

      // --- SECTION: PROPERTIES OF VARIANCE ---
      { "type": "heading", "text": "23.1  Important Properties of Variance" },
      { "type": "list", "items": [
          "<b>1. Non-negativity:</b> Since variance physically represents AC power, it must be strictly non-negative: \\(\\sigma_x^2 \\ge 0 \\implies E[X^2] \\ge (E[X])^2\\).",
          "<b>2. Zero Mean R.V.:</b> If a random variable has a mean of zero (\\(\\mu_x = 0\\)), then its variance is exactly equal to its Mean Square Value (M.S.V.): \\(\\sigma_x^2 = E[X^2]\\).",
          "<b>3. Standard Deviation:</b> The square root of the variance defines the standard deviation: \\(\\text{Standard Deviation} = \\sqrt{\\text{Variance}} = \\sqrt{\\sigma_x^2} = \\pm \\sigma_x\\)."
        ]
      },

      // --- SECTION: LINEAR TRANSFORMATION VARIANCE ---
      { "type": "heading", "text": "23.2  Variance of a Linear Transformation" },
      { "type": "para", "text": "Let \\(Y = aX + b\\). We calculate the variance of \\(Y\\) by expanding the fundamental variance formula:" },
      { "type": "eq", "tex": "\\sigma_y^2 = E[Y^2] - (E[Y])^2" },
      { "type": "eq", "tex": "\\sigma_y^2 = E[(aX + b)^2] - (E[aX + b])^2" },
      { "type": "eq", "tex": "\\sigma_y^2 = E[a^2X^2 + b^2 + 2abX] - (aE[X] + b)^2" },
      { "type": "para", "text": "Knowing that \\(E[X] = \\mu_x\\), the expansion simplifies to:" },
      { "type": "eq", "tex": "\\sigma_y^2 = a^2E[X^2] + b^2 + 2ab\\mu_x - (a^2\\mu_x^2 + b^2 + 2ab\\mu_x)" },
      { "type": "eq", "tex": "\\sigma_y^2 = a^2E[X^2] - a^2\\mu_x^2 = a^2(E[X^2] - \\mu_x^2)" },
      { "type": "para", "text": "Since \\(E[X^2] - \\mu_x^2 = \\sigma_x^2\\), the definitive relationship is established:" },
      { "type": "eq", "tex": "\\sigma_y^2 = a^2 \\sigma_x^2" },

      // --- SECTION: VARIANCE OF CONSTANT ---
      { "type": "heading", "text": "23.3  Variance of a Constant" },
      { "type": "para", "text": "Let \\(C\\) be a deterministic constant. Its variance evaluates to zero because it has no AC power or spread:" },
      { "type": "eq", "tex": "Var(C) = E[C^2] - (E[C])^2 = C^2 - (C)^2 = 0" },
      { "type": "para", "text": "<b>Master Summary Rules:</b>" },
      { "type": "eq", "tex": "X \\longrightarrow \\sigma_x^2" },
      { "type": "eq", "tex": "Y = aX + b \\longrightarrow \\sigma_y^2 = a^2\\sigma_x^2" },

      // --- SECTION: CENTRAL MOMENTS ---
      { "type": "heading", "text": "23.4  Central Moments (\\(n^{th}\\) order)" },
      { "type": "para", "text": "For symmetric distributions, the \\(n^{th}\\) order central moments, \\(E[(X - \\mu_x)^n]\\), follow specific expansion rules:" },
      { "type": "eq", "tex": "E[(X - \\mu_x)^n] = \\begin{cases} 0 & : n \\text{ is odd} \\\\ \\{1 \\times 3 \\times 5 \\times 7 \\times \\dots \\times (n-1)\\} \\sigma_x^n & : n \\text{ is even} \\end{cases}" },
      { "type": "para", "text": "Example evaluating the \\(4^{th}\\) moment (\\(n=4\\)):" },
      { "type": "eq", "tex": "E[(X - \\mu_x)^4] = (1 \\times 3)\\sigma_x^4 = 3\\sigma_x^4" },

      // --- SECTION: PROBLEM: MEAN & VARIANCE ---
      { "type": "heading", "text": "23.5  Problem: Mean and Variance of a D.R.V." },
      { "type": "para", "text": "<b>Question:</b> The PMF of D.R.V. \\(X\\) is given as follows. Calculate (i) Mean of R.V. and (ii) Variance of DRV." },
      { "type": "eq", "tex": "P_X(x) = \\begin{cases} 1/3 & x = 0 \\\\ 2/3 & x = 2 \\end{cases}" },
      { "type": "para", "text": "<b>Solution (i) Mean:</b> The sample space is \\(X \\in \\{0, 2\\}\\)." },
      { "type": "eq", "tex": "E[X] = \\sum_i x_i P\\{X = x_i\\} = 0 \\times P\\{X=0\\} + 2 \\times P\\{X=2\\}" },
      { "type": "eq", "tex": "E[X] = 0 \\left(\\frac{1}{3}\\right) + 2 \\left(\\frac{2}{3}\\right) = \\frac{4}{3}" },
      { "type": "para", "text": "<b>Solution (ii) Variance:</b> First, find the mean square value \\(E[X^2]\\):" },
      { "type": "eq", "tex": "E[X^2] = \\sum_i x_i^2 P\\{X = x_i\\} = 0^2 P\\{X=0\\} + 2^2 P\\{X=2\\}" },
      { "type": "eq", "tex": "E[X^2] = 0 \\left(\\frac{1}{3}\\right) + 4 \\left(\\frac{2}{3}\\right) = \\frac{8}{3}" },
      { "type": "para", "text": "Now apply the variance formula:" },
      { "type": "eq", "tex": "\\sigma_x^2 = E[X^2] - (E[X])^2 = \\frac{8}{3} - \\left(\\frac{4}{3}\\right)^2 = \\frac{8}{3} - \\frac{16}{9} = \\frac{24 - 16}{9} = \\frac{8}{9}" },

      // --- SECTION: PROBLEM: EXPECTED VALUE SET ---
      { "type": "heading", "text": "23.6  Problem: Expected Value from a Set" },
      { "type": "para", "text": "<b>Question:</b> Let \\(X\\) be an R.V. chosen uniformly from the set of odd numbers less than 100. Calculate the expected value of \\(X\\)." },
      { "type": "para", "text": "<b>Solution:</b> The set of possible values is \\(X = \\{1, 3, 5, 7, \\dots, 99\\}\\). Since a number is chosen uniformly, the probability of each outcome is \\(1/50\\) (as there are 50 odd numbers less than 100)." },
      { "type": "eq", "tex": "E[X] = \\sum_{i} x_i P\\{X = x_i\\} = \\frac{1}{50} [1 + 3 + 5 + 7 + \\dots + 99]" },
      { "type": "para", "text": "Using the sum of an arithmetic progression \\(S_n = \\frac{n}{2}(a + l)\\), where \\(n=50\\), \\(a=1\\), and the last term \\(l=99\\):" },
      { "type": "eq", "tex": "E[X] = \\frac{1}{50} \\left[ \\frac{50}{2} (1 + 99) \\right] = \\frac{1}{50} \\times \\frac{50}{2} \\times 100 = 50" },

      // --- SECTION: IMPORTANT SERIES ---
      { "type": "heading", "text": "23.7  Mathematical Prerequisites: Important Series" },
      { "type": "para", "text": "The following infinite series expansions frequently appear when calculating the expectations of complex discrete distributions:" },
      { "type": "eq", "tex": "(1+x)^{-1} = 1 - x + x^2 - x^3 + \\dots" },
      { "type": "eq", "tex": "(1-x)^{-1} = 1 + x + x^2 + x^3 + \\dots" },
      { "type": "para", "text": "Differentiating or manipulating these base series yields higher-order forms:" },
      { "type": "eq", "tex": "(1+x)^{-2} = 1 - 2x + 3x^2 - 4x^3 + \\dots" },
      { "type": "eq", "tex": "x(1+x)^{-2} = x - 2x^2 + 3x^3 - 4x^4 + \\dots" },
      { "type": "para", "text": "And for the subtraction case:" },
      { "type": "eq", "tex": "(1-x)^{-2} = 1 + 2x + 3x^2 + 4x^3 + \\dots" },
      { "type": "eq", "tex": "x(1-x)^{-2} = x + 2x^2 + 3x^3 + 4x^4 + \\dots" }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 25 — Types of Distributions
  // ══════════════════════════
  {
    id: "types_of_distributions",
    label: "25 · Distributions",
    title: "25. Types of Distributions",
    content: [
      { type: "heading", text: "25.1  Classification of Random Variables" },
      { type: "para", text: "Random variables are broadly classified into Continuous (C.R.V.) and Discrete (D.R.V.), each utilizing a specific probability function and specific standard distributions:" },
      { type: "table",
        headers: ["Category", "Function Used", "Standard Distributions"],
        rows: [
          ["<b>Continuous Random Variable (C.R.V.)</b>", "<b>P.D.F.</b> (Probability Density Function)", "Uniform, Triangular, Gaussian, Rayleigh, Exponential, Laplacian, Cauchy"],
          ["<b>Discrete Random Variable (D.R.V.)</b>", "<b>P.M.F.</b> (Probability Mass Function)", "Binomial, Poisson's"]
        ]
      },
      
      { type: "heading", text: "25.2  Expected Value of a Geometric Sequence (Dice Problem)" },
      { type: "para", text: "<b>Question:</b> A dice is Rolled until 3 is observed for the first time. Calculate the expected value of number of times dice Rolled." },
      { type: "para", text: "<b>Mathematical Derivation:</b> The sample space represents the number of rolls until a '3' appears. Let \\(X\\) be the number of rolls. This is a Discrete Random Variable (D.R.V.)." },
      { type: "eq", tex: "S = \\{3, \\bar{3}3, \\bar{3}\\bar{3}3, \\dots\\}" },
      { type: "eq", tex: "X = \\{1, 2, 3, \\dots\\} \\implies D.R.V." },
      { type: "para", text: "Applying the Expectation formula for a D.R.V.:" },
      { type: "eq", tex: "E[\\text{no. of times dice Rolled}] = E[X] = \\sum_{i} x_i P\\{X=x_i\\}" },
      { type: "eq", tex: "E[X] = 1P(X=1) + 2P(X=2) + 3P(X=3) + 4P(X=4) + \\dots" },
      { type: "para", text: "The probability of rolling a 3 is \\(1/6\\), and the probability of not rolling a 3 is \\(5/6\\):" },
      { type: "eq", tex: "E[X] = 1 \\times \\frac{1}{6} + 2 \\left(\\frac{5}{6}\\right)\\left(\\frac{1}{6}\\right) + 3 \\left(\\frac{5}{6}\\right)^2 \\left(\\frac{1}{6}\\right) + \\dots" },
      { type: "para", text: "Factor out \\(1/6\\) and define \\(x = 5/6\\) to match the infinite series expansion \\((1-x)^{-2}\\):" },
      { type: "eq", tex: "E[X] = \\frac{1}{6} \\left\\{ 1 + 2\\left(\\frac{5}{6}\\right) + 3\\left(\\frac{5}{6}\\right)^2 + \\dots \\right\\} = \\frac{1}{6} (1 - x)^{-2}" },
      { type: "eq", tex: "E[X] = \\frac{1}{6} \\left(1 - \\frac{5}{6}\\right)^{-2} = \\frac{1}{6} \\left(\\frac{1}{6}\\right)^{-2} = \\frac{1}{6} \\times 36 = 6" }
    ]
  },

  // ══════════════════════════
  // CHAPTER 26 — Uniform Distribution
  // ══════════════════════════
  {
    id: "uniform_distribution",
    label: "26 · Uniform C.R.V.",
    title: "26. Distribution of C.R.V. (Uniform Distribution)",
    content: [
      
      // --- SECTION: UNIFORM INTRO ---
      { type: "heading", text: "26.1  Uniform Distribution Definition" },
      { type: "para", text: "A Continuous Random Variable (C.R.V.) is uniformly distributed between boundaries \\(a\\) and \\(b\\) if it has a constant (uniform) Probability Density Function (PDF) across that entire interval." },
      { type: "list", items: [
          "<b>Standard Notation:</b> \\(X \\sim U[a, b]\\)",
          "<b>Nomenclature:</b> Referred to as a \"uniform R.V.\""
        ]
      },

      // --- SECTION: INTERACTIVE GRAPHS ---
      { type: "heading", text: "26.2  Interactive Uniform Distribution Graphs" },
      { type: "para", text: "The PDF forms a flat rectangular block (to maintain a total area of 1), while the CDF forms a linear ramp integrating that area over time." },
      { type: "canvas_sim_select", simId: "uniform_dist_sim", height: 260, controlLabel: "Select Function to View:",
        options: [
          { value: "pdf", text: "1. Probability Density Function (P.D.F)" },
          { value: "cdf", text: "2. Cumulative Distribution Function (CDF)" }
        ]
      },

      // --- SECTION: PDF DEFINITIONS ---
      { type: "heading", text: "26.3  Mathematical Forms of the PDF" },
      { type: "para", text: "The PDF of a Uniform Distribution can be expressed mathematically in three equivalent ways. Notice that the height of the PDF must be \\(\\frac{1}{b-a}\\) to ensure the total area \\(\\int_{-\\infty}^{\\infty} f_X(x)dx = 1\\)." },
      { type: "list", items: [
          "<b>1. Using Unit Step Functions:</b> <br>\\(f_X(x) = \\frac{1}{(b-a)} [u(x-a) - u(x-b)]\\)",
          "<b>2. Strict Piecewise:</b> <br>\\(f_X(x) = \\begin{cases} 0 & : x < a \\\\ \\frac{1}{b-a} & : a \\le x \\le b \\\\ 0 & : x > b \\end{cases}\\)",
          "<b>3. Compact Piecewise:</b> <br>\\(f_X(x) = \\begin{cases} \\frac{1}{b-a} & : a \\le x \\le b \\\\ 0 & : \\text{elsewhere} \\end{cases}\\)"
        ]
      },

      // --- SECTION: CDF DEFINITION ---
      { type: "heading", text: "26.4  Mathematical Form of the CDF" },
      { type: "para", text: "The Cumulative Distribution Function (CDF) integrates the PDF, resulting in a ramp that rises linearly from 0 at boundary \\(a\\) to 1 at boundary \\(b\\)." },
      { type: "eq", tex: "F_X(x) = \\begin{cases} 0 & : x < a \\\\ \\frac{x-a}{b-a} & : a \\le x \\le b \\\\ 1 & : x > b \\end{cases}" },

      // --- SECTION: STATISTICAL AVERAGES ---
      { type: "heading", text: "26.5  Statistical Averages for \\(X \\sim U[a, b]\\)" },
      { type: "para", text: "For a Uniform Random Variable, the moments and variance evaluate to the following standard formulas via integration:" },
      { type: "list", items: [
          "<b>1. Mean (First Moment):</b> <br>\\(E[X] = \\int_{-\\infty}^{\\infty} x f_X(x) dx = \\int_{a}^{b} \\frac{x}{(b-a)} dx = \\frac{a+b}{2}\\)",
          "<b>2. Mean Square Value (Second Moment):</b> <br>\\(E[X^2] = \\int_{-\\infty}^{\\infty} x^2 f_X(x) dx = \\int_{a}^{b} \\frac{x^2}{(b-a)} dx = \\frac{(b^3-a^3)}{3(b-a)} = \\frac{a^2+b^2+ab}{3}\\)",
          "<b>3. Variance:</b> <br>\\(\\sigma_x^2 = E[X^2] - (E[X])^2 = \\frac{(b-a)^2}{12}\\)"
        ]
      },

      // --- SECTION: POINT PROBABILITY ---
      { type: "heading", text: "26.6  Probability at a Point" },
      { type: "para", text: "Because the Uniform Distribution is a Continuous Random Variable, it contains no impulses. Therefore, the probability of the variable taking any exact point value \\(c\\) (where \\(a \\le c \\le b\\)) is strictly zero." },
      { type: "eq", tex: "P\\{X = c\\} = \\int_{c^-}^{c^+} f_X(x)dx = F_X(c^+) - F_X(c^-) = 0" }
    ]
  },
  // ══════════════════════════
  // CHAPTER 27 — Uniform Problems
  // ══════════════════════════
  {
    id: "uniform_problems",
    label: "27 · Uniform Probs",
    title: "27. Uniform Distribution Problem Solving",
    content: [
      { type: "heading", text: "27.1  Symmetric Uniform Distribution Examples" },
      { type: "para", text: "When a Uniform Continuous Random Variable is centered at the origin (ranging from \\(-m\\) to \\(m\\)), its basic parameters simplify significantly." },
      { type: "list", items: [
          "<b>Mean:</b> \\(E[X] = 0\\)",
          "<b>Variance / MSV:</b> \\(E[X^2] = \\sigma_x^2 = \\frac{m^2}{3}\\)"
      ]},
      { type: "para", text: "<b>Example 1:</b> Given a uniform PDF \\(f_X(x)\\) spanning from -5 to 5. Find the constant \\(K\\), Mean, and Variance." },
      { type: "list", items: [
          "<b>Total Area = 1:</b> \\(K \\times (5 - (-5)) = 1 \\implies 10K = 1 \\implies K = \\frac{1}{10}\\)",
          "<b>Mean:</b> \\(E[X] = \\frac{5 + (-5)}{2} = 0\\)",
          "<b>Mean Square Value:</b> \\(E[X^2] = \\frac{5^2 + 5^2 + (5)(-5)}{3} = \\frac{25}{3}\\)",
          "<b>Variance:</b> \\(\\sigma_x^2 = \\frac{25}{3}\\)"
      ]},
      { type: "canvas_sim", simId: "uniform_symmetric_sim", height: 220, controlLabel: "Boundary parameter (m):", min: 1, max: 10, step: 1, defaultVal: 5 }
    ]
  },

  // ══════════════════════════
  // CHAPTER 28 — Triangular Distribution
  // ══════════════════════════
  {
    id: "triangular_distribution",
    label: "28 · Triangular Dist",
    title: "28. Triangular Distribution",
    content: [
      { type: "heading", text: "28.1  General Triangular Distribution" },
      { type: "para", text: "<b>Standard Notation:</b> \\(X \\sim \\Delta[a, m, b]\\) or \\(X \\sim tri[a, m, b]\\)." },
      { type: "para", text: "A triangular PDF begins at \\(x = a\\), reaches its peak mode at \\(x = m\\), and terminates at \\(x = b\\)." },
      { type: "list", items: [
          "<b>Peak Height:</b> To ensure the total integrated area is 1, the maximum value of the PDF at \\(x = m\\) is \\(f_X(m) = \\frac{2}{(b-a)}\\).",
          "<b>Expected Value (Mean):</b> \\(E[X] = \\frac{a + m + b}{3}\\)."
      ]},
      { type: "heading", text: "28.2  Symmetric Triangular Distribution" },
      { type: "para", text: "If the distribution is perfectly symmetric around the y-axis, starting at \\(-m\\) and ending at \\(m\\), its peak sits exactly at the origin (0):" },
      { type: "list", items: [
          "<b>Peak Height:</b> \\(f_X(0) = \\frac{1}{m}\\)",
          "<b>Mean:</b> \\(E[X] = \\frac{-m + 0 + m}{3} = 0\\)",
          "<b>Variance / MSV:</b> \\(E[X^2] = \\sigma_x^2 = \\frac{m^2}{6}\\)"
      ]},
      { type: "canvas_sim", simId: "triangular_symmetric_sim", height: 220, controlLabel: "Boundary parameter (m):", min: 1, max: 10, step: 1, defaultVal: 5 }
    ]
  },

  // ══════════════════════════
  // CHAPTER 29 — Gaussian (Normal) Distribution
  // ══════════════════════════
  {
    id: "gaussian_distribution",
    label: "29 · Gaussian (Normal)",
    title: "29. Gaussian or Normal Distribution",
    content: [
      { type: "heading", text: "29.1  Definition & Nomenclature" },
      { type: "list", items: [
          "If a CRV is having a Gaussian distribution, it means the PDF of the CRV is having a \"GAUSSIAN SHAPE\".",
          "If the PDF of a CRV is of Gaussian shape, then the CRV is called a Gaussian R.V.."
      ]},
      { type: "para", text: "<b>Standard Notation:</b> \\(X \\sim N[\\mu_x, \\sigma_x^2]\\)." },
      { type: "list", items: [
          "\\(X \\sim N[\\mu_x, \\sigma_x^2] \\rightarrow\\) X is a GRV with mean = \\(\\mu_x\\), variance = \\(\\sigma_x^2\\).",
          "\\(X \\sim N[0, \\sigma_x^2] \\rightarrow\\) X is a GRV with mean = 0, variance = \\(\\sigma_x^2\\).",
          "\\(X \\sim N[0, 1] \\rightarrow\\) X is a Zero mean unit variance GRV (Standard Normal).",
          "\\(X \\sim N[4, 4] \\rightarrow\\) X is a GRV with mean = 4, variance = 4."
      ]},

      { type: "heading", text: "29.2  PDF Equation" },
      { type: "para", text: "The Probability Density Function of a Gaussian Random Variable relies on an exponential decay bounded by the variance:" },
      { type: "eq", tex: "f_X(x) = \\frac{1}{\\sqrt{2\\pi\\sigma_x^2}} e^{\\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}} \\quad : -\\infty < x < \\infty" },

      { type: "heading", text: "29.3  Properties of the Gaussian PDF" },
      { type: "para", text: "Visualizing the Gaussian PDF reveals several crucial properties:" },
      { type: "list", items: [
          "<b>Bell Shape:</b> The curve is perfectly symmetric around its mean \\(\\mu_x\\).",
          "<b>Area Split:</b> The area to the left of the mean is 1/2, and the area to the right is 1/2.",
          "<b>Maximum Value:</b> The absolute peak of the distribution occurs exactly at the mean. \\(\\{f_X(x)\\}_{\\max} = f_X(\\mu_x)\\).",
          "<b>Point Probability:</b> Like all continuous random variables, the probability at any exact point is zero: \\(P\\{X = c\\} = 0\\)."
      ]},
      { type: "canvas_sim_dual", simId: "gaussian_pdf_sim", height: 260, controlLabel1: "Mean (μ):", min1: -5, max1: 5, step1: 1, defaultVal1: 0, controlLabel2: "Variance (σ²):", min2: 0.5, max2: 5, step2: 0.5, defaultVal2: 1 },

      { type: "heading", text: "29.4  Integration Trick (Area under Gaussian)" },
      { type: "para", text: "By the axioms of probability, the total area under the normalized Gaussian PDF must equal exactly 1:" },
      { type: "eq", tex: "\\int_{-\\infty}^{\\infty} \\frac{1}{\\sqrt{2\\pi\\sigma_x^2}} e^{\\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}} dx = 1" },
      { type: "para", text: "This allows us to evaluate complex exponential integrals rapidly without manual integration by matching them to the standard Gaussian form. Extracting the normalization constant yields:" },
      { type: "eq", tex: "\\int_{-\\infty}^{\\infty} e^{\\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}} dx = \\sqrt{2\\pi\\sigma_x^2}" },
      { type: "para", text: "<b>Example Problem:</b> Evaluate \\(\\int_{-\\infty}^{\\infty} e^{\\frac{-(x-2)^2}{5}} dx\\)." },
      { type: "list", items: [
          "Compare the exponent to the standard form: \\(\\frac{-(x-2)^2}{5} \\equiv \\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}\\).",
          "This yields \\(2\\sigma_x^2 = 5 \\implies \\sigma_x^2 = 2.5\\).",
          "The integral evaluates to \\(\\sqrt{2\\pi\\sigma_x^2}\\). Substituting \\(2\\sigma_x^2 = 5\\) gives \\(\\sqrt{5\\pi}\\)."
      ]}
    ]
  },
  // ══════════════════════════
  // CHAPTER 30 — Gaussian Integration Tricks
  // ══════════════════════════
  {
    id: "gaussian_integration",
    label: "30 · Gaussian Tricks",
    title: "30. Gaussian PDF Integration & Problem Solving",
    content: [
      
      // --- SECTION: HALF AREAS ---
      { type: "heading", text: "30.1 Gaussian Symmetry (Half Areas)" },
      { type: "para", text: "Because the Gaussian PDF is perfectly symmetric around its mean (\\(\\mu_x\\)), integrating from the mean to either infinity or negative infinity always yields exactly half the total area (0.5)." },
      { type: "eq", tex: "\\int_{\\mu_x}^{\\infty} \\underbrace{\\frac{1}{\\sqrt{2\\pi\\sigma_x^2}} e^{\\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}}}_{\\text{VALID PDF}} dx = \\frac{1}{2}" },
      { type: "eq", tex: "\\int_{-\\infty}^{\\mu_x} \\underbrace{\\frac{1}{\\sqrt{2\\pi\\sigma_x^2}} e^{\\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}}}_{\\text{VALID PDF}} dx = \\frac{1}{2}" },

      // --- SECTION: EXPECTED VALUE EXTRACTION ---
      { type: "heading", text: "30.2 Extracting Moments via PDF Matching" },
      { type: "para", text: "When evaluating integrals where a variable (like \\(x\\) or \\(x^2\\)) is multiplied by a valid Gaussian PDF over the entire space, you don't need to integrate manually. The integral perfectly maps to the definitions of Expected Value and Mean Square Value." },
      { type: "eq", tex: "\\int_{-\\infty}^{\\infty} x \\cdot \\underbrace{\\frac{1}{\\sqrt{2\\pi\\sigma_x^2}} e^{\\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}}}_{\\text{VALID PDF}} dx = E[X] = \\mu_x" },
      { type: "eq", tex: "\\int_{-\\infty}^{\\infty} x^2 \\cdot \\underbrace{\\frac{1}{\\sqrt{2\\pi\\sigma_x^2}} e^{\\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}}}_{\\text{VALID PDF}} dx = E[X^2] = \\mu_x^2 + \\sigma_x^2" },

      // --- SECTION: TRICK 1 - e^(-5x^2) ---
      { type: "heading", text: "30.3 Trick: Forcing a Valid PDF (Example 1)" },
      { type: "para", text: "<b>Question:</b> Evaluate \\(\\int_{-\\infty}^{\\infty} e^{-5x^2} dx\\)." },
      { type: "para", text: "<b>Step 1: Match the exponent to the standard form.</b> We need the exponent to look like \\(\\frac{-x^2}{2\\sigma_x^2}\\)." },
      { type: "eq", tex: "-5x^2 = \\frac{-x^2}{(1/5)} \\implies 2\\sigma_x^2 = \\frac{1}{5}" },
      { type: "para", text: "<b>Step 2: Find the required normalization constant.</b> The denominator of a standard Gaussian PDF is \\(\\sqrt{2\\pi\\sigma_x^2}\\). Substituting our value:" },
      { type: "eq", tex: "\\sqrt{2\\pi\\sigma_x^2} = \\sqrt{\\pi \\left(\\frac{1}{5}\\right)} = \\sqrt{\\frac{\\pi}{5}}" },
      { type: "para", text: "<b>Step 3: Multiply and divide to create a valid PDF.</b>" },
      { type: "eq", tex: "\\sqrt{\\frac{\\pi}{5}} \\left\\{ \\int_{-\\infty}^{\\infty} \\underbrace{\\frac{1}{\\sqrt{\\pi/5}} e^{\\frac{-x^2}{1/5}}}_{\\text{VALID PDF}} dx \\right\\}" },
      { type: "para", text: "Since the integral of a valid PDF from \\(-\\infty\\) to \\(\\infty\\) is strictly 1, the final answer is simply the constant we pulled out:" },
      { type: "eq", tex: "= \\sqrt{\\frac{\\pi}{5}}" },

      // --- SECTION: TRICK 2 - EVEN FUNCTION ---
      { type: "heading", text: "30.4 Trick: Even Function Bounds (Example 2)" },
      { type: "para", text: "<b>Question:</b> Evaluate \\(\\int_{0}^{\\infty} e^{-3x^2} dx\\)." },
      { type: "para", text: "<b>Step 1: Exploit the Even Property.</b> The function \\(e^{-3x^2}\\) is perfectly symmetric across the y-axis. Integrating from \\(0\\) to \\(\\infty\\) is exactly half the area of integrating from \\(-\\infty\\) to \\(\\infty\\)." },
      { type: "eq", tex: "\\int_{0}^{\\infty} e^{-3x^2} dx = \\frac{1}{2} \\int_{-\\infty}^{\\infty} e^{-3x^2} dx" },
      { type: "para", text: "<b>Step 2: Force the valid PDF.</b> Rewrite the exponent to find \\(2\\sigma_x^2 = 1/3\\). The required normalization constant is \\(\\sqrt{\\pi/3}\\)." },
      { type: "eq", tex: "= \\frac{1}{2} \\sqrt{\\frac{\\pi}{3}} \\int_{-\\infty}^{\\infty} \\underbrace{\\frac{1}{\\sqrt{\\pi/3}} e^{\\frac{-x^2}{1/3}}}_{\\text{VALID PDF}} dx" },
      { type: "eq", tex: "= \\frac{1}{2} \\sqrt{\\frac{\\pi}{3}}" },

      // --- SECTION: INTERACTIVE ---
      { type: "heading", text: "30.5 Interactive Gaussian Area Tricks" },
      { type: "para", text: "Select a problem type below to visualize how the integration bounds and standard deviation visually affect the total area calculation." },
      { type: "canvas_sim_select", simId: "gaussian_tricks_sim", height: 320, controlLabel: "Select Integration Problem:",
        options: [
          { value: "half", text: "1. Half Area: μ to ∞ for Valid PDF" },
          { value: "trick1", text: "2. Full Area trick: ∫ e^(-5x²) dx" },
          { value: "trick2", text: "3. Even Function: ∫ e^(-3x²) from 0 to ∞" }
        ]
      }
    ]
  },
  // ══════════════════════════
  // CHAPTER 31 — Q-Function & Gaussian
  // ══════════════════════════
  {
    id: "q_function",
    label: "31 · Q-Function",
    title: "31. Q-Function & Gaussian Probabilities",
    content: [
      
      // --- SECTION: EXPECTED VALUE TRICK ---
      { type: "heading", text: "31.1 Advanced Integration Trick: Extracting Moments" },
      { type: "para", text: "<b>Question:</b> Evaluate \\(I = \\int_{-\\infty}^{\\infty} x^2 e^{\\frac{-(x-4)^2}{12}} dx\\)." },
      { type: "para", text: "<b>Step 1: Match the exponent to find Mean and Variance.</b>" },
      { type: "eq", tex: "\\frac{-(x-4)^2}{12} \\equiv \\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}" },
      { type: "para", text: "By comparison: \\(\\mu_x = 4\\) and \\(2\\sigma_x^2 = 12 \\implies \\sigma_x^2 = 6\\)." },
      { type: "para", text: "<b>Step 2: Find the normalization constant.</b> The required denominator for a valid PDF is \\(\\sqrt{2\\pi\\sigma_x^2}\\). Substituting our value yields \\(\\sqrt{12\\pi}\\)." },
      { type: "para", text: "<b>Step 3: Multiply and divide to create a valid PDF, revealing the Expected Value.</b>" },
      { type: "eq", tex: "I = \\sqrt{12\\pi} \\int_{-\\infty}^{\\infty} x^2 \\underbrace{\\left[ \\frac{1}{\\sqrt{12\\pi}} e^{\\frac{-(x-4)^2}{12}} \\right]}_{\\text{VALID PDF}} dx" },
      { type: "para", text: "Because integrating \\(x^2 \\cdot f_X(x)\\) over all space is the definition of the second moment \\(E[X^2]\\):" },
      { type: "eq", tex: "I = \\sqrt{12\\pi} E[X^2]" },
      { type: "para", text: "<b>Step 4: Substitute the Variance relation.</b> Recall that \\(E[X^2] = \\sigma_x^2 + \\mu_x^2\\):" },
      { type: "eq", tex: "I = \\sqrt{12\\pi} [\\sigma_x^2 + \\mu_x^2] = \\sqrt{12\\pi} [6 + 16] = 22\\sqrt{12\\pi}" },

      // --- SECTION: Q-FUNCTION INTRO ---
      { type: "heading", text: "31.2 The Q-Function Definition" },
      { type: "para", text: "Directly integrating the Gaussian PDF to find probabilities is mathematically difficult because it lacks a closed-form anti-derivative. To solve this, we use the standard <b>Q-function</b>, which calculates the right-tail probability of a Standard Normal distribution (zero mean, unit variance)." },
      { type: "eq", tex: "Q(x) = \\int_{z=x}^{\\infty} \\frac{1}{\\sqrt{2\\pi}} e^{\\frac{-z^2}{2}} dz \\quad \\text{for } -\\infty < x < \\infty" },

      // --- SECTION: Q-FUNCTION PROPERTIES ---
      { type: "heading", text: "31.3 Properties of the Q-Function" },
      { type: "para", text: "Because the Standard Normal distribution is perfectly symmetrical and has a total area of 1, the Q-function exhibits several strictly defined properties:" },
      { type: "list", items: [
          "<b>1. Origin:</b> \\(Q(0) = 1/2\\) (Exactly half the area is to the right of the mean).",
          "<b>2. Extreme Left:</b> \\(Q(-\\infty) = 1\\) (The entire area is to the right of negative infinity).",
          "<b>3. Extreme Right:</b> \\(Q(\\infty) = 0\\) (No area exists to the right of positive infinity).",
          "<b>4. Symmetry Rule:</b> \\(Q(x) + Q(-x) = 1\\).",
          "<b>5. Monotonicity:</b> As \\(x \\uparrow\\) (increases), the tail area \\(Q(x) \\downarrow\\) (decreases)."
        ]
      },

      // --- SECTION: PROBABILITY P(X > a) ---
      { type: "heading", text: "31.4 Calculating Probabilities: \\(P(X > a)\\)" },
      { type: "para", text: "To calculate the probability that a random variable \\(X\\) exceeds a threshold \\(a\\), the method splits based on whether \\(X\\) is Gaussian:" },
      { type: "table",
        headers: ["If \\(X\\) is...", "Calculation Method"],
        rows: [
          ["<b>Non-Gaussian</b>", "Must integrate the PDF manually: <br>\\(P(X > a) = \\int_{a}^{\\infty} f_X(x) dx\\)"],
          ["<b>Gaussian (GRV)</b>", "Scale the limit using the Q-function: <br>\\(P(X > a) = Q\\left( \\frac{a - \\mu_x}{\\sigma_x} \\right)\\)"]
        ]
      },

      // --- SECTION: CDF OF GRV ---
      { type: "heading", text: "31.5 CDF of a Gaussian Random Variable (GRV)" },
      { type: "para", text: "If \\(X \\sim N(\\mu_x, \\sigma_x^2)\\), the Cumulative Distribution Function (CDF) \\(F_X(z)\\) is defined as the probability that \\(X \\le z\\). Using the complement rule, we can express the CDF entirely in terms of the Q-function:" },
      { type: "eq", tex: "F_X(z) = P(X \\le z) = 1 - P(X > z)" },
      { type: "para", text: "Writing this using the standard PDF integration:" },
      { type: "eq", tex: "F_X(z) = 1 - \\int_{z}^{\\infty} \\frac{1}{\\sqrt{2\\pi\\sigma_x^2}} e^{\\frac{-(x-\\mu_x)^2}{2\\sigma_x^2}} dx \\quad \\text{(Mathematically Difficult)}" },
      { type: "para", text: "Converting this to the normalized Q-function yields the standard Gaussian CDF formula:" },
      { type: "eq", tex: "F_X(z) = 1 - Q\\left( \\frac{z - \\mu_x}{\\sigma_x} \\right)" },

      // --- SECTION: INTERACTIVE ---
      { type: "heading", text: "31.6 Interactive Q-Function Visualizer" },
      { type: "para", text: "Explore how the Q-function maps the right-tail area of a Standard Normal distribution, and how its symmetry properties function visually." },
      { type: "canvas_sim_select", simId: "q_function_sim", height: 340, controlLabel: "Select Q-Function Visualization:",
        options: [
          { value: "tail", text: "1. Standard Tail Probability: Q(x)" },
          { value: "symmetry", text: "2. Symmetry Rule: Q(x) + Q(-x) = 1" },
          { value: "cdf", text: "3. Gaussian CDF: F(x) = 1 - Q(x)" }
        ]
      }
    ]
  },
  // ══════════════════════════
  // CHAPTER 32 — Gaussian Numericals
  // ══════════════════════════
  {
    id: "gaussian_numericals",
    label: "32 · Gaussian Numericals",
    title: "32. Numericals on Probability & G.R.V.",
    content: [
      
      // --- SECTION: P(X > a) ---
      { type: "heading", text: "32.1 Tail Probability: P(X > a)" },
      { type: "para", text: "When calculating the probability that a random variable exceeds a threshold \\(a\\), the mathematical approach diverges depending on whether the variable is Gaussian:" },
      { type: "list", items: [
          "<b>X : Non Gaussian:</b> Must be solved by directly integrating the Probability Density Function (PDF) from \\(a\\) to infinity.",
          "<b>X : Gaussian:</b> The integral evaluates to the standard Q-function, bypassing the need for manual integration."
        ]
      },
      { type: "eq", tex: "P(X > a) = \\begin{cases} \\int_{a}^{\\infty} f_X(x)dx & X: \\text{Non Gaussian} \\\\ Q\\left(\\frac{a - \\mu_X}{\sigma_X}\\right) & X: \\text{Gaussian} \\end{cases}" },

      // --- SECTION: CDF OF GRV ---
      { type: "heading", text: "32.2 CDF of a Gaussian Random Variable" },
      { type: "para", text: "The Cumulative Distribution Function (CDF), \\(F_X(z)\\), represents the probability that the variable is less than or equal to \\(z\\). Using the complement rule, we define it entirely in terms of the Q-function:" },
      { type: "eq", tex: "F_X(z) = P(X \\le z) = 1 - P(X > z)" },
      { type: "eq", tex: "F_X(z) = 1 - Q\\left(\\frac{z - \\mu_X}{\sigma_X}\\right)" },

      // --- SECTION: GRV GRAPHS ---
      { type: "heading", text: "32.3 Visualizing the G.R.V. Distributions" },
      { type: "para", text: "The Gaussian PDF forms a symmetric bell curve peaking at the mean \\(\\mu_X\\), where its maximum amplitude is \\(\\frac{1}{\\sqrt{2\\pi\\sigma_X^2}}\\). Its corresponding CDF forms an S-curve (sigmoid) that evaluates to exactly \\(1/2\\) at the mean." },
      { type: "canvas_sim_select", simId: "grv_pdf_cdf_sim", height: 280, controlLabel: "Select G.R.V. Function View:", 
        options: [ 
          { value: "pdf", text: "1. f_X(z) [Probability Density Function]" }, 
          { value: "cdf", text: "2. F_X(z) [Cumulative Distribution Function]" } 
        ] 
      },

      // --- SECTION: Q-FUNCTION AREA ---
      { type: "heading", text: "32.4 Important Points: Q-Function Area" },
      { type: "para", text: "For a Gaussian Random Variable denoted as \\(X \\sim N(\\mu_X, \\sigma_X^2)\\), the Q-function explicitly represents the shaded right-tail area under the PDF curve from a threshold \\(a\\) to infinity." },
      { type: "eq", tex: "P(X > a) = Q\\left(\\frac{a - \\mu_X}{\sigma_X}\\right)" },
      { type: "canvas_sim", simId: "q_tail_area_sim", height: 220, controlLabel: "Threshold (a) Offset:", min: 0, max: 3, step: 0.1, defaultVal: 1.0 },

      // --- SECTION: INTERVAL PROBABILITIES ---
      { type: "heading", text: "32.5 Interval Probabilities for G.R.V." },
      { type: "para", text: "To find the probability that a Gaussian random variable falls within a defined boundary \\(a < X \\le b\\), we subtract the evaluated CDFs at those boundaries. Notice how the terms swap positions due to the \\(1 - Q()\\) substitution:" },
      { type: "eq", tex: "P(a < X \\le b) = F_X(b^+) - F_X(a^+)" },
      { type: "eq", tex: "= \\left\\{1 - Q\\left(\\frac{b^+ - \\mu_X}{\sigma_X}\\right)\\right\\} - \\left\\{1 - Q\\left(\\frac{a^+ - \\mu_X}{\sigma_X}\\right)\\right\\}" },
      { type: "eq", tex: "P(a < X \\le b) = Q\\left(\\frac{a^+ - \\mu_X}{\sigma_X}\\right) - Q\\left(\\frac{b^+ - \\mu_X}{\sigma_X}\\right)" },

      // --- SECTION: MASTER SUMMARY TABLE ---
      { type: "heading", text: "32.6 Master Summary: Non-Gaussian vs. Gaussian R.V." },
      { type: "table",
        headers: ["Property", "X : Non Gaussian R.V.", "X : G.R.V."],
        rows: [
          ["<b>PDF</b> \\(f_X(x)\\)", "General", "\\(\\frac{1}{\\sqrt{2\\pi\\sigma_X^2}} e^{\\frac{-(x-\\mu_X)^2}{2\\sigma_X^2}}\\)"],
          ["<b>CDF</b> \\(F_X(x)\\)", "General", "\\(1 - Q\\left(\\frac{x - \\mu_X}{\sigma_X}\\right)\\)"],
          ["<b>Interval</b> \\(P(a < X \\le b)\\)", "\\(F_X(b^+) - F_X(a^+) = \\int_{a^+}^{b^+} f_X(x) dx\\)", "\\(Q\\left(\\frac{a^+ - \\mu_X}{\sigma_X}\\right) - Q\\left(\\frac{b^+ - \\mu_X}{\sigma_X}\\right)\\)"]
        ]
      }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 33 — Bivariate R.V. & Joint PDF
  // ══════════════════════════
  {
    "id": "bivariate_rv",
    "label": "33 · Bivariate R.V.",
    "title": "33. Joint PDF and Bivariate Random Variables",
    "content": [

      // --- SECTION: NOTATION ---
      { "type": "heading", "text": "33.1 Notation: Single vs. Bivariate R.V." },
      { "type": "para", "text": "When moving from single events to multiple variables, the notation expands from standard probability to joint probability densities." },
      { "type": "table",
        "headers": ["Concept", "Single Variable", "Bivariate (Two Variables)"],
        "rows": [
          ["<b>Event Probability</b>", "\\(A \\rightarrow P(A)\\)<br>\\(B \\rightarrow P(B)\\)", "\\(A \\cap B \\rightarrow P(A \\cap B)\\)"],
          ["<b>Probability Density Function (PDF)</b>", "\\(X \\rightarrow f_X(x)\\)<br>\\(Y \\rightarrow f_Y(y)\\)", "<b>JOINT PDF</b> \\(\\rightarrow f_{XY}(x, y)\\)"]
        ]
      },

      // --- SECTION: PROBABILITY IN 2D REGION ---
      { "type": "heading", "text": "33.2 Probability in a 2-D Region" },
      { "type": "para", "text": "To find the probability that the variables \\(X\\) and \\(Y\\) fall within a specific 2-D region, we must perform a double integration of the Joint PDF over that region:" },
      { "type": "eq", "tex": "P(X, Y \\in \\text{2-D Region}) = \\iint_R f_{XY}(x,y) dx dy" },
      { "type": "para", "text": "The region of integration \\(R\\) is the intersection of two distinct areas: \\(R = R_1 \\cap R_2\\)" },
      { "type": "list", "items": [
          "<b>\\(R_1\\):</b> The 2-D region in which the probability needs to be calculated (e.g., \\(X+Y \\ge 3\\)).",
          "<b>\\(R_2\\):</b> The 2-D region in which the Joint PDF actually exists (given in the problem definition)."
        ]
      },

      // --- SECTION: COMPLEMENT RULE IN 2D ---
      { "type": "heading", "text": "33.3 Example & Complement Rule in 2D" },
      { "type": "para", "text": "If calculating a region directly is difficult, you can use the complement rule, just like in 1D probability:" },
      { "type": "eq", "tex": "P(X+Y \\ge 3) = \\iint_R f_{XY}(x,y) dx dy \\quad \\text{where } R = R_1 \\cap R_2" },
      { "type": "eq", "tex": "P(X+Y \\ge 3) = 1 - P(X+Y < 3) = 1 - \\iint_{R'} f_{XY}(x,y) dx dy" },
      { "type": "para", "text": "Here, \\(R' = R_1' \\cap R_2\\), where \\(R_1'\\) is the inverse condition (\\(X+Y < 3\\))." },

      // --- SECTION: INDEPENDENCE ---
      { "type": "heading", "text": "33.4 Independence of Random Variables" },
      { "type": "para", "text": "If \\(X\\) and \\(Y\\) are independent random variables, their Joint PDF breaks down into the product of their individual marginal PDFs. This allows the double integral to be separated:" },
      { "type": "eq", "tex": "P\\{(X, Y) \\in R_1\\} = \\iint_R f_{XY}(x,y) dx dy" },
      { "type": "table",
        "headers": ["Condition", "Joint PDF Property", "Integration Formula"],
        "rows": [
          ["<b>Not Independent</b>", "Cannot be separated", "\\(\\iint_R f_{XY}(x,y) dx dy\\)"],
          ["<b>Independent R.V.</b>", "\\(f_{XY}(x,y) = f_X(x) f_Y(y)\\)", "\\(\\iint_R f_X(x) f_Y(y) dx dy\\)"]
        ]
      },

      // --- SECTION: FINDING CONSTANT C ---
      { "type": "heading", "text": "33.5 Problem: Finding the Constant 'C' (Total Volume)" },
      { "type": "para", "text": "<b>Question:</b> Given the Joint PDF \\(f_{XY}(x,y) = Cxy\\) for the region \\(0 \\le x \\le 2\\) and \\(1 \\le y \\le 3\\) (and 0 elsewhere), find the value of \\(C\\)." },
      { "type": "para", "text": "<b>Concept:</b> Just as the total area under a 1D PDF is 1, the total volume under a valid Bivariate Joint PDF over its entire region of existence (\\(R_2\\)) must be 1." },
      { "type": "eq", "tex": "\\text{Single RV:} \\int_C f_X(x) dx = 1 \\quad \\implies \\quad \\text{Bivariate RV:} \\iint_{R_2} f_{XY}(x,y) dx dy = 1" },

      // --- SECTION: DOUBLE INTEGRATION BREAKDOWN ---
      { "type": "heading", "text": "33.6 Step-by-Step Double Integration Breakdown" },
      { "type": "para", "text": "Here is exactly how sir solved the double integration problem to find \\(C=1/8\\). Because the limits for \\(x\\) and \\(y\\) are constants, we can integrate in either order. We will integrate with respect to \\(y\\) first (vertical strip), then \\(x\\)." },
      { "type": "eq", "tex": "\\int_{x=0}^{2} \\left( \\int_{y=1}^{3} C x y \\, dy \\right) dx = 1" },
      { "type": "para", "text": "<b>Step 1: Inner Integral (w.r.t \\(y\\)).</b> Treat \\(x\\) and \\(C\\) as constants. Pull them out of the inner integral:" },
      { "type": "eq", "tex": "C x \\int_{1}^{3} y \\, dy = C x \\left[ \\frac{y^2}{2} \\right]_{1}^{3} = C x \\left( \\frac{3^2}{2} - \\frac{1^2}{2} \\right) = C x \\left( \\frac{9}{2} - \\frac{1}{2} \\right) = 4Cx" },
      { "type": "para", "text": "<b>Step 2: Outer Integral (w.r.t \\(x\\)).</b> Substitute the result of the inner integral back into the outer integral:" },
      { "type": "eq", "tex": "\\int_{0}^{2} 4Cx \\, dx = 4C \\left[ \\frac{x^2}{2} \\right]_{0}^{2} = 4C \\left( \\frac{2^2}{2} - 0 \\right) = 4C(2) = 8C" },
      { "type": "para", "text": "<b>Step 3: Solve for C.</b> Set the total volume equal to 1:" },
      { "type": "eq", "tex": "8C = 1 \\implies C = \\frac{1}{8}" },

      // --- SECTION: 2D REGION GRAPH ---
      { "type": "heading", "text": "33.7 Interactive 2D Integration Region (Graph)" },
      { "type": "para", "text": "The graph below visualizes the region of existence \\(R_2\\). By taking a vertical strip (integrating w.r.t \\(y\\) first), we sum the values from \\(y=1\\) to \\(y=3\\). Then, the outer integral sweeps this vertical strip horizontally across the x-axis from \\(x=0\\) to \\(x=2\\)." },
      { "type": "canvas_sim", "simId": "double_integration_sim", "height": 280, "controlLabel": "Sweep Integration Strip (x):", "min": 0, "max": 2, "step": 0.05, "defaultVal": 1 }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 34 — Joint PDF: Triangular Regions
  // ══════════════════════════
  {
    "id": "triangular_joint_pdf",
    "label": "34 · 2D Integration",
    "title": "34. Joint PDF: Triangular Regions & Double Integration",
    "content": [

      // --- SECTION: PROBLEM SETUP ---
      { "type": "heading", "text": "34.1 Problem Setup: The Triangular Region" },
      { "type": "para", "text": "<b>Question:</b> Two random variables \\(X\\) and \\(Y\\) have a Joint PDF defined as \\(f_{XY}(x,y) = Kx\\) for the region bounded by \\((x \\ge 0) \\cap (y \\ge 0) \\cap (x+y \\le 1)\\). Find the constant \\(K\\) and evaluate \\(P(X < 1/2)\\)." },
      { "type": "para", "text": "<b>Step 1: Visualize the Region (\\(R_2\\)).</b> The intersection of these three conditions forms a right-angled triangle in the first quadrant, with vertices at \\((0,0)\\), \\((1,0)\\), and \\((0,1)\\). The slanted boundary line is \\(x+y=1\\)." },

      // --- SECTION: THE ARROW METHOD ---
      { "type": "heading", "text": "34.2 The 'Arrow Method' for Setting Limits" },
      { "type": "para", "text": "To solve the double integral \\(\\iint Kx \\, dxdy = 1\\), we must extract the mathematical limits from the geometric graph. Sir uses the <b>Arrow Method</b> (taking a differential strip) to determine these bounds:" },
      { "type": "list", "items": [
          "<b>1. Inner Limits (The Vertical Arrow):</b> Draw an arrow pointing straight up through the shaded region. <br>• The <b>tail</b> of the arrow touches the bottom boundary, which is the x-axis (\\(y=0\\)).<br>• The <b>head</b> of the arrow hits the slanted ceiling, which is the line \\(x+y=1\\) (rearranged as \\(y=1-x\\)).<br>• Therefore, our inner integral is with respect to \\(dy\\), spanning from \\(0\\) to \\(1-x\\).",
          "<b>2. Outer Limits (The Horizontal Sweep):</b> Imagine sliding that vertical arrow left and right to color in the entire triangle. <br>• It starts at the origin (\\(x=0\\)) and can slide all the way to the right corner (\\(x=1\\)).<br>• Therefore, our outer integral is with respect to \\(dx\\), spanning from \\(0\\) to \\(1\\)."
        ]
      },
      { "type": "eq", "tex": "\\int_{x=0}^{1} \\int_{y=0}^{1-x} Kx \\, dy \\, dx = 1" },

      // --- SECTION: SOLVING FOR K ---
      { "type": "heading", "text": "34.3 Solving for the Constant 'K'" },
      { "type": "para", "text": "Now, we execute the double integration step-by-step:" },
      { "type": "para", "text": "<b>Inner Integral (w.r.t \\(y\\)):</b> Treat \\(x\\) as a constant." },
      { "type": "eq", "tex": "\\int_{0}^{1-x} Kx \\, dy = Kx [y]_{0}^{1-x} = Kx(1-x) = Kx - Kx^2" },
      { "type": "para", "text": "<b>Outer Integral (w.r.t \\(x\\)):</b> Integrate the result." },
      { "type": "eq", "tex": "\\int_{0}^{1} (Kx - Kx^2) dx = K \\left[ \\frac{x^2}{2} - \\frac{x^3}{3} \\right]_{0}^{1} = K \\left( \\frac{1}{2} - \\frac{1}{3} \\right)" },
      { "type": "eq", "tex": "K \\left( \\frac{3}{6} - \\frac{2}{6} \\right) = K \\left( \\frac{1}{6} \\right)" },
      { "type": "para", "text": "Set equal to total volume (1) and solve:" },
      { "type": "eq", "tex": "\\frac{K}{6} = 1 \\implies K = 6" },
      { "type": "para", "text": "Our valid Joint PDF is <b>\\(f_{XY}(x,y) = 6x\\)</b>." },

      // --- SECTION: SUB-REGION PROBABILITY ---
      { "type": "heading", "text": "34.4 Calculating Probability in Sub-Regions: \\(P(X < 1/2)\\)" },
      { "type": "para", "text": "To find \\(P(X < 1/2)\\), Sir uses the <b>Complement Rule</b> because the region for \\(X \\ge 1/2\\) forms a simpler, smaller triangle (denoted \\(R_1'\\)) on the right side of the graph." },
      { "type": "eq", "tex": "P(X < 1/2) = 1 - P(X \\ge 1/2)" },
      { "type": "para", "text": "<b>Re-applying the Arrow Method for \\(R_1'\\):</b><br>We draw a new vertical arrow inside this smaller sub-region (from \\(x=1/2\\) to \\(x=1\\))." },
      { "type": "list", "items": [
          "<b>Inner:</b> Tail is still at \\(y=0\\), head still hits the slanted roof \\(y=1-x\\). Limits: \\(0\\) to \\(1-x\\).",
          "<b>Outer:</b> The arrow now only sweeps from \\(x=1/2\\) to \\(x=1\\)."
        ]
      },
      { "type": "eq", "tex": "P(X \\ge 1/2) = \\int_{1/2}^{1} \\int_{0}^{1-x} 6x \\, dy \\, dx" },
      { "type": "para", "text": "<b>Inner Integral:</b> \\(\\int_{0}^{1-x} 6x \\, dy = 6x(1-x) = 6x - 6x^2\\)" },
      { "type": "para", "text": "<b>Outer Integral:</b>" },
      { "type": "eq", "tex": "\\int_{1/2}^{1} (6x - 6x^2) dx = \\left[ 3x^2 - 2x^3 \\right]_{1/2}^{1} = (3 - 2) - \\left( 3\\left(\\frac{1}{4}\\right) - 2\\left(\\frac{1}{8}\\right) \\right)" },
      { "type": "eq", "tex": "= 1 - \\left( \\frac{3}{4} - \\frac{1}{4} \\right) = 1 - \\frac{2}{4} = 1 - 0.5 = 0.5" },
      { "type": "para", "text": "<b>Final Answer via Complement:</b>" },
      { "type": "eq", "tex": "P(X < 1/2) = 1 - 0.5 = 0.5" },

      // --- SECTION: SIMULATOR ---
      { "type": "heading", "text": "34.5 Interactive Arrow Method Visualizer" },
      { "type": "para", "text": "Select the integration phase below and drag the slider to sweep the integration arrow (strip) across the valid bounds. Notice how the top of the arrow mathematically follows the line \\(y = 1-x\\)." },
      { "type": "canvas_sim_select", "simId": "arrow_method_sim", "height": 380, "controlLabel": "Select Integration & Sweep (x):",
        "options": [
          { "value": "full", "text": "1. Finding K (Full Triangle R2)" },
          { "value": "sub", "text": "2. Sub-region (X ≥ 1/2)" },
        ]
      }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 35 — Joint PMF & Discrete Bivariate
  // ══════════════════════════
  {
    "id": "joint_pmf_drv",
    "label": "35 · Joint PMF",
    "title": "35. Joint PMF and Discrete Bivariate R.V.",
    "content": [

      // --- SECTION: THE JOINT PMF TABLE ---
      { "type": "heading", "text": "35.1 The Joint PMF Table & Marginals" },
      { "type": "para", "text": "For Discrete Bivariate Random Variables, the probabilities are organized into a <b>Joint PMF Table</b>. The inner cells represent the joint probability of intersection \\(P_{XY}(x,y)\\), while the outer edges represent the <b>Marginal PMFs</b> of the individual variables." },
      { "type": "table",
        "headers": ["\\(X \\setminus Y\\)", "\\(y_1\\)", "\\(y_2\\)", "\\(y_3\\)", "<b>Marginal PMF of \\(X\\) (\\(p_X\\))</b>"],
        "rows": [
          ["\\(x_1\\)", "\\(p_{XY}(x_1, y_1)\\)", "\\(p_{XY}(x_1, y_2)\\)", "\\(p_{XY}(x_1, y_3)\\)", "\\(p_X(x_1)\\) (Sum of Row 1)"],
          ["\\(x_2\\)", "\\(p_{XY}(x_2, y_1)\\)", "\\(p_{XY}(x_2, y_2)\\)", "\\(p_{XY}(x_2, y_3)\\)", "\\(p_X(x_2)\\) (Sum of Row 2)"],
          ["\\(x_3\\)", "\\(p_{XY}(x_3, y_1)\\)", "\\(p_{XY}(x_3, y_2)\\)", "\\(p_{XY}(x_3, y_3)\\)", "\\(p_X(x_3)\\) (Sum of Row 3)"],
          ["<b>Marginal \\(p_Y\\)</b>", "\\(p_Y(y_1)\\) (Sum of Col 1)", "\\(p_Y(y_2)\\) (Sum of Col 2)", "\\(p_Y(y_3)\\) (Sum of Col 3)", "<b>TOTAL SUM = 1</b>"]
        ]
      },
      { "type": "para", "text": "<b>Key Rule:</b> The sum of all elements inside the joint PMF grid must always equal exactly 1." },

      // --- SECTION: SOLVING PMF PROBLEM ---
      { "type": "heading", "text": "35.2 Problem: Finding Constant 'C' in Joint PMF" },
      { "type": "para", "text": "<b>Question:</b> The joint PMF of 2 RVs is given as \\(p_{XY}(x,y) = C(x^2 + 2y)\\) for \\(x = 0, 1, 2\\) and \\(y = 1, 2, 3, 4\\). Calculate \\(C\\), \\(P\\{(X=2)\\cap(Y=3)\\}\\), and \\(P\\{(X \\le 1)\\cap(Y > 2)\\}\\)." },
      { "type": "para", "text": "<b>Step 1: Construct the Table.</b> We evaluate the equation \\(C(x^2 + 2y)\\) for every possible pair of \\((x, y)\\):" },
      { "type": "list", "items": [
          "<b>For x = 0:</b> \\(C(0 + 2(1)) = 2C\\), \\(C(0 + 2(2)) = 4C\\), \\(C(0 + 2(3)) = 6C\\), \\(C(0 + 2(4)) = 8C\\). <b>Row Sum = 20C</b>",
          "<b>For x = 1:</b> \\(C(1^2 + 2(1)) = 3C\\), \\(C(1^2 + 2(2)) = 5C\\), \\(C(1^2 + 2(3)) = 7C\\), \\(C(1^2 + 2(4)) = 9C\\). <b>Row Sum = 24C</b>",
          "<b>For x = 2:</b> \\(C(2^2 + 2(1)) = 6C\\), \\(C(2^2 + 2(2)) = 8C\\), \\(C(2^2 + 2(3)) = 10C\\), \\(C(2^2 + 2(4)) = 12C\\). <b>Row Sum = 36C</b>"
        ]
      },
      { "type": "para", "text": "<b>Step 2: Solve for C.</b> The total sum of all marginal row probabilities must equal 1:" },
      { "type": "eq", "tex": "20C + 24C + 36C = 1 \\implies 80C = 1 \\implies C = \\frac{1}{80}" },

      // --- SECTION: SUBSET PROBABILITIES ---
      { "type": "heading", "text": "35.3 Calculating Subset Probabilities from the Table" },
      { "type": "para", "text": "<b>Q2: \\(P\\{(X=2)\\cap(Y=3)\\}\\)</b><br>We simply look up the intersection in our generated grid at row \\(x=2\\), column \\(y=3\\):" },
      { "type": "eq", "tex": "P\\{(X=2)\\cap(Y=3)\\} = 10C = 10 \\left(\\frac{1}{80}\\right) = \\frac{1}{8}" },
      
      { "type": "para", "text": "<b>Q3: \\(P\\{(X \\le 1)\\cap(Y > 2)\\}\\)</b><br>Identify the specific block of cells that satisfy both conditions simultaneously. This means rows \\(x=0, 1\\) and columns \\(y=3, 4\\):" },
      { "type": "eq", "tex": "\\text{Cells: } (0,3) + (0,4) + (1,3) + (1,4)" },
      { "type": "eq", "tex": "Sum = 6C + 8C + 7C + 9C = 30C" },
      { "type": "eq", "tex": "P = 30 \\left(\\frac{1}{80}\\right) = \\frac{3}{8}" },

      // --- SECTION: SIMULATOR ---
      { "type": "heading", "text": "35.4 Interactive Joint PMF Visualizer" },
      { "type": "para", "text": "Select the different questions from the problem above to see exactly which cells in the Joint PMF table are summed together to calculate the final probability." },
      { "type": "canvas_sim_select", "simId": "joint_pmf_table_sim", "height": 260, "controlLabel": "Select Grid Calculation:",
        "options": [
          { "value": "full", "text": "1. Finding C (Sum All Cells = 80C = 1)" },
          { "value": "q2", "text": "2. Exact Point: P(X=2 ∩ Y=3)" },
          { "value": "q3", "text": "3. Region: P(X ≤ 1 ∩ Y > 2)" },
          { "value": "marginal", "text": "4. View Marginal PMFs" }
        ]
      },

      // --- SECTION: BINARY INDEPENDENT R.V. ---
      { "type": "heading", "text": "35.5 Problem: Independent Binary R.V." },
      { "type": "para", "text": "<b>Question:</b> Let \\(X\\) and \\(Y\\) be two independent binary Random Variables where \\(X \\in \\{0,1\\}\\) and \\(Y \\in \\{0,1\\}\\). We are given their marginal probabilities: \\(P\\{X=0\\} = p\\) and \\(P\\{Y=0\\} = q\\). Find \\(P\\{(X+Y \\ge 1)\\}\\)." },
      { "type": "para", "text": "Because they are binary, their complements are naturally defined as:" },
      { "type": "list", "items": [
          "\\(P\\{X=1\\} = 1 - p\\)",
          "\\(P\\{Y=1\\} = 1 - q\\)"
        ]
      },

      // --- SECTION: METHOD 1 ---
      { "type": "heading", "text": "35.6 Method 1: The Tabular Approach" },
      { "type": "para", "text": "Since \\(X\\) and \\(Y\\) are statistically independent, their joint probability is simply the product of their marginal probabilities: \\(P(X \\cap Y) = P(X)P(Y)\\). We can build the full Joint PMF table:" },
      { "type": "table",
        "headers": ["\\(X \\setminus Y\\)", "\\(Y=0\\) (prob: \\(q\\))", "\\(Y=1\\) (prob: \\(1-q\\))"],
        "rows": [
          ["<b>\\(X=0\\) (prob: \\(p\\))</b>", "\\(pq\\)", "\\(p(1-q)\\)"],
          ["<b>\\(X=1\\) (prob: \\(1-p\\))</b>", "\\((1-p)q\\)", "\\((1-p)(1-q)\\)"]
        ]
      },
      { "type": "para", "text": "To find \\(P(X+Y \\ge 1)\\), we can use the <b>Complement Rule</b>. The only cell where \\(X+Y < 1\\) is the cell where \\(X=0\\) and \\(Y=0\\)." },
      { "type": "eq", "tex": "P(X+Y \\ge 1) = 1 - P(X+Y = 0) = 1 - P\\{(X=0)\\cap(Y=0)\\}" },
      { "type": "eq", "tex": "P(X+Y \\ge 1) = 1 - pq" },

      // --- SECTION: METHOD 2 ---
      { "type": "heading", "text": "35.7 Method 2: Direct Algebraic Approach" },
      { "type": "para", "text": "Alternatively, we can sum the specific probabilities that satisfy the condition \\(X+Y \\ge 1\\) directly using the independence rule:" },
      { "type": "eq", "tex": "P(X+Y \\ge 1) = P\\{(X=0)\\cap(Y=1)\\} + P\\{(X=1)\\cap(Y=0)\\} + P\\{(X=1)\\cap(Y=1)\\}" },
      { "type": "eq", "tex": "= P(X=0)P(Y=1) + P(X=1)P(Y=0) + P(X=1)P(Y=1)" },
      { "type": "eq", "tex": "= p(1-q) + (1-p)q + (1-p)(1-q)" },
      { "type": "para", "text": "Expanding and simplifying the algebra:" },
      { "type": "eq", "tex": "= (p - pq) + (q - pq) + (1 - q - p + pq)" },
      { "type": "eq", "tex": "= p - pq + q - pq + 1 - q - p + pq" },
      { "type": "eq", "tex": "= 1 - 2pq + pq = 1 - pq" }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 36 — Correlation, Covariance & Linear Combinations
  // ══════════════════════════
  {
    "id": "corr_covar_lincomb",
    "label": "36 · Covariance & Orthogonality",
    "title": "36. Correlation, Covariance & Linear Combinations",
    "content": [

      // --- SECTION: ORTHOGONALITY ---
      { "type": "heading", "text": "36.1 Inner Product & Orthogonal Random Variables" },
      { "type": "para", "text": "The concept of orthogonality extends from vectors and matrices to continuous signals and random variables." },
      { "type": "list", "items": [
          "<b>Vectors:</b> \\(\\vec{A} \\cdot \\vec{B} = 0 \\implies \\vec{A} \\perp \\vec{B}\\)",
          "<b>Matrices:</b> \\([A][B]^T = 0 \\implies [A] \\perp [B]\\)",
          "<b>Signals:</b> \\(\\int_{-\\infty}^{\\infty} x_1(t)x_2^*(t)dt = 0 \\implies x_1(t) \\perp x_2(t)\\)",
          "<b>Random Variables:</b> \\(E[XY] = 0 \\implies X \\perp Y\\)"
        ]
      },
      { "type": "para", "text": "If \\(X\\) and \\(Y\\) are orthogonal Random Variables, their expected product (Correlation) is exactly zero: \\(E(XY) = R_{XY} = 0\\)." },

      // --- SECTION: COVARIANCE DERIVATION ---
      { "type": "heading", "text": "36.2 Joint Moments & Covariance" },
      { "type": "para", "text": "The \\((k,r)^{th}\\) order Joint moment about the mean is defined as \\(E[(X-\\mu_x)^k (Y-\\mu_y)^r]\\)." },
      { "type": "para", "text": "The most important of these is the \\((1,1)^{st}\\) order Joint moment about the mean, which defines the <b>Cross-Covariance</b> between two Random Variables, \\(X\\) and \\(Y\\)." },
      { "type": "eq", "tex": "Cov(XY) = E[(X-\\mu_x)(Y-\\mu_y)] = \\sigma_{XY}" },
      { "type": "para", "text": "Expanding this expectation reveals the mathematical relationship between Covariance and Correlation:" },
      { "type": "eq", "tex": "= E[XY - X\\mu_y - \\mu_x Y + \\mu_x \\mu_y]" },
      { "type": "eq", "tex": "= E[XY] - E[X\\mu_y] - E[\\mu_x Y] + E[\\mu_x \\mu_y]" },
      { "type": "eq", "tex": "= E[XY] - \\mu_y\\mu_x - \\mu_x\\mu_y + \\mu_x\\mu_y" },
      { "type": "eq", "tex": "= E[XY] - \\mu_x\\mu_y" },
      { "type": "para", "text": "This yields the fundamental formula for Covariance:" },
      { "type": "eq", "tex": "\\sigma_{XY} = R_{XY} - \\mu_x\\mu_y" },

      // --- SECTION: CORRELATION VS COVARIANCE ---
      { "type": "heading", "text": "36.3 Correlation vs. Covariance Summary" },
      { "type": "table",
        "headers": ["Property", "Correlation", "Covariance"],
        "rows": [
          ["<b>Definition</b>", "\\(E(XY) = R_{XY}\\)", "\\(Cov(XY) = E[(X-\\mu_x)(Y-\\mu_y)]\\)"],
          ["<b>Relation</b>", "Base product expectation", "\\(\\sigma_{XY} = R_{XY} - \\mu_x\\mu_y\\)"],
          ["<b>Condition for Zero</b>", "If \\(E(XY) = 0\\), \\(X\\) and \\(Y\\) are <b>Orthogonal</b> RVs.", "If \\(Cov(XY) = 0\\), \\(X\\) and \\(Y\\) are <b>Uncorrelated</b> RVs."]
        ]
      },

      // --- SECTION: UNCORRELATED VS INDEPENDENT ---
      { "type": "heading", "text": "36.4 Uncorrelated vs. Independent R.V." },
      { "type": "para", "text": "If \\(X\\) and \\(Y\\) are defined as <b>uncorrelated</b>, the following mathematical conditions must be met:" },
      { "type": "list", "items": [
          "\\(Cov(XY) = 0\\) (or \\(\\sigma_{XY} = 0\\))",
          "\\(E(XY) = E(X)E(Y)\\) (or \\(R_{XY} = \\mu_x\\mu_y\\))"
        ]
      },
      { "type": "para", "text": "If \\(X\\) and \\(Y\\) are <b>Independent</b> Random Variables, their joint expectations can always be separated:" },
      { "type": "list", "items": [
          "\\(E[X^k Y^r] = E[X^k] E[Y^r]\\)",
          "For example: \\(E[X^1 Y^2] = E[X^1] E[Y^2]\\)"
        ]
      },
      { "type": "para", "text": "<b>Crucial Rule:</b> Because statistical independence strictly guarantees that \\(E[XY] = E[X]E[Y]\\), <b>Independent RVs are always uncorrelated</b>. However, the reverse may not be true; uncorrelated RVs are not necessarily independent." },

      // --- SECTION: LINEAR COMBINATIONS ---
      { "type": "heading", "text": "36.5 One Function of Two Random Variables (Linear Combinations)" },
      { "type": "para", "text": "Let \\(X\\) and \\(Y\\) be two random variables mathematically combined into a single function: \\(W = aX + bY\\)." },
      { "type": "para", "text": "<b>1. Mean (Expected Value):</b>" },
      { "type": "eq", "tex": "E[W] = a\\mu_x + b\\mu_y" },
      { "type": "para", "text": "<b>2. Mean Square Value (M.S.V.):</b> Squaring the function yields \\(W^2 = a^2 X^2 + b^2 Y^2 + 2abXY\\). Taking the expectation gives:" },
      { "type": "eq", "tex": "E[W^2] = a^2 E[X^2] + b^2 E[Y^2] + 2ab E(XY)" },
      { "type": "eq", "tex": "E[W^2] = a^2 E[X^2] + b^2 E[Y^2] + 2ab R_{XY}" },
      { "type": "para", "text": "<b>3. Variance:</b> The variance expands similarly, but replaces the raw expectation product with the Covariance:" },
      { "type": "eq", "tex": "\\sigma_W^2 = a^2 \\sigma_x^2 + b^2 \\sigma_y^2 + 2ab Cov(XY)" },
      { "type": "para", "text": "<i>Exam Note: If \\(X\\) and \\(Y\\) are given as uncorrelated or independent, the \\(Cov(XY)\\) term becomes 0, simplifying the total variance to just \\(a^2 \\sigma_x^2 + b^2 \\sigma_y^2\\).</i>" }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 37 — Advanced Variance & Correlation
  // ══════════════════════════
  {
    "id": "adv_variance_corr",
    "label": "37 · Adv. Variance",
    "title": "37. Advanced Variance Cases & Correlation Coefficient",
    "content": [

      // --- SECTION: THE MASTER FORMULA ---
      { "type": "heading", "text": "37.1 The Master Variance Formula" },
      { "type": "para", "text": "If an exam question gives you a function that combines two random variables, like \\(W = aX + bY\\), and asks for the variance of \\(W\\) (\\(\\sigma_W^2\\)), you always start with this Master Formula:" },
      { "type": "eq", "tex": "\\sigma_W^2 = a^2\\sigma_X^2 + b^2\\sigma_Y^2 + 2ab \\cdot cov(XY)" },
      { "type": "para", "text": "Remember that the Covariance term at the end is defined as:" },
      { "type": "eq", "tex": "cov(XY) = R_{XY} - \\mu_X\\mu_Y" },
      { "type": "para", "text": "<i>Exam Strategy:</i> The question will almost always give you a \"trigger word\" that allows you to simplify or completely erase that ugly \\(cov(XY)\\) term at the end. The three cases below show you exactly how to do that." },

      // --- SECTION: CASE 1 - ORTHOGONAL ---
      { "type": "heading", "text": "37.2 Case 1: \"X and Y are Orthogonal\"" },
      { "type": "para", "text": "<b>Trigger Meaning:</b> Orthogonal simply means their correlation is zero (\\(R_{XY} = 0\\))." },
      { "type": "para", "text": "If \\(R_{XY} = 0\\), then \\(cov(XY)\\) becomes just \\(-\\mu_X\\mu_Y\\). Substitute this back into the Master Formula:" },
      { "type": "eq", "tex": "\\sigma_W^2 = a^2\\sigma_X^2 + b^2\\sigma_Y^2 + 2ab(-\\mu_X\\mu_Y)" },
      { "type": "eq", "tex": "\\sigma_W^2 = a^2\\sigma_X^2 + b^2\\sigma_Y^2 - 2ab\\mu_X\\mu_Y" },

      // --- SECTION: CASE 2 - ZERO MEAN ---
      { "type": "heading", "text": "37.3 Case 2: \"X and Y are Zero Mean\"" },
      { "type": "para", "text": "<b>Trigger Meaning:</b> The averages of both variables are zero (\\(\\mu_X = 0\\) and \\(\\mu_Y = 0\\))." },
      { "type": "para", "text": "If the means are zero, the \\(\\mu_X\\mu_Y\\) part disappears, meaning the Covariance is exactly equal to the Correlation (\\(cov(XY) = R_{XY}\\)). Substitute this back in:" },
      { "type": "eq", "tex": "\\sigma_W^2 = a^2\\sigma_X^2 + b^2\\sigma_Y^2 + 2ab(R_{XY})" },

      // --- SECTION: CASE 3 - UNCORRELATED ---
      { "type": "heading", "text": "37.4 Case 3: \"X and Y are Uncorrelated\" (The Best Case)" },
      { "type": "para", "text": "<b>Trigger Meaning:</b> Uncorrelated means their Covariance is exactly zero (\\(cov(XY) = 0\\))." },
      { "type": "para", "text": "This is the easiest scenario. The entire complicated tail of the Master Formula just vanishes, leaving a simple sum of squares:" },
      { "type": "eq", "tex": "\\sigma_W^2 = a^2\\sigma_X^2 + b^2\\sigma_Y^2" },

      // --- SECTION: INDEPENDENT TRAP ---
      { "type": "heading", "text": "37.5 EXAM TRAP: Independent vs. Uncorrelated" },
      { "type": "para", "text": "Professors love to test this specific logic trap regarding Case 3:" },
      { "type": "list", "items": [
          "<b>Rule 1:</b> If two variables are <b>Independent</b>, they are ALWAYS <b>Uncorrelated</b>. You can safely cross out the covariance term.",
          "<b>Rule 2:</b> If two variables are <b>Uncorrelated</b>, they are NOT necessarily Independent. The reverse is not always true!"
        ]
      },

      // --- SECTION: VARIANCE PROPERTIES SUMMARY ---
      { "type": "heading", "text": "37.6 Standard Properties of Variance" },
      { "type": "para", "text": "When manipulating variance equations, memorize these fundamental scaling rules. Note that constants have no variance (they don't change!), and scaling factors get squared when pulled outside the variance operator:" },
      { "type": "list", "items": [
          "\\(Var(X) = \\sigma_X^2\\)",
          "\\(Var(aX) = a^2 \\sigma_X^2\\) <i>(The constant 'a' gets squared)</i>",
          "\\(Var(aX + b) = a^2 \\sigma_X^2\\) <i>(The constant 'b' disappears because it has no variance)</i>",
          "\\(Var(aX + bY) = a^2\\sigma_X^2 + b^2\\sigma_Y^2 + 2ab \\cdot cov(XY)\\)",
          "\\(Var(C) = 0\\) <i>(Variance of any isolated constant is 0)</i>"
        ]
      },

      // --- SECTION: CORRELATION COEFFICIENT ---
      { "type": "heading", "text": "37.7 The Correlation Coefficient (\\(\\rho\\))" },
      { "type": "para", "text": "The Correlation Coefficient, denoted by the Greek letter \\(\\rho\\) (rho), is a normalized measurement of how strongly two variables relate to each other. It is calculated by dividing the Covariance by the product of their standard deviations." },
      { "type": "eq", "tex": "\\rho(X,Y) = \\frac{cov(XY)}{\\sigma_X \\sigma_Y} = \\frac{R_{XY} - \\mu_X\\mu_Y}{\\sigma_X \\sigma_Y}" },
      { "type": "para", "text": "<b>Key Exam Facts about \\(\\rho\\):</b>" },
      { "type": "list", "items": [
          "The value of \\(\\rho\\) is strictly bounded between -1 and 1. <br>\\(-1 \\le \\rho \\le 1\\)",
          "Standard Deviation (\\(\\sigma\\)) is just the square root of Variance (\\(\\sigma^2\\)). <br>\\(\\sigma_X = \\sqrt{\\sigma_X^2}\\) and \\(\\sigma_Y = \\sqrt{\\sigma_Y^2}\\)"
        ]
      }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 38 — Sum of RVs & Q-Function Shortcut
  // ══════════════════════════
  {
    "id": "sum_rv_q_function",
    "label": "38 · Sums & Q-Function",
    "title": "38. Sum of Random Variables & The Q-Function Shortcut",
    "content": [

      // --- SECTION: CRV VS DRV RECAP ---
      { "type": "heading", "text": "38.1 CRV vs. DRV (The 'Simple Kid' Recap)" },
      { "type": "para", "text": "Before adding variables, here is the absolute basic difference you must remember for the exam:" },
      { "type": "table",
        "headers": ["Type of Random Variable", "Probability Function", "How to Find Probability?"],
        "rows": [
          ["<b>Discrete (D.R.V.)</b>", "<b>P.M.F.</b> (Probability Mass Function)", "<b>Summation (\\(\\Sigma\\))</b>: Add up the specific discrete points."],
          ["<b>Continuous (C.R.V.)</b>", "<b>P.D.F.</b> (Probability Density Function)", "<b>Integration (\\(\\int\\))</b>: Find the area under the continuous curve."]
        ]
      },

      // --- SECTION: THEOREM 1 (CONVOLUTION) ---
      { "type": "heading", "text": "38.2 Theorem 1: The Sum of Independent RVs" },
      { "type": "para", "text": "Let's say you have multiple Statistically Independent Random Variables: \\(X_1, X_2, \\dots X_n\\)." },
      { "type": "para", "text": "If you define a new variable \\(Z\\) that is the sum of all of them (\\(Z = X_1 + X_2 + \\dots + X_n\\)), the PDF of \\(Z\\) is found by taking the <b>Convolution</b> (denoted by \\(*\\)) of their individual PDFs:" },
      { "type": "eq", "tex": "f_Z(z) = f_{X_1}(x) * f_{X_2}(x) * \\dots * f_{X_n}(x)" },

      // --- SECTION: THEOREM 2 (NON-GAUSSIAN) ---
      { "type": "heading", "text": "38.3 Theorem 2: Adding Non-Gaussian RVs" },
      { "type": "para", "text": "If the variables you are adding together are <b>Non-Gaussian</b>, the result depends on how many you are adding:" },
      { "type": "list", "items": [
          "<b>Finite Number (n is finite):</b> The sum \\(Z\\) remains a <b>Non-Gaussian R.V.</b>",
          "<b>Infinite Number (n is infinite):</b> The sum \\(Z\\) magically becomes a <b>Gaussian R.V.</b> (This is the Central Limit Theorem in action)."
        ]
      },

      // --- SECTION: PROBLEM SOLVING CASE 1 ---
      { "type": "heading", "text": "38.4 Problem Solving Case 1: Non-Gaussian Probability" },
      { "type": "para", "text": "<b>Scenario:</b> \\(Z = X_1 + X_2 + X_3\\), and they are independent Non-Gaussian RVs. Find \\(P(Z > a)\\)." },
      { "type": "para", "text": "Because it is Non-Gaussian, there is no shortcut. You <b>must</b> do the math manually:" },
      { "type": "list", "items": [
          "<b>Step 1:</b> Find the new PDF by convolution: \\(f_Z(z) = f_{X_1}(z) * f_{X_2}(z) * f_{X_3}(z)\\).",
          "<b>Step 2:</b> Find the probability by integrating that new PDF from the target \\(a\\) to infinity:"
        ]
      },
      { "type": "eq", "tex": "P(Z > a) = \\int_{a}^{\\infty} f_Z(z) dz" },

      // --- SECTION: THEOREM 3 (GAUSSIAN) ---
      { "type": "heading", "text": "38.5 Theorem 3: Adding Gaussian RVs (The Magic Case)" },
      { "type": "para", "text": "If the variables you are adding together are already <b>Gaussian</b>, the rules are beautifully simple:" },
      { "type": "list", "items": [
          "Whether you add a finite number or an infinite number of them, the sum \\(Z\\) is <b>ALWAYS a Gaussian R.V.</b>"
        ]
      },

      // --- SECTION: PROBLEM SOLVING CASE 2 ---
      { "type": "heading", "text": "38.6 Problem Solving Case 2: Gaussian & Q-Function Shortcut" },
      { "type": "para", "text": "<b>Scenario:</b> \\(Z = X_1 + X_2 + X_3\\), and they are independent <b>Gaussian</b> RVs. Find \\(P(Z > a)\\)." },
      { "type": "para", "text": "Because the sum of Gaussians is ALWAYS Gaussian, you <b>DO NOT integrate</b>. You use the Q-Function shortcut." },
      { "type": "eq", "tex": "P(Z > a) = Q\\left( \\frac{a - \\mu_Z}{\\sigma_Z} \\right)" },
      { "type": "para", "text": "To use this formula, you just need to calculate the Mean (\\(\\mu_Z\\)) and the Variance (\\(\\sigma_Z^2\\)) of the new variable \\(Z\\):" },
      
      { "type": "heading", "text": "Step 1: Find the New Mean (\\(\\mu_Z\\))" },
      { "type": "para", "text": "Means always simply add together:" },
      { "type": "eq", "tex": "\\mu_Z = \\mu_{X_1} + \\mu_{X_2} + \\mu_{X_3}" },
      
      { "type": "heading", "text": "Step 2: Find the New Variance (\\(\\sigma_Z^2\\))" },
      { "type": "para", "text": "Normally, adding variances involves a messy Covariance tail. But because the problem states they are <b>Statistically Independent</b>, all Covariances are ZERO (\\(cov = 0\\)). Therefore, the variances just add up directly:" },
      { "type": "eq", "tex": "\\sigma_Z^2 = \\sigma_{X_1}^2 + \\sigma_{X_2}^2 + \\sigma_{X_3}^2 + \\underbrace{2cov(X_1X_2) + 2cov(X_2X_3) + \\dots}_{\\text{These all become 0!}}" },
      { "type": "eq", "tex": "\\sigma_Z^2 = \\sigma_{X_1}^2 + \\sigma_{X_2}^2 + \\sigma_{X_3}^2" },
      { "type": "para", "text": "Once you have \\(\\mu_Z\\) and \\(\\sigma_Z^2\\) (don't forget to take the square root to get \\(\\sigma_Z\\)), you just plug them into the Q-Function formula!" },

      // --- SECTION: SIMULATOR ---
      { "type": "heading", "text": "38.7 Interactive Gaussian Sum & Q-Function Calculator" },
      { "type": "para", "text": "Adjust the Means and Variances of two independent Gaussian variables (\\(X_1\\) and \\(X_2\\)). Watch how their sum \\(Z\\) forms a new Gaussian curve. Then, move the threshold \\(a\\) to see exactly how the Q-Function calculates the probability \\(P(Z > a)\\) without any integration." },
      { "type": "canvas_sim", "simId": "sum_gaussian_sim", "height": 380, "controlLabel": "Target Threshold (a):", "min": -10, "max": 20, "step": 0.5, "defaultVal": 8 }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 39 — The "Simple Kid" Guide to Q-Function
  // ══════════════════════════
  {
    "id": "simple_q_guide",
    "label": "39 · Q-Function Basics",
    "title": "39. The Simple Kid's Guide to the Q-Function",
    "content": [

      // --- SECTION: WHAT IS IT ---
      { "type": "heading", "text": "39.1 What the heck is the Q-Function?" },
      { "type": "para", "text": "The Gaussian PDF formula (with the \\(e^{-x^2}\\)) is a nightmare. It is mathematically impossible to integrate using normal calculus. You cannot find the area under it by hand." },
      { "type": "para", "text": "<b>The Solution:</b> Mathematicians used computers to calculate every possible area for one perfectly standard bell curve called the <b>Standard Normal Distribution</b> (Mean \\(\\mu = 0\\), Variance \\(\\sigma^2 = 1\\)). They put all these answers in a giant table." },
      { "type": "list", "items": [
          "<b>Q(z)</b> literally just means: <i>\"Look up the area to the right of 'z' in the standard cheat sheet table.\"</i>",
          "You do not calculate the integral. You calculate 'z', and then look up \\(Q(z)\\) in a table (or your scientific calculator does it for you)."
        ]
      },

      // --- SECTION: THE CONVERSION ---
      { "type": "heading", "text": "39.2 The Conversion Trick (Standardization)" },
      { "type": "para", "text": "Your exam problem will almost never have a Mean of 0 and a Variance of 1. To use the Q-Function table, you have to convert your random variable \\(X\\) into the standard variable \\(Z\\)." },
      { "type": "para", "text": "<b>The Magic Formula:</b> Subtract the mean, and divide by the Standard Deviation (\\(\\sigma\\)), NOT the variance (\\(\\sigma^2\\))." },
      { "type": "eq", "tex": "Z = \\frac{X - \\mu_X}{\\sigma_X}" },
      { "type": "para", "text": "So, if the question asks for the probability that \\(X > a\\):" },
      { "type": "eq", "tex": "P(X > a) = Q\\left( \\frac{a - \\mu_X}{\\sigma_X} \\right) = Q(Z)" },

      // --- SECTION: EXAMPLE ---
      { "type": "heading", "text": "39.3 A Simple Step-by-Step Example" },
      { "type": "para", "text": "<b>Question:</b> Let \\(X\\) be a Gaussian R.V. with Mean \\(\\mu = 10\\) and Variance \\(\\sigma^2 = 16\\). Find \\(P(X > 18)\\)." },
      { "type": "list", "items": [
          "<b>Step 1: Find Standard Deviation (\\(\\sigma\\)).</b> The variance is 16, so \\(\\sigma = \\sqrt{16} = 4\\).",
          "<b>Step 2: Convert to Z.</b> \\(Z = \\frac{18 - 10}{4} = \\frac{8}{4} = 2\\).",
          "<b>Step 3: Write the Q-Function.</b> \\(P(X > 18) = Q(2)\\).",
          "<b>Step 4: Look it up.</b> You look up 2.0 in the Q-table (or use a calculator) and get \\(0.0227\\) (or 2.27%). You're done. No integration needed!"
        ]
      },

      // --- SECTION: NEGATIVE NUMBERS ---
      { "type": "heading", "text": "39.4 The Symmetry Rule (Dealing with Negatives)" },
      { "type": "para", "text": "Most Q-tables only show positive numbers. What if your conversion gives you a negative Z-score, like \\(Q(-1.5)\\)?" },
      { "type": "para", "text": "Because the bell curve is perfectly symmetrical, the massive area to the right of a negative number is exactly the same as 1 minus the tiny tail of the positive number." },
      { "type": "eq", "tex": "Q(-z) = 1 - Q(z)" },
      { "type": "para", "text": "<b>Example:</b> \\(Q(-2) = 1 - Q(2) = 1 - 0.0227 = 0.9773\\) (or 97.73%)." },

      // --- SECTION: SIMULATOR ---
      { "type": "heading", "text": "39.5 Interactive Z-Score Converter" },
      { "type": "para", "text": "Play with the Mean, Variance, and Threshold (a) below. Watch how the formula automatically squishes and shifts your specific problem into the universal \\(Z\\)-score so the Q-Function can solve it." },
      { "type": "canvas_sim", "simId": "simple_z_score_sim", "height": 340, "controlLabel": "Target Threshold (a):", "min": 0, "max": 20, "step": 0.5, "defaultVal": 14 }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 40 — The "Simple Kid" Guide to Convolution & 2D Area
  // ══════════════════════════
  {
    "id": "convolution_shortcuts",
    "label": "40 · Convolution Tricks",
    "title": "40. Convolution Shortcuts & Geometric Probability",
    "content": [

      // --- SECTION: GAUSSIAN COMBINATIONS TRAP ---
      { "type": "heading", "text": "40.1 The Gaussian Variance Trap" },
      { "type": "para", "text": "When you combine two independent Gaussian variables into a new variable, like \\(Z = 2X - 3Y\\), finding the new Mean and Variance is straightforward, but there is a massive trap students fall into." },
      { "type": "list", "items": [
          "<b>The Mean follows the signs perfectly:</b> \\(\\mu_Z = 2\\mu_X - 3\\mu_Y\\).",
          "<b>The Variance NEVER subtracts:</b> Variance is a measure of AC power (chaos). Whether you add or subtract a noisy signal, the total chaos always increases.",
          "<b>Squaring the Coefficients:</b> The coefficients get squared when pulled out of the variance. <br>\\(\\sigma_Z^2 = (2)^2\\sigma_X^2 + (-3)^2\\sigma_Y^2 = 4\\sigma_X^2 + 9\\sigma_Y^2\\)."
        ]
      },
      { "type": "para", "text": "Once you have \\(\\mu_Z\\) and \\(\\sigma_Z^2\\), you just plug them straight into the Q-Function: \\(P(Z > a) = Q\\left(\\frac{a - \\mu_Z}{\\sigma_Z}\\right)\\)." },

      // --- SECTION: CONVOLUTION WITHOUT INTEGRATION ---
      { "type": "heading", "text": "40.2 The Shape Trick: Convolution Without Integration" },
      { "type": "para", "text": "If you are asked to find the PDF of \\(Z = X + Y\\) where \\(X\\) and \\(Y\\) are independent Uniform Random Variables, you do <b>not</b> need to do the integration. The convolution of two rectangles always creates a predictable geometric shape." },
      { "type": "table",
        "headers": ["Input PDFs", "Resulting Shape for Z", "Why?"],
        "rows": [
          ["Two Rectangles of <b>SAME Width</b>", "<b>Triangle</b>", "Perfect overlap creates a sharp single peak."],
          ["Two Rectangles of <b>DIFFERENT Widths</b>", "<b>Trapezium</b>", "The narrower rectangle slides entirely inside the wider one, creating a flat plateau at the top."]
        ]
      },

      // --- SECTION: CALCULATING THE SHAPE ---
      { "type": "heading", "text": "40.3 How to Calculate the Trapezium/Triangle Dimensions" },
      { "type": "para", "text": "Let PDF 1 have Width \\(W_1\\) and Height \\(H_1\\). Let PDF 2 have Width \\(W_2\\) and Height \\(H_2\\). Assume \\(W_1\\) is the wider one." },
      { "type": "list", "items": [
          "<b>1. Total Base Width:</b> Simply add the bounds. \\(W_{Base} = W_1 + W_2\\). <br><i>(e.g., if X goes from -2 to 2, and Y goes from -4 to 4, Z goes from -6 to 6).</i>",
          "<b>2. Top Flat Width (Plateau):</b> Subtract the widths. \\(W_{Flat} = |W_1 - W_2|\\). <br><i>(If they are the same width, this is 0, which makes it a Triangle!)</i>",
          "<b>3. Maximum Height:</b> Multiply the heights by the narrower width. <br>\\(Max Height = \\min(W_1, W_2) \\times H_1 \\times H_2\\)."
        ]
      },

      // --- SECTION: SIMULATOR ---
      { "type": "heading", "text": "40.4 Interactive Convolution Shape Visualizer" },
      { "type": "para", "text": "Adjust the widths of the two Uniform distributions below to see exactly how they combine. Notice how making them equal turns the Trapezium into a Triangle." },
      { "type": "canvas_sim", "simId": "convolution_shape_sim", "height": 300, "controlLabel": "Width of Uniform RV 2:", "min": 2, "max": 10, "step": 1, "defaultVal": 8 },

      // --- SECTION: GEOMETRIC PROBABILITY ---
      { "type": "heading", "text": "40.5 Geometric Probability (The Area Trick)" },
      { "type": "para", "text": "When the Joint PDF \\(f_{XY}(x,y)\\) of two independent uniform variables is a flat constant \\(K\\) over a rectangular region, calculating probability becomes a basic geometry problem, not a calculus problem." },
      { "type": "eq", "tex": "P(\\text{Condition}) = \\iint_{Region} K \\, dxdy = K \\times (\\text{Area of the Condition})" },
      { "type": "para", "text": "<b>Example (The Circle Trick):</b> Find \\(P(X^2 + Y^2 < 1)\\) given \\(X \\sim U[-2,2]\\) and \\(Y \\sim U[-4,4]\\)." },
      { "type": "list", "items": [
          "<b>Step 1: Find K.</b> The area of the total existence rectangle is \\((4) \\times (8) = 32\\). Since total volume must be 1, \\(K = 1/32\\).",
          "<b>Step 2: Identify the Shape.</b> The condition \\(X^2 + Y^2 < 1\\) is the equation of a circle with radius \\(r = 1\\).",
          "<b>Step 3: Calculate Area.</b> Area of circle = \\(\\pi r^2 = \\pi (1)^2 = \\pi\\).",
          "<b>Step 4: Multiply.</b> Probability = \\(K \\times Area = \\frac{1}{32} \\times \\pi = \\frac{\\pi}{32}\\)."
        ]
      }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 41 — The "Simple Kid" Dictionary
  // ══════════════════════════
  {
    "id": "simple_kid_dictionary",
    "label": "41 · PDF vs CDF",
    "title": "41. The Ultimate Confusion Killer: PMF, PDF, CDF & Intersections",
    "content": [
      { "type": "heading", "text": "41.1 When do I use which formula?" },
      { "type": "para", "text": "Forget the heavy math for a second. Here is the exact translation of what these terms mean and when to use them on an exam:" },
      { "type": "table",
        "headers": ["Term", "What is it?", "When do I use it?"],
        "rows": [
          ["<b>PMF</b><br>\\(p_X(x)\\)", "<b>Probability Mass Function</b><br>For DISCRETE things (dice, coins).", "When the question asks for an EXACT point: \\(P(X = 3)\\). You just <b>ADD</b> the probabilities."],
          ["<b>PDF</b><br>\\(f_X(x)\\)", "<b>Probability Density Function</b><br>For CONTINUOUS things (voltage, Uniform RVs).", "When you are given a graph or a shape. You must <b>INTEGRATE</b> (find the area) to get a probability. The probability at a single exact point is always 0."],
          ["<b>CDF</b><br>\\(F_X(x)\\)", "<b>Cumulative Distribution Function</b><br>The 'Accumulated Area' shortcut.", "When the question asks for a RANGE, like \\(P(X \\le 3)\\). Instead of integrating the PDF from scratch, the CDF is the <b>pre-calculated answer</b>. \\(P(X \\le 3) = F_X(3)\\)."],
          ["<b>Intersection</b><br>\\(\\cap\\)", "<b>The 'AND' Operator</b><br>Combines two different variables.", "When you need TWO things to happen at the same time. 'I need X to be less than 2 <b>AND</b> Y to be less than 2'. If they are Independent, you just <b>MULTIPLY</b> them!"]
        ]
      },

      { "type": "heading", "text": "41.2 Why do we go from \\(f_X(x)\\) to CDF?" },
      { "type": "para", "text": "You go from the PDF (\\(f_X\\)) to the CDF (\\(F_X\\)) because it saves you time. If a question asks for \\(P(X \\le z)\\), you *could* write out the integral \\(\\int_{-\\infty}^z f_X(x)dx\\). But by definition, that integral IS the CDF. So you just write \\(F_X(z)\\) and plug in the number." }
    ]
  },

  // ══════════════════════════
  // CHAPTER 42 — Max and Min Logic
  // ══════════════════════════
  {
    "id": "max_min_logic",
    "label": "42 · Max & Min RVs",
    "title": "42. Max and Min of Independent RVs (The 'AND' Trick)",
    "content": [
      { "type": "heading", "text": "42.1 The Golden Rule of Independent Variables" },
      { "type": "para", "text": "If a question says \\(X\\) and \\(Y\\) are <b>Independent</b>, it is giving you a gift. It means you can break complicated problems into two easy pieces and just multiply them." },
      { "type": "eq", "tex": "P(X \\cap Y) = P(X) \\times P(Y)" },

      { "type": "heading", "text": "42.2 The 'MAX' Logic (Less Than)" },
      { "type": "para", "text": "Think about it simply: If the <b>MAXIMUM</b> of two numbers is less than \\(z\\), then <b>BOTH</b> numbers must be less than \\(z\\). This creates our 'AND' condition (intersection)." },
      { "type": "eq", "tex": "P[\\max(X,Y) \\le z] = P[(X \\le z) \\cap (Y \\le z)]" },
      { "type": "para", "text": "Because they are independent, we just multiply their individual probabilities (which are their CDFs!):" },
      { "type": "eq", "tex": "= P(X \\le z) \\times P(Y \\le z) = F_X(z) \\times F_Y(z)" },

      { "type": "heading", "text": "42.3 The 'MIN' Logic (Greater Than)" },
      { "type": "para", "text": "If the <b>MINIMUM</b> of two numbers is greater than \\(z\\), then <b>BOTH</b> numbers must be greater than \\(z\\)." },
      { "type": "eq", "tex": "P[\\min(X,Y) \\ge z] = P[(X \\ge z) \\cap (Y \\ge z)]" },
      { "type": "eq", "tex": "= P(X \\ge z) \\times P(Y \\ge z)" },

      { "type": "heading", "text": "42.4 The 'Complement' Trick (For everything else)" },
      { "type": "para", "text": "The tricks above ONLY work when you have an 'AND' condition. <br>• You can only use 'MAX' with <b>Less Than</b> (\\(\\le\\)). <br>• You can only use 'MIN' with <b>Greater Than</b> (\\(\\ge\\))." },
      { "type": "para", "text": "If the exam asks for the opposite (e.g., \\(\\max > z\\) or \\(\\min < z\\)), you MUST use the complement rule (\\(1 - \\text{Opposite}\\)) to flip the sign before you do the math!" },
      { "type": "list", "items": [
          "\\(P[\\max(X,Y) > z] = 1 - P[\\max(X,Y) \\le z]\\)",
          "\\(P[\\min(X,Y) < z] = 1 - P[\\min(X,Y) \\ge z]\\)"
        ]
      }
    ]
  },

  // ══════════════════════════
  // CHAPTER 43 — Homework Solution
  // ══════════════════════════
  {
    "id": "homework_solution_65_128",
    "label": "43 · Homework Sol",
    "title": "43. Step-by-Step Homework Solution (65/128)",
    "content": [
      { "type": "heading", "text": "43.1 Breaking Down the Problem" },
      { "type": "para", "text": "<b>Question:</b> Let \\(X, Y\\) be two independent RVs uniformly distributed between -2 and 2. Find \\(P[-3/2 < \\min(2X,Y) < 1]\\)." },
      { "type": "para", "text": "<b>Step 1: Set up the Uniform PDFs.</b> Since they span from -2 to 2 (a total width of 4), their height must be 1/4 so the area equals 1." },
      { "type": "eq", "tex": "f_X(x) = 1/4 \\quad \\text{and} \\quad f_Y(y) = 1/4" },

      { "type": "heading", "text": "43.2 Splitting the Range" },
      { "type": "para", "text": "Let \\(W = \\min(2X,Y)\\). We need the probability between two bounds: \\(P(-3/2 < W < 1)\\). Using CDF logic, we split this into the upper bound minus the lower bound:" },
      { "type": "eq", "tex": "P(W < 1) - P(W \\le -3/2)" },
      
      { "type": "heading", "text": "43.3 Solving the Upper Bound: \\(P(W < 1)\\)" },
      { "type": "para", "text": "Because \\(W\\) is a MIN function, we must use the Complement trick to flip the '<' sign into a '>' sign so we can use our 'AND' logic." },
      { "type": "eq", "tex": "P(\\min(2X,Y) < 1) = 1 - P(\\min(2X,Y) \\ge 1)" },
      { "type": "eq", "tex": "= 1 - P(2X \\ge 1 \\text{ AND } Y \\ge 1)" },
      { "type": "eq", "tex": "= 1 - [P(X \\ge 1/2) \\times P(Y \\ge 1)]" },
      { "type": "list", "items": [
          "<b>Find \\(P(X \\ge 1/2)\\):</b> Area from 0.5 to 2. Width is 1.5. Area = \\(1.5 \\times (1/4) = 3/8\\).",
          "<b>Find \\(P(Y \\ge 1)\\):</b> Area from 1 to 2. Width is 1. Area = \\(1 \\times (1/4) = 1/4\\)."
        ]
      },
      { "type": "eq", "tex": "= 1 - \\left( \\frac{3}{8} \\times \\frac{1}{4} \\right) = 1 - \\frac{3}{32} = \\frac{29}{32} = \\frac{116}{128}" },

      { "type": "heading", "text": "43.4 Solving the Lower Bound: \\(P(W \\le -3/2)\\)" },
      { "type": "para", "text": "We do the exact same complement trick for the lower bound." },
      { "type": "eq", "tex": "P(\\min(2X,Y) \\le -3/2) = 1 - P(\\min(2X,Y) > -3/2)" },
      { "type": "eq", "tex": "= 1 - [P(2X > -3/2) \\times P(Y > -3/2)]" },
      { "type": "eq", "tex": "= 1 - [P(X > -3/4) \\times P(Y > -3/2)]" },
      { "type": "list", "items": [
          "<b>Find \\(P(X > -3/4)\\):</b> Area from -0.75 to 2. Width is 2.75. Area = \\(2.75 \\times (1/4) = 11/16\\).",
          "<b>Find \\(P(Y > -1.5)\\):</b> Area from -1.5 to 2. Width is 3.5. Area = \\(3.5 \\times (1/4) = 7/8\\)."
        ]
      },
      { "type": "eq", "tex": "= 1 - \\left( \\frac{11}{16} \\times \\frac{7}{8} \\right) = 1 - \\frac{77}{128} = \\frac{51}{128}" },

      { "type": "heading", "text": "43.5 The Final Subtraction" },
      { "type": "para", "text": "Now, subtract the lower bound from the upper bound to get the final area:" },
      { "type": "eq", "tex": "\\frac{116}{128} - \\frac{51}{128} = \\frac{65}{128}" }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 44 — Info Theory & Channel Matrices
  // ══════════════════════════
  {
    "id": "info_theory_matrices",
    "label": "44 · Info & Matrices",
    "title": "44. Information Theory & Channel Matrices",
    "content": [

      // --- SECTION: MASTER FORMULA CHEAT SHEET ---
      { "type": "heading", "text": "44.1 The Master Formula Cheat Sheet" },
      { "type": "para", "text": "Memorize this block. This is 90% of the math you will need for this chapter." },
      { "type": "list", "items": [
          "<b>Information (Bits):</b> \\( I(x_i) = -\\log_2 P(x_i) \\)",
          "<b>Entropy (Avg Information):</b> \\( H(X) = -\\sum_{i=1}^{m} P(x_i) \\log_2 P(x_i) \\) [bits/symbol]",
          "<b>Information Rate:</b> \\( R = r \\times H(X) \\) [bits/sec] <i>(where r = symbols/sec)</i>",
          "<b>Output Matrix:</b> \\( [P(Y)] = [P(X)][P(Y|X)] \\) <i>(Note: P(X) is a Row Matrix)</i>",
          "<b>Joint Matrix Conversion:</b> \\( [P(X,Y)] = \\text{Multiply each row of } [P(Y|X)] \\text{ by its input } P(x_i) \\)"
        ]
      },

      // --- SECTION: INFO & ENTROPY ---
      { "type": "heading", "text": "44.2 Information & Entropy (The 'Surprise' Factor)" },
      { "type": "para", "text": "<b>Information</b> is a measure of surprise. If something is guaranteed to happen ($P=1$), it gives you zero information ($I=0$). The smaller the probability, the larger the information. We use Log Base 2 to measure it in 'Bits'." },
      { "type": "table",
        "headers": ["Log Base Used", "Unit of Information"],
        "rows": [
          ["\\(\\log_2\\) (Base 2)", "<b>Bits</b> (Most common in exams)"],
          ["\\(\\log_{10}\\) (Base 10)", "<b>Decit</b> or Hartley"],
          ["\\(\\ln\\) (Base e)", "<b>Nat</b>"]
        ]
      },
      { "type": "para", "text": "<b>Entropy \\(H(X)\\)</b> is simply the weighted average of all the information in a system. You multiply every probability by its information and add them all up." },

      // --- SECTION: CHANNEL MATRICES ---
      { "type": "heading", "text": "44.3 Channel Matrices (The Golden Row Rule)" },
      { "type": "para", "text": "When transmitting data through a channel, noise causes errors (crossovers). We represent these paths using Matrices. There are two main types you must not confuse:" },
      
      { "type": "heading", "text": "1. The Conditional Matrix [P(Y|X)]" },
      { "type": "para", "text": "This matrix tells you: <i>'Given that I sent X, what is the probability it arrives as Y?'</i>" },
      { "type": "list", "items": [
          "<b>THE GOLDEN RULE:</b> The sum of every single row in a Conditional Matrix <b>MUST ALWAYS EQUAL 1</b>.",
          "<b>Why?</b> Because if you transmit a signal, it MUST arrive as something at the output. It cannot just disappear. The probabilities of all possible output paths from a single input must total 100%."
        ]
      },

      { "type": "heading", "text": "2. The Joint Matrix [P(X,Y)]" },
      { "type": "para", "text": "This matrix tells you: <i>'What is the total overall probability of sending X AND receiving Y?'</i>" },
      { "type": "list", "items": [
          "You calculate this by taking the Conditional Matrix and multiplying Row 1 by \\(P(x_1)\\), Row 2 by \\(P(x_2)\\), etc.",
          "<b>The Matrix Rule:</b> The sum of the ENTIRE Joint Matrix equals 1 (not just the rows)."
        ]
      },

      // --- SECTION: BINARY CHANNELS ---
      { "type": "heading", "text": "44.4 Binary Channels: Symmetric vs. Non-Symmetric" },
      { "type": "para", "text": "A Binary Channel only has two inputs (0 and 1) and two outputs (0 and 1). The 'crossover' paths represent errors." },
      { "type": "table",
        "headers": ["Channel Type", "Error Probabilities", "Conditional Matrix \\([P(Y|X)]\\)"],
        "rows": [
          ["<b>Binary Symmetric (BSC)</b>", "Errors are equal. <br>\\(0 \\to 1\\) is \\(p\\). <br>\\(1 \\to 0\\) is also \\(p\\).", "\\( \\begin{bmatrix} 1-p & p \\\\ p & 1-p \\end{bmatrix} \\)"],
          ["<b>Non-Symmetric</b>", "Errors are different. <br>\\(0 \\to 1\\) is \\(p\\). <br>\\(1 \\to 0\\) is \\(q\\).", "\\( \\begin{bmatrix} 1-p & p \\\\ q & 1-q \\end{bmatrix} \\)"]
        ]
      },
      { "type": "para", "text": "<i>Notice the Golden Rule here: \\((1-p) + p = 1\\). The rows always sum to 1!</i>" },

      // --- SECTION: SIMULATOR ---
      { "type": "heading", "text": "44.5 Interactive Binary Channel Matrix Builder" },
      { "type": "para", "text": "Adjust the Input Probability and the Crossover Errors (p and q) below. Watch how the diagram automatically updates the Conditional Matrix (Rows sum to 1) and the Joint Matrix (Total sums to 1)." },
      { "type": "canvas_sim", "simId": "binary_channel_sim", "height": 380, "controlLabel": "Binary Channel Visualizer", "min": 0, "max": 1, "step": 0.01, "defaultVal": 0.5 }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 45 — Info Theory Master Cheat Sheet
  // ══════════════════════════
  {
    "id": "info_theory_master",
    "label": "45 · Info Theory Cheats",
    "title": "45. Information Theory: The Master Cheat Sheet",
    "content": [

      // --- SECTION: MASTER FORMULA BLOCK ---
      { "type": "heading", "text": "45.1 The Master Formula Block" },
      { "type": "para", "text": "Screenshot this section. This contains every core formula you need for Information Theory calculations." },
      { "type": "list", "items": [
          "<b>Information (Bits):</b> \\( I(x_i) = -\\log_2 P(x_i) \\)",
          "<b>Entropy / Avg Info (Bits/Symbol):</b> \\( H(X) = -\\sum P(x_i) \\log_2 P(x_i) \\)",
          "<b>Information Rate (Bits/Sec):</b> \\( R = r \\times H(X) \\) <i>(where r = symbols/sec)</i>",
          "<b>Output Matrix:</b> \\( [P(Y)] = [P(X)] \\times [P(Y|X)] \\)",
          "<b>Total Probability (Receiver):</b> \\( P(y_j) = \\sum_i P(x_i) P(y_j | x_i) \\)",
          "<b>Probability of Error (Pe):</b> \\( P_e = 1 - P_c \\) <i>(where Pc is Probability of Correct reception)</i>"
        ]
      },

      // --- SECTION: PMF VS PDF RECAP ---
      { "type": "heading", "text": "45.2 Recap: Why are we using PMF here?" },
      { "type": "para", "text": "In the previous chapters, we used <b>PDFs (Integration)</b> because we were dealing with continuous analog signals (like voltages that can be 1.1V, 1.15V, 1.156V, etc.)." },
      { "type": "para", "text": "In Information Theory, we are dealing with Digital Communications. We send discrete, distinct symbols (like sending a '0' or a '1', or symbols 'A', 'B', 'C'). Because these are countable and distinct, we use <b>PMFs (Summation)</b>. You don't integrate in this chapter; you just multiply and add!" },

      // --- SECTION: CHANNEL MATRICES ---
      { "type": "heading", "text": "45.3 The Two Channel Matrices (Do Not Confuse Them)" },
      { "type": "para", "text": "You will be given or asked to find matrices. You must know which one you are looking at:" },
      { "type": "table",
        "headers": ["Matrix Type", "Symbol", "The Golden Rule"],
        "rows": [
          ["<b>Conditional Matrix</b><br>(Transition Matrix)", "\\( [P(Y|X)] \\)", "<b>ROWS SUM TO 1.</b> <br>Because whatever you put into the channel MUST come out as something."],
          ["<b>Joint Matrix</b>", "\\( [P(X,Y)] \\)", "<b>ENTIRE MATRIX SUMS TO 1.</b> <br>This represents the total global probability of the entire system."]
        ]
      },

      // --- SECTION: SPECIAL CHANNELS ---
      { "type": "heading", "text": "45.4 Cheat Codes: The Special Channel Matrices" },
      { "type": "para", "text": "If a question asks you to identify a channel type based on its Conditional Matrix \\([P(Y|X)]\\), use these instant visual rules:" },
      { "type": "list", "items": [
          "<b>1. Deterministic Channel:</b> Each <b>ROW</b> has exactly ONE non-zero element (which must be a '1'). <i>Meaning: If you know the input, the output is 100% certain.</i>",
          "<b>2. Lossless Channel:</b> Each <b>COLUMN</b> has exactly ONE non-zero element. <i>Meaning: If you see the output, you know exactly what the input was. No info is lost.</i>",
          "<b>3. Noiseless Channel:</b> It is both Deterministic AND Lossless. The matrix is a perfectly diagonal <b>Identity Matrix</b> (1s on the diagonal, 0s everywhere else).",
          "<b>4. Symmetric Channel:</b> The rows are shifted copies of each other, and the columns are shifted copies of each other. (e.g., the Binary Symmetric Channel)."
        ]
      },

      // --- SECTION: MUTUAL INFO ---
      { "type": "heading", "text": "45.5 Mutual Information & Advanced Entropy" },
      { "type": "para", "text": "Mutual Information \\( I(X;Y) \\) tells you how much knowing \\(Y\\) reduces your uncertainty about \\(X\\)." },
      { "type": "eq", "tex": "I(X;Y) = H(X) - H(X|Y) = H(Y) - H(Y|X)" },
      { "type": "list", "items": [
          "<b>The Independence Rule:</b> If \\(X\\) and \\(Y\\) are completely statistically independent, they share zero information. Therefore, <b>\\( I(X;Y) = 0 \\)</b>.",
          "<b>\\( H(X|Y) \\)</b> is called <i>Equivocation</i>. It is the information lost in the noisy channel.",
          "<b>\\( H(Y|X) \\)</b> is called <i>Noise Entropy</i>. It is the fake information added by the channel."
        ]
      },

      // --- SECTION: SIMULATOR ---
      { "type": "heading", "text": "45.6 Interactive Special Matrix Visualizer" },
      { "type": "para", "text": "Select a special channel type below to see exactly how its Conditional Matrix is structured based on the rules we just covered." },
      { "type": "canvas_sim_select", "simId": "special_matrices_sim", "height": 300, "controlLabel": "Select Channel Type:",
        "options": [
          { "value": "deterministic", "text": "1. Deterministic Channel (Row Rule)" },
          { "value": "lossless", "text": "2. Lossless Channel (Column Rule)" },
          { "value": "noiseless", "text": "3. Noiseless Channel (Identity Matrix)" },
          { "value": "symmetric", "text": "4. Binary Symmetric Channel (BSC)" }
        ]
      }
    ]
  },
  
  // ══════════════════════════
  // CHAPTER 47 — Superheterodyne Receivers
  // ══════════════════════════
  {
    "id": "superhet_receivers",
    "label": "47 · Superheterodyne",
    "title": "47. Radio Receivers & The Superheterodyne Cheat Codes",
    "content": [

      // --- SECTION: THE PROBLEM ---
      { "type": "heading", "text": "47.1 The Problem: Why not just amplify the antenna signal?" },
      { "type": "para", "text": "Radio signals from the air (like FM radio at 98.3 MHz) are extremely high frequency and very weak. Building an amplifier that can perfectly tune to and amplify *any* high frequency without adding massive noise is incredibly difficult and expensive." },
      { "type": "para", "text": "<b>The Solution:</b> Instead of building a complex amplifier for every possible channel, we use a <b>Superheterodyne Receiver</b>. Its job is to take ANY incoming high-frequency signal and 'step it down' to one single, standard, lower frequency. Then, we just build one really good, cheap amplifier for that exact lower frequency." },

      // --- SECTION: THE MAGIC COMPONENTS ---
      { "type": "heading", "text": "47.2 The Magic Components: LO, Mixer, and IF" },
      { "type": "para", "text": "To step the frequency down, the receiver uses two main components to create a third:" },
      { "type": "table",
        "headers": ["Component", "Symbol", "What does it do?"],
        "rows": [
          ["<b>Local Oscillator</b>", "\\(f_{LO}\\)", "An internal signal generator inside your radio. When you turn the tuning knob on a radio, you are actually just changing the frequency of the Local Oscillator."],
          ["<b>The Mixer</b>", "\\(\\otimes\\)", "A multiplier. It takes the incoming antenna signal (\\(f_s\\)) and multiplies it with the Local Oscillator (\\(f_{LO}\\)). This math creates two new frequencies: the sum and the <b>difference</b>."],
          ["<b>Intermediate Frequency</b>", "\\(IF\\)", "The 'Difference' frequency produced by the mixer. This is our target 'stepped-down' frequency. <b>\\(IF = |f_s - f_{LO}|\\)</b>. For standard AM radio, \\(IF\\) is always 455 kHz."]
        ]
      },

      // --- SECTION: THE EXAM CHEAT CODE ---
      { "type": "heading", "text": "47.3 The Enemy: Image Frequency (\\(f_{si}\\))" },
      { "type": "para", "text": "Here is the biggest flaw of the mixer: Mathematics is a two-way street. If \\(IF = f_{LO} - f_s\\), there is mathematically <i>another</i> ghost frequency higher up the spectrum that will produce the exact same IF if it enters the mixer: \\(IF = f_{si} - f_{LO}\\)." },
      { "type": "para", "text": "This ghost frequency is called the <b>Image Frequency</b>. If it sneaks into your antenna, it will sit directly on top of your desired station and ruin the audio. It is exactly \\(2 \\times IF\\) away from your target station." },
      
      { "type": "heading", "text": "47.4 Master Formula: Image Frequency" },
      { "type": "para", "text": "<b>THE CHEAT CODE:</b> If a question gives you the signal frequency (\\(f_s\\)) and the Intermediate Frequency (\\(IF\\)), use this exact formula:" },
      { "type": "eq", "tex": "f_{si} = f_s + 2IF" },
      { "type": "list", "items": [
          "<b>Example:</b> You want to listen to a station at \\(1000\\text{ kHz}\\). Your radio has an \\(IF\\) of \\(455\\text{ kHz}\\).",
          "What is the Image Frequency? \\(f_{si} = 1000 + 2(455) = 1000 + 910 = 1910\\text{ kHz}\\).",
          "<i>Meaning:</i> If there is a radio station broadcasting at \\(1910\\text{ kHz}\\), you will hear both stations at the same time!"
        ]
      },

      // --- SECTION: IMAGE REJECTION RATIO ---
      { "type": "heading", "text": "47.5 Fixing the Problem: Image Rejection Ratio (IRR)" },
      { "type": "para", "text": "To stop the Image Frequency, we put a basic filter (the Pre-selector) right at the antenna to block \\(f_{si}\\) before it ever reaches the mixer." },
      { "type": "para", "text": "Exams will ask you to calculate the <b>Image Rejection Ratio (\\(\\alpha\\))</b>. You need two formulas for this:" },
      { "type": "list", "items": [
          "<b>Step 1: Calculate \\(\\rho\\) (rho).</b> This is just a ratio of the two frequencies: <br>\\( \\rho = \\frac{f_{si}}{f_s} - \\frac{f_s}{f_{si}} \\)",
          "<b>Step 2: Calculate IRR (\\(\\alpha\\)).</b> You need the Quality Factor (\\(Q\\)) of the antenna filter. <br>\\( \\alpha = \\sqrt{1 + Q^2 \\rho^2} \\)"
        ]
      },

      // --- SECTION: SIMULATOR ---
      { "type": "heading", "text": "47.6 Interactive Superheterodyne Spectrum Visualizer" },
      { "type": "para", "text": "Adjust the target Signal Frequency (\\(f_s\\)) and watch how the Local Oscillator (\\(f_{LO}\\)) automatically tracks it to maintain a constant IF. Notice how the dangerous Image Frequency (\\(f_{si}\\)) is always exactly \\(2 \\times IF\\) away!" },
      { "type": "canvas_sim", "simId": "superhet_spectrum_sim", "height": 340, "controlLabel": "Target Antenna Signal (fs) in kHz:", "min": 500, "max": 1500, "step": 10, "defaultVal": 1000 }
    ]
  },
  
  {
    "id": "baseband_pam_constellation",
    "label": "48 · Constellations & PAM",
    "title": "48. Baseband Digital (2-Ary PAM) & Constellation Diagrams",
    "content": [
      { "type": "heading", "text": "48.1 Master Formula Block: 2-Ary PAM" },
      { "type": "para", "text": "Screenshot this. This is the ultimate cheat sheet for 2-Ary Pulse Amplitude Modulation." },
      { "type": "list", "items": [
          "<b>Symbol Energy ($E_s$):</b> $E_s = A^2 T_b$ <i>(Amplitude squared times bit duration)</i>",
          "<b>Distance between points ($d_{12}$):</b> $d_{12} = 2\\sqrt{E_s}$",
          "<b>General Error Formula:</b> $P_e = Q\\left[ \\sqrt{\\frac{d_{12}^2}{2N_0}} \\right]$",
          "<b>Exact 2-Ary PAM Error:</b> $P_e = Q\\left[ \\sqrt{\\frac{2A^2 T_b}{N_0}} \\right]$"
        ]
      },
      { "type": "heading", "text": "48.2 What is 2-Ary PAM? (The Simple Kid Translation)" },
      { "type": "para", "text": "In digital baseband, we aren't sending smooth analog sine waves anymore. We are sending raw digital bits (0s and 1s)." },
      { "type": "para", "text": "<b>2-Ary</b> just means 'Binary' (2 levels). <b>PAM</b> means 'Pulse Amplitude Modulation'. So, we are just sending flat rectangular pulses of voltage to represent our bits over a specific time duration called $T_b$ (Bit Time)." },
      { "type": "list", "items": [
          "<b>To send a '1':</b> We send a positive voltage pulse ($+A$). Signal $S_1(t) = A$.",
          "<b>To send a '0':</b> We send a negative voltage pulse ($-A$). Signal $S_2(t) = -A$."
        ]
      },
      { "type": "heading", "text": "48.3 Calculating the Energy ($E_s$)" },
      { "type": "para", "text": "In digital communications, receivers don't just look at the peak voltage to decide if a bit is a 1 or a 0. They look at the total <b>Energy</b> of the pulse. This makes it much harder for noise to trick the receiver." },
      { "type": "para", "text": "Energy is simply the Area of the squared voltage over time: $Energy = Voltage^2 \\times Time$." },
      { "type": "list", "items": [
          "Energy of sending a '1': $E_{s1} = (A)^2 \\times T_b = A^2 T_b$",
          "Energy of sending a '0': $E_{s2} = (-A)^2 \\times T_b = A^2 T_b$"
        ]
      },
      { "type": "para", "text": "<i>Notice that it takes the exact same amount of energy to send a 0 as it does to send a 1!</i> We call this average symbol energy $E_s$." },
      { "type": "heading", "text": "48.4 What the heck is a Constellation Diagram?" },
      { "type": "para", "text": "This is what confuses everyone. You are used to seeing Voltage vs. Time graphs. A Constellation Diagram is different: <b>It is just a 1D Number Line of Energy.</b>" },
      { "type": "para", "text": "Instead of drawing boxes over time, we just put dots on a number line to show where our signals live in 'Energy Space' (which has an axis labeled $\\phi(t)$)." },
      { "type": "list", "items": [
          "<b>Point 1 (for bit '1'):</b> Lives on the right side at $+\\sqrt{E_s}$.",
          "<b>Point 2 (for bit '0'):</b> Lives on the left side at $-\\sqrt{E_s}$."
        ]
      },
      { "type": "para", "text": "<b>Why do we care? Distance!</b><br>The receiver has to guess which dot was sent. If noise pushes the dot past the '0' origin line, the receiver makes an error. Therefore, the distance between the two dots ($d_{12}$) is the most important metric in digital comms. The further apart they are, the harder it is to make an error." },
      { "type": "eq", "tex": "d_{12} = \\sqrt{E_s} - (-\\sqrt{E_s}) = 2\\sqrt{E_s}" },
      { "type": "heading", "text": "48.5 Calculating Probability of Error ($P_e$)" },
      { "type": "para", "text": "Sir uses a master formula that works for *any* constellation diagram. The probability of error depends purely on how far apart the dots are ($d_{12}$) and how strong the noise is ($N_0$)." },
      { "type": "eq", "tex": "P_e = Q\\left[ \\sqrt{\\frac{d_{12}^2}{2N_0}} \\right]" },
      { "type": "para", "text": "Since we just proved that $d_{12} = 2\\sqrt{E_s}$, we can plug that in:" },
      { "type": "eq", "tex": "d_{12}^2 = (2\\sqrt{E_s})^2 = 4E_s = 4A^2 T_b" },
      { "type": "para", "text": "Substitute this into the Master Formula:" },
      { "type": "eq", "tex": "P_e = Q\\left[ \\sqrt{\\frac{4A^2 T_b}{2N_0}} \\right] = Q\\left[ \\sqrt{\\frac{2A^2 T_b}{N_0}} \\right]" },
      { "type": "heading", "text": "48.6 Interactive Constellation & Energy Visualizer" },
      { "type": "para", "text": "Adjust the pulse Amplitude ($A$), Bit Duration ($T_b$), and Noise to see how the Constellation dots move on the number line. Notice that increasing Amplitude or Time pushes the dots further apart, increasing the distance ($d_{12}$) and lowering the Error Probability!" }
    ]
  },
  {
    "id": "4ary_pam_constellations",
    "label": "49 · 4-Ary PAM",
    "title": "49. 4-Ary PAM & The 'Energies From Hell'",
    "content": [
      { "type": "heading", "text": "49.1 What is 4-Ary PAM?" },
      { "type": "para", "text": "In 2-Ary PAM, we sent 1 bit at a time using 2 voltage levels ($+A$ and $-A$). In <b>4-Ary PAM</b>, we get greedy. We want to send <b>2 bits at the exact same time</b>." },
      { "type": "list", "items": [
          "Since we are sending 2 bits together, there are 4 possible combinations: '00', '01', '10', '11'.",
          "To represent 4 different combinations, we need <b>4 different voltage levels</b>.",
          "<b>The Time Bonus:</b> Because we are sending 2 bits at once, the pulse gets to last twice as long! So the new Symbol Duration is <b>\\(T = 2T_b\\)</b>."
        ]
      },
      { "type": "heading", "text": "49.2 Sir's Voltage Mapping" },
      { "type": "para", "text": "Based on the lecture notes, here is how the 4 bit combinations are mapped to voltages over the time period \\(T = 2T_b\\):" },
      { "type": "table",
        "headers": ["Bits", "Voltage Level"],
        "rows": [
          ["<b>00</b>", "\\(+A\\)"],
          ["<b>01</b>", "\\(+A/2\\)"],
          ["<b>10</b>", "\\(-A/2\\)"],
          ["<b>11</b>", "\\(-A\\)"]
        ]
      },
      { "type": "heading", "text": "49.3 Where do the 'Energies' come from?" },
      { "type": "para", "text": "To draw the Constellation Diagram, we must convert those Voltages into Energy Coordinates. Here is the 'Simple Kid' rule:" },
      { "type": "eq", "tex": "\\text{Coordinate} = \\text{Voltage} \\times \\sqrt{\\text{Time}}" },
      { "type": "para", "text": "Since our Time for 4-Ary PAM is \\(2T_b\\), we just multiply every voltage level by \\(\\sqrt{2T_b}\\):" },
      { "type": "list", "items": [
          "<b>Outer Right Dot ('00'):</b> \\(+A \\times \\sqrt{2T_b}\\)",
          "<b>Inner Right Dot ('01'):</b> \\(+\\frac{A}{2} \\times \\sqrt{2T_b}\\)",
          "<b>Inner Left Dot ('10'):</b> \\(-\\frac{A}{2} \\times \\sqrt{2T_b}\\)",
          "<b>Outer Left Dot ('11'):</b> \\(-A \\times \\sqrt{2T_b}\\)"
        ]
      },
      { "type": "heading", "text": "49.4 The Distance Trap (\\(d_{min}\\))" },
      { "type": "para", "text": "The Probability of Error (\\(P_e\\)) depends entirely on how close the dots are to each other. The closer they are, the easier it is for noise to push one dot into another's territory." },
      { "type": "para", "text": "In Sir's specific example, the dots are NOT equally spaced!" },
      { "type": "list", "items": [
          "The distance between \\(A\\) and \\(A/2\\) is <b>\\(A/2\\)</b>.",
          "The distance between \\(A/2\\) and \\(-A/2\\) across the zero line is <b>\\(A\\)</b>."
        ]
      },
      { "type": "para", "text": "Because the smallest gap is what causes the most errors, our Minimum Distance (\\(d_{min}\\)) is based on the \\(A/2\\) gap. In energy space, this becomes:" },
      { "type": "eq", "tex": "d_{min} = \\frac{A}{2}\\sqrt{2T_b}" },
      { "type": "heading", "text": "49.5 Interactive 2-Ary vs 4-Ary Constellation Plotter" },
      { "type": "para", "text": "Use the widget below to switch between 2-Ary and 4-Ary PAM. Watch how grouping the bits instantly doubles the time (\\(T_b \\to 2T_b\\)), splits the voltages, and forces 4 dots onto the Constellation line. You can clearly see where the coordinate math comes from." }
    ]
  },
  {
    "id": "bandpass_digital_modulation",
    "label": "50 · ASK, PSK, FSK",
    "title": "50. Bandpass Digital Communication & Master Energy Sheet",
    "content": [
      { "type": "heading", "text": "50.1 Master Cheat Sheet: Energies & P_e" },
      { "type": "para", "text": "Screenshot this. If you are asked to calculate Energy or Probability of Error (\\(P_e\\)), use these shortcuts. Note: A sinusoidal carrier averages out to half power, which is why Bandpass energy divides by 2!" },
      { "type": "list", "items": [
          "<b>Baseband Pulse Energy:</b> \\( E = A^2 T_b \\)",
          "<b>Bandpass (Sinusoidal) Energy:</b> \\( E = \\frac{A^2 T_b}{2} \\)",
          "<b>ASK (On-Off Keying) Energy:</b> \\(E_1 = \\frac{A^2 T_b}{2}\\) (for '1'), \\(E_2 = 0\\) (for '0').",
          "<b>PSK (Phase Shift) Energy:</b> \\(E_1 = \\frac{A^2 T_b}{2}\\) (for '1'), \\(E_2 = \\frac{A^2 T_b}{2}\\) (for '0').",
          "<b>General Error Formula:</b> \\(P_e = Q\\left[ \\frac{d_{12}}{\\sqrt{2N_0}} \\right]\\) <i>(where \\(d_{12}\\) is the distance between points on the constellation)</i>"
        ]
      },
      { "type": "heading", "text": "50.2 The Shapes: Baseband vs. Bandpass (Fourier)" },
      { "type": "para", "text": "Why do we even use carriers? Because baseband digital pulses are square waves. If you try to transmit a square wave over the air, it dies. We use a carrier wave (a high-frequency sine wave) to carry the square wave through the air." },
      { "type": "table",
        "headers": ["Time Domain Shape", "Fourier Transform (Frequency Domain)", "Why it matters"],
        "rows": [
          ["<b>Baseband Pulse</b> (A square box from 0 to \\(T_b\\))", "<b>Sinc Function</b> \\(P(f)\\) centered at 0 Hz.", "Low frequency. Cannot travel through the air. Antenna would have to be miles long."],
          ["<b>Carrier Wave</b> (Pure continuous sine wave)", "<b>Two Impulses</b> at \\(+f_c\\) and \\(-f_c\\).", "The 'vehicle' that carries the data."],
          ["<b>Bandpass Pulse</b> (A sine wave trapped inside a square box)", "<b>Shifted Sinc Function</b> \\(S(f)\\) centered at \\(f_c\\).", "This is what is actually transmitted! The data is now at a high frequency."]
        ]
      },
      { "type": "heading", "text": "50.3 The Big Three: ASK, PSK, FSK" },
      { "type": "para", "text": "To send digital 1s and 0s using a carrier wave, we must change one of three things about the wave: its Amplitude, its Phase, or its Frequency." },
      { "type": "list", "items": [
          "<b>1. ASK (Amplitude Shift Keying):</b> Also called OOK (On-Off Keying).<br>• Send a '1': Turn the carrier ON. \\(S_1(t) = A\\cos(2\\pi f_c t)\\)<br>• Send a '0': Turn the carrier OFF. \\(S_2(t) = 0\\)",
          "<b>2. PSK (Phase Shift Keying):</b><br>• Send a '1': Carrier starts normal. \\(S_1(t) = A\\cos(2\\pi f_c t)\\)<br>• Send a '0': Flip the carrier upside down (180° phase shift). \\(S_2(t) = -A\\cos(2\\pi f_c t)\\)",
          "<b>3. FSK (Frequency Shift Keying):</b><br>• Send a '1': Fast sine wave. \\(S_1(t) = A\\cos(2\\pi f_{c1} t)\\)<br>• Send a '0': Slow sine wave. \\(S_2(t) = A\\cos(2\\pi f_{c2} t)\\)"
        ]
      },
      { "type": "heading", "text": "50.4 The Transmitter Diagram (How it works)" },
      { "type": "para", "text": "Sir showed a block diagram of the Transmitter. Here is the 'Simple Kid' translation:" },
      { "type": "list", "items": [
          "<b>\\(m(t) \\to S \\to Q \\to E\\):</b> This just means Sampling, Quantizing, and Encoding. It turns an analog voice into digital 1s and 0s.",
          "<b>Line Coder:</b> Turns the 1s and 0s into actual physical DC voltages (like +5V for '1' and 0V for '0'). This is the baseband pulse \\(p(t)\\).",
          "<b>Mixer (\\(\\otimes\\)):</b> The magic multiplier. It takes the DC voltages \\(p(t)\\) and multiplies them by the Carrier \\(\\cos(2\\pi f_c t)\\). This creates the final Bandpass Signal!"
        ]
      },
      { "type": "heading", "text": "50.5 The Receiver & Matched Filter" },
      { "type": "para", "text": "At the receiver, the signal arrives mixed with AWGN (noise). To clean it up, we use a <b>Matched Filter</b>." },
      { "type": "para", "text": "<b>What does it do?</b> A Matched Filter is mathematically designed to maximize the Signal-to-Noise Ratio (SNR) exactly at the end of the bit duration (\\(t = T_b\\)). It takes the messy incoming wave, integrates the energy, and outputs a single dot. The <b>Decision Device</b> looks at that dot. If it is above a certain threshold (\\(\\lambda\\)), it guesses '1'. If it is below, it guesses '0'." },
      { "type": "heading", "text": "50.6 Interactive Transmitter Visualizer" },
      { "type": "para", "text": "This simulator perfectly recreates the Transmitter Mixer diagram from Sir's lecture. Select the Modulation Type (ASK, PSK, or FSK). Watch how the Baseband Pulse \\(p(t)\\) (the digital 1s and 0s) interacts with the Carrier Wave to generate the final Transmitted Bandpass Signal." },
      
      // --- SECTION: PAM SIMULATOR HOOK ---
      { "type": "heading", "text": "50.4 Interactive: 2-Ary vs 4-Ary PAM Constellations" },
      { "type": "para", "text": "To plot a constellation dot, the coordinate rule is always: <b>Voltage × √(Time)</b>. Watch how changing to 4-Ary PAM doubles the time to \\(2T_b\\) and shifts the energy coordinates." },
      { "type": "canvas_sim_select", "simId": "pam_constellation_sim", "height": 380, "controlLabel": "Select PAM Type:",
        "options": [
          { "value": "2ary", "text": "2-Ary PAM (1 bit per symbol)" },
          { "value": "4ary", "text": "4-Ary PAM (2 bits per symbol)" }
        ]
      },

      // --- SECTION: TRANSMITTER SIMULATOR HOOK ---
      { "type": "heading", "text": "50.5 Interactive: ASK, PSK, FSK Transmitter Waveforms" },
      { "type": "para", "text": "Watch exactly how the Baseband Pulse \\(p(t)\\) multiplies with the Carrier Wave to generate the final Transmitted Bandpass Signal." },
      { "type": "canvas_sim_select", "simId": "bandpass_transmitter_sim", "height": 400, "controlLabel": "Select Modulation Type:",
        "options": [
          { "value": "ask", "text": "1. ASK / OOK (Amplitude Shift Keying)" },
          { "value": "psk", "text": "2. PSK (Phase Shift Keying)" },
          { "value": "fsk", "text": "3. FSK (Frequency Shift Keying)" }
        ]
      },
    ]
  },

  // ══════════════════════════
  // CHAPTER 51 — Correlator Receivers & ASK
  // ══════════════════════════
  {
    "id": "correlator_receivers_ask",
    "label": "51 · Correlators & ASK",
    "title": "51. Correlator Receivers & ASK Performance",
    "content": [

      // --- SECTION: CORRELATOR RECEIVER ---
      { "type": "heading", "text": "51.1 The Correlator Receiver Architecture" },
      { "type": "para", "text": "For bandpass digital signals like ASK, PSK, and FSK, we use a <b>Correlator Receiver</b> to detect the signal in the presence of Additive White Gaussian Noise (AWGN). The architecture consists of a multiplier, an integrator, a sampler, and a decision device." },
      { "type": "list", "items": [
          "<b>1. Multiplier (Mixer):</b> The incoming noisy signal \\(S(t) + W(t)\\) is multiplied by a locally generated orthonormal basis function \\(\\phi(t)\\).",
          "<b>2. Integrator:</b> The product \\(x(t)\\) is integrated over one exact bit duration \\(T_b\\). <br>\\(y(t) = \\int_0^{T_b} x(t) dt\\)",
          "<b>3. Sampler:</b> A switch closes exactly at \\(t = T_b\\) to sample the accumulated energy, yielding a scalar value \\(Y\\).",
          "<b>4. Decision Device (D.D.):</b> Compares \\(Y\\) against an optimal threshold (\\(\\lambda_{opt}\\)) to output the estimated bit \\(\\hat{Y}\\)."
        ]
      },
      { "type": "para", "text": "For this to work, the bit duration \\(T_b\\) must be an integer multiple of the carrier period: \\(T_b = \\frac{K}{f_c}\\)." },

      // --- SECTION: BASIS FUNCTION ---
      { "type": "heading", "text": "51.2 The Basis Function & Phase Error" },
      { "type": "para", "text": "The local basis function \\(\\phi(t)\\) must be perfectly synchronized with the incoming carrier. It is defined as:" },
      { "type": "eq", "tex": "\\phi(t) = \\sqrt{\\frac{2}{T_b}} \\cos(\\omega_c t + \\theta) \\quad \\text{for } 0 \\le t \\le T_b" },
      { "type": "para", "text": "If there is a phase mismatch (\\(\\theta\\)) between the transmitter and the receiver's local oscillator, it degrades the detected energy by a factor of \\(\\cos \\theta\\). If \\(\\theta = 0\\), the detection is perfectly coherent." },

      // --- SECTION: ASK ENERGY ---
      { "type": "heading", "text": "51.3 ASK (OOK) Signal Energy" },
      { "type": "para", "text": "In Amplitude Shift Keying (or On-Off Keying), we transmit a carrier for '1' and nothing for '0'. The symbol energies are calculated by integrating the squared signal over \\(T_b\\):" },
      { "type": "list", "items": [
          "<b>For Bit '1':</b> \\(S_1(t) = A \\cos(2\\pi f_c t)\\). <br>Energy \\(E_{s1} = \\int_0^{T_b} A^2 \\cos^2(2\\pi f_c t) dt = \\frac{A^2}{2} \\times T_b\\)",
          "<b>For Bit '0':</b> \\(S_2(t) = 0\\). <br>Energy \\(E_{s2} = 0\\)"
        ]
      },

      // --- SECTION: AVERAGE BIT ENERGY ---
      { "type": "heading", "text": "51.4 Average Bit Energy \\((E_b)_{avg}\\)" },
      { "type": "para", "text": "Assuming 1s and 0s are equally likely (\\(P(0) = P(1) = 0.5\\)), the Average Bit Energy is the weighted sum of the individual symbol energies:" },
      { "type": "eq", "tex": "(E_b)_{avg} = p_1 E_{s1} + p_2 E_{s2}" },
      { "type": "eq", "tex": "(E_b)_{avg} = \\frac{E_{s1} + E_{s2}}{2} = \\frac{\\frac{A^2 T_b}{2} + 0}{2} = \\frac{A^2 T_b}{4}" },

      // --- SECTION: CONSTELLATION & PROBABILITY OF ERROR ---
      { "type": "heading", "text": "51.5 Constellation & Probability of Error (\\(P_e\\))" },
      { "type": "para", "text": "On the 1D constellation diagram for ASK, the symbols are located at:" },
      { "type": "list", "items": [
          "\\(S_1\\) is at coordinate \\(\\sqrt{E_{s1}}\\) (or \\(\\sqrt{A^2 T_b / 2}\\)).",
          "\\(S_2\\) is at the origin \\((0, 0)\\)."
        ]
      },
      { "type": "para", "text": "The optimal decision threshold \\(\\lambda_{opt}\\) is placed exactly halfway between them: \\(\\lambda_{opt} = \\frac{\\sqrt{E_{s1}}}{2}\\)." },
      { "type": "para", "text": "The probability of error is determined by the distance energy \\(E_d\\), where \\(E_d = \\int_0^{T_b} [S_1(t) - S_2(t)]^2 dt = \\frac{A^2 T_b}{2}\\):" },
      { "type": "eq", "tex": "P_e = Q \\left[ \\sqrt{\\frac{E_d}{2N_0}} \\right] = Q \\left[ \\sqrt{\\frac{A^2 T_b}{4N_0}} \\right]" },
      { "type": "para", "text": "Substituting the Average Bit Energy \\((E_b)_{avg} = \\frac{A^2 T_b}{4}\\) back into the equation reveals a massive shortcut for standard ASK/OOK:" },
      { "type": "eq", "tex": "P_e = Q \\left[ \\sqrt{\\frac{(E_b)_{avg}}{N_0}} \\right]" },
      
      // --- SECTION: PHASE ERROR IMPACT ---
      { "type": "heading", "text": "51.6 Impact of Phase Error on \\(P_e\\)" },
      { "type": "para", "text": "If the correlator basis function has a phase error \\(\\theta\\), the effective distance between the constellation points shrinks, increasing the probability of error:" },
      { "type": "eq", "tex": "P_e = Q \\left[ \\sqrt{\\frac{A^2 T_b \\cos^2 \\theta}{4 N_0}} \\right]" },

      // --- SECTION: SIMULATOR ---
      { "type": "heading", "text": "51.7 Interactive Correlator & ASK Constellation" },
      { "type": "para", "text": "Adjust the Amplitude, Bit Time, and Phase Error (\\(\\theta\\)) to see how the Correlator maps the Bandpass signal onto the 1D Energy Constellation. Notice how Phase Error shrinks the coordinate of \\(S_1\\), moving it closer to the threshold and ruining the error rate." },
      { "type": "canvas_sim", "simId": "correlator_ask_sim", "height": 380, "controlLabel": "Phase Error (θ) in degrees:", "min": 0, "max": 90, "step": 1, "defaultVal": 0 }

    ]
  },
  
  
  // ══════════════════════════
  // CHAPTER 6 — Interactives
  // ══════════════════════════
  {
    id: "interactives",
    label: "▶ Simulators",
    title: "Interactive Signal Simulators",
    content: [
      { type: "heading", text: "6.1 AM Modulation Index (μ)" },
      { type: "para", text: "Adjust the Modulation Index to observe under-modulation, critical modulation, and over-modulation (envelope crossover)." },
      // Notice the new type here!
      { type: "canvas_sim", simId: "am_sim", height: 160, controlLabel: "Modulation Index (μ):", min: 0, max: 1.5, step: 0.1, defaultVal: 0.5 },

      { type: "heading", text: "6.2 Frequency Modulation (FM)" },
      { type: "para", text: "Observe how varying the modulation index (β) changes the frequency deviation of the carrier." },
      { type: "canvas_sim", simId: "fm_sim", height: 160, controlLabel: "Modulation Index (β):", min: 0, max: 15, step: 1, defaultVal: 5 },
      
      { type: "heading", text: "6.3 Time Shifting Operations" },
      { type: "para", text: "Shifting a signal moves it along the temporal axis without altering its shape. A right shift (delay) is represented by \\(x(t - a)\\), while a left shift (advance) is \\(x(t + a)\\)." },
      { type: "canvas_sim", simId: "shift_sim", height: 160, controlLabel: "Time Shift (a):", min: -5, max: 5, step: 0.5, defaultVal: 0 },
      
      { type: "heading", text: "6.4 Frequency Domain Spectrum" },
      { type: "para", text: "Visualizing the AM signal in the frequency domain. The central impulse represents the Carrier power (\\(P_c\\)), while the triangles represent the Lower and Upper Sidebands (LSB & USB). Adjust \\(\\mu\\) to see the sideband power change." },
      { type: "canvas_sim", simId: "spectrum_sim", height: 180, controlLabel: "Modulation Index (μ):", min: 0, max: 1.5, step: 0.1, defaultVal: 0.5 },

      { type: "heading", text: "6.5 Envelope Detection & Phase Reversal" },
      { type: "para", text: "The solid green line shows what an Envelope Detector actually reads: \\(|A_c + m(t)|\\). Notice what happens to the detected signal when \\(\\mu > 1\\)." },
      { type: "canvas_sim", simId: "envelope_sim", height: 180, controlLabel: "Modulation Index (μ):", min: 0, max: 1.8, step: 0.1, defaultVal: 0.8 },
      
      
    ]
  },



  // ── ADD MORE CHAPTERS BELOW ──
  // Just append another object like the ones above.
  // The nav will auto-update.

];
