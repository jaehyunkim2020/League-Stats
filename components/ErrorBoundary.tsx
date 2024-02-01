import React, { Component, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};


type State = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false
    };

    static getDerivedStateFromError(error: Error): State {
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