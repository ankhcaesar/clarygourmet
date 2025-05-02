import { Outlet } from "react-router-dom"
import TotalContainer from "../TotalContainer/Index"
import GlobalContextProvider from "../../context/GlobalContext"
function LayoutApp() {
    return (
        <main>
            <GlobalContextProvider>
                <TotalContainer>
                    <Outlet />
                </TotalContainer>
            </GlobalContextProvider>
        </main>
    )
}
export default LayoutApp