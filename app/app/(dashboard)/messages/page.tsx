'use client';

import { useState } from 'react';
import { Send, ArrowLeft, Search } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  from: 'me' | 'them';
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

const BASE = 'https://images.unsplash.com/photo';

const conversations: Conversation[] = [
  {
    id: 'c-001',
    name: 'DJ Miguel Santos',
    avatar: `${BASE}-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face`,
    lastMessage: 'Claro, puedo llegar a las 8pm.',
    time: 'Hace 5 min',
    unread: 2,
    messages: [
      { id: 'm1', text: 'Hola Miguel, ¿estás disponible el 15 de febrero para una boda?', from: 'me', time: '10:30' },
      { id: 'm2', text: '¡Hola! Sí, tengo disponibilidad ese día. ¿En qué horario necesitan el servicio?', from: 'them', time: '10:35' },
      { id: 'm3', text: 'La ceremonia empieza a las 7pm y la recepción hasta las 2am.', from: 'me', time: '10:40' },
      { id: 'm4', text: 'Perfecto, ese horario funciona bien. ¿Cuántos invitados esperan?', from: 'them', time: '10:42' },
      { id: 'm5', text: 'Aproximadamente 150 personas.', from: 'me', time: '10:45' },
      { id: 'm6', text: 'Claro, puedo llegar a las 8pm.', from: 'them', time: '10:50' }
    ]
  },
  {
    id: 'c-002',
    name: 'Salón El Caribe',
    avatar: `${BASE}-1519167758481-83f550bb49b3?w=80&h=80&fit=crop`,
    lastMessage: 'El depósito es del 30% para reservar.',
    time: 'Ayer',
    unread: 0,
    messages: [
      { id: 'm1', text: '¿Tienen disponibilidad para el 20 de marzo?', from: 'me', time: '09:00' },
      { id: 'm2', text: 'Sí, esa fecha está libre. ¿Cuántas personas?', from: 'them', time: '09:15' },
      { id: 'm3', text: 'Serían 200 personas para una quinceañera.', from: 'me', time: '09:20' },
      { id: 'm4', text: 'Perfecto, contamos con capacidad para 300. ¿Quieres que te enviemos el cotización?', from: 'them', time: '09:30' },
      { id: 'm5', text: 'Sí, por favor.', from: 'me', time: '09:35' },
      { id: 'm6', text: 'El depósito es del 30% para reservar.', from: 'them', time: '09:40' }
    ]
  },
  {
    id: 'c-003',
    name: 'Carlos Fotografías',
    avatar: `${BASE}-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face`,
    lastMessage: '¿Prefieres el paquete básico o el completo?',
    time: 'Lun',
    unread: 1,
    messages: [
      { id: 'm1', text: 'Hola Carlos, vi tu portafolio y me encantaron las fotos.', from: 'me', time: '14:00' },
      { id: 'm2', text: '¡Muchas gracias! ¿Para qué tipo de evento es?', from: 'them', time: '14:10' },
      { id: 'm3', text: 'Una boda íntima de 50 personas en marzo.', from: 'me', time: '14:15' },
      { id: 'm4', text: '¿Prefieres el paquete básico o el completo?', from: 'them', time: '14:20' }
    ]
  },
  {
    id: 'c-004',
    name: 'Chef Marco Rosario',
    avatar: `${BASE}-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face`,
    lastMessage: 'Puedo preparar un menú de degustación.',
    time: 'Dom',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Chef Marco, ¿ofrece servicio para cenas privadas de empresa?', from: 'me', time: '18:00' },
      { id: 'm2', text: 'Sí claro, es mi especialidad.', from: 'them', time: '18:30' },
      { id: 'm3', text: 'Sería para 20 ejecutivos, cena formal.', from: 'me', time: '18:35' },
      { id: 'm4', text: 'Puedo preparar un menú de degustación.', from: 'them', time: '18:45' }
    ]
  }
];

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [msgMap, setMsgMap] = useState<Record<string, Message[]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  );
  const [search, setSearch] = useState('');

  const selected = conversations.find((c) => c.id === selectedId);
  const messages = selectedId ? (msgMap[selectedId] ?? []) : [];

  const filteredConvs = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  function sendMessage() {
    if (!newMessage.trim() || !selectedId) return;
    const msg: Message = {
      id: `m-${Date.now()}`,
      text: newMessage.trim(),
      from: 'me',
      time: new Date().toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })
    };
    setMsgMap((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] ?? []), msg] }));
    setNewMessage('');
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Conversation list ── */}
      <div
        className={`${selectedId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-72 bg-white border-r border-gray-200 flex-shrink-0`}
      >
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-900">Mensajes</h1>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar conversación..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#7C3AED]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 ${
                selectedId === c.id ? 'bg-purple-50 border-l-2 border-l-[#7C3AED]' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <img src={c.avatar} alt={c.name} className="h-11 w-11 rounded-full object-cover" />
                {c.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#7C3AED] text-white text-[10px] font-bold flex items-center justify-center">
                    {c.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                  <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{c.time}</p>
                </div>
                <p className={`text-xs mt-0.5 truncate ${c.unread > 0 ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                  {c.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat pane ── */}
      {!selectedId ? (
        <div className="hidden md:flex flex-1 items-center justify-center text-center">
          <div>
            <span className="text-6xl">💬</span>
            <p className="mt-3 text-lg font-semibold text-gray-700">Selecciona una conversación</p>
            <p className="text-sm text-gray-400 mt-1">Elige un chat de la lista para empezar</p>
          </div>
        </div>
      ) : (
        <div className={`${selectedId ? 'flex' : 'hidden md:flex'} flex-1 flex-col overflow-hidden`}>
          {/* Chat header */}
          <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center gap-3 flex-shrink-0">
            <button onClick={() => setSelectedId(null)} className="md:hidden text-gray-500 hover:text-gray-800 mr-1">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <img src={selected?.avatar} alt={selected?.name} className="h-9 w-9 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">{selected?.name}</p>
              <p className="text-xs text-green-500 font-medium">En línea</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'them' && (
                  <img src={selected?.avatar} alt="" className="h-7 w-7 rounded-full object-cover mr-2 flex-shrink-0 mt-0.5" />
                )}
                <div
                  className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                    msg.from === 'me'
                      ? 'text-white rounded-br-md'
                      : 'bg-white text-gray-900 rounded-bl-md border border-gray-100'
                  }`}
                  style={msg.from === 'me' ? { background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' } : undefined}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.from === 'me' ? 'text-purple-200' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-gray-200 flex gap-2 flex-shrink-0">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="h-10 w-10 flex items-center justify-center rounded-xl text-white disabled:opacity-40 transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
