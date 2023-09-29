import { Button, Container, Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function Wallet() {
    return (
        <>
            <Container fluid="md">
                <Stack direction="horizontal" gap={2}>
                    <Button className="ms-auto" href="/wallet/balance" variant="secondary" size="sm">
                        Balance
                    </Button>
                    <Button href="/wallet/load" variant="primary" size="sm">
                        Load wallet
                    </Button>
                    <Button className="me-auto" href="/wallet/pay" variant="success" size="sm">
                        Make pay
                    </Button>
                </Stack>
                <Outlet />
            </Container>
        </>
    );
}

export default Wallet;