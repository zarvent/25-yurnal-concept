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
    .string()
    .describe(
      'A cloud of frequent themes and emotions identified in the journal entries.'
    ),
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;

export async function generateInsights(input: GenerateInsightsInput): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  input: {schema: GenerateInsightsInputSchema},
  output: {schema: GenerateInsightsOutputSchema},
  prompt: `You are an AI assistant designed to analyze journal entries and identify frequent themes and emotions.

  Please provide a cloud of the most frequent themes and emotions found in the following journal entries:

  {{journalEntries}}

  Focus on extracting the core topics and feelings expressed throughout the week.
  The output should be a concise string of comma separated themes and emotions, such as "stress, anxiety, work, relationships".`,
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
