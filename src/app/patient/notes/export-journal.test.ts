import { exportJournal } from './test-journal';

// Mock para URL.createObjectURL y descarga
const mockCreateObjectURL = jest.fn(() => 'blob:url');
const mockClick = jest.fn();
const mockAppendChild = jest.fn();
const mockRemoveChild = jest.fn();
const mockRevokeObjectURL = jest.fn();

global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;
document.createElement = jest.fn(() => ({ click: mockClick })) as any;
document.body.appendChild = mockAppendChild as any;
document.body.removeChild = mockRemoveChild as any;

describe('exportJournal', () => {
  const entry = {
    id: '1',
    createdAt: new Date('2024-01-01T12:00:00Z'),
    updatedAt: new Date('2024-01-02T12:00:00Z'),
    content: 'Contenido de la nota',
    tags: ['tag1', 'tag2'],
    userId: 'user1',
    isPrivate: false,
    mood: 'happy',
  };
  const entry2 = {
    ...entry,
    id: '2',
    content: 'Otra nota',
    mood: 'sad',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exporta una sola nota como Markdown', () => {
    exportJournal(entry, 'markdown', 'nota-1.md');
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });

  it('exporta varias notas como Markdown', () => {
    exportJournal([entry, entry2], 'markdown', 'todas.md');
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });

  it('llama alert si el formato es PDF', () => {
    window.alert = jest.fn();
    exportJournal(entry, 'pdf', 'nota-1.pdf');
    expect(window.alert).toHaveBeenCalledWith('Exportar a PDF aún no está implementado.');
  });
});
