# AI Readiness Assessment

### How it works: an executive summary

| | |
|---|---|
| **Version** | 1.0, a snapshot of the system as built |
| **Date** | October 13, 2026 |
| **Who this is for** | Anyone. No technical or AI background is needed. |
| **Companion documents** | System Deep Dive v1.0 (how it works under the hood) · Framework Reference (one-page outline) · Working prototype |

---

## In one sentence

The AI Readiness Assessment looks at how a company actually works today and tells you the single most useful next step it should take with AI, and why.

---

## The problem it solves

Almost every company is being told it needs to "do something with AI." Many respond by buying a tool or launching a project right away, and a lot of those projects quietly stall.

Usually the technology isn't what failed. Something more basic was missing:

- nobody was clearly in charge of the effort,
- the company didn't really understand the work it was trying to improve,
- its information was scattered across spreadsheets and email, or
- no one was checking whether the AI's output was right.

So the useful question isn't *"Should we use AI?"* It's *"Given where we actually are, what should we do next?"* That is the question this tool answers.

---

## The idea: a home inspection before the renovation

Before you renovate a house, you get it inspected. The inspector doesn't ask how you *feel* about the house. They check specific things (the foundation, the wiring, the plumbing, the roof), write down what they find, and tell you what has to be fixed first.

This assessment works the same way. The person running it, called the **operator** (an advisor, strategist, or consultant), checks specific, factual things about the company, and the tool turns those findings into a recommendation.

And like a good inspector, it won't let you put solar panels on a roof that's about to cave in.

---

## How it works, in five steps

| Step | What happens |
|---|---|
| **1. Describe the company** | The operator enters the company's name and picks its type: business software, software for one specific industry, a company built around AI from day one, or a services business that also sells software. The type changes the wording and emphasis of the results. It does not change the rules. |
| **2. Answer factual questions** | 67 questions, grouped into 8 areas. Each one is either yes/no or a rating from 1 to 5. |
| **3. Score each area** | The tool turns the answers in each area into a score from 1 (weak) to 4 (advanced). |
| **4. Combine into one number** | The eight area scores roll up into one overall readiness score from 0 to 100. |
| **5. Check for deal-breakers, then recommend** | The tool checks for problems that must be fixed first, then recommends one of five next steps. |

---

## The most important design choice: facts, not opinions

Nobody types in a score directly. The operator records **what is true** about the company, and the tool does the scoring.

| An opinion question *(not used)* | A factual question *(used instead)* |
|---|---|
| "How strong is leadership's AI vision, on a scale of 1–10?" | "Is there one named executive who owns AI strategy?" **Yes / No** |
| "How good is their data?" | "Do critical records still exist on paper?" **Yes / No** |
| "Are they ready to oversee AI responsibly?" | "Is there a defined process for what happens when the AI gets something wrong?" **Yes / No** |

**Why this matters:** two people assessing the same company should reach the same answer. Opinions vary from person to person, but facts can be checked in an interview, a document, or a product demo.

Two more things to know about the questions:

- **Some describe good things, some describe warning signs.** "There's a named owner" is a good thing, so it raises the score. "Records are on paper" is a warning sign, so it lowers it.
- **Some questions count more than others.** The most important ones count about 1.5 times as much as the rest.

---

## The eight areas

| # | Area | The plain-English question | Share of overall score |
|---|---|---|---|
| 1 | **Leadership & AI Strategy** | Does someone in charge own this, and do they know *why* they're doing it? | 15% |
| 2 | **Workflows** | Do they understand how the work actually gets done, step by step, including where it gets stuck? | 15% |
| 3 | **Data** | Is the company's information organized, complete, and reachable? Or is it scattered in spreadsheets, email, and paper? | 15% |
| 4 | **People & Trust** | Will the people doing the work actually use the AI, and trust what it tells them? | 10% |
| 5 | **Technical Ability** | Do they have the people and the technology to build and run it? | 15% |
| 6 | **Oversight** | Who checks the AI's work, and what happens when it's wrong? | 10% |
| 7 | **Measurement** | Can they prove it's working and worth the money? | 10% |
| 8 | **From Storing to Doing** | Does their software just *store* information, or can it *take action*? | 10% |

The first, second, third, and fifth areas count a little more (15% each) because without them nothing can get built: you need a reason, an understanding of the work, the raw material, and the ability to build. The other four (10% each) decide how well an AI effort lands, how safe it is, and how far it can go.

---

## What the scores mean

**Each area gets a score from 1 to 4:**

| Score | Label | What it means |
|---|---|---|
| **1** | Weak | Mostly absent |
| **2** | Partial | Some pieces exist, but they're inconsistent |
| **3** | Strong | Mostly in place |
| **4** | Advanced | In place and highly reliable |

**The overall score runs from 0 to 100:**

| Overall score | Label |
|---|---|
| 0–44 | Low readiness |
| 45–69 | Developing readiness |
| 70–81 | Strong readiness |
| 82–100 | Advanced readiness |

The bar is high on purpose. A company that scores a solid 3 ("Strong") in every single area lands at **67, which is "Developing."** To be called Strong overall, a company needs some areas that are genuinely advanced.

---

## The five next steps

The recommendation is always one step on this staircase. The staircase is climbed in order, and steps can't be skipped.

```
Step 5  ████████████████████   Let AI take limited actions on its own
Step 4  ████████████████       Rebuild how the work gets done, around AI
Step 3  ████████████           Run small, supervised trials
Step 2  ████████               Map the work and measure the starting point
Step 1  ████                   Get leadership on the same page
```

| Step | Official name | What it means | What it looks like in practice |
|---|---|---|---|
| **1** | Educate and Align | Leadership hasn't agreed on why AI matters, who owns it, or what success looks like. Fix that before spending on technology. | A leadership workshop; naming one AI owner; picking the top three areas to focus on; writing down the business case. |
| **2** | Diagnose and Instrument | Leadership is on board, but the company doesn't understand its work or its data well enough to know where AI would help. | Mapping how key work flows today; auditing where the data lives; measuring today's performance so there's a "before" to compare against. |
| **3** | Assistive Pilots | The basics are in place. Try AI in one narrow area where it *assists* people, and a human checks every result. | One small trial with clear success criteria, a human review step, and tracking from day one. |
| **4** | Workflow Redesign | Small trials won't capture the value anymore. Redesign the work itself so AI is built in rather than bolted on. | Redesigning approvals and handoffs around AI; retraining teams; rolling out in stages. |
| **5** | Bounded Action Systems | Everything is strong. Let AI take certain actions on its own, within clear limits, with full monitoring. | Defining exactly what the AI may and may not do; escalation paths to humans; complete audit trails. |

---

## Deal-breakers: why you can't skip steps

Some weaknesses can't be made up for by strengths somewhere else. A beautiful new kitchen doesn't fix a cracked foundation. So the tool has four deal-breaker rules:

| If this area is weak *(score of 2 or lower)*… | …the recommendation can't go past |
|---|---|
| Leadership & AI Strategy | Step 1 |
| Workflows **and** Data (both weak) | Step 2 |
| Oversight | Step 3 |
| Technical Ability | Step 4 |

A few things about how these rules behave:

- **They only ever lower a recommendation.** They never raise one.
- **They're on by default.** The operator can switch them off to see what the company *would* be ready for once its foundation is fixed. That's a useful way to show leadership what's at stake.
- **Missing information is treated with caution.** If a key area hasn't been assessed, the recommendation treats it as weak rather than assuming it's fine.

---

## The score and the recommendation answer different questions

This is the part that surprises people most.

- **The overall score** answers *"How much is in place overall?"* It's an average, so strengths can make up for weaknesses.
- **The recommendation** answers *"What's the next thing to do?"* It's *not* an average. It's decided by the foundation.

So a company can score high and still be told to start at Step 1. In the most extreme case, a company scoring **90 out of 100** is sent to Step 1 because its leadership isn't aligned. That isn't a contradiction. It's the house with the cracked foundation.

---

## A worked example: Meridian Freight Systems

*Meridian is a made-up company, used here to show how the tool reasons.*

Meridian makes software for freight brokers. It has good engineers and a modern cloud platform. Its core workflows are documented, and most of its data lives in proper systems rather than spreadsheets. The board keeps asking about AI, so there's plenty of interest.

But no single executive owns AI, there's no written business case, and nobody has agreed on what success would look like. Checking the quality of the software's output depends on a couple of careful people rather than a defined process.

**What the assessment found:**

| Area | Score | Label |
|---|---|---|
| Leadership & AI Strategy | 2 | Partial |
| Workflows | 3 | Strong |
| Data | 3 | Strong |
| People & Trust | 3 | Strong |
| Technical Ability | 3 | Strong |
| Oversight | 2 | Partial |
| Measurement | 2 | Partial |
| From Storing to Doing | 3 | Strong |
| **Overall** | **55 / 100** | **Developing readiness** |

**What it recommended:**

- **Without the deal-breaker check:** Step 3, *run small, supervised trials.* The technical foundation is there.
- **With the deal-breaker check (the default):** Step 1, *get leadership on the same page.*

**Why Step 1 is the right call:** a trial with no executive owner is an orphan. When it hits its first problem, nobody has the authority to fund the fix, defend it to the board, or decide what success means, and months of good engineering work get shelved. A few weeks spent aligning leadership first is what makes the trial worth running.

Meridian's Oversight score also tripped a deal-breaker (it would have stopped Meridian at Step 3), but leadership is the one that actually decided the outcome.

**Meridian's next actions, straight from the report:**

1. Hold an executive alignment session to name an AI owner and define the company's AI thesis.
2. Map and prioritize the workflows where AI could add the most value.
3. Agree on success criteria *before* any technical scoping begins.
4. Pull existing AI experiments together under a single strategy.

---

## What you get at the end

**The report** gives:

- the overall score and readiness label
- a table of all eight area scores
- the company's strengths and weaknesses
- the recommended step, with the reasoning behind it
- any deal-breakers that held the recommendation back
- six recommended activities for that step
- four immediate next actions
- the operator's evidence and notes

**The "show your work" view** traces every score back to the specific answers that produced it: which answers helped, which hurt, and which rule decided the recommendation. If someone asks *"Why Step 1?"*, the answer is right there on the screen.

---

## Why you can trust it, and where its limits are

**Why you can trust it:**

- **It's built on facts that can be checked**, not opinions.
- **It's consistent.** The same answers give the same result every time, whoever runs it.
- **It explains itself.** Every number traces back to the answers behind it.
- **It's cautious.** Missing information is treated as weak, and deal-breakers can only lower a recommendation.

**Where its limits are:**

- **It's a first version.** How much each answer counts, and where the lines between scores fall, are informed judgment calls. They haven't yet been tested against how real companies actually turned out.
- **It's only as good as its answers.** Rushed or half-finished assessments give shaky results.
- **It recommends the next step, not the whole journey.** It doesn't replace the operator's judgment; it gives that judgment a structure.
- **It assesses the company's conditions, not its people.** A low score is a description of the starting point, not a grade on the team.

---

## Words worth knowing

| Term | Meaning |
|---|---|
| **AI readiness** | How prepared a company is to use AI in a way that actually works and lasts. |
| **Operator** | The person running the assessment. |
| **Workflow** | A repeatable sequence of work, like processing an order or approving an invoice. |
| **System of record** | Software that mainly *stores* information, like a database or a filing cabinet. |
| **System of action** | Software that can *do* things, like send, approve, schedule, or update. |
| **Oversight** *(governance)* | The rules and people that check AI's work and decide what it's allowed to do. |
| **Pilot** | A small, controlled trial before a wider rollout. |
| **Bounded action** | The AI acting on its own, but only inside clearly defined limits. |
| **Deal-breaker** *(gate)* | A weakness serious enough to cap the recommendation, no matter how strong everything else is. |
