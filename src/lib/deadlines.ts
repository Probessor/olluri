// National deadlines that apply to all Norwegian businesses, shown on the
// events calendar every year regardless of filters.
export interface DeadlineEvent {
  _id: string
  title: string
  description?: string
  date: string // YYYY-MM-DD
  isDeadline: true
}

interface DeadlineDef {
  month: number // 1-indexed
  day: number
  title: string
  description: string
  // Only the 31 May deadline is documented as shifting to the next weekday
  // when it falls on a weekend — applied narrowly per that source.
  shiftWeekend?: boolean
}

const NATIONAL_DEADLINES: DeadlineDef[] = [
  { month: 1, day: 31, title: 'Aksjonærregisteroppgaven (RF-1086)', description: 'Aksjonærregisteroppgaven må leveres via Altinn.' },
  { month: 2, day: 15, title: 'Forskuddsskatt – 1. termin', description: 'Forskuddsskatt for forrige inntektsår betales i to terminer.' },
  { month: 4, day: 15, title: 'Forskuddsskatt – 2. termin', description: 'Forskuddsskatt for forrige inntektsår betales i to terminer.' },
  { month: 5, day: 31, title: 'Skattemelding for næringsdrivende', description: 'Skattemelding for næringsdrivende og næringsspesifikasjon. Flyttes til første virkedag hvis 31. mai faller på en helgedag.', shiftWeekend: true },
  { month: 6, day: 30, title: 'Godkjenning av årsregnskap', description: 'Årsregnskapet må godkjennes av ordinær generalforsamling.' },
  { month: 7, day: 31, title: 'Innsendelse av årsregnskap', description: 'Frist for innsendelse av godkjent årsregnskap til Regnskapsregisteret i Brønnøysund.' },
  { month: 7, day: 31, title: 'Oppgave over reelle rettighetshavere', description: 'Gjelder ved endringer, eller ved første gangs registrering.' },
]

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function shiftToWeekday(date: Date) {
  const day = date.getDay() // 0 = Sunday, 6 = Saturday
  if (day === 6) date.setDate(date.getDate() + 2)
  else if (day === 0) date.setDate(date.getDate() + 1)
  return date
}

export function getNationalDeadlines(year: number): DeadlineEvent[] {
  return NATIONAL_DEADLINES.map((d, i) => {
    const date = d.shiftWeekend ? shiftToWeekday(new Date(year, d.month - 1, d.day)) : new Date(year, d.month - 1, d.day)
    return {
      _id: `deadline-${year}-${i}`,
      title: d.title,
      description: d.description,
      date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      isDeadline: true as const,
    }
  })
}

export function getNationalDeadlinesForDate(dateStr: string): DeadlineEvent[] {
  const year = Number(dateStr.slice(0, 4))
  return getNationalDeadlines(year).filter(d => d.date === dateStr)
}
