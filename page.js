
'use client';
import { useState } from 'react';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { Target, Flame, Lock, Unlock, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const { connected } = useWallet();
  const [balance, setBalance] = useState(0);
  const [target, setTarget] = useState(500);
  const [loading, setLoading] = useState(false);

  const isComplete = balance >= target;
  const progress = Math.min((balance / target) * 100, 100);

  const deposit = () => {
    if (!connected || isComplete) return;
    setLoading(true);
    setTimeout(() => {
      setBalance(b => b + 100);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-[#050505]">
      <nav className="w-full max-w-5xl flex justify-between items-center mb-20">
        <div className="flex items-center gap-2">
          <Flame className="text-phoenix" size={32} />
          <h1 className="text-2xl font-black">PHOENIX VAULT</h1>
        </div>
        <CardanoWallet />
      </nav>

      <div className="w-full max-w-xl bg-neutral-900 border border-white/5 rounded-[40px] p-10 shadow-2xl">
        <div className="text-center mb-10">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-tighter">Current Vault Holdings</p>
          <h2 className="text-7xl font-black mt-2">{balance} <span className="text-phoenix text-3xl">ADA</span></h2>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between text-xs font-bold text-gray-400">
            <span>SAVINGS GOAL: {target} ADA</span>
            <span>{progress.toFixed(0)}% REACHED</span>
          </div>
          <div className="h-4 bg-black rounded-full overflow-hidden border border-white/5">
            <div 
              className={`h-full transition-all duration-700 ${isComplete ? 'bg-emerald-500' : 'bg-phoenix'}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-10">
            <button 
              onClick={deposit}
              disabled={!connected || isComplete || loading}
              className="py-5 bg-phoenix hover:scale-105 transition-all text-white font-black rounded-2xl flex items-center justify-center gap-2 disabled:opacity-20"
            >
              {loading ? 'Processing...' : 'Deposit ADA'} <ArrowUpRight size={18} />
            </button>
            <button 
              disabled={!isComplete || !connected}
              className="py-5 bg-white text-black hover:scale-105 transition-all font-black rounded-2xl flex items-center justify-center gap-2 disabled:opacity-10"
            >
              {isComplete ? 'Unlock Funds' : <Lock size={18} />}
            </button>
          </div>
          {!connected && <p className="text-center text-xs text-gray-600 font-bold uppercase py-4">Connect Wallet to Start Protocol</p>}
        </div>
      </div>
    </div>
  );
}