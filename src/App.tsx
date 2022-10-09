import React from 'react';
import SampleComponent from './components/SampleComponent';

function App() {
  return (
    <div className="flex flex-col  h-screen">
      <h1 className="bg-sky-500/100 h-20">navibar</h1>
      <div className="flex h-screen">
        <div className="flex-initial w-2/6 h-full">
          <h1>一覧出力</h1>
        </div>
        <div className="flex-1 h-full">
          <SampleComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
