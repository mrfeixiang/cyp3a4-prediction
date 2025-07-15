import React, { useState } from 'react';
import { Upload, Play, Download, BarChart3, Beaker, Settings, TrendingUp, CheckCircle } from 'lucide-react';

interface TrainData {
  ID: string;
  Canonical_Smiles: string;
  Inhibition: string;
}

interface TestData {
  ID: string;
  Canonical_Smiles: string;
}

interface ModelMetrics {
  RMSE: number;
  MAE: number;
  R2: number;
  MAPE: number;
}

interface PredictionResult {
  ID: string;
  Canonical_Smiles: string;
  Inhibition: number;
}

const CYP3A4PredictionApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [trainData, setTrainData] = useState<TrainData[] | null>(null);
  const [testData, setTestData] = useState<TestData[] | null>(null);
  const [modelResults, setModelResults] = useState<Record<string, ModelMetrics> | null>(null);
  const [predictions, setPredictions] = useState<PredictionResult[] | null>(null);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingProgress, setTrainingProgress] = useState<number>(0);
  const [selectedModel, setSelectedModel] = useState<string>('bayesian_ridge');

  const trainModel = async (): Promise<void> => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    for (let i = 0; i <= 100; i += 10) {
      setTrainingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    const mockResults: Record<string, ModelMetrics> = {
      bayesian_ridge: { MAE: 21.0264, RMSE: 25.3246, R2: 0.0847, MAPE: 5.5584 },
      random_forest: { MAE: 21.0451, RMSE: 25.6919, R2: 0.0579, MAPE: 5.1527 },
      lasso: { MAE: 21.7979, RMSE: 26.0126, R2: 0.0345, MAPE: 5.8199 },
      lightgbm: { MAE: 21.6443, RMSE: 26.4294, R2: 0.0023, MAPE: 5.2513 }
    };
    
    setModelResults(mockResults);
    setIsTraining(false);
  };

  const makePredictions = (): void => {
    if (!testData) return;
    
    const mockPredictions: PredictionResult[] = testData.map((row) => ({
      ID: row.ID,
      Canonical_Smiles: row.Canonical_Smiles,
      Inhibition: Math.max(0, Math.min(100, 30 + Math.random() * 40))
    }));
    
    setPredictions(mockPredictions);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'train' | 'test'): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target?.result as string;
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',');
          const row: any = {};
          headers.forEach((header, idx) => {
            row[header.trim()] = values[idx]?.trim();
          });
          return row;
        });
        
        if (type === 'train') {
          setTrainData(data);
        } else {
          setTestData(data);
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadSubmission = (): void => {
    if (!predictions) return;
    
    const csvContent = 'ID,Inhibition\n' + 
      predictions.map(p => `${p.ID},${p.Inhibition.toFixed(6)}`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submission.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ebf8ff 0%, #dbeafe 100%)',
    padding: '24px'
  };

  const cardStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '32px'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
            CYP3A4 Enzyme Inhibition Prediction Platform
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
            Machine Learning Pipeline for Drug Metabolism Prediction
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px', justifyContent: 'center' }}>
          {[
            { id: 'upload', icon: Upload, label: 'Data Upload' },
            { id: 'features', icon: Beaker, label: 'Feature Engineering' },
            { id: 'models', icon: Settings, label: 'Model Training' },
            { id: 'results', icon: BarChart3, label: 'Results' },
            { id: 'prediction', icon: TrendingUp, label: 'Prediction' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                backgroundColor: activeTab === id ? '#2563eb' : '#f3f4f6',
                color: activeTab === id ? 'white' : '#6b7280'
              }}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'upload' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '24px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Upload color="#2563eb" />
                  Training Data (train.csv)
                </h3>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e, 'train')}
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                />
                {trainData && (
                  <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '12px', borderRadius: '8px', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} />
                    Loaded {trainData.length} compounds
                  </div>
                )}
              </div>
              
              <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '24px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Upload color="#2563eb" />
                  Test Data (test.csv)
                </h3>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e, 'test')}
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                />
                {testData && (
                  <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '12px', borderRadius: '8px', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={16} />
                    Loaded {testData.length} compounds
                  </div>
                )}
              </div>
            </div>

            {trainData && (
              <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Data Preview</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#e5e7eb', padding: '12px', textAlign: 'left' }}>ID</th>
                        <th style={{ backgroundColor: '#e5e7eb', padding: '12px', textAlign: 'left' }}>Canonical_Smiles</th>
                        <th style={{ backgroundColor: '#e5e7eb', padding: '12px', textAlign: 'left' }}>Inhibition (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainData.slice(0, 5).map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{row.ID}</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '12px' }}>
                            {row.Canonical_Smiles?.substring(0, 40)}...
                          </td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{row.Inhibition}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'models' && (
          <div>
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Settings color="#2563eb" />
                Model Configuration
              </h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Primary Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                >
                  <option value="bayesian_ridge">Bayesian Ridge (推荐)</option>
                  <option value="random_forest">Random Forest</option>
                  <option value="lasso">Lasso Regression</option>
                  <option value="lightgbm">LightGBM</option>
                </select>
              </div>

              <button
                onClick={trainModel}
                disabled={!trainData || isTraining}
                style={{
                  ...buttonStyle,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: (!trainData || isTraining) ? '#d1d5db' : '#2563eb',
                  cursor: (!trainData || isTraining) ? 'not-allowed' : 'pointer'
                }}
              >
                <Play size={20} />
                {isTraining ? 'Training Models...' : 'Train & Compare Models'}
              </button>
              
              {isTraining && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
                    <div 
                      style={{
                        backgroundColor: '#2563eb',
                        height: '100%',
                        borderRadius: '9999px',
                        width: `${trainingProgress}%`,
                        transition: 'width 0.3s'
                      }}
                    ></div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                    Training Progress: {trainingProgress}%
                  </p>
                </div>
              )}
            </div>

            {modelResults && (
              <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Model Comparison Results (基于您的PyCaret结果)</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#e5e7eb', padding: '12px', textAlign: 'left' }}>Model</th>
                        <th style={{ backgroundColor: '#e5e7eb', padding: '12px', textAlign: 'left' }}>RMSE</th>
                        <th style={{ backgroundColor: '#e5e7eb', padding: '12px', textAlign: 'left' }}>MAE</th>
                        <th style={{ backgroundColor: '#e5e7eb', padding: '12px', textAlign: 'left' }}>R²</th>
                        <th style={{ backgroundColor: '#e5e7eb', padding: '12px', textAlign: 'left' }}>MAPE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(modelResults)
                        .sort(([,a], [,b]) => a.RMSE - b.RMSE)
                        .map(([model, metrics]) => (
                        <tr key={model} style={{ backgroundColor: model === selectedModel ? '#eff6ff' : 'transparent' }}>
                          <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                            {model.replace('_', ' ').toUpperCase()}
                            {model === 'bayesian_ridge' && 
                              <span style={{ fontSize: '12px', backgroundColor: '#f0fdf4', color: '#166534', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px' }}>
                                BEST
                              </span>
                            }
                          </td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{metrics.RMSE.toFixed(4)}</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{metrics.MAE.toFixed(4)}</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{metrics.R2.toFixed(4)}</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{metrics.MAPE.toFixed(4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'prediction' && (
          <div>
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '24px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <TrendingUp color="#2563eb" />
                Test Data Prediction
              </h3>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <button
                  onClick={makePredictions}
                  disabled={!testData || !modelResults}
                  style={{
                    ...buttonStyle,
                    backgroundColor: (!testData || !modelResults) ? '#d1d5db' : '#2563eb',
                    cursor: (!testData || !modelResults) ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Play size={20} />
                  Generate Predictions
                </button>
                
                <button
                  onClick={downloadSubmission}
                  disabled={!predictions}
                  style={{
                    ...buttonStyle,
                    backgroundColor: !predictions ? '#d1d5db' : '#059669',
                    cursor: !predictions ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Download size={20} />
                  Download Submission
                </button>
              </div>
              
              {predictions && (
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Prediction Results</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ backgroundColor: '#e5e7eb', padding: '8px', textAlign: 'left' }}>ID</th>
                          <th style={{ backgroundColor: '#e5e7eb', padding: '8px', textAlign: 'left' }}>SMILES</th>
                          <th style={{ backgroundColor: '#e5e7eb', padding: '8px', textAlign: 'left' }}>Predicted Inhibition (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {predictions.slice(0, 10).map((pred, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e5e7eb' }}>{pred.ID}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '12px' }}>
                              {pred.Canonical_Smiles?.substring(0, 30)}...
                            </td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace' }}>
                              {pred.Inhibition.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                    Showing first 10 predictions. Total: {predictions.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CYP3A4PredictionApp;