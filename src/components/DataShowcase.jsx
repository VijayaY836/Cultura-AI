import { Database, FileSpreadsheet, TrendingUp, CheckCircle, Zap, Shield, Globe } from 'lucide-react';
import { useState } from 'react';

export default function DataShowcase() {
  const [activeDataset, setActiveDataset] = useState('festivals');

  const datasets = [
    {
      id: 'festivals',
      name: 'NE Festivals Dataset',
      source: 'Kaggle - Indian Cultural Heritage',
      records: 47,
      fields: ['name', 'state', 'season', 'rituals', 'communities'],
      processing: ['Data cleaning', 'Duplicate removal', 'Attribution linking', 'Vector embedding'],
      color: 'from-orange-500 to-red-500',
      icon: '🎉'
    },
    {
      id: 'languages',
      name: 'Indian Languages Dataset',
      source: 'Kaggle - BHASHINI Compatible',
      records: 156,
      fields: ['language', 'script', 'speakers', 'region'],
      processing: ['Script normalization', 'Region mapping', 'Unicode handling'],
      color: 'from-blue-500 to-indigo-500',
      icon: '🌐'
    },
    {
      id: 'tribes',
      name: 'Tribal Communities',
      source: 'Kaggle - Indigenous Demographics',
      records: 125,
      fields: ['tribe_name', 'population', 'state', 'traditions'],
      processing: ['Community consent modeling', 'Privacy filtering', 'Cultural attribution'],
      color: 'from-purple-500 to-pink-500',
      icon: '🤝'
    }
  ];

  const activeData = datasets.find(d => d.id === activeDataset);

  return (
    <div className="card-cultural animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Database className="text-white" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-display font-bold text-gray-800">Data Pipeline</h3>
          <p className="text-sm text-gray-600">Kaggle Datasets → Processed → RAG Ready</p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-2 rounded-lg border border-green-200">
          <Zap className="text-green-600" size={16} />
          <span className="text-sm font-semibold text-green-700">Live</span>
        </div>
      </div>

      {/* Dataset Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {datasets.map(dataset => (
          <button
            key={dataset.id}
            onClick={() => setActiveDataset(dataset.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
              activeDataset === dataset.id
                ? `bg-gradient-to-r ${dataset.color} text-white shadow-lg scale-105`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            <span className="text-lg">{dataset.icon}</span>
            {dataset.name}
          </button>
        ))}
      </div>

      {/* Active Dataset Details */}
      <div className="space-y-6">
        {/* Source Info */}
        <div className={`bg-gradient-to-r ${activeData.color} bg-opacity-10 p-6 rounded-2xl border-2 border-opacity-20`} style={{borderColor: 'currentColor'}}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{activeData.icon}</span>
                <div className="text-lg font-display font-bold text-gray-800">{activeData.name}</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <FileSpreadsheet size={16} />
                <span>{activeData.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-green-600" size={16} />
                <span className="text-sm text-green-700 font-medium">Ethically sourced & verified</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-display font-bold bg-gradient-to-r ${activeData.color} bg-clip-text text-transparent`}>
                {activeData.records}
              </div>
              <div className="text-sm text-gray-600 font-medium">records</div>
            </div>
          </div>
        </div>

        {/* Data Fields */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-blue-600" size={20} />
            <h4 className="font-display font-semibold text-gray-800">Data Fields</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {activeData.fields.map((field, i) => (
              <span key={i} className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 rounded-xl text-sm font-medium border border-blue-200 hover:scale-105 transition-transform duration-200 shadow-sm">
                {field}
              </span>
            ))}
          </div>
        </div>

        {/* Processing Pipeline */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-emerald-600" size={20} />
            <h4 className="font-display font-semibold text-gray-800">Processing Pipeline</h4>
          </div>
          <div className="space-y-3">
            {activeData.processing.map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:scale-[1.02] transition-transform duration-200">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <CheckCircle className="text-white" size={16} />
                </div>
                <span className="text-gray-700 font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
          {[
            { label: 'Datasets', value: '3', color: 'text-blue-600' },
            { label: 'Total Records', value: '328', color: 'text-emerald-600' },
            { label: 'Verified', value: '100%', color: 'text-purple-600' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl font-display font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Ethics Badge */}
      <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <CheckCircle className="text-white" size={16} />
          </div>
          <span className="font-display font-bold text-green-800">Ethical Data Practices</span>
        </div>
        <div className="text-sm text-green-700 leading-relaxed ml-11">
          Community attribution • Privacy compliance • Open source datasets • Cultural sensitivity
        </div>
      </div>
    </div>
  );
}