/** تلوين كود بلا مكتبة: تعليق · نص · كلمة مفتاحية · دالة. يعمل في الخادم والمتصفح. */
const KEY: Record<string, RegExp> = {
  dax: /\b(VAR|RETURN|TRUE|FALSE|IN|NOT|AND|OR)\b/g,
  m: /\b(let|in|each|type|if|then|else|true|false|null)\b/g,
  sql: /\b(select|from|where|with|as|and|or|not|exists|between|insert|into|delete|using|join|on|begin|commit|rollback|count|case|when|then|else|end|if|raise|exception|do|declare|language|group|by|order)\b/gi,
  python: /\b(def|for|in|if|else|elif|return|from|import|and|or|not|lambda|True|False|None)\b/g,
};
const COMMENT: Record<string, RegExp> = { dax: /\/\/.*$|--.*$/, m: /\/\/.*$/, sql: /--.*$/, python: /#.*$/ };

type Tok = { t: string; c?: string };

function tokenize(line: string, lang: string): Tok[] {
  const com = line.match(COMMENT[lang] ?? /$^/);
  const body = com ? line.slice(0, com.index) : line;
  const out: Tok[] = [];
  // النص بين علامتي تنصيص يقطع أولا، لئلا تلون كلمة مفتاحية داخله
  for (const part of body.split(/("[^"]*"|'[^']*')/g)) {
    if (!part) continue;
    if (/^["']/.test(part) && !(lang === "dax" && part[0] === "'")) {
      out.push({ t: part, c: "fo-c-str" });
      continue;
    }
    let last = 0;
    const key = KEY[lang] ?? /$^/g;
    const re = new RegExp(String.raw`(?<key>${key.source})|(?<fn>\b[A-Za-z_][A-Za-z_.]*(?=\s*\())`, key.flags);
    for (const m of part.matchAll(re)) {
      if (m.index > last) out.push({ t: part.slice(last, m.index) });
      out.push({ t: m[0], c: m.groups?.key ? "fo-c-key" : "fo-c-fn" });
      last = m.index + m[0].length;
    }
    if (last < part.length) out.push({ t: part.slice(last) });
  }
  if (com) out.push({ t: com[0], c: "fo-c-com" });
  return out;
}

export default function Code({ code, lang, label }: { code: string; lang: "dax" | "m" | "sql" | "python"; label?: string }) {
  return (
    <figure className="fo-code">
      {label && <figcaption>{label}</figcaption>}
      <pre dir="ltr" tabIndex={0}>
        <code>
          {code.split("\n").map((line, i) => (
            <span key={i} className="block min-h-[1.5em]">
              {tokenize(line, lang).map((k, j) => (k.c ? <span key={j} className={k.c}>{k.t}</span> : k.t))}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
