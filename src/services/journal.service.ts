import { generateInsights, GenerateInsightsOutput } from '@/ai/flows/generate-insights';
import { useJournalDataStore } from '@/store/journal-data.store';
import { useJournalUIStore } from '@/store/journal-ui.store';
import { Insight, JournalEntry } from '@/types';

export class JournalService {
  private getCurrentUserId(): string {
    return 'user-123-placeholder';
  }

  private get _dataStore() {
    return useJournalDataStore.getState();
  }

  public async generateInsightsForEntry(entryId: string): Promise<Insight> {
    const entry = this._dataStore.entries.find(e => e.id === entryId)!;
    // Invocación con objeto
    const output: GenerateInsightsOutput = await generateInsights({
      journalEntries: entry.content,
    });

    // Mapear a Insight completo
    const now = new Date();
    const insight: Insight = {
      id: crypto.randomUUID(),
      userId: this.getCurrentUserId(),
      themes: output.themes,
      strengths: output.strengths,
      questions: output.questions,
      crisisAlert: output.crisisAlert,
      generatedAt: now,
      journalEntriesIds: [entryId],
      reviewed: false
    };

    return insight;
  }

  public async generateInsightsFromAllEntries(): Promise<Insight> {
    const { getEntriesAsText, entries, addInsight } = this._dataStore;
    const journalText = getEntriesAsText();

    if (!journalText.trim()) {
      throw new Error('No hay entradas para generar insights.');
    }

    const output: GenerateInsightsOutput = await generateInsights({
      journalEntries: journalText,
    });

    const now = new Date();
    const insight: Insight = {
      id: crypto.randomUUID(),
      userId: this.getCurrentUserId(),
      themes: output.themes,
      strengths: output.strengths,
      questions: output.questions,
      crisisAlert: output.crisisAlert,
      generatedAt: now,
      journalEntriesIds: entries.map((e) => e.id),
      reviewed: false,
    };

    addInsight(insight);

    if (insight.crisisAlert) {
      useJournalUIStore.getState().setCrisisDetected(true);
    }

    return insight;
  }

  public async saveEntry(data: { content: string }): Promise<boolean> {
    const { content } = data;
    const newEntry: Omit<JournalEntry, 'insights' | 'sentiment' | 'clarityScore'> = {
      id: crypto.randomUUID(),
      content,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: this.getCurrentUserId(),
      isPrivate: true,
    };

    this._dataStore.addEntry(newEntry as JournalEntry);

    const insight = await this.generateInsightsForEntry(newEntry.id);

    if (insight.crisisAlert) {
      useJournalUIStore.getState().setCrisisDetected(true);
    }

    return insight.crisisAlert;
  }
}

export const journalService = new JournalService();
