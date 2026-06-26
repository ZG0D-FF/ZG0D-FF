(function() {
    // Comprehensive Quiz Data
    const quizData = [
        // CIA Triad (From DOCX Activity)
        { type: "MCQ", topic: "CIA Triad", question: "Which element of the CIA Triad is the highest priority for a Military Intelligence Agency?", options: ["Confidentiality", "Integrity", "Availability", "Authentication"], answer: [0], hint: "Classified intelligence data must not fall into enemy hands." },
        { type: "MCQ", topic: "CIA Triad", question: "Which element of the CIA Triad is the highest priority for a Hospital's life-support systems?", options: ["Confidentiality", "Integrity", "Availability", "Authorization"], answer: [2], hint: "The systems must be up and running 24/7 to save lives." },
        { type: "MSQ", topic: "CIA Triad", question: "For an Online Banking Service, which of the following CIA components are generally considered the most critical priorities?", options: ["Availability (to ensure 24/7 logins)", "Integrity (to ensure balances aren't altered)", "Confidentiality (to protect user data)", "Anonymity (to hide the bank's identity)"], answer: [1, 2], hint: "While Availability is important, altering balances (Integrity) or stealing financial data (Confidentiality) is catastrophic." },
        
        // Authentication & Federated Identity
        { type: "MCQ", topic: "Authentication", question: "Which of the following is an example of a possession-based authentication factor?", options: ["Password", "Fingerprint", "Smartcard", "Typing rhythm"], answer: [2], hint: "Think about 'something you have'." },
        { type: "MSQ", topic: "Authentication", question: "Select all valid methods for Federated Identity Systems.", options: ["OAuth 2.0", "TOTP", "SAML", "OpenID Connect"], answer: [0, 2, 3], hint: "These are frameworks designed for SSO and delegated authorization." },
        { type: "MCQ", topic: "Authentication", question: "What does the 'A' in the AAA model stand for regarding tracking user actions?", options: ["Authentication", "Authorization", "Accounting", "Availability"], answer: [2], hint: "It involves logging and auditing." },
        { type: "MSQ", topic: "Authentication", question: "Which of the following are benefits of Multi-Factor Authentication (MFA)?", options: ["Higher security safeguards", "Faster login times", "Prevents credential stuffing", "Immune to SIM swapping"], answer: [0, 2], hint: "It adds security but can actually increase login time and still has vulnerabilities like SIM swapping." },
        { type: "MCQ", topic: "Authentication", question: "HOTP and TOTP are examples of which type of authentication?", options: ["Biometric", "Federated", "Token-Based", "Passwordless"], answer: [2], hint: "They generate one-time passwords." },
        { type: "MSQ", topic: "Authentication", question: "Common attacks against authentication systems include:", options: ["Phishing", "Man-in-the-Middle", "Credential Stuffing", "SQL Injection"], answer: [0, 1, 2], hint: "SQL injection usually targets databases, though it can bypass auth, the first three are direct credential attacks." },
        { type: "MCQ", topic: "Authentication", question: "What does FIDO2/WebAuthn enable?", options: ["Phishing-resistant passwordless login", "Symmetric key exchange", "Faster database queries", "Network traffic encryption"], answer: [0], hint: "It uses public-key cryptography via hardware security keys." },

        // Defensive Architecture
        { type: "MCQ", topic: "Defensive Architecture", question: "What is the primary role of a Honeypot?", options: ["To block incoming traffic", "To route internal traffic", "To act as a decoy to lure attackers", "To encrypt passwords"], answer: [2], hint: "It's a trap." },
        { type: "MSQ", topic: "Defensive Architecture", question: "Which components are typically part of a defensive network architecture?", options: ["Firewall", "IDS/IPS", "Honeypot", "Rainbow Table"], answer: [0, 1, 2], hint: "A rainbow table is an attacker's tool, not a defensive component." },
        { type: "MCQ", topic: "Defensive Architecture", question: "What does IDS stand for?", options: ["Intrusion Detection System", "Internal Data Server", "Internet Domain Service", "Integrated Defense System"], answer: [0], hint: "It detects unauthorized access." },
        { type: "MCQ", topic: "Defensive Architecture", question: "What is the primary difference between an IDS and an IPS?", options: ["IDS blocks traffic; IPS only alerts", "IPS is hardware; IDS is software", "IDS only alerts; IPS actively blocks threats", "There is no difference"], answer: [2], hint: "The 'P' stands for Prevention." },
        { type: "MSQ", topic: "Defensive Architecture", question: "Which of the following are types of Firewalls?", options: ["Packet-filtering", "Stateful inspection", "Next-Generation (NGFW)", "Quantum-filtering"], answer: [0, 1, 2], hint: "Quantum-filtering is not a standard firewall type." },

        // Cryptography
        { type: "MCQ", topic: "Cryptography", question: "What is the primary purpose of Salting in password hashing?", options: ["To speed up hashing", "To defend against rainbow table attacks", "To encrypt the password symmetrically", "To compress the password"], answer: [1], hint: "It adds random data to make precomputed hashes useless." },
        { type: "MSQ", topic: "Cryptography", question: "Which of the following are secure password hashing algorithms?", options: ["MD5", "bcrypt", "Argon2", "SHA-1"], answer: [1, 2], hint: "MD5 and SHA-1 are considered broken for password hashing." },
        { type: "MCQ", topic: "Cryptography", question: "In Asymmetric Encryption, what key does the sender use to encrypt a message intended for Bob?", options: ["The Sender's Private Key", "Bob's Private Key", "Bob's Public Key", "A Shared Secret Key"], answer: [2], hint: "You use the recipient's public key." },
        { type: "MCQ", topic: "Cryptography", question: "Which of the following represents a symmetric encryption algorithm?", options: ["RSA", "AES", "ECC", "Diffie-Hellman"], answer: [1], hint: "Advanced Encryption Standard." },
        { type: "MSQ", topic: "Cryptography", question: "What are the core principles of Cryptography?", options: ["Confidentiality", "Integrity", "Non-repudiation", "Availability"], answer: [0, 1, 2], hint: "Cryptography secures data but doesn't inherently guarantee uptime (Availability)." },

        // Networking Basics
        { type: "MCQ", topic: "Networking", question: "Which protocol is responsible for resolving domain names to IP addresses?", options: ["HTTP", "DNS", "TCP", "FTP"], answer: [1], hint: "Domain Name System." },
        { type: "MSQ", topic: "Networking", question: "Which of the following are valid IPv4 addresses?", options: ["192.168.1.1", "256.0.0.1", "10.0.0.5", "172.16.254.1"], answer: [0, 2, 3], hint: "Each octet must be between 0 and 255." },
        { type: "MCQ", topic: "Networking", question: "What port does HTTPS typically operate on?", options: ["80", "21", "443", "22"], answer: [2], hint: "It's the secure version of port 80." },
        { type: "MCQ", topic: "Networking", question: "Which OSI layer is responsible for routing packets across different networks?", options: ["Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"], answer: [1], hint: "Layer 3, where IP operates." },
        { type: "MSQ", topic: "Networking", question: "Which of these protocols operate at the Transport Layer?", options: ["TCP", "IP", "UDP", "HTTP"], answer: [0, 2], hint: "They handle reliable and unreliable data transfer." },

        // Attack Lifecycle
        { type: "MCQ", topic: "Attack Lifecycle", question: "Which phase of the attack lifecycle involves gathering information about the target?", options: ["Exploitation", "Reconnaissance", "Lateral Movement", "Exfiltration"], answer: [1], hint: "It's the first step." },
        { type: "MSQ", topic: "Attack Lifecycle", question: "Which actions represent 'Lateral Movement'?", options: ["Pivoting to another server", "Stealing a database dump", "Scanning the internal network from a compromised host", "Registering a fake domain"], answer: [0, 2], hint: "Moving *within* the network." },
        { type: "MCQ", topic: "Attack Lifecycle", question: "What is the goal of the 'Exfiltration' phase?", options: ["Gaining initial access", "Extracting stolen data from the network", "Installing malware", "Covering tracks"], answer: [1], hint: "Sneaking the data out." },
        { type: "MCQ", topic: "Attack Lifecycle", question: "Which phase comes immediately after Reconnaissance in a typical cyber kill chain?", options: ["Weaponization", "Lateral Movement", "Actions on Objectives", "Delivery"], answer: [0], hint: "Creating the payload." },
        { type: "MSQ", topic: "Attack Lifecycle", question: "Which of the following represent methods of 'Delivery' in an attack lifecycle?", options: ["Phishing emails", "USB drops", "Compromised websites", "Cracking a hashed password offline"], answer: [0, 1, 2], hint: "How does the payload get to the victim?" },

        // Data Analytics & Monitoring
        { type: "MCQ", topic: "Data Analytics", question: "What is a SIEM primarily used for?", options: ["Encrypting databases", "Centralizing and analyzing security logs", "Hosting websites", "Filtering spam emails"], answer: [1], hint: "Security Information and Event Management." },
        { type: "MCQ", topic: "Data Analytics", question: "Which of the following is a key feature of User and Entity Behavior Analytics (UEBA)?", options: ["Blocking port 80", "Establishing a baseline of normal behavior to detect anomalies", "Encrypting user passwords", "Managing SSL certificates"], answer: [1], hint: "It looks for deviations from the norm." },
        { type: "MSQ", topic: "Data Analytics", question: "Which tools are commonly used for network traffic analysis?", options: ["Wireshark", "Zeek", "Nmap", "Photoshop"], answer: [0, 1], hint: "Nmap is for scanning, not deep traffic analysis, though it touches the network." },
        { type: "MCQ", topic: "Data Analytics", question: "In threat hunting, what does IoC stand for?", options: ["Indicator of Compromise", "Internal Operations Center", "Internet of Computers", "Incident over Cloud"], answer: [0], hint: "Evidence that a breach occurred." },
        { type: "MSQ", topic: "Data Analytics", question: "Which of the following are examples of IoCs?", options: ["A known malicious IP address", "A suspicious registry key change", "An unusual outbound traffic spike", "A normal user logging in at 9 AM"], answer: [0, 1, 2], hint: "Look for the anomalies." },

        // NEW: AI-Assisted Attackers
        { type: "MCQ", topic: "AI Attackers", question: "How does the definition of an 'AI-assisted attacker' differ from traditional threat actors?", options: ["They only use AI for spell-checking phishing emails.", "They incorporate generative or agentic AI as an active tool within the attack lifecycle itself.", "They are completely autonomous AI robots with no human operator.", "They only attack AI models."], answer: [1], hint: "AI is used as an active tool, not just for basic advice." },
        { type: "MCQ", topic: "AI Attackers", question: "Which specific state-sponsored group did Anthropic's Threat Intelligence team disrupt between Sept-Nov 2025 for using AI as a tool?", options: ["Lazarus Group", "GTG-1002", "Fancy Bear", "Anonymous"], answer: [1], hint: "Refer to the case study in your AI attackers worksheet." },
        { type: "MSQ", topic: "AI Attackers", question: "In what ways can threat actors (like GTG-1002) utilize Agentic AI during a campaign?", options: ["Automating reconnaissance and vulnerability discovery", "Generating highly convincing localized spear-phishing content", "Replacing the need for internet connectivity", "Rapidly writing and modifying exploitation scripts"], answer: [0, 1, 3], hint: "AI cannot replace the physical need for internet, but it can accelerate most digital tasks." },
        
        // NEW: Malware & Backdoors
        { type: "MCQ", topic: "Malware", question: "What is the primary characteristic of a 'Backdoor' malware?", options: ["It encrypts your files and demands a ransom.", "It bypasses normal authentication to create a secret entry point.", "It spreads rapidly across a network by exploiting vulnerabilities like a worm.", "It hides itself by injecting into legitimate processes without opening ports."], answer: [1], hint: "It skips the front door entirely." },
        { type: "MCQ", topic: "Malware", question: "How do backdoors most commonly get onto a victim's system initially?", options: ["They autonomously self-replicate through the internet.", "They are usually dropped onto the system by a Trojan (e.g., via a bad link or fake download).", "They are pre-installed by the hardware manufacturer.", "They guess your Wi-Fi password."], answer: [1], hint: "They need a delivery mechanism to trick the user." },
        { type: "MSQ", topic: "Malware", question: "Once a backdoor is installed, what actions can an attacker typically perform unnoticed?", options: ["Exfiltrate sensitive data", "Establish persistence for future access", "Physically damage the hard drive motor", "Download and execute additional malware payloads"], answer: [0, 1, 3], hint: "Software generally cannot physically destroy hardware components." },

        // NEW: Infrastructure Reconnaissance & Hashing (from Lab Docs)
        { type: "MCQ", topic: "Infrastructure Recon", question: "Which Nmap flag is used to perform a full port scan across all 65,535 ports?", options: ["-sV", "-p-", "-O", "-sC"], answer: [1], hint: "It explicitly defines the port range from 1 to 65535." },
        { type: "MCQ", topic: "Infrastructure Recon", question: "What is the primary purpose of the 'nc' (Netcat) or 'telnet' command during reconnaissance?", options: ["To hash passwords", "To perform Banner Grabbing and service analysis", "To decrypt SSL traffic", "To spoof IP addresses"], answer: [1], hint: "Connecting to a port manually reveals service headers." },
        { type: "MSQ", topic: "Hashing Fundamentals", question: "What are the standard lengths (in hexadecimal characters) for MD5 and SHA-256 hashes?", options: ["MD5 = 32 hex characters", "MD5 = 64 hex characters", "SHA-256 = 32 hex characters", "SHA-256 = 64 hex characters"], answer: [0, 3], hint: "MD5 is 128-bit (32 hex). SHA-256 is 256-bit (64 hex)." },

        // NEW: Cryptographic Fundamentals
        { type: "MCQ", topic: "Cryptography Fundamentals", question: "Which core goal of cryptography prevents a sender from denying they performed an action?", options: ["Confidentiality", "Integrity", "Authentication", "Non-repudiation"], answer: [3], hint: "It means they cannot repudiate (deny) it." },
        { type: "MSQ", topic: "Cryptography Fundamentals", question: "Which of the following are the five ingredients of a symmetric encryption scheme?", options: ["Plaintext", "Public Key", "Encryption algorithm", "Secret key", "Ciphertext", "Decryption algorithm"], answer: [0, 2, 3, 4, 5], hint: "Symmetric schemes do not use Public Keys." },
        { type: "MCQ", topic: "Cryptography Fundamentals", question: "Why is Symmetric Encryption primarily chosen over Asymmetric Encryption for encrypting databases and bulk data?", options: ["It uses two keys instead of one", "It is significantly faster and has lower computational overhead", "It prevents Man-in-the-Middle attacks automatically", "It is immune to quantum computers"], answer: [1], hint: "Efficiency and speed." },
        { type: "MSQ", topic: "Cryptography Fundamentals", question: "Which of the following are common applications of AES-256 symmetric encryption?", options: ["WhatsApp end-to-end encrypted messaging", "Password managers (encrypted vaults)", "HTTPS / TLS secure web communications", "Generating random IPv4 addresses"], answer: [0, 1, 2], hint: "AES encrypts data, it doesn't generate IP addresses." },

        // NEW: Advanced Cryptography & Attacks
        { type: "MCQ", topic: "Advanced Cryptography", question: "Which core information security principles does symmetric encryption fail to fully address?", options: ["Confidentiality and Authentication", "Integrity and Authentication", "Authentication and Non-repudiation", "Confidentiality and Non-repudiation"], answer: [2], hint: "Because it lacks digital signatures." },
        { type: "MSQ", topic: "Advanced Cryptography", question: "In Hybrid Encryption, what are the two main steps?", options: ["Step 1: Exchange a symmetric key by encrypting it with the receiver's public key.", "Step 1: Hash the plaintext with MD5.", "Step 2: Use the exchanged symmetric key to encrypt the actual data.", "Step 2: Physically mail the private key on a USB drive."], answer: [0, 2], hint: "Combine Asymmetric for key exchange and Symmetric for bulk data." },
        { type: "MCQ", topic: "Cryptographic Attacks", question: "Which countermeasure effectively defeats a Rainbow Table attack?", options: ["Using a firewall", "Salting the passwords before hashing", "Switching to an older hashing algorithm like MD5", "Using a shorter key length"], answer: [1], hint: "It prevents precomputed lookup tables from working." },

        // NEW: Replay & MITM Attacks
        { type: "MSQ", topic: "Cryptographic Attacks", question: "Which of the following are effective countermeasures against Replay Attacks?", options: ["Using Timestamps & Nonces to ensure unique requests", "Implementing Token Expiry", "Using older HTTP connections without TLS", "Storing plaintext passwords in the database"], answer: [0, 1], hint: "You need to prevent attackers from reusing intercepted, valid session data." },
        { type: "MCQ", topic: "Cryptographic Attacks", question: "What is the primary purpose of HSTS (HTTP Strict Transport Security) in defending against Man-in-the-Middle attacks?", options: ["It encrypts the database.", "It prevents SSL stripping by forcing browsers to use HTTPS.", "It blocks all traffic from unknown IP addresses.", "It acts as a physical Honeypot."], answer: [1], hint: "It forces the connection to stay secure." },
        { type: "MCQ", topic: "Cryptographic Attacks", question: "Among Man-in-the-Middle (MITM), Brute-Force, Dictionary, and Replay attacks, which cryptographic attack has historically been the most common in cyberattack attempts?", options: ["Man-in-the-Middle (MITM)", "Brute-Force", "Dictionary", "Replay attacks"], answer: [2], hint: "Automated credential stuffing using known breached lists is overwhelmingly common." },
        
        // NEW: CTF Fundamentals
        { type: "MCQ", topic: "CTF Fundamentals", question: "In a Capture The Flag (CTF) competition, what does the 'flag' typically represent?", options: ["A physical object to be stolen", "A hidden piece of text (e.g., FLAG{...}) proving a challenge was completed", "A malware payload", "A network vulnerability"], answer: [1], hint: "It is a string proving you solved the challenge." },
        { type: "MSQ", topic: "CTF Categories", question: "Which of the following skills are typically tested in Web Exploitation challenges?", options: ["SQL injection", "File carving from memory", "Cross-Site Scripting (XSS)", "Buffer overflows"], answer: [0, 2], hint: "Think about attacks that happen through a browser or against a web server." },
        { type: "MCQ", topic: "CTF Mindset", question: "Which CTF mindset principle emphasizes that 'you can't exploit what you don't know exists'?", options: ["Read the source", "Think outside the box", "Enumeration is everything", "Automation saves time"], answer: [2], hint: "It's about finding all the possible targets and paths." }
    ];

    const labData = [
        { scenario: "You need to view the contents of the local user database file in a Linux environment.", command: "cat /etc/passwd", hint: "Starts with 'cat'.", output: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nuser1:x:1000:1000:User,,,:/home/user1:/bin/bash" },
        { scenario: "Find all files in /var/log ending with .log", command: "find /var/log -name '*.log'", hint: "Use the 'find' command with -name.", output: "/var/log/syslog.log\n/var/log/auth.log\n/var/log/kern.log\n/var/log/apache2/access.log\n/var/log/apache2/error.log" },
        { scenario: "List all active listening ports numerically.", command: "netstat -tuln", hint: "Use netstat with options -tuln.", output: "Active Internet connections (only servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State      \ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN     \ntcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN     \nudp        0      0 0.0.0.0:53              0.0.0.0:*                          " },
        { scenario: "Change the permissions of 'script.sh' to be executable by the owner.", command: "chmod u+x script.sh", hint: "Use chmod.", output: "$ ls -l script.sh\n-rwxr--r-- 1 user user 123 Jun 25 10:00 script.sh" },
        { scenario: "[Lab III] Install the curl utility (Software reqs)", command: "sudo apt install curl", hint: "Use apt install", output: "Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  curl\n0 upgraded, 1 newly installed, 0 to remove.\nSetting up curl (7.81.0-1ubuntu1.16) ..." },
        { scenario: "[Lab III] Install the exiftool utility (Software reqs)", command: "sudo apt install exiftool", hint: "Use apt install", output: "Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  libimage-exiftool-perl exiftool\n0 upgraded, 2 newly installed, 0 to remove.\nSetting up libimage-exiftool-perl (12.40-1) ..." },
        { scenario: "[Lab III] Install the binutils package (Software reqs)", command: "sudo apt install binutils", hint: "Use apt install", output: "Reading package lists... Done\nBuilding dependency tree... Done\nbinutils is already the newest version (2.38-4ubuntu2.6).\n0 upgraded, 0 newly installed, 0 to remove." },
        { scenario: "[Lab III] Decompress the rockyou wordlist into the wordlists directory", command: "gunzip /usr/share/wordlists/rockyou.txt.gz -C /usr/share/wordlists/", hint: "Use gunzip with the -C flag", output: "Decompressing... Done.\n$ ls -lh /usr/share/wordlists/\ntotal 134M\n-rw-r--r-- 1 root root 134M Jun 25 10:05 rockyou.txt" },
        { scenario: "[Lab III] Install the steghide utility (Software reqs)", command: "sudo apt install steghide", hint: "Use apt install", output: "Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  steghide\n0 upgraded, 1 newly installed, 0 to remove.\nSetting up steghide (0.5.1-15) ..." },
        { scenario: "[Lab III - Ch 1] Download the cysec webpage and search for 'flag' case-insensitively", command: "curl -s http://cyberserv.securetech-labs.com | grep -i flag", hint: "Pipe curl -s to grep -i", output: "      <div class=\"hidden-flag\">FLAG{h1dd3n_1n_pl41n_51gh7}</div>" },
        { scenario: "[Lab III - Ch 1] Download the cysec webpage and search for hidden HTML comments", command: "curl -s http://cyberserv.securetech-labs.com | grep -i \"<!--\"", hint: "Search for <!--", output: "    <!-- DEV NOTE: Remember to remove FLAG{h1dd3n_1n_pl41n_51gh7} before production -->" },
        { scenario: "[Lab III - Ch 2] Check the robots.txt file for hidden paths", command: "curl -s http://cyberserv.securetech-labs.com/robots.txt", hint: "Fetch robots.txt via curl", output: "User-agent: *\nDisallow: /admin-panel/\nDisallow: /hidden-path/\nDisallow: /backup.zip" },
        { scenario: "[Lab III - Ch 2] Access the hidden path discovered in robots.txt", command: "curl -s http://cyberserv.securetech-labs.com/hidden-path/", hint: "Fetch /hidden-path/ via curl", output: "<html><body>\n<h1>Secret Admin Portal</h1>\n<p>Welcome back. Here is your token: FLAG{r0b075_c4n7_h1d3_3v3ry7h1ng}</p>\n</body></html>" },
        { scenario: "[Lab III - Ch 3] Decode the Base64 string 'Q1RGe2Jhc2U2NF9pc19ub3RfZW5jcnlwdGlvbn0='", command: "echo \"Q1RGe2Jhc2U2NF9pc19ub3RfZW5jcnlwdGlvbn0=\" | base64 -d", hint: "Pipe echo to base64 -d", output: "CTF{base64_is_not_encryption}" },
        { scenario: "[Lab III - Ch 3] Decode the Base64 string using Python", command: "python3 -c \"import base64; print(base64.b64decode('Q1RGe2Jhc2U2NF9pc19ub3RfZW5jcnlwdGlvbn0=').decode())\"", hint: "Use python3 -c with base64.b64decode", output: "CTF{base64_is_not_encryption}" },
        { scenario: "[Lab III - Ch 4] Decode the ROT13 string 'PGS{pnrfne_pvcure_vf_ebznagvp}' using tr", command: "echo \"PGS{pnrfne_pvcure_vf_ebznagvp}\" | tr 'A-Za-z' 'N-ZA-Mn-za-m'", hint: "Pipe echo to tr with alphabet shift", output: "CTF{caesar_cipher_is_romantic}" },
        { scenario: "[Lab III - Ch 4] Decode the ROT13 string using Python", command: "python3 -c \"import codecs; print(codecs.decode('PGS{pnrfne_pvcure_vf_ebznagvp}', 'rot_13'))\"", hint: "Use python3 -c with codecs.decode", output: "CTF{caesar_cipher_is_romantic}" },
        { scenario: "[Lab III - Ch 5] Download the challenge 5 image CyberAttack.jpg", command: "wget http://cyberserv.securetech-labs.com/challenge5/CyberAttack.jpg", hint: "Use wget to download the file", output: "--2026-06-25 10:15:00--  http://cyberserv.securetech-labs.com/challenge5/CyberAttack.jpg\nResolving cyberserv.securetech-labs.com... 192.168.1.100\nConnecting to 192.168.1.100:80... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 145020 (142K) [image/jpeg]\nSaving to: 'CyberAttack.jpg'\n\nCyberAttack.jpg     100%[===================>] 141.62K  --.-KB/s    in 0.05s" },
        { scenario: "[Lab III - Ch 5] Extract EXIF metadata from CyberAttack.jpg", command: "exiftool CyberAttack.jpg", hint: "Run exiftool on the file", output: "ExifTool Version Number         : 12.40\nFile Name                       : CyberAttack.jpg\nDirectory                       : .\nFile Size                       : 142 kB\nFile Modification Date/Time     : 2026:06:25 10:15:00+00:00\nImage Size                      : 800x600\nComment                         : FLAG{3x1f_m3t4d4t4_r3v34l3d}" },
        { scenario: "[Lab III - Ch 5] Extract printable strings from photo.jpg and search for flag", command: "strings photo.jpg | grep -i flag", hint: "Pipe strings to grep -i", output: "FLAG{5tr1ng5_4r3_y0ur_fr13nd}" },
        { scenario: "[Lab III - Ch 6] Write the target MD5 hash (5f4d...) to hash.txt", command: "echo \"5f4dcc3b5aa765d61d8327deb882cf99\" > hash.txt", hint: "Redirect echo output to hash.txt", output: "$ cat hash.txt\n5f4dcc3b5aa765d61d8327deb882cf99" },
        { scenario: "[Lab III - Ch 6] Write the admin MD5 hash (2123...) to hash.txt", command: "echo \"21232f297a57a5a743894a0e4a801fc3\" > hash.txt", hint: "Redirect echo output to hash.txt", output: "$ cat hash.txt\n21232f297a57a5a743894a0e4a801fc3" },
        { scenario: "[Lab III - Ch 6] Use hashcat to crack hash.txt against rockyou.txt (MD5 mode 0, straight mode 0)", command: "hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt", hint: "Use hashcat with -m 0 -a 0", output: "hashcat (v6.2.5) starting...\n\nDictionary cache hit:\n* Filename..: /usr/share/wordlists/rockyou.txt\n* Passwords.: 14344385\n\n5f4dcc3b5aa765d61d8327deb882cf99:password\n\nSession..........: hashcat\nStatus...........: Cracked\nHash.Mode........: 0 (MD5)" },
        { scenario: "[Lab III - Ch 6] Use John the Ripper to crack hash.txt (raw-md5 format)", command: "john --format=raw-md5 hash.txt --wordlist=/usr/share/wordlists/rockyou.txt", hint: "Use john with --format=raw-md5 and --wordlist", output: "Using default input encoding: UTF-8\nLoaded 1 password hash (raw-md5 [MD5 128/128 AVX 4x3])\nPress 'q' or Ctrl-C to abort, almost any other key for status\npassword         (?)\n1g 0:00:00:00 DONE (2026-06-25 10:20) 100.0g/s 1434Kp/s 1434Kc/s 1434KC/s 123456..password\nUse the \"--show\" option to display all of the cracked passwords reliably" },
        { scenario: "[Lab III - Ch 7] Download the challenge 7 image CyberPunk.jpg", command: "wget http://cyberserv.securetech-labs.com/challenge7/CyberPunk.jpg", hint: "Use wget to download the file", output: "Saving to: 'CyberPunk.jpg'\nCyberPunk.jpg       100%[===================>] 2.15M  --.-KB/s    in 0.1s" },
        { scenario: "[Lab III - Ch 7] Use steghide to extract hidden file 'secret.png' from the image with password 'password'", command: "steghide extract -sf secret.png -p \"password\"", hint: "Use steghide extract with -sf and -p", output: "wrote extracted data to \"flag.txt\".\n$ cat flag.txt\nFLAG{5t3g0_15_m4g1c}" },
        { scenario: "[Lab III - Ch 8] Download the challenge 8 PCAP file traffic.pcap", command: "wget http://cyberserv.securetech-labs.com/challenge8/traffic.pcap", hint: "Use wget to download the file", output: "Saving to: 'traffic.pcap'\ntraffic.pcap        100%[===================>] 512K  --.-KB/s    in 0.05s" },
        { scenario: "[Lab III - Ch 8] Use tshark to get a quick overview of IP conversations in traffic.pcap", command: "tshark -r traffic.pcap -q -z conv,ip", hint: "Use tshark with -r, -q, and -z conv,ip", output: "IPv4 Conversations\nFilter:<No Filter>\n                                               |       <-      | |       ->      | |     Total     |\n                                               | Frames  Bytes | | Frames  Bytes | | Frames  Bytes |\n192.168.1.100        <-> 10.0.0.5                   150    12000      200    45000      350    57000" },
        { scenario: "[Lab III - Ch 8] Use tshark to extract all HTTP objects from traffic.pcap to ./http_objects/", command: "tshark -r traffic.pcap --export-objects http,./http_objects/", hint: "Use tshark with --export-objects", output: "Exported object: ./http_objects/index.html (2.5K)\nExported object: ./http_objects/style.css (1.2K)\nExported object: ./http_objects/secret_payload.exe (45K)" },
        { scenario: "[Lab III - Ch 8] Use tshark to follow TCP stream 0 in ascii", command: "tshark -r traffic.pcap -q -z follow,tcp,ascii,0", hint: "Use tshark with -z follow,tcp,ascii,0", output: "===================================================================\nFollow: tcp,ascii\nFilter: tcp.stream eq 0\nNode 0: 192.168.1.100:45678\nNode 1: 10.0.0.5:80\nGET /login HTTP/1.1\nHost: target-server.local\n\nHTTP/1.1 200 OK\n\nWelcome to admin panel. FLAG{pck7_c4p7ur3_n3v3r_l135}\n===================================================================" },
        { scenario: "[Lab III - Ch 8] Use tshark to extract data fields and search for flag", command: "tshark -r traffic.pcap -T fields -e data | grep -i flag", hint: "Pipe tshark -T fields -e data to grep -i flag", output: "464c41477b70636b375f633470377572335f6e337633725f6c3133357d (Hex representation of flag)" },
        { scenario: "[Hash Cracking Game] Use hashid to identify the hash type of hash.txt", command: "hashid hash.txt", hint: "Use hashid followed by the filename", output: "Analyzing 'hash.txt'\n[+] MD5 [Hashcat Mode: 0]\n[+] MD4\n[+] Double MD5\n[+] LM" },
        { scenario: "[Hash Cracking Game] Install the haiti alternative hash identification tool", command: "sudo apt install haiti", hint: "Use apt install", output: "Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  haiti\n0 upgraded, 1 newly installed, 0 to remove.\nSetting up haiti (1.0) ..." },
        { scenario: "[Hash Cracking Game] Crack MD5 hash.txt using hashcat and rockyou.txt", command: "hashcat -m 0 -a 0 hash.txt rockyou.txt", hint: "Use mode 0 for MD5", output: "hashcat (v6.2.5) starting...\n\nDictionary cache hit:\n* Filename..: rockyou.txt\n* Passwords.: 14344385\n\n21fc68909a9eb8692e84cf64e495213e:123456\n\nSession..........: hashcat\nStatus...........: Cracked\nHash.Mode........: 0 (MD5)" },
        { scenario: "[Hash Cracking Game] Crack SHA1 hash.txt using John the Ripper and rockyou.txt", command: "john --format=raw-sha1 --wordlist=rockyou.txt hash.txt", hint: "Use --format=raw-sha1", output: "Using default input encoding: UTF-8\nLoaded 1 password hash (raw-sha1)\nPress 'q' or Ctrl-C to abort, almost any other key for status\n123456           (?)\n1g 0:00:00:00 DONE (2026-06-26 10:20) 100.0g/s 1434Kp/s 1434Kc/s 1434KC/s 123456..password\nUse the \"--show\" option to display all of the cracked passwords reliably" },
        { scenario: "[Hashcat Reference] Benchmark MD4 hashes", command: "hashcat -b -m 900", hint: "Use -b for benchmark and -m 900 for MD4", output: "hashcat (v6.2.5) starting in benchmark mode...\n\nBenchmarking uses hand-optimized assembly code for MD4.\nSpeed.Dev.#1.....:  12345.6 MH/s (12.3 ms)" },
        { scenario: "[Hashcat Reference] Create a hashcat session to crack Kerberos 5 tickets using wordlist.txt", command: "hashcat -m 13100 -a 0 --session crackin1 hashes.txt wordlist.txt -o output.pot", hint: "Use -m 13100, -a 0, --session, and -o", output: "Session 'crackin1' created.\nStarting attack against 10 Kerberos 5 TGS-REP etype 23 hashes..." },
        { scenario: "[Hashcat Reference] Crack MD5 hashes using all characters in 7 character passwords", command: "hashcat -m 0 -a 3 -i hashes.txt ?a?a?a?a?a?a?a -o output.txt", hint: "Use -a 3 for brute force, -i to increment, and the ?a mask 7 times", output: "hashcat (v6.2.5) starting...\n\nHashes: 1 digests; 1 unique digests, 1 unique salts\nMasks: ?a?a?a?a?a?a?a [7]" },
        { scenario: "[Hashcat Reference] Crack SHA1 using wordlist with two ?a characters after (Hybrid Mode)", command: "hashcat -m 100 -a 6 hashes.txt wordlist.txt ?a?a -o output.txt", hint: "Use mode 100, attack mode 6, followed by wordlist and mask", output: "hashcat (v6.2.5) starting...\n\nAttack-Mode.....: 6 (Hybrid Wordlist + Mask)\nHash-Mode.......: 100 (SHA1)" },
        { scenario: "[Hashcat Reference] Crack WinZip hash using custom mask for specific patterns", command: "hashcat -m 13600 -a 3 hashes.txt ?u?l?l?l?l?l?d?d?d?d! -o output.txt", hint: "Use mode 13600 and the mask string provided in the reference", output: "hashcat (v6.2.5) starting...\n\nHash-Mode.......: 13600 (WinZip)\nMasks...........: ?u?l?l?l?l?l?d?d?d?d! [11]" },
        { scenario: "[Hashcat Reference] Crack MD5 hashes using dictionary and modify with best64.rule", command: "hashcat -a 0 -m 0 example0.hash example.dict -r rules/best64.rule", hint: "Use -r followed by the rule file path", output: "hashcat (v6.2.5) starting...\n\nRules...........: rules/best64.rule\nDictionary......: example.dict" }
    ];

    // Render logic
    document.addEventListener("DOMContentLoaded", () => {
        const mcqContainer = document.getElementById('tab-mcq');
        if (!mcqContainer) return;

        mcqContainer.innerHTML = `<h3>🧠 Knowledge Assessment (${quizData.length} Questions)</h3><div id="quiz-scroller" style="max-height: 500px; overflow-y: auto; padding-right: 10px;"></div><button id="submit-mcq" style="margin-top: 15px; padding: 10px 20px; background: #3b82f6; border: none; color: white; border-radius: 5px; cursor: pointer; width: 100%;">Submit Answers</button><div id="mcq-feedback" style="margin-top: 15px; font-weight: bold; text-align: center; padding: 10px;"></div>`;
        
        const scroller = document.getElementById('quiz-scroller');
        
        quizData.forEach((q, index) => {
            const qDiv = document.createElement('div');
            qDiv.className = 'quiz-question';
            qDiv.style.cssText = "background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-bottom: 15px;";
            
            let optionsHtml = '';
            q.options.forEach((opt, optIndex) => {
                const inputType = q.type === "MCQ" ? "radio" : "checkbox";
                const isCorrect = q.answer.includes(optIndex) ? "correct" : "wrong";
                // Add unique name suffix for checkboxes to still group correctly logically
                const inputName = q.type === "MCQ" ? `q${index}` : `q${index}[]`;
                optionsHtml += `<label id="label-q${index}-o${optIndex}" style="display: block; margin-bottom: 5px; padding: 5px; border-radius: 4px; transition: 0.3s;"><input type="${inputType}" name="${inputName}" value="${isCorrect}"> ${opt}</label>`;
            });

            qDiv.innerHTML = `
                <p><span style="color: #10b981; font-size: 0.8rem; text-transform: uppercase;">[${q.topic}]</span><br><strong>${index + 1}. ${q.question} (${q.type})</strong></p>
                <div style="margin-left: 15px; margin-top: 10px;">${optionsHtml}</div>
                <div class="hint-box" id="hint-q${index}" style="display: none; margin-top: 10px; color: #fbbf24; font-size: 0.9rem; background: rgba(251, 191, 36, 0.1); padding: 10px; border-left: 3px solid #fbbf24;"><em>💡 ${q.hint}</em></div>
            `;
            scroller.appendChild(qDiv);
        });

        document.getElementById('submit-mcq').addEventListener('click', (e) => {
            e.target.disabled = true; // Prevent multiple submissions
            e.target.style.background = "#64748b";
            e.target.innerText = "Submitted - Scroll down for score";

            let totalScore = 0;
            
            quizData.forEach((q, index) => {
                // FIXED SELECTOR: Only select exact matches for radio/checkbox groups
                const inputs = document.querySelectorAll(`input[name="q${index}"], input[name="q${index}[]"]`);
                let correctSelected = 0;
                let wrongSelected = 0;
                const totalCorrectOptions = q.answer.length;
                let answered = false;

                inputs.forEach((input, optIndex) => {
                    const label = document.getElementById(`label-q${index}-o${optIndex}`);
                    input.disabled = true; // Lock the input

                    if (input.checked) {
                        answered = true;
                        if (input.value === "correct") {
                            correctSelected++;
                            label.style.background = "rgba(74, 222, 128, 0.2)";
                            label.style.borderLeft = "3px solid #4ade80";
                        } else {
                            wrongSelected++;
                            label.style.background = "rgba(248, 113, 113, 0.2)";
                            label.style.borderLeft = "3px solid #f87171";
                        }
                    } else {
                        if (input.value === "correct") {
                            label.style.borderLeft = "3px dashed #4ade80";
                            label.style.opacity = "0.7";
                        }
                    }
                });

                // Scoring Logic (Partial marks for MSQ, full marks for MCQ)
                let qScore = 0;
                if (answered) {
                    qScore = Math.max(0, (correctSelected - wrongSelected) / totalCorrectOptions);
                    totalScore += qScore;
                }

                // Show hints globally (or just if they didn't get perfect score on this question)
                const hintBox = document.getElementById(`hint-q${index}`);
                if (qScore < 1) {
                    hintBox.style.display = "block";
                }
            });

            const feedback = document.getElementById('mcq-feedback');
            const finalScore = Math.round(totalScore * 100) / 100;
            feedback.innerHTML = `<h3>Score: ${finalScore} / ${quizData.length}</h3>`;
            feedback.style.color = finalScore >= (quizData.length * 0.7) ? '#4ade80' : '#f87171'; // Green if >= 70%
        });

        // Lab Exam Initialization
        const labContainer = document.getElementById('tab-lab');
        if (labContainer) {
            let currentLab = 0;
            let labAttempts = 0;
            let totalLabScore = 0;
            
            function renderLab() {
                if (currentLab >= labData.length) {
                    // Final Score Screen
                    const percentage = Math.round((totalLabScore / labData.length) * 100);
                    const color = percentage >= 70 ? '#4ade80' : '#f87171';
                    labContainer.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px;">
                            <h2 style="color: #38bdf8; font-size: 2rem; margin-bottom: 20px;">🏆 Lab Exam Complete!</h2>
                            <p style="font-size: 1.2rem; color: #cbd5e1; margin-bottom: 10px;">You solved <strong>${totalLabScore}</strong> out of <strong>${labData.length}</strong> challenges without skipping.</p>
                            <h1 style="color: ${color}; font-size: 4rem; margin: 20px 0;">${percentage}%</h1>
                            <button onclick="location.reload()" style="padding: 10px 30px; background: #3b82f6; border: none; color: white; border-radius: 5px; cursor: pointer; font-size: 1.1rem; margin-top: 20px;">Return to Main Dashboard</button>
                        </div>
                    `;
                    return;
                }

                const lab = labData[currentLab];
                labContainer.innerHTML = `
                    <h3>💻 Interactive Lab Exam (${currentLab + 1}/${labData.length})</h3>
                    <p><strong>Scenario:</strong> ${lab.scenario}</p>
                    <textarea id="lab-input" rows="3" style="width: 100%; background: #1e293b; color: #10b981; font-family: monospace; padding: 10px; border: 1px solid #475569; border-radius: 5px; margin-bottom: 10px;" placeholder="Type your bash command here..."></textarea>
                    
                    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                        <button id="submit-lab" style="flex: 2; padding: 10px; background: #10b981; border: none; color: white; border-radius: 5px; cursor: pointer; font-weight: bold;">Execute Code</button>
                        <button id="skip-lab" style="flex: 1; padding: 10px; background: transparent; border: 1px solid #ef4444; color: #ef4444; border-radius: 5px; cursor: pointer;">Give Up & Reveal</button>
                    </div>
                    
                    <pre id="lab-terminal" style="display: none; background: #000; color: #e2e8f0; padding: 15px; border-radius: 5px; border: 1px solid #333; font-family: monospace; white-space: pre-wrap; overflow-x: auto; font-size: 0.9rem; margin-bottom: 15px;"></pre>
                    
                    <div id="lab-feedback" style="font-weight: bold; text-align: center;"></div>
                    <div id="lab-hint" style="margin-top: 10px; color: #fbbf24; display: none; text-align: center; background: rgba(251,191,36,0.1); padding: 10px; border-left: 3px solid #fbbf24;"><em>💡 ${lab.hint}</em></div>
                    <button id="next-lab" style="margin-top: 15px; padding: 10px; background: #3b82f6; border: none; color: white; border-radius: 5px; cursor: pointer; width: 100%; display: none; font-weight: bold;">Next Scenario ➔</button>
                `;

                // Fuzzy Match Helper
                const normalizeCmd = (cmd) => cmd.trim().replace(/\s+/g, ' ').replace(/'/g, '"');

                document.getElementById('submit-lab').addEventListener('click', () => {
                    const rawInput = document.getElementById('lab-input').value;
                    const input = normalizeCmd(rawInput);
                    const target = normalizeCmd(lab.command);
                    
                    const term = document.getElementById('lab-terminal');
                    const feedback = document.getElementById('lab-feedback');
                    const hint = document.getElementById('lab-hint');
                    const nextBtn = document.getElementById('next-lab');
                    const skipBtn = document.getElementById('skip-lab');

                    if (input === target) {
                        // Correct!
                        term.style.display = 'block';
                        term.style.color = '#4ade80';
                        term.innerText = "$ " + rawInput + "\n" + (lab.output || "Execution successful.");
                        
                        feedback.innerText = 'Success!';
                        feedback.style.color = '#4ade80';
                        hint.style.display = 'none';
                        nextBtn.style.display = 'block';
                        skipBtn.disabled = true;
                        document.getElementById('submit-lab').disabled = true;
                    } else {
                        // Incorrect
                        labAttempts += 1;
                        term.style.display = 'block';
                        term.style.color = '#f87171';
                        term.innerText = "$ " + rawInput + "\nbash: command not found or invalid syntax. Try again.";
                        
                        feedback.innerText = 'Incorrect output or syntax error.';
                        feedback.style.color = '#f87171';
                        if (labAttempts >= 1) hint.style.display = 'block';
                    }
                });

                document.getElementById('skip-lab').addEventListener('click', () => {
                    const term = document.getElementById('lab-terminal');
                    const feedback = document.getElementById('lab-feedback');
                    const hint = document.getElementById('lab-hint');
                    const nextBtn = document.getElementById('next-lab');
                    
                    document.getElementById('lab-input').value = lab.command; // Reveal answer
                    
                    term.style.display = 'block';
                    term.style.color = '#cbd5e1';
                    term.innerText = "Answer revealed:\n$ " + lab.command + "\n\n(Skipped - No points awarded)";
                    
                    feedback.innerText = 'Challenge Skipped.';
                    feedback.style.color = '#94a3b8';
                    hint.style.display = 'block';
                    nextBtn.style.display = 'block';
                    
                    document.getElementById('submit-lab').disabled = true;
                    document.getElementById('skip-lab').disabled = true;
                    labAttempts = -999; // Flag to indicate skip
                });

                document.getElementById('next-lab').addEventListener('click', () => {
                    if (labAttempts >= 0) { // If they didn't skip
                        totalLabScore++;
                    }
                    currentLab++;
                    labAttempts = 0;
                    renderLab();
                });
            }
            renderLab();
        }
    });
})();
