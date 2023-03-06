import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import CartCard from "../components/Cart/CartCard"
//MOCKS
const productMock = {
    id: 2,
    image: "https://picsum.photos/400",
    title: "item aleatório 1",
    price: 66.70,
    quantity: 1
}

const removeFromCartMock = jest.fn()

//tests
describe("Testa o CartCard", () => {
    test("testa a renderização da imagem, título, o preço, a quantidade e o botão de remover", () => {
        render(<CartCard
            product={productMock}
            removeFromCart={removeFromCartMock(productMock)}
        />)
        //screen.logTestingPlaygroundURL()
        const title = screen.getByText("item aleatório 1")
        const image = screen.getByRole('img', { name: /item aleatório 1/i })
        const price = screen.getByText(/\$66\.70/i)
        const removeBtn = screen.getByRole('button', { name: /remove/i })
        const quantity = screen.getByText(/x1/i)

        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(removeBtn).toBeInTheDocument()
        expect(quantity).toBeInTheDocument()
    })

    test("Quando clickar no botão, deve chamar a função de removeFromCart",async()=>{
        const user = userEvent.setup()

        render(<CartCard
            product={productMock}
            removeFromCart={removeFromCartMock(productMock)}
        />)
        const removeBtn = screen.getByRole('button', { name: /remove/i })
        user.click(removeBtn)

        expect(removeFromCartMock).toBeCalled()
    })
})