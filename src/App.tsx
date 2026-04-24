import { useState } from 'react';
import './App.css';

// 1. Higher-Order Component (HOC) Pattern
const withLogging = (WrappedComponent: any) => {
  return (props: any) => {
    console.log(`Rendering ${WrappedComponent.name} with props:`, props);
    return <WrappedComponent {...props} />;
  };
};

const SimpleCard = ({ title, content }: { title: string, content: string }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

const LoggedCard = withLogging(SimpleCard);

// 2. Render Prop Pattern
const MouseTracker = ({ render }: { render: (pos: { x: number, y: number }) => JSX.Element }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="tracker-area" onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
};

function App() {
  return (
    <div className="advanced-lab">
      <h1>Experiment 8: Advanced React Patterns</h1>
      <p>Demonstrating HOCs and Render Props for code reuse and logic separation.</p>

      <section className="section">
        <h3>Pattern 1: Higher-Order Component</h3>
        <div className="card-container">
          <LoggedCard title="HOC Pattern" content="This component is wrapped by withLogging which tracks its render lifecycle." />
        </div>
      </section>

      <section className="section">
        <h3>Pattern 2: Render Prop Pattern</h3>
        <MouseTracker render={({ x, y }) => (
          <div className="result-box">
            <p>Mouse Position: <span>{x}, {y}</span></p>
          </div>
        )} />
      </section>
    </div>
  );
}

export default App;
