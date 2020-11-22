import React, { useState } from 'react';

import { Row, Col, DatePicker, Divider, Button, Typography, Switch } from 'antd';
const { Title } = Typography;

export const RunDatePanel: React.FC = () => {
    const [endDate, setEndDate] = useState<boolean>(true);
    const handleChange = () => {
        setEndDate(!endDate);
    }
    console.log(endDate);
    return (
        <>
            <Divider orientation="left">
                <Typography>
                    <Title level={5} style={{ textTransform: 'uppercase' }}>Run Dates</Title>
                </Typography>
            </Divider>
            <Row>
                <Col flex={5}>
                    <Button style={{ marginRight: '-1px' }}>Start Date</Button>
                    <DatePicker style={{ width: '66%' }} />
                </Col>
                <Col flex={5}>
                    <Button style={{ marginRight: '-1px' }}>
                        <Switch defaultChecked size="small" onChange={handleChange} />End Date</Button>
                    <DatePicker style={{ width: '64%' }} disabled={!endDate} />
                </Col>
            </Row>
        </>
    )
};