import { act } from 'react';
import axios from 'axios';
import { debouncedSave, useToolsStore } from './tools-store';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Tools Store', () => {
  beforeEach(() => {
    useToolsStore.setState({
      tools: [
        { id: 'tool-1', name: 'Tool 1' },
        { id: 'tool-2', name: 'Tool 2' },
        { id: 'tool-3', name: 'Tool 3' },
      ],
      lastSavedTools: [
        { id: 'tool-1', name: 'Tool 1' },
        { id: 'tool-2', name: 'Tool 2' },
        { id: 'tool-3', name: 'Tool 3' },
      ],
      activeToolId: null,
      status: 'idle',
      error: null,
    });
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should reorder tools correctly with moveTool', () => {
    const { moveTool } = useToolsStore.getState();
    act(() => {
      moveTool('tool-1', 'tool-3');
    });
    const { tools } = useToolsStore.getState();
    expect(tools).toEqual([
      { id: 'tool-2', name: 'Tool 2' },
      { id: 'tool-3', name: 'Tool 3' },
      { id: 'tool-1', name: 'Tool 1' },
    ]);
  });

  it('should handle invalid IDs gracefully in moveTool', () => {
    const { moveTool } = useToolsStore.getState();
    act(() => {
      moveTool('invalid-id', 'tool-3');
    });
    const { tools } = useToolsStore.getState();
    expect(tools).toEqual([
      { id: 'tool-1', name: 'Tool 1' },
      { id: 'tool-2', name: 'Tool 2' },
      { id: 'tool-3', name: 'Tool 3' },
    ]);
  });

  it('should debounce saveToolsOrder calls', async () => {
    // We can spy on axios to check calls instead of spying on debouncedSave
    // because spying on debouncedSave (which is internal) is hard.
    const { saveToolsOrder } = useToolsStore.getState();
    mockedAxios.post.mockResolvedValue({});

    act(() => {
      saveToolsOrder();
      saveToolsOrder();
    });

    // Advance time but not enough to trigger
    await act(async () => {
        jest.advanceTimersByTime(200);
    });
    expect(mockedAxios.post).not.toHaveBeenCalled();

    // Advance time to trigger
    await act(async () => {
        jest.runAllTimers();
    });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it('should revert changes if save fails', async () => {
     const { moveTool, saveToolsOrder } = useToolsStore.getState();

     // Mock API failure
     mockedAxios.post.mockRejectedValue(new Error('Network Error'));

     // Perform move
     act(() => {
       moveTool('tool-1', 'tool-3');
     });

     // Check immediate state (optimistic update)
     expect(useToolsStore.getState().tools).toEqual([
       { id: 'tool-2', name: 'Tool 2' },
       { id: 'tool-3', name: 'Tool 3' },
       { id: 'tool-1', name: 'Tool 1' },
     ]);

     // Trigger save
     act(() => {
       saveToolsOrder();
     });

     // Fast-forward debounce time
     await act(async () => {
        jest.runAllTimers();
     });

     // Expect status to be error
     expect(useToolsStore.getState().status).toBe('error');

     // Expect revert to initial state [1, 2, 3]
     expect(useToolsStore.getState().tools).toEqual([
        { id: 'tool-1', name: 'Tool 1' },
        { id: 'tool-2', name: 'Tool 2' },
        { id: 'tool-3', name: 'Tool 3' },
     ]);
  });

  it('should update lastSavedTools on success', async () => {
     const { moveTool, saveToolsOrder } = useToolsStore.getState();

     // Mock API success
     mockedAxios.post.mockResolvedValue({});

     // Perform move
     act(() => {
       moveTool('tool-1', 'tool-3');
     });

     // Trigger save
     act(() => {
       saveToolsOrder();
     });

     // Fast-forward
     await act(async () => {
        jest.runAllTimers();
     });

     // Expect status to be success
     expect(useToolsStore.getState().status).toBe('success');

     // Expect lastSavedTools to be updated
     expect(useToolsStore.getState().lastSavedTools).toEqual([
       { id: 'tool-2', name: 'Tool 2' },
       { id: 'tool-3', name: 'Tool 3' },
       { id: 'tool-1', name: 'Tool 1' },
     ]);
  });
});
