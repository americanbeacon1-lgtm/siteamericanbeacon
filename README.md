# THE AMERICAN BEACON — Portal Profissional de Notícias dos Estados Unidos

> **"The Voice of the Republic • Independent Journalism & Global Intelligence"**  
> *Sede Editorial: National Press Building, 529 14th St NW, Suite 800, Washington, D.C. 20045*

Um portal digital de notícias americano desenvolvido nos padrões editoriais e visuais dos maiores veículos da imprensa dos Estados Unidos (*The New York Times*, *The Wall Street Journal*, *The Washington Post*, *Bloomberg*).

---

## 📡 NOVIDADE: Motor de Sincronização Automática dos Portais dos EUA

O portal conta com um **motor de ingestão automatizado** conectado diretamente aos feeds oficiais dos maiores conglomerados de mídia dos Estados Unidos:

### 🗞️ Portais Conectados e Mapeamento Editorial:
1. **The New York Times (NYT):**
   - *NYT Home & Breaking* → Breaking News
   - *NYT U.S. News* → U.S. News
   - *NYT Politics* → Politics
   - *NYT World* → World News
   - *NYT Arts* → Entertainment
   - *NYT Health* → Health & Medicine
   - *NYT Style* → Lifestyle
   - *NYT Science & Space* → Science
   - *NYT Travel* → Travel
2. **The Wall Street Journal (WSJ):**
   - *WSJ U.S. Business* → Business
   - *WSJ Markets Main* → Finance & Wall Street
3. **CNBC News:**
   - *CNBC Top News* → Breaking News & Finance
4. **NPR (National Public Radio):**
   - *NPR Politics & National* → Politics & U.S. News
5. **TechCrunch:**
   - *TechCrunch AI & Venture* → Artificial Intelligence
6. **Wired:**
   - *Wired Tech & Cyber* → Technology
7. **ESPN:**
   - *ESPN National Desk* → Sports

---

## ⚡ Como Funciona a Sincronização:

### 1. No Painel Administrativo (`/admin`):
- Acesse a aba **"📡 Puxador Automático de Notícias EUA"**.
- Clique no botão verde: **"Executar Sincronização Agora"** ou **"Puxar Notícias Reais Agora"**.
- O sistema varre os feeds dos EUA em tempo real, extrai manchetes, introduções, fotos de alta resolução, créditos de foto e fontes, e salva automaticamente nas 14 editorias.
- **De-duplicação inteligente:** Notícias já importadas nunca são duplicadas.

### 2. Automação Contínua (Via Cron / Background):
Você pode agendar o endpoint para rodar a cada 15, 30 ou 60 minutos:
```bash
curl -X GET "http://localhost:3000/api/cron/fetch-news?max=2"
```
No Vercel, basta configurar no `vercel.json` o agendamento de cron jobs chamando `/api/cron/fetch-news`.

---

## 🏛️ 1. Idioma e Experiência do Leitor

- **Área Pública (100% US English):** Todos os menus, manchetes, subtítulos, artigos, legendas, créditos de fotos, formatos de data (`Sunday, November 8, 2026`), moedas (`$ USD`) e páginas institucionais estão redigidos exclusivamente em **inglês americano**.
- **Painel Administrativo (`/admin` em Português):** O ambiente de gestão editorial e monetização foi projetado em português para facilitar a administração de matérias, anúncios, categorias e configurações.

---

## 📑 2. As 14 Editorias / Categorias (com Páginas Dedicadas)

Cada uma das 14 editorias solicitadas possui sua própria página dedicada com filtragem automática, cabeçalho temático com cor de destaque, lead story e grid de notícias:

1. **Breaking News** (`/category/breaking-news`)
2. **U.S. News** (`/category/us-news`)
3. **Politics** (`/category/politics`)
4. **Business** (`/category/business`)
5. **Finance** (`/category/finance`)
6. **Technology** (`/category/technology`)
7. **Artificial Intelligence** (`/category/artificial-intelligence`)
8. **World News** (`/category/world-news`)
9. **Entertainment** (`/category/entertainment`)
10. **Health** (`/category/health`)
11. **Lifestyle** (`/category/lifestyle`)
12. **Science** (`/category/science`)
13. **Travel** (`/category/travel`)
14. **Sports** (`/category/sports`)

---

## 💰 3. Monetização & Publicidade Estratégica

- **Top Header Leaderboard (728x90 / 970x250 Billboard)**
- **Sticky Sidebar Half-Page & MPU (300x250 / 300x600)**
- **In-Article Native Sponsored Unit**
- **Homepage In-Feed Billboard (970x90)**
- **Bottom Sticky Anchor Bar**
- **Suporte Dual (Configurável no Painel Admin):** Google AdSense / Google Ad Manager ou Banners Diretos de Patrocinadores.
- **Arquivo `ads.txt` Dinâmico (`/ads.txt`):** Padrão do IAB pronto e editável no painel administrativo.

---

## 🚀 4. SEO Avançado para o Google News & Tráfego Americano

- **Schema.org NewsArticle & NewsMediaOrganization (JSON-LD)**
- **Google News Sitemap (`/news-sitemap.xml`)**
- **Standard Sitemap XML (`/sitemap.xml`)**
- **Robots.txt Dinâmico (`/robots.txt`)**
- **RSS Feed Oficial (`/rss.xml`)**

---

## 🛠️ 5. Como Executar Localmente ou em Produção

```bash
# Executar servidor
npm start

# Acessar:
# - Portal Público: http://localhost:3000
# - Painel de Controle: http://localhost:3000/admin
# - Endpoint de Puxar Notícias: http://localhost:3000/api/cron/fetch-news
```
