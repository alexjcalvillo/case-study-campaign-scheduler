import React from 'react';

// antd components Imports
import { Row, Col, Card, Divider, Button, Select, TimePicker, Typography } from 'antd';
import { RunDatePanel } from './ScheduleCard/schedulecard_components/RunDatePanel';
const { Option } = Select;
const { Title, Paragraph } = Typography;

export const ScheduleCard: React.FC = () => {
    return (
        <Card title="Campaign Scheduler" style={{ margin: 'auto', width: '75%' }} headStyle={{ backgroundColor: '#D9D9D9' }}>
            <Row>
                <Col span={15}>
                    <RunDatePanel />
                    <Divider orientation="left">
                        <Title level={5} style={{ textTransform: 'uppercase' }}>Schedule Type</Title>
                    </Divider>
                    <Select style={{ width: '10rem' }} defaultValue="Daily">
                        <Option value="Daily">Daily</Option>
                        <Option value="Weekly">Weekly</Option>
                        <Option value="Monthly">Monthly</Option>
                    </Select>
                    <Divider orientation="left">
                        <Title level={5} style={{ textTransform: 'uppercase' }}>Daily Schedule</Title>
                    </Divider>
            Every
            <Select>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                        <Option value={5}>5</Option>
                        <Option value={6}>6</Option>
                        <Option value={7}>7</Option>
                    </Select>
                    <Button disabled>day(s)
            </Button> on
            <Divider orientation="left">
                        <Title level={5} style={{ textTransform: 'uppercase' }}>Schedule Time</Title>
                    </Divider>
                    <TimePicker />
                    <Select>
                        <Option value="CST">America/Chicago</Option>
                    </Select>
                </Col>
                <Divider type="vertical" />
                <Col span={7}>
                    <Title level={5} style={{ textTransform: 'uppercase' }}>Next 7 Occurrences</Title>
                    <Typography>
                        <Paragraph>Date here</Paragraph>
                        <Paragraph>Date here</Paragraph>
                        <Paragraph>Date here</Paragraph>
                        <Paragraph>Date here</Paragraph>
                        <Paragraph>Date here</Paragraph>
                        <Paragraph>Date here</Paragraph>
                        <Paragraph>Date here</Paragraph>
                    </Typography>
                </Col>
            </Row>
        </Card>
    )
};

const cardStyles = {
    height: '400px',
    margin: 'auto',
    width: '75%',
    backgroundColor: 'whitesmoke',
    borderRadius: '4px'
}