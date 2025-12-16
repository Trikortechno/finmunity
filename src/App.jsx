import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NewsProvider } from "./contexts/NewsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import News from "./components/News";
import Ask from "./components/Ask";
import NewsDetail from "./components/NewsDetail";
import QuestionDetail from "./components/QuestionDetail";
import StockDetail from "./components/StockDetail";
import AllStocks from "./components/AllStocks";
import SearchResults from "./components/SearchResults";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";

// Layout component for routes with Navbar and Footer
function Layout({ children }) {
  return (
    <NewsProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </div>
    </NewsProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes - No Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Routes - With Navbar */}
        <Route path="/" element={<Layout><News /></Layout>} />
        <Route path="/news" element={<Layout><News /></Layout>} />
        <Route path="/ask" element={<Layout><Ask /></Layout>} />

        {/* Detail Routes - With Navbar */}
        <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
        <Route path="/ask/:id" element={<Layout><QuestionDetail /></Layout>} />
        <Route path="/stock/:symbol" element={<Layout><StockDetail /></Layout>} />
        <Route path="/market/:type" element={<Layout><AllStocks /></Layout>} />
        <Route path="/search" element={<Layout><SearchResults /></Layout>} />

        {/* 404 Not Found */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
