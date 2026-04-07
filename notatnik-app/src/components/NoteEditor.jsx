import { createSignal } from 'solid-js';

export const NoteEditor = (props) => {
  const [title, setTitle] = createSignal('');
  const [content, setContent] = createSignal('');
  const [tagInput, setTagInput] = createSignal('');

  // Sync local state with selected note
  const loadNote = () => {
    if (props.note) {
      setTitle(props.note.title || '');
      setContent(props.note.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  };

  // Load note when selection changes
  let prevNoteId = null;
  const checkNoteChange = () => {
    if (props.note?.id !== prevNoteId) {
      prevNoteId = props.note?.id;
      loadNote();
    }
  };

  // Auto-save on changes
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (props.note) {
      props.updateNote(props.note.id, { title: newTitle });
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (props.note) {
      props.updateNote(props.note.id, { content: newContent });
    }
  };

  const handleAddTag = () => {
    const tag = tagInput().trim();
    if (tag && props.note && !props.note.tags.includes(tag)) {
      props.updateNote(props.note.id, {
        tags: [...props.note.tags, tag],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    if (props.note) {
      props.updateNote(props.note.id, {
        tags: props.note.tags.filter((t) => t !== tagToRemove),
      });
    }
  };

  const handleExportJSON = () => {
    if (!props.note) return;
    
    const dataStr = JSON.stringify(props.note, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${props.note.title || 'notatka'}-${props.note.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Check for note changes
  checkNoteChange();

  if (!props.note) {
    return (
      <main class="flex-1 flex items-center justify-center bg-gray-900 p-4">
        <div class="text-center text-gray-400">
          <p class="text-6xl mb-4">📝</p>
          <p class="text-xl">Wybierz notatkę lub utwórz nową</p>
        </div>
      </main>
    );
  }

  return (
    <main class="flex-1 flex flex-col bg-gray-900 h-full overflow-hidden">
      {/* Toolbar */}
      <div class="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <div class="flex items-center gap-2">
          <button
            onClick={() => props.togglePin(props.note.id)}
            class={`px-3 py-2 rounded-lg font-medium transition-colors ${
              props.note.pinned
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
            title={props.note.pinned ? 'Odepnij' : 'Przypnij'}
          >
            📌 {props.note.pinned ? 'Przypięta' : 'Przypnij'}
          </button>
          <button
            onClick={handleExportJSON}
            class="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium"
            title="Eksportuj notatkę do JSON"
          >
            📤 Eksportuj JSON
          </button>
        </div>
        <button
          onClick={() => {
            if (confirm('Czy na pewno chcesz usunąć tę notatkę?')) {
              props.deleteNote(props.note.id);
            }
          }}
          class="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium"
        >
          🗑️ Usuń
        </button>
      </div>

      {/* Editor */}
      <div class="flex-1 overflow-y-auto p-4 md:p-6">
        <input
          type="text"
          placeholder="Tytuł notatki..."
          value={title()}
          onInput={handleTitleChange}
          class="w-full text-2xl md:text-3xl font-bold bg-transparent border-none outline-none text-white mb-4 placeholder-gray-500"
        />

        {/* Tags */}
        <div class="flex flex-wrap items-center gap-2 mb-4">
          {props.note.tags.map((tag) => (
            <span
              key={tag}
              class="px-3 py-1 bg-blue-600 text-white rounded-full text-sm flex items-center gap-1"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                class="hover:text-red-300"
                title="Usuń tag"
              >
                ×
              </button>
            </span>
          ))}
          <div class="flex items-center gap-2">
            <input
              type="text"
              placeholder="Nowy tag..."
              value={tagInput()}
              onInput={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              class="px-3 py-1 bg-gray-700 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleAddTag}
              class="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded-full text-white text-sm"
            >
              + Dodaj
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div class="text-xs text-gray-500 mb-4">
          Utworzono: {new Date(props.note.createdAt).toLocaleString('pl-PL')}
        </div>

        {/* Content */}
        <textarea
          placeholder="Pisz swoją notatkę..."
          value={content()}
          onInput={handleContentChange}
          class="w-full h-[calc(100%-200px)] min-h-[300px] bg-transparent border-none outline-none text-white text-lg resize-none placeholder-gray-500"
        />
      </div>
    </main>
  );
};
