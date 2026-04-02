import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client as specified in GEMINI.md
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const dynamic = 'force-dynamic';

export default async function ProteinBarsTrackerPage() {
  // A. The Data Fetch Logic
  const { data, error } = await supabase
    .from('nutrient_snapshots')
    .select('*')
    .order('captured_at', { ascending: false })
    .limit(50);

  // Standard error logging if the network fetch fails
  if (error) {
    console.error('Network fetch failure for nutrient_snapshots:', error);
  }

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 font-[family-name:var(--font-space-grotesk)]">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* B. The UI/UX Specifications */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Protein Bars Tracker
        </h1>
        
        <p className="text-zinc-400 mb-12 text-lg leading-relaxed max-w-3xl">
          This project was built to programmatically track and compute the quantitative variance in nutritional macros across leading protein bars. An automated ETL pipeline fetches raw vectors directly from the USDA database every 6 days, calculates the ΔX matrix, and renders the baseline state below.
        </p>

        {/* C. The Data Table Specifications */}
        <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-900/10 backdrop-blur-sm">
          <table className="w-full text-left border-collapse divide-y divide-zinc-800">
            <thead className="bg-zinc-900/50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  Epoch (Timestamp)
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  UPC
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  ΔX Payload (JSONB)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {data && data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={index} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-6 text-sm text-zinc-400 align-top whitespace-nowrap">
                      {new Date(row.captured_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-6 text-sm text-zinc-400 align-top font-mono">
                      {row.gtin_upc}
                    </td>
                    <td className="px-6 py-6 text-sm text-zinc-400 align-top max-w-xs truncate md:max-w-none md:whitespace-normal">
                      {row.nutrient_name}
                    </td>
                    <td className="px-6 py-6 text-sm font-mono align-top">
                      <div className="max-w-2xl overflow-x-auto custom-scrollbar">
                        <pre className="p-4 bg-black/40 rounded-lg border border-zinc-800 text-xs md:text-sm text-zinc-300">
                          <code>
                            {!row.variance_payload || Object.keys(row.variance_payload).length === 0
                              ? '0'
                              : JSON.stringify(row.variance_payload, null, 2)}
                          </code>
                        </pre>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-zinc-500 italic text-lg">
                    No tracking data available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="text-zinc-500 text-xs mt-8">
          Data provided by the U.S. Department of Agriculture, Agricultural Research Service. FoodData Central. fdc.nal.usda.gov.
        </footer>
      </div>
    </div>
  );
}
