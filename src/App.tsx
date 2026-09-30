import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db, type Guitarra, } from "./data/guitars"

function App (){
  //Lógica
console.log(db)
return (
    <>
    <Header/>
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
        {
            db.map((g:Guitarra) => (<Guitar key={g.id} guitar={g}/>))
        }
        </div>

    </main>
    <Footer/>
    </>
)
}
export default App

