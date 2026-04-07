import { createSignal, createMemo } from 'solid-js';
import { Sidebar } from './components/Sidebar';
import { NoteEditor } from './components/NoteEditor';
import { useNotesStore } from './stores/notesStore';

function App() {
  const { notes, addNote, updateNote, deleteNote, togglePin } = useNotesStore();
  const [selectedNoteId, setSelectedNoteId] = createSignal(null);
  const [showSidebar, setShowSidebar] = createSignal(true);

  const selectedNote = createMemo(() => 
    notes.find((n) => n.id === selectedNoteId()) || null
  );

  const handleCreateNote = () => {
    const newNote = {
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      tags: [],
      pinned: false,
    };
    addNote(newNote);
    // Select the newly created note
    setTimeout(() => {
      const latestNote = notes[notes.length - 1];
      if (latestNote) {
        setSelectedNoteId(latestNote.id);
      }
    }, 0);
  };

  const handleExportAllJSON = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notatnik-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div class="flex flex-col h-screen bg-gray-900">
      {/* Mobile Header */}
      <header class="md:hidden flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <button
          onClick={() => setShowSidebar(!showSidebar())}
          class="p-2 text-white"
        >
          ☰ Menu
        </button>
        <h1 class="text-lg font-bold text-white">Notatnik</h1>
        <button
          onClick={handleCreateNote}
          class="p-2 bg-blue-600 rounded-lg text-white"
        >
          + Nowa
        </button>
      </header>

      <div class="flex flex-1 overflow-hidden">
        {/* Sidebar - responsive */}
        <div
          class={`${
            showSidebar() ? 'block' : 'hidden'
          } md:block absolute md:relative z-10 w-full md:w-auto h-full`}
        >
          <Sidebar
            notes={notes}
            selectedNoteId={selectedNoteId()}
            onSelectNote={(id) => {
              setSelectedNoteId(id);
              setShowSidebar(false);
            }}
            updateNote={updateNote}
          />
        </div>

        {/* Main Content */}
        <div class="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Toolbar */}
          <div class="hidden md:flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
            <div class="flex items-center gap-4">
              <button
                onClick={handleCreateNote}
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                + Nowa notatka
              </button>
              <span class="text-gray-400 text-sm">
                {notes.length} notatek
              </span>
            </div>
            <button
              onClick={handleExportAllJSON}
              class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
              title="Eksportuj wszystkie notatki do JSON"
            >
              📤 Eksportuj wszystko
            </button>
          </div>

          {/* Editor */}
          <NoteEditor
            note={selectedNote()}
            updateNote={updateNote}
            deleteNote={deleteNote}
            togglePin={togglePin}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
