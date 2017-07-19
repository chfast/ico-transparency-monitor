export const drawStatistics = statistics => ({ type: 'DRAW_STATS', stats: statistics });

export const showStatistics = () => ({ type: 'SHOW_STATS' });

export const showLoader = () => ({ type: 'SHOW_LOADER' });

export const hideLoader = () => ({ type: 'HIDE_LOADER' });

export const setProperties = (address, prop) => ({ type: 'SET_ICO_PROPERTY', address, prop });

export const resetRpc = () => ({ type: 'RESET_RPC' });

export const errorMessage = () => ({ type: 'SHOW_MODAL_ERROR', message: 'WEB3_CONNECTION_FAIL' });

export const increaseCounter = () => ({ type: 'INCREASE_COUNTER' });

export const resetCounter = () => ({ type: 'RESET_COUNTER' });
