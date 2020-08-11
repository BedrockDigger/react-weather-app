import React from 'react'
import { Form, Card, Icon, Button, Statistic, Message } from 'semantic-ui-react'
import getLocalObj from '../Utils/FetchData'

class MainDisplay extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cityName: '',
            countryCode: '',
            counter: 0,
            isReady: false,
            getSucceeded: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCcChange = this.handleCcChange.bind(this)
        this.handleCnChange = this.handleCnChange.bind(this)
    }

    handleCnChange(e) {
        this.setState({
            cityName: e.target.value
        })
    }

    handleCcChange(e) {
        this.setState({
            countryCode: e.target.value
        })
    }

    handleSubmit() {
        if (this.state.cityName !== '') {
            console.log(this.state.cityName)
            this.loadWeather()
            this.setState({ cityName: '', countryCode: '', counter: this.state.counter + 1, isReady: false })
        }
        else {
            this.setState({ countryCode: '' })
            alert("The city name is required.")
            console.log(this.state.cityName)
        }
    }

    async loadWeather() {
        getLocalObj(
            this.state.cityName, this.state.countryCode
        ).then(
            (finalObj) => {
                console.log(finalObj)
                this.setState({ returnObj: finalObj.data, isReady: true })
                console.log(this.state.returnObj)
                if (finalObj.succeeded === true) {
                    this.setState({ getSucceeded: true })
                }
                else {
                    this.setState({ getSucceeded: false })
                }
            }
        )
    }

    render() {
        const s = this.state
        if (s.counter === 0) {
            return (
                <div id="feedback">
                    <InputFormCard cn={s.cityName} cc={s.countryCode} fluid
                        cnCb={this.handleCnChange} ccCb={this.handleCcChange} submitCb={this.handleSubmit} />
                    <Message
                        icon='question'
                        header='Please input'
                        content="Otherwise I'll eat you."
                    />
                </div>
            )
        }
        else if (s.counter !== 0 && s.isReady === true && s.getSucceeded === true) {
            return (
                <div id="feedback">
                    <InputFormCard cn={s.cityName} cc={s.countryCode} fluid
                        cnCb={this.handleCnChange} ccCb={this.handleCcChange} submitCb={this.handleSubmit} />
                    <>
                        <FeedbackCards obj={s.returnObj} />
                    </>
                </div>
            )
        }
        else if (s.counter !== 0 && s.isReady === true && s.getSucceeded === false) {
            return (
                <div id="feedback">
                    <InputFormCard cn={s.cityName} cc={s.countryCode} fluid
                        cnCb={this.handleCnChange} ccCb={this.handleCcChange} submitCb={this.handleSubmit} />
                    <Message
                        warning
                        icon='exclamation'
                        header='Something went wrong'
                        content={s.returnObj.message.toString()}
                    />
                </div>
            )
        }
        else if (s.counter !== 0 && s.isReady === false) {
            return (
                <div id="feedback" >
                    <InputFormCard cn={s.cityName} cc={s.countryCode}
                        cnCb={this.handleCnChange} ccCb={this.handleCcChange} submitCb={this.handleSubmit} />
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            We are fetching nicely cooked for you.
                        </Message.Content>
                    </Message>
                </div>
            )
        }
    }
}

class InputFormCard extends React.Component {

    render() {
        return (
            <div id="input-form-card">
                <Card fluid>
                    <Card.Content>
                        <Card.Header>The weather of which city?</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Form>
                            <Form.Input
                                label='City Name' width={10}
                                placeholder='Name of the city, in caps'
                                value={this.props.cn}
                                onChange={this.props.cnCb}
                            />
                            <Form.Input
                                label='Country Code' width={10}
                                placeholder='Name of the country, in ISO 3166 standards'
                                value={this.props.cc}
                                onChange={this.props.ccCb}
                            />
                            <Button type='submit' onClick={this.props.submitCb}>Submit</Button>
                        </Form>
                    </Card.Content>
                    <Card.Content extra>
                        <a href="https://openweathermap.org/current" target="_blank" rel="noopener noreferrer">
                            <Icon name='cloud' />
                        Frequently updated weather data from OpenWeather API.
                    </a>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

class FeedbackCards extends React.Component {

    render() {
        return (
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Statistic.Group widths='three'>
                            <Statistic horizontal>
                                <Statistic.Label>Avg temperature</Statistic.Label>
                                <Statistic.Value>{this.props.obj.temp}°C</Statistic.Value>
                            </Statistic>
                            <Statistic horizontal>
                                <Statistic.Label>Max temperature</Statistic.Label>
                                <Statistic.Value>{this.props.obj.temp_max}°C</Statistic.Value>
                            </Statistic>
                            <Statistic horizontal>
                                <Statistic.Label>Min temperature</Statistic.Label>
                                <Statistic.Value>{this.props.obj.temp_min}°C</Statistic.Value>
                            </Statistic>
                        </Statistic.Group>
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }
}

export default MainDisplay