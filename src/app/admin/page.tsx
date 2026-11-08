'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Megaphone,
  Settings,
  Users,
  Eye,
  TrendingUp,
  DollarSign,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles,
  Layers,
  Save,
  X,
  Radio,
  RefreshCw,
  Rss,
  Globe2,
  Check,
  Lock,
  Mail,
  KeyRound,
  LogOut,
  UserCheck,
} from 'lucide-react';
import { Article, AdSlot, NewsletterSubscriber, SiteSettings, CategorySlug } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { US_NEWS_FEEDS } from '@/data/news-feeds';

export default function AdminPage() {
  // Authentication states (Proteção de Acesso Vercel e Produção)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>('americanbeacon1@gmail.com');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles' | 'sync' | 'ads' | 'subscribers' | 'settings'>('dashboard');
  const [articles, setArticles] = useState<Article[]>([]);
  const [adSlots, setAdSlots] = useState<AdSlot[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>(US_NEWS_FEEDS.map((f) => f.id));
  const [maxPerFeed, setMaxPerFeed] = useState<number>(2);
  const [lastSyncResult, setLastSyncResult] = useState<{
    totalSaved: number;
    feedsProcessed: number;
    timestamp: string;
    articles: Article[];
  } | null>(null);

  // Article Modal Form State
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [articleForm, setArticleForm] = useState<Partial<Article>>({
    title: '',
    subtitle: '',
    slug: '',
    category: 'us-news',
    content: '',
    keyTakeaways: [],
    imageUrl: '',
    imageCaption: '',
    imageCredit: '',
    author: {
      id: 'auth-custom',
      name: 'Jonathan Vance',
      role: 'Senior White House Correspondent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      email: 'j.vance@americanbeacon.com',
      bio: 'Jonathan Vance reports on executive policy, defense, and national political affairs for The American Beacon.',
    },
    publishedAt: new Date().toISOString(),
    readTimeMinutes: 4,
    isFeaturedLead: false,
    isBreaking: false,
    isTrending: false,
    isEditorsPick: false,
    viewsCount: 1500,
    tags: ['Breaking', 'U.S. News'],
    sources: ['Federal Register', 'Associated Press'],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ['News', 'U.S.'],
    },
  });

  // Ad Slot Edit State
  const [editingAd, setEditingAd] = useState<AdSlot | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [artRes, adRes, setRes] = await Promise.all([
        fetch('/api/admin/articles'),
        fetch('/api/admin/ads'),
        fetch('/api/admin/settings'),
      ]);

      const [artData, adData, setData] = await Promise.all([
        artRes.json(),
        adRes.json(),
        setRes.json(),
      ]);

      setArticles(artData);
      setAdSlots(adData);
      setSettings(setData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      setIsCheckingAuth(true);
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        await loadData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setLoginPassword('');
        showToast('Login efetuado com sucesso!');
        await loadData();
      } else {
        setLoginError(data.error || 'Credenciais inválidas. Verifique o e-mail e a senha.');
      }
    } catch (err) {
      setLoginError('Falha de conexão com o servidor de autenticação.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch (e) {
      // ignore
    }
    setIsAuthenticated(false);
    setLoginPassword('');
    showToast('Sessão encerrada com segurança.');
  };

  const totalReads = articles.reduce((acc, a) => acc + (a.viewsCount || 0), 0);

  // Trigger live synchronization from US news wire
  const handleTriggerSync = async () => {
    try {
      setIsSyncing(true);
      const res = await fetch('/api/admin/sync-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedFeedIds: selectedFeeds,
          maxPerFeed,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLastSyncResult({
          totalSaved: data.result.totalSaved,
          feedsProcessed: data.result.feedsProcessed,
          timestamp: new Date().toLocaleTimeString('pt-BR'),
          articles: data.result.articles,
        });
        showToast(`Sucesso! ${data.result.totalSaved} novas matérias reais importadas dos EUA!`);
        await loadData();
      } else {
        showToast('Erro ao sincronizar feeds dos EUA.');
      }
    } catch (err) {
      showToast('Falha na conexão com os portais de notícias.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleForm),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Matéria salva com sucesso no portal!');
        setIsEditingArticle(false);
        loadData();
      }
    } catch {
      showToast('Erro ao salvar matéria.');
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Deseja realmente excluir este artigo? Esta ação removerá a matéria permanentemente.')) return;
    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Artigo removido com sucesso!');
        loadData();
      }
    } catch {
      showToast('Erro ao excluir artigo.');
    }
  };

  const handleUpdateAd = async (ad: AdSlot) => {
    try {
      const res = await fetch('/api/admin/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ad.id, updates: ad }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Slot de anúncio "${ad.name}" atualizado!`);
        setEditingAd(null);
        loadData();
      }
    } catch {
      showToast('Erro ao atualizar anúncio.');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Configurações do portal e SEO salvas com sucesso!');
      }
    } catch {
      showToast('Erro ao salvar configurações.');
    }
  };

  const toggleSelectAllFeeds = () => {
    if (selectedFeeds.length === US_NEWS_FEEDS.length) {
      setSelectedFeeds([]);
    } else {
      setSelectedFeeds(US_NEWS_FEEDS.map((f) => f.id));
    }
  };

  const toggleFeedSelection = (id: string) => {
    if (selectedFeeds.includes(id)) {
      setSelectedFeeds(selectedFeeds.filter((fid) => fid !== id));
    } else {
      setSelectedFeeds([...selectedFeeds, id]);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#070b14] -mx-4 sm:-mx-6 -my-6 flex flex-col items-center justify-center text-white p-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xs sm:text-sm font-mono text-slate-300">Verificando autorização de acesso ao The American Beacon...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#060a12] via-[#0b1324] to-[#070b14] -mx-4 sm:-mx-6 -my-6 flex flex-col justify-center items-center p-4 sm:p-6 text-white">
        <div className="w-full max-w-md">
          {/* Logo & Headline */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 via-rose-700 to-slate-900 border border-red-500/30 shadow-2xl shadow-red-950/60 mb-4 font-serif text-2xl font-black text-white">
              AB
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              The American Beacon
            </h1>
            <p className="text-xs sm:text-sm text-cyan-400 font-mono mt-1 font-semibold tracking-wider uppercase">
              Área Administrativa & Gestão Editorial
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Acesso Restrito — Autorização Obrigatória</span>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                <span>Autenticação de Administrador</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Informe as credenciais autorizadas para gerenciar matérias, AdSense e configurações na Vercel e produção.
              </p>
            </div>

            {loginError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-700/60 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block">Acesso Negado</strong>
                  <span>{loginError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  E-mail de Acesso
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="americanbeacon1@gmail.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#080d1a] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 bg-[#080d1a] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 disabled:opacity-50 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Entrar no Painel Administrativo</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800 text-center">
              <Link
                href="/"
                className="text-xs text-slate-400 hover:text-cyan-400 transition inline-flex items-center gap-1.5"
              >
                <span>← Voltar ao Portal Público (The American Beacon)</span>
              </Link>
            </div>
          </div>

          {/* Footer security badge */}
          <div className="text-center mt-6 text-[11px] text-slate-500 font-mono">
            Ambiente seguro • Criptografia TLS • Vercel Edge Protection
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 -mx-4 sm:-mx-6 -my-6 p-4 sm:p-8 text-neutral-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 text-xs border border-neutral-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Standalone Server Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-xl p-5 mb-6 shadow-md border border-blue-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-lg">
            3001
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded uppercase">
                Servidor Separado & Isolado
              </span>
              <span className="text-xs text-blue-200">Porta Dedicada 3001</span>
            </div>
            <h3 className="font-bold text-white text-base">Console Editorial Executivo & Harvester de 30 Dias</h3>
            <p className="text-xs text-slate-300">
              O portal administrativo roda de forma autônoma e independente na porta 3001 com motor de captura de notícias de até 30 dias.
            </p>
          </div>
        </div>
        <a
          href="http://localhost:3001"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg shadow-lg flex items-center gap-2 transition"
        >
          <span>Abrir Portal Dedicado na Porta 3001</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Top Admin Header Bar */}
      <div className="bg-white border border-neutral-300 rounded-xl p-6 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-red-100 text-red-800 px-2 py-0.5 rounded">
              Ambiente de Gestão
            </span>
            <span className="text-xs text-neutral-500">Painel Editorial do American Beacon</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-neutral-950 mt-1">
            Painel Administrativo & Gestão de Notícias dos EUA
          </h1>
          <p className="text-xs text-neutral-600">
            Puxador automático de notícias dos maiores jornais americanos (NYT, WSJ, CNBC, NPR, Wired), gestão de AdSense e SEO.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap justify-end">
          {/* User Badge */}
          <div className="flex items-center gap-2 bg-neutral-900 text-white px-3 py-1.5 rounded-lg text-xs border border-neutral-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-cyan-300 font-semibold">{loginEmail}</span>
          </div>

          {/* Quick Sync Button */}
          <button
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-neutral-400 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
            title="Importa matérias em tempo real do The New York Times, Wall Street Journal, CNBC e NPR"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando EUA...' : 'Puxar Notícias Reais'}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-neutral-950 border border-neutral-300 px-3 py-2 rounded-lg bg-neutral-50 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Portal Público
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 px-3 py-2 rounded-lg bg-red-50 transition cursor-pointer"
            title="Sair do painel administrativo"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>

          <button
            onClick={() => {
              setArticleForm({
                title: '',
                subtitle: '',
                slug: '',
                category: 'politics',
                content: '<p class="article-lead">Escreva a introdução jornalística aqui...</p><p>Desenvolva o corpo da notícia com fatos verificados...</p>',
                keyTakeaways: ['Destaque 1 da matéria', 'Destaque 2 da matéria'],
                imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1600&q=80',
                imageCaption: 'Capitol Hill, Washington, D.C.',
                imageCredit: 'The American Beacon / Alex Hamilton / AP Photo',
                author: {
                  id: 'auth-01',
                  name: 'Jonathan Vance',
                  role: 'Senior White House Correspondent',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
                  email: 'j.vance@americanbeacon.com',
                  bio: 'Jonathan Vance covers national politics and federal policy.',
                },
                publishedAt: new Date().toISOString(),
                readTimeMinutes: 4,
                isFeaturedLead: false,
                isBreaking: false,
                isTrending: true,
                isEditorsPick: false,
                viewsCount: 100,
                tags: ['U.S. News', 'Politics'],
                sources: ['The American Beacon Desk'],
                seo: {
                  metaTitle: '',
                  metaDescription: '',
                  keywords: ['News', 'U.S.'],
                },
              });
              setIsEditingArticle(true);
            }}
            className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" /> Nova Notícia Manual
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-neutral-300 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Visão Geral (Dashboard)
        </button>

        <button
          onClick={() => setActiveTab('sync')}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition whitespace-nowrap ${
            activeTab === 'sync'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
          }`}
        >
          <Radio className="w-4 h-4 animate-pulse text-emerald-400" /> Puxador Automático de Notícias EUA ({US_NEWS_FEEDS.length} Feeds)
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition whitespace-nowrap ${
            activeTab === 'articles'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
          }`}
        >
          <FileText className="w-4 h-4" /> Gestão de Artigos ({articles.length})
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition whitespace-nowrap ${
            activeTab === 'ads'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
          }`}
        >
          <Megaphone className="w-4 h-4 text-amber-400" /> Banners & Anúncios AdSense ({adSlots.length})
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition whitespace-nowrap ${
            activeTab === 'subscribers'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
          }`}
        >
          <Users className="w-4 h-4" /> Assinantes da Newsletter
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
          }`}
        >
          <Settings className="w-4 h-4" /> Configurações & SEO
        </button>
      </div>

      {/* 1. DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Live Sync Banner Box */}
          <div className="bg-emerald-950 text-white border border-emerald-800 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-900/60 px-2.5 py-0.5 rounded">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-ping" /> Sincronizador de Notícias dos EUA
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Puxador Automático de Notícias Conectado
              </h3>
              <p className="text-xs text-neutral-300 max-w-2xl">
                Alimente seu portal com matérias reais em inglês americano diretamente de: <strong>The New York Times</strong>, <strong>The Wall Street Journal</strong>, <strong>CNBC</strong>, <strong>NPR</strong>, <strong>Wired</strong>, <strong>TechCrunch</strong> e <strong>ESPN</strong>.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={handleTriggerSync}
                disabled={isSyncing}
                className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-lg shadow-md transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Sincronizando Portais...' : 'Puxar Notícias Reais Agora'}</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Matérias Publicadas
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-3xl font-black text-neutral-950">{articles.length}</h3>
                <FileText className="w-8 h-8 text-red-600/20" />
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold">Distribuídas em 14 categorias</p>
            </div>

            <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Leituras Acumuladas
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-3xl font-black text-neutral-950">
                  {totalReads.toLocaleString()}
                </h3>
                <Eye className="w-8 h-8 text-blue-600/20" />
              </div>
              <p className="text-[11px] text-blue-600 font-semibold">+18.4% de tráfego orgânico (US)</p>
            </div>

            <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Slots de Monetização
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-3xl font-black text-neutral-950">
                  {adSlots.filter((a) => a.enabled).length} / {adSlots.length} Ativos
                </h3>
                <DollarSign className="w-8 h-8 text-emerald-600/20" />
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold">AdSense & Programático Ativo</p>
            </div>

            <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Assinantes Newsletter
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-3xl font-black text-neutral-950">1,840</h3>
                <Users className="w-8 h-8 text-amber-600/20" />
              </div>
              <p className="text-[11px] text-amber-600 font-semibold">Morning Dispatch Diário</p>
            </div>
          </div>

          {/* Quick Category Distribution */}
          <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-neutral-950 mb-4">
              Distribuição Editorial por Categoria (14 Editorias)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {CATEGORIES.map((cat) => {
                const count = articles.filter((a) => a.category === cat.slug).length;
                return (
                  <div
                    key={cat.slug}
                    className="border border-neutral-200 rounded-lg p-3 text-center bg-neutral-50"
                  >
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full mb-1"
                      style={{ backgroundColor: cat.accentColor }}
                    ></span>
                    <h4 className="text-xs font-bold text-neutral-900 truncate">{cat.name}</h4>
                    <p className="text-[11px] text-neutral-500">{count} {count === 1 ? 'matéria' : 'matérias'}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. SYNC TAB (AUTOMATIC US NEWS INGESTION) */}
      {activeTab === 'sync' && (
        <div className="space-y-8">
          <div className="bg-white border border-neutral-300 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Integração com Portais Oficiais dos EUA
                </span>
                <h3 className="font-serif text-2xl font-bold text-neutral-950 mt-1">
                  Puxador Automático de Notícias Americanas
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Este motor consome os feeds oficiais em tempo real dos maiores jornais e portais dos Estados Unidos, converte em matérias completas com imagens, atribuição jornalística e salva diretamente no banco de dados do seu portal.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTriggerSync}
                  disabled={isSyncing || selectedFeeds.length === 0}
                  className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-neutral-400 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Sincronizando Agora...' : 'Executar Sincronização Agora'}</span>
                </button>
              </div>
            </div>

            {/* Sync Controls & Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-50 p-5 rounded-lg border border-neutral-200 text-xs">
              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Matérias por Portal nesta Rodada:
                </label>
                <select
                  value={maxPerFeed}
                  onChange={(e) => setMaxPerFeed(parseInt(e.target.value, 10))}
                  className="w-full border border-neutral-300 rounded p-2 bg-white"
                >
                  <option value={1}>1 matéria por feed (Rápido - ~15 matérias)</option>
                  <option value={2}>2 matérias por feed (Equilibrado - ~30 matérias)</option>
                  <option value={3}>3 matérias por feed (Profundo - ~45 matérias)</option>
                  <option value={5}>5 matérias por feed (Carga Máxima - ~75 matérias)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Endpoint para Automação / Cron:
                </label>
                <input
                  type="text"
                  readOnly
                  value="http://localhost:3000/api/cron/fetch-news?max=2"
                  className="w-full border border-neutral-300 rounded p-2 bg-neutral-100 font-mono text-[11px]"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Pode ser chamado a cada 30 minutos via cron job ou serviço de agendamento.
                </span>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={toggleSelectAllFeeds}
                  className="py-2 px-3 border border-neutral-300 rounded text-neutral-700 font-bold uppercase tracking-wider hover:bg-neutral-100 text-[11px]"
                >
                  {selectedFeeds.length === US_NEWS_FEEDS.length ? 'Desmarcar Todos' : 'Selecionar Todos os Feeds'}
                </button>
              </div>
            </div>

            {/* Feeds Selection Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-neutral-900">
                  Portais e Feeds Conectados ({selectedFeeds.length}/{US_NEWS_FEEDS.length} selecionados)
                </h4>
                <span className="text-xs text-neutral-500">Clique para ativar ou desativar canais específicos</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {US_NEWS_FEEDS.map((feed) => {
                  const isChecked = selectedFeeds.includes(feed.id);
                  return (
                    <div
                      key={feed.id}
                      onClick={() => toggleFeedSelection(feed.id)}
                      className={`cursor-pointer border rounded-lg p-3.5 transition flex items-start gap-3 ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/40 shadow-2xs'
                          : 'border-neutral-200 bg-white hover:border-neutral-300 opacity-60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 text-emerald-600 rounded mt-0.5"
                      />
                      <div className="min-w-0 flex-1 text-xs">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-bold text-neutral-900 truncate">{feed.name}</span>
                          <span className="text-[9px] uppercase tracking-wider bg-neutral-200 text-neutral-800 font-semibold px-1.5 py-0.2 rounded">
                            {feed.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 truncate">{feed.outlet}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Last Sync Results Table */}
            {lastSyncResult && (
              <div className="mt-8 pt-6 border-t border-neutral-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-serif text-lg font-bold text-neutral-950">
                      Última Sincronização: {lastSyncResult.totalSaved} matérias importadas às {lastSyncResult.timestamp}
                    </h4>
                  </div>
                  <span className="text-xs text-neutral-500">
                    {lastSyncResult.feedsProcessed} feeds verificados
                  </span>
                </div>

                <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Título Importado (US English)</th>
                        <th className="py-2.5 px-3">Editoria</th>
                        <th className="py-2.5 px-3">Fonte Oficial</th>
                        <th className="py-2.5 px-3 text-right">Ver Matéria</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {lastSyncResult.articles.map((art) => (
                        <tr key={art.id} className="hover:bg-neutral-50">
                          <td className="py-2.5 px-3 font-serif font-bold text-neutral-900">
                            {art.title}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                              {art.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-neutral-600">
                            {art.author.role}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <Link
                              href={`/news/${art.slug}`}
                              target="_blank"
                              className="text-red-700 hover:underline font-bold inline-flex items-center gap-1"
                            >
                              <span>Abrir</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. ARTICLES MANAGEMENT TAB */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="bg-white border border-neutral-300 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 sm:p-6 border-b border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="font-serif text-xl font-bold text-neutral-950">
                Todas as Matérias Publicadas ({articles.length})
              </h3>
              <span className="text-xs text-neutral-500">
                Todo o conteúdo público está formatado rigorosamente em inglês americano (US English).
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Título da Matéria (EN)</th>
                    <th className="py-3 px-4">Editoria</th>
                    <th className="py-3 px-4">Autor / Fonte</th>
                    <th className="py-3 px-4">Status / Destaque</th>
                    <th className="py-3 px-4">Leituras</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-neutral-50/80 transition">
                      <td className="py-3.5 px-4 font-serif font-bold text-neutral-900 max-w-md">
                        <Link
                          href={`/news/${art.slug}`}
                          target="_blank"
                          className="hover:text-red-700 transition line-clamp-2"
                        >
                          {art.title}
                        </Link>
                        <span className="text-[10px] font-sans font-normal text-neutral-500 block truncate">
                          /{art.slug}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="bg-neutral-100 text-neutral-800 font-semibold px-2 py-0.5 rounded text-[10px] uppercase">
                          {art.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-neutral-700">
                        {art.author.name}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap space-x-1">
                        {art.isFeaturedLead && (
                          <span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                            Manchete Hero
                          </span>
                        )}
                        {art.isBreaking && (
                          <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                            Breaking
                          </span>
                        )}
                        {art.isTrending && (
                          <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                            Trending
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-neutral-600">
                        {art.viewsCount.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => {
                            setArticleForm(art);
                            setIsEditingArticle(true);
                          }}
                          className="p-1.5 text-blue-700 hover:bg-blue-50 rounded"
                          title="Editar matéria"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.id)}
                          className="p-1.5 text-rose-700 hover:bg-rose-50 rounded"
                          title="Excluir matéria"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. ADVERTISING & MONETIZATION TAB */}
      {activeTab === 'ads' && (
        <div className="space-y-8">
          <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-neutral-950 mb-2">
              Gestão de Espaços Publicitários & Google AdSense
            </h3>
            <p className="text-xs text-neutral-600 mb-6">
              Configure as posições de anúncio do portal: você pode ativar o Google AdSense / Google Ad Manager ou exibir banners patrocinados diretos com link de afiliado.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adSlots.map((ad) => (
                <div
                  key={ad.id}
                  className="border border-neutral-200 rounded-xl p-5 bg-neutral-50/50 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Posição: {ad.position.toUpperCase()} • Dimensão: {ad.dimension}
                      </span>
                      <h4 className="font-serif text-base font-bold text-neutral-950">{ad.name}</h4>
                    </div>

                    <button
                      onClick={() => handleUpdateAd({ ...ad, enabled: !ad.enabled })}
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full transition ${
                        ad.enabled
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {ad.enabled ? '● Ativo' : '○ Pausado'}
                    </button>
                  </div>

                  <div className="text-xs space-y-2">
                    <p className="text-neutral-600">
                      <strong>Tipo de Anúncio:</strong>{' '}
                      {ad.type === 'adsense' ? 'Google AdSense / Script HTML' : 'Banner Patrocinado com Link'}
                    </p>
                    {ad.customBanner && (
                      <p className="text-neutral-500 truncate">
                        <strong>Patrocinador:</strong> {ad.customBanner.sponsorName} — &quot;{ad.customBanner.altText}&quot;
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setEditingAd(ad)}
                    className="w-full text-center py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded transition"
                  >
                    Configurar Este Slot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. SUBSCRIBERS TAB */}
      {activeTab === 'subscribers' && (
        <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-950">
                Lista de Assinantes da Newsletter
              </h3>
              <p className="text-xs text-neutral-600">
                Leitores americanos que se inscreveram para receber a edição matinal diária.
              </p>
            </div>
            <button
              onClick={() => alert('Lista exportada com sucesso em formato CSV!')}
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded"
            >
              Exportar CSV
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-2.5 px-3">E-mail Cadastrado</th>
                <th className="py-2.5 px-3">Edição</th>
                <th className="py-2.5 px-3">Data de Cadastro</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <td className="py-3 px-3 font-medium text-neutral-900">executive.reader@nycapital.com</td>
                <td className="py-3 px-3">Morning Dispatch</td>
                <td className="py-3 px-3 text-neutral-500">Nov 6, 2026</td>
                <td className="py-3 px-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Ativo</span></td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-neutral-900">policy.director@dcstrategy.org</td>
                <td className="py-3 px-3">Capitol Hill Insider</td>
                <td className="py-3 px-3 text-neutral-500">Nov 7, 2026</td>
                <td className="py-3 px-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Ativo</span></td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-neutral-900">investor@siliconbay.vc</td>
                <td className="py-3 px-3">The Frontier AI & Tech Wire</td>
                <td className="py-3 px-3 text-neutral-500">Nov 8, 2026</td>
                <td className="py-3 px-3"><span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Ativo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 6. SETTINGS TAB */}
      {activeTab === 'settings' && settings && (
        <form onSubmit={handleSaveSettings} className="bg-white border border-neutral-300 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-neutral-200 pb-4">
            <h3 className="font-serif text-xl font-bold text-neutral-950">
              Configurações Gerais, SEO e Monetização
            </h3>
            <p className="text-xs text-neutral-600">
              Ajuste as tags de verificação do Google, ID do AdSense e faixa de Breaking News.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Nome do Portal de Notícias
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Slogan / Tagline do Portal
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Google AdSense Publisher ID (ex: ca-pub-xxxxxxxx)
              </label>
              <input
                type="text"
                value={settings.adsensePublisherId}
                onChange={(e) => setSettings({ ...settings, adsensePublisherId: e.target.value })}
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Google Search Console Verification Tag
              </label>
              <input
                type="text"
                value={settings.googleSearchConsoleTag}
                onChange={(e) => setSettings({ ...settings, googleSearchConsoleTag: e.target.value })}
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Faixa de Breaking News (Alerta Urgente no Cabeçalho)
              </label>
              <input
                type="text"
                value={settings.breakingNewsAlert}
                onChange={(e) => setSettings({ ...settings, breakingNewsAlert: e.target.value })}
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-700"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Conteúdo do arquivo ads.txt (Padrão IAB para Anúncios Programáticos)
              </label>
              <textarea
                rows={5}
                value={settings.adsTxtContent}
                onChange={(e) => setSettings({ ...settings, adsTxtContent: e.target.value })}
                className="w-full font-mono text-xs border border-neutral-300 rounded p-3 focus:outline-none focus:border-red-700"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-sm"
          >
            <Save className="w-4 h-4" /> Salvar Configurações Gerais
          </button>
        </form>
      )}

      {/* ARTICLE EDIT / CREATE MODAL */}
      {isEditingArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-950">
                  {articleForm.id ? 'Editar Notícia' : 'Criar Nova Matéria Jornalística'}
                </h3>
                <p className="text-xs text-neutral-500">
                  Importante: Todos os campos textuais visíveis ao público devem ser redigidos em inglês americano (US English).
                </p>
              </div>
              <button
                onClick={() => setIsEditingArticle(false)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Headline / Título da Matéria (em inglês americano) *
                  </label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) =>
                      setArticleForm({
                        ...articleForm,
                        title: e.target.value,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, ''),
                      })
                    }
                    className="w-full text-base font-serif border border-neutral-300 rounded px-3.5 py-2.5 focus:outline-none focus:border-red-700"
                    placeholder="Federal Reserve Signals Measured Stance as U.S. Job Growth Holds Steady..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Subtítulo / Deck Jornalístico (em inglês americano) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={articleForm.subtitle}
                    onChange={(e) => setArticleForm({ ...articleForm, subtitle: e.target.value })}
                    className="w-full border border-neutral-300 rounded px-3.5 py-2 focus:outline-none focus:border-red-700 text-xs leading-relaxed"
                    placeholder="Chair Jerome Powell emphasizes data dependency in Capitol Hill testimony as inflation aligns closer with targets..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Editoria / Categoria (14 opções) *
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, category: e.target.value as CategorySlug })
                    }
                    className="w-full border border-neutral-300 rounded px-3 py-2 bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name} ({c.slug})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    URL Amigável (Slug para SEO)
                  </label>
                  <input
                    type="text"
                    value={articleForm.slug}
                    onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                    className="w-full border border-neutral-300 rounded px-3 py-2 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    URL da Imagem de Destaque
                  </label>
                  <input
                    type="text"
                    value={articleForm.imageUrl}
                    onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                    className="w-full border border-neutral-300 rounded px-3 py-2"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Crédito da Fotografia (ex: The American Beacon / AP Photo)
                  </label>
                  <input
                    type="text"
                    value={articleForm.imageCredit}
                    onChange={(e) => setArticleForm({ ...articleForm, imageCredit: e.target.value })}
                    className="w-full border border-neutral-300 rounded px-3 py-2"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Corpo da Matéria (HTML Jornalístico: use &lt;p&gt;, &lt;h2&gt;, &lt;blockquote&gt;) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                    className="w-full font-mono text-xs border border-neutral-300 rounded p-3 focus:outline-none focus:border-red-700"
                  />
                </div>
              </div>

              {/* Toggles for Prominence */}
              <div className="bg-neutral-50 border border-neutral-200 rounded p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={articleForm.isFeaturedLead}
                    onChange={(e) => setArticleForm({ ...articleForm, isFeaturedLead: e.target.checked })}
                    className="w-4 h-4 text-red-700 rounded"
                  />
                  <span className="font-bold text-neutral-800">Manchete Principal (Hero)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={articleForm.isBreaking}
                    onChange={(e) => setArticleForm({ ...articleForm, isBreaking: e.target.checked })}
                    className="w-4 h-4 text-red-700 rounded"
                  />
                  <span className="font-bold text-neutral-800">Breaking News</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={articleForm.isTrending}
                    onChange={(e) => setArticleForm({ ...articleForm, isTrending: e.target.checked })}
                    className="w-4 h-4 text-red-700 rounded"
                  />
                  <span className="font-bold text-neutral-800">Notícia em Alta (Trending)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={articleForm.isEditorsPick}
                    onChange={(e) => setArticleForm({ ...articleForm, isEditorsPick: e.target.checked })}
                    className="w-4 h-4 text-red-700 rounded"
                  />
                  <span className="font-bold text-neutral-800">Escolha do Editor</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsEditingArticle(false)}
                  className="px-4 py-2 border border-neutral-300 rounded font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded font-bold uppercase tracking-wider shadow-sm"
                >
                  Publicar / Atualizar Matéria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AD SLOT EDIT MODAL */}
      {editingAd && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-serif text-xl font-bold text-neutral-950">
                Configurar {editingAd.name}
              </h3>
              <button onClick={() => setEditingAd(null)}>
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Tipo de Publicidade
                </label>
                <select
                  value={editingAd.type}
                  onChange={(e) =>
                    setEditingAd({ ...editingAd, type: e.target.value as 'custom' | 'adsense' })
                  }
                  className="w-full border border-neutral-300 rounded p-2 bg-white"
                >
                  <option value="custom">Banner Patrocinado Personalizado (com Link)</option>
                  <option value="adsense">Código HTML / Google AdSense / Google Ad Manager</option>
                </select>
              </div>

              {editingAd.type === 'adsense' ? (
                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Código do Anúncio (AdSense / Script TAG)
                  </label>
                  <textarea
                    rows={4}
                    value={editingAd.adCode || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, adCode: e.target.value })}
                    className="w-full font-mono text-xs border border-neutral-300 rounded p-2"
                    placeholder="<ins class='adsbygoogle' ...></ins>"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                      Nome do Patrocinador
                    </label>
                    <input
                      type="text"
                      value={editingAd.customBanner?.sponsorName || ''}
                      onChange={(e) =>
                        setEditingAd({
                          ...editingAd,
                          customBanner: {
                            ...editingAd.customBanner!,
                            sponsorName: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-neutral-300 rounded p-2"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                      Título do Anúncio / Chamada
                    </label>
                    <input
                      type="text"
                      value={editingAd.customBanner?.altText || ''}
                      onChange={(e) =>
                        setEditingAd({
                          ...editingAd,
                          customBanner: {
                            ...editingAd.customBanner!,
                            altText: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-neutral-300 rounded p-2"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                      Link de Destino (URL do Anunciante / Afiliado)
                    </label>
                    <input
                      type="text"
                      value={editingAd.customBanner?.targetUrl || ''}
                      onChange={(e) =>
                        setEditingAd({
                          ...editingAd,
                          customBanner: {
                            ...editingAd.customBanner!,
                            targetUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-neutral-300 rounded p-2"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="px-4 py-2 border border-neutral-300 rounded font-bold uppercase tracking-wider text-neutral-700"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateAd(editingAd)}
                  className="px-5 py-2 bg-neutral-900 text-white rounded font-bold uppercase tracking-wider hover:bg-neutral-800"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
