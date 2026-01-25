"use client";

import { useMerchants } from "@/view-models/use-merchants";
import { ArrowUpRight, Shield, ShoppingCart, Users, Activity, ExternalLink, ArrowDownRight, RefreshCw, AlertCircle } from "lucide-react";

export default function OverviewPage() {
  const { merchants, isLoading, error, updatePolicy } = useMerchants();

  const handleUpdatePolicy = async (merchantId: string) => {
    // Demo update
    try {
      await updatePolicy(merchantId, "v1.1", { max_spend: 6000 });
      alert("Policy updated and audited!");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-10 text-slate-100">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2 font-outfit">Security Console</h1>
          <p className="text-slate-400 max-w-2xl">
            Unified Commerce Protocol (UCP) network oversight and secure policy orchestration for the Talos Protocol.
          </p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            <span>Hexagonal Core Active</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center text-rose-400">
            <AlertCircle className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Tracked Merchants", value: merchants.length, change: "+2", trend: "up", icon: Users },
          { label: "Total Transactions", value: "1,284", change: "+12.5%", trend: "up", icon: ShoppingCart },
          { label: "Blocked Requests", value: "42", change: "-5%", trend: "down", icon: Shield },
          { label: "Avg. Latency", value: "4.2ms", change: "-0.1ms", trend: "down", icon: Activity },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-slate-800 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 ml-1" /> : <ArrowDownRight className="w-3.5 h-3.5 ml-1" />}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white leading-none">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-white">Merchant Enforcement</h2>
            <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
              View All <ExternalLink className="w-4 h-4 ml-1.5" />
            </button>
          </div>
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 grid grid-cols-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <div>Domain</div>
              <div>Capabilities</div>
              <div className="text-center">Status</div>
              <div className="text-right col-span-2 px-4">Actions</div>
            </div>
            <div className="divide-y divide-slate-800">
              {isLoading ? (
                <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                    <RefreshCw className="w-6 h-6 animate-spin mb-2" />
                    <span>Syncing with gateway...</span>
                </div>
              ) : merchants.map((merchant) => (
                <div key={merchant.id} className="p-4 grid grid-cols-5 items-center text-sm hover:bg-slate-800/50 transition-colors">
                  <div className="text-slate-200 font-medium font-mono text-xs">{merchant.domain}</div>
                  <div className="text-slate-400 text-xs">{merchant.capabilities.join(", ")}</div>
                  <div className="flex justify-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${merchant.isEnabled ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                      {merchant.isEnabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <div className="col-span-2 text-right px-4 space-x-3">
                    <button 
                         onClick={() => handleUpdatePolicy(merchant.id)}
                         className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
                    >
                      Update Policy
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700">
                      Audit Logs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">System Health</h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-slate-950 border border-indigo-500/20 shadow-[0_0_40px_rgba(79,70,229,0.1)]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-wider">Policy Engine</p>
                <p className="text-xs text-indigo-400">Hexagonal Validation Core</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Encryption Uptime</span>
                <span className="text-sm font-bold text-emerald-400">99.98%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[99.9%]"></div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider">Security Invariants</h3>
            <div className="space-y-4">
              {[
                  { label: "TLS 1.3 Enforcement", status: true },
                  { label: "ES256 Signature Check", status: true },
                  { label: "JWS Detached Verify", status: true },
                  { label: "Audit Intent Trigger", status: true }
              ].map((inv) => (
                <div key={inv.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{inv.label}</span>
                  <div className={`w-2 h-2 rounded-full ${inv.status ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
