"use client";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Html, Grid } from "@react-three/drei";
import { agSupabase as supabase } from "@/lib/supabaseClient";

interface TelemetryLog {
  id: string;
  zone_id: string;
  temperature_c: number;
  vpd_kpa: number;
  p_value: number;
  is_anomaly: boolean;
  image_url: string;
  llm_diagnostic: any;
}

const ZONES = [
  { id: 'Zone_1_Fresno', position: [-4, 0.5, -2] as const },
  { id: 'Zone_2_Visalia', position: [0, 0.5, -2] as const },
  { id: 'Zone_3_Bakersfield', position: [4, 0.5, -2] as const },
  { id: 'Zone_4_Madera', position: [-2, 0.5, 2] as const },
  { id: 'Zone_5_Merced', position: [2, 0.5, 2] as const },
];

export default function AgDigitalTwin() {
  const [logs, setLogs] = useState<Record<string, TelemetryLog>>({});

  useEffect(() => {
    // 1. Fetch initial load of data for today
    const fetchLatest = async () => {
      const { data } = await supabase
        .from("telemetry_logs")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(20);

      if (data) {
        const latest: Record<string, TelemetryLog> = {};
        data.forEach((log) => { if (!latest[log.zone_id]) latest[log.zone_id] = log; });
        setLogs(latest);
      }
    };
    fetchLatest();

    // 2. The Senior Flex: Subscribe to WebSockets for real-time Edge updates
    const channel = supabase.channel("realtime-telemetry")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "telemetry_logs" }, (payload) => {
        setLogs((prev) => ({ ...prev, [payload.new.zone_id]: payload.new as TelemetryLog }));
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "telemetry_logs" }, (payload) => {
        setLogs((prev) => ({ ...prev, [payload.new.zone_id]: payload.new as TelemetryLog }));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const activeLogs = Object.values(logs).sort((a, b) => (a.zone_id > b.zone_id ? 1 : -1));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-4xl font-bold text-emerald-400 tracking-tight">Autonomous Fleet Command</h1>
        <p className="text-slate-400 mt-2">True Edge-to-Cloud Observability | Causal Math + Local VLM Inference</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: 3D Spatial Visualization */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Spatial Telemetry
          </h2>
          <div className="w-full h-[600px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
            <Canvas camera={{ position: [0, 8, 12], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.1} />
              <Grid infiniteGrid fadeDistance={40} sectionColor="#334155" cellColor="#1e293b" />

              {ZONES.map((zone) => {
                const anomaly = logs[zone.id];
                const isAlert = anomaly?.is_anomaly;
                const hasDiagnostic = anomaly?.llm_diagnostic;
                
                // Color states: Green (Nominal), Yellow (Awaiting LLM), Red (Diagnosed)
                const color = !isAlert ? '#10b981' : !hasDiagnostic ? '#eab308' : '#ef4444';

                return (
                  <group key={zone.id} position={zone.position}>
                    <Box args={[2, 1, 2]}>
                      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isAlert ? 0.4 : 0} />
                    </Box>
                    <Html position={[0, 1.5, 0]} center>
                      <div className="text-xs font-mono bg-slate-950/80 px-2 py-1 rounded text-slate-300 pointer-events-none border border-slate-700 whitespace-nowrap">
                        {zone.id.replace(/_/g, ' ')}
                      </div>
                    </Html>
                  </group>
                );
              })}
            </Canvas>
          </div>
        </section>

        {/* RIGHT: VLM Diagnostic Feed */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold border-b border-slate-800 pb-2">Edge Agent Diagnostics</h2>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2">
            
            {activeLogs.map((log) => (
              <div key={log.zone_id} className={`p-5 rounded-xl border transition-all ${
                  log.is_anomaly 
                    ? (log.llm_diagnostic ? 'bg-red-950/20 border-red-900/50' : 'bg-yellow-950/20 border-yellow-900/50') 
                    : 'bg-slate-900/50 border-slate-800'
                }`}>
                
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{log.zone_id.replace(/_/g, " ")}</h3>
                  <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded">p={log.p_value.toFixed(4)}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm bg-black/40 p-3 rounded">
                  <div><span className="text-slate-500 block text-xs uppercase">VPD</span>{log.vpd_kpa.toFixed(2)} kPa</div>
                  <div><span className="text-slate-500 block text-xs uppercase">Temp</span>{log.temperature_c.toFixed(1)}°C</div>
                </div>

                {log.is_anomaly ? (
                  <div className="flex gap-4">     
                    {log.image_url && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={log.image_url} alt="Crop Anomaly" className="w-24 h-24 object-cover rounded border border-slate-700" /> 
                        )}
                    <div className="flex-1">
                      {log.llm_diagnostic ? (
                        <div className="bg-black/50 p-3 rounded-md font-mono text-sm border border-red-900/30">
                          <div className="text-red-400 mb-1 text-xs">{"// Edge VLM Diagnosis"}</div>
                          <div className="text-emerald-300">pathogen: <span className="text-white">"{log.llm_diagnostic.pathogen_detected}"</span></div>
                          <div className="text-emerald-300">action: <span className="text-yellow-400">"{log.llm_diagnostic.recommended_action}"</span></div>
                        </div>
                      ) : (
                        <div className="text-yellow-500 animate-pulse text-sm font-mono mt-4 border border-yellow-900/50 bg-yellow-950/30 p-2 rounded">
                          ⚡ Causal shock registered. Waking up offline VLM agent...
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-emerald-500/70 text-sm">Zone Nominal. Thermodynamic math within expected bounds.</p>
                )}
              </div>
            ))}

          </div>
        </section>

      </div>
      {/* <-- This closes your two-column grid */}

      {/* COMPLIANCE / ATTRIBUTION FOOTER */}
      <footer className="mt-12 pt-6 border-t border-slate-800 text-center text-slate-500 text-xs font-mono">
        <p>
          Biological imagery sourced from the{" "}
          <a href="https://github.com/spMohanty/PlantVillage-Dataset" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-400 transition-colors">
            PlantVillage Dataset
          </a>.
          <span className="mx-2">|</span>
          Thermodynamics via{" "}
          <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-400 transition-colors">
            Open-Meteo
          </a>.
        </p>
      </footer>
    </div>
  );
}