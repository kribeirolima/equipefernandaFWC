export type RiscoNivel = "critico" | "moderado";
export type ProgramaTipo = "abertura" | "pre_jogo" | "ao_vivo" | "pos_jogo" | "noturno";

export interface AgendaItem {
  hora: string;
  atividade: string;
  local: string;
  envolvidos: string;
  obs?: string;
  isLive?: boolean;
  isJogo?: boolean;
}

export interface Rota {
  origem: string;
  destino: string;
  km: string;
  tempoNormal: string;
  tempoTransito: string;
  atencao?: string;
}

export interface Veiculo {
  nome: string;
  modelo: string;
  placa?: string;
  motorista?: string;
  tel?: string;
  disponibilidade: string;
  uso: string;
}

export interface EntradaHost {
  horaEdt: string;
  horaBrt: string;
  duracao: string;
  local: string;
  bloco: string;
  conteudo: string;
  equipe: string;
}

export interface ProgramaGrade {
  nome: string;
  tipo: ProgramaTipo;
  horaEdt: string;
  formato: string;
  bancada: string;
  notas: string;
}

export interface JogoDetalhe {
  confronto: string;
  horarioEdt: string;
  horarioBrt: string;
  estadio: string;
  cidade: string;
  importancia: string;
  narrador?: string;
  comentaristas?: string;
  reprCampo?: string;
  producao?: string;
  isPrincipal: boolean;
}

export interface EquipeCobertura {
  frente: string;
  emoji: string;
  responsavel: string;
  funcao: string;
}

export interface RiscoItem {
  nivel: RiscoNivel;
  descricao: string;
}

export interface PlanoB {
  situacao: string;
  solucao: string;
}

export interface OrdemDoDia {
  diaNum: number;
  diaSemana: string;
  data: string;
  cidade: string;
  estadio: string;
  host: string;
  versao: string;
  fusoHorario: string;
  clima: string;
  sunset: string;
  airbnbEquipe: string;
  airbnbHost: string;
  casaCazeTv: string;
  hotelSelecao: string;
  hospitalRef: string;
  consulado: string;
  rotas: Rota[];
  frota: Veiculo[];
  alertaPerimetro: string;
  agenda: AgendaItem[];
  entradasHost: EntradaHost[];
  grade: ProgramaGrade[];
  jogos: JogoDetalhe[];
  detalhesJogo: {
    portasAbrem: string;
    entradaCredenciados: string;
    coletivaPreJogo: string;
    flashVestiario: string;
    coletivaPos: string;
  };
  equipes: EquipeCobertura[];
  riscos: RiscoItem[];
  planosB: PlanoB[];
  destaques: string[];
  momentosChave: { hora: string; descricao: string }[];
  prioridades: string[];
}

export const DIAS: OrdemDoDia[] = [
  {
    diaNum: 1,
    diaSemana: "Domingo",
    data: "14 de Junho de 2026",
    cidade: "East Rutherford, NJ",
    estadio: "MetLife Stadium",
    host: "Casimiro Miguel",
    versao: "1.0",
    fusoHorario: "EDT — Eastern Daylight Time (UTC −4h) | Brasil: BRT = EDT +1h",
    clima: "Parcialmente nublado · 18°C – 27°C · Umidade 65% · Vento 15 km/h · 20% chuva",
    sunset: "20h24 EDT",
    airbnbEquipe: "—",
    airbnbHost: "—",
    casaCazeTv: "—",
    hotelSelecao: "—",
    hospitalRef: "—",
    consulado: "—",
    rotas: [
      { origem: "Airbnb Equipe", destino: "MetLife Stadium", km: "—", tempoNormal: "—", tempoTransito: "—", atencao: "A confirmar após definição do Airbnb" },
      { origem: "Airbnb Host", destino: "'Casa' CazéTV", km: "—", tempoNormal: "—", tempoTransito: "—", atencao: "Confirmar após definição do Airbnb" },
      { origem: "'Casa' CazéTV", destino: "MetLife Stadium", km: "—", tempoNormal: "—", tempoTransito: "—" },
      { origem: "Hotel Seleção", destino: "MetLife Stadium", km: "—", tempoNormal: "—", tempoTransito: "—", atencao: "Seguir protocolo CBF para credencial" },
    ],
    frota: [
      { nome: "Van 01 — Técnica", modelo: "—", motorista: "—", tel: "—", disponibilidade: "—", uso: "Equipamentos e equipe técnica" },
      { nome: "Van 02 — Produção", modelo: "—", motorista: "—", tel: "—", disponibilidade: "—", uso: "Produtores e repórteres" },
      { nome: "Carro do Host", modelo: "Sedan executivo", motorista: "—", tel: "—", disponibilidade: "—", uso: "Casimiro + 1 produtor" },
      { nome: "Uber Corporativo", modelo: "App configurado em todos os celulares", disponibilidade: "24h", uso: "Centro de custo: COPA2026-CAZÉ" },
    ],
    alertaPerimetro: "Perímetro de segurança FIFA ativa restrição de veículos. Toda equipe que precisa entrar deve estar posicionada ANTES do horário limite. Horários de saída são IMPRORROGÁVEIS.",
    agenda: [
      { hora: "05h30", atividade: "WAKE CALL — equipe técnica + van 01", local: "Airbnb equipe", envolvidos: "Coord. técnica", obs: "Confirmar via WhatsApp grupo" },
      { hora: "06h00", atividade: "Café da manhã técnica | Saída van 01", local: "Airbnb / Trânsito", envolvidos: "Equipe técnica", obs: "Checklist de equipamentos obrigatório" },
      { hora: "06h30", atividade: "WAKE CALL — produção, editorial e repórteres", local: "Airbnb equipe", envolvidos: "Coord. produção", obs: "Confirmações por WhatsApp" },
      { hora: "07h00", atividade: "Café da manhã — produção e apresentadores", local: "Airbnb / externo", envolvidos: "Produtores, editores" },
      { hora: "07h30", atividade: "BRIEFING MATINAL — alinhamento editorial", local: "Airbnb (sala)", envolvidos: "Casimiro + ED + prods.", obs: "Pauta do dia, mudanças. Duração: 30 min" },
      { hora: "08h00", atividade: "Saída van 02 — produção para base", local: "Airbnb → base", envolvidos: "Produtores, editores" },
      { hora: "08h15", atividade: "Saída Host — carro para 'Casa' CazéTV", local: "Airbnb → locação", envolvidos: "Casimiro + Prod. + Makeup" },
      { hora: "08h30", atividade: "Setup técnico — locação 'Casa' CazéTV", local: "'Casa' CazéTV", envolvidos: "Técnica (3) + Dir. link", obs: "Câmera, luz, áudio, link. 90 min montagem" },
      { hora: "09h30", atividade: "Maquiagem e cabelo — Casimiro", local: "'Casa' CazéTV", envolvidos: "Casimiro + Arte", obs: "Duração: 60 min" },
      { hora: "10h00", atividade: "Teste de link interno (sem transmissão)", local: "'Casa' CazéTV", envolvidos: "Casimiro + Técnica" },
      { hora: "10h30", atividade: "Credenciamento MetLife — equipe estádio", local: "MetLife [Gate —]", envolvidos: "Repórteres (2) + câmera", obs: "NÃO pode atrasar" },
      { hora: "11h00", atividade: "1ª ENTRADA AO VIVO — Abertura do dia", local: "'Casa' CazéTV", envolvidos: "Casimiro + comentarista", obs: "Âncora BR passa para NJ", isLive: true },
      { hora: "12h00", atividade: "Almoço — equipe em rodízio", local: "Base / externo", envolvidos: "Todos (nunca juntos)", obs: "Cobertura contínua garantida" },
      { hora: "13h00", atividade: "2ª ENTRADA AO VIVO — Pré-jogo", local: "'Casa' CazéTV", envolvidos: "Casimiro + coment. + rep.", obs: "Torcida BR, dados do jogo", isLive: true },
      { hora: "13h30", atividade: "Saída equipe estádio — IMPRORROGÁVEL", local: "Base → MetLife", envolvidos: "Câmeras, técn., rep." },
      { hora: "14h00", atividade: "Chegada MetLife — setup posições", local: "MetLife Stadium", envolvidos: "Equipe estádio completa", obs: "Posições: bordão, campo, flash" },
      { hora: "14h30", atividade: "Saída Host — 'Casa' → MetLife", local: "'Casa' → MetLife", envolvidos: "Casimiro + Prod. + Motor." },
      { hora: "15h00", atividade: "Cerimônia / Pré-jogo FIFA", local: "MetLife Stadium", envolvidos: "Equipe posicionada" },
      { hora: "15h30", atividade: "Entrada — Cerimônia ao vivo (bordão)", local: "MetLife bordão", envolvidos: "Casimiro + coment. + rep.", isLive: true },
      { hora: "16h00", atividade: "⚽ JOGO — BRASIL × ADVERSÁRIO — TRANSMISSÃO COMPLETA", local: "MetLife Stadium", envolvidos: "Casting completo", obs: "Transmissão integral CazéTV", isJogo: true, isLive: true },
      { hora: "17h45", atividade: "3ª ENTRADA — Intervalo ao vivo", local: "MetLife estúdio", envolvidos: "Casimiro + coments. (2)", obs: "Análise 1º tempo. Go-direto", isLive: true },
      { hora: "19h45", atividade: "Pós-jogo — análise, premiações, entrevistas", local: "MetLife flash", envolvidos: "Casimiro + repórteres", obs: "Flash FIFA. Protocolo pré-aprovado" },
      { hora: "20h30", atividade: "4ª ENTRADA — Pós-jogo", local: "MetLife externo", envolvidos: "Casimiro + coment.", isLive: true },
      { hora: "21h00", atividade: "Desmontagem parcial — equipamentos MetLife", local: "MetLife Stadium", envolvidos: "Equipe técnica estádio", obs: "Inventário: checar lista antes de sair" },
      { hora: "21h30", atividade: "Transporte de retorno — vans + carro Host", local: "MetLife → Airbnb", envolvidos: "Casimiro + equipe", obs: "Trânsito pós-jogo" },
      { hora: "22h00", atividade: "Programa Noturno — fechamento do dia", local: "Base / Estúdio", envolvidos: "Comentaristas + Casimiro", isLive: true },
      { hora: "22h45", atividade: "Debriefing — reunião de fechamento do dia", local: "Base ou remoto", envolvidos: "Prods., coord., ED", obs: "Ajustes para Dia 2" },
      { hora: "23h30", atividade: "Encerramento operacional — Dia 1", local: "Airbnb equipe", envolvidos: "Coord. geral", obs: "Confirmar presença de todos" },
    ],
    entradasHost: [
      { horaEdt: "11h00 EDT", horaBrt: "12h00 BRT", duracao: "—", local: "'Casa' CazéTV", bloco: "ABERTURA DO DIA", conteudo: "Primeiro link do dia — abertura simbólica da cobertura. Contexto do Dia 1, expectativas para a estreia do Brasil.", equipe: "Prod: — | Téc: — | Dir: —" },
      { horaEdt: "13h00 EDT", horaBrt: "14h00 BRT", duracao: "—", local: "'Casa' CazéTV", bloco: "PRÉ-JOGO", conteudo: "Torcida brasileira em solo americano, dados do confronto, análise tática.", equipe: "Prod: — | Coment: — | Rep: —" },
      { horaEdt: "15h30 EDT", horaBrt: "16h30 BRT", duracao: "—", local: "MetLife bordão", bloco: "CERIMÔNIA AO VIVO", conteudo: "Cerimônia de abertura do jogo. Análise ao vivo com comentaristas.", equipe: "Prod: — | Coments: — | Dir: —" },
      { horaEdt: "17h45 EDT", horaBrt: "18h45 BRT", duracao: "—", local: "MetLife estúdio", bloco: "INTERVALO", conteudo: "Análise do 1º tempo ao vivo. Go-direto.", equipe: "Prod: — | Coments: —" },
      { horaEdt: "20h30 EDT", horaBrt: "21h30 BRT", duracao: "—", local: "MetLife externo", bloco: "PÓS-JOGO", conteudo: "Resultado, reação, encaminhamento Copa.", equipe: "Prod: — | Rep campo: —" },
    ],
    grade: [
      { nome: "Abertura do Dia", tipo: "abertura", horaEdt: "11h00 – —", formato: "Link externo ao vivo", bancada: "Casimiro | Coment: — | Apoio BR: —", notas: "Go-live, teste de link, setup pronto às 10h30" },
      { nome: "Pré-Jogo", tipo: "pre_jogo", horaEdt: "13h00 – —", formato: "Link externo + painel", bancada: "Casimiro | Coments: — | Rep: —", notas: "VT editado com antecedência, aprovação ED: —" },
      { nome: "BRASIL × [ADVERSÁRIO] — AO VIVO", tipo: "ao_vivo", horaEdt: "16h00 – ~18h00", formato: "Link MetLife direto estádio", bancada: "Casimiro | Coments: — e —", notas: "Mudança de locação, grafismo, painel tático" },
      { nome: "Pós-Jogo", tipo: "pos_jogo", horaEdt: "20h30 – —", formato: "Link MetLife pós-apito", bancada: "Casimiro | Rep de campo: —", notas: "Dentro de 30min do apito, possível entrevista FIFA" },
      { nome: "Programa Noturno", tipo: "noturno", horaEdt: "22h00 – —", formato: "Estúdio/base ao vivo + VTs", bancada: "Casimiro (part.) | Apres: — | Coments: — (×3)", notas: "Análise, infográficos, replay gols" },
    ],
    jogos: [
      {
        confronto: "BRASIL × [ADVERSÁRIO]",
        horarioEdt: "16h00",
        horarioBrt: "17h00",
        estadio: "MetLife Stadium",
        cidade: "East Rutherford, NJ",
        importancia: "ALTA — Estreia do Brasil. SOLD OUT",
        narrador: "—",
        comentaristas: "— | — | —",
        reprCampo: "Campo: — | Torcida: — | Mix Zone: —",
        producao: "Ed. Chefe: — | Coord.: — | Dir. Transm.: —",
        isPrincipal: true,
      },
    ],
    detalhesJogo: {
      portasAbrem: "— EDT (Xh antes do jogo)",
      entradaCredenciados: "— EDT — Gate exclusivo mídia | Credencial + documento com foto",
      coletivaPreJogo: "— EDT | Sala de imprensa — | Vagas CazéTV: —",
      flashVestiario: "— | Horário estimado: — EDT | Vagas: —",
      coletivaPos: "Estimado: — EDT | Acesso: Credencial Cat. —",
    },
    equipes: [
      { frente: "HOST — Casimiro", emoji: "🎙", responsavel: "Produtora: — | Dir. arte: — | Makeup: — | Motorista: —", funcao: "Suporte integral às entradas ao vivo: pauta, figurino, earpiece, deslocamentos." },
      { frente: "EDITORIAL", emoji: "✏️", responsavel: "Ed. Chefe: — | Ed. Executivo: — | Pauta Copa: — | Ed. Digital: —", funcao: "Fluxo de pautas, aprovação de matérias, alinhamento com produção no Brasil." },
      { frente: "TÉCNICA — Transmissão", emoji: "🎬", responsavel: "Coord. Técnico: — | Eng. transmissão: — | Câmeras: — (×4) | Áudio: —", funcao: "Sinal de transmissão, qualidade de imagem, links ao vivo, backup com engenharia Brasil." },
      { frente: "REPÓRTERES — Campo", emoji: "📡", responsavel: "Rep. Estádio 1: — | Rep. Estádio 2: — | Rep. Seleção: — | Rep. Torcida: —", funcao: "MetLife + Hotel Seleção. Personagens, entrevistas, clima, notícias de última hora." },
      { frente: "DIGITAL — Redes Sociais", emoji: "📱", responsavel: "Social Media: — (×2) | Cinegrafista digital: — | Ed. redes: —", funcao: "Instagram, TikTok, X, YouTube. Conteúdo em tempo real durante toda a transmissão." },
      { frente: "LOGÍSTICA — Operacional", emoji: "🚗", responsavel: "Coord. Logística: — | Assistente: — | Motoristas: — (×3)", funcao: "Credenciamentos, frota, hospedagem, catering, comunicação com FIFA Media." },
    ],
    riscos: [
      { nivel: "critico", descricao: "CREDENCIAIS FIFA: sem credencial = sem entrada. Backup com Coord. Logística. Perda: ligar para — imediatamente." },
      { nivel: "critico", descricao: "LINK SATÉLITE: transmissão ao vivo depende de satélite. Provider: —. Técnico 24h: —. Plano B: fiber mobile backup." },
      { nivel: "moderado", descricao: "CLIMA: 20% de chuva. Locação 'Casa' pode ficar sem cobertura. Tenda reserva: a confirmar. Acionar protocolo com — min de antecedência." },
      { nivel: "moderado", descricao: "PERÍMETRO FIFA: equipe que perde a janela de acesso não entra. Horários de saída são IMPRORROGÁVEIS." },
    ],
    planosB: [
      { situacao: "Link satélite cai durante entrada ao vivo", solucao: "Acionar fiber mobile backup (30 seg). Se falhar, cortar para estúdio no Brasil com âncora de apoio. Host reentra na próxima janela." },
      { situacao: "Chuva intensa na locação 'Casa'", solucao: "Transferir link para base/estúdio local. Maquiagem e câmera já posicionadas lá como precaução desde o início da montagem." },
      { situacao: "Van atrasa — equipe não chega no MetLife", solucao: "Uber corporativo imediato. Se +30 min: equipe local FIFA Broadcast cobre posições. Coord. Logística aciona protocolo emergência." },
      { situacao: "Host impossibilitado de ir ao MetLife", solucao: "Entradas feitas da base via link. Comentarista — assume posição de campo no estádio." },
      { situacao: "Perda de credencial FIFA", solucao: "FIFA Credential Office: —. Sempre há set de credenciais backup com o Coord. de Logística." },
      { situacao: "Mudança de horário do jogo (FIFA)", solucao: "FIFA comunica com 4h de antecedência. Toda agenda de entradas ao vivo desloca no mesmo intervalo. Monitor: —." },
    ],
    destaques: [
      "DIA 1 — ABERTURA DA COBERTURA CAZÉTV NA COPA DO MUNDO FIFA 2026",
      "Estreia do Brasil — MetLife Stadium, East Rutherford, NJ",
      "5 entradas ao vivo do host em 3 locações diferentes",
      "Equipe CazéTV completa em campo",
    ],
    momentosChave: [
      { hora: "11h00", descricao: "1ª entrada ao vivo — abertura da cobertura" },
      { hora: "15h30", descricao: "Cerimônia pré-jogo — link ao vivo do bordão" },
      { hora: "16h00", descricao: "JOGO — transmissão ao vivo completa CazéTV" },
      { hora: "20h30", descricao: "Último link no venue — encerramento pós-jogo" },
    ],
    prioridades: [
      "Entradas ao vivo sem falhas técnicas — imagem e áudio são PRIORIDADE MÁXIMA.",
      "Cobertura emocional da torcida brasileira em solo americano — personagens reais.",
      "Flash pós-jogo com jogadores — acionar protocolo FIFA com antecedência.",
      "Redes sociais ativas durante TODO o jogo — conteúdo digital em tempo real.",
      "Imagens exclusivas da estreia do Brasil no MetLife Stadium.",
    ],
  },
];
