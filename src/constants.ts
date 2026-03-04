import { 
  Database, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Zap, 
  Globe, 
  Server, 
  Cloud, 
  Lock, 
  Eye, 
  Workflow, 
  RefreshCw, 
  AlertTriangle,
  Monitor,
  Map as MapIcon,
  Satellite,
  Radio,
  Wind
} from 'lucide-react';

export const ARCHITECTURE_LAYERS = [
  {
    id: 'ingestion',
    title: 'Data Ingestion Layer',
    icon: Satellite,
    description: 'Real-time and batch ingestion of high-velocity disaster data.',
    technologies: [
      { name: 'Pub/Sub', role: 'Real-time streaming ingestion for IoT & Seismic feeds.' },
      { name: 'Cloud Storage', role: 'Landing zone for high-res satellite imagery (Sentinel-2, Landsat).' },
      { name: 'Transfer Service', role: 'Automated batch ingestion from external weather APIs.' }
    ],
    details: [
      'Multi-protocol support (MQTT, HTTP, gRPC) via IoT Core / Pub/Sub.',
      'Global endpoint distribution for low-latency sensor data.',
      'Auto-scaling ingestion buffers to handle spikes during active events.'
    ]
  },
  {
    id: 'processing',
    title: 'Data Processing Layer',
    icon: RefreshCw,
    description: 'Stream and batch processing for feature engineering and data normalization.',
    technologies: [
      { name: 'Dataflow', role: 'Unified stream & batch processing (Apache Beam).' },
      { name: 'BigQuery', role: 'Serverless data warehouse for historical analysis & feature store.' },
      { name: 'Cloud Functions', role: 'Event-driven light transformations & metadata extraction.' }
    ],
    details: [
      'Real-time windowing for anomaly detection in seismic streams.',
      'Satellite image pre-processing (radiometric correction, cloud masking) on Dataflow.',
      'Schema validation and PII masking for government compliance.'
    ]
  },
  {
    id: 'ai-ml',
    title: 'Intelligence & Forecasting',
    icon: Cpu,
    description: 'Deep learning models for predictive forecasting, computer vision, and anomaly detection.',
    technologies: [
      { name: 'Temporal Fusion Transformers', role: 'Multi-horizon time-series forecasting for sensor data.' },
      { name: 'CNNs / Vision Transformers', role: 'Real-time satellite imagery analysis & flood mapping.' },
      { name: 'Vertex AI Model Registry', role: 'Version control for disaster forecasting models.' }
    ],
    details: [
      'Temporal Fusion Transformers (TFT) for long-range weather and seismic forecasting.',
      'CNN-based U-Net architectures for precise flood extent mapping from SAR imagery.',
      'Continuous model evaluation against historical disaster patterns using Vertex AI.'
    ]
  },
  {
    id: 'agentic',
    title: 'Agentic Decision Layer',
    icon: Workflow,
    description: 'Autonomous AI agents powered by Gemini 1.5 Pro for multi-modal reasoning and response.',
    technologies: [
      { name: 'Gemini 1.5 Pro', role: 'Multi-modal reasoning engine (1M+ token context window).' },
      { name: 'Autonomous Agents', role: 'Digital commanders executing emergency protocols.' },
      { name: 'LangChain / LangGraph', role: 'Orchestration framework for agentic decision loops.' }
    ],
    details: [
      'Gemini 1.5 Pro correlates satellite imagery with ground-truth sensor data.',
      'Autonomous generation of evacuation routes and resource plans.',
      'Natural language coordination with municipal emergency services.'
    ]
  },
  {
    id: 'application',
    title: 'Application & Visualization',
    icon: Monitor,
    description: 'Real-time geospatial dashboards for decision makers and field operators.',
    technologies: [
      { name: 'Google Maps Platform', role: 'Geospatial visualization of disaster impact & assets.' },
      { name: 'App Engine / GKE', role: 'Hosting the command center web application.' },
      { name: 'Looker', role: 'Business intelligence for post-disaster analysis & reporting.' }
    ],
    details: [
      'Real-time heatmaps for seismic activity and flood progression.',
      'Interactive 3D terrain mapping for landslide risk assessment.',
      'Mobile-first dashboards for first responders in the field.'
    ]
  },
  {
    id: 'security',
    title: 'Security & Governance',
    icon: ShieldCheck,
    description: 'Enterprise-grade security, identity management, and compliance.',
    technologies: [
      { name: 'IAM', role: 'Fine-grained access control for government personnel.' },
      { name: 'Security Command Center', role: 'Threat detection & security posture management.' },
      { name: 'Cloud Key Management', role: 'Encryption of sensitive citizen & infrastructure data.' }
    ],
    details: [
      'Data residency compliance for national security requirements.',
      'Audit logging for all autonomous agent actions (traceability).',
      'VPC Service Controls to prevent data exfiltration.'
    ]
  }
];

export const REGIONS = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    gcpRegion: 'asia-south1',
    sensors: [
      { id: 'S-BOM-101', type: 'Water Level', value: '4.8', unit: 'm', status: 'Critical', location: 'Mithi River' },
      { id: 'S-BOM-102', type: 'Water Level', value: '3.2', unit: 'm', status: 'Warning', location: 'Marine Drive' },
      { id: 'S-BOM-103', type: 'Wind Speed', value: '25', unit: 'km/h', status: 'Normal', location: 'Colaba Coast' },
      { id: 'S-BOM-104', type: 'Seismic', value: '0.2', unit: 'Richter', status: 'Normal', location: 'Panvel Fault' },
    ]
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    gcpRegion: 'asia-south1',
    sensors: [
      { id: 'S-DEL-201', type: 'Seismic', value: '3.4', unit: 'Richter', status: 'Warning', location: 'Sohna Fault' },
      { id: 'S-DEL-202', type: 'Wind Speed', value: '18', unit: 'km/h', status: 'Normal', location: 'Yamuna Bank' },
      { id: 'S-DEL-203', type: 'Seismic', value: '1.2', unit: 'Richter', status: 'Normal', location: 'Ridge Area' },
      { id: 'S-DEL-204', type: 'Water Level', value: '2.1', unit: 'm', status: 'Normal', location: 'Wazirabad Barrage' },
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai',
    gcpRegion: 'asia-south1',
    sensors: [
      { id: 'S-MAA-301', type: 'Wind Speed', value: '72', unit: 'km/h', status: 'Warning', location: 'Marina Beach' },
      { id: 'S-MAA-302', type: 'Water Level', value: '1.8', unit: 'm', status: 'Normal', location: 'Adyar River' },
      { id: 'S-MAA-303', type: 'Wind Speed', value: '85', unit: 'km/h', status: 'Critical', location: 'Ennore Port' },
      { id: 'S-MAA-304', type: 'Water Level', value: '2.4', unit: 'm', status: 'Warning', location: 'Chembarambakkam' },
    ]
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    gcpRegion: 'asia-south1',
    sensors: [
      { id: 'S-CCU-401', type: 'Water Level', value: '5.1', unit: 'm', status: 'Critical', location: 'Hooghly River' },
      { id: 'S-CCU-402', type: 'Wind Speed', value: '42', unit: 'km/h', status: 'Warning', location: 'Howrah Bridge' },
      { id: 'S-CCU-403', type: 'Water Level', value: '3.8', unit: 'm', status: 'Warning', location: 'Sundarbans Delta' },
      { id: 'S-CCU-404', type: 'Seismic', value: '0.5', unit: 'Richter', status: 'Normal', location: 'Bengal Basin' },
    ]
  }
];

export const MOCK_SENSORS = REGIONS[0].sensors;

export const EMERGENCY_PROTOCOLS = [
  {
    id: 'P-001',
    title: 'Flood Evacuation Protocol',
    level: 'Critical',
    steps: [
      'Activate municipal siren network in affected sectors.',
      'Deploy autonomous drones for real-time aerial surveillance.',
      'Reroute public transit and emergency vehicles via non-flood zones.',
      'Broadcast multi-lingual emergency alerts via SMS and Radio.',
      'Open designated high-ground shelters and dispatch medical units.'
    ],
    trigger: 'Water level > 4.5m or Prediction Confidence > 90%'
  },
  {
    id: 'P-002',
    title: 'Seismic Response Protocol',
    level: 'High',
    steps: [
      'Automatic shutdown of gas and high-voltage power grids.',
      'Halt all rail and subway operations immediately.',
      'Activate structural integrity sensors in critical infrastructure.',
      'Deploy Search and Rescue (SAR) teams to high-risk zones.',
      'Establish satellite communication links for emergency coordination.'
    ],
    trigger: 'Seismic activity > 5.0 Richter'
  },
  {
    id: 'P-003',
    title: 'Cyclone/Wind Protocol',
    level: 'Warning',
    steps: [
      'Issue mandatory stay-at-home orders for coastal sectors.',
      'Secure loose infrastructure and construction equipment.',
      'Prepare backup power generators for hospitals and data centers.',
      'Evacuate low-lying coastal settlements to inland bunkers.',
      'Monitor wind progression via real-time satellite telemetry.'
    ],
    trigger: 'Wind speed > 80 km/h'
  }
];

export const DATA_FLOW_STEPS = [
  { step: 1, label: 'Ingestion', service: 'Pub/Sub', desc: 'IoT & Seismic data streamed at 100k events/sec.' },
  { step: 2, label: 'Processing', service: 'Dataflow', desc: 'Real-time windowing & feature extraction.' },
  { step: 3, label: 'Inference', service: 'Vertex AI', desc: 'Deep learning models predict disaster probability.' },
  { step: 4, label: 'Reasoning', service: 'Gemini 1.5 Pro', desc: 'Multi-modal analysis of visual & telemetry data.' },
  { step: 5, label: 'Action', service: 'Cloud Run', desc: 'Autonomous agents trigger emergency protocols.' },
];
