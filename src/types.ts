export type Guitarra = {
  id: number
  nombre: string
  imagen: string
  descripcion: string
  precio: number
}

export type CartItem = Guitarra & {
  quantity: number
}