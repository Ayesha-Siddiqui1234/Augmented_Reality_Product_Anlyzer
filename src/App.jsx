import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <>
      <Navbar
        isLoggedIn={true}
        userName="User"
        favCount={2}
        activePage="home"
      />

      {/* your existing page content below */}
      <div style={{ paddingTop: '90px' }}>
        {/* rest of your app */}
      </div>
    </>
  );
}

export default App;