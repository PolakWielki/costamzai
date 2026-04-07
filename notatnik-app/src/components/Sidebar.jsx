import { createSignal } from 'solid-js';

export const Sidebar = (props) => {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [newTagInput, setNewTagInput] = createSignal('');

  const filteredNotes = () => {
    const query = searchQuery().toLowerCase().trim();
    if (!query) return props.notes;

    return props.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  };

  const sortedNotes = () => {
    const pinned = filteredNotes().filter((n) => n.pinned);
    const unpinned = filteredNotes().filter((n) => !n.pinned);
    return [...pinned, ...unpinned];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddTagToSelectedNote = () => {
    const tag = newTagInput().trim();
    if (tag && props.selectedNoteId) {
      const note = props.notes.find((n) => n.id === props.selectedNoteId);
      if (note && !note.tags.includes(tag)) {
        props.updateNote(props.selectedNoteId, {
          tags: [...note.tags, tag],
        });
      }
      setNewTagInput('');
    }
  };

  return (
    <aside class="w-full md:w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div class="p-4 border-b border-gray-700">
        <h1 class="text-xl font-bold text-white mb-3">📝 Notatnik</h1>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Szukaj po tytule lub tagach..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.target.value)}
          class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notes List */}
      <div class="flex-1 overflow-y-auto p-2">
        {sortedNotes().length === 0 ? (
          <p class="text-gray-400 text-center py-4">Brak notatek</p>
        ) : (
          sortedNotes().map((note) => (
            <div
              onClick={() => props.onSelectNote(note.id)}
              class={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                props.selectedNoteId === note.id
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-white truncate flex items-center gap-2">
                    {note.pinned && <span>📌</span>}
                    {note.title || 'Bez tytułu'}
                  </h3>
                  <p class="text-xs text-gray-400 mt-1">{formatDate(note.createdAt)}</p>
                  {note.tags.length > 0 && (
                    <div class="flex flex-wrap gap-1 mt-2">
                      {note.tags.map((tag) => (
                        <span class="px-2 py-0.5 bg-gray-600 text-gray-300 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Add Tag for Selected Note */}
      {props.selectedNoteId && (
        <div class="p-3 border-t border-gray-700">
          <div class="flex gap-2">
            <input
              type="text"
              placeholder="Dodaj tag..."
              value={newTagInput()}
              onInput={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTagToSelectedNote()}
              class="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleAddTagToSelectedNote}
              class="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium"
            >
              Dodaj
            </button>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      <div class="p-3 border-t border-gray-700 text-xs text-gray-400 text-center">
        {props.notes.length} notatek • {props.notes.filter(n => n.pinned).length} przypiętych
      </div>
    </aside>
  );
};
