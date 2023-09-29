import { useState } from "react";
import { Alert, Button, Container, Form, Stack } from "react-bootstrap";

type ConfirmPay = {
    status: number,
    message: string,
    sessionKey: string
}

function Pay() {
    const [data, setData] = useState<ConfirmPay>();
    const [dataPay, setDataPay] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const [errPay, setErrPay] = useState("");

    const handleCLick = async (event: Event) => {
        event.preventDefault();

        setIsLoading(true);

        const form = event.target as HTMLFormElement;

        if (!form.checkValidity()) event.stopPropagation();

        const data = {
            document: (form.querySelector("[name='document']") as HTMLInputElement).value,
            value: (form.querySelector("[name='value']") as HTMLInputElement).value
        };

        try {
            const response = await fetch("http://localhost:3000/wallet/pay", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            if (!result.status) {
                setData(undefined);
                throw new Error(result.message);
            }

            setErr("");
            setData(result.data);
        } catch (err: any) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    const validatePay = async (event: Event) => {
        event.preventDefault();

        setIsLoading(true);

        const form = event.target as HTMLFormElement;

        if (!form.checkValidity()) event.stopPropagation();

        const data = {
            document: (document.querySelector("[name='document']") as HTMLInputElement).value,
            otp: (form.querySelector("[name='otp']") as HTMLInputElement).value,
            sessionKey: (form.querySelector("[name='sessionKey']") as HTMLInputElement).value,
        };

        try {
            const response = await fetch("http://localhost:3000/wallet/confirm", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            if (!result.status) {
                setDataPay("");
                throw new Error(result.message);
            }

            setErrPay("");
            setDataPay(result.message);
        } catch (err: any) {
            setErrPay(err.message);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <>
            <Container fluid="sm">
                <Form onSubmit={handleCLick}>
                    <Stack gap={2}>
                        <Form.Group controlId="pay.document">
                            <Form.Label column="sm">Document</Form.Label>
                            <Form.Control required size="sm" name="document" type="text" placeholder="123123123" />
                        </Form.Group>
                        <Form.Group controlId="pay.value">
                            <Form.Label column="sm">Value</Form.Label>
                            <Form.Control required size="sm" name="value" type="number" placeholder="100.0" />
                        </Form.Group>
                        <Button type="submit" variant="success">
                            {isLoading ? "Loading..." : "Make Pay"}
                        </Button>
                        {data ? (
                            <Alert variant="success">
                                {data.message}
                            </Alert>
                        ) : ""}
                        {err ? (
                            <Alert variant="danger">
                                {err}
                            </Alert>
                        ) : ""}
                    </Stack>
                </Form>
                {data && (
                    <Form onSubmit={validatePay}>
                        <Stack gap={2}>
                            <Form.Group controlId="verified.otp">
                                <Form.Label column="sm">OTP</Form.Label>
                                <Form.Control required size="sm" name="otp" type="number" placeholder="xxxxxx" />
                            </Form.Group>
                            <Form.Control name="sessionKey" value={data.sessionKey} type="hidden"></Form.Control>
                            <Button type="submit" variant="success">
                                {isLoading ? "Loading..." : "Confirm"}
                            </Button>
                            {dataPay ? (
                                <Alert variant="success">
                                    {dataPay}
                                </Alert>
                            ) : ""}
                            {errPay ? (
                                <Alert variant="danger">
                                    {errPay}
                                </Alert>
                            ) : ""}
                        </Stack>
                    </Form>
                )}
            </Container>
        </>
    )
}

export default Pay;