// Auto-generated executive console HTML for Next.js /admin route (works online on Vercel)

export function renderLoginPage(hasError: boolean = false): string {
  
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The American Beacon — Login de Administrador</title>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/icon.png" type="image/png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;900&family=JetBrains+Mono:wght@400;600&display=swap');
    body { font-family: 'Inter', sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#060a12] text-slate-100 min-h-screen flex flex-col justify-center items-center p-4 selection:bg-cyan-500 selection:text-black">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center mb-4">
        <img src="/icon.png" alt="The American Beacon Logo" class="w-16 h-16 rounded-2xl border border-red-500/30 shadow-2xl shadow-red-950/60 object-cover" />
      </div>
      <h1 class="font-serif text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
        The American Beacon
      </h1>
      <p class="text-xs text-cyan-400 font-mono mt-1 font-semibold tracking-wider uppercase">
        Console Editorial Executivo (Console Online)
      </p>
      <div class="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
        <span>Acesso Restrito — Autorização Obrigatória</span>
      </div>
    </div>

    <div class="bg-[#0b1222] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80">
      <div class="mb-6">
        <h2 class="text-lg font-bold text-white flex items-center gap-2">
          <i class="fa-solid fa-lock text-cyan-400"></i>
          <span>Autenticação de Administrador</span>
        </h2>
        <p class="text-xs text-slate-400 mt-1">
          Informe seu e-mail e senha autorizados para acessar o console editorial, harvester de 30 dias e gestor de anúncios.
        </p>
      </div>

      ${hasError ? `
      <div class="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-700/60 text-red-200 text-xs flex items-start gap-2.5">
        <i class="fa-solid fa-triangle-exclamation text-red-400 mt-0.5"></i>
        <div>
          <strong class="font-bold block">Acesso Negado</strong>
          <span>E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.</span>
        </div>
      </div>
      ` : ''}

      <form method="POST" action="/login" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            E-mail de Acesso
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i class="fa-regular fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              value="americanbeacon1@gmail.com"
              required
              class="w-full pl-10 pr-4 py-3 bg-[#060a12] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Senha de Acesso
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i class="fa-solid fa-key"></i>
            </span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              autofocus
              class="w-full pl-10 pr-4 py-3 bg-[#060a12] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <i class="fa-solid fa-shield-halved"></i>
          <span>Entrar no Painel Editorial</span>
        </button>
      </form>

      <div class="mt-6 pt-5 border-t border-slate-800 text-center">
        <a
          href="/"
          target="_blank"
          class="text-xs text-slate-400 hover:text-cyan-400 transition inline-flex items-center gap-1.5"
        >
          <span>← Voltar ao Portal Público (Porta 3000)</span>
        </a>
      </div>
    </div>

    <div class="text-center mt-6 text-[11px] text-slate-500 font-mono">
      The American Beacon • Console Editorial Seguro
    </div>
  </div>
</body>
</html>`;
}

export function renderConsoleHTML(): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The American Beacon — Console Editorial Executivo (Console Online)</title>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/icon.png" type="image/png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              dark: '#080d1a',
              slate: '#0f172a',
              card: '#131e36',
              border: '#1e293b',
              accent: '#38bdf8',
              emerald: '#10b981',
              crimson: '#ef4444',
              gold: '#f59e0b',
            }
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;900&family=JetBrains+Mono:wght@400;600&display=swap');
    body { font-family: 'Inter', sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #080d1a; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #334155; }
  </style>
</head>
<body class="bg-[#070b14] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500 selection:text-black">

  <!-- TOP COMMAND HEADER -->
  <header class="bg-[#0b1120] border-b border-slate-800/80 sticky top-0 z-40 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between flex-wrap gap-2">
    <div class="flex items-center space-x-3 sm:space-x-4">
      <img src="/icon.png" alt="The American Beacon Logo" class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg shadow-lg shadow-red-950/40 border border-cyan-500/30 shrink-0 object-cover" />
      <div>
        <div class="flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
          <span class="text-xs font-black tracking-widest text-slate-300 uppercase">THE AMERICAN BEACON</span>
          <span class="text-[9px] sm:text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono font-bold px-1.5 py-0.2 rounded">CONSOLE EXECUTIVO</span>
          <span class="text-[9px] sm:text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono font-bold px-1.5 py-0.2 rounded hidden sm:inline-flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> ONLINE NO AR
          </span>
        </div>
        <p class="text-[10px] sm:text-[11px] text-slate-400 font-mono truncate max-w-xs sm:max-w-none">Console Editorial & Harvester de Notícias dos EUA</p>
      </div>
    </div>

    <div class="flex items-center space-x-2 sm:space-x-3 shrink-0">
      <!-- Live Status of Port 3000 -->
      <a href="/" target="_blank" class="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-[11px] sm:text-xs font-semibold text-slate-200 transition">
        <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
        <span class="hidden sm:inline">Site Público (3000)</span>
        <span class="sm:hidden">Site</span>
        <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
      </a>

      <!-- Quick Harvest Controls (1 to 10 days, 30 days) -->
      <div class="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-lg p-1">
        <label for="top-harvest-days" class="text-[10px] text-slate-400 uppercase font-mono px-1 hidden md:inline">Período:</label>
        <select id="top-harvest-days" class="bg-[#070b14] border border-slate-700 text-slate-200 text-[11px] sm:text-xs font-semibold px-2 py-1 rounded focus:outline-none cursor-pointer">
          <option value="1">1 Dia (24h)</option>
          <option value="2">2 Dias</option>
          <option value="3">3 Dias</option>
          <option value="4">4 Dias</option>
          <option value="5">5 Dias</option>
          <option value="6">6 Dias</option>
          <option value="7">7 Dias (Semana)</option>
          <option value="8">8 Dias</option>
          <option value="9">9 Dias</option>
          <option value="10" selected>10 Dias (Padrão)</option>
          <option value="15">15 Dias</option>
          <option value="30">30 Dias (Mês)</option>
        </select>
        <button onclick="triggerQuickHarvest()" id="btn-quick-sync" class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded shadow flex items-center gap-1.5 transition cursor-pointer">
          <i class="fa-solid fa-satellite-dish" id="quick-sync-icon"></i>
          <span class="hidden sm:inline">Puxar Notícias</span>
          <span class="sm:hidden">Puxar</span>
        </button>
      </div>

      <!-- Logged User Badge -->
      <div class="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-300">
        <i class="fa-solid fa-user-shield text-cyan-400"></i>
        <span class="font-mono text-cyan-200">americanbeacon1@gmail.com</span>
      </div>

      <!-- Logout Button -->
      <a href="/logout" class="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-rose-950/70 border border-rose-800/60 hover:bg-rose-900 text-[11px] sm:text-xs font-semibold text-rose-200 transition" title="Sair do painel editorial">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span class="hidden sm:inline">Sair</span>
      </a>
    </div>
  </header>

  <!-- MOBILE HORIZONTAL NAVIGATION TABS (visible only on mobile) -->
  <div class="md:hidden flex items-center gap-1.5 overflow-x-auto p-2 bg-[#0a0f1d] border-b border-slate-800 scrollbar-none shrink-0 sticky top-[57px] z-30">
    <button onclick="switchTab('dashboard')" id="mnav-dashboard" class="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 flex items-center gap-1.5">
      <i class="fa-solid fa-chart-line"></i> Dashboard
    </button>
    <button onclick="switchTab('harvester')" id="mnav-harvester" class="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 flex items-center gap-1.5">
      <i class="fa-solid fa-satellite-dish text-emerald-400"></i> Coletor
    </button>
    <button onclick="switchTab('articles')" id="mnav-articles" class="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 flex items-center gap-1.5">
      <i class="fa-solid fa-newspaper text-indigo-400"></i> Matérias
    </button>
    <button onclick="switchTab('new-article')" id="mnav-new-article" class="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 flex items-center gap-1.5">
      <i class="fa-solid fa-pen-nib text-rose-400"></i> Redigir
    </button>
    <button onclick="switchTab('ads')" id="mnav-ads" class="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 flex items-center gap-1.5">
      <i class="fa-solid fa-rectangle-ad text-amber-400"></i> Anúncios
    </button>
    <button onclick="switchTab('subscribers')" id="mnav-subscribers" class="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 flex items-center gap-1.5">
      <i class="fa-solid fa-envelope-open-text text-purple-400"></i> Assinantes
    </button>
    <button onclick="switchTab('settings')" id="mnav-settings" class="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 flex items-center gap-1.5">
      <i class="fa-solid fa-sliders text-blue-400"></i> Config
    </button>
  </div>

  <!-- MAIN APP CONTAINER -->
  <div class="flex flex-1 overflow-hidden">
    <!-- LEFT SIDEBAR (Desktop) -->
    <aside class="hidden md:flex w-64 bg-[#0a0f1d] border-r border-slate-800/80 p-4 flex-col justify-between shrink-0">
      <div class="space-y-6">
        <div>
          <span class="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3">Módulos de Gestão</span>
          <nav class="mt-2 space-y-1">
            <button onclick="switchTab('dashboard')" id="nav-dashboard" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
              <i class="fa-solid fa-chart-line w-4"></i>
              <span>Visão Geral Executiva</span>
            </button>
            <button onclick="switchTab('harvester')" id="nav-harvester" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition text-slate-300 hover:bg-slate-800/60">
              <i class="fa-solid fa-satellite-dish w-4 text-emerald-400"></i>
              <span>Puxador de Notícias (1 a 10 Dias)</span>
            </button>
            <button onclick="switchTab('articles')" id="nav-articles" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition text-slate-300 hover:bg-slate-800/60">
              <i class="fa-solid fa-newspaper w-4 text-indigo-400"></i>
              <span>Gestão de Artigos (<span id="sidebar-art-count">...</span>)</span>
            </button>
            <button onclick="switchTab('new-article')" id="nav-new-article" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition text-slate-300 hover:bg-slate-800/60">
              <i class="fa-solid fa-pen-nib w-4 text-rose-400"></i>
              <span>Redigir Nova Notícia</span>
            </button>
            <button onclick="switchTab('ads')" id="nav-ads" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition text-slate-300 hover:bg-slate-800/60">
              <i class="fa-solid fa-rectangle-ad w-4 text-amber-400"></i>
              <span>Monetização & AdSense</span>
            </button>
            <button onclick="switchTab('subscribers')" id="nav-subscribers" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition text-slate-300 hover:bg-slate-800/60">
              <i class="fa-solid fa-envelope-open-text w-4 text-purple-400"></i>
              <span>Assinantes Newsletter</span>
            </button>
            <button onclick="switchTab('settings')" id="nav-settings" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition text-slate-300 hover:bg-slate-800/60">
              <i class="fa-solid fa-sliders w-4 text-blue-400"></i>
              <span>Configurações & ads.txt</span>
            </button>
          </nav>
        </div>

        <!-- Wire Feeds Summary -->
        <div class="bg-slate-900/70 border border-slate-800 rounded-lg p-3 text-[11px] space-y-1.5">
          <div class="flex items-center justify-between text-slate-400 font-mono text-[10px]">
            <span>FEEDS DOS EUA</span>
            <span class="text-emerald-400">34 ATIVOS</span>
          </div>
          <p class="text-slate-300 font-medium">NYT, WSJ, CNBC, NPR, TechCrunch, Wired, ESPN, NASA</p>
          <div class="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 w-full"></div>
          </div>
        </div>
      </div>

      <div class="text-[10px] text-slate-500 font-mono pt-4 border-t border-slate-800/80 space-y-0.5">
        <p>Host: http://localhost:3001</p>
        <p>Public: /</p>
        <p>DB: data/portal-db.json</p>
      </div>
    </aside>

    <!-- MAIN VIEW AREA -->
    <main class="flex-1 overflow-y-auto p-3 sm:p-8 space-y-4 sm:space-y-6">

      <!-- TOAST MESSAGE CONTAINER -->
      <div id="toast-box" class="hidden fixed bottom-6 right-6 z-50 bg-slate-900 text-white border border-slate-700 px-5 py-3.5 rounded-xl shadow-2xl flex items-center space-x-3 text-xs">
        <i class="fa-solid fa-circle-check text-emerald-400 text-base" id="toast-icon"></i>
        <span id="toast-text">Notificação do sistema</span>
      </div>

      <!-- VIEW 1: DASHBOARD -->
      <section id="view-dashboard" class="space-y-6">
        <!-- 30-Day Hero Banner Card -->
        <div class="bg-gradient-to-r from-[#101e38] via-[#0e2748] to-[#121c2e] border border-cyan-800/50 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-0.5 rounded-full">
              <i class="fa-solid fa-bolt text-cyan-400"></i> NOVO MOTOR DE INGESTÃO AUTOMÁTICA
            </div>
            <h2 class="font-serif text-2xl sm:text-3xl font-black text-white">
              Puxe todas as notícias postadas no último mês dos Estados Unidos
            </h2>
            <p class="text-xs text-slate-300 leading-relaxed">
              O motor varre e importa matérias completas de até 30 dias atrás diretamente do <strong>The New York Times</strong>, <strong>The Wall Street Journal</strong>, <strong>CNBC</strong>, <strong>NPR</strong>, <strong>TechCrunch</strong>, <strong>Wired</strong> e <strong>ESPN</strong>, alimentando as 14 categorias automaticamente com deduplicação.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button onclick="triggerMonthHarvest(30)" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer whitespace-nowrap">
              <i class="fa-solid fa-download"></i> Puxar 30 Dias Agora
            </button>
            <button onclick="switchTab('harvester')" class="border border-slate-700 hover:bg-slate-800/60 text-slate-300 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition">
              Configurar Feeds
            </button>
          </div>
        </div>

        <!-- 4 Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm space-y-1">
            <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Total de Artigos no Banco</span>
            <div class="flex items-center justify-between">
              <span id="metric-art-count" class="font-serif text-3xl font-black text-white">0</span>
              <i class="fa-solid fa-newspaper text-indigo-500/20 text-3xl"></i>
            </div>
            <p class="text-[11px] text-emerald-400 font-medium"><i class="fa-solid fa-check"></i> 14 Categorias Cobertas</p>
          </div>

          <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm space-y-1">
            <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Leituras Acumuladas</span>
            <div class="flex items-center justify-between">
              <span id="metric-views-count" class="font-serif text-3xl font-black text-white">0</span>
              <i class="fa-solid fa-eye text-cyan-500/20 text-3xl"></i>
            </div>
            <p class="text-[11px] text-cyan-400 font-medium"><i class="fa-solid fa-arrow-trend-up"></i> Tráfego Orgânico Americano</p>
          </div>

          <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm space-y-1">
            <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Slots de Anúncios Ativos</span>
            <div class="flex items-center justify-between">
              <span id="metric-ads-count" class="font-serif text-3xl font-black text-white">5 / 5</span>
              <i class="fa-solid fa-dollar-sign text-emerald-500/20 text-3xl"></i>
            </div>
            <p class="text-[11px] text-emerald-400 font-medium"><i class="fa-solid fa-circle-check"></i> AdSense & Programático</p>
          </div>

          <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-sm space-y-1">
            <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Assinantes Newsletter</span>
            <div class="flex items-center justify-between">
              <span id="metric-subs-count" class="font-serif text-3xl font-black text-white">0</span>
              <i class="fa-solid fa-users text-amber-500/20 text-3xl"></i>
            </div>
            <p class="text-[11px] text-amber-400 font-medium"><i class="fa-solid fa-envelope"></i> Morning Dispatch 6:00 AM</p>
          </div>
        </div>

        <!-- 14 Editorial Category Distribution -->
        <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-serif text-lg font-bold text-white">Distribuição Editorial por Categoria (14 Seções)</h3>
            <span class="text-xs text-slate-400 font-mono">Status em tempo real</span>
          </div>
          <div id="category-distribution-grid" class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <!-- Populated via JS -->
          </div>
        </div>

        <!-- Recent Articles Table -->
        <div class="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div class="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 class="font-serif text-lg font-bold text-white">Últimas Reportagens Publicadas</h3>
            <button onclick="switchTab('articles')" class="text-xs font-semibold text-cyan-400 hover:underline">Ver todas as matérias →</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#0a0f1d] text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th class="py-3 px-4">Título da Notícia (US English)</th>
                  <th class="py-3 px-4">Editoria</th>
                  <th class="py-3 px-4">Fonte / Autor</th>
                  <th class="py-3 px-4">Data Publicada</th>
                  <th class="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody id="dashboard-recent-articles" class="divide-y divide-slate-800/60">
                <!-- Populated via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- VIEW 2: 30-DAY HARVESTER & WIRE ENGINE -->
      <section id="view-harvester" class="hidden space-y-6">
        <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span class="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                MOTOR DE SINDICAÇÃO OFICIAL DOS EUA
              </span>
              <h2 class="font-serif text-2xl font-black text-white mt-1">
                Central de Puxada de Notícias dos Estados Unidos
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Puxe notícias dos últimos 1 a 10 dias (ou até 30 dias). Ao puxar, as notícias mais recentes entram automaticamente no topo da página principal.
              </p>
            </div>
            <button onclick="executeHarvestFromForm()" id="btn-harvest-execute" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer">
              <i class="fa-solid fa-satellite-dish" id="harvest-exec-icon"></i>
              <span>Executar Puxada de Notícias</span>
            </button>
          </div>

          <!-- Quick 1-Click Day Buttons (1 to 10 Days) -->
          <div class="bg-[#0a0f1d] p-4 rounded-xl border border-slate-800 space-y-3">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">
                <i class="fa-solid fa-bolt text-amber-400 mr-1.5"></i> Seleção Rápida de Dias (1 a 10 Dias):
              </span>
              <span class="text-[11px] text-slate-400 font-mono">Clique para escolher o dia desejado:</span>
            </div>
            <div class="flex flex-wrap gap-1.5" id="harvest-quick-days-pills">
              <button type="button" onclick="setHarvestDay(1)" data-day="1" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">1 Dia (24h)</button>
              <button type="button" onclick="setHarvestDay(2)" data-day="2" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">2 Dias</button>
              <button type="button" onclick="setHarvestDay(3)" data-day="3" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">3 Dias</button>
              <button type="button" onclick="setHarvestDay(4)" data-day="4" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">4 Dias</button>
              <button type="button" onclick="setHarvestDay(5)" data-day="5" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">5 Dias</button>
              <button type="button" onclick="setHarvestDay(6)" data-day="6" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">6 Dias</button>
              <button type="button" onclick="setHarvestDay(7)" data-day="7" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">7 Dias (1 Sem)</button>
              <button type="button" onclick="setHarvestDay(8)" data-day="8" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">8 Dias</button>
              <button type="button" onclick="setHarvestDay(9)" data-day="9" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">9 Dias</button>
              <button type="button" onclick="setHarvestDay(10)" data-day="10" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white border border-emerald-400">10 Dias</button>
              <button type="button" onclick="setHarvestDay(15)" data-day="15" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">15 Dias</button>
              <button type="button" onclick="setHarvestDay(30)" data-day="30" class="harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700">30 Dias (Mês)</button>
            </div>
          </div>

          <!-- Controls: Date Range, Filter Mode & Max Articles -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0a0f1d] p-5 rounded-xl border border-slate-800 text-xs">
            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                <i class="fa-regular fa-calendar text-emerald-400 mr-1"></i> Período / Dia Selecionado:
              </label>
              <select id="harvest-days-select" onchange="syncHarvestDayPills(this.value)" class="w-full bg-[#131d33] border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-cyan-500 text-xs">
                <option value="1">1 Dia (Últimas 24 Horas / Plantão Imediato)</option>
                <option value="2">2 Dias (Hoje e Ontem)</option>
                <option value="3">3 Dias</option>
                <option value="4">4 Dias</option>
                <option value="5">5 Dias</option>
                <option value="6">6 Dias</option>
                <option value="7">7 Dias (Última Semana)</option>
                <option value="8">8 Dias</option>
                <option value="9">9 Dias</option>
                <option value="10" selected>10 Dias (Padrão Recomendado)</option>
                <option value="15">Últimos 15 Dias</option>
                <option value="30">Último Mês Completo (30 Dias)</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                <i class="fa-solid fa-filter text-indigo-400 mr-1"></i> Modo de Filtro de Data:
              </label>
              <div class="space-y-1.5 pt-1">
                <label class="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input type="radio" name="harvest-mode" id="harvest-mode-range" value="range" checked class="accent-emerald-500">
                  <span><strong>Período Acumulado</strong> (dos últimos N dias)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input type="radio" name="harvest-mode" id="harvest-mode-exact" value="exact" class="accent-emerald-500">
                  <span><strong>Dia Específico</strong> (somente do dia selecionado)</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                <i class="fa-solid fa-layer-group text-cyan-400 mr-1"></i> Limite por Feed:
              </label>
              <select id="harvest-limit-select" class="w-full bg-[#131d33] border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-cyan-500 text-xs">
                <option value="35" selected>35 matérias por canal (Recomendado ~300+ matérias)</option>
                <option value="20">20 matérias por canal (Equilibrado)</option>
                <option value="10">10 matérias por canal (Rápido)</option>
                <option value="50">50 matérias por canal (Extensivo)</option>
              </select>
            </div>
          </div>

          <!-- Feed Selection Checklist -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-sm text-white">Selecione os Feeds dos EUA (<span id="selected-feeds-count">34</span> de 34)</h4>
              <button onclick="toggleAllFeedsSelection()" class="text-xs text-cyan-400 hover:underline">Alternar Todos</button>
            </div>
            <div id="feeds-checkbox-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <!-- Populated via JS -->
            </div>
          </div>

          <!-- Harvest Live Progress & Results -->
          <div id="harvest-results-box" class="hidden border border-slate-800 rounded-xl p-5 bg-[#0a0f1d] space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i>
                <h4 class="font-bold text-sm text-white" id="harvest-result-title">Sincronização concluída!</h4>
              </div>
              <span class="text-xs font-mono text-slate-400" id="harvest-result-timestamp"></span>
            </div>
            <div class="overflow-x-auto border border-slate-800 rounded-lg">
              <table class="w-full text-left text-xs">
                <thead class="bg-[#070b14] text-slate-400 font-mono text-[10px] uppercase">
                  <tr>
                    <th class="py-2.5 px-3">Título Importado</th>
                    <th class="py-2.5 px-3">Editoria</th>
                    <th class="py-2.5 px-3">Fonte Oficial</th>
                    <th class="py-2.5 px-3 text-right">Ver no Portal</th>
                  </tr>
                </thead>
                <tbody id="harvest-results-table-body" class="divide-y divide-slate-800/60"></tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- VIEW 3: ARTICLES MANAGEMENT -->
      <section id="view-articles" class="hidden space-y-6">
        <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex-1 w-full flex items-center space-x-3">
              <div class="relative flex-1">
                <i class="fa-solid fa-magnifying-glass text-slate-500 absolute left-3 top-3 text-xs"></i>
                <input type="text" id="article-search-input" oninput="filterArticlesTable()" placeholder="Buscar matéria por título, tema, fonte..." class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg pl-8 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-500">
              </div>
              <select id="article-category-filter" onchange="filterArticlesTable()" class="bg-[#0a0f1d] border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none">
                <option value="">Todas as 14 Editorias</option>
                <option value="breaking-news">Breaking News</option>
                <option value="us-news">U.S. News</option>
                <option value="politics">Politics</option>
                <option value="business">Business</option>
                <option value="finance">Finance</option>
                <option value="technology">Technology</option>
                <option value="artificial-intelligence">Artificial Intelligence</option>
                <option value="world-news">World News</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="science">Science</option>
                <option value="travel">Travel</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <button onclick="switchTab('new-article')" class="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg flex items-center gap-1.5 shrink-0">
              <i class="fa-solid fa-plus"></i> Redigir Matéria
            </button>
          </div>

          <div class="overflow-x-auto border border-slate-800 rounded-lg">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#0a0f1d] text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th class="py-3 px-4">Título da Matéria (US English)</th>
                  <th class="py-3 px-4">Editoria</th>
                  <th class="py-3 px-4">Autor / Veículo</th>
                  <th class="py-3 px-4">Destaque</th>
                  <th class="py-3 px-4">Leituras</th>
                  <th class="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody id="articles-full-table-body" class="divide-y divide-slate-800/60"></tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- VIEW 4: NEW ARTICLE FORM -->
      <section id="view-new-article" class="hidden space-y-6">
        <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div class="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 class="font-serif text-2xl font-bold text-white">Redigir Matéria Jornalística</h2>
              <p class="text-xs text-slate-400">Todo o texto público deve ser escrito em inglês americano (US English).</p>
            </div>
            <button onclick="switchTab('articles')" class="text-xs text-slate-400 hover:text-white">← Voltar à lista</button>
          </div>

          <form onsubmit="handleCreateArticleSubmit(event)" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Headline / Título (US English) *</label>
              <input type="text" id="form-art-title" required class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:outline-none focus:border-cyan-500 font-serif" placeholder="Federal Reserve Outlines Measured Inflation Pathway...">
            </div>

            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Subtítulo / Deck Jornalístico (US English) *</label>
              <textarea id="form-art-subtitle" rows="2" required class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-cyan-500" placeholder="Policymakers emphasize labor market durability and cooling service sectors..."></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Editoria (14 Opções) *</label>
                <select id="form-art-category" class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none">
                  <option value="breaking-news">Breaking News</option>
                  <option value="us-news">U.S. News</option>
                  <option value="politics">Politics</option>
                  <option value="business">Business</option>
                  <option value="finance">Finance</option>
                  <option value="technology">Technology</option>
                  <option value="artificial-intelligence">Artificial Intelligence</option>
                  <option value="world-news">World News</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="health">Health</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="science">Science</option>
                  <option value="travel">Travel</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">URL da Imagem de Destaque</label>
                <input type="text" id="form-art-image" class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-2.5" placeholder="https://images.unsplash.com/...">
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Corpo da Notícia (HTML: &lt;p&gt;, &lt;h2&gt;, &lt;blockquote&gt;) *</label>
              <textarea id="form-art-content" rows="8" required class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-3 font-mono text-xs focus:outline-none focus:border-cyan-500"></textarea>
            </div>

            <div class="flex items-center space-x-6 bg-[#0a0f1d] p-4 rounded-lg border border-slate-800">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" id="form-art-is-hero" class="w-4 h-4 text-cyan-500 rounded">
                <span class="font-bold text-slate-300">Manchete Hero Principal</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" id="form-art-is-breaking" class="w-4 h-4 text-rose-500 rounded">
                <span class="font-bold text-slate-300">Breaking News</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" id="form-art-is-trending" class="w-4 h-4 text-amber-500 rounded" checked>
                <span class="font-bold text-slate-300">Notícia em Alta (Trending)</span>
              </label>
            </div>

            <div class="flex justify-end pt-2">
              <button type="submit" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-xl shadow-lg transition">
                Publicar Matéria no Portal Público
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- VIEW 5: MONETIZATION & ADS -->
      <section id="view-ads" class="hidden space-y-6">
        <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <div class="border-b border-slate-800 pb-4">
            <h2 class="font-serif text-2xl font-bold text-white">Monetização, Google AdSense & Banners nos Cantos</h2>
            <p class="text-xs text-slate-400 mt-1">Configure os 8 espaços de anúncios do portal (início da página, cantos das notícias, barra lateral e artigos). Insira código HTML do Google AdSense com prévia ao vivo em tempo real.</p>
          </div>

          <div id="ads-slots-list" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Populated via JS -->
          </div>
        </div>
      </section>

      <!-- VIEW 6: NEWSLETTER SUBSCRIBERS -->
      <section id="view-subscribers" class="hidden space-y-6">
        <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 class="font-serif text-2xl font-bold text-white">Assinantes da Newsletter</h2>
              <p class="text-xs text-slate-400">Leitores cadastrados para receber o Morning Dispatch diário.</p>
            </div>
            <a href="/api/subscribers/export" download class="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg flex items-center gap-2">
              <i class="fa-solid fa-file-csv"></i> Exportar CSV
            </a>
          </div>

          <div class="overflow-x-auto border border-slate-800 rounded-lg">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#0a0f1d] text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th class="py-3 px-4">E-mail Cadastrado</th>
                  <th class="py-3 px-4">Edição Escolhida</th>
                  <th class="py-3 px-4">Data de Cadastro</th>
                  <th class="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody id="subscribers-table-body" class="divide-y divide-slate-800/60"></tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- VIEW 7: SETTINGS & ADS.TXT -->
      <section id="view-settings" class="hidden space-y-6">
        <div class="bg-[#0f172a] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div class="border-b border-slate-800 pb-4">
            <h2 class="font-serif text-2xl font-bold text-white">Configurações Gerais, SEO & ads.txt</h2>
            <p class="text-xs text-slate-400 mt-1">Configuração do Publisher ID do Google AdSense, meta tags e faixa de Breaking News.</p>
          </div>

          <form onsubmit="handleSaveSettingsSubmit(event)" class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Nome Oficial da Publicação</label>
                <input type="text" id="setting-site-name" class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-2.5">
              </div>

              <div>
                <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Tagline Institucional</label>
                <input type="text" id="setting-tagline" class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-2.5">
              </div>

              <div>
                <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Google AdSense Publisher ID</label>
                <input type="text" id="setting-adsense-id" class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-2.5" placeholder="ca-pub-9842104820194821">
              </div>

              <div>
                <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Google Search Console Verification</label>
                <input type="text" id="setting-gsc-tag" class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-2.5">
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Texto da Faixa de Notícia Urgente (Breaking News Ticker)</label>
              <input type="text" id="setting-breaking-alert" class="w-full bg-[#0a0f1d] border border-slate-700 text-white rounded-lg p-2.5">
            </div>

            <div>
              <label class="block font-bold text-slate-300 uppercase tracking-wider mb-1">Conteúdo do Arquivo ads.txt (Padrão IAB para Anúncios Programáticos)</label>
              <textarea id="setting-ads-txt" rows="5" class="w-full bg-[#0a0f1d] border border-slate-700 text-slate-300 font-mono text-xs rounded-lg p-3"></textarea>
            </div>

            <div class="flex justify-end pt-2">
              <button type="submit" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg transition">
                Salvar Configurações
              </button>
            </div>
          </form>
        </div>
      </section>

    </main>
  </div>

  <!-- MODAL: EDITOR DE ANÚNCIO COM CÓDIGO HTML E PRÉVIA EM TEMPO REAL -->
  <div id="ad-editor-modal" style="display: none;" class="fixed inset-0 bg-black/85 backdrop-blur-xs z-50 items-center justify-center p-4">
    <div class="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded font-bold" id="ad-modal-pos-badge">POSIÇÃO</span>
            <span class="text-xs text-slate-400 font-mono" id="ad-modal-dim">728x90</span>
          </div>
          <h3 class="font-serif text-xl font-bold text-white mt-1" id="ad-modal-title">Editar Anúncio & Inserir Código HTML</h3>
        </div>
        <button onclick="closeAdEditorModal()" class="text-slate-400 hover:text-white text-lg p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <input type="hidden" id="ad-edit-id">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-mono text-slate-400 uppercase mb-1">Nome do Espaço</label>
          <input type="text" id="ad-edit-name" class="w-full bg-[#0a0f1d] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white">
        </div>
        <div>
          <label class="block text-xs font-mono text-slate-400 uppercase mb-1">Tipo de Anúncio</label>
          <select id="ad-edit-type" onchange="toggleAdTypeInputs()" class="w-full bg-[#0a0f1d] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white">
            <option value="html">Código HTML / Google AdSense / Script Tag</option>
            <option value="custom">Banner Patrocinado Gráfico (Imagem + Link)</option>
          </select>
        </div>
      </div>

      <!-- SEÇÃO 1: CÓDIGO HTML / ADSENSE -->
      <div id="ad-section-html" class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="block text-xs font-mono text-cyan-400 font-bold uppercase">
            <i class="fa-solid fa-code mr-1"></i> Código HTML do Anúncio / Google AdSense:
          </label>
          <div class="flex gap-2">
            <button type="button" onclick="insertAdTemplate('adsense')" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono px-2.5 py-1 rounded transition border border-slate-700">
              ⚡ Modelo AdSense
            </button>
            <button type="button" onclick="insertAdTemplate('banner')" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono px-2.5 py-1 rounded transition border border-slate-700">
              ⚡ Modelo Banner HTML
            </button>
            <button type="button" onclick="insertAdTemplate('skyscraper')" class="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono px-2.5 py-1 rounded transition border border-slate-700">
              ⚡ Modelo Canto (160x600)
            </button>
          </div>
        </div>
        <textarea id="ad-edit-html" rows="7" oninput="updateAdLivePreview()" placeholder="<!-- Cole aqui seu código do Google AdSense, scripts de anúncio, iframe ou código HTML personalizado -->" class="w-full bg-[#070b14] border border-slate-700 rounded-xl p-3 font-mono text-xs text-emerald-400 focus:outline-none focus:border-cyan-500"></textarea>
        <p class="text-[11px] text-slate-400">
          Você pode colar tags completas do <strong>Google AdSense</strong> (<code>&lt;ins class=&quot;adsbygoogle&quot;&gt;&lt;/ins&gt;</code>), <strong>Google Ad Manager</strong>, redes de afiliados ou banners HTML personalizados com CSS e links.
        </p>
      </div>

      <!-- SEÇÃO 2: BANNER GRÁFICO (CUSTOM) -->
      <div id="ad-section-custom" class="hidden space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-mono text-slate-400 uppercase mb-1">URL da Imagem do Banner</label>
            <input type="text" id="ad-edit-img" oninput="updateAdLivePreview()" placeholder="https://..." class="w-full bg-[#0a0f1d] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white">
          </div>
          <div>
            <label class="block text-xs font-mono text-slate-400 uppercase mb-1">Link de Destino ao Clicar</label>
            <input type="text" id="ad-edit-link" oninput="updateAdLivePreview()" placeholder="https://exemplo.com ou /advertise" class="w-full bg-[#0a0f1d] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white">
          </div>
          <div>
            <label class="block text-xs font-mono text-slate-400 uppercase mb-1">Nome do Patrocinador</label>
            <input type="text" id="ad-edit-sponsor" oninput="updateAdLivePreview()" placeholder="Ex: Vanguard Global Advisory" class="w-full bg-[#0a0f1d] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white">
          </div>
          <div>
            <label class="block text-xs font-mono text-slate-400 uppercase mb-1">Título do Anúncio (Alt Text)</label>
            <input type="text" id="ad-edit-alt" oninput="updateAdLivePreview()" placeholder="Ex: Gestão Patrimonial Institucional" class="w-full bg-[#0a0f1d] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white">
          </div>
        </div>
      </div>

      <!-- PRÉVIA EM TEMPO REAL (LIVE PREVIEW) -->
      <div class="space-y-2 pt-2 border-t border-slate-800">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase">
            <i class="fa-solid fa-eye"></i> Prévia em Tempo Real (Como o anúncio será renderizado no portal):
          </span>
          <span class="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Atualiza ao Digitar</span>
        </div>

        <div class="bg-white text-neutral-900 border-2 border-dashed border-amber-500/60 rounded-xl p-4 overflow-hidden">
          <div class="text-[9px] uppercase font-bold text-neutral-400 tracking-wider mb-2 flex items-center justify-between border-b border-neutral-200 pb-1">
            <span>ADVERTISEMENT • SPONSORED PARTNER</span>
            <span class="font-mono text-neutral-500" id="ad-preview-dim-label">728x90</span>
          </div>
          <div id="ad-live-preview-box" class="flex items-center justify-center min-h-[90px] w-full overflow-hidden bg-neutral-50 rounded">
            <!-- Conteúdo da prévia renderizado dinamicamente -->
          </div>
        </div>
      </div>

      <!-- FOOTER ACTIONS -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <label class="flex items-center gap-2 text-xs cursor-pointer">
          <input type="checkbox" id="ad-edit-enabled" class="w-4 h-4 text-emerald-500 rounded">
          <span class="font-bold text-slate-200">Ativar este espaço imediatamente no site</span>
        </label>

        <div class="flex gap-3">
          <button type="button" onclick="closeAdEditorModal()" class="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition">
            Cancelar
          </button>
          <button type="button" onclick="saveAdSlotChanges()" class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold uppercase tracking-wider hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/40 transition">
            <i class="fa-solid fa-check mr-1.5"></i> Salvar e Publicar Anúncio
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- JAVASCRIPT LOGIC & STATE ENGINE -->
  <script>
    let appArticles = [];
    let appFeeds = [];
    let appAds = [];
    let appSettings = {};
    let selectedFeedIds = [];

    function showToast(msg, isSuccess = true) {
      const box = document.getElementById('toast-box');
      const text = document.getElementById('toast-text');
      const icon = document.getElementById('toast-icon');
      text.innerText = msg;
      icon.className = isSuccess ? 'fa-solid fa-circle-check text-emerald-400 text-base' : 'fa-solid fa-circle-exclamation text-rose-400 text-base';
      box.classList.remove('hidden');
      setTimeout(() => box.classList.add('hidden'), 4500);
    }

    function switchTab(tab) {
      const views = ['dashboard', 'harvester', 'articles', 'new-article', 'ads', 'subscribers', 'settings'];
      views.forEach(v => {
        const el = document.getElementById('view-' + v);
        const nav = document.getElementById('nav-' + v);
        const mnav = document.getElementById('mnav-' + v);
        if (el) el.classList.toggle('hidden', v !== tab);
        if (nav) {
          if (v === tab) {
            nav.className = 'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition bg-cyan-950/60 text-cyan-300 border border-cyan-800/50';
          } else {
            nav.className = 'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition text-slate-300 hover:bg-slate-800/60';
          }
        }
        if (mnav) {
          if (v === tab) {
            mnav.className = 'shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 flex items-center gap-1.5';
          } else {
            mnav.className = 'shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 flex items-center gap-1.5';
          }
        }
      });
    }

    async function loadData() {
      try {
        const [statusRes, artRes, feedsRes, adsRes, subsRes, setRes] = await Promise.all([
          fetch('/api/status').then(r => r.json()),
          fetch('/api/articles').then(r => r.json()),
          fetch('/api/feeds').then(r => r.json()),
          fetch('/api/ads').then(r => r.json()),
          fetch('/api/subscribers').then(r => r.json()),
          fetch('/api/settings').then(r => r.json()),
        ]);

        appArticles = artRes;
        appFeeds = feedsRes;
        appAds = adsRes;
        appSettings = setRes;
        selectedFeedIds = appFeeds.map(f => f.id);

        renderMetrics(statusRes, artRes, subsRes);
        renderFeedsChecklist();
        renderArticlesTable(appArticles);
        renderAdsList(appAds);
        renderSubscribers(subsRes);
        renderSettings(setRes);
      } catch (err) {
        console.error('Error loading admin data:', err);
      }
    }

    function renderMetrics(status, articles, subs) {
      document.getElementById('metric-art-count').innerText = articles.length;
      document.getElementById('sidebar-art-count').innerText = articles.length;
      const totalViews = articles.reduce((acc, a) => acc + (a.viewsCount || 0), 0);
      document.getElementById('metric-views-count').innerText = totalViews.toLocaleString();
      document.getElementById('metric-subs-count').innerText = subs.length;

      // 14 categories distribution
      const categories = [
        'breaking-news', 'us-news', 'politics', 'business', 'finance', 'technology',
        'artificial-intelligence', 'world-news', 'entertainment', 'health', 'lifestyle',
        'science', 'travel', 'sports'
      ];

      const catGrid = document.getElementById('category-distribution-grid');
      catGrid.innerHTML = categories.map(cat => {
        const count = articles.filter(a => a.category === cat).length;
        const displayName = cat.replace(/-/g, ' ').toUpperCase();
        return \`
          <div class="bg-[#0a0f1d] border border-slate-800/80 rounded-lg p-2.5 text-center">
            <span class="text-[9px] font-mono font-bold text-slate-400 block truncate">\${displayName}</span>
            <span class="font-serif text-lg font-bold text-white">\${count}</span>
            <span class="text-[9px] text-slate-500 block">matérias</span>
          </div>
        \`;
      }).join('');

      // Recent 6 articles
      const recentBody = document.getElementById('dashboard-recent-articles');
      recentBody.innerHTML = articles.slice(0, 6).map(a => \`
        <tr class="hover:bg-slate-800/30">
          <td class="py-2.5 px-4 font-serif font-bold text-slate-100 max-w-sm">
            <div class="flex items-center gap-2.5">
              <a href="/news/\${a.slug}" target="_blank" class="block shrink-0" title="Ver matéria no portal">
                <img src="\${a.imageUrl}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=300&q=80'" class="w-10 h-7 rounded object-cover shrink-0 border border-slate-700 bg-slate-800 hover:opacity-80 transition cursor-pointer" />
              </a>
              <span class="truncate block">\${a.title}</span>
            </div>
          </td>
          <td class="py-2.5 px-4"><span class="bg-slate-800 text-slate-300 font-mono text-[9px] uppercase px-1.5 py-0.5 rounded">\${a.category}</span></td>
          <td class="py-2.5 px-4 text-slate-400">\${a.author?.name || 'Staff'}</td>
          <td class="py-2.5 px-4 text-slate-500 font-mono text-[10px]">\${new Date(a.publishedAt).toLocaleDateString('pt-BR')}</td>
          <td class="py-2.5 px-4 text-right">
            <a href="/news/\${a.slug}" target="_blank" class="text-cyan-400 hover:underline font-bold">Ver ↗</a>
          </td>
        </tr>
      \`).join('');
    }

    function renderFeedsChecklist() {
      const container = document.getElementById('feeds-checkbox-grid');
      container.innerHTML = appFeeds.map(f => {
        const isChecked = selectedFeedIds.includes(f.id);
        return \`
          <div onclick="toggleFeedItem('\${f.id}')" class="cursor-pointer border rounded-lg p-3 transition flex items-start gap-2.5 \${isChecked ? 'border-emerald-600/70 bg-emerald-950/20' : 'border-slate-800 bg-[#0a0f1d] opacity-50'}">
            <input type="checkbox" \${isChecked ? 'checked' : ''} class="w-3.5 h-3.5 text-emerald-500 rounded mt-0.5">
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between gap-1">
                <span class="font-bold text-slate-200 text-xs truncate">\${f.name}</span>
                <span class="text-[8px] font-mono uppercase bg-slate-800 text-slate-300 px-1 py-0.2 rounded">\${f.category}</span>
              </div>
              <span class="text-[10px] text-slate-400 truncate block">\${f.outlet}</span>
            </div>
          </div>
        \`;
      }).join('');
      document.getElementById('selected-feeds-count').innerText = selectedFeedIds.length;
    }

    function toggleFeedItem(id) {
      if (selectedFeedIds.includes(id)) {
        selectedFeedIds = selectedFeedIds.filter(i => i !== id);
      } else {
        selectedFeedIds.push(id);
      }
      renderFeedsChecklist();
    }

    function toggleAllFeedsSelection() {
      if (selectedFeedIds.length === appFeeds.length) {
        selectedFeedIds = [];
      } else {
        selectedFeedIds = appFeeds.map(f => f.id);
      }
      renderFeedsChecklist();
    }

    // News Harvester Helpers & Handlers
    function setHarvestDay(val) {
      const select = document.getElementById('harvest-days-select');
      if (select) {
        select.value = String(val);
      }
      syncHarvestDayPills(val);
    }

    function syncHarvestDayPills(val) {
      const strVal = String(val);
      document.querySelectorAll('.harvest-day-btn').forEach(btn => {
        if (btn.dataset.day === strVal) {
          btn.className = 'harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white border border-emerald-400 shadow';
        } else {
          btn.className = 'harvest-day-btn px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700';
        }
      });
    }

    async function triggerQuickHarvest() {
      const select = document.getElementById('top-harvest-days');
      const days = parseInt(select ? select.value : '10', 10);
      await triggerMonthHarvest(days);
    }

    // 1-10 Day News Harvester Trigger
    async function triggerMonthHarvest(days = 10) {
      const btn = document.getElementById('btn-quick-sync');
      const icon = document.getElementById('quick-sync-icon');
      if (btn) btn.disabled = true;
      if (icon) icon.className = 'fa-solid fa-spinner animate-spin';

      showToast(\`Iniciando puxada de notícias dos últimos \${days} dias nos EUA...\`);

      try {
        const res = await fetch('/api/sync-month', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ days, maxPerFeed: 35, selectedFeedIds })
        });
        const data = await res.json();
        if (data.success) {
          showToast(data.message);
          renderHarvestResults(data);
          await loadData();
        } else {
          showToast('Erro ao sincronizar notícias.', false);
        }
      } catch (e) {
        showToast('Falha na conexão com os servidores dos EUA.', false);
      } finally {
        if (btn) btn.disabled = false;
        if (icon) icon.className = 'fa-solid fa-satellite-dish';
      }
    }

    async function executeHarvestFromForm() {
      const days = parseInt(document.getElementById('harvest-days-select').value, 10);
      const isExactDay = document.getElementById('harvest-mode-exact')?.checked;
      const maxPerFeed = parseInt(document.getElementById('harvest-limit-select').value, 10);
      const btn = document.getElementById('btn-harvest-execute');
      const icon = document.getElementById('harvest-exec-icon');

      btn.disabled = true;
      icon.className = 'fa-solid fa-spinner animate-spin';

      const payload = {
        days: isExactDay ? undefined : days,
        exactDay: isExactDay ? days : undefined,
        maxPerFeed,
        selectedFeedIds
      };

      const modeText = isExactDay
        ? \`do dia \${days} atrás\`
        : \`dos últimos \${days} dias\`;

      showToast(\`Puxando notícias dos EUA (\${modeText}) com limite de \${maxPerFeed}/canal...\`);

      try {
        const res = await fetch('/api/sync-month', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast(data.message);
          renderHarvestResults(data);
          await loadData();
        } else {
          showToast('Erro ao colher feeds: ' + (data.error || ''), false);
        }
      } catch (e) {
        showToast('Falha de rede.', false);
      } finally {
        btn.disabled = false;
        icon.className = 'fa-solid fa-satellite-dish';
      }
    }

    function renderHarvestResults(data) {
      const box = document.getElementById('harvest-results-box');
      const title = document.getElementById('harvest-result-title');
      const ts = document.getElementById('harvest-result-timestamp');
      const tbody = document.getElementById('harvest-results-table-body');

      const periodDesc = data.exactDay
        ? \`do dia \${data.exactDay} atrás\`
        : \`dos últimos \${data.daysHarvested} dias\`;

      title.innerText = \`Puxada Concluída: \${data.totalSaved} notícias adicionadas (\${periodDesc})! As mais recentes já lideram a página principal.\`;
      ts.innerText = new Date().toLocaleTimeString('pt-BR');

      tbody.innerHTML = (data.articles || []).map(a => \`
        <tr class="hover:bg-slate-800/30">
          <td class="py-2.5 px-3 font-serif font-bold text-slate-100 max-w-md truncate">
            <a href="/news/\${encodeURIComponent(a.slug)}" target="_blank" class="hover:text-cyan-400 transition">\${a.title}</a>
          </td>
          <td class="py-2.5 px-3"><span class="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[9px] uppercase font-mono">\${a.category}</span></td>
          <td class="py-2.5 px-3 text-slate-400">\${a.author?.role || 'Wire Desk'}</td>
          <td class="py-2.5 px-3 text-right">
            <a href="/news/\${encodeURIComponent(a.slug)}" target="_blank" class="text-cyan-400 hover:underline font-bold inline-flex items-center gap-1">Ver no Portal <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></a>
          </td>
        </tr>
      \`).join('');

      box.classList.remove('hidden');
    }

    function renderArticlesTable(articles) {
      const tbody = document.getElementById('articles-full-table-body');
      tbody.innerHTML = articles.map(a => \`
        <tr class="hover:bg-slate-800/30">
          <td class="py-3 px-4 font-serif font-bold text-slate-100 max-w-md">
            <div class="flex items-center gap-3">
              <a href="/news/\${a.slug}" target="_blank" class="block shrink-0" title="Ver matéria no portal">
                <img src="\${a.imageUrl}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=300&q=80'" class="w-12 h-9 rounded object-cover shrink-0 border border-slate-700 bg-slate-800 hover:opacity-80 transition cursor-pointer" />
              </a>
              <div class="min-w-0">
                <a href="/news/\${a.slug}" target="_blank" class="hover:text-cyan-400 transition block truncate">\${a.title}</a>
                <span class="text-[10px] font-mono text-slate-500">/\${a.slug}</span>
              </div>
            </div>
          </td>
          <td class="py-3 px-4"><span class="bg-slate-800 text-slate-300 font-mono text-[9px] uppercase px-2 py-0.5 rounded">\${a.category}</span></td>
          <td class="py-3 px-4 text-slate-400">\${a.author?.name || 'Staff'}</td>
          <td class="py-3 px-4">
            \${a.isFeaturedLead ? '<span class="bg-red-950 text-red-400 border border-red-800 text-[9px] font-bold px-1.5 py-0.5 rounded">HERO</span>' : ''}
            \${a.isBreaking ? '<span class="bg-rose-950 text-rose-400 border border-rose-800 text-[9px] font-bold px-1.5 py-0.5 rounded">BREAKING</span>' : ''}
            \${a.isTrending ? '<span class="bg-amber-950 text-amber-400 border border-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded">TRENDING</span>' : ''}
          </td>
          <td class="py-3 px-4 font-mono text-slate-400">\${(a.viewsCount || 0).toLocaleString()}</td>
          <td class="py-3 px-4 text-right space-x-2">
            <a href="/news/\${a.slug}" target="_blank" class="text-cyan-400 hover:text-cyan-300 p-1" title="Visualizar Matéria"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            <button onclick="deleteArticle('\${a.id}')" class="text-rose-400 hover:text-rose-300 p-1" title="Excluir"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      \`).join('');
    }

    function filterArticlesTable() {
      const q = document.getElementById('article-search-input').value.toLowerCase();
      const cat = document.getElementById('article-category-filter').value;
      const filtered = appArticles.filter(a => {
        const matchesQ = !q || a.title.toLowerCase().includes(q) || a.subtitle?.toLowerCase().includes(q);
        const matchesCat = !cat || a.category === cat;
        return matchesQ && matchesCat;
      });
      renderArticlesTable(filtered);
    }

    async function deleteArticle(id) {
      if (!confirm('Deseja realmente excluir este artigo?')) return;
      try {
        const res = await fetch('/api/articles/' + id, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          showToast('Artigo removido com sucesso!');
          loadData();
        }
      } catch (e) {
        showToast('Erro ao excluir artigo.', false);
      }
    }

    async function handleCreateArticleSubmit(e) {
      e.preventDefault();
      const article = {
        title: document.getElementById('form-art-title').value,
        subtitle: document.getElementById('form-art-subtitle').value,
        category: document.getElementById('form-art-category').value,
        imageUrl: document.getElementById('form-art-image').value || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1600&q=80',
        content: document.getElementById('form-art-content').value,
        isFeaturedLead: document.getElementById('form-art-is-hero').checked,
        isBreaking: document.getElementById('form-art-is-breaking').checked,
        isTrending: document.getElementById('form-art-is-trending').checked,
      };

      try {
        const res = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(article),
        });
        const data = await res.json();
        if (data.success) {
          showToast('Matéria salva e publicada com sucesso!');
          switchTab('articles');
          loadData();
        }
      } catch (e) {
        showToast('Erro ao salvar matéria.', false);
      }
    }

    function renderAdsList(ads) {
      const container = document.getElementById('ads-slots-list');
      container.innerHTML = ads.map(ad => {
        const hasHtml = Boolean(ad.htmlCode || (ad.type === 'html' || ad.type === 'adsense') && ad.adCode);
        return \`
          <div class="bg-[#0a0f1d] border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm hover:border-slate-700 transition">
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-[9px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">POSIÇÃO: \${ad.position.toUpperCase()}</span>
                  <span class="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-1.5 py-0.5 rounded">\${ad.dimension}</span>
                  \${hasHtml ? '<span class="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.5 rounded"><i class=\"fa-solid fa-code\"></i> HTML ATIVO</span>' : ''}
                </div>
                <h4 class="font-bold text-white text-sm mt-1.5">\${ad.name}</h4>
              </div>
              <button onclick="toggleAdStatus('\${ad.id}', \${!ad.enabled})" class="text-xs font-mono font-bold px-3 py-1 rounded-full shrink-0 \${ad.enabled ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'}">
                \${ad.enabled ? '● ATIVO' : '○ PAUSADO'}
              </button>
            </div>

            <div class="text-xs text-slate-400 bg-[#070b14] p-3 rounded-lg border border-slate-800/60 font-mono space-y-1">
              <div class="flex items-center justify-between">
                <span>Modo de Exibição:</span>
                <span class="text-slate-200 font-bold">\${hasHtml ? 'Código HTML / Script AdSense' : 'Banner Patrocinado de Imagem'}</span>
              </div>
              \${ad.customBanner?.sponsorName ? \`<div class="truncate">Patrocinador: <span class="text-slate-200">\${ad.customBanner.sponsorName}</span></div>\` : ''}
              \${hasHtml ? \`<div class="text-[10px] text-emerald-400 truncate">Código: \${escapeHtml((ad.htmlCode || ad.adCode || '').slice(0, 70))}...</div>\` : ''}
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="text-[10px] text-slate-500 font-mono">Renderizado no portal</span>
              <button onclick="openAdEditorModal('\${ad.id}')" class="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md transition">
                <i class="fa-solid fa-pen-to-square"></i>
                <span>Editar Código HTML & Ver Prévia</span>
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }

    function escapeHtml(str) {
      if (!str) return '';
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    let currentEditingAd = null;

    function openAdEditorModal(id) {
      const ad = appAds.find(a => a.id === id);
      if (!ad) return;
      currentEditingAd = ad;

      document.getElementById('ad-edit-id').value = ad.id;
      document.getElementById('ad-edit-name').value = ad.name || '';
      document.getElementById('ad-modal-title').innerText = 'Editar: ' + ad.name;
      document.getElementById('ad-modal-pos-badge').innerText = ad.position.toUpperCase();
      document.getElementById('ad-modal-dim').innerText = ad.dimension;
      document.getElementById('ad-preview-dim-label').innerText = ad.dimension;
      document.getElementById('ad-edit-enabled').checked = Boolean(ad.enabled);

      const hasHtml = Boolean(ad.htmlCode || (ad.type === 'html' || ad.type === 'adsense') && ad.adCode);
      const adType = (hasHtml || ad.type === 'html' || ad.type === 'adsense') ? 'html' : 'custom';
      document.getElementById('ad-edit-type').value = adType;

      document.getElementById('ad-edit-html').value = ad.htmlCode || ad.adCode || '';
      document.getElementById('ad-edit-img').value = ad.customBanner?.imageUrl || '';
      document.getElementById('ad-edit-link').value = ad.customBanner?.targetUrl || '';
      document.getElementById('ad-edit-sponsor').value = ad.customBanner?.sponsorName || '';
      document.getElementById('ad-edit-alt').value = ad.customBanner?.altText || '';

      toggleAdTypeInputs();
      updateAdLivePreview();

      const modal = document.getElementById('ad-editor-modal');
      modal.style.display = 'flex';
    }

    function closeAdEditorModal() {
      const modal = document.getElementById('ad-editor-modal');
      modal.style.display = 'none';
      currentEditingAd = null;
    }

    function toggleAdTypeInputs() {
      const type = document.getElementById('ad-edit-type').value;
      const htmlSec = document.getElementById('ad-section-html');
      const customSec = document.getElementById('ad-section-custom');
      if (type === 'html') {
        htmlSec.classList.remove('hidden');
        customSec.classList.add('hidden');
      } else {
        htmlSec.classList.add('hidden');
        customSec.classList.remove('hidden');
      }
      updateAdLivePreview();
    }

    function insertAdTemplate(type) {
      const textarea = document.getElementById('ad-edit-html');
      if (type === 'adsense') {
        const sTag = '<' + 'script';
        const eTag = '<' + '/script>';
        textarea.value = '<!-- Google AdSense - Responsive Ad Unit -->\\n' +
          sTag + ' async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9842104820194821" crossorigin="anonymous">' + eTag + '\\n' +
          '<ins class="adsbygoogle"\\n' +
          '     style="display:block; text-align:center;"\\n' +
          '     data-ad-layout="in-article"\\n' +
          '     data-ad-format="fluid"\\n' +
          '     data-ad-client="ca-pub-9842104820194821"\\n' +
          '     data-ad-slot="1234567890"></ins>\\n' +
          sTag + '>\\n' +
          '     (adsbygoogle = window.adsbygoogle || []).push({});\\n' +
          eTag + '\\n' +
          '<div style="background: linear-gradient(135deg, #091e3a 0%, #1a365d 100%); color: #fff; padding: 18px 24px; border-radius: 8px; text-align: left; display: flex; align-items: center; justify-content: space-between; font-family: sans-serif; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">' +
          '<div><span style="font-size: 10px; font-weight: 800; letter-spacing: 0.1em; color: #38bdf8; text-transform: uppercase;">Google AdSense Preview</span>' +
          '<h4 style="margin: 4px 0 2px; font-size: 15px; font-weight: 700;">Wall Street Journal & Financial Times Executive Syndicate</h4>' +
          '<p style="margin: 0; font-size: 12px; color: #cbd5e1;">Institutional wealth intelligence delivering verified Alpha.</p></div>' +
          '<a href="/advertise" style="background: #38bdf8; color: #0f172a; font-size: 11px; font-weight: 700; padding: 8px 16px; border-radius: 6px; text-decoration: none; text-transform: uppercase;">Acessar</a></div>';
      } else if (type === 'skyscraper') {
        textarea.value = \`<!-- Corner Skyscraper Ad (160x600) -->
<div style="width: 160px; min-height: 580px; background: #0f172a; color: #fff; border-radius: 6px; padding: 12px; font-family: sans-serif; text-align: center; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #334155;">
  <div>
    <span style="font-size: 9px; font-weight: 800; color: #ef4444; letter-spacing: 0.08em; text-transform: uppercase;">SPONSORED</span>
    <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=300&q=80" style="width: 100%; height: 180px; object-fit: cover; border-radius: 4px; margin: 8px 0;" />
    <h5 style="margin: 0; font-size: 12px; font-weight: 700; color: #fff; line-height: 1.3;">Goldman Sachs Private Wealth</h5>
    <p style="font-size: 10px; color: #94a3b8; margin: 6px 0 0; line-height: 1.4;">Bespoke liquidity management for institutions.</p>
  </div>
  <a href="/advertise" style="background: #ef4444; color: #fff; font-size: 10px; font-weight: 800; padding: 8px; border-radius: 4px; text-decoration: none; text-transform: uppercase; display: block;">Saiba Mais</a>
</div>\`;
      } else {
        textarea.value = \`<!-- Modern Responsive HTML Billboard Banner -->
<div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: #ffffff; padding: 20px 28px; border-radius: 8px; border-left: 5px solid #dc2626; display: flex; align-items: center; justify-content: space-between; font-family: system-ui, sans-serif;">
  <div style="space-y: 4px;">
    <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #ef4444; letter-spacing: 0.1em;">Patrocinador Oficial</span>
    <h3 style="margin: 2px 0 4px; font-size: 17px; font-weight: 800; color: #fff;">Enterprise Cloud AI Summit 2026 — Silicon Valley</h3>
    <p style="margin: 0; font-size: 12px; color: #9ca3af;">Participe do maior encontro de infraestrutura computacional dos Estados Unidos.</p>
  </div>
  <a href="/advertise" style="background: #ffffff; color: #111827; padding: 10px 20px; border-radius: 6px; font-size: 12px; font-weight: 800; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; shrink-0;">Inscreva-se ↗</a>
</div>\`;
      }
      updateAdLivePreview();
    }

    function updateAdLivePreview() {
      const type = document.getElementById('ad-edit-type').value;
      const previewBox = document.getElementById('ad-live-preview-box');

      if (type === 'html') {
        const htmlCode = document.getElementById('ad-edit-html').value.trim();
        if (htmlCode) {
          previewBox.innerHTML = htmlCode;
        } else {
          previewBox.innerHTML = '<div class="text-xs text-neutral-400 font-mono py-8 text-center"><i class="fa-solid fa-code text-lg block mb-1"></i>Digite ou cole o código HTML acima para ver a prévia ao vivo instantaneamente</div>';
        }
      } else {
        const img = document.getElementById('ad-edit-img').value;
        const link = document.getElementById('ad-edit-link').value || '#';
        const sponsor = document.getElementById('ad-edit-sponsor').value || 'Patrocinador Oficial';
        const alt = document.getElementById('ad-edit-alt').value || 'Anúncio Patrocinado The American Beacon';

        previewBox.innerHTML = \`
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 w-full p-2 text-left">
            \${img ? \`<img src="\${img}" class="w-full sm:w-36 h-20 object-cover rounded bg-neutral-200 shrink-0" />\` : ''}
            <div class="flex-1 space-y-1">
              <span class="text-[10px] font-bold uppercase text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">\${sponsor}</span>
              <h4 class="font-serif text-sm font-bold text-neutral-900">\${alt}</h4>
              <p class="text-xs text-neutral-500">Clique para abrir página do anunciante.</p>
            </div>
            <a href="\${link}" target="_blank" class="shrink-0 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded">Acessar ↗</a>
          </div>
        \`;
      }
    }

    async function saveAdSlotChanges() {
      const id = document.getElementById('ad-edit-id').value;
      if (!id) return;

      const type = document.getElementById('ad-edit-type').value;
      const name = document.getElementById('ad-edit-name').value;
      const enabled = document.getElementById('ad-edit-enabled').checked;
      const htmlCode = document.getElementById('ad-edit-html').value;
      const customBanner = {
        imageUrl: document.getElementById('ad-edit-img').value,
        targetUrl: document.getElementById('ad-edit-link').value,
        sponsorName: document.getElementById('ad-edit-sponsor').value,
        altText: document.getElementById('ad-edit-alt').value,
        ctaText: 'Acessar ↗'
      };

      const payload = {
        name,
        enabled,
        type: type === 'html' ? 'adsense' : 'custom',
        htmlCode,
        adCode: htmlCode,
        customBanner
      };

      showToast('Salvando e ativando alterações do anúncio...');

      try {
        const res = await fetch('/api/ads/' + id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('Anúncio atualizado com sucesso no portal!');
          closeAdEditorModal();
          await loadData();
        } else {
          showToast('Erro ao salvar anúncio.', false);
        }
      } catch (e) {
        showToast('Falha na comunicação com o servidor.', false);
      }
    }

    async function toggleAdStatus(id, newStatus) {
      try {
        const res = await fetch('/api/ads/' + id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled: newStatus }),
        });
        const data = await res.json();
        if (data.success) {
          showToast('Status do anúncio atualizado!');
          loadData();
        }
      } catch (e) {
        showToast('Erro ao atualizar anúncio.', false);
      }
    }

    function renderSubscribers(subs) {
      const tbody = document.getElementById('subscribers-table-body');
      tbody.innerHTML = subs.map(s => \`
        <tr class="hover:bg-slate-800/30">
          <td class="py-2.5 px-4 font-mono font-bold text-slate-200">\${s.email}</td>
          <td class="py-2.5 px-4 text-slate-300">\${s.edition || 'Morning Dispatch'}</td>
          <td class="py-2.5 px-4 text-slate-500 font-mono text-[10px]">\${new Date(s.subscribedAt).toLocaleDateString('pt-BR')}</td>
          <td class="py-2.5 px-4"><span class="bg-emerald-950 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded font-bold">ATIVO</span></td>
        </tr>
      \`).join('');
    }

    function renderSettings(set) {
      document.getElementById('setting-site-name').value = set.siteName || '';
      document.getElementById('setting-tagline').value = set.tagline || '';
      document.getElementById('setting-adsense-id').value = set.adsensePublisherId || '';
      document.getElementById('setting-gsc-tag').value = set.googleSearchConsoleTag || '';
      document.getElementById('setting-breaking-alert').value = set.breakingNewsAlert || '';
      document.getElementById('setting-ads-txt').value = set.adsTxtContent || '';
    }

    async function handleSaveSettingsSubmit(e) {
      e.preventDefault();
      const updates = {
        siteName: document.getElementById('setting-site-name').value,
        tagline: document.getElementById('setting-tagline').value,
        adsensePublisherId: document.getElementById('setting-adsense-id').value,
        googleSearchConsoleTag: document.getElementById('setting-gsc-tag').value,
        breakingNewsAlert: document.getElementById('setting-breaking-alert').value,
        adsTxtContent: document.getElementById('setting-ads-txt').value,
      };

      try {
        const res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        const data = await res.json();
        if (data.success) {
          showToast('Configurações salvas com sucesso!');
        }
      } catch (e) {
        showToast('Erro ao salvar configurações.', false);
      }
    }

    // Initialize data on load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadData);
    } else {
      loadData();
    }
  </script>
</body>
</html>`;
}
