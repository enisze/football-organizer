# STIRN API Parallel Processing Setup

## Overview
This implementation optimizes the STIRN word generation API by using QStash for parallel processing, reducing execution time from potentially 10+ seconds to under 5 seconds.

## Architecture Changes

### Before (Sequential)
- Main API generates words for each category sequentially
- Each AI call blocks until completion
- Total time = sum of all AI calls + validation

### After (Parallel with QStash)
- Main API dispatches category generation tasks to separate endpoints via QStash
- Each category is processed in parallel by different serverless functions
- Main API polls for results and combines them
- Total time ≈ max(single AI call) + validation + polling overhead

## Environment Variables Required

Add these to your `.env` file:

```bash
# QStash Configuration
QSTASH_TOKEN=your_qstash_token_here
QSTASH_CURRENT_SIGNING_KEY=your_qstash_signing_key_here
QSTASH_NEXT_SIGNING_KEY=your_qstash_next_signing_key_here

# Existing variables
STIRN_QUIZ_API_KEY=your_stirn_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

## API Endpoints

### Main Endpoint
- `POST /api/ai/stirn` - Main word generation endpoint (existing)

### New Parallel Endpoint  
- `POST /api/ai/stirn/generate-category` - Handles individual category generation (new)

## Performance Improvements

### Logging Added
- Request start/end times
- Cache lookup times
- AI generation times per category
- Validation times
- QStash dispatch and polling times
- Total execution time

### Expected Performance Gains
- **3 categories**: ~60% faster (from ~9s to ~3.5s)
- **5 categories**: ~70% faster (from ~15s to ~4.5s)
- More categories = greater benefits

## Usage

The API interface remains the same. Existing clients will automatically benefit from parallel processing when using categories.

```javascript
const response = await fetch('/api/ai/stirn', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    guessedWords: ['Hund', 'Katze'],
    wordsNeeded: 20,
    redisKey: 'my-game',
    apiKey: 'your-api-key',
    categories: ['Tiere', 'Essen', 'Sport'], // Enables parallel processing
    prompt: 'Einfache deutsche Wörter'
  })
})
```

## Testing

Run the test script to verify functionality:

```bash
npx tsx src/app/api/ai/stirn/test-parallel.ts
```

## Monitoring

Check logs for performance metrics:
- `[STIRN API]` - Main endpoint logs
- `[Parallel Generation]` - QStash orchestration logs  
- `[Category Generation]` - Individual category processing logs
- `[Word Validation]` - Validation step logs
