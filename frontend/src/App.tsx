import SearchForm from "./components/SearchForm/SearchForm";

function App() {
  return (
    <main className="min-h-screen bg-background p-6 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">City Search</h1>
          <p className="text-muted-foreground">
            Search for cities or add new ones to your collection
          </p>
        </div>
        <SearchForm />
      </div>
    </main>
  );
}

export default App;
