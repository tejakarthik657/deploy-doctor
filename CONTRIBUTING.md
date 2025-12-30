# Contributing to Deploy Doctor

## Adding New Rules

Deploy Doctor uses a plugin-based rule system. To add a new rule:

1. Create a new file in `packages/core/src/rules/your-rule.rule.ts`
2. Implement the `Rule` interface:

```typescript
import { Rule } from "./types";

export const yourRule: Rule = {
  id: "YOUR_RULE_ID",
  description: "Description of what this rule fixes",

  match(ctx) {
    // Return true if this rule applies to the current context
    return ctx.error?.type === "YOUR_ERROR_TYPE";
  },

  generateFix(ctx) {
    return {
      description: "What the fix does",
      patch: {
        file: "package.json", // or other config file
        apply(obj) {
          // Modify the object
          return obj;
        }
      }
    };
  }
};
```

3. Add your rule to `packages/core/src/rules/index.ts`

4. Test with sample logs

## Adding New Platforms

1. Add platform profile in `packages/core/src/profiles/your-platform.ts`
2. Update `packages/core/src/profiles/index.ts`
3. Add detection in `packages/core/src/context/detectPlatform.ts`

## Testing

Run the test suite:
```bash
npm test
```

Test with broken repos in `test-suite/`