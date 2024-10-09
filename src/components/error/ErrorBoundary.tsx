import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Обновляет состояние, чтобы следующий рендер показал fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Можно записать ошибку в лог
        console.error("Caught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Можно отобразить кастомный fallback UI
            return <h2>Не удалось загрузить данные</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;