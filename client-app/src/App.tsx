import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Container from "./components/Container/Container";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-200">
      <Header />
      <main className="flex-grow">
        <Container />
      </main>
      <Footer />
    </div>
  );
}

export default App;
