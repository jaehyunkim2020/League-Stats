import React, { Component } from 'react';

type State = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<{}, State> {
    state = {
        hasError: false
    };

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Caught an error: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please refresh this page or try again later.</h1>;
        }
        return this.props.children;
    }
}