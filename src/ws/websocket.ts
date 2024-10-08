export function establishWebSocketConnection() {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
        console.log('WebSocket connection established');
    };

    ws.onclose = (event) => {
        console.log('WebSocket connection closed', event);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error', error);
    };

    return ws;
}