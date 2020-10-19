import React, { useEffect, useState } from "react";
import config from "../../../ethereum_config";

const EthereumConfig = ({
    endpoint,
    chainid,
    uuid,
    setEndpoint,
    setChainid,
    setUuid,
}) => {
    const [toggle, setToggle] = useState(
        window.cookiesObj.toggle === "true" || false
    );
    const [active, setActive] = useState(
        window.cookiesObj.active || config[0].name
    );

    useEffect(() => {
        document.cookie = "toggle=" + toggle;
        document.cookie = "active=" + active;
    }, [toggle, active]);

    return (
        <>
            <div style={{ marginTop: 10, textAlign: "center" }}>
                <BS.Button
                    outline={true}
                    color='secondary'
                    style={{ width: "100%" }}
                    onClick={() => setToggle(!toggle)}>
                    Show Config
                </BS.Button>
            </div>

            {toggle && (
                <>
                    <hr />

                    <BS.FormGroup row>
                        <BS.Label sm={3} for='uuid'>
                            UUID:
                        </BS.Label>
                        <BS.Col sm={9}>
                            <BS.InputGroup>
                                <BS.Input
                                    type='text'
                                    name='uuid'
                                    value={uuid}
                                    onChange={(e) => setUuid(e.target.value)}
                                    placeholder='<uuid>'
                                />
                            </BS.InputGroup>
                        </BS.Col>
                    </BS.FormGroup>

                    <BS.FormGroup row>
                        <BS.Label sm={3} for='endpoint'>
                            Endpoint:
                        </BS.Label>
                        <BS.Col sm={9}>
                            <BS.Input
                                type='text'
                                name='endpoint'
                                value={endpoint}
                                onChange={(e) => setEndpoint(e.target.value)}
                            />
                        </BS.Col>
                    </BS.FormGroup>

                    <BS.FormGroup row>
                        <BS.Label sm={3} for='port'>
                            Chain ID:
                        </BS.Label>
                        <BS.Col sm={9}>
                            <BS.Input
                                type='text'
                                name='chainid'
                                value={chainid}
                                onChange={(e) => setChainid(e.target.value)}
                            />
                        </BS.Col>
                    </BS.FormGroup>

                    <div style={{ marginTop: 10, textAlign: "center" }}>
                        <BS.ButtonGroup style={{ width: "100%" }}>
                            {config.map(
                                ({ name, color, endpoint, chainid }) => (
                                    <BS.Button
                                        style={{ flex: 1 }}
                                        outline={true}
                                        color={color}
                                        key={name}
                                        onClick={() => {
                                            setActive(name);
                                            setEndpoint(endpoint);
                                            setChainid(chainid);
                                        }}>
                                        {name}
                                    </BS.Button>
                                )
                            )}
                        </BS.ButtonGroup>
                    </div>
                </>
            )}
        </>
    );
};

export default EthereumConfig;
