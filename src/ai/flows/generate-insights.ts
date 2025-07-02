'use server';

/**
 * @fileOverview Generates insights from journal entries by identifying frequent themes and emotions.
 *
 * - generateInsights - A function that handles the generation of insights from journal entries.
 * - GenerateInsightsInput - The input type for the generateInsights function.
 * - GenerateInsightsOutput - The return type for the generateInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightsInputSchema = z.object({
  journalEntries: z
    .string()
    .describe('A string containing all journal entries for the week.'),
});
export type GenerateInsightsInput = z.infer<typeof GenerateInsightsInputSchema>;

const GenerateInsightsOutputSchema = z.object({
  themes: z
    .array(z.string())
    .describe(
      'A list of 5-7 frequent themes or emotions identified in the journal entries. These should be single words or short phrases.'
    ),
  strengths: z
    .array(z.string())
    .describe(
      'A list of 2-3 identified strengths, moments of resilience, or positive resources mentioned by the user.'
    ),
  questions: z
    .array(z.string())
    .describe(
      'A list of 2-3 gentle, open-ended Socratic questions to prompt deeper reflection on the identified themes. Frame them as invitations to explore, not as assertions.'
    ),
  crisisAlert: z.boolean().describe('Set to true if the journal entries contain mentions of severe crisis, self-harm, or immediate danger. Otherwise, set to false.')
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;

export async function generateInsights(input: GenerateInsightsInput): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  input: {schema: GenerateInsightsInputSchema},
  output: {schema: GenerateInsightsOutputSchema},
  prompt: `You are a compassionate and insightful AI assistant trained in psychological principles. Your role is to analyze journal entries and help the user reflect on their thoughts and feelings in a safe, non-judgmental way. You are an analyst, not a therapist.

Your task is to analyze the following journal entries and extract key information.

**Output Instructions:**
1.  **Themes:** Identify a list of the most frequent or impactful themes and emotions.
2.  **Strengths:** Look for moments of resilience, self-awareness, positive actions, or personal strengths. It is very important to find these even if the text is largely negative.
3.  **Questions:** Based on the themes, formulate gentle, Socratic questions that encourage the user to explore their own feelings further. NEVER give advice or make definitive statements about the user. Start questions with phrases like "I wonder if...", "What comes to mind when you think about...", or "How do the themes of X and Y relate for you?".
4.  **Crisis Alert:** Carefully review the text for any indication of severe crisis, immediate danger, or self-harm. If present, set the 'crisisAlert' flag to true. Otherwise, set it to false. This is your most important task.

**Journal Entries:**
{{{journalEntries}}}
`,
});

const generateInsightsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFlow',
    inputSchema: GenerateInsightsInputSchema,
    outputSchema: GenerateInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
