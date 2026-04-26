# Agentic UI Plan: Living Gambit / Lifestyle Engineering

## Vision

After the boot sequence and globe animation, an AI agent greets the visitor and becomes the primary way to discover content. The agent responds with rendered React components (blog cards, country cards, food grids) — not text walls. Traditional navigation remains available by scrolling past the agent section.

---

## User Flow

```
1. Boot sequence types out (3s, first visit only)
2. Globe reveals full-screen on black (2.5s)
3. Globe shrinks, agent greeting fades in:

   "I've been with Chase across 20 countries and 211 posts.
    What are you curious about?"

   [The Surfing Stories]  [The Business Journey]  [Surprise Me]  [Browse the Site ↓]

   [Or ask me anything... _______________]

4. User clicks a chip or types a question
5. AI responds with 1-2 sentences + rendered component cards
6. User can click cards to navigate to full posts/pages
7. "Browse the Site ↓" scrolls to normal homepage below
```

---

## Technical Architecture

### Stack

| Layer           | Technology                                 | Notes                                 |
| --------------- | ------------------------------------------ | ------------------------------------- |
| AI SDK          | `ai` + `@ai-sdk/react`                     | Vercel AI SDK, `useChat` hook         |
| Claude Provider | `@ai-sdk/anthropic`                        | Native Anthropic support              |
| Default Model   | Claude 3.5 Haiku                           | Fast, cheap, good for nav/search      |
| Complex Queries | Claude Sonnet                              | Comparisons, summaries, deep analysis |
| Rate Limiting   | `@upstash/ratelimit` + `@upstash/redis`    | 20 msgs/hr per IP                     |
| Knowledge Base  | blogIndex + content files in system prompt | Cached via Anthropic prompt caching   |

### Estimated Cost

- ~50-100 visitors/day, avg 5 messages each
- Haiku with prompt caching: ~$0.50-1.50/day
- Sonnet (10% of queries): ~$0.20-0.50/day
- **Total: ~$15-40/month**

### Dependencies to Install

```bash
bun add ai @ai-sdk/anthropic @ai-sdk/react zod @upstash/ratelimit @upstash/redis
```

---

## AI Tools (what the agent can do)

### searchPosts

- **Input**: query string, optional country, optional year
- **Returns**: matching blog posts from blogIndex
- **Renders**: `<BlogPostCardCompact>` grid with images, excerpts, links
- **Example**: "What did you write about surfing?" → shows 4-6 surf-related post cards

### showCountry

- **Input**: country slug
- **Returns**: country data (flag, dates, highlights, coordinates)
- **Renders**: `<CountryDetailCard>` with flag, visit dates, stats
- **Example**: "Tell me about Vietnam" → country card + related posts

### showFood

- **Input**: country name
- **Returns**: food items for that country
- **Renders**: `<FoodCardCompact>` grid with dish photos and descriptions
- **Example**: "Best food you ate?" → food cards from top countries

### navigateTo

- **Input**: URL path + label
- **Returns**: nothing (client-side only)
- **Action**: triggers `router.push()` to navigate to the page
- **Example**: "Take me to the packing list" → navigates to /packing-checklist

### showOnGlobe

- **Input**: array of country names
- **Returns**: country coordinates
- **Action**: rotates the globe to highlight those countries
- **Example**: "Show me Southeast Asia" → globe rotates, markers highlight

### surpriseMe

- **Input**: none
- **Returns**: a random interesting post with context on why it's good
- **Renders**: single `<BlogPostCardFeatured>` with AI-written hook
- **Example**: clicking "Surprise Me" chip

---

## File Structure (new files)

```
src/
  app/
    api/
      chat/
        route.ts              ← AI streaming endpoint
  components/
    AgentChat.tsx             ← Main chat UI component
    AgentGreeting.tsx         ← Initial greeting + chips (pre-chat)
    AgentMessage.tsx          ← Renders a single AI message + tool results
    BlogPostCardCompact.tsx   ← Compact blog card for inline chat
    CountryCardCompact.tsx    ← Compact country card for inline chat
    FoodCardCompact.tsx       ← Compact food card for inline chat
    AgentFloatingButton.tsx   ← Floating button for non-landing pages
  lib/
    blog-manifest.ts          ← Build-time content index for system prompt
  scripts/
    generate-manifest.ts      ← Script to generate blog-manifest.json
```

### Files to Modify

- `src/components/BootSequence.tsx` — Add Phase 3 (agent greeting after globe shrinks)
- `src/app/page.tsx` — Add agent section as the primary hero content
- `src/app/layout.tsx` — Add floating agent button wrapper
- `src/content/blogIndex.ts` — Already structured, used as knowledge base

---

## Phase 1: MVP (2-3 days)

### 1.1 Install dependencies

```bash
bun add ai @ai-sdk/anthropic @ai-sdk/react zod
```

### 1.2 Create content manifest

- Script that reads all blogIndex entries + country data + food data
- Outputs a compressed text blob for the system prompt (~30-50K tokens)
- Include: title, date, country, excerpt, slug, key themes for each post
- Run at build time or commit the output

### 1.3 Create API route (`/api/chat/route.ts`)

- `streamText` with Claude Haiku
- System prompt with full content manifest + personality instructions
- Tools: `searchPosts`, `navigateTo`
- No rate limiting yet (add in Phase 2)

### 1.4 Create AgentChat component

- `useChat` hook from `@ai-sdk/react`
- Message list with text + tool result rendering
- Input field at the bottom
- Handle `navigateTo` tool calls with `router.push`
- Render blog post cards for `searchPosts` results

### 1.5 Create AgentGreeting component

- The pre-chat state: greeting text + suggested chips
- Chips: "The Surfing Stories", "The Business Journey", "Surprise Me", "Browse the Site ↓"
- Clicking a chip sends it as the first message to the chat
- "Browse the Site ↓" scrolls to the content below

### 1.6 Wire into boot sequence

- After globe shrinks (Phase 2 → Phase 3 transition)
- Agent greeting fades in
- On first interaction, transitions to full chat mode
- If user scrolls past, agent section stays but is not blocking

---

## Phase 2: Rich Rendering (2-3 days)

### 2.1 Compact card components

- `BlogPostCardCompact` — image thumbnail, title, excerpt, date, "Read →" link
- `CountryCardCompact` — flag, country name, visit dates, post count
- `FoodCardCompact` — dish photo, name, country, description
- All styled to match existing glassmorphism/editorial theme

### 2.2 More tools

- `showCountry` — renders country detail inline
- `showFood` — renders food cards inline
- `showOnGlobe` — triggers globe rotation (pass data up via state/context)
- `surpriseMe` — random post with AI editorial hook

### 2.3 Prompt caching

- Use Anthropic's `cacheControl: { type: 'ephemeral' }` on the system prompt
- First request caches the full manifest, subsequent requests pay ~10% cost

### 2.4 Rate limiting

- Install `@upstash/ratelimit` + `@upstash/redis`
- 20 messages/hour per IP
- 5 messages/minute burst protection
- Graceful UI when rate limited ("You've been curious! Take a break and browse the site.")

### 2.5 Globe integration

- When agent mentions countries, pass them to the globe component
- Globe rotates to show the relevant region
- Visual connection between chat and the 3D visualization

---

## Phase 3: Polish (ongoing)

### 3.1 Floating agent button

- On non-landing pages, show a small floating button (bottom-right)
- Click to expand a slide-over panel (~400px wide) with the chat
- Retains conversation history from the landing page
- Close to collapse back to button

### 3.2 Model routing

- Simple heuristic: if query contains "compare", "analyze", "summarize", "create" → use Sonnet
- Everything else → Haiku
- Could also route based on conversation length (longer = more complex)

### 3.3 Mobile UX

- Bottom sheet UI (slides up, covers ~75% of screen)
- Larger touch-friendly chips
- Shorter greeting (2 lines max)
- Fixed bottom input bar
- Consider voice input (Web Speech API)

### 3.4 Conversation persistence

- Save to localStorage so refreshing doesn't lose context
- Clear after 24 hours or on explicit "New conversation"

### 3.5 Analytics

- Log what people ask (anonymized)
- Track which chips get clicked most
- Track which tool results get clicked through
- Use this data to improve suggested prompts and content strategy

---

## Agent Personality Guidelines

- **Warm and opinionated, not generic.** "The Ha Giang Loop post is wild — 25 villagers helped Chase after a motorbike crash at 90 km/h."
- **Short text, rich components.** 1-2 sentences then show the cards. The AI is a curator, not a narrator.
- **Honest about gaps.** "Chase hasn't been to South America yet, but here's what he wrote about Central America."
- **Represents Chase's voice.** References themes from the blog: freedom, systems thinking, surfing, faith, entrepreneurship.
- **Never makes up content.** Only references actual posts and data from the content manifest.

---

## Design Notes

- Agent section uses existing theme variables (works in both light and graphite themes)
- Chat bubbles: user messages right-aligned with accent bg, agent messages left-aligned with subtle bg
- Tool result cards match the existing `ContentCard` / `BlogGrid` aesthetic
- Typing indicator with subtle animation during AI response
- Smooth transitions between greeting state and chat state (Framer Motion)
- The globe stays visible as ambient background behind the agent section on desktop

---

## Open Questions

1. **API key management** — ANTHROPIC_API_KEY as env var on Vercel. Need to set up billing.
2. **Content manifest freshness** — regenerate on each deploy or commit the manifest file?
3. **Conversation history** — how many messages to keep in context? Cap at 20 to control costs?
4. **Abuse prevention** — beyond rate limiting, any content filtering needed on user input?
5. **A/B testing** — should we offer a way to skip the agent entirely for users who just want to browse?
6. **Voice input** — worth adding in Phase 3 or too niche for a blog?
