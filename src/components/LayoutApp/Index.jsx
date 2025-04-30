import { GlobalContext } from "../../context/GlobalContext"
import { Outlet } from "react-router-dom"
import TotalContainer from "../TotalContainer/Index"
function LayoutApp() {
    return (
        <main>
            <GlobalContext>
                <TotalContainer>
                    <Outlet />
                </TotalContainer>
            </GlobalContext>
        </main>
    )
}
export default LayoutApp