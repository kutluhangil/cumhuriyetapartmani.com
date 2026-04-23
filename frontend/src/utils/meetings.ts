export const meetingStatusConfig: Record<string, { label: string; cls: string }> = {
  completed: { label: 'Tamamlandı', cls: 'bg-green-100 text-green-700' },
  info:      { label: 'Bilgi',       cls: 'bg-blue-100 text-blue-700'  },
  important: { label: 'Önemli',     cls: 'bg-amber-100 text-amber-700' },
  archived:  { label: 'Arşiv',      cls: 'bg-gray-100 text-gray-700'   },
  planned:   { label: 'Planlandı',  cls: 'bg-slate-100 text-slate-700' },
};

export const MEETING_TYPES = [
  'OLAĞAN GENEL KURUL',
  'YÖNETİM KURULU',
  'ACİL TOPLANTI',
  'YILLIK TOPLANTI',
  'GENEL TOPLANTI',
];
