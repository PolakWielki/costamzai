# Notatnik Offline - SolidJS App

Kompletna aplikacja typu Notatnik zbudowana w **SolidJS** z **Tailwind CSS**, działająca w 100% offline z danymi przechowywanymi w LocalStorage.

## ✨ Funkcje

- **Zarządzanie notatkami**: Dodawanie, edytowanie, usuwanie oraz oznaczanie jako "przypięte"
- **Struktura notatki**: Tytuł, treść, data utworzenia oraz opcjonalne tagi
- **Wyszukiwarka**: Filtrowanie w czasie rzeczywistym po tytule lub tagach
- **Responsywny design**: Działa na komputerach i urządzeniach mobilnych (Android)
- **Tryb ciemny**: Domyślnie włączony Dark Mode
- **Eksport do JSON**: Możliwość pobrania pojedynczej notatki lub wszystkich danych
- **Automatyczna synchronizacja**: Wszystkie zmiany są natychmiast zapisywane w LocalStorage

## 🚀 Jak uruchomić

### Wymagania
- Node.js (wersja 18 lub nowsza)
- npm

### Instalacja

```bash
cd notatnik-app
npm install
```

### Uruchomienie w trybie deweloperskim

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

### Budowa wersji produkcyjnej

```bash
npm run build
```

Pliki zostaną wygenerowane w folderze `dist/`.

### Podgląd wersji produkcyjnej

```bash
npm run preview
```

## 📁 Struktura projektu

```
notatnik-app/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx       # Panel boczny z listą notatek i wyszukiwarką
│   │   └── NoteEditor.jsx    # Główny obszar edycji notatki
│   ├── stores/
│   │   └── notesStore.js     # Store z zarządzaniem stanem notatek
│   ├── App.jsx               # Główny komponent aplikacji
│   ├── index.jsx             # Punkt wejścia
│   └── index.css             # Style globalne + Tailwind
├── index.html                # HTML template
├── tailwind.config.js        # Konfiguracja Tailwind CSS
├── postcss.config.js         # Konfiguracja PostCSS
├── vite.config.js            # Konfiguracja Vite
└── package.json              # Zależności i skrypty
```

## 🛠️ Technologie

- **SolidJS** - Framework reaktywny z wykorzystaniem `createSignal`, `createStore` i `createEffect`
- **Tailwind CSS** - Utility-first CSS framework do stylizacji
- **Vite** - Narzędzie buildowe
- **LocalStorage** - Przechowywanie danych offline

## 📱 Użycie

1. **Nowa notatka**: Kliknij "+ Nowa notatka" aby utworzyć pustą notatkę
2. **Edycja**: Kliknij na notatkę z listy, aby ją otworzyć i edytować
3. **Tytuł i treść**: Wpisz tytuł i treść - zapisują się automatycznie
4. **Tagi**: Dodawaj tagi w panelu bocznym lub w edytorze
5. **Przypinanie**: Użyj przycisku "📌 Przypnij" aby przypiąć ważną notatkę
6. **Wyszukiwanie**: Wpisz frazę w wyszukiwarce, aby filtrować notatki
7. **Eksport**: 
   - Pojedyncza notatka: przycisk "📤 Eksportuj JSON" w edytorze
   - Wszystkie notatki: przycisk "📤 Eksportuj wszystko" na górnym pasku
8. **Usuwanie**: Kliknij "🗑️ Usuń" i potwierdź operację

## 💾 Przechowywanie danych

Wszystkie dane są przechowywane w LocalStorage przeglądarki pod kluczem `notatnik-notes`. Dane są automatycznie synchronizowane przy każdej zmianie dzięki `createEffect` z SolidJS.

## 🌐 Offline First

Aplikacja działa całkowicie offline. Po załadowaniu nie wymaga połączenia z internetem. Wszystkie dane są przechowywane lokalnie w przeglądarce.
