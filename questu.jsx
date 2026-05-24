import { useState } from "react";

const questions = [
  {
    id: "Q4054703", num: 5,
    disciplina: "Educação Física", assunto: "Desenvolvimento Motor",
    ano: 2026, banca: "FUNDATEC", orgao: "Pref. Pinheiro Preto - SC",
    dificuldade: "Média", acertos: 62,
    enunciado: "Um modelo de desenvolvimento humano elaborado por Arnold Gesell (1928; 1954) enfatiza a maturação do sistema nervoso como principal condutor dos aspectos físicos e motores do comportamento humano. Esse modelo denomina-se:",
    alternativas: [
      { letra: "A", texto: "Teoria ecológica do desenvolvimento motor." },
      { letra: "B", texto: "Teoria do desenvolvimento cognitivo." },
      { letra: "C", texto: "Teoria da ampulheta." },
      { letra: "D", texto: "Teoria da maturação." },
    ],
    gabarito: "D",
    comentario: "A Teoria da Maturação de Gesell enfatiza que o desenvolvimento motor é determinado por fatores biológicos e neurológicos, seguindo uma sequência previsível baseada na maturação do sistema nervoso central.",
  },
  {
    id: "Q4054704", num: 4,
    disciplina: "Educação Física", assunto: "Fisiologia do Exercício",
    ano: 2026, banca: "FUNDATEC", orgao: "Pref. Pinheiro Preto - SC",
    dificuldade: "Alta", acertos: 45,
    enunciado: "Quando um esforço é mantido por mais de 20 minutos em intensidade constante, o organismo utiliza prioritariamente o metabolismo _____. À medida que a intensidade aumenta, a participação _____ cresce até se tornar a principal fonte de energia (limiar _____).",
    alternativas: [
      { letra: "A", texto: "oxidativo – aeróbica – aeróbico" },
      { letra: "B", texto: "aeróbico – anaeróbica – anaeróbico" },
      { letra: "C", texto: "fosfagênio – aeróbica – ventilatório" },
      { letra: "D", texto: "glicolítico – oxidativa – metabólico" },
    ],
    gabarito: "A",
    comentario: "O metabolismo oxidativo (aeróbico) predomina em esforços prolongados de baixa a moderada intensidade. Com o aumento da intensidade, o metabolismo anaeróbico começa a contribuir mais, atingindo o limiar anaeróbico.",
  },
  {
    id: "Q4054705", num: 6,
    disciplina: "Direito Constitucional", assunto: "Princípios Fundamentais",
    ano: 2025, banca: "CESPE", orgao: "TRF 1ª Região",
    dificuldade: "Baixa", acertos: 78,
    enunciado: "Com base nos fundamentos da República Federativa do Brasil previstos na Constituição Federal de 1988, assinale a opção correta:",
    alternativas: [
      { letra: "A", texto: "A soberania popular é exercida exclusivamente pelo voto direto." },
      { letra: "B", texto: "A dignidade da pessoa humana é um dos fundamentos da República." },
      { letra: "C", texto: "Os valores sociais do trabalho não integram os fundamentos da República." },
      { letra: "D", texto: "O pluralismo político é vedado pelo texto constitucional." },
    ],
    gabarito: "B",
    comentario: "O art. 1º da CF/88 elenca como fundamentos: soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa, e pluralismo político.",
  },
];

function QuestionCard({ q, onClick, result }) {
  const diffColor = { Baixa: "#10b981", Média: "#f59e0b", Alta: "#ef4444" };
  return (
    <div
      onClick={() => onClick(q)}
      style={{
        background: "white",
        borderRadius: 20,
        border: "1.5px solid #ede9fe",
        padding: 16,
        marginBottom: 12,
        cursor: "pointer",
        boxShadow: "0 2px 12px rgba(139,92,246,0.07)",
        transition: "box-shadow 0.2s, transform 0.2s",
        borderLeft: "4px solid #a855f7",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ background: "#ede9fe", color: "#7c3aed", borderRadius: 8, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{q.id}</span>
        <span style={{ background: diffColor[q.dificuldade] + "22", color: diffColor[q.dificuldade], borderRadius: 8, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{q.dificuldade}</span>
        {result !== undefined && (
          <span style={{ background: result ? "#d1fae5" : "#fee2e2", color: result ? "#059669" : "#dc2626", borderRadius: 8, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
            {result ? "✓ Certa" : "✗ Errada"}
          </span>
        )}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#a78bfa", fontWeight: 600 }}>{q.acertos}% acertos</span>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.5, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {q.enunciado}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: "#7c3aed", fontWeight: 600 }}>{q.disciplina}</span>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>• {q.assunto}</span>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>• {q.ano}</span>
        <span style={{ fontSize: 11, color: "#d946ef", fontWeight: 600 }}>• {q.banca}</span>
      </div>
    </div>
  );
}

function QuestionView({ q, onBack, onNext, answers, setAnswers }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleRespond = () => {
    if (!selected) return;
    setRevealed(true);
    setAnswers(a => ({ ...a, [q.id]: selected === q.gabarito }));
  };

  const correct = answers[q.id] !== undefined ? answers[q.id] : null;

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Back + meta */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <button
          onClick={onBack}
          style={{ width: 36, height: 36, borderRadius: 12, background: "#ede9fe", border: "none", cursor: "pointer", fontSize: 16, color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}
        >←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>{q.disciplina} › {q.assunto}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ background: "#ede9fe", color: "#7c3aed", borderRadius: 8, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{q.id}</span>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>{q.ano} · {q.banca}</span>
          </div>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 12, background: "#faf5ff", border: "none", cursor: "pointer", fontSize: 16 }}>🔖</button>
      </div>

      {/* Meta band */}
      <div style={{ background: "#faf5ff", borderRadius: 16, padding: "12px 16px", marginBottom: 16, border: "1px solid #ede9fe" }}>
        <div style={{ display: "flex", gap: 20, fontSize: 12, flexWrap: "wrap" }}>
          <span><span style={{ color: "#9ca3af" }}>Ano: </span><b style={{ color: "#1f2937" }}>{q.ano}</b></span>
          <span><span style={{ color: "#9ca3af" }}>Banca: </span><b style={{ color: "#d946ef" }}>{q.banca}</b></span>
          <span><span style={{ color: "#9ca3af" }}>Órgão: </span><b style={{ color: "#7c3aed" }}>{q.orgao}</b></span>
        </div>
      </div>

      {/* Enunciado */}
      <div style={{ background: "white", borderRadius: 20, padding: 20, marginBottom: 16, border: "1.5px solid #ede9fe", boxShadow: "0 2px 12px rgba(139,92,246,0.06)" }}>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#374151", margin: 0 }}>{q.enunciado}</p>
      </div>

      {/* Alternativas */}
      <div style={{ marginBottom: 16 }}>
        {q.alternativas.map(alt => {
          let bg = "white", border = "1.5px solid #e5e7eb", circBg = "#f3f4f6", circColor = "#6b7280", textColor = "#374151";
          if (!revealed) {
            if (selected === alt.letra) { bg = "#faf5ff"; border = "2px solid #a855f7"; circBg = "#a855f7"; circColor = "white"; }
          } else {
            if (alt.letra === q.gabarito) { bg = "#f0fdf4"; border = "2px solid #34d399"; circBg = "#10b981"; circColor = "white"; }
            else if (selected === alt.letra && alt.letra !== q.gabarito) { bg = "#fff1f2"; border = "2px solid #fca5a5"; circBg = "#f87171"; circColor = "white"; textColor = "#6b7280"; }
            else { bg = "#fafafa"; border = "1.5px solid #f3f4f6"; textColor = "#9ca3af"; }
          }
          return (
            <div
              key={alt.letra}
              onClick={() => !revealed && setSelected(alt.letra)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: bg, border, borderRadius: 16, marginBottom: 8, cursor: revealed ? "default" : "pointer", transition: "all 0.2s" }}
            >
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: circBg, color: circColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                {alt.letra}
              </div>
              <span style={{ fontSize: 14, color: textColor, lineHeight: 1.4, flex: 1 }}>{alt.texto}</span>
              {revealed && alt.letra === q.gabarito && <span style={{ fontSize: 18 }}>✓</span>}
              {revealed && selected === alt.letra && alt.letra !== q.gabarito && <span style={{ fontSize: 18 }}>✗</span>}
            </div>
          );
        })}
      </div>

      {/* Botão responder */}
      {!revealed && (
        <button
          onClick={handleRespond}
          style={{
            width: "100%", padding: "16px", borderRadius: 16, border: "none", cursor: selected ? "pointer" : "not-allowed",
            background: selected ? "linear-gradient(135deg, #a855f7, #d946ef)" : "#f3f4f6",
            color: selected ? "white" : "#9ca3af", fontWeight: 700, fontSize: 15,
            boxShadow: selected ? "0 4px 20px rgba(168,85,247,0.3)" : "none", transition: "all 0.2s",
          }}
        >
          Responder
        </button>
      )}

      {/* Resultado */}
      {revealed && (
        <div style={{ borderRadius: 16, padding: 16, borderLeft: "4px solid", borderColor: correct ? "#10b981" : "#f87171", background: correct ? "#f0fdf4" : "#fff1f2", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{correct ? "🎉" : "😔"}</span>
            <b style={{ color: correct ? "#059669" : "#dc2626", fontSize: 15 }}>
              {correct ? "Resposta Correta!" : `Incorreta. Gabarito: ${q.gabarito}`}
            </b>
          </div>
          <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, margin: "0 0 12px" }}>{q.comentario}</p>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#9ca3af" }}>
            <span>✅ {q.acertos}% de acertos</span>
            <span>⏱️ ~2 min</span>
          </div>
        </div>
      )}

      {/* Navegação */}
      {revealed && (
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onBack} style={{ flex: 1, padding: 14, borderRadius: 14, background: "white", border: "1.5px solid #ede9fe", color: "#7c3aed", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            ← Voltar
          </button>
          <button onClick={onNext} style={{ flex: 1, padding: 14, borderRadius: 14, background: "linear-gradient(135deg, #a855f7, #d946ef)", border: "none", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 16px rgba(168,85,247,0.3)" }}>
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
}

function UploadModal({ onClose }) {
  const [step, setStep] = useState("idle");
  const [progress, setProgress] = useState(0);

  const start = () => {
    setStep("processing");
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => setStep("done"), 400); }
      setProgress(Math.round(p));
    }, 200);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 480, background: "white", borderRadius: 28, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f3e8ff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#1f2937" }}>Upload de PDF</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>A IA extrai as questões automaticamente</div>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 10, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280" }}>✕</button>
        </div>
        <div style={{ padding: 20 }}>
          {step === "idle" && (
            <div
              onClick={start}
              style={{ border: "2px dashed #c4b5fd", borderRadius: 20, padding: 40, textAlign: "center", cursor: "pointer", background: "#faf5ff" }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
              <div style={{ fontWeight: 700, color: "#374151", marginBottom: 4 }}>Arraste seu PDF aqui</div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>ou clique para selecionar</div>
              <div style={{ fontSize: 12, color: "#a78bfa", fontWeight: 600 }}>Provas, apostilas, listas de questões</div>
            </div>
          )}
          {step === "processing" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 64, height: 64, margin: "0 auto 16px", position: "relative" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", border: "4px solid #ede9fe", position: "absolute" }} />
                <div style={{ width: 64, height: 64, borderRadius: "50%", border: "4px solid transparent", borderTopColor: "#a855f7", position: "absolute", animation: "spin 0.8s linear infinite" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#7c3aed" }}>{progress}%</div>
              </div>
              <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 4 }}>Processando com IA...</div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>Detectando questões, alternativas e gabaritos</div>
              <div style={{ height: 8, background: "#ede9fe", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "linear-gradient(90deg, #a855f7, #d946ef)", borderRadius: 8, width: progress + "%", transition: "width 0.3s" }} />
              </div>
            </div>
          )}
          {step === "done" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: "#1f2937", marginBottom: 4 }}>47 questões extraídas!</div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>Adicionadas ao banco de questões</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[["3", "Disciplinas"], ["2", "Bancas"], ["4", "Anos"]].map(([v, l]) => (
                  <div key={l} style={{ background: "#faf5ff", borderRadius: 14, padding: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#7c3aed" }}>{v}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{l}</div>
                  </div>
                ))}
              </div>
              <button onClick={onClose} style={{ width: "100%", padding: 14, borderRadius: 14, background: "linear-gradient(135deg, #a855f7, #d946ef)", border: "none", color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                Ver questões →
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [activeQ, setActiveQ] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showUpload, setShowUpload] = useState(false);
  const [dark, setDark] = useState(false);

  const openQ = (q) => { setActiveQ(q); setView("question"); };
  const nextQ = () => {
    const idx = questions.findIndex(q => q.id === activeQ.id);
    if (idx < questions.length - 1) setActiveQ(questions[idx + 1]);
    else setView("questions");
  };

  const bg = dark ? "#0f0b1a" : "#faf5ff";
  const card = dark ? "#1a1028" : "white";
  const text = dark ? "#f3f4f6" : "#1f2937";
  const sub = dark ? "#9ca3af" : "#6b7280";
  const border = dark ? "#2d1f4a" : "#ede9fe";

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "'Outfit', 'DM Sans', system-ui, sans-serif", color: text, transition: "all 0.3s" }}>

      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: dark ? "rgba(26,16,40,0.92)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 540, margin: "0 auto", padding: "0 16px", height: 56, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #a855f7, #d946ef)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: 16, boxShadow: "0 4px 12px rgba(168,85,247,0.35)" }}>Q</div>
          <span style={{ fontWeight: 900, fontSize: 20, background: "linear-gradient(90deg, #7c3aed, #d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -0.5 }}>Questu</span>
          <div style={{ flex: 1 }} />
          <button onClick={() => setDark(d => !d)} style={{ width: 34, height: 34, borderRadius: 10, background: dark ? "#2d1f4a" : "#f3e8ff", border: "none", cursor: "pointer", fontSize: 16 }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setShowUpload(true)}
            style={{ padding: "7px 14px", background: "linear-gradient(135deg, #a855f7, #d946ef)", border: "none", borderRadius: 10, color: "white", fontWeight: 700, fontSize: 12, cursor: "pointer", boxShadow: "0 2px 10px rgba(168,85,247,0.3)" }}
          >
            📤 Upload PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "20px 16px 90px" }}>

        {/* HOME */}
        {view === "home" && (
          <div>
            {/* Hero */}
            <div style={{ borderRadius: 24, padding: 20, background: "linear-gradient(135deg, #7c3aed, #a855f7, #d946ef)", color: "white", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Bom dia! 👋</div>
                <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.2 }}>Bora estudar hoje!</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 }}>4</div>
                <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.25)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "34%", height: "100%", background: "white", borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 11, opacity: 0.8 }}>340/1000 XP</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, background: "rgba(255,255,255,0.18)", borderRadius: 10, padding: "6px 12px", width: "fit-content" }}>
                <span>🔥</span><span style={{ fontWeight: 700, fontSize: 13 }}>7 dias seguidos</span>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[["✅", "Questões Resolvidas", "248"], ["🎯", "Taxa de Acertos", "71%"], ["⏱️", "Horas Estudadas", "32h"], ["📚", "Simulados", "12"]].map(([ico, label, val]) => (
                <div key={label} style={{ background: card, borderRadius: 18, border: `1.5px solid ${border}`, padding: 16, boxShadow: "0 2px 10px rgba(139,92,246,0.07)" }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{ico}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: text }}>{val}</div>
                  <div style={{ fontSize: 11, color: sub }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ background: card, borderRadius: 20, border: `1.5px solid ${border}`, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Ação Rápida</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[["📝", "Resolver Questões", "questions"], ["⏱️", "Simulado", "simulado"], ["📤", "Upload PDF", "upload"], ["📊", "Estatísticas", "stats"]].map(([ico, lbl, action]) => (
                  <button
                    key={lbl}
                    onClick={() => action === "upload" ? setShowUpload(true) : setView(action)}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, background: dark ? "#2d1f4a" : "#faf5ff", border: "none", borderRadius: 14, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
                  >
                    <span style={{ fontSize: 20 }}>{ico}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: text }}>{lbl}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent questions */}
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: text }}>Questões Recentes</div>
              <button onClick={() => setView("questions")} style={{ fontSize: 12, color: "#a855f7", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Ver todas →</button>
            </div>
            {questions.slice(0, 2).map(q => <QuestionCard key={q.id} q={q} onClick={openQ} result={answers[q.id]} />)}
          </div>
        )}

        {/* QUESTIONS */}
        {view === "questions" && !activeQ && (
          <div>
            <div style={{ fontSize: 11, color: sub, marginBottom: 12 }}>
              <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: "#a855f7", cursor: "pointer", fontSize: 11 }}>Home</button>
              {" / Questões"}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: text }}>
                Questões de <span style={{ background: "linear-gradient(90deg, #7c3aed, #d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Concursos</span>
              </div>
              <div style={{ fontSize: 13, color: sub, marginTop: 4 }}>{questions.length} questões encontradas</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: card, border: `1.5px solid ${border}`, borderRadius: 16 }}>
                <span style={{ color: sub }}>🔍</span>
                <input placeholder="Buscar questões..." style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: text }} />
              </div>
              <button style={{ padding: "10px 18px", background: "linear-gradient(135deg, #a855f7, #d946ef)", border: "none", borderRadius: 16, color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                Filtros
              </button>
            </div>
            {questions.map(q => <QuestionCard key={q.id} q={q} onClick={openQ} result={answers[q.id]} />)}
          </div>
        )}

        {/* QUESTION DETAIL */}
        {view === "question" && activeQ && (
          <QuestionView
            q={activeQ}
            onBack={() => { setView("questions"); setActiveQ(null); }}
            onNext={nextQ}
            answers={answers}
            setAnswers={setAnswers}
          />
        )}

        {/* SIMULADO */}
        {view === "simulado" && (
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: text, marginBottom: 4 }}>
              Criar <span style={{ background: "linear-gradient(90deg, #7c3aed, #d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Simulado</span>
            </div>
            <div style={{ fontSize: 13, color: sub, marginBottom: 20 }}>Configure seu simulado personalizado</div>

            <div style={{ background: card, border: `1.5px solid ${border}`, borderRadius: 20, padding: 20, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Disciplinas</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Educação Física", "Direito Constitucional", "Português", "Matemática"].map(d => (
                  <button key={d} style={{ padding: "6px 14px", background: "#ede9fe", color: "#7c3aed", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{d}</button>
                ))}
              </div>
            </div>

            <div style={{ background: card, border: `1.5px solid ${border}`, borderRadius: 20, padding: 20, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Nº de Questões</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[10, 20, 30, 50].map(n => (
                  <button key={n} style={{ flex: 1, padding: 12, borderRadius: 12, border: "none", background: n === 20 ? "linear-gradient(135deg, #a855f7, #d946ef)" : dark ? "#2d1f4a" : "#f3e8ff", color: n === 20 ? "white" : "#7c3aed", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>{n}</button>
                ))}
              </div>
            </div>

            <div style={{ background: card, border: `1.5px solid ${border}`, borderRadius: 20, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Tempo</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["30min", "1h", "2h", "∞"].map(t => (
                  <button key={t} style={{ flex: 1, padding: 12, borderRadius: 12, border: "none", background: t === "1h" ? "linear-gradient(135deg, #d946ef, #a855f7)" : dark ? "#2d1f4a" : "#f3e8ff", color: t === "1h" ? "white" : "#7c3aed", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>{t}</button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setView("questions")}
              style={{ width: "100%", padding: 16, borderRadius: 16, background: "linear-gradient(135deg, #7c3aed, #a855f7, #d946ef)", border: "none", color: "white", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 6px 24px rgba(168,85,247,0.35)" }}
            >
              🚀 Iniciar Simulado
            </button>
          </div>
        )}

        {/* STATS */}
        {view === "stats" && (
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: text, marginBottom: 20 }}>
              Meu <span style={{ background: "linear-gradient(90deg, #7c3aed, #d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Desempenho</span>
            </div>

            <div style={{ background: card, border: `1.5px solid ${border}`, borderRadius: 20, padding: 20, marginBottom: 14 }}>
              <div style={{ fontWeight: 700, color: text, marginBottom: 14 }}>Por Disciplina</div>
              {[["Educação Física", 71], ["Direito Constitucional", 68], ["Português", 65], ["Matemática", 42], ["Raciocínio Lógico", 58]].map(([d, p]) => (
                <div key={d} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                    <span style={{ color: text }}>{d}</span>
                    <b style={{ color: p >= 70 ? "#10b981" : p >= 55 ? "#f59e0b" : "#ef4444" }}>{p}%</b>
                  </div>
                  <div style={{ height: 8, background: dark ? "#2d1f4a" : "#f3e8ff", borderRadius: 6 }}>
                    <div style={{ height: "100%", borderRadius: 6, width: p + "%", background: p >= 70 ? "linear-gradient(90deg, #10b981, #34d399)" : p >= 55 ? "linear-gradient(90deg, #f59e0b, #fbbf24)" : "linear-gradient(90deg, #ef4444, #f87171)", transition: "width 0.7s" }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: card, border: `1.5px solid ${border}`, borderRadius: 20, padding: 20 }}>
              <div style={{ fontWeight: 700, color: text, marginBottom: 14 }}>🏆 Conquistas</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[["🔥", "7 Dias", true], ["💯", "Perfeito", true], ["📚", "100 Qs", true], ["⚡", "Veloz", false], ["🎯", "Expert", false], ["🌟", "Estrela", false]].map(([ico, n, e]) => (
                  <div key={n} style={{ borderRadius: 14, padding: 12, textAlign: "center", background: e ? (dark ? "#2d1f4a" : "#faf5ff") : dark ? "#1a1028" : "#f9fafb", border: `1.5px solid ${e ? "#c4b5fd" : border}`, opacity: e ? 1 : 0.5 }}>
                    <div style={{ fontSize: 26, marginBottom: 4, filter: e ? "none" : "grayscale(1)" }}>{ico}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: e ? "#7c3aed" : sub }}>{n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, background: dark ? "rgba(26,16,40,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 540, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          {[["🏠", "Início", "home"], ["📝", "Questões", "questions"], ["⏱️", "Simulado", "simulado"], ["📊", "Stats", "stats"]].map(([ico, lbl, id]) => (
            <button
              key={id}
              onClick={() => { setView(id); setActiveQ(null); }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 16px", background: "none", border: "none", cursor: "pointer" }}
            >
              <span style={{ fontSize: 22, transform: view === id ? "scale(1.15)" : "scale(1)", transition: "transform 0.15s" }}>{ico}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: view === id ? "#a855f7" : sub }}>{lbl}</span>
              {view === id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#a855f7" }} />}
            </button>
          ))}
        </div>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}
