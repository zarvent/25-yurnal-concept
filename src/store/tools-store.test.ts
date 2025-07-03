import { act } from 'react-dom/test-utils';
import { debouncedSave, useToolsStore } from './tools-store';

jest.mock('./tools-store', () => {
  const originalModule = jest.requireActual('./tools-store');
  return {
    ...originalModule,
    debouncedSave: jest.fn(),
  };
});

describe('Tools Store', () => {
  beforeEach(() => {
    useToolsStore.setState({
      tools: [
        { id: 'tool-1', name: 'Tool 1' },
        { id: 'tool-2', name: 'Tool 2' },
        { id: 'tool-3', name: 'Tool 3' },
      ],
      activeToolId: null,
      status: 'idle',
      error: null,
    });
  });

  it('should reorder tools correctly with moveTool', () => {
    const { moveTool, tools } = useToolsStore.getState();
    act(() => {
      moveTool('tool-1', 'tool-3');
    });
    expect(tools).toEqual([
      { id: 'tool-2', name: 'Tool 2' },
      { id: 'tool-3', name: 'Tool 3' },
      { id: 'tool-1', name: 'Tool 1' },
    ]);
  });

  it('should handle invalid IDs gracefully in moveTool', () => {
    const { moveTool, tools } = useToolsStore.getState();
    act(() => {
      moveTool('invalid-id', 'tool-3');
    });
    expect(tools).toEqual([
      { id: 'tool-1', name: 'Tool 1' },
      { id: 'tool-2', name: 'Tool 2' },
      { id: 'tool-3', name: 'Tool 3' },
    ]);
  });

  it('should debounce saveToolsOrder calls', async () => {
    const { saveToolsOrder } = useToolsStore.getState();
    jest.useFakeTimers();
    act(() => {
      saveToolsOrder();
      saveToolsOrder();
    });
    expect(debouncedSave).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
  });

  it('should rollback state on API error', async () => {
    const { saveToolsOrder } = useToolsStore.getState();
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('API Error'))
    );
    act(() => {
      saveToolsOrder();
    });
    expect(useToolsStore.getState().status).toBe('error');
    expect(useToolsStore.getState().tools).toEqual([
      { id: 'tool-1', name: 'Tool 1' },
      { id: 'tool-2', name: 'Tool 2' },
      { id: 'tool-3', name: 'Tool 3' },
    ]);
  });
});
