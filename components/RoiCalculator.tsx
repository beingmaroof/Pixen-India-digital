"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

interface RoiInputs {
  monthlyVisitors: number;
  leadRate: number;
  closeRate: number;
  averageDealValue: number;
  growthLift: number;
}

const INITIAL_INPUTS: RoiInputs = {
  monthlyVisitors: 5000,
  leadRate: 3.2,
  closeRate: 18,
  averageDealValue: 45000,
  growthLift: 32,
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function MetricCard({
  label,
  value,
  hint,
  accent = 'from-purple-500/20 to-blue-500/10',
}: {
  label: string;
  value: string;
  hint: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#050815] p-5">
      <div className={`mb-4 h-10 w-10 rounded-2xl bg-gradient-to-br ${accent}`} />
      <p className="text-xs uppercase tracking-[0.2em] text-white/35">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/45">{hint}</p>
    </div>
  );
}

export default function RoiCalculator() {
  const [inputs, setInputs] = useState<RoiInputs>(INITIAL_INPUTS);

  const current = useMemo(() => {
    const leads = Math.round(inputs.monthlyVisitors * (inputs.leadRate / 100));
    const customers = Math.round(leads * (inputs.closeRate / 100));
    const revenue = customers * inputs.averageDealValue;

    return { leads, customers, revenue };
  }, [inputs]);

  const projected = useMemo(() => {
    const upliftMultiplier = 1 + inputs.growthLift / 100;
    const projectedLeads = Math.round(current.leads * upliftMultiplier);
    const projectedCustomers = Math.round(projectedLeads * ((inputs.closeRate + 4) / 100));
    const projectedRevenue = projectedCustomers * inputs.averageDealValue;

    return {
      leads: projectedLeads,
      customers: projectedCustomers,
      revenue: projectedRevenue,
      monthlyLift: Math.max(projectedRevenue - current.revenue, 0),
    };
  }, [current, inputs]);

  const projectedQuery = new URLSearchParams({
    leadMagnet: 'roi_calculator',
    visitors: String(inputs.monthlyVisitors),
    leadRate: String(inputs.leadRate),
    closeRate: String(inputs.closeRate),
    averageDealValue: String(inputs.averageDealValue),
    projectedLift: String(projected.monthlyLift),
  }).toString();

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.05fr)_420px]">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
              Revenue Leak Calculator
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Estimate the upside hidden inside your current funnel
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50">
              Plug in your current traffic and conversion numbers. We will show the revenue lift you
              could unlock by tightening qualification, pages, creative, and follow-up speed.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Annual upside: <span className="font-bold">{formatCurrency(projected.monthlyLift * 12)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="rounded-2xl border border-white/10 bg-[#050815] p-4">
            <span className="text-xs uppercase tracking-[0.2em] text-white/35">Monthly Visitors</span>
            <input
              type="number"
              min={100}
              step={100}
              value={inputs.monthlyVisitors}
              onChange={(event) =>
                setInputs((currentInputs) => ({
                  ...currentInputs,
                  monthlyVisitors: Number(event.target.value) || 0,
                }))
              }
              className="mt-3 w-full bg-transparent text-3xl font-bold text-white outline-none"
            />
          </label>

          <label className="rounded-2xl border border-white/10 bg-[#050815] p-4">
            <span className="text-xs uppercase tracking-[0.2em] text-white/35">Lead Conversion Rate</span>
            <div className="mt-3 flex items-end gap-3">
              <input
                type="range"
                min={0.5}
                max={12}
                step={0.1}
                value={inputs.leadRate}
                onChange={(event) =>
                  setInputs((currentInputs) => ({
                    ...currentInputs,
                    leadRate: Number(event.target.value),
                  }))
                }
                className="w-full accent-purple-400"
              />
              <span className="w-16 text-right text-2xl font-bold text-white">{inputs.leadRate}%</span>
            </div>
          </label>

          <label className="rounded-2xl border border-white/10 bg-[#050815] p-4">
            <span className="text-xs uppercase tracking-[0.2em] text-white/35">Sales Close Rate</span>
            <div className="mt-3 flex items-end gap-3">
              <input
                type="range"
                min={2}
                max={45}
                step={1}
                value={inputs.closeRate}
                onChange={(event) =>
                  setInputs((currentInputs) => ({
                    ...currentInputs,
                    closeRate: Number(event.target.value),
                  }))
                }
                className="w-full accent-blue-400"
              />
              <span className="w-16 text-right text-2xl font-bold text-white">{inputs.closeRate}%</span>
            </div>
          </label>

          <label className="rounded-2xl border border-white/10 bg-[#050815] p-4">
            <span className="text-xs uppercase tracking-[0.2em] text-white/35">Average Deal Value</span>
            <input
              type="number"
              min={1000}
              step={5000}
              value={inputs.averageDealValue}
              onChange={(event) =>
                setInputs((currentInputs) => ({
                  ...currentInputs,
                  averageDealValue: Number(event.target.value) || 0,
                }))
              }
              className="mt-3 w-full bg-transparent text-3xl font-bold text-white outline-none"
            />
            <p className="mt-2 text-xs text-white/30">{formatCurrency(inputs.averageDealValue)} per new client</p>
          </label>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-[#050815] p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">Expected Funnel Lift</p>
              <p className="mt-2 text-sm text-white/50">
                This combines better conversion rate, stronger lead quality, and faster follow-up.
              </p>
            </div>
            <div className="text-3xl font-bold text-white">{inputs.growthLift}%</div>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            step={1}
            value={inputs.growthLift}
            onChange={(event) =>
              setInputs((currentInputs) => ({
                ...currentInputs,
                growthLift: Number(event.target.value),
              }))
            }
            className="mt-4 w-full accent-emerald-400"
          />
        </div>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-[#10172a] to-[#050815] p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">Projection Snapshot</p>
        <h3 className="mt-3 text-2xl font-bold text-white">What the next 90 days could look like</h3>
        <div className="mt-6 grid gap-4">
          <MetricCard
            label="Current Revenue"
            value={formatCurrency(current.revenue)}
            hint={`${current.leads} leads converting into ${current.customers} customers per month.`}
          />
          <MetricCard
            label="Projected Revenue"
            value={formatCurrency(projected.revenue)}
            hint={`${projected.leads} leads and ${projected.customers} customers with a tighter system.`}
            accent="from-emerald-500/20 to-blue-500/10"
          />
          <MetricCard
            label="Monthly Lift"
            value={formatCurrency(projected.monthlyLift)}
            hint="This is the extra revenue opportunity your audit should help uncover and prioritize."
            accent="from-orange-500/20 to-pink-500/10"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
          <p className="text-sm leading-relaxed text-white/55">
            If these numbers look meaningful, the next move is not “run more ads.” It is to identify
            exactly where your current funnel is leaking intent, trust, and conversion momentum.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              href={`/audit?${projectedQuery}`}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
            >
              Turn This Into an Audit
            </Link>
            <Link
              href="/industries"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/75 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              Explore Industry Playbooks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
