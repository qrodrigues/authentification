function App() {

  return (
    <>
     <h1>Inscription</h1>
     <div className="flex flex-col gap-y-2">
      <input type="text" placeholder="Adresse email" />
      <input type="text" placeholder="Mot de passe" />
      <input type="text" placeholder="Confirmation de mot de passe" />
      <button>S'inscrire</button>
     </div>
    </>
  )
}

export default App
