import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"

//MOCKS
const productMock = {
    id: 2,
    image: "https://picsum.photos/400",
    title: "item aleatório 1",
    price: 66.70
}

const addToCartMock = jest.fn()

//TESTS
describe("Teste do card ProductsCards", () => {
    test("Testar renderizar card", () => {

        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock}
        />)

        const title = screen.getByText("item aleatório 1")
        expect(title).toBeInTheDocument()
    })

    test("testar a renderização do título, imagem, preço e botão de compra", () => {
        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock} />
        )
        //screen.logTestingPlaygroundURL()
        const title = screen.getByText("item aleatório 1")
        const image = screen.getByRole('img', { name: /item aleatório 1/i })
        const price = screen.getByText(/\$66\.70/i)
        const buyButton = screen.getByRole('button', { name: /buy/i })
        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(buyButton).toBeInTheDocument()
    })

    test("Testa quando o botão é clickado, chama a função addToCart",async ()=>{
        
        const user = userEvent.setup()
        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock} />
        )
        const buyButton = screen.getByRole('button', { name: /buy/i })
        await user.click(buyButton)

        //como estou utilizando o jest.fn(), posso usar metodos especiais de verificar se a função esta ok
        expect(addToCartMock).toBeCalled()
    })
})