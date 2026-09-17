# Repository Saved Replies Template

Standard saved replies for GitHub issue triage and pull request reviews across ZG0D-FF domains. Configure these in your personal GitHub account at **Settings -> Saved replies** (https://github.com/settings/replies).

---

### 1. Hardware Verification Details Needed
**Saved Reply Title:** Hardware Details Needed

\\markdown
Thanks for opening this issue! To reproduce and verify on physical or simulated hardware, please provide:
- [ ] Microcontroller / Board model & revision (e.g., ESP32-WROOM-32, Raspberry Pi 4B 4GB, 8085 Trainer Kit)
- [ ] Operating voltage and clock frequency
- [ ] Pinout connections / Wiring schematic snippet
- [ ] Logic analyzer / Serial monitor baud rate and captured log
\
---

### 2. Academic Notes Citation Request
**Saved Reply Title:** Notes Citation Request

\\markdown
Thanks for noting this correction! To maintain academic and curriculum rigor:
- [ ] Please state standard textbook / datasheet reference (Author, Title, Edition, Page #).
- [ ] If applicable, provide the derivation steps or pinout timing diagram.

Once verified against standard literature, we will patch the corresponding note module.
\
---

### 3. PR Hardware / Edge AI Verification Approval
**Saved Reply Title:** PR Verified & Merging

\\markdown
Review complete:
- [ ] Zero secrets verified (no API keys or credentials).
- [ ] Logic / firmware simulator passes without timing regressions.
- [ ] Documentation / pinout table updated.

LGTM. Merging into \main2\.
\
---

### 4. Convert Task List to Sub-Issues Reminder
**Saved Reply Title:** Convert Tasks to Issues

\\markdown
Great breakdown! Please hover over the checklist items above and click the **Convert to issue** icon on the right for tasks requiring multi-day implementation. This tracks them directly on the **ZG0D-FF Engineering Hub** project board.
\