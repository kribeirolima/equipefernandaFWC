"use client";

import { cn } from "@/lib/utils";
import { DIAS, type AgendaItem, type OrdemDoDia, type ProgramaTipo, type RiscoNivel } from "@/lib/ordem-dia";
import {
  AlertTriangle,
  CalendarDays,
  Car,
  ChevronRight,
  Clapperboard,
  Clock,
  Flag,
  Lock,
  MapPin,
  Mic2,
  Radio,
  Shield,
  Siren,
  Star,
  Tv2,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// ─── helpers ─────────────────────────────────────────────────────────────────

function Empty({ children }: { children: string }) {
  if (children === "—" || children.trim() === "")
    return <span className="text-muted-foreground/40 italic select-none">—</span>;
  return <>{children}</>;
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="flex items-center gap-2 scroll-mt-20 text-base font-semibold tracking-tight text-foreground"
    >
      {children}
    </h2>
  );
}

function SectionCard({ id, title, icon: Icon, children }: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-3">
      <SectionTitle id={`${id}-title`}>
        <Icon className="h-4 w-4 text-muted-foreground" />
        {title}
      </SectionTitle>
      {children}
    </section>
  );
}

function TableRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b last:border-0">
      <td className="py-2 pr-4 text-xs font-medium text-muted-foreground whitespace-nowrap w-44">{label}</td>
      <td className="py-2 text-xs text-foreground">
        <Empty>{value}</Empty>
      </td>
    </tr>
  );
}

// ─── section nav ─────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "info", label: "Info Geral" },
  { id: "enderecos", label: "Endereços" },
  { id: "logistica", label: "Logística" },
  { id: "agenda", label: "Agenda" },
  { id: "host", label: "Host" },
  { id: "grade", label: "Grade TV" },
  { id: "jogos", label: "Jogos" },
  { id: "equipes", label: "Equipes" },
  { id: "alertas", label: "Alertas" },
  { id: "resumo", label: "Resumo" },
];

function SectionNav() {
  return (
    <div className="sticky top-[57px] z-10 -mx-4 sm:-mx-6 lg:-mx-8 border-b bg-background/95 backdrop-blur px-4 sm:px-6 lg:px-8 py-2">
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {NAV_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex-shrink-0 rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── day header ──────────────────────────────────────────────────────────────

function DayHeader({ dia }: { dia: OrdemDoDia }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30 font-semibold">
              DIA {dia.diaNum}
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-300 dark:border-red-500/30 font-semibold gap-1">
              <Lock className="h-3 w-3" />
              CONFIDENCIAL
            </Badge>
            <Badge variant="outline" className="text-muted-foreground text-[10px]">
              v{dia.versao}
            </Badge>
          </div>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight">
            {dia.diaSemana}, {dia.data}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {dia.cidade} — {dia.estadio}
          </p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-2.5 text-sm space-y-0.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Host</p>
          <p className="font-semibold flex items-center gap-1.5">
            <Mic2 className="h-4 w-4 text-blue-500" />
            {dia.host}
          </p>
        </div>
      </div>

      {/* quick stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: "Fusos", value: "EDT / BRT" },
          { label: "Clima", value: dia.clima.split("·")[0].trim() },
          { label: "Sunset local", value: dia.sunset },
          { label: "Entradas ao vivo", value: `${dia.entradasHost.length}×` },
        ].map((k) => (
          <div key={k.label} className="rounded-md border bg-muted/30 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{k.label}</p>
            <p className="text-sm font-medium">{k.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── section 1 — info geral ──────────────────────────────────────────────────

function InfoGeralSection({ dia }: { dia: OrdemDoDia }) {
  return (
    <SectionCard id="info" title="Informações Gerais" icon={CalendarDays}>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <tbody>
              <TableRow label="📅 Dia / Data" value={`DIA ${dia.diaNum} — ${dia.diaSemana}, ${dia.data}`} />
              <TableRow label="🌆 Cidade" value={dia.cidade} />
              <TableRow label="🇺🇸 País" value="Estados Unidos da América" />
              <TableRow label="🕐 Fuso horário" value={dia.fusoHorario} />
              <TableRow label="🌤 Clima previsto" value={dia.clima} />
              <TableRow label="🌇 Sunset local" value={`${dia.sunset} — relevante para iluminação em links externos`} />
            </tbody>
          </table>
        </CardContent>
      </Card>
    </SectionCard>
  );
}

// ─── section 2 — endereços ───────────────────────────────────────────────────

function EnderecosSection({ dia }: { dia: OrdemDoDia }) {
  const rows = [
    { label: "🏠 Airbnb da Equipe", value: dia.airbnbEquipe },
    { label: "🏠 Airbnb do Host", value: dia.airbnbHost },
    { label: "🏟 Estádio / Venue", value: `${dia.estadio}, ${dia.cidade}` },
    { label: "🏨 Hotel da Seleção", value: `${dia.hotelSelecao} | Acesso SOMENTE com credencial CBF` },
    { label: "🎥 Locação 'Casa' CazéTV", value: dia.casaCazeTv },
    { label: "🏥 Hospital Referência", value: dia.hospitalRef },
    { label: "🇧🇷 Consulado Brasileiro", value: dia.consulado },
  ];
  return (
    <SectionCard id="enderecos" title="Endereços e Locações" icon={MapPin}>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <tbody>
              {rows.map((r) => <TableRow key={r.label} label={r.label} value={r.value} />)}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </SectionCard>
  );
}

// ─── section 3 — logística ───────────────────────────────────────────────────

function LogisticaSection({ dia }: { dia: OrdemDoDia }) {
  return (
    <SectionCard id="logistica" title="Logística e Deslocamento" icon={Car}>
      <div className="space-y-4">
        {/* routes */}
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            3.1 — Rotas e Tempos
          </p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="py-2 px-3 text-left font-semibold">Rota</th>
                  <th className="py-2 px-3 text-center font-semibold">KM</th>
                  <th className="py-2 px-3 text-center font-semibold">Normal</th>
                  <th className="py-2 px-3 text-center font-semibold">C/ Trânsito</th>
                  <th className="py-2 px-3 text-left font-semibold hidden sm:table-cell">Atenção</th>
                </tr>
              </thead>
              <tbody>
                {dia.rotas.map((r, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 px-3 font-medium">
                      <span className="text-muted-foreground">{r.origem}</span>
                      <span className="mx-1 text-muted-foreground/40">→</span>
                      <span>{r.destino}</span>
                    </td>
                    <td className="py-2 px-3 text-center text-muted-foreground"><Empty>{r.km}</Empty></td>
                    <td className="py-2 px-3 text-center font-semibold"><Empty>{r.tempoNormal}</Empty></td>
                    <td className="py-2 px-3 text-center text-muted-foreground"><Empty>{r.tempoTransito}</Empty></td>
                    <td className="py-2 px-3 text-muted-foreground hidden sm:table-cell">
                      {r.atencao ? <Empty>{r.atencao}</Empty> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* fleet */}
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            3.2 — Frota de Veículos
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {dia.frota.map((v, i) => (
              <div key={i} className="rounded-lg border bg-card px-3 py-2.5 space-y-1">
                <p className="text-xs font-semibold">{v.nome}</p>
                <div className="space-y-0.5 text-[11px] text-muted-foreground">
                  <p>Modelo: <Empty>{v.modelo}</Empty></p>
                  {v.motorista && <p>Motorista: <Empty>{v.motorista}</Empty></p>}
                  {v.tel && <p>Tel: <Empty>{v.tel}</Empty></p>}
                  <p>Disponibilidade: <Empty>{v.disponibilidade}</Empty></p>
                  <p className="text-foreground/70">Uso: {v.uso}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* alert */}
        <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 dark:border-amber-500/30 dark:bg-amber-500/10">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-xs text-amber-900 dark:text-amber-200">
            <strong>DIA DE JOGO:</strong> {dia.alertaPerimetro}
          </p>
        </div>

        <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 dark:border-red-500/30 dark:bg-red-500/10">
          <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />
          <p className="text-xs text-red-900 dark:text-red-200">
            <strong>CREDENCIAIS:</strong> Cada membro porta credencial FIFA no pescoço o tempo todo. Esqueceu = sem acesso. <strong>SEM EXCEÇÕES.</strong>
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

// ─── section 4 — agenda ──────────────────────────────────────────────────────

function AgendaBadge({ item }: { item: AgendaItem }) {
  if (item.isJogo)
    return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800 dark:bg-green-500/20 dark:text-green-300">⚽ JOGO</span>;
  if (item.isLive)
    return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-500/20 dark:text-red-300">🔴 AO VIVO</span>;
  return null;
}

function AgendaSection({ dia }: { dia: OrdemDoDia }) {
  return (
    <SectionCard id="agenda" title="Agenda do Dia — Cronologia Completa" icon={Clock}>
      <p className="text-[11px] text-muted-foreground">
        Todos os horários em <strong>EDT</strong>. Para horário de Brasília: <strong>somar 1 hora</strong>.
      </p>
      <div className="space-y-0.5">
        {dia.agenda.map((item, i) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-[64px_1fr] gap-3 rounded-md px-3 py-2.5 text-xs",
              item.isJogo
                ? "bg-green-50 border border-green-200 dark:bg-green-500/10 dark:border-green-500/30"
                : item.isLive
                  ? "bg-red-50/60 border border-red-100 dark:bg-red-500/8 dark:border-red-500/20"
                  : "border border-transparent hover:bg-muted/40"
            )}
          >
            <span className="font-mono font-semibold text-foreground/70 pt-0.5">{item.hora}</span>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <AgendaBadge item={item} />
                <span className={cn("font-medium", item.isJogo ? "text-green-900 dark:text-green-200" : item.isLive ? "text-red-800 dark:text-red-200" : "")}>
                  {item.atividade}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {item.local}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {item.envolvidos}
                </span>
                {item.obs && (
                  <span className="flex items-center gap-1 text-muted-foreground/70 italic">
                    <ChevronRight className="h-3 w-3" /> {item.obs}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── section 5 — host ────────────────────────────────────────────────────────

function HostSection({ dia }: { dia: OrdemDoDia }) {
  return (
    <SectionCard id="host" title={`Programação do Host — ${dia.host}`} icon={Mic2}>
      <div className="flex flex-wrap gap-3 rounded-lg border bg-muted/30 px-4 py-2.5">
        {[
          { label: "Entradas ao vivo", value: `${dia.entradasHost.length}×` },
          { label: "Total estimado no ar", value: "—" },
          { label: "Locações", value: "3×" },
        ].map((k) => (
          <div key={k.label} className="text-center">
            <p className="text-lg font-bold">{k.value}</p>
            <p className="text-[11px] text-muted-foreground">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {dia.entradasHost.map((e, i) => (
          <Card key={i} className="overflow-hidden p-0">
            <CardHeader className="flex flex-row items-start justify-between gap-2 border-b bg-muted/20 p-3 pb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-500/20 dark:text-red-300">
                    🔴 {i + 1}ª ENTRADA
                  </span>
                  <span className="text-xs font-semibold">{e.bloco}</span>
                </div>
              </div>
              <div className="text-right text-[11px] text-muted-foreground">
                <p className="font-medium">{e.horaEdt}</p>
                <p>{e.horaBrt}</p>
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-1.5">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {e.local}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" /> Duração: <Empty>{e.duracao}</Empty>
                </span>
              </div>
              <p className="text-xs text-foreground/80">{e.conteudo}</p>
              <p className="text-[11px] text-muted-foreground">{e.equipe}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── section 6 — grade ───────────────────────────────────────────────────────

const GRADE_STYLE: Record<ProgramaTipo, { dot: string; badge: string }> = {
  abertura:  { dot: "bg-yellow-400",  badge: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-300 dark:border-yellow-500/30" },
  pre_jogo:  { dot: "bg-orange-400",  badge: "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/30" },
  ao_vivo:   { dot: "bg-red-500",     badge: "bg-red-50 text-red-800 border-red-200 dark:bg-red-500/15 dark:text-red-300 dark:border-red-500/30" },
  pos_jogo:  { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30" },
  noturno:   { dot: "bg-violet-500",  badge: "bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/30" },
};

const GRADE_LABEL: Record<ProgramaTipo, string> = {
  abertura: "Abertura",
  pre_jogo: "Pré-Jogo",
  ao_vivo: "Ao Vivo",
  pos_jogo: "Pós-Jogo",
  noturno: "Noturno",
};

function GradeSection({ dia }: { dia: OrdemDoDia }) {
  return (
    <SectionCard id="grade" title="Grade de Programação — CazéTV" icon={Tv2}>
      <div className="space-y-2">
        {dia.grade.map((p, i) => {
          const style = GRADE_STYLE[p.tipo];
          return (
            <div key={i} className="flex gap-3 rounded-lg border bg-card p-3">
              <div className={cn("mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full", style.dot)} />
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className={cn("text-[10px] font-semibold", style.badge)}>
                        {GRADE_LABEL[p.tipo]}
                      </Badge>
                      <span className="text-xs font-semibold">{p.nome}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{p.horaEdt}</p>
                  </div>
                </div>
                <div className="grid gap-0.5 sm:grid-cols-2 text-[11px]">
                  <span className="text-muted-foreground">Formato: <span className="text-foreground/70">{p.formato}</span></span>
                  <span className="text-muted-foreground">Bancada: <span className="text-foreground/70">{p.bancada}</span></span>
                </div>
                {p.notas && (
                  <p className="text-[11px] italic text-muted-foreground/80">{p.notas}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ─── section 7 — jogos ───────────────────────────────────────────────────────

function JogosSection({ dia }: { dia: OrdemDoDia }) {
  const principal = dia.jogos.find((j) => j.isPrincipal);
  const secundarios = dia.jogos.filter((j) => !j.isPrincipal);

  return (
    <SectionCard id="jogos" title="Jogos do Dia" icon={Flag}>
      <div className="space-y-4">
        {principal && (
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50/50 p-4 space-y-3 dark:border-blue-500/30 dark:bg-blue-500/8">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-600 text-white text-xs font-bold">JOGO PRINCIPAL</Badge>
              <span className="text-sm font-bold">{principal.confronto}</span>
            </div>
            <div className="grid gap-1 sm:grid-cols-2">
              {[
                { label: "⏰ Horário", value: `${principal.horarioEdt} EDT | ${principal.horarioBrt} BRT` },
                { label: "🏟 Estádio", value: `${principal.estadio} — ${principal.cidade}` },
                { label: "🔥 Importância", value: principal.importancia },
                { label: "🎙 Narrador", value: principal.narrador ?? "—" },
                { label: "💬 Comentaristas", value: principal.comentaristas ?? "—" },
                { label: "📡 Rep. de Campo", value: principal.reprCampo ?? "—" },
                { label: "🎬 Produção", value: principal.producao ?? "—" },
              ].map((r) => <TableRow key={r.label} label={r.label} value={r.value} />)}
            </div>
          </div>
        )}

        {/* operational details */}
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            7.3 — Detalhes Operacionais
          </p>
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <tbody>
                  <TableRow label="⏰ Portões abrem" value={dia.detalhesJogo.portasAbrem} />
                  <TableRow label="🪪 Entrada credenciados" value={dia.detalhesJogo.entradaCredenciados} />
                  <TableRow label="🎙 Coletiva pré-jogo" value={dia.detalhesJogo.coletivaPreJogo} />
                  <TableRow label="🚪 Flash de vestiário" value={dia.detalhesJogo.flashVestiario} />
                  <TableRow label="📣 Coletiva pós-jogo" value={dia.detalhesJogo.coletivaPos} />
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {secundarios.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              7.2 — Demais Jogos do Dia
            </p>
            {secundarios.map((j, i) => (
              <Card key={i}>
                <CardContent className="p-3 text-xs space-y-1">
                  <p className="font-semibold">{j.confronto}</p>
                  <p className="text-muted-foreground">{j.horarioEdt} EDT — {j.estadio}, {j.cidade}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}

// ─── section 8 — equipes ─────────────────────────────────────────────────────

function EquipesSection({ dia }: { dia: OrdemDoDia }) {
  return (
    <SectionCard id="equipes" title="Equipes e Cobertura" icon={Users}>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {dia.equipes.map((e, i) => (
          <div key={i} className="rounded-lg border bg-card p-3 space-y-2">
            <p className="text-xs font-semibold">
              {e.emoji} {e.frente}
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{e.responsavel}</p>
            <p className="text-[11px] text-foreground/70 italic leading-relaxed">{e.funcao}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── section 9 — alertas & planos B ─────────────────────────────────────────

function AlertasSection({ dia }: { dia: OrdemDoDia }) {
  return (
    <SectionCard id="alertas" title="Alertas, Riscos e Planos B" icon={Siren}>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">9.1 — Riscos Operacionais</p>
          {dia.riscos.map((r, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-2 rounded-lg border px-3 py-2.5",
                r.nivel === "critico"
                  ? "border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10"
                  : "border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10"
              )}
            >
              <Shield className={cn("mt-0.5 h-4 w-4 flex-shrink-0", r.nivel === "critico" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400")} />
              <div>
                <Badge
                  variant="outline"
                  className={cn("mb-1 text-[10px] font-bold",
                    r.nivel === "critico"
                      ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-300"
                      : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300"
                  )}
                >
                  {r.nivel === "critico" ? "🚨 CRÍTICO" : "⚠️ MODERADO"}
                </Badge>
                <p className={cn("text-xs", r.nivel === "critico" ? "text-red-900 dark:text-red-200" : "text-amber-900 dark:text-amber-200")}>{r.descricao}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">9.2 — Planos B</p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="py-2 px-3 text-left font-semibold w-1/3">Situação</th>
                  <th className="py-2 px-3 text-left font-semibold">Plano B</th>
                </tr>
              </thead>
              <tbody>
                {dia.planosB.map((p, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2.5 px-3 font-medium text-red-700 dark:text-red-400">{p.situacao}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{p.solucao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

// ─── section 10 — resumo executivo ───────────────────────────────────────────

function ResumoSection({ dia }: { dia: OrdemDoDia }) {
  return (
    <SectionCard id="resumo" title="Resumo Executivo" icon={Star}>
      <div className="space-y-4">
        <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 space-y-2 dark:from-blue-500/10 dark:to-blue-500/5 dark:border-blue-500/20">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">🏆 Destaques do Dia</p>
          <ul className="space-y-1">
            {dia.destaques.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-blue-900 dark:text-blue-200">
                <span className="mt-0.5 text-blue-400">▶</span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">⭐ Momentos-Chave</p>
          {dia.momentosChave.map((m, i) => (
            <div key={i} className="flex items-start gap-3 rounded-md border bg-card px-3 py-2">
              <span className="font-mono text-xs font-bold text-foreground/60 pt-0.5 w-14 flex-shrink-0">{m.hora}</span>
              <span className="text-xs">{m.descricao}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-card p-4 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">🎯 Prioridades Editoriais</p>
          <ol className="space-y-1.5">
            {dia.prioridades.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span className="flex-shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </div>

        <p className="text-center text-[11px] text-muted-foreground/60 italic pt-2">
          CazéTV | Operações Copa 2026 | CONFIDENCIAL
        </p>
      </div>
    </SectionCard>
  );
}

// ─── main export ─────────────────────────────────────────────────────────────

export function OrdemDia() {
  const dia = DIAS[0];

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <DayHeader dia={dia} />
      <SectionNav />
      <InfoGeralSection dia={dia} />
      <EnderecosSection dia={dia} />
      <LogisticaSection dia={dia} />
      <AgendaSection dia={dia} />
      <HostSection dia={dia} />
      <GradeSection dia={dia} />
      <JogosSection dia={dia} />
      <EquipesSection dia={dia} />
      <AlertasSection dia={dia} />
      <ResumoSection dia={dia} />
    </main>
  );
}
