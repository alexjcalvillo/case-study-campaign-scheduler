import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment-timezone';

import warning from '../../warning.svg';

// Interfaces used for typing States
import { allowedDays, Schedule, Toggles } from '../../data/interfaces/interfaces';

// Base API call through axios
import { chronometer } from '../../services/Chronometer';

// antd components Imports
import { Row, Col, Card, Divider, Button, Select, TimePicker, Typography, DatePicker, Switch, Radio, InputNumber, Checkbox } from 'antd';
const { Option } = Select;
const { Title, Paragraph } = Typography;

// setup for defaults and some data
let defaultTimezone = moment.tz.guess();
let availableTimezones = moment.tz.names();
let now = moment();
const days: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// This component is massive - TODO: Modularize where necessary
export const ScheduleCard: React.FC = () => {
    const [error, setError] = useState<string>();
    const [toggles, setToggles] = useState<Toggles>({
        endDate: false,
        monthlyButtons: false,
    });
    const [allowedDays, setAllowedDays] = useState<allowedDays>({
        'sunday': true,
        'monday': false,
        'tuesday': false,
        'wednesday': false,
        'thursday': false,
        'friday': false,
        'saturday': false,
    });
    // schedule is a copy of Schedule interface defaulted to required params and set to a "daily" campaign schedule
    // default
    const [schedule, setSchedule] = useState<Schedule>({
        date_start: moment().format('YYYY-MM-DD') || '',
        // date_end: undefined, optional param
        configuration: {
            schedule: {
                time_zone: defaultTimezone,
                type: 'daily',
                specific_time: moment(0, "H").format('HH:mm'), // set to midnight
                // specific_day: undefined, optional param
                // relative_type: undefined, optional param
            }
        }
    });
    // This could be named results to - used to hold campaign dates received from API
    const [dates, setDates] = useState<string[]>([]);

    // API call to update when schedule is changed through user interaction
    useEffect(() => {
        const getDates = async () => {
            try {
                const response = await chronometer.post('/', schedule);
                console.log(response);
                setDates(response.data.data);
            } catch (error) {
                console.log(error);
                setError('No valid dates exists within your parameters. Please try changing your campaign schedule dates.')
            }
        }
        getDates();
    }, [schedule]);

    // Maybe a better way to handle this (memoize something)
    // when allowedDays (S) changes also update schedule with what is currently a true set day
    // then API request will fire again
    useEffect(() => {
        setSchedule({
            ...schedule,
            configuration: {
                schedule: {
                    ...schedule.configuration.schedule,
                    allowed_days: Object.keys(allowedDays).filter(key => allowedDays[key] !== false),
                }
            }
        });
    }, [allowedDays]);

    // The rest is event handlers for Types, Number inputs for Days/Weeks and Specific Day, and Days Checkboxes

    const handleTypes = (val: string) => {
        setToggles({ ...toggles, monthlyButtons: false });
        if (val === 'monthly_specific') {
            setToggles({ ...toggles, monthlyButtons: true });
            delete schedule.configuration.schedule.relative_type;
            delete schedule.configuration.schedule.allowed_days;
            setSchedule({
                ...schedule,
                configuration: {
                    schedule: {
                        ...schedule.configuration.schedule,
                        type: 'monthly_specific',
                        specific_day: 28,
                    }
                }
            });
            return;
        } else if (val === 'first_day' || val === 'last_day') {
            setToggles({ ...toggles, monthlyButtons: true });
            delete schedule.configuration.schedule.specific_day;
            delete schedule.configuration.schedule.allowed_days;
            setSchedule({
                ...schedule,
                configuration: {
                    schedule: {
                        ...schedule.configuration.schedule,
                        type: 'monthly_relative',
                        relative_type: val
                    }
                }
            });
            return;
        } else {
            delete schedule.configuration.schedule.relative_type;
            delete schedule.configuration.schedule.specific_day;
            setSchedule({
                ...schedule,
                configuration: {
                    schedule: {
                        ...schedule.configuration.schedule,
                        type: val,
                        frequency: 1,
                    }
                }
            });
            setAllowedDays({ ...allowedDays, 'sunday': true });
        }
    }

    // using a value (S) here to manage rendering for warning when specific_day is 29 || 30 || 31
    const [value, setValue] = useState<number>(28);
    const handleInput = (value: number | string | undefined) => {
        setValue(Number(value)); // for handling render, then set it to schedule to update API request
        setSchedule({
            ...schedule,
            configuration: {
                schedule: {
                    ...schedule.configuration.schedule,
                    specific_day: Number(value),
                }
            }
        })
    }

    const handleFreq = (val: string | number | undefined) => {
        setSchedule({
            ...schedule,
            configuration: {
                schedule: {
                    ...schedule.configuration.schedule,
                    frequency: Number(val),
                }
            }
        })
    }

    const handleDays = (val: string) => {
        setAllowedDays({
            ...allowedDays,
            [val]: !allowedDays[val],
        });
    }

    console.log(schedule);
    return (
        <Card title="Campaign Scheduler" style={{ margin: 'auto', width: '75%', fontWeight: '300' }} headStyle={{ backgroundColor: '#eef8fb', fontSize: '2rem', fontWeight: '200' }}>
            <Row>
                <Col span={16} style={{ padding: '0 1rem' }}>

                    {/* This section handles Start Date and End Date components and data */}
                    <Divider orientation="left">
                        <Typography>
                            <Title level={5} style={{ textTransform: 'uppercase', color: '#1a90ff' }}>Run Dates</Title>
                        </Typography>
                    </Divider>
                    <Row>
                        <Col flex={5}>
                            <Button style={{ marginRight: '-1px', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>Start Date</Button>
                            <DatePicker
                                style={{ width: '66%' }}
                                format={(value) => moment(value).format('LL')}
                                onChange={val => setSchedule({ ...schedule, date_start: moment(val).format('YYYY-MM-DD') })}
                                defaultValue={moment()}
                                disabledDate={(current) => current < moment().subtract(1, 'days')}
                                allowClear={false}
                            />
                        </Col>
                        <Col flex={5}>
                            <Button htmlType="button" style={{ marginRight: '-1px', paddingLeft: '0.50rem', paddingRight: '0.5rem' }}>
                                <Switch defaultChecked size="small" onChange={() => { setToggles({ ...toggles, endDate: !toggles.endDate }); if (toggles.endDate === false) { delete schedule.date_end } }} /><span style={{ marginLeft: '0.33rem' }}>End Date</span></Button>
                            <DatePicker
                                style={{ width: '64%' }}
                                disabled={toggles.endDate}
                                format={(value) => moment(value).format('LL')}
                                onChange={val => setSchedule({ ...schedule, date_end: moment(val).format('YYYY-MM-DD') })}
                                disabledDate={(current) => current < moment(schedule.date_start)}
                                allowClear={false}
                            />
                        </Col>
                    </Row>

                    {/* Section 2 is for Schedule type and will conditionally render Section 3 */}
                    <Divider orientation="left">
                        <Title level={5} style={{ textTransform: 'uppercase', color: '#1a90ff' }}>Schedule Type</Title>
                    </Divider>
                    <Row>
                        <Col flex={schedule.configuration.schedule.type === 'Monthly' ? 2 : 5}>
                            <Select style={{ width: '10rem' }} defaultValue="daily" onChange={(val) => handleTypes(val)}>
                                <Option value="daily">Daily</Option>
                                <Option value="weekly">Weekly</Option>
                                <Option value="monthly_specific">Monthly</Option>
                            </Select>
                        </Col>
                        {toggles.monthlyButtons ?
                            (<Col flex={5}>
                                <Radio.Group defaultValue="monthly_specific" buttonStyle="solid" onChange={(e) => handleTypes(e.target.value)}>
                                    <Radio.Button value="monthly_specific">Specific Day</Radio.Button><Radio.Button value="first_day">First Day</Radio.Button><Radio.Button value="last_day" onClick={() => handleTypes('last_day')}>Last Day</Radio.Button>
                                </Radio.Group>
                            </Col>)
                            : null}
                    </Row>

                    {/* Beginning Conditionally Rendedered section based on Schedule.type */}
                    {schedule.configuration.schedule.type === 'monthly_specific' ?
                        <>
                            <Divider orientation="left">
                                <Title level={5} style={{ textTransform: 'uppercase', color: '#1a90ff' }}>Specific Day</Title>
                            </Divider>
                            <InputNumber max={31} defaultValue={value} onChange={(val) => handleInput(val)} />
                            {value >= 29 ?
                                <Paragraph>
                                    <img src={warning} alt="warning sign" />
                                    This campaign will not run in months that do not have the chosen number of days.
                                    To always target the last day of the month use the "Last Day" option.
                                </Paragraph>
                                :
                                null
                            }
                        </>
                        :
                        null}
                    {schedule.configuration.schedule.type === 'monthly_relative' || schedule.configuration.schedule.type === 'monthly_specific' ?
                        null
                        :
                        <>
                            <Divider orientation="left">
                                <Title level={5} style={{ textTransform: 'uppercase', color: '#1a90ff' }}>{schedule.configuration.schedule.type?.toUpperCase()} Schedule</Title>
                            </Divider>
                        Every <InputNumber max={7} defaultValue={1} style={{ marginTop: '0.5px', marginRight: '-0.5px', width: '4rem' }} onChange={(val) => handleFreq(val)} />
                            <Button>{<p>{schedule.configuration.schedule.type === 'daily' ? "day(s)" : "week(s)"}</p>}</Button> on{' '}
                            {/* {days.map((day, i) => <> <input id="days" type="checkbox" key={i} onChange={() => handleDays(day)} checked={allowedDays[day]} /> <label htmlFor="days">{day.substring(0, 3).toUpperCase()}</label></>)} */}
                            {days.map((day, i) => <Checkbox style={{ margin: '0.5px' }} defaultChecked={day === 'sunday' ? true : false} key={i} onClick={() => handleDays(day)}>{day.substring(0, 3).toUpperCase()}</Checkbox>)}
                        </>
                    }

                    {/* Section for Specific Time Scheduling */}
                    <Divider orientation="left">
                        <Title level={5} style={{ textTransform: 'uppercase', color: '#1a90ff' }}>Schedule Time</Title>
                    </Divider>
                    <TimePicker
                        defaultValue={moment(0, "H")}
                        onChange={val => setSchedule({ ...schedule, configuration: { schedule: { ...schedule.configuration.schedule, specific_time: moment(val).format('HH:mm') } } })}
                    />
                    <Select
                        style={{ width: '15rem', marginLeft: '1rem' }}
                        defaultValue={defaultTimezone}
                        onChange={(val) => setSchedule({ ...schedule, configuration: { schedule: { ...schedule.configuration.schedule, time_zone: val } } })}
                    >
                        {availableTimezones.map((tz, i) => {
                            return <Option key={i} value={tz}>{tz}</Option>
                        })}
                    </Select>

                </Col>

                {/* Section for displaying API results */}
                <Col span={8} style={{ borderLeft: '1px solid whitesmoke', padding: '0 1rem' }}>
                    <Divider orientation="center">
                        <Title level={5} style={{ textTransform: 'uppercase', color: '#1a90ff' }}>Next {dates.length} Occurrences</Title>
                    </Divider>
                    <Typography>
                        {dates.length < 1 ?
                            <Paragraph>{error}</Paragraph>
                            :
                            dates.map((date, i) => {
                                return <Paragraph key={i}>{moment(date).format('LLLL')}</Paragraph>
                            })}

                    </Typography>
                </Col>
            </Row>
        </Card>
    )
};