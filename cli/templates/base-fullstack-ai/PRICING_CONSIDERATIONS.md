# AI Pricing Considerations

When building a SaaS with AI features, you need to carefully consider the cost implications. This guide helps you plan pricing tiers that account for AI usage.

## AI Cost Breakdown

### Token Costs (OpenAI GPT-4o-mini)
- Input: $0.150 per 1M tokens
- Output: $0.600 per 1M tokens
- Average conversation: ~2,000 tokens
- Cost per conversation: ~$0.0015

### Embedding Costs (text-embedding-3-small)
- $0.020 per 1M tokens
- Average document: ~1,000 tokens
- Cost per document: ~$0.00002

### Monthly Cost Projections

| Usage Level | Messages/Day | Documents/Month | Est. Monthly Cost |
|------------|--------------|-----------------|-------------------|
| Light | 10 | 100 | ~$0.50 |
| Moderate | 50 | 500 | ~$2.50 |
| Heavy | 200 | 2000 | ~$10.00 |
| Power | 1000 | 10000 | ~$50.00 |

## Suggested Pricing Tiers

### Starter - $19/mo
- 1,000 AI messages/month
- 10,000 tokens/day
- 100 document uploads
- Basic support agent only

### Pro - $49/mo
- 5,000 AI messages/month
- 50,000 tokens/day
- 1,000 document uploads
- All agents + custom instructions

### Business - $149/mo
- 20,000 AI messages/month
- 200,000 tokens/day
- 10,000 document uploads
- Priority processing
- Custom workflows

### Enterprise - Custom
- Unlimited messages
- Unlimited tokens
- Bulk document processing
- Custom models
- SLA guarantees

## Implementation Strategies

### 1. Token-Based Billing
```typescript
// Track exact usage
const usage = await getUserTokenUsage(userId);
const cost = calculateTokenCost(usage);
const markup = cost * 3; // 3x markup for profit
```

### 2. Credit System
```typescript
// Users purchase credits
const creditsPerDollar = 1000;
const tokensPerCredit = 50;

// Deduct on usage
await deductCredits(userId, tokensUsed / tokensPerCredit);
```

### 3. Hybrid Approach
- Base subscription includes allocation
- Additional usage billed per-token
- Volume discounts for high usage

## Cost Optimization

### 1. Model Selection
```typescript
// Use cheaper models when possible
const model = isPremiumUser ? "gpt-4o" : "gpt-4o-mini";
```

### 2. Caching
```typescript
// Cache common responses
const cached = await getCachedResponse(prompt);
if (cached) return cached;
```

### 3. Prompt Optimization
- Shorter system prompts
- Efficient conversation pruning
- Smart context selection

### 4. Rate Limiting by Tier
```typescript
const limits = {
  starter: { messages: 10, tokens: 10000 },
  pro: { messages: 50, tokens: 50000 },
  business: { messages: 200, tokens: 200000 },
};
```

## Monitoring & Alerts

### Cost Tracking
```typescript
// Daily cost monitoring
const dailyCost = await getDailyAICost();
if (dailyCost > DAILY_BUDGET) {
  await notifyAdmin("AI costs exceeding budget");
}
```

### User Monitoring
```typescript
// Identify high-cost users
const topUsers = await getTopTokenUsers();
// Consider reaching out for enterprise plans
```

## Free Tier Considerations

### Option 1: Limited Free Tier
- 100 messages/month
- GPT-3.5 only
- No document uploads
- Upsell to paid tiers

### Option 2: Trial Credits
- $5 worth of credits on signup
- Full feature access
- Expires after 14 days
- Requires payment method

### Option 3: No Free Tier
- 14-day money-back guarantee
- Full access during trial
- Better customer quality

## Revenue Projections

### Conservative Estimate
- 100 customers
- 70% Starter, 25% Pro, 5% Business
- Monthly Revenue: $2,730
- AI Costs: ~$273 (10% margin)
- Profit: ~$2,457

### Growth Scenario
- 1,000 customers
- 60% Starter, 30% Pro, 10% Business
- Monthly Revenue: $32,400
- AI Costs: ~$3,240
- Profit: ~$29,160

## Key Decisions

1. **Pricing Model**
   - Per-message pricing?
   - Token-based billing?
   - Flat-rate with limits?

2. **Overage Handling**
   - Hard stop at limit?
   - Automatic overage charges?
   - Upgrade prompts?

3. **Feature Gating**
   - Which AI features for each tier?
   - Model quality differences?
   - Response time priorities?

4. **Cost Controls**
   - Spending caps per user?
   - Daily/monthly budgets?
   - Automatic downgrading?

## Next Steps

1. Calculate your specific costs based on expected usage
2. Set pricing with healthy margins (3-5x costs)
3. Implement usage tracking from day one
4. Monitor and adjust based on actual usage
5. Consider enterprise deals for high-volume users

Remember: AI costs decrease over time as models improve and competition increases. Price accordingly but be prepared to adjust.