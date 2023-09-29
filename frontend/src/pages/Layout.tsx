import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
function Layout() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Coinlyx</Navbar.Brand>
                    <Stack gap={2} direction='horizontal'>
                        <Button href="/register" size="sm" variant='success'>Register client</Button>
                        <Button href="/wallet" size="sm" variant='secondary' className='ms-auto'>Wallet</Button>
                    </Stack>
                </Container>
            </Navbar>
            <Outlet></Outlet>
        </>
    );
}

export default Layout;