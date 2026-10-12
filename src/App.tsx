import { useState, useEffect } from "react"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/guitars"
import type { CartItem, Guitarra } from "./types"

function App() {
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('carrito')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [carrito, setCarrito] = useState<CartItem[]>(initialCart)
    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    function addGuitar(guitar: Guitarra) {
        const itemExists = carrito.findIndex(g => g.id === guitar.id)
        if (itemExists >= 0) {
            if (carrito[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...carrito]
            updatedCart[itemExists].quantity++
            setCarrito(updatedCart)
        } else {
            const newItem: CartItem = { ...guitar, quantity: 1 }
            setCarrito([...carrito, newItem])
        }
    }

    function removeFromCart(id: Guitarra['id']) {
        setCarrito(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id: Guitarra['id']) {
        const updatedCart = carrito.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCarrito(updatedCart)
    }

    function decreaseQuantity(id: Guitarra['id']) {
        const updatedCart = carrito.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCarrito(updatedCart)
    }

    function clearCart() {
        setCarrito([])
    }

    return (
        <>
            <Header 
                carrito={carrito}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
            />
            
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {db.map((g: Guitarra) => (
                        <Guitar 
                            key={g.id} 
                            addGuitar={addGuitar} 
                            guitar={g} 
                        />
                    ))}
                </div>
            </main>
            
            <Footer />
        </>
    )
}

export default App