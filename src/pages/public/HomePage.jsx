// src/pages/public/HomePage.jsx
// Simple home page - Member 1's work (Kashaf)

const HomePage = () => {
  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
      {/* Kashaf's simple home page content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '20px',
          color: '#facc15'
        }}>
          Welcome to VizCraft
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666',
          marginBottom: '30px'
        }}>
          Augmented Reality Furniture Store
        </p>
      </div>
    </div>
  )
}

export default HomePage
